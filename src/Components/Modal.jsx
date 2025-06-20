import React from "react";
import close from "../assets/close.svg"

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="overflow-y-auto bg-transparent">
      <div className="fixed top-0 left-0 w-full min-h-full flex items-center justify-center">
        <div
          className="fixed top-0 left-0 w-full h-full bg-[#00000083]"
          onClick={onClose}
        ></div>
        <div
          className="relative w-1/2 h-auto bg-white p-10 rounded-[20px]"
          style={{ maxHeight: "90vh", overflowY: "auto" }}
        >
          <button
            className="absolute top-2 right-2 text-gray-600 m-5"
            onClick={onClose}
          >
            <img src={close} alt="" srcset="" />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
