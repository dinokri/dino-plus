import React from 'react';
import { 
  Search, 
  Eye, 
  Layers, 
  Users2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Compass, 
  Building2 
} from 'lucide-react';
import { HERO_IMAGE, APARTMENT_IMAGE } from '../data/properties';
import { ScrollReveal, ScrollStaggerGroup, ScrollStaggerItem } from './ScrollReveal';

interface AboutViewProps {
  onNavigateToProperties: () => void;
  onOpenPublishModal: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onNavigateToProperties,
  onOpenPublishModal,
}) => {
  const values = [
    {
      title: 'Jednostavno pretraživanje nekretnina',
      desc: 'Napredni filteri prilagođeni specifičnostima bh. tržišta omogućavaju brzu i preciznu selekciju prema lokaciji, cijeni, kvadraturi i tipu nekretnine.',
      icon: <Search className="w-5 h-5 text-[#C5A46D]" />,
    },
    {
      title: 'Pregledna i kvalitetna prezentacija oglasa',
      desc: 'Fokus na visokokvalitetne fotografije, detaljne tehničke specifikacije, transparentne cijene i jasne karakteristike svakog prostora.',
      icon: <Eye className="w-5 h-5 text-[#C5A46D]" />,
    },
    {
      title: 'Širok izbor nekretnina',
      desc: 'Sveobuhvatan pregled stambenih jedinica, porodičnih kuća, građevinskih parcela, planinskih koliba i poslovnih prostora u svim regijama BiH.',
      icon: <Layers className="w-5 h-5 text-[#C5A46D]" />,
    },
    {
      title: 'Povezivanje kupaca, prodavaca i zakupaca',
      desc: 'Direktna, transparentna i pouzdana komunikacija između vlasnika nekretnina, licenciranih agencija i zainteresovanih klijenata bez posredničkih barijera.',
      icon: <Users2 className="w-5 h-5 text-[#C5A46D]" />,
    },
    {
      title: 'Profesionalno i jednostavno korisničko iskustvo',
      desc: 'Intuitivan interfejs razvijen po uzoru na najsavremenije digitalne produkte, besprijekoran i na mobilnim i na računarskim uređajima.',
      icon: <Sparkles className="w-5 h-5 text-[#C5A46D]" />,
    },
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section of About */}
        <ScrollReveal direction="up" yOffset={25} amount={0.2} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[#C5A46D] text-xs font-bold uppercase tracking-wider mb-4">
              <Building2 className="w-3.5 h-3.5 text-[#14243B]" />
              <span>O platformi</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#14243B] tracking-tight leading-tight mb-6">
              Otkrijte DINO PLUS
            </h1>

            <p className="text-base text-slate-600 leading-relaxed mb-5">
              DINO PLUS je moderna, premium digitalna marketplace platforma osmišljena da transformiše i pojednostavi proces pretrage, prodaje i iznajmljivanja nekretnina na teritoriji Bosne i Hercegovine.
            </p>

            <p className="text-base text-slate-600 leading-relaxed mb-8">
              Nastali smo sa jasnom vizijom: pružiti kupcima, zakupcima i vlasnicima nekretnina dostojanstven, čist, tehnološki napredan i estetski besprijekoran prostor gdje svaka nekretnina dobija prezentaciju kakvu zaslužuje.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onNavigateToProperties}
                className="px-6 py-3.5 bg-[#14243B] hover:bg-[#1d3353] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer border border-[#C5A46D]/40"
              >
                <span>Istražite ponudu nekretnina</span>
                <ArrowRight className="w-4 h-4 text-[#C5A46D]" />
              </button>
              
              <button
                onClick={onOpenPublishModal}
                className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Objavite svoj oglas
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-4/3 relative">
              <img
                src={HERO_IMAGE}
                alt="Moderna arhitektura u Bosni i Hercegovini"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14243B]/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white bg-[#14243B]/80 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C5A46D] block mb-1">
                  Naš slogan
                </span>
                <p className="text-sm font-semibold italic">
                  „Pronađite prostor za svoje snove.“
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Core Values Grid */}
        <div className="pt-12 border-t border-slate-100 mb-16">
          <ScrollReveal direction="up" yOffset={25} amount={0.2} className="max-w-2xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C5A46D] block mb-1">
              Naši principi
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14243B]">
              Vrijednosti na kojima gradimo povjerenje
            </h2>
          </ScrollReveal>

          <ScrollStaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
            {values.map((v, i) => (
              <ScrollStaggerItem key={i} yOffset={25}>
                <div 
                  className="p-6 bg-slate-50 hover:bg-white rounded-2xl border border-slate-200/80 hover:shadow-lg transition-all duration-200 h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-white shadow-xs flex items-center justify-center mb-4 border border-slate-100">
                    {v.icon}
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mb-2">
                    {v.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </ScrollStaggerItem>
            ))}
          </ScrollStaggerGroup>
        </div>

        {/* Architectural Insight / Culture section */}
        <ScrollReveal direction="up" yOffset={30} amount={0.2} className="bg-[#14243B] text-white rounded-3xl p-8 sm:p-12 border border-white/10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C5A46D] block mb-2">
                Tržište nekretnina u BiH
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-4 text-balance">
                Spoj tradicije, prirodnih ljepota i savremene urbane arhitekture
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3">
                Od historijskih austrougarskih zdanja u Sarajevu i kamenih mediteranskih zdanja u Mostaru i Trebinju, do savremenih stambenih kompleksa u Banjoj Luci i planinskih resorta na olimpijskim planinama — Bosna i Hercegovina posjeduje jedinstven prostorni potencijal.
              </p>
              <div className="mt-6 flex items-center gap-3 text-xs text-slate-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#C5A46D]" />
                <span>Posvećeni transparentnosti, profesionalizmu i zaštiti interesa korisnika.</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg border border-white/20 aspect-16/10">
              <img
                src={APARTMENT_IMAGE}
                alt="Moderan enterijer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};
