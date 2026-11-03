import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Building2, 
  Sparkles, 
  Clock, 
  Star, 
  ChevronRight, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp 
} from 'lucide-react';
import { Property, FilterState, PropertyType, OfferType } from './types/property';
import { motion, AnimatePresence } from 'motion/react';
import { PROPERTIES_DATA } from './data/properties';
import { initialFilterState } from './utils/filterProperties';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PropertyCard } from './components/PropertyCard';
import { PropertiesView } from './components/PropertiesView';
import { PropertyDetailsView } from './components/PropertyDetailsView';
import { PopularLocationsSection } from './components/PopularLocationsSection';
import { CategoriesSection } from './components/CategoriesSection';
import { OwnerBannerSection } from './components/OwnerBannerSection';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { FavoritesView } from './components/FavoritesView';
import { PublishListingModal } from './components/PublishListingModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { ScrollReveal, ScrollStaggerGroup, ScrollStaggerItem } from './components/ScrollReveal';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('pocetna');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dinoplus_favorites');
      return saved ? JSON.parse(saved) : ['prop-1', 'prop-6'];
    } catch {
      return ['prop-1', 'prop-6'];
    }
  });

  // Modal states
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Sync favorites with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dinoplus_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.warn('Failed to save favorites to localStorage', e);
    }
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const handleNavigate = (view: string, params?: Record<string, any>) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (view === 'detalji' && params?.property) {
      setSelectedProperty(params.property);
      setCurrentView('detalji');
      return;
    }

    if (view === 'nekretnine') {
      if (params) {
        setFilters((prev) => ({
          ...prev,
          ...params,
        }));
      }
      setCurrentView('nekretnine');
      return;
    }

    if (params?.offerType) {
      setFilters((prev) => ({
        ...prev,
        offerType: params.offerType as OfferType,
      }));
      setCurrentView('nekretnine');
      return;
    }

    setCurrentView(view);
  };

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    setCurrentView('detalji');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchFromHero = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
    setCurrentView('nekretnine');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCity = (cityName: string) => {
    setFilters({
      ...initialFilterState,
      city: cityName,
    });
    setCurrentView('nekretnine');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (catId: PropertyType) => {
    setFilters({
      ...initialFilterState,
      propertyType: catId,
    });
    setCurrentView('nekretnine');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Featured Properties for Home
  const featuredProperties = PROPERTIES_DATA.filter((p) => p.isFeatured).slice(0, 6);

  // Latest Properties for Home
  const latestProperties = [...PROPERTIES_DATA]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#343B46] font-sans antialiased selection:bg-[#14243B] selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        favoritesCount={favorites.length}
        onOpenPublishModal={() => setPublishModalOpen(true)}
        onOpenAuthModal={(mode) => {
          setAuthMode(mode);
          setAuthModalOpen(true);
        }}
      />

      {/* Main Content Area with Smooth Page Transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {/* VIEW: POČETNA (HOME) */}
            {currentView === 'pocetna' && (
              <div>
                {/* Hero Section */}
                <HeroSection
              onSearch={handleSearchFromHero}
              onExploreClick={() => handleNavigate('nekretnine')}
              onPublishClick={() => setPublishModalOpen(true)}
            />

            {/* Platform Highlights Bar (Clean Metadata, Anti-slop) */}
            <ScrollReveal as="section" direction="up" yOffset={25} amount={0.2} className="bg-slate-50 border-y border-slate-200/80 py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollStaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left" staggerDelay={0.07}>
                  <ScrollStaggerItem yOffset={20}>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-white text-[#14243B] shadow-2xs border border-slate-200">
                        <Building2 className="w-5 h-5 text-[#C5A46D]" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-900 block">20+ demonstracionih nekretnina</span>
                        <span className="text-xs text-slate-500">Različite regije i kategorije u BiH</span>
                      </div>
                    </div>
                  </ScrollStaggerItem>

                  <ScrollStaggerItem yOffset={20}>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-white text-[#14243B] shadow-2xs border border-slate-200">
                        <ShieldCheck className="w-5 h-5 text-[#C5A46D]" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-900 block">Standardizovane cijene</span>
                        <span className="text-xs text-slate-500">Isključivo u Konvertibilnim markama (KM)</span>
                      </div>
                    </div>
                  </ScrollStaggerItem>

                  <ScrollStaggerItem yOffset={20}>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-white text-[#14243B] shadow-2xs border border-slate-200">
                        <TrendingUp className="w-5 h-5 text-[#C5A46D]" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-900 block">Direktan kontakt sa oglašivačem</span>
                        <span className="text-xs text-slate-500">Agencije i privatni vlasnici</span>
                      </div>
                    </div>
                  </ScrollStaggerItem>

                  <ScrollStaggerItem yOffset={20}>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-white text-[#14243B] shadow-2xs border border-slate-200">
                        <CheckCircle2 className="w-5 h-5 text-[#C5A46D]" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-900 block">Besprijekoran odziv</span>
                        <span className="text-xs text-slate-500">Optimizovano za mobitele i računare</span>
                      </div>
                    </div>
                  </ScrollStaggerItem>
                </ScrollStaggerGroup>
              </div>
            </ScrollReveal>

            {/* D. Izdvojene nekretnine (Featured Properties) */}
            <section className="py-16 bg-white overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal direction="up" yOffset={28} amount={0.2} margin="-40px 0px">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                    <div>
                      <div className="text-xs font-bold text-[#C5A46D] uppercase tracking-wider mb-2">
                        Premium izbor
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14243B] tracking-tight">
                        Izdvojene nekretnine
                      </h2>
                      <p className="text-sm text-slate-500 mt-1">
                        Ručno odabrane atraktivne nekretnine sa vrhunskim lokacijama i opremom.
                      </p>
                    </div>

                    <button
                      onClick={() => handleNavigate('nekretnine')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#14243B] hover:text-[#C5A46D] transition-colors cursor-pointer self-start sm:self-auto group"
                    >
                      <span>Pogledaj sve nekretnine</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </ScrollReveal>

                <ScrollStaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.09}>
                  {featuredProperties.map((property) => (
                    <ScrollStaggerItem key={property.id} yOffset={36}>
                      <PropertyCard
                        property={property}
                        isFavorite={favorites.includes(property.id)}
                        onToggleFavorite={toggleFavorite}
                        onSelectProperty={handleSelectProperty}
                      />
                    </ScrollStaggerItem>
                  ))}
                </ScrollStaggerGroup>
              </div>
            </section>

            {/* G. Kategorije nekretnina */}
            <CategoriesSection onSelectCategory={handleSelectCategory} />

            {/* E. Nedavno dodane nekretnine (Latest Properties) */}
            <section className="py-16 bg-[#F5F6F8] overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal direction="up" yOffset={28} amount={0.2} margin="-40px 0px">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                    <div>
                      <div className="text-xs font-bold text-[#C5A46D] uppercase tracking-wider mb-2">
                        Svježe na tržištu
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14243B] tracking-tight">
                        Najnovije nekretnine
                      </h2>
                      <p className="text-sm text-slate-500 mt-1">
                        Pogledajte najnovije ponude stanova, kuća i poslovnih prostora dodane na platformu.
                      </p>
                    </div>

                    <button
                      onClick={() => handleNavigate('nekretnine')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-[#14243B] rounded-xl transition-all shadow-2xs cursor-pointer self-start sm:self-auto group"
                    >
                      <span>Pogledaj sve nekretnine</span>
                      <ArrowRight className="w-4 h-4 text-[#C5A46D] group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </ScrollReveal>

                <ScrollStaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.09}>
                  {latestProperties.map((property) => (
                    <ScrollStaggerItem key={property.id} yOffset={36}>
                      <PropertyCard
                        property={property}
                        isFavorite={favorites.includes(property.id)}
                        onToggleFavorite={toggleFavorite}
                        onSelectProperty={handleSelectProperty}
                      />
                    </ScrollStaggerItem>
                  ))}
                </ScrollStaggerGroup>
              </div>
            </section>

            {/* F. Popularne lokacije u BiH */}
            <PopularLocationsSection onSelectCity={handleSelectCity} />

            {/* H. Sekcija za vlasnike nekretnina */}
            <OwnerBannerSection onOpenPublishModal={() => setPublishModalOpen(true)} />
          </div>
        )}

        {/* VIEW: SVE NEKRETNINE / PRETRAGA */}
        {currentView === 'nekretnine' && (
          <PropertiesView
            properties={PROPERTIES_DATA}
            filters={filters}
            onUpdateFilters={setFilters}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onSelectProperty={handleSelectProperty}
          />
        )}

        {/* VIEW: DETALJI NEKRETNINE */}
        {currentView === 'detalji' && selectedProperty && (
          <PropertyDetailsView
            property={selectedProperty}
            allProperties={PROPERTIES_DATA}
            isFavorite={favorites.includes(selectedProperty.id)}
            onToggleFavorite={toggleFavorite}
            onSelectProperty={handleSelectProperty}
            onBack={() => handleNavigate('nekretnine')}
          />
        )}

        {/* VIEW: KATEGORIJE */}
        {currentView === 'kategorije' && (
          <div className="py-8">
            <CategoriesSection onSelectCategory={handleSelectCategory} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <OwnerBannerSection onOpenPublishModal={() => setPublishModalOpen(true)} />
            </div>
          </div>
        )}

        {/* VIEW: O NAMA */}
        {currentView === 'o-nama' && (
          <AboutView
            onNavigateToProperties={() => handleNavigate('nekretnine')}
            onOpenPublishModal={() => setPublishModalOpen(true)}
          />
        )}

        {/* VIEW: KONTAKT */}
        {currentView === 'kontakt' && <ContactView />}

        {/* VIEW: OMILJENE */}
        {currentView === 'omiljene' && (
          <FavoritesView
            favorites={favorites}
            allProperties={PROPERTIES_DATA}
            onToggleFavorite={toggleFavorite}
            onClearFavorites={clearFavorites}
            onSelectProperty={handleSelectProperty}
            onExplore={() => handleNavigate('nekretnine')}
          />
        )}
          </motion.div>
        </AnimatePresence>

      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPublishModal={() => setPublishModalOpen(true)}
      />

      {/* Multi-step Publish Listing Modal */}
      <PublishListingModal
        isOpen={publishModalOpen}
        onClose={() => setPublishModalOpen(false)}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
      />

    </div>
  );
}
