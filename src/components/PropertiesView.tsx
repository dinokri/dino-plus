import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  RotateCcw, 
  SlidersHorizontal, 
  X, 
  Search, 
  Building2, 
  ChevronDown,
  Check,
  LayoutGrid,
  Map as MapIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Property, FilterState, SortOption, PropertyType } from '../types/property';
import { filterProperties, sortProperties, initialFilterState } from '../utils/filterProperties';
import { PropertyCard } from './PropertyCard';
import { PropertyMapView } from './PropertyMapView';
import { CITIES_LIST } from '../data/properties';

interface PropertiesViewProps {
  properties: Property[];
  filters: FilterState;
  onUpdateFilters: (newFilters: FilterState) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertiesView: React.FC<PropertiesViewProps> = ({
  properties,
  filters,
  onUpdateFilters,
  favorites,
  onToggleFavorite,
  onSelectProperty,
}) => {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);
  const [sort, setSort] = useState<SortOption>('najnovije');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  // Sync if outer filter changes
  React.useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleApplyFilters = () => {
    onUpdateFilters(localFilters);
    setMobileFilterOpen(false);
  };

  const handleResetFilters = () => {
    setLocalFilters(initialFilterState);
    onUpdateFilters(initialFilterState);
    setMobileFilterOpen(false);
  };

  // Filtered and sorted properties
  const filteredProperties = useMemo(() => {
    const matched = filterProperties(properties, filters);
    return sortProperties(matched, sort);
  }, [properties, filters, sort]);

