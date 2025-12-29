import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../lib/api';

import { Button } from '../components/ui/Button';
import { Lock, Mail, User, Store, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

type Role = 'client' | 'provider';

const Register: React.FC = () => {
    // const { login } = useAuth(); // Unused
    const navigate = useNavigate();
    
    // Form State
    const [role, setRole] = useState<Role>('client');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [businessName, setBusinessName] = useState('');
    
    // UI State
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await api.post('/api/auth/register', {
                email,
                password,
                name,
                role,
                businessName: role === 'provider' ? businessName : undefined
            });

            // Navigate to login
            navigate('/login');
            
        } catch (err: unknown) {
             // ApiError handling
            const errorMessage = err instanceof Error ? err.message : 'Error al registrarse';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-background">
            {/* Left Side - Image/Brand (Same theme as Login but slightly different image or gradient) */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary"
            >
                 <div className="absolute inset-0 z-10 bg-linear-to-b from-primary/80 to-black/60" />
                 <img 
                    src="/images/healthy.png"
                    alt="Register Food"
                    className="absolute inset-0 w-full h-full object-cover"
                 />
                 <div className="relative z-20 flex flex-col justify-between h-full p-16 text-white">
                    <div>
                        <Link to="/" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Inicio
                        </Link>
                    </div>
                    <div>
                        <h2 className="text-4xl font-extrabold mb-6">Empieza a marcar<br/>la diferencia.</h2>
                        <p className="text-xl text-gray-200 leading-relaxed max-w-lg">
                            {role === 'client' 
                                ? "Salva comida deliciosa, ahorra dinero y protege el planeta."
                                : "Convierte tus excedentes en oportunidades y conecta con nuevos clientes."}
                        </p>
                    </div>
                 </div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16 lg:p-24 bg-surface"
            >
                <div className="w-full max-w-md">
                   <div className="text-center mb-8">
                         <h1 className="text-3xl font-extrabold text-text-main mb-2">Crear Cuenta</h1>
                         <p className="text-text-muted">Elige cómo quieres unirte a Gest</p>
                   </div>
                   
                   {/* Role Selector */}
                   <div className="grid grid-cols-2 gap-4 mb-8">
                        <button 
                            type="button"
                            onClick={() => setRole('client')} 
                            className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${role === 'client' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 hover:border-gray-300 text-gray-500'}`}
                        >
                            <User size={24} />
                            <span className="font-bold text-sm">Soy Cliente</span>
                             {role === 'client' && <CheckCircle2 size={16} className="absolute top-2 right-2 text-primary" />}
                        </button>
                        <button 
                            type="button"
                            onClick={() => setRole('provider')} 
                            className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${role === 'provider' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 hover:border-gray-300 text-gray-500'}`}
                        >
                            <Store size={24} />
                            <span className="font-bold text-sm">Soy Negocio</span>
                        </button>
                   </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-center">
                            <span className="mr-2">⚠️</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                         <div>
                            <label className="block text-sm font-bold text-text-main mb-2">Nombre Completo</label>
                            <input 
                                type="text" 
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-hidden transition-all text-text-main"
                                placeholder="Juan Pérez"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                         {role === 'provider' && (
                             <div>
                                <label className="block text-sm font-bold text-text-main mb-2">Nombre del Negocio</label>
                                <input 
                                    type="text" 
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-hidden transition-all text-text-main"
                                    placeholder="Restaurante El Buen Sabor"
                                    value={businessName}
                                    onChange={(e) => setBusinessName(e.target.value)}
                                />
                            </div>
                         )}

                        <div>
                            <label className="block text-sm font-bold text-text-main mb-2">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted group-focus-within:text-primary transition-colors" />
                                <input 
                                    type="email" 
                                    required
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-hidden transition-all text-text-main"
                                    placeholder="hola@ejemplo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-text-main mb-2">Contraseña</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted group-focus-within:text-primary transition-colors" />
                                <input 
                                    type="password" 
                                    required
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-hidden transition-all text-text-main"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <Button type="submit" size="lg" className="w-full py-4 text-base font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-0.5" disabled={isLoading}>
                            {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
                            Registrarme
                        </Button>
                    </form>

                     <div className="mt-8 text-center text-sm text-text-muted">
                        ¿Ya tienes una cuenta? {' '}
                        <Link to="/login" className="font-bold text-text-main hover:text-primary underline transition-colors">
                            Inicia Sesión
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
