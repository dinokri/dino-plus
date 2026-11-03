import React from 'react';
import { Search, PlusCircle, ArrowRight, ShieldCheck, MapPin, Building2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { HERO_IMAGE } from '../data/properties';
import { SearchFilterBar } from './SearchFilterBar';
import { FilterState } from '../types/property';

interface HeroSectionProps {
  onSearch: (filters: Partial<FilterState>) => void;
  onExploreClick: () => void;
  onPublishClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  onExploreClick,
  onPublishClick,
}) => {
  return (
    <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden bg-slate-900">
      
      {/* Background Photography with Luxury Scrim */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          src={HERO_IMAGE}
          alt="Luksuzna nekretnina u Bosni i Hercegovini"
          className="w-full h-full object-cover object-center brightness-95"
          referrerPolicy="no-referrer"
        />
        {/* Anti-AI Slop Scrim: Deep navy and balanced contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#14243B]/95 via-[#14243B]/80 to-[#14243B]/60" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#14243B]/40 to-[#14243B]/90" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="max-w-3xl">
          
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#C5A46D] text-xs font-bold uppercase tracking-wider mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>Pronađite prostor za svoje snove</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-5 text-balance"
          >
            Pronađite nekretninu svojih snova.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg text-slate-200/90 leading-relaxed font-normal mb-8 max-w-2xl"
          >
            Stanovi, kuće, zemljišta i poslovni prostori na jednom mjestu. Otkrijte provjerene nekretnine širom Bosne i Hercegovine.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-wrap items-center gap-3.5 mb-10"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onExploreClick}
              className="px-6 py-3.5 bg-[#C5A46D] hover:bg-[#b8955c] text-[#14243B] font-extrabold text-sm rounded-xl transition-shadow shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer"
            >
              <span>Pregledaj nekretnine</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onPublishClick}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl backdrop-blur-md border border-white/30 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-[#C5A46D]" />
              <span>Objavi oglas</span>
            </motion.button>
          </motion.div>

        </div>

        {/* Floating Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-5xl"
        >
          <SearchFilterBar onSearch={onSearch} />
        </motion.div>

      </div>

    </section>
  );
};
