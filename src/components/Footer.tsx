import React from 'react';
import { Building2, MapPin, Mail, Phone, Heart, ShieldCheck } from 'lucide-react';
import { CITIES_LIST } from '../data/properties';

interface FooterProps {
  onNavigate: (view: string, params?: Record<string, string | number>) => void;
  onOpenPublishModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPublishModal,
}) => {
  return (
    <footer className="bg-[#14243B] text-slate-300 border-t border-white/10">
      
      {/* Top Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Slogan Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20">
                <Building2 className="w-5 h-5 text-[#C5A46D]" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white flex items-center gap-1">
                DINO <span className="text-[#C5A46D] text-xl font-black">+</span>
              </span>
            </div>

            <p className="text-sm font-semibold text-white/90 italic">
              „Pronađite prostor za svoje snove.“
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Vodeća marketplace platforma za oglašavanje, pretragu, prodaju i najam stambenih, poslovnih i zemljišnih nekretnina u Bosni i Hercegovini.
            </p>

            <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C5A46D]" />
              <span>Standardizovana i provjerena prezentacija oglasa</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigacija
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('pocetna')}
                  className="hover:text-white transition-colors cursor-pointer text-slate-400"
                >
                  Početna stranica
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('nekretnine')}
                  className="hover:text-white transition-colors cursor-pointer text-slate-400"
                >
                  Sve nekretnine
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('prodaja')}
                  className="hover:text-white transition-colors cursor-pointer text-slate-400"
                >
                  Nekretnine na prodaju
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('iznajmljivanje')}
                  className="hover:text-white transition-colors cursor-pointer text-slate-400"
                >
                  Nekretnine za najam
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('kategorije')}
                  className="hover:text-white transition-colors cursor-pointer text-slate-400"
                >
                  Kategorije nekretnina
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('o-nama')}
                  className="hover:text-white transition-colors cursor-pointer text-slate-400"
                >
                  O nama
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('kontakt')}
                  className="hover:text-white transition-colors cursor-pointer text-slate-400"
                >
                  Kontakt
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Cities in BiH */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Lokacije u BiH
            </h4>
            <ul className="space-y-2 text-xs">
              {CITIES_LIST.slice(0, 6).map((city) => (
                <li key={city}>
                  <button
                    onClick={() => onNavigate('nekretnine', { city })}
                    className="hover:text-white transition-colors cursor-pointer text-slate-400"
                  >
                    Nekretnine {city}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Korisnička podrška
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C5A46D]" />
                <span>info@dinoplus.ba</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C5A46D]" />
                <span>+387 33 221 450</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A46D]" />
                <span>Sarajevo, Bosna i Hercegovina</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenPublishModal}
                  className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer border border-white/20 text-center"
                >
                  Objavite svoj oglas
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Demo Notice Box */}
        <div className="mt-12 pt-6 border-t border-white/10">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-slate-400 text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <strong className="text-white">Oznaka demonstracionog sistema:</strong> Svi oglasi, cijene, agenti i kontakt brojevi prikazani na ovoj platformi su demonstracione prirode i služe za prikaz funkcionalnosti i dizajna marketplace rješenja DINO PLUS.
            </div>
            <span className="shrink-0 text-[#C5A46D] font-mono text-[11px] font-bold">
              v1.0.0-PROD
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} DINO PLUS d.o.o. Sva prava pridržana.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Pravila korištenja</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Privatnost podataka</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Zaštita potrošača</span>
          </div>
        </div>

      </div>

    </footer>
  );
};
