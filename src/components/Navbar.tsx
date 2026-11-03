import React, { useState } from 'react';
import { 
  Building2, 
  Heart, 
  Menu, 
  X, 
  PlusCircle, 
  User, 
  LogIn 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, params?: Record<string, string | number>) => void;
  favoritesCount: number;
  onOpenPublishModal: () => void;
  onOpenAuthModal: (mode: 'login' | 'register') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  favoritesCount,
  onOpenPublishModal,
  onOpenAuthModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'pocetna', label: 'Početna' },
    { id: 'nekretnine', label: 'Nekretnine' },
    { id: 'prodaja', label: 'Prodaja', filter: { offerType: 'prodaja' } },
    { id: 'iznajmljivanje', label: 'Iznajmljivanje', filter: { offerType: 'iznajmljivanje' } },
    { id: 'kategorije', label: 'Kategorije' },
    { id: 'o-nama', label: 'O nama' },
    { id: 'kontakt', label: 'Kontakt' },
  ];

  const handleLinkClick = (link: typeof navLinks[0]) => {
    setMobileMenuOpen(false);
    if (link.filter) {
      onNavigate('nekretnine', link.filter);
    } else {
      onNavigate(link.id);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all shadow-xs">
      {/* Top Banner Notice (Discrete Demo Identification as required by prompt) */}
      <div className="bg-[#14243B] text-slate-300 text-[11px] py-1 px-4 text-center tracking-wide border-b border-white/10">
        <span className="font-medium text-amber-200/90">DINO PLUS BIH</span>
        <span className="mx-2 opacity-40">|</span>
        <span>Zvanična demonstraciona marketplace platforma za nekretnine u Bosni i Hercegovini</span>
        <span className="mx-2 opacity-40">|</span>
        <span className="text-slate-300">Valuta: Konvertibilna marka (KM)</span>
      </div>

      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Zone */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('pocetna')}
              className="flex items-center gap-2.5 text-left group focus-visible:outline-2 focus-visible:outline-[#14243B] rounded-lg cursor-pointer"
              aria-label="DINO PLUS Početna"
            >
              <div className="w-10 h-10 rounded-xl bg-[#14243B] flex items-center justify-center text-white shadow-md shadow-slate-900/10 group-hover:bg-[#1c3252] transition-colors">
                <Building2 className="w-5 h-5 text-[#C5A46D]" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-[#14243B] leading-none flex items-center gap-1">
                  DINO <span className="text-[#C5A46D] text-lg font-black">+</span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 mt-0.5">
                  Nekretnine BiH
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links with Magnetic Active Indicator */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[#343B46]" aria-label="Glavna navigacija">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link)}
                  className={`relative py-2 whitespace-nowrap transition-colors duration-150 cursor-pointer ${
                    isActive 
                      ? 'text-[#14243B] font-bold' 
                      : 'hover:text-[#14243B] text-slate-600'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-indicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C5A46D] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Zone: Favorites, Auth, Publish */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Favorites Icon Button with Pop animation */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onNavigate('omiljene')}
              className="relative p-2.5 text-slate-700 hover:text-[#14243B] hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              aria-label={`Pregledaj omiljene nekretnine (${favoritesCount})`}
              title="Omiljene nekretnine"
            >
              <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`} />
              <AnimatePresence>
                {favoritesCount > 0 && (
                  <motion.span
                    key={favoritesCount}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                    className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs"
                  >
                    {favoritesCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Prijava */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onOpenAuthModal('login')}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-[#14243B] hover:bg-slate-100 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5 text-slate-500" />
              <span>Prijava</span>
            </motion.button>

            {/* Registracija */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onOpenAuthModal('register')}
              className="hidden md:flex px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-[#14243B] hover:bg-slate-100 rounded-xl transition-colors cursor-pointer items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5 text-slate-500" />
              <span>Registracija</span>
            </motion.button>

            {/* Istaknuto dugme: Objavi oglas */}
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenPublishModal}
              className="px-4 py-2.5 bg-[#14243B] hover:bg-[#1d3353] text-white text-xs font-bold rounded-xl transition-shadow shadow-md shadow-slate-900/10 flex items-center gap-2 cursor-pointer border border-[#C5A46D]/40"
            >
              <PlusCircle className="w-4 h-4 text-[#C5A46D]" />
              <span className="whitespace-nowrap">Objavi oglas</span>
            </motion.button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onNavigate('omiljene')}
              className="relative p-2 text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              aria-label="Omiljene nekretnine"
            >
              <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </motion.button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer focus-visible:outline-2 focus-visible:outline-[#14243B]"
              aria-label={mobileMenuOpen ? "Zatvori meni" : "Otvori mobilni meni"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Animated Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col space-y-2 mb-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link)}
                  className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                    currentView === link.id
                      ? 'bg-[#14243B] text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPublishModal();
                }}
                className="w-full py-3 bg-[#14243B] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm border border-[#C5A46D]/40"
              >
                <PlusCircle className="w-4 h-4 text-[#C5A46D]" />
                <span>Objavi oglas</span>
              </motion.button>

              <div className="grid grid-cols-2 gap-2 mt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuthModal('login');
                  }}
                  className="py-2.5 text-center text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Prijava
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuthModal('register');
                  }}
                  className="py-2.5 text-center text-xs font-semibold text-[#14243B] border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  Registracija
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
