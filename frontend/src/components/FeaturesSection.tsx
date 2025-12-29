import { motion } from 'framer-motion';
import { PiggyBank, Leaf, Heart } from 'lucide-react';

const features = [
  {
    icon: PiggyBank,
    title: 'Ahorra Dinero',
    description: 'Consigue comida de alta calidad con descuentos de hasta el 70% sobre el precio habitual.',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10'
  },
  {
    icon: Leaf,
    title: 'Ayuda al Planeta',
    description: 'Cada pack salvado reduce el desperdicio de alimentos y las emisiones de CO2. ¡Sé un héroe local!',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10'
  },
  {
    icon: Heart,
    title: 'Apoya Local',
    description: 'Descubre nuevos negocios en tu zona y ayuda a los comerciantes a reducir sus pérdidas.',
    color: 'text-rose-500',
    bg: 'bg-rose-500/10'
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-emerald-950 text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10">
         <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-emerald-400 blur-[100px]" />
         <div className="absolute top-[30%] right-[10%] w-[30%] h-[60%] rounded-full bg-teal-400 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
            ¿Por qué unirte a la revolución?
          </h2>
          <p className="text-emerald-100/80 text-lg max-w-2xl mx-auto">
            Únete a una comunidad que valora la comida, el ahorro y la sostenibilidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors"
            >
              <div className={`w-14 h-14 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
