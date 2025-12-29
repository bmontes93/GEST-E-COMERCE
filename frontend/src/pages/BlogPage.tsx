import Footer from '../components/Footer';
import { Button } from '../components/ui/Button';

const ARTICLES = [
    {
        id: 1,
        title: "Gastronomía Sostenible en los Andes",
        excerpt: "Cómo los restaurantes de Huaraz están rescatando ingredientes locales y reduciendo mermas.",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
        category: "Local",
        date: "15 Oct 2025"
    },
    {
        id: 2,
        title: "Trekking Zero Waste: Guía para Montañistas",
        excerpt: "Tips para disfrutar del Huascarán y la Cordillera Blanca sin dejar huella ni desperdicios.",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
        category: "Turismo",
        date: "12 Oct 2025"
    },
    {
        id: 3,
        title: "Del Campo a la Mesa: Productores de Ancash",
        excerpt: "Conoce a los agricultores del Callejón de Huaylas que alimentan nuestra ciudad.",
        image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=600&q=80",
        category: "Comunidad",
        date: "05 Oct 2025"
    },
];

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="grow py-12 px-4">
        <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
                <span className="text-primary font-bold tracking-wide uppercase text-sm mb-2 block">El Blog de Gest</span>
                <h1 className="text-4xl font-extrabold text-text-main mb-4">Historias Sostenibles</h1>
                <p className="text-text-muted text-lg max-w-2xl mx-auto">
                    Novedades, consejos y guías para vivir una vida más consciente y deliciosa.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ARTICLES.map(article => (
                    <article key={article.id} className="group cursor-pointer">
                        <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden mb-4 relative">
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-800">
                                {article.category}
                            </div>
                            <img 
                                src={article.image} 
                                alt={article.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                        <div className="space-y-2">
                            <span className="text-xs text-gray-400">{article.date}</span>
                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                                {article.title}
                            </h3>
                            <p className="text-gray-500 text-sm line-clamp-2">
                                {article.excerpt}
                            </p>
                            <Button variant="link" className="p-0 text-primary hover:text-emerald-700 h-auto font-semibold">
                                Leer más &rarr;
                            </Button>
                        </div>
                    </article>
                ))}
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
