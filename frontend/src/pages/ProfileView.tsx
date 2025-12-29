import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { Scale, Banknote, Cloud, ChevronRight, Award } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';

interface Reservation {
    id: number;
    pack_id: number;
    status: string;
    pickup_time: string;
    created_at: string;
}

const ProfileView: React.FC = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    if (user) {
        // Use api lib instead of fetch
        api.get<Reservation[]>(`/api/reservations/user/${user.id}`)
            .then(data => setReservations(data))
            .catch(err => console.error("Error fetching reservations:", err));
    }
  }, [user]);

  if (!user) return <div className="p-8 text-center text-white">Por favor inicia sesión</div>;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 space-y-8">
      {/* Profile Header */}
      <Card className="flex flex-col items-center justify-center text-center py-8 border-white/10 bg-linear-to-b from-surface to-background">
          <div className="w-24 h-24 bg-surface-hover rounded-full mb-4 ring-4 ring-primary/20 shadow-lg overflow-hidden relative">
              <div className="w-full h-full bg-linear-to-br from-primary to-teal-600 flex items-center justify-center text-primary-foreground font-bold text-3xl">
                  {user.name.substring(0,2).toUpperCase()}
              </div>
          </div>
          <h1 className="text-2xl font-bold text-text-main">{user.name}</h1>
          <div className="flex items-center gap-1 mt-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wide border border-emerald-500/20">
              <Award size={14} />
              <span>Héroe Local 🌿</span>
          </div>
          {/* Level Progress */}
          <div className="w-full max-w-[240px] mt-6">
              <div className="flex justify-between text-xs text-text-muted mb-2 font-medium">
                  <span>Nivel 1</span>
                  <span>{reservations.length * 50} / 500 XP</span>
              </div>
              <div className="w-full bg-surface-hover rounded-full h-2 overflow-hidden bg-gray-200">
                  <div className="bg-primary h-2 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: `${Math.min(reservations.length * 10, 100)}%` }}></div>
              </div>
          </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="flex flex-col items-center text-center border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-3">
                  <Scale size={24} />
              </div>
              <span className="text-3xl font-bold text-text-main">{reservations.length}</span>
              <span className="text-xs font-medium text-text-muted uppercase tracking-wide mt-1">Packs Rescatados</span>
          </Card>

          <Card className="flex flex-col items-center text-center border-orange-500/20 bg-orange-500/5 hover:bg-orange-500/10">
               <div className="w-12 h-12 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center mb-3">
                  <Banknote size={24} />
              </div>
              <span className="text-3xl font-bold text-text-main">S/ {reservations.length * 15}</span>
              <span className="text-xs font-medium text-text-muted uppercase tracking-wide mt-1">Ahorrado Est.</span>
          </Card>

          <Card className="flex flex-col items-center text-center border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10">
               <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mb-3">
                  <Cloud size={24} />
              </div>
              <span className="text-3xl font-bold text-text-main">{(reservations.length * 2.5).toFixed(1)}</span>
              <span className="text-xs font-medium text-text-muted uppercase tracking-wide mt-1">Kg CO2 Evitado</span>
          </Card>
      </div>

      {/* Recent History */}
      <div>
          <h3 className="text-xl font-bold text-text-main mb-6 px-1">Mis Reservas</h3>
          <div className="space-y-4">
              {reservations.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">No tienes reservas activas.</div>
              ) : (
                  reservations.map((res) => (
                      <Card key={res.id} className="flex items-center justify-between p-4 bg-surface hover:bg-gray-50 cursor-pointer group border-gray-100 shadow-sm">
                          <div className="flex items-center gap-4">
                              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                                  <Award size={24} />
                              </div>
                              <div>
                                  <h4 className="font-bold text-text-main text-base group-hover:text-primary transition-colors">Reserva #{res.id}</h4>
                                  <p className="text-xs text-text-muted mt-1">
                                    {new Date(res.created_at).toLocaleDateString()} • {res.pickup_time}
                                  </p>
                              </div>
                          </div>
                          <div className="flex items-center text-gray-300 group-hover:text-primary transition-colors">
                              <span className={`font-bold mr-4 text-xs px-2 py-1 rounded-full ${res.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                  {res.status.toUpperCase()}
                              </span>
                              <ChevronRight size={20} />
                          </div>
                      </Card>
                  ))
              )}
          </div>
      </div>
    </div>
  );
};

export default ProfileView;
