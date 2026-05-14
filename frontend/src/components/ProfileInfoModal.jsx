import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

const ProfileInfoModal = ({ isOpen, onClose, formData, onSave, isSaving }) => {
    const [localData, setLocalData] = useState({ ...formData });

    useEffect(() => {
        if (isOpen) {
            setLocalData({ ...formData });
        }
    }, [isOpen, formData]);

    if (!isOpen) return null;

    const handleInput = (e) => {
        const { name, value } = e.target;
        setLocalData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content profile-info-modal pop-in">
                <button className="close-corner-btn-purple" onClick={onClose}><X size={20} /></button>

                <div className="modal-header-v3">
                    <h2 className="modal-title-v3">Edit Profile Info</h2>
                    <p className="modal-subtitle-v3">Update your personal and professional details.</p>
                </div>

                <div className="modal-scroll-area">
                    <div className="modal-form-grid">
                        <div className="form-item">
                            <label>First Name</label>
                            <input type="text" name="first_name" value={localData.first_name} onChange={handleInput} placeholder="Enter first name" />
                        </div>
                        <div className="form-item">
                            <label>Last Name</label>
                            <input type="text" name="last_name" value={localData.last_name} onChange={handleInput} placeholder="Enter last name" />
                        </div>
                        <div className="form-item full-width">
                            <label>Designation</label>
                            <input type="text" name="designation" value={localData.designation} onChange={handleInput} placeholder="Enter designation" />
                        </div>
                        <div className="form-item">
                            <label>Consultant ID</label>
                            <input type="text" name="consultant_id" value={localData.consultant_id} onChange={handleInput} />
                        </div>
                        <div className="form-item">
                            <label>Gender</label>
                            <select name="gender" value={localData.gender} onChange={handleInput}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="form-item">
                            <label>Date of Birth</label>
                            <input type="date" name="dob" value={localData.dob} onChange={handleInput} />
                        </div>
                        <div className="form-item">
                            <label>Consultant Fee</label>
                            <input type="number" name="consultant_fee" value={localData.consultant_fee} onChange={handleInput} />
                        </div>
                    </div>

                    <div className="modal-section-divider">Contract Period (Read Only)</div>
                    <div className="modal-form-grid">
                        <div className="form-item">
                            <label>Start date</label>
                            <input type="text" value={localData.contract_start} readOnly className="readonly-input" />
                        </div>
                        <div className="form-item">
                            <label>End date</label>
                            <input type="text" value={localData.contract_end} readOnly className="readonly-input" />
                        </div>
                    </div>

                    <div className="modal-section-divider">Reporting Structure (Read Only)</div>
                    <div className="modal-form-grid">
                        <div className="form-item">
                            <label>Reporting Manager</label>
                            <input type="text" value={localData.reporting_to_name} readOnly className="readonly-input" />
                        </div>
                        <div className="form-item">
                            <label>Manager Role</label>
                            <input type="text" value={localData.reporting_to_role} readOnly className="readonly-input" />
                        </div>
                    </div>

                    <div className="modal-section-divider">Bank Details (Read Only)</div>
                    <div className="modal-form-grid">
                        <div className="form-item">
                            <label>Account Number</label>
                            <input type="text" value={localData.account_number} readOnly className="readonly-input" />
                        </div>
                        <div className="form-item">
                            <label>IFSC Code</label>
                            <input type="text" value={localData.ifsc_code} readOnly className="readonly-input" />
                        </div>
                        <div className="form-item">
                            <label>MICR Code</label>
                            <input type="text" value={localData.micr_code} readOnly className="readonly-input" />
                        </div>
                        <div className="form-item full-width">
                            <label>Branch Address</label>
                            <textarea value={localData.branch_address} readOnly className="modal-textarea readonly-input" rows="2" />
                        </div>
                    </div>
                </div>

                <div className="modal-footer-v3">
                    <button className="btn-cancel-v3" onClick={onClose}>Cancel</button>
                    <button className="btn-save-v3" onClick={() => onSave(localData)} disabled={isSaving}>
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            <style>{`
                .readonly-input {
                    background: #f1f5f9 !important;
                    color: #94a3b8 !important;
                    cursor: not-allowed;
                    border-color: #e2e8f0 !important;
                }
                .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 7000; padding: 1.5rem; }
                .profile-info-modal { background: white; width: 100%; max-width: 650px; max-height: 90vh; border-radius: 32px; padding: 2.5rem; position: relative; display: flex; flex-direction: column; }
                
                .modal-header-v3 { margin-bottom: 2rem; }
                .modal-title-v3 { font-size: 1.8rem; font-weight: 800; color: #1e293b; margin-bottom: 0.5rem; }
                .modal-subtitle-v3 { color: #64748b; font-size: 1rem; }

                .modal-scroll-area { flex: 1; overflow-y: auto; padding-right: 0.5rem; margin-bottom: 1.5rem; }
                .modal-scroll-area::-webkit-scrollbar { width: 6px; }
                .modal-scroll-area::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }

                .modal-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2.5rem; }
                .form-item { display: flex; flex-direction: column; gap: 0.6rem; }
                .form-item label { font-size: 0.85rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
                .form-item input, .form-item select, .modal-textarea { padding: 0.85rem 1rem; border: 1px solid #e2e8f0; border-radius: 12px; font-size: 1rem; color: #1e293b; font-weight: 600; outline-color: #B800C4; transition: all 0.2s; background: #f8fafc; }
                .form-item input:focus, .modal-textarea:focus { border-color: #B800C4; background: white; }
                .modal-textarea { resize: vertical; }
                .full-width { grid-column: 1 / -1; }

                .modal-section-divider { font-size: 0.9rem; font-weight: 800; color: #B800C4; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1rem; }
                .modal-section-divider::after { content: ''; flex: 1; height: 1px; background: #f1f5f9; }

                .modal-footer-v3 { display: flex; justify-content: flex-end; gap: 1rem; padding-top: 1.5rem; border-top: 1px solid #f1f5f9; }
                .btn-cancel-v3 { padding: 0.9rem 2rem; border-radius: 14px; border: 1px solid #e2e8f0; background: white; color: #64748b; font-weight: 700; cursor: pointer; transition: all 0.2s; }
                .btn-cancel-v3:hover { background: #f8fafc; color: #1e293b; }
                .btn-save-v3 { padding: 0.9rem 2.5rem; border-radius: 14px; border: none; background: #B800C4; color: white; font-weight: 700; cursor: pointer; transition: transform 0.2s, background 0.2s; box-shadow: 0 10px 20px rgba(184, 0, 196, 0.15); }
                .btn-save-v3:hover { transform: translateY(-2px); background: #a000ac; }
                
                .close-corner-btn-purple { position: absolute; top: 1.5rem; right: 1.5rem; border: 1px solid #f1f5f9; color: #B800C4; background: white; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
                
                .pop-in { animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
                @keyframes popIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
            `}</style>
        </div>
    );
};

export default ProfileInfoModal;