  // Active filter count calculation
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.offerType !== 'sve') count++;
    if (filters.city) count++;
    if (filters.neighborhood) count++;
    if (filters.propertyType !== 'sve') count++;
    if (filters.minPrice !== null && filters.minPrice > 0) count++;
    if (filters.maxPrice !== null && filters.maxPrice > 0) count++;
    if (filters.minArea !== null && filters.minArea > 0) count++;
    if (filters.maxArea !== null && filters.maxArea > 0) count++;
    if (filters.rooms !== null && filters.rooms > 0) count++;
    if (filters.bathrooms !== null && filters.bathrooms > 0) count++;
    if (filters.hasParking) count++;
    if (filters.hasBalcony) count++;
    if (filters.hasElevator) count++;
    if (filters.isFurnished) count++;
    if (filters.searchQuery) count++;
    return count;
  }, [filters]);

  const renderFilterControls = () => (
    <div className="space-y-6">
      
      {/* Ponuda: Sve / Prodaja / Iznajmljivanje */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
          Vrsta ponude
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
          {(['sve', 'prodaja', 'iznajmljivanje'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setLocalFilters({ ...localFilters, offerType: type })}
              className={`py-2 text-xs font-bold rounded-lg capitalize transition-all cursor-pointer ${
                localFilters.offerType === type
                  ? 'bg-[#14243B] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {type === 'sve' ? 'Sve' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Grad */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
          Grad u BiH
        </label>
        <select
          value={localFilters.city}
          onChange={(e) => setLocalFilters({ ...localFilters, city: e.target.value })}
          className="w-full h-11 px-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#14243B] cursor-pointer"
        >
          <option value="">Svi gradovi</option>
          {CITIES_LIST.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Naselje ili područje */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
          Naselje / Područje
        </label>
        <input
          type="text"
          placeholder="npr. Centar, Novo Sarajevo, Borik..."
          value={localFilters.neighborhood || ''}
          onChange={(e) => setLocalFilters({ ...localFilters, neighborhood: e.target.value })}
          className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#14243B] placeholder:text-slate-400"
        />
      </div>

      {/* Vrsta nekretnine */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
          Vrsta nekretnine
        </label>
        <select
          value={localFilters.propertyType}
          onChange={(e) => setLocalFilters({ ...localFilters, propertyType: e.target.value as PropertyType | 'sve' })}
          className="w-full h-11 px-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#14243B] cursor-pointer"
        >
          <option value="sve">Sve vrste</option>
          <option value="stan">Stan</option>
          <option value="kuca">Kuća</option>
          <option value="zemljiste">Zemljište</option>
          <option value="poslovni">Poslovni prostor</option>
          <option value="vikendica">Vikendica</option>
          <option value="turisticka">Turistička nekretnina</option>
        </select>
      </div>

      {/* Raspon cijene */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
          Cijena (KM)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Od (KM)"
            value={localFilters.minPrice ?? ''}
            onChange={(e) => setLocalFilters({ ...localFilters, minPrice: e.target.value ? Number(e.target.value) : null })}
            className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#14243B]"
          />
          <input
            type="number"
            placeholder="Do (KM)"
            value={localFilters.maxPrice ?? ''}
            onChange={(e) => setLocalFilters({ ...localFilters, maxPrice: e.target.value ? Number(e.target.value) : null })}
            className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#14243B]"
          />
        </div>
      </div>

      {/* Kvadratura */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
          Kvadratura (m²)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Od (m²)"
            value={localFilters.minArea ?? ''}
            onChange={(e) => setLocalFilters({ ...localFilters, minArea: e.target.value ? Number(e.target.value) : null })}
            className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#14243B]"
          />
          <input
            type="number"
            placeholder="Do (m²)"
            value={localFilters.maxArea ?? ''}
            onChange={(e) => setLocalFilters({ ...localFilters, maxArea: e.target.value ? Number(e.target.value) : null })}
            className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#14243B]"
          />
        </div>
      </div>

      {/* Broj soba i kupatila */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
            Broj soba
          </label>
          <select
            value={localFilters.rooms ?? ''}
            onChange={(e) => setLocalFilters({ ...localFilters, rooms: e.target.value ? Number(e.target.value) : null })}
            className="w-full h-10 px-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#14243B] cursor-pointer"
          >
            <option value="">Svejedno</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
            Kupatila
          </label>
          <select
            value={localFilters.bathrooms ?? ''}
            onChange={(e) => setLocalFilters({ ...localFilters, bathrooms: e.target.value ? Number(e.target.value) : null })}
            className="w-full h-10 px-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#14243B] cursor-pointer"
          >
            <option value="">Svejedno</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
          </select>
        </div>
      </div>

      {/* Karakteristike / Pogodnosti */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
          Dodatne pogodnosti
        </label>
        <div className="space-y-2.5">
          {[
            { key: 'hasParking', label: 'Parking ili garaža' },
            { key: 'hasBalcony', label: 'Balkon ili terasa' },
            { key: 'hasElevator', label: 'Lift u zgradi' },
            { key: 'isFurnished', label: 'Namješteno' },
          ].map((item) => {
            const checked = !!localFilters[item.key as keyof FilterState];
            return (
              <label 
                key={item.key} 
                className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer select-none hover:text-slate-900"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setLocalFilters({ ...localFilters, [item.key]: e.target.checked })}
                  className="w-4 h-4 rounded-sm text-[#14243B] border-slate-300 focus:ring-[#14243B]"
                />
                <span>{item.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Akcijska dugmad */}
      <div className="pt-2 flex flex-col gap-2">
        <button
          type="button"
          onClick={handleApplyFilters}
          className="w-full py-3 bg-[#14243B] hover:bg-[#1f3759] text-white text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer border border-[#C5A46D]/40"
        >
          Primijeni filtere
        </button>

        <button
          type="button"
          onClick={handleResetFilters}
          className="w-full py-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Poništi filtere</span>
        </button>
      </div>

    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header bar */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14243B] tracking-tight">
          Pronađite idealnu nekretninu
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Istražite provjerenu ponudu stanova, kuća, zemljišta i poslovnih prostora širom Bosne i Hercegovine.
        </p>
      </div>

      {/* Main Grid: Sidebar Filters (Desktop) + Results Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs sticky top-28">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#C5A46D]" />
              <span className="font-bold text-sm text-[#14243B]">Filteri</span>
            </div>
            {activeFilterCount > 0 && (
              <span className="px-2 py-0.5 bg-slate-100 text-[#14243B] text-[11px] font-bold rounded-full">
                {activeFilterCount} aktivno
              </span>
            )}
          </div>
          {renderFilterControls()}
        </aside>

        {/* Results Column */}
        <main className="lg:col-span-3">
          
          {/* Top Bar: Count, View Mode Switcher, Mobile Filter Trigger, Sort */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-xs">
            
            {/* Found Count */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#14243B]">
                Pronađeno {filteredProperties.length} nekretnina
              </span>
              {activeFilterCount > 0 && (
                <span className="text-xs text-slate-400">
                  (filteri: {activeFilterCount})
                </span>
              )}
            </div>

            {/* Controls: View Switcher, Mobile Filter Button & Sort Dropdown */}
            <div className="flex items-center flex-wrap gap-3 w-full sm:w-auto justify-between sm:justify-end">
              
              {/* Layout Switcher: Grid vs Map */}
              <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-[#14243B] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Prikaz u obliku mreže"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Mreža</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('map')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    viewMode === 'map'
                      ? 'bg-[#14243B] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Prikaz na interaktivnoj mapi"
                >
                  <MapIcon className="w-3.5 h-3.5" />
                  <span>Mapa</span>
                </button>
              </div>

              {/* Mobile Filter Toggle */}
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A46D]" />
                <span>Filteri</span>
                {activeFilterCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#14243B] text-white text-[10px] flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Sort Dropdown (relevant for grid view) */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 hidden sm:inline">Sortiraj:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="h-10 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#14243B] transition-colors cursor-pointer"
                >
                  <option value="najnovije">Najnoviji oglasi</option>
                  <option value="cijena-rastuce">Cijena: najniža prvo</option>
                  <option value="cijena-opadajuce">Cijena: najviša prvo</option>
                  <option value="kvadratura-opadajuce">Kvadratura: najveća prvo</option>
                  <option value="kvadratura-rastuce">Kvadratura: najmanja prvo</option>
                </select>
              </div>

            </div>

          </div>

          {/* Properties Content: Map View or Grid View or Empty State with Smooth Animation */}
          <AnimatePresence mode="wait">
            {viewMode === 'map' ? (
              <motion.div
                key="map-view"
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <PropertyMapView
                  properties={filteredProperties}
                  onSelectProperty={(id) => {
                    const prop = properties.find((p) => p.id === id);
                    if (prop) onSelectProperty(prop);
                  }}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={(id) => favorites.includes(id)}
                />
              </motion.div>
            ) : filteredProperties.length > 0 ? (
              <motion.div
                key="grid-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isFavorite={favorites.includes(property.id)}
                    onToggleFavorite={onToggleFavorite}
                    onSelectProperty={onSelectProperty}
                  />
                ))}
              </motion.div>
            ) : (
              /* Empty State */
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs"
              >
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <Building2 className="w-8 h-8 text-[#C5A46D]" />
                </div>
                <h3 className="text-lg font-bold text-[#14243B] mb-2">
                  Nema nekretnina koje odgovaraju odabranim kriterijima
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                  Pokušajte prilagoditi ili proširiti filtere (npr. ukloniti ograničenja cijene, kvadrature ili lokacije) kako biste pronašli odgovarajući prostor.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 bg-[#14243B] hover:bg-[#1d3353] text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  Poništi sve filtere
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </main>

      </div>

      {/* Mobile Filters Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#C5A46D]" />
                <span className="font-bold text-base text-[#14243B]">Filteri nekretnina</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                aria-label="Zatvori filtere"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1">
              {renderFilterControls()}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
