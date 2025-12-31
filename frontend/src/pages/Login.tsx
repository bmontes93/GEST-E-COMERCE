import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { SocialLoginButtons } from '../components/SocialLoginButtons';
import { Lock, Mail, Loader2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const user = await login(email, password);
             
            if (user.role === 'admin') {
                navigate('/admin');
            } else if (user.role === 'provider') {
                navigate('/provider');
            } else {
                navigate('/');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-background">
            {/* Left Side - Image/Brand */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary"
            >
                 <div className="absolute inset-0 z-10 bg-linear-to-b from-primary/80 to-black/60" />
                 <img 
                    src="/images/cafe.png"
                    alt="Food Login"
                    className="absolute inset-0 w-full h-full object-cover"
                 />
                 <div className="relative z-20 flex flex-col justify-between h-full p-16 text-white">
                    <div>
                        <Link to="/" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al inicio
                        </Link>
                    </div>
                    <div>
                        <h2 className="text-4xl font-extrabold mb-6">Únete al movimiento<br/>Zero Waste.</h2>
                        <p className="text-xl text-gray-200 leading-relaxed max-w-lg">
                            Descubre delicias locales a precios increíbles y ayuda a construir un futuro más sostenible.
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
                    <div className="text-center mb-10">
                        <Link to="/" className="lg:hidden inline-flex items-center text-gray-400 hover:text-gray-800 mb-8 transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                        </Link>
                        <h1 className="text-4xl font-extrabold text-text-main mb-2 tracking-tight">
                            Bienvenido de nuevo
                        </h1>
                        <p className="text-text-muted">Introduce tus credenciales para continuar</p>
                    </div>

                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-center"
                        >
                            <span className="mr-2">⚠️</span> {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-text-main mb-2">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted group-focus-within:text-primary transition-colors" />
                                <input 
                                    type="email" 
                                    required
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-hidden transition-all font-medium text-text-main"
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
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-hidden transition-all font-medium text-text-main"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center text-text-muted hover:text-text-main cursor-pointer transition-colors">
                                <input type="checkbox" className="mr-2 rounded-sm border-gray-300 text-primary focus:ring-primary" />
                                Recordarme
                            </label>
                            <a href="#" className="font-bold text-primary hover:text-emerald-600 transition-colors">¿Olvidaste tu contraseña?</a>
                        </div>

                        <Button type="submit" size="lg" className="w-full py-4 text-base font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-0.5" disabled={isLoading}>
                            {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
                            Iniciar Sesión
                        </Button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-surface px-2 text-text-muted">O continúa con</span>
                        </div>
                    </div>

                    <SocialLoginButtons />

                     <div className="mt-8 text-center text-sm text-text-muted">
                        ¿No tienes una cuenta? {' '}
                        <Link to="/register" className="font-bold text-text-main hover:text-primary underline transition-colors">
                            Regístrate gratis
                        </Link>
                    </div>


                </div>
            </motion.div>
        </div>
    );
};

export default Login;
