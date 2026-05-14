import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';

const ProfileImageModal = ({ isOpen, onClose, currentImage, onRemove, onSave }) => {
    if (!isOpen) return null;

    const [view, setView] = useState('main'); // 'main', 'change', 'remove'
    const [selectedImage, setSelectedImage] = useState(null);

    const handleClose = () => {
        setView('main');
        setSelectedImage(null);
        onClose();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
                setView('change');
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content profile-modal pop-in">
                {/* Header */}
                <div className="modal-header">
                    <h2 className="modal-title-custom">
                        {view === 'main' && 'Profile Picture'}
                        {view === 'change' && 'Profile Picture'}
                        {view === 'remove' && 'Remove Profile Picture?'}
                    </h2>
                    <button className="close-corner-btn-purple" onClick={handleClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-body-custom">
                    {view === 'main' && (
                        <>
                            <div className="image-display-container">
                                <img src={currentImage} alt="Profile" className="large-circle-img" />
                            </div>
                            <p className="modal-description-text">
                                To make your profile unique, you can easily change or remove your profile picture.
                            </p>
                            <div className="modal-actions-custom">
                                <button onClick={() => setView('remove')} className="btn-outline-remove">Remove</button>
                                <label className="btn-solid-purple">
                                    Change
                                    <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                                </label>
                            </div>
                        </>
                    )}

                    {view === 'change' && (
                        <>
                            <div className="image-display-container">
                                <img src={selectedImage} alt="New Profile" className="large-circle-img" />
                            </div>
                            <p className="modal-description-text">
                                To make your profile unique, you can easily change or remove your profile picture.
                            </p>
                            <div className="modal-actions-custom">
                                <button onClick={() => { setView('main'); setSelectedImage(null); }} className="btn-outline-cancel">Remove</button>
                                <button onClick={() => { onSave(selectedImage); handleClose(); }} className="btn-solid-purple">Save</button>
                            </div>
                        </>
                    )}

                    {view === 'remove' && (
                        <>
                            <div className="remove-preview-flow">
                                <div className="img-circle-small">
                                    <img src={currentImage} alt="Old" />
                                </div>
                                <div className="flow-arrow">
                                    <ArrowRight size={20} color="#B800C4" />
                                </div>
                                <div className="img-circle-small placeholder-bg">
                                    <span>P</span>
                                </div>
                            </div>
                            <p className="modal-description-text-small">
                                Your previous picture will be replaced with the new image.
                            </p>
                            <div className="modal-actions-custom">
                                <button onClick={() => setView('main')} className="btn-outline-cancel">Cancel</button>
                                <button onClick={() => { onRemove(); handleClose(); }} className="btn-solid-red">Remove</button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <style>{`
                .modal-overlay {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0, 0, 0, 0.4);
                    backdrop-filter: blur(4px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 4000;
                }
                .profile-modal {
                    background: white;
                    width: 100%;
                    max-width: 440px;
                    border-radius: 32px;
                    padding: 2.5rem;
                    position: relative;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
                }
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                }
                .modal-title-custom {
                    font-size: 1.75rem;
                    font-weight: 800;
                    color: #1e293b;
                    margin: 0;
                }
                .close-corner-btn-purple {
                    background: none;
                    border: 1px solid #f1f5f9;
                    color: #B800C4;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .close-corner-btn-purple:hover {
                    background: #fdf4ff;
                    border-color: #fce7f3;
                }

                .modal-body-custom {
                    text-align: center;
                }
                .image-display-container {
                    width: 160px;
                    height: 160px;
                    margin: 0 auto 2rem;
                    border-radius: 50%;
                    overflow: hidden;
                }
                .large-circle-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .modal-description-text {
                    color: #64748b;
                    font-size: 1rem;
                    line-height: 1.6;
                    margin-bottom: 2.5rem;
                    padding: 0 1rem;
                }
                .modal-description-text-small {
                    color: #64748b;
                    font-size: 0.95rem;
                    margin-bottom: 2.5rem;
                }

                .modal-actions-custom {
                    display: flex;
                    gap: 1.25rem;
                }
                .btn-solid-purple {
                    flex: 1;
                    background: #B800C4;
                    color: white;
                    padding: 1rem;
                    border-radius: 12px;
                    font-weight: 700;
                    cursor: pointer;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.2s;
                }
                .btn-solid-purple:hover { transform: translateY(-2px); }

                .btn-outline-remove {
                    flex: 1;
                    background: white;
                    color: #ff4757;
                    border: 1px solid #f1f5f9;
                    padding: 1rem;
                    border-radius: 12px;
                    font-weight: 700;
                    cursor: pointer;
                }
                .btn-outline-remove:hover { background: #fff5f5; border-color: #fedada; }

                .btn-outline-cancel {
                    flex: 1;
                    background: white;
                    color: #B800C4;
                    border: 1px solid #f1f5f9;
                    padding: 1rem;
                    border-radius: 12px;
                    font-weight: 700;
                    cursor: pointer;
                }
                .btn-outline-cancel:hover { background: #fdf4ff; border-color: #fce7f3; }

                .btn-solid-red {
                    flex: 1;
                    background: #ff4757;
                    color: white;
                    padding: 1rem;
                    border-radius: 12px;
                    font-weight: 700;
                    border: none;
                    cursor: pointer;
                }
                .btn-solid-red:hover { background: #ee3141; }

                /* Remove View Specifics */
                .remove-preview-flow {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }
                .img-circle-small {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 2px solid #f1f5f9;
                }
                .img-circle-small img { width: 100%; height: 100%; object-fit: cover; }
                .placeholder-bg {
                    background: #cbd5e1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 3rem;
                    font-weight: 800;
                    color: white;
                }
                .flow-arrow {
                    background: white;
                    padding: 8px;
                    border-radius: 50%;
                    display: flex;
                }

                .pop-in { animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
                @keyframes popIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
            `}</style>
        </div>
    );
};

export default ProfileImageModal;
