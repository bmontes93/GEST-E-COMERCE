import { Button } from '../components/ui/Button';
import FeaturesSection from '../components/FeaturesSection';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function WhyJoinPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="grow pt-8 pb-16">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
            <h1 className="text-4xl font-extrabold text-text-main mb-4">
                Únete a la Revolución Food Saver
            </h1>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
                Más que una app, somos una comunidad comprometida con el planeta y el buen comer.
            </p>
        </div>

        <FeaturesSection />

        <div className="container mx-auto px-4 text-center mt-16">
             <div className="bg-surface border border-gray-100 rounded-3xl p-8 max-w-3xl mx-auto shadow-lg">
                <h2 className="text-2xl font-bold mb-4">¿Tienes un negocio de comida?</h2>
                <p className="text-text-muted mb-6">
                    Convierte tus pérdidas en ganancias y atrae nuevos clientes. Únete como partner hoy mismo.
                </p>
                <Link to="/register">
                    <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary/5">
                        Registrar mi Negocio
                    </Button>
                </Link>
             </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
