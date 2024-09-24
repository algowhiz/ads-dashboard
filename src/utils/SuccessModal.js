import React, { useEffect } from 'react';

const SuccessModal = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); 

    return () => clearTimeout(timer);
  }, [isVisible, onClose]);

  return (
    <div className={`success-modal ${isVisible ? 'visible' : ''}`}>
      <div className="modal-content">
        {message}
      </div>
    </div>
  );
};

export default SuccessModal;
