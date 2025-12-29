import { Mail, MapPin, Phone } from 'lucide-react';
import Footer from '../components/Footer';
import { Button } from '../components/ui/Button';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="grow py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-extrabold text-text-main mb-4">Contáctanos</h1>
                <p className="text-text-muted text-lg">Estamos aquí para ayudarte. Mándanos un mensaje.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl overflow-hidden shadow-xl">
                 {/* Contact Info Side */}
                 <div className="bg-primary p-12 text-white flex flex-col justify-between">
                     <div>
                         <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
                         <p className="text-emerald-100 mb-12">
                             ¿Tienes dudas sobre tu pedido o quieres ser partner? Escríbenos.
                         </p>
                         
                         <div className="space-y-6">
                             <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 backdrop-blur-sm">
                                     <Mail className="w-6 h-6" />
                                 </div>
                                 <div>
                                     <p className="text-sm text-emerald-200 uppercase tracking-wider font-semibold">Email</p>
                                     <p className="font-medium text-lg">hola@gest.com</p>
                                 </div>
                             </div>
                             <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 backdrop-blur-sm">
                                     <Phone className="w-6 h-6" />
                                 </div>
                                  <div>
                                     <p className="text-sm text-emerald-200 uppercase tracking-wider font-semibold">Teléfono</p>
                                     <p className="font-medium text-lg">+51 987 654 321</p>
                                 </div>
                             </div>
                             <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 backdrop-blur-sm">
                                     <MapPin className="w-6 h-6" />
                                 </div>
                                  <div>
                                     <p className="text-sm text-emerald-200 uppercase tracking-wider font-semibold">Oficina</p>
                                     <p className="font-medium text-lg">Av. Luzuriaga 456, Huaraz<br/>Ancash, Perú</p>
                                 </div>
                             </div>
                         </div>
                     </div>
                     
                     <div className="mt-12">
                         {/* Abstract Map Graphic */}
                         <div className="w-full h-48 bg-emerald-800/50 rounded-2xl flex items-center justify-center text-emerald-200/50">
                             (Mapa Visual)
                         </div>
                     </div>
                 </div>

                 {/* Form Side */}
                 <div className="p-12">
                     <form className="space-y-6">
                         <div className="grid grid-cols-2 gap-6">
                             <div>
                                 <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
                                 <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" placeholder="Tu nombre" />
                             </div>
                             <div>
                                 <label className="block text-sm font-semibold text-gray-700 mb-2">Apellido</label>
                                 <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" placeholder="Tu apellido" />
                             </div>
                         </div>
                         <div>
                             <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                             <input type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" placeholder="hola@correo.com" />
                         </div>
                         <div>
                             <label className="block text-sm font-semibold text-gray-700 mb-2">Mensaje</label>
                             <textarea rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" placeholder="¿Cómo podemos ayudarte?" />
                         </div>
                         
                         <Button className="w-full py-4 text-base">Enviar Mensaje</Button>
                     </form>
                 </div>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
