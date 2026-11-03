import React, { useState } from 'react';
import { Search, MapPin, Building, DollarSign, Home, SlidersHorizontal } from 'lucide-react';
import { FilterState, OfferType, PropertyType } from '../types/property';
import { CITIES_LIST } from '../data/properties';

interface SearchFilterBarProps {
  initialValues?: Partial<FilterState>;
  onSearch: (filters: Partial<FilterState>) => void;
  isCompact?: boolean;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  initialValues,
  onSearch,
  isCompact = false,
}) => {
  const [offerType, setOfferType] = useState<OfferType>(
    (initialValues?.offerType && initialValues.offerType !== 'sve') 
      ? initialValues.offerType 
      : 'prodaja'
  );
  const [city, setCity] = useState<string>(initialValues?.city || '');
  const [neighborhood, setNeighborhood] = useState<string>(initialValues?.neighborhood || '');
  const [propertyType, setPropertyType] = useState<string>(
    initialValues?.propertyType && initialValues.propertyType !== 'sve' 
      ? initialValues.propertyType 
      : ''
  );
  const [minPrice, setMinPrice] = useState<string>(
    initialValues?.minPrice ? String(initialValues.minPrice) : ''
  );
  const [maxPrice, setMaxPrice] = useState<string>(
    initialValues?.maxPrice ? String(initialValues.maxPrice) : ''
  );
  const [rooms, setRooms] = useState<string>(
    initialValues?.rooms ? String(initialValues.rooms) : ''
  );
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      offerType,
      city,
      neighborhood: neighborhood.trim() || undefined,
      propertyType: (propertyType as PropertyType) || 'sve',
      minPrice: minPrice ? Number(minPrice) : null,
      maxPrice: maxPrice ? Number(maxPrice) : null,
      rooms: rooms ? Number(rooms) : null,
    });
  };

  return (
    <div className={`w-full bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden transition-all ${isCompact ? 'p-4' : 'p-4 sm:p-6'}`}>
      
      {/* Offer Type Tabs: Prodaja / Iznajmljivanje */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl max-w-fit mb-5">
        <button
          type="button"
          onClick={() => setOfferType('prodaja')}
          className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
            offerType === 'prodaja'
              ? 'bg-[#14243B] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          Prodaja
        </button>
        <button
          type="button"
          onClick={() => setOfferType('iznajmljivanje')}
          className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
            offerType === 'iznajmljivanje'
              ? 'bg-[#14243B] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          Iznajmljivanje
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          
          {/* Grad Selector */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>Grad</span>
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#14243B] focus:bg-white transition-all cursor-pointer"
            >
              <option value="">Svi gradovi u BiH</option>
              {CITIES_LIST.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Vrsta nekretnine */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>Vrsta nekretnine</span>
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#14243B] focus:bg-white transition-all cursor-pointer"
            >
              <option value="">Sve vrste nekretnina</option>
              <option value="stan">Stan</option>
              <option value="kuca">Kuća</option>
              <option value="zemljiste">Zemljište</option>
              <option value="poslovni">Poslovni prostor</option>
              <option value="vikendica">Vikendica</option>
              <option value="turisticka">Turistička nekretnina</option>
            </select>
          </div>

          {/* Lokacija / Naselje */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
              <Home className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>Naselje ili područje</span>
            </label>
            <input
              type="text"
              placeholder="npr. Centar, Novo Sarajevo, Rondo..."
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#14243B] focus:bg-white transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Dugme Pretraži */}
          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="w-full h-11 bg-[#14243B] hover:bg-[#1f3759] text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-slate-900/10 flex items-center justify-center gap-2 cursor-pointer border border-[#C5A46D]/30"
            >
              <Search className="w-4 h-4 text-[#C5A46D]" />
              <span>Pretraži</span>
            </button>
            <button
              type="button"
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              className="h-11 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors flex items-center justify-center cursor-pointer"
              title="Dodatni filteri"
              aria-label="Dodatni filteri"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Dodatna polja: Minimalna / Maksimalna cijena & Broj soba */}
        {showMoreFilters && (
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3.5 animate-in fade-in duration-150">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-[#C5A46D]" />
                <span>Minimalna cijena (KM)</span>
              </label>
              <input
                type="number"
                placeholder={offerType === 'prodaja' ? 'npr. 100.000' : 'npr. 500'}
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#14243B] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-[#C5A46D]" />
                <span>Maksimalna cijena (KM)</span>
              </label>
              <input
                type="number"
                placeholder={offerType === 'prodaja' ? 'npr. 500.000' : 'npr. 2.000'}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#14243B] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Broj soba (min.)
              </label>
              <select
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#14243B] focus:bg-white transition-all cursor-pointer"
              >
                <option value="">Bilo koji broj soba</option>
                <option value="1">1+ soba</option>
                <option value="2">2+ sobe</option>
                <option value="3">3+ sobe</option>
                <option value="4">4+ sobe</option>
                <option value="5">5+ soba</option>
              </select>
            </div>
          </div>
        )}

      </form>
    </div>
  );
};
