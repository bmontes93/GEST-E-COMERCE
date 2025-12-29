import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigation, Loader2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

// --- Types ---
interface Pack {
  id: number;
  businessName: string;
  originalPrice: string;
  discountedPrice: string;
  lat: number;
  lng: number;
  imageUrl: string;
  distance?: string;
  timeLeft?: string;
  tags?: string[];
  itemsLeft?: number;
}

// --- Custom Icon ---
const createCustomIcon = () => {
  return L.divIcon({
    className: 'custom-pin',
    html: `
      <div style="
        background-color: hsl(150 100% 45%);
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

const customIcon = createCustomIcon();

const MapView: React.FC = () => {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPack, setSelectedPack] = useState<Pack | null>(null);

  useEffect(() => {
    const fetchPacks = async () => {
        try {
            const data = await api.get<Pack[]>('/api/packs');
            if (data) {
                const validPacks = data.filter((p) => p.lat != null && p.lng != null);
                setPacks(validPacks);
            }
        } catch (err) {
            console.error("Failed to load map packs", err);
        } finally {
            setLoading(false);
        }
    };
    fetchPacks();
  }, []);

  return (
    <div className="relative h-[calc(100vh-64px)] w-full overflow-hidden">
         {loading && (
             <div className="absolute inset-0 flex items-center justify-center z-1000 bg-background/50 backdrop-blur-sm">
                 <Loader2 className="animate-spin text-primary" size={32} />
             </div>
         )}

         <MapContainer 
            center={[-9.5277, -77.5277]} 
            zoom={15} 
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
         >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {packs.map((pack) => (
                <Marker 
                    key={pack.id} 
                    position={[pack.lat, pack.lng]} 
                    icon={customIcon}
                    eventHandlers={{
                        click: () => {
                            setSelectedPack(pack);
                        },
                    }}
                />
            ))}
         </MapContainer>

         {/* Drawer / Floating Card */}
         <div 
            className={`fixed bottom-4 left-4 right-4 z-1000 transition-transform duration-300 transform ${
                selectedPack ? 'translate-y-0 opacity-100' : 'translate-y-[150%] opacity-0'
            }`}
        >
            {selectedPack && (
                <Card className="flex gap-4 p-4 border border-white/20 shadow-2xl bg-surface/95 backdrop-blur-md">
                    {/* Tiny Image */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-800">
                        <img src={selectedPack.imageUrl} alt={selectedPack.businessName} className="w-full h-full object-cover" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <h3 className="font-bold text-white line-clamp-1">{selectedPack.businessName}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-secondary font-bold text-lg">{selectedPack.discountedPrice}</span>
                                <span className="text-gray-400 text-xs line-through">{selectedPack.originalPrice}</span>
                            </div>
                        </div>
                        
                        <Button size="sm" className="mt-2 w-full text-xs" onClick={() => {}}>
                            <Navigation size={14} className="mr-2" />
                            Ir al local
                        </Button>
                    </div>

                    {/* Close Button */}
                     <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPack(null);
                        }}
                        className="absolute top-2 right-2 p-1 text-gray-400 hover:text-white"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </Card>
            )}
        </div>
    </div>
  );
};

export default MapView;
