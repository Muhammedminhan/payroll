import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'; // Added Navigate, Outlet
import { AuthProvider, useAuth } from './context/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';
import Overview from './pages/Overview';
import Placeholder from './pages/Placeholder';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Payslips from './pages/Payslips';
import PayslipDetail from './pages/PayslipDetail';
import Documents from './pages/Documents';
import Wiki from './pages/Wiki';

import { NotificationProvider } from './context/NotificationContext';
import { ROUTES } from './constants/routes';

// Protected Route Wrapper
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // Show nothing while checking auth state
  if (loading) return null; // Or a spinner

  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
};

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Route */}
            <Route path={ROUTES.LOGIN} element={<Login />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path={ROUTES.DASHBOARD} element={<DashboardLayout />}>
                <Route index element={<Overview />} />
                <Route path="profile" element={<Profile />} />
                <Route path="payslips" element={<Payslips />} />
                <Route path="payslips/:month" element={<PayslipDetail />} />
                <Route path="documents" element={<Documents />} />
                <Route path="wiki" element={<Wiki />} />
                <Route path="support" element={<Placeholder title="Support" />} />
              </Route>
            </Route>

            {/* Catch all redirect */}
            <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
