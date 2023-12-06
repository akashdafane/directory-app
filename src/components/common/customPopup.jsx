// import React from "react";
// import ReactDOM from "react-dom";


// const CustomPopup = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return ReactDOM.createPortal(
//     <div className="popup-overlay">
//       <div className="popup">
//         <button className="close-btn" onClick={onClose}>
//           Close
//         </button>
//         {children}
//       </div>
//     </div>,
//     document.getElementById("popup-root") // Place this root div in your index.html file
//   );
// };

// export default CustomPopup;

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Popup = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.popup')) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('popup-root') // Place this root div in your index.html file
  );
};

export default Popup;

