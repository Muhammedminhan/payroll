import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import App from './App.jsx'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID || 'missing-client-id'}>
      {GOOGLE_CLIENT_ID ? <App /> : (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
          <h1>Configuration Error</h1>
          <p>VITE_GOOGLE_CLIENT_ID is missing in environment.</p>
        </div>
      )}
    </GoogleOAuthProvider>
  </StrictMode>,
)
