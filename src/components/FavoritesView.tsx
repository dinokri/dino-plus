import React from 'react';
import { Heart, ArrowLeft, Trash2, Building2 } from 'lucide-react';
import { Property } from '../types/property';
import { PropertyCard } from './PropertyCard';

interface FavoritesViewProps {
  favorites: string[];
  allProperties: Property[];
  onToggleFavorite: (id: string) => void;
  onClearFavorites: () => void;
  onSelectProperty: (property: Property) => void;
  onExplore: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favorites,
  allProperties,
  onToggleFavorite,
  onClearFavorites,
  onSelectProperty,
  onExplore,
}) => {
  const favoriteProperties = allProperties.filter((p) => favorites.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14243B] tracking-tight">
              Vaše omiljene nekretnine
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Nekretnine koje ste sačuvali za kasniji pregled (podaci su pohranjeni u vašem pregledniku).
          </p>
        </div>

        {favoriteProperties.length > 0 && (
          <button
            onClick={onClearFavorites}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Isprazni listu</span>
          </button>
        )}
      </div>

      {/* Grid or Empty State */}
      {favoriteProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onSelectProperty={onSelectProperty}
            />
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-12 text-center max-w-xl mx-auto my-8">
          <div className="w-16 h-16 rounded-full bg-white shadow-xs flex items-center justify-center mx-auto mb-4 text-slate-300">
            <Heart className="w-8 h-8 text-slate-300" />
          </div>
          <h2 className="text-lg font-bold text-[#14243B] mb-2">
            Trenutno nemate sačuvanih nekretnina
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed mb-6">
            Kliknite na ikonicu srca na bilo kojoj kartici nekretnine kako biste je sačuvali i uporedili sa drugim ponudama.
          </p>
          <button
            onClick={onExplore}
            className="px-6 py-3 bg-[#14243B] hover:bg-[#1d3353] text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer border border-[#C5A46D]/40"
          >
            Pregledajte sve nekretnine
          </button>
        </div>
      )}

    </div>
  );
};
