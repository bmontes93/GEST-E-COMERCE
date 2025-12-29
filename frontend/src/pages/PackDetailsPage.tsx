import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { MapPin, Clock, Star, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

// Reuse interface or import it if centralized
interface Pack {
  id: number;
  businessName: string;
  distance: string;
  originalPrice: string;
  discountedPrice: string;
  timeLeft: string;
  tags: string[];
  imageUrl: string;
  itemsLeft: number;
  description?: string;
  rating?: number;
}

const PackDetailsPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    
    // State
    const [pack, setPack] = useState<Pack | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    // Mock reservation slots
    const timeSlots = ["14:00 - 14:30", "14:30 - 15:00", "15:00 - 15:30"];

    useEffect(() => {
        // Try to get data from navigation state first (smooth transition)
        if (location.state?.pack) {
            setPack(location.state.pack);
            setLoading(false);
            return;
        }

        // Fallback: Fetch all and find (since we don't have single item endpoint yet)
        const fetchPack = async () => {
             try {
                const data = await api.get<Pack[]>('/api/packs');
                const found = data.find((p: Pack) => p.id === Number(id));
                setPack(found || null);
             } catch (e) {
                 console.error(e);
             } finally {
                 setLoading(false);
             }
        };
        fetchPack();
    }, [id, location.state]);

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;
    if (!pack) return <div className="min-h-screen flex items-center justify-center">Pack no encontrado</div>;

    const handleReserve = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        if(!selectedTime) {
            alert("Por favor selecciona una hora de recogida");
            return;
        }

        try {
            await api.post('/api/reservations/', {
                pack_id: pack!.id,
                user_id: user.id,
                pickup_time: selectedTime
            });

            navigate('/reservation/success', { state: { pack, time: selectedTime } });
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : "Error al reservar";
            alert(`Error: ${msg}`);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header Image */}
            <div className="relative h-[40vh] w-full">
                <img src={pack.imageUrl} alt={pack.businessName} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute top-6 left-6">
                    <Button variant="ghost" className="text-white hover:bg-white/20" onClick={() => navigate(-1)}>
                        <ArrowLeft className="mr-2 h-5 w-5" /> Volver
                    </Button>
                </div>
            </div>

            <main className="container mx-auto px-4 -mt-20 relative z-10 mb-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Title Card */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-3xl p-8 shadow-sm"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{pack.businessName}</h1>
                                    <div className="flex items-center gap-4 text-gray-500 text-sm">
                                        <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {pack.distance}</span>
                                        <span className="flex items-center text-yellow-500"><Star className="w-4 h-4 mr-1 fill-current" /> {pack.rating || 4.5} (50+ reviews)</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-400 line-through mb-1">{pack.originalPrice}</p>
                                    <p className="text-3xl font-bold text-secondary">{pack.discountedPrice}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {(pack.tags || []).map(tag => (
                                    <span key={tag} className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h3 className="font-bold text-lg mb-3">Sobre este Pack Sorpresa</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                {pack.description || "Salva deliciosa comida preparada con ingredientes frescos del día. El contenido es sorpresa, pero siempre delicioso y de alta calidad."}
                            </p>
                            
                            <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl text-orange-800 text-sm font-medium">
                                <Clock className="w-5 h-5 shrink-0" />
                                <span>Recogida hoy hasta las: {pack.timeLeft}</span>
                            </div>
                        </motion.div>

                        {/* Location Mock */}
                        {/* Google Maps Embed (Demo Friendly) */}
                        <div className="bg-white rounded-3xl p-2 shadow-sm h-64 overflow-hidden border border-gray-100 relative group">
                             <iframe 
                                width="100%" 
                                height="100%" 
                                frameBorder="0" 
                                style={{ border: 0, borderRadius: '1rem' }}
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(pack.businessName + ", Huaraz")}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                                title="Mapa del local"
                                className="grayscale-20 group-hover:grayscale-0 transition-all duration-500"
                             ></iframe>
                        </div>
                    </div>

                    {/* Sidebar / Booking */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl p-6 shadow-xl sticky top-24 border border-gray-100">
                            <h3 className="text-xl font-bold mb-6">Completa tu reserva</h3>
                            
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-3">Hora de recogida estimada</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {timeSlots.map(time => (
                                        <button
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                                                selectedTime === time 
                                                ? 'bg-primary text-white shadow-md' 
                                                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-4 mb-6">
                                <div className="flex justify-between mb-2 text-sm">
                                    <span className="text-gray-600">Pack Sorpresa x1</span>
                                    <span className="font-medium">{pack.discountedPrice}</span>
                                </div>
                                <div className="flex justify-between mb-2 text-sm">
                                    <span className="text-gray-600">Tarifa de servicio</span>
                                    <span className="font-medium">S/ 1.00</span>
                                </div>
                                <div className="flex justify-between pt-2 border-t border-gray-100 font-bold text-lg">
                                    <span>Total</span>
                                    <span>S/ {(parseFloat(pack.discountedPrice.replace('S/ ', '')) + 1.00).toFixed(2)}</span>
                                </div>
                            </div>

                            <Button 
                                size="lg" 
                                className="w-full text-lg shadow-lg shadow-emerald-500/20"
                                onClick={handleReserve}
                                disabled={!selectedTime}
                            >
                                Confirmar y Pagar
                            </Button>
                            <p className="text-xs text-center text-gray-400 mt-4">
                                Pago seguro en el establecimiento o vía app.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PackDetailsPage;
