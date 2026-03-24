import { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalOverlayProps {
  onClose: () => void;
  children: React.ReactNode;
  /** Extra classes on the inner white panel */
  panelClassName?: string;
}

export default function ModalOverlay({ onClose, children, panelClassName = '' }: ModalOverlayProps) {
  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto relative taped-card ${panelClassName}`}
        style={{ transform: 'rotate(0deg)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-amber transition-colors z-10 border-2 border-black"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
}
