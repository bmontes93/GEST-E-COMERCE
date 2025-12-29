import React from 'react';
import { Users, Store, Leaf, TrendingUp } from 'lucide-react';
import { Card } from '../../components/ui/Card';

const AdminDashboard: React.FC = () => {
    // Mock Data for Admin
    const stats = [
        { label: 'Usuarios Totales', value: '1,240', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Aliados Activos', value: '45', icon: Store, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { label: 'CO2 Evitado (Kg)', value: '8,500', icon: Leaf, color: 'text-green-500', bg: 'bg-green-500/10' },
        { label: 'Ingresos (Mes)', value: 'S/ 12k', icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Panel de Administración</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <Card key={index} className="p-6 flex items-center justify-between hover:shadow-lg transition-shadow bg-surface">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                            <h3 className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</h3>
                        </div>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <Card className="p-6 bg-surface">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Actividad Reciente</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4 text-sm border-b border-gray-100 pb-2">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span className="font-medium text-gray-700">Nuevo usuario registrado: Maria P.</span>
                                <span className="ml-auto text-gray-400 text-xs">Hace 5 min</span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Pending Approvals */}
                <Card className="p-6 bg-surface">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Solicitudes de Aliados</h3>
                    <div className="space-y-4">
                        {['Pizzería Don Pepe', 'Juguería San Carlos'].map((name, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="font-medium text-gray-700">{name}</span>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1 bg-green-500 text-white text-xs rounded-md font-bold">Aprobar</button>
                                    <button className="px-3 py-1 bg-red-100 text-red-500 text-xs rounded-md font-bold">Rechazar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
