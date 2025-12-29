import { api } from '../lib/api'; // Ensure this key import exists

// ... inside Home component ...
    useEffect(() => {
    const fetchPacks = async () => {
      try {
        setLoading(true);
        // Using the api utility which respects VITE_API_URL
        const data = await api.get<Pack[]>('/api/packs');
        setPacks(data);
      } catch (err) {
        console.error("Failed to fetch packs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPacks();
  }, []);

  const filteredPacks = packs.filter(pack => {
      if (activeFilter === "Todos") return true;
      if (activeFilter === "Cerca de mí") {
          const dist = parseFloat(pack.distance.split(' ')[0]);
          return dist < 1.0;
      }
      const tags = pack.tags || [];
      return tags.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase())) ||
             pack.businessName.toLowerCase().includes(activeFilter.toLowerCase());
  });

  return (
    <div className="flex flex-col min-h-screen pt-20 pb-10"> {/* Added padding for fixed navbar */}
      <div className="grow space-y-24">
        
        {/* Asymmetric Hero Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="absolute top-0 right-[-10%] w-[50%] h-[50%] bg-linear-to-b from-primary/20 to-transparent rounded-full blur-[100px] -z-10 animate-pulse-glow" />
            <div className="absolute bottom-0 left-[-10%] w-[40%] h-[40%] bg-linear-to-t from-secondary/20 to-transparent rounded-full blur-[100px] -z-10" />

            <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="z-10"
                >
                    <div className="inline-flex items-center rounded-full bg-white/80 border border-primary/20 shadow-xs px-4 py-1.5 text-sm font-semibold text-primary mb-6 backdrop-blur-md">
                        <Zap className="mr-2 h-4 w-4 fill-primary" />
                        <span className="uppercase tracking-wide text-xs">Revolución Foodtech</span>
                    </div>

                    <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight text-gray-900 leading-[0.9] mb-8">
                        Salva comida.<br/>
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
                            Gana sabor.
                        </span>
                    </h1>
                    
                    <p className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed">
                        Únete a la comunidad que convierte el excedente de comida en oportunidades deliciosas. Descuentos de hasta el 70%.
                    </p>

                    <div className="flex flex-wrap gap-4">
                         <Button 
                            size="lg" 
                            className="h-14 px-8 rounded-full bg-black text-white hover:bg-gray-800 shadow-xl shadow-primary/20 hover:scale-105 transition-transform font-bold text-lg"
                            onClick={() => document.getElementById('offers')?.scrollIntoView({ behavior: 'smooth' })}
                         >
                            Explorar Packs
                            <ChevronRight className="ml-2 h-5 w-5" />
                         </Button>
                         <div className="flex items-center -space-x-4 pl-4">
                            {[1,2,3].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold">
                                    User
                                </div>
                            ))}
                            <span className="pl-6 text-sm font-bold text-gray-500">+10k savers</span>
                         </div>
                    </div>
                </motion.div>

                {/* Floating Visuals */}
                <div className="relative h-[600px] hidden lg:block">
                    {/* Main Image */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="absolute top-10 right-10 w-[400px] h-[500px] rounded-[3rem] overflow-hidden shadow-2xl rotate-3"
                    >
                        <img 
                            src="/images/healthy.png" 
                            className="w-full h-full object-cover"
                            alt="Food"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-8 left-8 text-white">
                            <p className="font-bold text-2xl">Pack Sorpresa</p>
                            <p className="text-secondary font-mono">S/ 12.00</p>
                        </div>
                    </motion.div>

                    {/* Floating Badge 1 */}
                    <motion.div 
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-20 left-10 glass-card p-4 rounded-2xl flex items-center gap-3 w-48 -rotate-6"
                    >
                        <div className="bg-secondary/10 p-2 rounded-full text-secondary">
                            <Target size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400">Descuento</p>
                            <p className="text-xl font-black text-gray-800">-50% OFF</p>
                        </div>
                    </motion.div>

                     {/* Floating Badge 2 */}
                     <motion.div 
                        animate={{ y: [0, 15, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-32 right-[320px] glass-card p-4 rounded-2xl flex items-center gap-3 w-44 rotate-3 z-20"
                    >
                        <div className="bg-primary/10 p-2 rounded-full text-primary">
                            <Sparkles size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400">Impacto</p>
                            <p className="text-sm font-bold text-gray-800">1kg CO2e Ahorrado</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>

        {/* Feed Section */}
        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="offers">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
             <div>
                <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
                    Cajas cerca de ti <span className="text-primary">🔥</span>
                </h2>
             </div>
             
             {/* Vibrant Filters */}
             <div className="flex bg-white/50 backdrop-blur-md p-1.5 rounded-full shadow-xs border border-white/20 overflow-x-auto max-w-full">
                {FILTER_CHIPS.map((filter) => (
                   <button 
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-6 py-2.5 text-sm font-bold rounded-full whitespace-nowrap transition-all duration-300 ${
                          activeFilter === filter 
                          ? 'bg-black text-white shadow-lg scale-105' 
                          : 'text-gray-500 hover:text-black hover:bg-white/50'
                      }`}
                   >
                      {filter}
                   </button>
                ))}
             </div>
          </div>
          
          {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[1,2,3,4].map(i => (
                      <div key={i} className="h-80 rounded-3xl bg-gray-100 animate-pulse" />
                  ))}
              </div>
          ) : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredPacks.map((pack, index) => (
                    <motion.div
                      key={pack.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <SurprisePackCard pack={pack} />
                    </motion.div>
                ))}
                
                {/* View All Card - Vibrant */}
                <Link to="/map" className="contents">
                    <motion.div
                       whileHover={{ scale: 1.02 }}
                       className="group flex flex-col items-center justify-center h-full min-h-[350px] rounded-3xl border-2 border-dashed border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all cursor-pointer relative overflow-hidden"
                    >
                       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                       <div className="h-20 w-20 rounded-full bg-white text-primary shadow-lg flex items-center justify-center mb-6 group-hover:rotate-90 transition-transform duration-500 z-10">
                          <ChevronRight size={36} />
                       </div>
                       <h3 className="text-2xl font-black text-gray-900 z-10">Ver Mapa</h3>
                       <p className="text-sm text-gray-500 mt-2 font-medium z-10">Explora toda la ciudad</p>
                    </motion.div>
                </Link>
              </div>
          )}
        </section>

      </div>
      <Footer />
    </div>
  );
};

export default Home;
