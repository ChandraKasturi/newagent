import React, { useState, useEffect } from "react";

const YouModal = ({
  isOpen,
  onClose,
  message,
  autoCloseDuration = 7000, // default to 4 seconds
}) => {
  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => {
        onClose();
      }, autoCloseDuration);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isOpen, onClose, autoCloseDuration]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full p-2"
          onClick={onClose}
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
              stroke="blue"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Content */}
        <div className="text-center">
          <svg
            className="mx-auto mb-4 text-gray-400 w-12 h-12"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
             stroke="blue"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v3m0 4h.01M20 12a8 8 0 11-16 0 8 8 0 0116 0z"
            />
          </svg>
          <p className="text-gray-700 text-lg">{message}</p>
        </div>

      
      </div>
    </div>
  );
};

export default YouModal;
