import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Calendar, 
  Layers, 
  Heart, 
  Share2, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Calculator, 
  ShieldCheck, 
  Building2, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Send,
  Sparkles
} from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { Property } from '../types/property';
import { formatPriceKM, getPropertyTypeLabel } from '../utils/filterProperties';
import { HERO_IMAGE } from '../data/properties';
import { PropertyCard } from './PropertyCard';

interface PropertyDetailsViewProps {
  property: Property;
  allProperties: Property[];
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onBack: () => void;
}

export const PropertyDetailsView: React.FC<PropertyDetailsViewProps> = ({
  property,
  allProperties,
  isFavorite,
  onToggleFavorite,
  onSelectProperty,
  onBack,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState(
    `Poštovani, zainteresovan/a sam za nekretninu "${property.title}" (${property.city}). Molim Vas za dodatne informacije i mogućnost zakazivanja termina za razgledanje.`
  );
  const [inquirySent, setInquirySent] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Kreditni kalkulator stanje (za nekretnine u prodaji)
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanYears, setLoanYears] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(4.5);

  const images = property.images && property.images.length > 0 ? property.images : [''];

  // Price per m²
  const pricePerM2 = property.area > 0 ? Math.round(property.price / property.area) : 0;

  // Monthly loan payment estimation: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
  const principal = property.price * (1 - downPaymentPercent / 100);
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanYears * 12;
  const monthlyPayment = principal > 0 && monthlyRate > 0
    ? Math.round((principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1))
    : 0;

  // Similar properties
  const similarProperties = allProperties
    .filter((p) => p.id !== property.id && (p.propertyType === property.propertyType || p.city === property.city))
    .slice(0, 3);

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryPhone.trim()) return;
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryName('');
      setInquiryPhone('');
      setInquiryEmail('');
    }, 4000);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-[#14243B] bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Nazad na pretragu</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer relative"
            title="Kopiraj link nekretnine"
            aria-label="Podijeli nekretninu"
          >
            <Share2 className="w-4 h-4" />
            {copyFeedback && (
              <span className="absolute -bottom-8 right-0 bg-[#14243B] text-white text-[10px] py-1 px-2 rounded-md whitespace-nowrap shadow-md">
                Link kopiran!
              </span>
            )}
          </button>

          <button
            onClick={() => onToggleFavorite(property.id)}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
              isFavorite
                ? 'bg-rose-50 text-rose-600 border-rose-200'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`} />
            <span className="hidden sm:inline">{isFavorite ? 'U omiljenim' : 'Sačuvaj'}</span>
          </button>
        </div>
      </div>

      {/* Title & Location Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className={`px-2.5 py-1 text-xs font-bold rounded-md tracking-wider uppercase ${
            property.offerType === 'prodaja' ? 'bg-[#14243B] text-white' : 'bg-emerald-800 text-emerald-100'
          }`}>
            {property.offerType === 'prodaja' ? 'Prodaja' : 'Iznajmljivanje'}
          </span>
          <span className="px-2.5 py-1 text-xs font-semibold bg-slate-100 text-slate-700 rounded-md">
            {getPropertyTypeLabel(property.propertyType)}
          </span>
          {property.isFeatured && (
            <span className="px-2.5 py-1 text-xs font-bold bg-[#C5A46D] text-[#14243B] rounded-md">
              Izdvojeno
            </span>
          )}
          <span className="text-xs text-slate-400 font-mono">ID: {property.id}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#14243B] tracking-tight">
          {property.title}
        </h1>

        <div className="flex items-center gap-2 text-sm text-slate-600 mt-2">
          <MapPin className="w-4 h-4 text-[#C5A46D] shrink-0" />
          <span>{property.neighborhood}, {property.city} {property.address ? `(${property.address})` : ''}</span>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="mb-10">
        <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md">
          {/* Main Large Image */}
          <div 
            onClick={() => setLightboxOpen(true)}
            className="relative aspect-16/9 sm:aspect-21/9 w-full max-h-[520px] cursor-zoom-in group overflow-hidden"
          >
            <img
              src={images[selectedImageIndex]}
              alt={`${property.title} - fotografija ${selectedImageIndex + 1}`}
              onError={(e) => {
                (e.target as HTMLImageElement).src = HERO_IMAGE;
              }}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/20">
              Prikaži punu galeriju ({images.length} fotografije)
            </div>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="p-3 bg-slate-900/90 flex gap-3 overflow-x-auto border-t border-white/10">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-24 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    selectedImageIndex === idx ? 'border-[#C5A46D] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = HERO_IMAGE;
                    }}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Two Column Layout: Details on Left, Contact Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        {/* Left Column: Specs, Description, Features, Mortgage Calculator */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Key Quick Specifications Grid */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <h2 className="text-base font-bold text-[#14243B] mb-4">Osnovne informacije</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Maximize2 className="w-4 h-4 text-[#C5A46D]" />
                  <span>Površina</span>
                </div>
                <div className="text-lg font-extrabold text-slate-900 tabular-nums">
                  {property.area} m²
                </div>
              </div>

              {property.rooms > 0 && (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                    <Bed className="w-4 h-4 text-[#C5A46D]" />
                    <span>Sobe</span>
                  </div>
                  <div className="text-lg font-extrabold text-slate-900 tabular-nums">
                    {property.rooms}
                  </div>
                </div>
              )}

              {property.bathrooms > 0 && (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                    <Bath className="w-4 h-4 text-[#C5A46D]" />
                    <span>Kupatila</span>
                  </div>
                  <div className="text-lg font-extrabold text-slate-900 tabular-nums">
                    {property.bathrooms}
                  </div>
                </div>
              )}

              {property.floor && (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                    <Layers className="w-4 h-4 text-[#C5A46D]" />
                    <span>Sprat</span>
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 truncate">
                    {property.floor}
                  </div>
                </div>
              )}

              {property.yearBuilt && (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                    <Calendar className="w-4 h-4 text-[#C5A46D]" />
                    <span>Izgrađeno</span>
                  </div>
                  <div className="text-lg font-extrabold text-slate-900 tabular-nums">
                    {property.yearBuilt}.
                  </div>
                </div>
              )}

              {property.landArea && (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                    <Maximize2 className="w-4 h-4 text-[#C5A46D]" />
                    <span>Okućnica</span>
                  </div>
                  <div className="text-lg font-extrabold text-slate-900 tabular-nums">
                    {property.landArea} m²
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <h2 className="text-lg font-bold text-[#14243B] mb-4">Opis nekretnine</h2>
            <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-4 whitespace-pre-line">
              {property.description}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Oglas je verifikovan i usklađen sa standardima DINO PLUS platforme za tržište BiH.</span>
            </div>
          </div>

          {/* Features & Amenities Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <h2 className="text-lg font-bold text-[#14243B] mb-4">Karakteristike i pogodnosti</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {property.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A46D] shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location Map Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#C5A46D]" />
                <h2 className="text-lg font-bold text-[#14243B]">Lokacija nekretnine</h2>
              </div>
              <span className="text-xs font-medium text-slate-500">
                {property.city}, {property.neighborhood}
              </span>
            </div>
            {property.address && (
              <p className="text-xs text-slate-600 mb-4">
                Adresa: <strong className="text-slate-800">{property.address}</strong>, {property.neighborhood}, {property.city}
              </p>
            )}
            <div className="w-full h-72 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
              <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyC_JstBRZVZJ5OXVzomgEwq-s0hGT4WYr4'}>
                <Map
                  defaultCenter={property.coordinates}
                  defaultZoom={14}
                  mapId="DEMO_MAP_ID"
                  gestureHandling="cooperative"
                  disableDefaultUI={false}
                  internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                  style={{ width: '100%', height: '100%' }}
                >
                  <AdvancedMarker position={property.coordinates} title={property.title}>
                    <Pin
                      background="#14243B"
                      borderColor="#C5A46D"
                      glyphColor="#C5A46D"
                      scale={1.2}
                    />
                  </AdvancedMarker>
                </Map>
              </APIProvider>
            </div>
          </div>

          {/* Mortgage Calculator (For Sale properties) */}
          {property.offerType === 'prodaja' && (
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-[#C5A46D]" />
                  <h2 className="text-base font-bold text-[#14243B]">Informativni kalkulator stambenog kredita</h2>
                </div>
                <span className="text-xs text-slate-400">Okvirni izračun</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Učešće ({downPaymentPercent}%):
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="5"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full accent-[#14243B]"
                  />
                  <div className="text-xs font-semibold text-slate-800 mt-1 tabular-nums">
                    {formatPriceKM(Math.round(property.price * (downPaymentPercent / 100)))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Rok otplate: {loanYears} god.
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="5"
                    value={loanYears}
                    onChange={(e) => setLoanYears(Number(e.target.value))}
                    className="w-full accent-[#14243B]"
                  />
                  <div className="text-xs font-semibold text-slate-800 mt-1">
                    {loanYears * 12} mjesečnih rata
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Kamatna stopa: {interestRate}%
                  </label>
                  <input
                    type="range"
                    min="3.0"
                    max="8.0"
                    step="0.5"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-[#14243B]"
                  />
                  <div className="text-xs font-semibold text-slate-800 mt-1">
                    Fiksna / Promjenjiva
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-500 block">Procijenjena mjesečna rata:</span>
                  <span className="text-2xl font-extrabold text-[#14243B] tabular-nums">
                    {monthlyPayment.toLocaleString('bs-BA')} KM /mj.
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 max-w-xs">
                  *Izračun je isključivo informativnog karaktera i ne predstavlja obavezujuću ponudu banke.
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Right Sticky Card: Price, Agent info, Inquiry form */}
        <div className="lg:col-span-1 sticky top-28 space-y-6">
          
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
            
            {/* Price Header */}
            <div className="pb-5 mb-5 border-b border-slate-100">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                Cijena nekretnine
              </span>
              <div className="text-3xl font-extrabold text-[#14243B] mt-1 tabular-nums">
                {formatPriceKM(property.price, property.priceSuffix)}
              </div>
              {property.offerType === 'prodaja' && pricePerM2 > 0 && (
                <div className="text-xs font-semibold text-[#C5A46D] mt-1 tabular-nums">
                  ≈ {pricePerM2.toLocaleString('bs-BA')} KM / m²
                </div>
              )}
            </div>

            {/* Agent Info Box */}
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#14243B] text-white flex items-center justify-center font-bold text-lg border-2 border-[#C5A46D]">
                  {property.agent.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 leading-tight">
                    {property.agent.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {property.agent.agency}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-600">
                    <span className="text-amber-500 font-bold">★ {property.agent.rating}</span>
                    <span>·</span>
                    <span>{property.agent.experienceYears} god. iskustva</span>
                  </div>
                </div>
              </div>

              {/* Reveal Phone Button */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setPhoneRevealed(!phoneRevealed)}
                  className="w-full py-3 bg-[#14243B] hover:bg-[#1d3353] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs border border-[#C5A46D]/40"
                >
                  <Phone className="w-4 h-4 text-[#C5A46D]" />
                  <span>{phoneRevealed ? property.agent.phone : 'Prikaži broj telefona'}</span>
                </button>
              </div>
            </div>

            {/* Direct Inquiry Form */}
            <form onSubmit={handleSendInquiry} className="space-y-3.5 pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-900 block">
                Kontaktirajte oglašivača direktno
              </span>

              {inquirySent ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs space-y-1 animate-in fade-in">
                  <div className="font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Upit je uspješno poslan!</span>
                  </div>
                  <p className="text-slate-600">
                    Agent {property.agent.name} je obaviješten i kontaktirat će Vas u najkraćem roku.
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Vaše ime i prezime *"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#14243B]"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Broj telefona *"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#14243B]"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="E-mail adresa (opcionalno)"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#14243B]"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={3}
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#14243B] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-[#14243B]" />
                    <span>Pošalji upit</span>
                  </button>
                </>
              )}

              <div className="text-[11px] text-slate-400 text-center pt-1">
                Vaši podaci su zaštićeni u skladu sa politikom privatnosti.
              </div>
            </form>

          </div>

        </div>

      </div>

      {/* Similar Properties Section */}
      {similarProperties.length > 0 && (
        <div className="mt-16 pt-10 border-t border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-extrabold text-[#14243B] tracking-tight">
                Slične nekretnine
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Preporučujemo i druge nekretnine u kategoriji {getPropertyTypeLabel(property.propertyType)} ili gradu {property.city}.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                isFavorite={isFavorite}
                onToggleFavorite={onToggleFavorite}
                onSelectProperty={onSelectProperty}
              />
            ))}
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200">
          
          {/* Lightbox Top Bar */}
          <div className="flex items-center justify-between text-white pb-3 border-b border-white/10">
            <span className="text-sm font-semibold">
              {property.title} — {selectedImageIndex + 1} od {images.length}
            </span>
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
              aria-label="Zatvori galeriju"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Center Image with Prev/Next Controls */}
          <div className="relative flex-1 flex items-center justify-center py-4">
            {images.length > 1 && (
              <button
                onClick={() => setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                className="absolute left-2 sm:left-4 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all cursor-pointer z-10"
                aria-label="Prethodna fotografija"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <img
              src={images[selectedImageIndex]}
              alt=""
              onError={(e) => {
                (e.target as HTMLImageElement).src = HERO_IMAGE;
              }}
              className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl"
            />

            {images.length > 1 && (
              <button
                onClick={() => setSelectedImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                className="absolute right-2 sm:right-4 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all cursor-pointer z-10"
                aria-label="Sljedeća fotografija"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Lightbox Bottom Thumbnails */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImageIndex(i)}
                className={`w-16 h-12 rounded-md overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  selectedImageIndex === i ? 'border-[#C5A46D] scale-105' : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt=""
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = HERO_IMAGE;
                  }}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
