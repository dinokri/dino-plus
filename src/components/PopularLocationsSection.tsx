import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { SARAJEVO_IMAGE, VILLA_IMAGE, HERO_IMAGE, APARTMENT_IMAGE } from '../data/properties';

interface PopularLocationsSectionProps {
  onSelectCity: (city: string) => void;
}

interface CityInfo {
  name: string;
  count: number;
  image: string;
  badge: string;
  accent: string;
}

export const PopularLocationsSection: React.FC<PopularLocationsSectionProps> = ({
  onSelectCity,
}) => {
  const cities: CityInfo[] = [
    { name: 'Sarajevo', count: 5, image: SARAJEVO_IMAGE, badge: 'Glavni grad', accent: 'from-[#14243B]/85' },
    { name: 'Banja Luka', count: 2, image: APARTMENT_IMAGE, badge: 'Krajina', accent: 'from-slate-900/85' },
    { name: 'Mostar', count: 3, image: VILLA_IMAGE, badge: 'Hercegovina', accent: 'from-[#14243B]/85' },
    { name: 'Tuzla', count: 2, image: HERO_IMAGE, badge: 'Industrijski centar', accent: 'from-slate-900/85' },
    { name: 'Zenica', count: 2, image: SARAJEVO_IMAGE, badge: 'Srednja Bosna', accent: 'from-[#14243B]/85' },
    { name: 'Bihać', count: 1, image: HERO_IMAGE, badge: 'Kraljevski grad na Uni', accent: 'from-slate-900/85' },
    { name: 'Trebinje', count: 1, image: VILLA_IMAGE, badge: 'Grad sunca i platana', accent: 'from-[#14243B]/85' },
    { name: 'Neum', count: 1, image: VILLA_IMAGE, badge: 'Jadranska obala', accent: 'from-blue-950/85' },
    { name: 'Istočno Sarajevo', count: 2, image: HERO_IMAGE, badge: 'Jahorina & okolina', accent: 'from-slate-900/85' },
    { name: 'Doboj', count: 1, image: APARTMENT_IMAGE, badge: 'Čvorište regije', accent: 'from-slate-900/85' },
  ];

  return (
    <section className="py-16 bg-[#F5F6F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: '-40px 0px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
        >
          <div>
            <div className="text-xs font-bold text-[#C5A46D] uppercase tracking-wider mb-2">
              Lokalna tržišta
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14243B] tracking-tight">
              Pronađite nekretninu na željenoj lokaciji
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Istražite vodeće gradske centre, univerzitetske gradove, planinske destinacije i obalu Jadrana.
            </p>
          </div>
        </motion.div>

        {/* Cities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {cities.map((city, index) => (
            <motion.button
              key={city.name}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.04, ease: 'easeOut' }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectCity(city.name)}
              className="group relative h-48 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-shadow duration-300 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#14243B]"
            >
              {/* Background Image */}
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                loading="lazy"
              />

              {/* Scrim Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${city.accent} via-black/40 to-transparent group-hover:opacity-90 transition-opacity`} />

              {/* Content */}
              <div className="absolute inset-0 p-4 flex flex-col justify-between z-10 text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-xs w-fit">
                  {city.badge}
                </span>

                <div>
                  <h3 className="font-extrabold text-base sm:text-lg leading-tight group-hover:text-[#C5A46D] transition-colors flex items-center justify-between">
                    <span>{city.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-xs text-slate-200 mt-1">
                    {city.count} {city.count === 1 ? 'nekretnina' : 'nekretnine'}
                  </p>
                </div>
              </div>

            </motion.button>
          ))}
        </div>

      </div>
    </section>
  );
};
