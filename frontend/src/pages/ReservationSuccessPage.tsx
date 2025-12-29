import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { CheckCircle2, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ReservationSuccessPage: React.FC = () => {
    const location = useLocation();
    const { pack, time } = location.state || {}; // Expect pack data and time

    if (!pack) {
        return (
            <div className="min-h-screen flex items-center justify-center flex-col gap-4">
                <p>No se encontró información de la reserva.</p>
                <Link to="/"><Button>Volver al inicio</Button></Link>
            </div>
        );
    }

    const [orderId] = React.useState(() => Math.floor(Math.random() * 1000000).toString().padStart(6, '0'));

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl shadow-xl max-w-md w-full overflow-hidden"
            >
                <div className="bg-emerald-500 p-8 text-center text-white">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <CheckCircle2 className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold mb-2">¡Reserva Confirmada!</h1>
                    <p className="text-emerald-100">Tu pack ha sido asegurado con éxito.</p>
                </div>

                <div className="p-8">
                    <div className="text-center mb-8">
                        <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">Código de Recogida</p>
                        <p className="text-4xl font-mono font-bold text-gray-800 tracking-widest bg-gray-100 py-3 rounded-xl border border-dashed border-gray-300">
                            #{orderId}
                        </p>
                    </div>

                    <div className="space-y-4 mb-8">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">{pack.businessName}</p>
                                <p className="text-sm text-gray-500">Av. Luzuriaga 456, Huaraz</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">Hoy, {time}</p>
                                <p className="text-sm text-gray-500">Horario de recogida</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Link to="/map" className="block">
                            <Button variant="outline" className="w-full">Ver cómo llegar</Button>
                        </Link>
                        <Link to="/" className="block">
                            <Button className="w-full">Volver al Inicio <ArrowRight className="ml-2 w-4 h-4"/></Button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ReservationSuccessPage;
