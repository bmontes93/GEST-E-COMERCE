import React, { useState } from 'react';
import { api } from '../../lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Package, Plus, DollarSign, Clock, LayoutDashboard, Store, LogOut, ChevronRight } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

// Define types (kept simple for this example, ideally moved to types file)
interface NewPackData {
    businessName: string;
    distance: string;
    originalPrice: string;
    discountedPrice: string;
    timeLeft: string;
    itemsLeft: number;
    imageUrl: string;
    rating: number;
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
    const { user } = useAuth(); // Assuming logout exists or user clears localstorage
    const queryClient = useQueryClient();

    // Form State
    const [formData, setFormData] = useState<NewPackData>({
        businessName: "Mi Negocio", 
        distance: "0 km",
        originalPrice: "",
        discountedPrice: "",
        timeLeft: "",
        itemsLeft: 5,
        imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
        rating: 5.0
    });

    // Create Pack Mutation
    const mutation = useMutation({
        mutationFn: async (newPack: NewPackData) => {
            if (!user?.id) throw new Error("User not valid");
            
            const payload = { ...newPack, provider_id: user.id };
            
            // In a real app, use environment variable for API URL
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

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Sidebar / Navigation Placeholder for Dashboard context */}
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                 <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Sidebar Area */}
                    <aside className="lg:w-64 shrink-0">
                        <Card className="p-6 sticky top-24 border-none shadow-lg bg-surface/80 backdrop-blur-xl">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Store className="text-primary h-6 w-6" />
                                </div>
                                <div>
                                    <h2 className="font-bold text-text-main">Mi Negocio</h2>
                                    <p className="text-xs text-text-muted">Panel de Control</p>
                                </div>
                            </div>
                            
                            <nav className="space-y-2">
                                <Button variant="ghost" className="w-full justify-start text-primary bg-primary/5 font-semibold">
                                    <LayoutDashboard className="mr-3 h-4 w-4" /> Resumen
                                </Button>
                                <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-primary hover:bg-gray-50">
                                    <Package className="mr-3 h-4 w-4" /> Mis Packs
                                </Button>
                                 <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-primary hover:bg-gray-50">
                                    <Clock className="mr-3 h-4 w-4" /> Historial
                                </Button>
                            </nav>

                            <div className="mt-8 pt-8 border-t border-gray-100">
                                 <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 border-red-100" onClick={() => {/* logout logic */}}>
                                    <LogOut className="mr-3 h-4 w-4" /> Cerrar Sesión
                                </Button>
                            </div>
                        </Card>
                    </aside>

                    {/* Main Content */}
                    <main className="grow space-y-8">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-extrabold text-text-main">Hola, {user?.email?.split('@')[0] || 'Partner'} 👋</h1>
                                <p className="text-text-muted">Aquí tienes el resumen de tu actividad hoy.</p>
                            </div>
                            <Button onClick={() => setOpenForm(!openForm)} size="lg" className="shadow-lg shadow-primary/20">
                                <Plus className="mr-2 h-5 w-5" /> Nuevo Pack Sorpresa
                            </Button>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatCard 
                                icon={Package} 
                                label="Packs Activos" 
                                value="3" 
                                trend="+2 hoy"
                                color="text-primary bg-primary/10" 
                            />
                            <StatCard 
                                icon={DollarSign} 
                                label="Ingresos Hoy" 
                                value="S/ 85.00" 
                                trend="+15% vs ayer"
                                color="text-primary bg-primary/10" 
                            />
                            <StatCard 
                                icon={Clock} 
                                label="Tiempo Promedio" 
                                value="2.5h" 
                                color="text-secondary bg-secondary/10" 
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

                        {/* Recent Activity / List */}
                        <div>
                             <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Actividad Reciente</h3>
                                <Button variant="ghost" className="text-primary hover:text-emerald-700 text-sm">
                                    Ver todo <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                             </div>
                             
                             <div className="space-y-4">
                                {/* Placeholder Item 1 */}
                                <Card className="p-4 flex items-center justify-between hover:shadow-md transition-shadow border-gray-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-2xl">🍱</div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">Pack Sorpresa Almuerzo</h4>
                                            <p className="text-sm text-gray-500">Publicado hace 2 horas • 5 unidades</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full mb-1">Activo</span>
                                        <p className="font-bold text-gray-900">S/ 12.00</p>
                                    </div>
                                </Card>

                                {/* Placeholder Item 2 */}
                                 <Card className="p-4 flex items-center justify-between hover:shadow-md transition-shadow border-gray-100 opacity-75">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-2xl">🥐</div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">Caja de Panadería</h4>
                                            <p className="text-sm text-gray-500">Ayer • 0 unidades</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded-full mb-1">Agotado</span>
                                        <p className="font-bold text-gray-900">S/ 8.50</p>
                                    </div>
                                </Card>
                             </div>
                        </div>
                    </main>
                 </div>
            </div>
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
