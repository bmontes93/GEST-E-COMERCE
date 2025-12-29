import { MapPin, Clock, Tag } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { useNavigate } from 'react-router-dom';

interface PackProps {
  id: number;
  businessName: string;
  distance: string;
  originalPrice: string;
  discountedPrice: string;
  timeLeft: string;
  tags: string[];
  imageUrl: string;
  itemsLeft: number;
}

export default function SurprisePackCard({ pack }: { pack: PackProps }) {
  const navigate = useNavigate();

  const handlePress = () => {
    navigate(`/pack/${pack.id}`, { state: { pack } });
  };

  return (
    <Card 
        onClick={handlePress}
        className="bg-white border border-gray-200 shadow-solid rounded-2xl transition-all duration-300 hover:shadow-lifted hover:border-primary/30 hover:-translate-y-1 group overflow-hidden p-0 cursor-pointer text-left"
    >
      <div className="relative h-48 w-full overflow-hidden border-b border-gray-100">
        <img
          src={pack.imageUrl}
          alt={pack.businessName}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 rounded-md bg-white px-2 py-1 text-xs font-bold text-primary shadow-sm border border-gray-200">
          {pack.itemsLeft} disponibles
        </div>
      </div>
      
      <div className="p-5">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="line-clamp-1 text-lg font-black text-gray-900 leading-tight">
            {pack.businessName}
          </h3>
          <span className="flex items-center text-xs text-gray-600 font-bold bg-gray-100 px-2 py-1 rounded-md">
            <MapPin className="mr-1 h-3 w-3 text-primary" />
            {pack.distance}
          </span>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {(pack.tags || []).map((tag) => (
            <span key={tag} className="flex items-center rounded-md bg-secondary/10 px-2 py-1 text-[10px] font-bold text-primary-dark border border-secondary/20 uppercase tracking-wider">
              <Tag className="mr-1 h-3 w-3" />
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 pb-4 border-b border-gray-100">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 line-through font-medium">{pack.originalPrice}</span>
            <span className="text-2xl font-black text-primary">{pack.discountedPrice}</span>
          </div>
          <Button 
            size="sm" 
            className="rounded-lg px-6 py-0 h-10 text-sm font-bold bg-primary text-white hover:bg-primary/90 shadow-sm transition-all"
            onClick={(e) => {
                e.stopPropagation(); // Prevent double navigation if card is clickable
                handlePress();
            }}
          >
            Reservar
          </Button>
        </div>
        
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500 font-bold">
          <div className="flex items-center">
             <Clock className="mr-1.5 h-3.5 w-3.5 text-accent" />
             <span>Recogida: {pack.timeLeft}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
