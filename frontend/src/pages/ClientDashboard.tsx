import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp, Search, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const ClientDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-text-main tracking-tight">
            Hola, <span className="text-primary">Explorador</span> 👋
          </h1>
          <p className="text-text-muted mt-1">
            Descubre qué hay de bueno hoy en <span className="font-bold text-text-main">Huaraz</span>.
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
          <MapPin className="h-4 w-4 text-red-500 animate-bounce" />
          <span className="text-sm font-bold text-gray-700">Huaraz, Ancash</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Comida Salvada', value: '2.5 kg', sub: 'En Huaraz', icon: TrendingUp, color: 'bg-emerald-100 text-emerald-700' },
          { label: 'Dinero Ahorrado', value: 'S/ 45.00', sub: 'Último mes', icon: Star, color: 'bg-amber-100 text-amber-700' },
          { label: 'Negocios Apoyados', value: '4', sub: 'Locales', icon: MapPin, color: 'bg-blue-100 text-blue-700' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4"
          >
            <div className={`p-4 rounded-xl ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-xs text-gray-400">{stat.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Discovery Feed */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-text-main flex items-center">
            <Search className="mr-2 h-5 w-5 text-primary" />
            Cerca de Ti en Huaraz
          </h2>
          <Button variant="outline" size="sm">Ver Mapa</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {/* Mock Data for Huaraz Context */}
           {[
             { name: "California Café", type: "Cafetería", dist: "0.2 km", price: "S/ 12.00", img: "/images/cafe.png" },
             { name: "Trivio", type: "Restobar", dist: "0.4 km", price: "S/ 22.00", img: "/images/burger.png" },
             { name: "La Ibérica", type: "Chocolatería", dist: "0.1 km", price: "S/ 15.00", img: "/images/bakery.png" },
           ].map((place, i) => (
             <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all"
             >
                <div className="h-48 relative overflow-hidden">
                    <img src={place.img} alt={place.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
                        {place.dist}
                    </div>
                </div>
                <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="font-bold text-lg text-gray-900 leading-tight">{place.name}</h3>
                            <p className="text-sm text-gray-500">{place.type}</p>
                        </div>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-bold">
                            -50%
                        </span>
                    </div>
                    <div className="flex items-end justify-between mt-4">
                         <div>
                             <span className="text-xs text-gray-400 line-through">S/ {parseInt(place.price.replace(/\D/g,'')) * 2}</span>
                             <p className="text-xl font-extrabold text-primary">{place.price}</p>
                         </div>
                         <Button size="sm">Reservar</Button>
                    </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
