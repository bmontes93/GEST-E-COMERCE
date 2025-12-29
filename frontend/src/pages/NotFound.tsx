import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <h1 className="text-9xl font-extrabold text-gray-200">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
             <span className="text-2xl font-bold text-gray-800">Página no encontrada</span>
          </div>
        </motion.div>
        
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe o ha sido movida. 
          Regresa al inicio para encontrar más packs sorpresa.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link to="/">
            <Button size="lg" className="rounded-full">
               <Home className="mr-2 h-4 w-4" /> Ir al Inicio
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="rounded-full" onClick={() => window.history.back()}>
               <ArrowLeft className="mr-2 h-4 w-4" /> Volver
          </Button>
        </div>
      </div>
    </div>
  );
}
