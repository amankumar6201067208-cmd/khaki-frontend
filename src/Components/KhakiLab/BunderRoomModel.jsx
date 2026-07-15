import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const BunderRoomModel = ({ isOpen, onClose, children }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  // Always open scrolled to the very top.
  useEffect(() => {
    if (!isOpen) return;
    const id = requestAnimationFrame(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    });
    return () => cancelAnimationFrame(id);
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={scrollRef}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60"
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Modal box */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative bg-[url('/src/assets/Background/snow2.png')] w-full max-w-115 rounded-lg
                     transform transition-all duration-300 scale-100 opacity-100
                     animate-BunderRoomModel"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl font-bold cursor-pointer z-10"
          >
            ×
          </button>

          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default BunderRoomModel;
