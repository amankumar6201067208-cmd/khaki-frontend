import { useEffect } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative bg-[url('/src/assets/Background/snow2.png')] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg
                      transform transition-all duration-300 scale-100 opacity-100
                      animate-modal">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold cursor-pointer"
        >
          ×
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
