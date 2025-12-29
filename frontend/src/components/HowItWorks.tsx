import { motion } from 'framer-motion';
import { Search, ShoppingBag, Utensils } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: '1. Explora',
    description: 'Encuentra packs sorpresa disponibles cerca de ti en nuestro mapa interactivo o lista.'
  },
  {
    icon: ShoppingBag,
    title: '2. Reserva',
    description: 'Compra tu pack a través de la app por una fracción de su precio original.'
  },
  {
    icon: Utensils,
    title: '3. Recoge y Disfruta',
    description: 'Ve al establecimiento en el horario indicado, muestra tu pedido y ¡salva comida deliciosa!'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-text-main sm:text-4xl mb-4">
            ¿Cómo funciona Gest?
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Salvar comida y dinero es más fácil de lo que crees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-linear-to-r from-emerald-500/0 via-emerald-500/30 to-emerald-500/0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-surface border-4 border-emerald-50 shadow-xl mb-6 z-10">
                <step.icon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-text-main mb-3">{step.title}</h3>
              <p className="text-text-muted leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
