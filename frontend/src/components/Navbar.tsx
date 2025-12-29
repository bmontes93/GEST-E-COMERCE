import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Home, Map as MapIcon, User, Archive, BarChart, Leaf } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/Button';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { role, user, logout } = useAuth(); 

  // Dynamic Links based on Role
  const getLinks = () => {
    switch(role) {
      case 'provider':
        return [
          { name: 'Panel', path: '/provider', icon: Archive },
          { name: 'Perfil', path: '/profile', icon: User },
        ];
      case 'admin':
        return [
          { name: 'Admin', path: '/admin', icon: BarChart },
        ];
      default: // client
        return [
          { name: 'Inicio', path: '/', icon: Home },
          { name: 'Cómo funciona', path: '/how-it-works', icon: MapIcon },
          { name: 'Por qué unirte', path: '/why-join', icon: User },
        ];
    }
  };

  const links = getLinks();

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm sticky top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-primary/10 p-1.5 rounded-lg">
                <Leaf className="h-6 w-6 text-primary fill-primary/20" />
              </div>
              <span className="text-2xl font-black tracking-tight text-primary group-hover:text-primary/80 transition-colors">
                ReAprovecha
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
             {/* Auth Info */}
             {user ? (
                 <div className="flex items-center gap-3 mr-4">
                     <span className="text-sm font-medium text-gray-700">Hola, {user.name}</span>
                     <Button size="sm" variant="ghost" onClick={logout} className="text-xs h-8 px-2">Salir</Button>
                 </div>
             ) : (
                <Link to="/login">
                    <Button size="sm" variant="primary" className="mr-4">Ingresar</Button>
                </Link>
             )}

            <div className="flex items-baseline space-x-4">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={cn(
                      "relative flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive 
                        ? "text-primary bg-primary/10 font-bold" 
                        : "text-gray-600 hover:text-primary hover:bg-gray-50"
                    )}
                  >
                    <Icon className={cn("mr-2 h-4 w-4", isActive ? "text-primary" : "text-gray-400 group-hover:text-primary")} />
                    {link.name}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden glass border-b border-white/10 mt-2 rounded-xl overflow-hidden"
        >
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-medium",
                  location.pathname === link.path
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:bg-primary/5 hover:text-primary"
                )}
              >
                <div className="flex items-center">
                  <link.icon className="mr-3 h-5 w-5" />
                  {link.name}
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
