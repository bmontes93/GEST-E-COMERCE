import { Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="glass border-t border-white/20 pt-16 pb-8 mt-auto backdrop-blur-xl bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <span className="bg-primary text-white w-8 h-8 flex items-center justify-center rounded-lg">G</span>
                Gest
            </h3>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              Salvando comida deliciosa, un pack a la vez. Únete al movimiento contra el desperdicio.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors">
                {/* Genuine X Logo SVG */}
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                   <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-text-main mb-6">Descubrir</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li><Link to="/how-it-works" className="hover:text-primary transition-colors">Cómo funciona</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Negocios cercanos</Link></li>
              <li><Link to="/why-join" className="hover:text-primary transition-colors">Házte Partner</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text-main mb-6">Compañía</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li><Link to="/about" className="hover:text-primary transition-colors">Sobre nosotros</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">Carreras</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">Prensa</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contacto</Link></li>
            </ul>
          </div>

          <div>
             <h4 className="font-bold text-text-main mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li><Link to="/legal" className="hover:text-primary transition-colors">Términos y condiciones</Link></li>
              <li><Link to="/legal" className="hover:text-primary transition-colors">Privacidad</Link></li>
              <li><Link to="/legal" className="hover:text-primary transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-black/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2025 Gest App. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
