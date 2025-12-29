import { motion, AnimatePresence } from 'framer-motion';
import { X, Construction } from 'lucide-react';
import { useEffect } from 'react';

interface ComingSoonProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
}

export default function ComingSoon({ isOpen, onClose, featureName = "Esta función" }: ComingSoonProps) {
  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 overflow-hidden z-10"
          >
             {/* Decorative background blob */}
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl" />
             
             <button 
                onClick={onClose} 
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
             >
                <X size={20} className="text-gray-500" />
             </button>

             <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mb-4 text-yellow-500">
                   <Construction size={32} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Próximamente</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                   Estamos trabajando duro para traerte <strong>{featureName}</strong> muy pronto. 
                   ¡Gracias por tu paciencia!
                </p>
                
                <button 
                  onClick={onClose}
                  className="mt-6 w-full py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
                >
                  Entendido
                </button>
             </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
