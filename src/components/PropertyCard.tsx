import React, { useState } from 'react';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Heart, 
  ArrowRight, 
  Building2,
  Calendar
} from 'lucide-react';
import { motion } from 'motion/react';
import { Property } from '../types/property';
import { formatPriceKM, getPropertyTypeLabel } from '../utils/filterProperties';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (propertyId: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  onSelectProperty,
}) => {
  const [imageError, setImageError] = useState(false);
  const mainImage = property.images && property.images.length > 0 ? property.images[0] : '';

  const formattedDate = new Date(property.createdAt).toLocaleDateString('bs-BA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
    >
      
      {/* Image Container with Badges */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
        {!imageError && mainImage ? (
          <img
            src={mainImage}
            alt={property.title}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-[#14243B] text-slate-300 p-4 text-center">
            <Building2 className="w-10 h-10 text-[#C5A46D] mb-2 stroke-[1.5]" />
            <span className="text-xs font-semibold text-slate-200">{property.title}</span>
            <span className="text-[10px] text-slate-400 mt-1">{property.city}</span>
          </div>
        )}

        {/* Gradient scrim for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
          <span className={`px-2.5 py-1 text-[11px] font-bold rounded-md tracking-wider uppercase shadow-xs ${
            property.offerType === 'prodaja' 
              ? 'bg-[#14243B] text-white border border-white/20' 
              : 'bg-emerald-900/90 text-emerald-100 border border-emerald-400/20'
          }`}>
            {property.offerType === 'prodaja' ? 'Prodaja' : 'Iznajmljivanje'}
          </span>

          {property.isFeatured && (
            <span className="px-2.5 py-1 text-[11px] font-bold bg-[#C5A46D] text-[#14243B] rounded-md tracking-wider uppercase shadow-xs">
              Izdvojeno
            </span>
          )}

          {property.isNew && (
            <span className="px-2 py-1 text-[10px] font-bold bg-white/95 text-slate-800 rounded-md tracking-wider uppercase shadow-xs">
              Novo
            </span>
          )}
        </div>

        {/* Animated Favorite Button */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.75 }}
          whileHover={{ scale: 1.15 }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-slate-700 rounded-full shadow-md z-10 cursor-pointer"
          aria-label={isFavorite ? 'Ukloni iz omiljenih' : 'Dodaj u omiljene'}
        >
          <motion.div
            key={String(isFavorite)}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <Heart 
              className={`w-4 h-4 transition-colors ${
                isFavorite 
                  ? 'fill-rose-500 text-rose-500' 
                  : 'text-slate-700 hover:text-rose-500'
              }`} 
            />
          </motion.div>
        </motion.button>

        {/* Bottom Bar on Image: Price on Left, Property Type on Right */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-end justify-between gap-2 pointer-events-none">
          <div className="text-white">
            <div className="text-lg sm:text-xl font-extrabold tracking-tight tabular-nums drop-shadow-md flex items-baseline gap-1">
              <span>{property.price.toLocaleString('bs-BA')} KM</span>
              {property.priceSuffix && (
                <span className="text-xs font-semibold text-slate-200/90 tracking-normal">
                  {property.priceSuffix}
                </span>
              )}
            </div>
          </div>

          <div className="text-white/95 text-[11px] font-semibold bg-black/55 backdrop-blur-xs px-2.5 py-1 rounded-md shrink-0 shadow-xs border border-white/15">
            {getPropertyTypeLabel(property.propertyType)}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          {/* Location Line */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" />
            <span className="truncate">{property.neighborhood}, {property.city}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelectProperty(property)}
            className="font-bold text-base text-slate-900 group-hover:text-[#14243B] transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {property.title}
          </h3>

          {/* Short description preview */}
          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Specs & Footer */}
        <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
          
          {/* Key Specs: Area, Rooms, Bathrooms */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-1" title="Kvadratura">
              <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
              <span className="tabular-nums">{property.area} m²</span>
            </div>

            {property.rooms > 0 && (
              <div className="flex items-center gap-1" title="Broj soba">
                <Bed className="w-3.5 h-3.5 text-slate-400" />
                <span className="tabular-nums">{property.rooms} {property.rooms === 1 ? 'soba' : property.rooms < 5 ? 'sobe' : 'soba'}</span>
              </div>
            )}

            {property.bathrooms > 0 && (
              <div className="flex items-center gap-1" title="Broj kupatila">
                <Bath className="w-3.5 h-3.5 text-slate-400" />
                <span className="tabular-nums">{property.bathrooms} kupat.</span>
              </div>
            )}
          </div>

          {/* Publication Date & Pogledaj detalje CTA */}
          <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span>{formattedDate}</span>
            </span>

            <button
              type="button"
              onClick={() => onSelectProperty(property)}
              className="text-xs font-bold text-[#14243B] group-hover:text-[#C5A46D] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Pogledaj detalje</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </div>

    </motion.div>
  );
};
