import React from 'react';
import { PlusCircle, ShieldCheck, Users, Eye, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface OwnerBannerSectionProps {
  onOpenPublishModal: () => void;
}

export const OwnerBannerSection: React.FC<OwnerBannerSectionProps> = ({
  onOpenPublishModal,
}) => {
  return (
    <section className="py-16 bg-[#14243B] text-white relative overflow-hidden">
      {/* Decorative background geometry */}
      <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#C5A46D]/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: '-40px 0px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="bg-gradient-to-r from-slate-900/90 to-[#14243B]/90 rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          <div className="max-w-2xl text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#C5A46D] text-xs font-bold uppercase tracking-wider mb-4 border border-white/15">
              Za vlasnike nekretnina i agencije
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4 text-balance">
              Imate nekretninu za prodaju ili iznajmljivanje?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              Objavite svoju nekretninu na DINO PLUS platformi i predstavite je potencijalnim kupcima i zakupcima širom Bosne i Hercegovine.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                <Eye className="w-4 h-4 text-[#C5A46D] shrink-0" />
                <span>Maksimalna vidljivost oglasa</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                <Users className="w-4 h-4 text-[#C5A46D] shrink-0" />
                <span>Direktan kontakt s kupcima</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#C5A46D] shrink-0" />
                <span>Jednostavna i sigurna objava</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenPublishModal}
              className="w-full sm:w-auto px-8 py-4 bg-[#C5A46D] hover:bg-[#b8955c] text-[#14243B] font-extrabold text-sm rounded-xl transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <PlusCircle className="w-5 h-5 text-[#14243B]" />
              <span>Objavi svoj oglas</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

        </motion.div>
      </div>
    </section>
  );
};
