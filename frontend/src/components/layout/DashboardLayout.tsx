import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
    LayoutDashboard, 
    Map as MapIcon, 
    ShoppingBag, 
    Store, 
    Settings, 
    LogOut, 
    Menu, 
    X,
    Heart,
    Leaf
} from 'lucide-react';
import { Button } from '../ui/Button';

export const DashboardLayout = () => {
    const { user, logout, role } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path: string) => location.pathname === path;

    const clientLinks = [
        { path: '/client/home', label: 'Descubrir', icon: LayoutDashboard },
        { path: '/client/map', label: 'Mapa Cercano', icon: MapIcon },
        { path: '/client/orders', label: 'Mis Pedidos', icon: ShoppingBag },
        { path: '/client/favorites', label: 'Favoritos', icon: Heart },
    ];

    const providerLinks = [
        { path: '/provider', label: 'Panel Principal', icon: LayoutDashboard },
        { path: '/provider/packs', label: 'Gestionar Packs', icon: ShoppingBag },
        { path: '/provider/business', label: 'Mi Negocio', icon: Store },
        { path: '/provider/settings', label: 'Configuración', icon: Settings },
    ];

    const links = role === 'provider' ? providerLinks : clientLinks;

    // Check if user has city set (soft check for now)
    const isHuaraz = user?.businessName ? true : true; // In real app check user.city === 'Huaraz'

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar Mobile Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 z-50 h-full w-64 bg-surface border-r border-border transition-transform duration-300 lg:translate-x-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2">
                        <Leaf className="h-6 w-6 text-primary" />
                        <span className="font-extrabold text-xl tracking-tight">Gest</span>
                    </Link>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-text-muted">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="px-4 py-2">
                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 mb-6">
                        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                            {role === 'provider' ? 'Negocio Local' : 'Usuario'}
                        </p>
                        <p className="font-medium text-text-main truncate">{user?.name}</p>
                        <p className="text-xs text-text-muted truncate">{user?.email}</p>
                    </div>

                    <nav className="space-y-1">
                        {links.map((link) => {
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`
                                        flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                                        ${isActive(link.path) 
                                            ? 'bg-primary text-white shadow-lg shadow-primary/25 font-bold' 
                                            : 'text-text-muted hover:bg-gray-100 hover:text-text-main font-medium'}
                                    `}
                                >
                                    <Icon className={`h-5 w-5 ${isActive(link.path) ? 'text-white' : 'text-current'}`} />
                                    <span>{link.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-4 border-t border-border">
                    <Button 
                        variant="secondary" 
                        fullWidth 
                        onClick={() => {
                            logout();
                            navigate('/login');
                        }}
                        className="flex items-center justify-center space-x-2"
                    >
                        <LogOut className="h-4 w-4" />
                        <span>Cerrar Sesión</span>
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 min-h-screen flex flex-col">
                {/* Mobile Header */}
                <header className="lg:hidden bg-surface border-b border-border p-4 flex items-center justify-between sticky top-0 z-30">
                    <button onClick={() => setIsSidebarOpen(true)} className="text-text-main">
                        <Menu className="h-6 w-6" />
                    </button>
                    <span className="font-bold text-lg">Gest</span>
                    <div className="w-6" /> {/* Spacer */}
                </header>

                <div className="flex-1 p-4 md:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};
