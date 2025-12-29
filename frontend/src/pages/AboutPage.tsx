import { ArrowRight, Leaf, Users, Globe, Briefcase, Newspaper } from 'lucide-react';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="grow">
        {/* Intro */}
        {/* Intro */}
        {/* Intro - Solid White */}
        <section className="py-24 text-center px-4 bg-white border-b border-gray-200">
             <div className="max-w-4xl mx-auto">
                 <div className="inline-flex items-center rounded-md bg-secondary/10 px-3 py-1 mb-8 border border-secondary/20">
                    <span className="text-xs font-bold text-primary tracking-widest uppercase">Nuestra Misión</span>
                 </div>
                 
                 <h1 className="text-5xl md:text-7xl font-black mb-8 text-primary tracking-tight leading-none">
                    Comida real.<br />
                    <span className="text-secondary">Impacto real.</span>
                 </h1>
                 
                 <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
                     Sin adornos. Sin desperdicio. Conectamos excedentes de calidad con personas que valoran la comida.
                 </p>
             </div>
        </section>

        {/* Stats - Solid Grey */}
        <section className="py-20 px-4 bg-background">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl">
                 <div className="bg-white border border-gray-200 shadow-solid rounded-2xl transition-all duration-300 hover:shadow-lifted hover:border-primary/30 hover:-translate-y-1 p-8 text-center">
                     <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100">
                         <Leaf className="text-secondary w-8 h-8" />
                     </div>
                     <h3 className="text-5xl font-black text-primary mb-2">10k+</h3>
                     <p className="text-gray-500 font-bold uppercase tracking-wider text-sm">Packs Salvados</p>
                 </div>
                 <div className="bg-white border border-gray-200 shadow-solid rounded-2xl transition-all duration-300 hover:shadow-lifted hover:border-primary/30 hover:-translate-y-1 p-8 text-center">
                     <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100">
                         <Users className="text-primary w-8 h-8" />
                     </div>
                     <h3 className="text-5xl font-black text-primary mb-2">5k+</h3>
                     <p className="text-gray-500 font-bold uppercase tracking-wider text-sm">Usuarios</p>
                 </div>
                 <div className="bg-white border border-gray-200 shadow-solid rounded-2xl transition-all duration-300 hover:shadow-lifted hover:border-primary/30 hover:-translate-y-1 p-8 text-center">
                     <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100">
                         <Globe className="text-accent w-8 h-8" />
                     </div>
                     <h3 className="text-5xl font-black text-primary mb-2">50+</h3>
                     <p className="text-gray-500 font-bold uppercase tracking-wider text-sm">Aliados</p>
                 </div>
            </div>
        </section>

        {/* Team - Solid White */}
        <section className="py-24 px-4 bg-white border-y border-gray-200">
            <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1 text-left">
                    <h2 className="text-4xl font-black text-dark mb-6">
                        Quiénes somos
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                        Somos un equipo pragmático. Creemos que la mejor forma de ayudar al planeta es creando un modelo de negocio que funcione para todos.
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-gray-200" /> {/* Placeholder for avatar */}
                        <div>
                            <p className="font-bold text-dark">Tu Nombre</p>
                            <p className="text-sm text-gray-500 font-mono">Fundador</p>
                        </div>
                    </div>
                </div>
                
                <div className="flex-1">
                     <div className="bg-white border border-gray-200 shadow-solid rounded-2xl transition-all duration-300 hover:shadow-lifted hover:border-primary/30 hover:-translate-y-1 p-3 rotate-2">
                         <div className="aspect-4/5 rounded-xl bg-gray-100 overflow-hidden">
                             <img 
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                                alt="Founder"
                                className="w-full h-full object-cover grayscale"
                             />
                         </div>
                     </div>
                </div>
            </div>
        </section>

        {/* Careers & Press - Solid Grey */}
        <section className="py-24 px-4 bg-background">
             <div className="container mx-auto max-w-7xl">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {/* Careers */}
                     <div className="bg-white border border-gray-200 shadow-solid rounded-2xl transition-all duration-300 hover:shadow-lifted hover:border-primary/30 hover:-translate-y-1 p-10">
                         <div className="flex items-center justify-between mb-8">
                            <Briefcase className="w-8 h-8 text-primary" />
                            <span className="font-bold text-xs bg-primary/10 text-primary px-2 py-1 rounded">JOIN US</span>
                         </div>
                         <h3 className="text-3xl font-black text-dark mb-4">Trabaja con nosotros</h3>
                         <p className="text-gray-600 mb-8">
                            Resolvemos problemas difíciles.
                         </p>
                         
                         <div className="space-y-3 mb-8">
                            {[ "Frontend Lead", "Growth Hacker", "Product Designer" ].map((job, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer border border-gray-200">
                                    <span className="font-bold text-sm text-gray-800">{job}</span>
                                    <ArrowRight className="w-4 h-4 text-gray-400" />
                                </div>
                            ))}
                         </div>
                     </div>

                     {/* Press */}
                     <div className="bg-white border border-gray-200 shadow-solid rounded-2xl transition-all duration-300 hover:shadow-lifted hover:border-primary/30 hover:-translate-y-1 p-10">
                         <div className="flex items-center justify-between mb-8">
                            <Newspaper className="w-8 h-8 text-accent" />
                            <span className="font-bold text-xs bg-accent/10 text-accent px-2 py-1 rounded">PRESS</span>
                         </div>
                         <h3 className="text-3xl font-black text-dark mb-4">En los medios</h3>
                         <p className="text-gray-600 mb-8">
                            Lo que dicen de nosotros.
                         </p>

                         <div className="space-y-4 mb-8">
                             {[
                                 { source: "TechCrunch", title: "Gest: La revolución verde", date: "2d ago" },
                                 { source: "Forbes", title: "Top Startups 2025", date: "1w ago" },
                             ].map((article, i) => (
                                 <div key={i} className="border-l-2 border-primary pl-4 py-1 hover:bg-gray-50 cursor-pointer">
                                     <h4 className="font-bold text-dark text-lg leading-tight">{article.title}</h4>
                                     <div className="flex gap-2 text-xs text-gray-500 mt-1">
                                         <span className="font-bold">{article.source}</span>
                                         <span>•</span>
                                         <span>{article.date}</span>
                                     </div>
                                 </div>
                             ))}
                         </div>
                     </div>
                 </div>
             </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
