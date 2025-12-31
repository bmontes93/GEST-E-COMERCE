import React, { useState } from 'react';
import { api } from '../../lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Package, Plus, DollarSign, Clock, MapPin, AlertTriangle } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

// Define types
interface NewPackData {
    businessName: string;
    distance: string;
    originalPrice: string;
    discountedPrice: string;
    timeLeft: string;
    itemsLeft: number;
    imageUrl: string;
    rating: number;
    city: string;
    region: string;
}

interface StatCardProps {
    icon: React.ElementType;
    label: string;
    value: string;
    trend?: string;
    color: string;
}

const ProviderDashboard: React.FC = () => {
    const [openForm, setOpenForm] = useState(false);
    const { user } = useAuth();
    const queryClient = useQueryClient();

    // Location Validation State
    const [isLocationValid] = useState(() => {
        // In real app, check user.city === 'Huaraz'
        // For demo, we assume true if seeded correctly, or warn if missing.
        return user?.businessName ? true : false;
    });

    // Form State
    const [formData, setFormData] = useState<NewPackData>({
        businessName: user?.businessName || "Mi Negocio", 
        distance: "0 km",
        originalPrice: "",
        discountedPrice: "",
        timeLeft: "",
        itemsLeft: 5,
        imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
        rating: 5.0,
        city: "Huaraz",
        region: "Ancash"
    });

    // Create Pack Mutation
    const mutation = useMutation({
        mutationFn: async (newPack: NewPackData) => {
            if (!user?.id) throw new Error("User not valid");
            
            const payload = { ...newPack, provider_id: user.id };
            const response = await api.post('/api/packs/', payload);
            return response;
        },
        onSuccess: () => {
             alert('Pack Creado Exitosamente');
             setOpenForm(false);
             queryClient.invalidateQueries({ queryKey: ['packs'] });
        },
        onError: () => {
            alert('Error al crear pack. Verifique la conexión.');
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    if (!isLocationValid) {
        return (
             <div className="flex flex-col items-center justify-center h-[50vh] text-center p-8">
                <div className="bg-amber-100 p-4 rounded-full mb-4">
                    <AlertTriangle className="h-12 w-12 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Verificación de Ubicación Requerida</h2>
                <p className="text-gray-600 max-w-md mb-6">
                    Para operar en Gest, tu negocio debe estar ubicado en <strong>Huaraz</strong> o el Callejón de Huaylas. Por favor actualiza tu perfil.
                </p>
                <Button>Actualizar Ubicación</Button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-text-main">
                        Panel de Control <span className="text-primary">Gest</span>
                    </h1>
                    <div className="flex items-center mt-1 text-sm text-text-muted">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>Huaraz, Ancash</span>
                        <span className="mx-2">•</span>
                        <span>{user?.businessName}</span>
                    </div>
                </div>
                <Button onClick={() => setOpenForm(!openForm)} size="lg" className="shadow-lg shadow-primary/20">
                    <Plus className="mr-2 h-5 w-5" /> Nuevo Pack Sorpresa
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                    icon={Package} 
                    label="Packs Salvados" 
                    value="12" 
                    trend="+2 hoy"
                    color="text-emerald-600 bg-emerald-100" 
                />
                <StatCard 
                    icon={DollarSign} 
                    label="Ingresos Totales" 
                    value="S/ 240.00" 
                    trend="+15% este mes"
                    color="text-amber-600 bg-amber-100" 
                />
                <StatCard 
                    icon={Clock} 
                    label="Impacto Ambiental" 
                    value="5.2 kg" 
                    trend="CO2 evitado"
                    color="text-blue-600 bg-blue-100" 
                />
            </div>

            {/* Create Form Section */}
            <motion.div>
                {openForm && (
                    <Card className="p-8 mb-8 bg-white border-primary/20 shadow-xl overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                        <h2 className="text-2xl font-bold mb-6 flex items-center">
                            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 text-primary text-sm">1</span>
                            Publicar Nuevo Pack
                        </h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Precio Original (S/)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">S/</span>
                                        <input 
                                            type="number" 
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-hidden transition-all" 
                                            placeholder="30.00"
                                            value={formData.originalPrice}
                                            onChange={e => setFormData({...formData, originalPrice: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Precio Oferta (S/)</label>
                                        <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">S/</span>
                                        <input 
                                            type="number" 
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-hidden transition-all" 
                                            placeholder="12.00"
                                            value={formData.discountedPrice}
                                            onChange={e => setFormData({...formData, discountedPrice: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Hora Límite de Recojo</label>
                                <input 
                                    type="time" 
                                    className="w-full md:w-1/2 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-hidden transition-all" 
                                    value={formData.timeLeft}
                                    onChange={e => setFormData({...formData, timeLeft: e.target.value})}
                                />
                            </div>

                            <div className="pt-4 flex gap-4">
                                <Button type="button" variant="outline" className="w-full md:w-auto" onClick={() => setOpenForm(false)}>
                                    Cancelar
                                </Button>
                                <Button type="submit" className="w-full md:w-auto px-8" disabled={mutation.isPending}>
                                    {mutation.isPending ? <div className="flex items-center"><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div> Publicando...</div> : 'Publicar Pack Ahora'}
                                </Button>
                            </div>
                        </form>
                    </Card>
                )}
            </motion.div>
        </div>
    );
};

const StatCard = ({ icon: Icon, label, value, trend, color }: StatCardProps) => (
    <Card className="p-6 flex items-start justify-between bg-white border-none shadow-sm hover:shadow-md transition-shadow">
        <div>
             <p className="text-sm font-medium text-text-muted mb-1">{label}</p>
             <h3 className="text-2xl font-extrabold text-text-main mb-1">{value}</h3>
             {trend && <p className="text-xs font-semibold text-emerald-600 flex items-center">{trend}</p>}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
            <Icon size={22} className="text-current opacity-80" />
        </div>
    </Card>
)

export default ProviderDashboard;
