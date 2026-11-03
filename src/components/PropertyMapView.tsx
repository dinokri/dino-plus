/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
import { Property } from '../types/property';
import { formatPriceKM } from '../utils/filterProperties';
import { MapPin, Home, ArrowRight, Eye, AlertCircle, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PropertyMapViewProps {
  properties: Property[];
  onSelectProperty: (propertyId: string) => void;
  onToggleFavorite?: (id: string) => void;
  isFavorite?: (id: string) => boolean;
}

// Major cities in Bosnia and Herzegovina with coordinates for quick navigation
const BIH_CITIES = [
  { name: 'Sve lokacije', center: { lat: 44.1, lng: 17.8 }, zoom: 7.5 },
  { name: 'Sarajevo', center: { lat: 43.8563, lng: 18.4131 }, zoom: 12 },
  { name: 'Banja Luka', center: { lat: 44.7722, lng: 17.1910 }, zoom: 12 },
  { name: 'Mostar', center: { lat: 43.3438, lng: 17.8078 }, zoom: 12 },
  { name: 'Tuzla', center: { lat: 44.5384, lng: 18.6671 }, zoom: 12 },
  { name: 'Zenica', center: { lat: 44.2017, lng: 17.9040 }, zoom: 12 },
  { name: 'Bihać', center: { lat: 44.8169, lng: 15.8708 }, zoom: 12 },
  { name: 'Neum', center: { lat: 42.9234, lng: 17.6156 }, zoom: 13 },
  { name: 'Trebinje', center: { lat: 42.7119, lng: 18.3436 }, zoom: 12 }
];

export const PropertyMapView: React.FC<PropertyMapViewProps> = ({
  properties,
  onSelectProperty
}) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: 44.1, lng: 17.8 });
  const [mapZoom, setMapZoom] = useState<number>(7.5);
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyC_JstBRZVZJ5OXVzomgEwq-s0hGT4WYr4';

  useEffect(() => {
    const handleQuota = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  const handleCityJump = (city: typeof BIH_CITIES[0]) => {
    setMapCenter(city.center);
    setMapZoom(city.zoom);
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
      {/* Quota error non-blocking notification if triggered */}
      {quotaExceeded && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 bg-amber-500 text-slate-950 px-4 py-2 rounded-lg text-xs font-semibold shadow-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>Iskorišten je demo limit Google Maps prikaza.</span>
          <a
            href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
            target="_blank"
            rel="noopener noreferrer"
            className="underline flex items-center gap-1 hover:text-white"
          >
            Saznajte više <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}

      {/* Quick City Filter Toolbar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1.5 overflow-x-auto p-1.5 bg-[#14243B]/90 backdrop-blur-md rounded-xl shadow-md border border-[#C5A46D]/30 max-w-full">
          <span className="text-[11px] font-semibold text-[#C5A46D] px-2 whitespace-nowrap">
            Fokus:
          </span>
          {BIH_CITIES.map((c) => (
            <button
              key={c.name}
              onClick={() => handleCityJump(c)}
              className="text-xs px-2.5 py-1 rounded-lg bg-white/10 text-white hover:bg-[#C5A46D] hover:text-[#14243B] transition-all font-medium whitespace-nowrap"
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Count badge */}
        <div className="pointer-events-auto hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#14243B]/90 backdrop-blur-md text-white rounded-xl text-xs font-medium border border-white/10 shadow-md">
          <MapPin className="w-3.5 h-3.5 text-[#C5A46D]" />
          <span>{properties.length} nekretnina na mapi</span>
        </div>
      </div>

      {/* Google Map Container */}
      <div className="w-full h-[680px]">
        <APIProvider apiKey={apiKey}>
          <Map
            center={mapCenter}
            zoom={mapZoom}
            onCenterChanged={(ev) => setMapCenter(ev.detail.center)}
            onZoomChanged={(ev) => setMapZoom(ev.detail.zoom)}
            mapId="DEMO_MAP_ID"
            gestureHandling="greedy"
            disableDefaultUI={false}
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            style={{ width: '100%', height: '100%' }}
          >
            {properties.map((prop) => {
              const isSelected = selectedProperty?.id === prop.id;
              const formattedPrice = `${prop.price.toLocaleString('de-DE')} KM`;

              return (
                <AdvancedMarker
                  key={prop.id}
                  position={{ lat: prop.coordinates.lat, lng: prop.coordinates.lng }}
                  onClick={() => setSelectedProperty(prop)}
                  title={prop.title}
                >
                  <div
                    className={`group cursor-pointer px-2.5 py-1 rounded-full text-xs font-bold shadow-lg transition-all transform hover:scale-110 flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-[#C5A46D] text-[#14243B] border-white ring-2 ring-[#C5A46D]'
                        : 'bg-[#14243B] text-white border-[#C5A46D]/60 hover:border-[#C5A46D]'
                    }`}
                  >
                    <Home className="w-3 h-3 text-[#C5A46D] group-hover:text-inherit" />
                    <span>{formattedPrice}</span>
                  </div>
                </AdvancedMarker>
              );
            })}

            {/* Native InfoWindow when a marker is clicked */}
            {selectedProperty && (
              <InfoWindow
                position={{
                  lat: selectedProperty.coordinates.lat,
                  lng: selectedProperty.coordinates.lng
                }}
                onCloseClick={() => setSelectedProperty(null)}
                headerContent={
                  <div className="font-bold text-slate-900 text-xs truncate max-w-[220px]">
                    {selectedProperty.title}
                  </div>
                }
              >
                <div className="w-64 p-1 text-slate-800">
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-2 bg-slate-100">
                    <img
                      src={selectedProperty.images[0]}
                      alt={selectedProperty.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-[#14243B]/80 text-[#C5A46D] text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded">
                      {selectedProperty.offerType === 'prodaja' ? 'Prodaja' : 'Iznajmljivanje'}
                    </div>
                  </div>

                  <div className="text-base font-bold text-[#14243B] mb-1">
                    {formatPriceKM(selectedProperty.price, selectedProperty.priceSuffix)}
                  </div>

                  <div className="flex items-center text-xs text-slate-600 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A46D] mr-1 shrink-0" />
                    <span className="truncate">
                      {selectedProperty.city}, {selectedProperty.neighborhood}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-600 mb-3 bg-slate-50 p-1.5 rounded border border-slate-100">
                    <div>Kvadratura: <strong>{selectedProperty.area} m²</strong></div>
                    <div>Sobe: <strong>{selectedProperty.rooms || '–'}</strong></div>
                  </div>

                  <button
                    onClick={() => onSelectProperty(selectedProperty.id)}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 bg-[#14243B] hover:bg-[#1E3658] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Pogledaj detalje</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C5A46D]" />
                  </button>
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>
      </div>

      {/* Floating Selected Property Quick Preview Bar on Bottom if Selected */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-10 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-slate-200 shadow-xl flex items-center gap-3"
          >
            <img
              src={selectedProperty.images[0]}
              alt={selectedProperty.title}
              className="w-20 h-16 rounded-lg object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">
                {selectedProperty.title}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {selectedProperty.city} · {selectedProperty.neighborhood}
              </p>
              <p className="text-sm font-black text-[#14243B] mt-0.5">
                {formatPriceKM(selectedProperty.price, selectedProperty.priceSuffix)}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onSelectProperty(selectedProperty.id)}
              className="p-2 bg-[#14243B] text-[#C5A46D] hover:bg-[#C5A46D] hover:text-[#14243B] rounded-lg transition-colors shrink-0 cursor-pointer"
              title="Otvori detalje nekretnine"
            >
              <Eye className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
