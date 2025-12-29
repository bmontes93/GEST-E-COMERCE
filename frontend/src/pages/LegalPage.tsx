import React, { useState } from 'react';
import Footer from '../components/Footer';

const LegalContent = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
        <div className="prose prose-emerald max-w-none text-gray-600">
            {children}
        </div>
    </div>
);

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'cookies'>('terms');

  return (
    <div className="flex flex-col min-h-screen">
      <div className="grow bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-5xl">
            <h1 className="text-4xl font-extrabold text-center mb-12">Centro Legal</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:w-64 shrink-0">
                    <div className="bg-white rounded-2xl p-4 shadow-xs sticky top-24">
                        <nav className="flex flex-col gap-2">
                            <button 
                                onClick={() => setActiveTab('terms')}
                                className={`text-left px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'terms' ? 'bg-primary text-white' : 'hover:bg-gray-50 text-gray-600'}`}
                            >
                                Términos y Condiciones
                            </button>
                            <button 
                                onClick={() => setActiveTab('privacy')}
                                className={`text-left px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'privacy' ? 'bg-primary text-white' : 'hover:bg-gray-50 text-gray-600'}`}
                            >
                                Política de Privacidad
                            </button>
                            <button 
                                onClick={() => setActiveTab('cookies')}
                                className={`text-left px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'cookies' ? 'bg-primary text-white' : 'hover:bg-gray-50 text-gray-600'}`}
                            >
                                Política de Cookies
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Content Area */}
                <div className="grow bg-white rounded-3xl p-8 lg:p-12 shadow-sm">
                    {activeTab === 'terms' && (
                        <LegalContent title="Términos y Condiciones de Uso">
                            <p className="lead">Última actualización: 15 de Diciembre de 2025</p>
                            
                            <h3>1. Aceptación de los Términos</h3>
                            <p>
                                Al acceder o utilizar la plataforma Gest, usted acepta estar legalmente vinculado por estos Términos y Condiciones. 
                                Si no acepta estos términos en su totalidad, no debe utilizar nuestros servicios.
                            </p>

                            <h3>2. Descripción del Servicio</h3>
                            <p>
                                Gest actúa como intermediario facilitando la conexión entre establecimientos de alimentos ("Partners") y usuarios finales 
                                para la venta de excedentes de alimentos bajo la modalidad de "Packs Sorpresa". 
                                Gest no prepara, manipula ni entrega los alimentos directamente.
                            </p>

                            <h3>3. Cuentas de Usuario</h3>
                            <p>
                                Usted es responsable de mantener la confidencialidad de su cuenta y contraseña. 
                                Gest se reserva el derecho de suspender cuentas que violen nuestras políticas de uso aceptable o reporten actividad fraudulenta.
                            </p>

                            <h3>4. Política de Reembolsos</h3>
                            <p>
                                Debido a la naturaleza perecedera de los productos, solo se aceptarán reembolsos si el producto estaba en mal estado al momento 
                                de la recogida, previa evidencia fotográfica enviada a nuestro soporte dentro de las 2 horas posteriores a la recolección.
                            </p>
                        </LegalContent>
                    )}

                    {activeTab === 'privacy' && (
                        <LegalContent title="Política de Privacidad">
                            <p className="lead">Su privacidad es nuestra prioridad.</p>

                            <h3>1. Información Recopilada</h3>
                            <p>
                                Recopilamos información personal que usted nos proporciona directamente, como nombre, correo electrónico, número de teléfono 
                                y datos de ubicación para mostrarle ofertas cercanas. No almacenamos datos completos de tarjetas de crédito; estos son procesados 
                                de forma segura por nuestros proveedores de pagos.
                            </p>

                            <h3>2. Uso de la Información</h3>
                            <p>
                                Utilizamos sus datos para:
                                <ul>
                                    <li>Procesar sus pedidos y facilitar la recolección.</li>
                                    <li>Enviarle notificaciones sobre el estado de su pedido.</li>
                                    <li>Mejorar nuestros algoritmos de recomendación.</li>
                                    <li>Cumplir con obligaciones legales.</li>
                                </ul>
                            </p>

                            <h3>3. Compartir Información</h3>
                            <p>
                                Solo compartimos los datos necesarios con el Partner (nombre y número de orden) para la entrega del pedido. 
                                Nunca vendemos sus datos a terceros con fines publicitarios.
                            </p>
                        </LegalContent>
                    )}

                    {activeTab === 'cookies' && (
                        <LegalContent title="Política de Cookies">
                            <h3>1. ¿Qué son las Cookies?</h3>
                            <p>
                                Las cookies son pequeños archivos de texto que se almacenan en su navegador cuando visita nuestro sitio web. 
                                Nos permiten recordar sus preferencias y mantener su sesión iniciada.
                            </p>

                            <h3>2. Tipos de Cookies que Usamos</h3>
                            <p>
                                <strong>Esenciales:</strong> Necesarias para el funcionamiento básico del sitio (ej. login, carrito).<br/>
                                <strong>Analíticas:</strong> Nos ayudan a entender cómo los usuarios interactúan con la plataforma (Google Analytics).<br/>
                                <strong>Funcionales:</strong> Recuerdan sus preferencias de idioma o ubicación.
                            </p>

                            <h3>3. Control de Cookies</h3>
                            <p>
                                Puede configurar su navegador para rechazar todas las cookies o indicar cuándo se envía una cookie. 
                                Sin embargo, algunas características de Gest pueden no funcionar correctamente sin ellas.
                            </p>
                        </LegalContent>
                    )}
                </div>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
