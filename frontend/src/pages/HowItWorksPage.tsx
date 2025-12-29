import { Button } from '../components/ui/Button';
import HowItWorks from '../components/HowItWorks';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="grow pt-8 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
            <h1 className="text-4xl font-extrabold text-text-main mb-4">
                Tu Guía para Salvar Comida
            </h1>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
                Descubre lo fácil que es combatir el desperdicio y disfrutar de comida increíble a precios insuperables.
            </p>
        </div>
        
        <HowItWorks />

        <div className="container mx-auto px-4 text-center mt-12">
            <Link to="/">
                <Button size="lg" className="rounded-full px-8 text-lg bg-primary hover:bg-emerald-700">
                    Comenzar a Explorar
                </Button>
            </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
