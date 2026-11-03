import React from 'react';
import { 
  Building2, 
  Home, 
  Trees, 
  Briefcase, 
  Tent, 
  Compass, 
  ArrowRight 
} from 'lucide-react';
import { motion } from 'motion/react';
import { PropertyType } from '../types/property';
import { APARTMENT_IMAGE, VILLA_IMAGE, HERO_IMAGE, SARAJEVO_IMAGE } from '../data/properties';

interface CategoriesSectionProps {
  onSelectCategory: (category: PropertyType) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onSelectCategory,
}) => {
  const categories: Array<{
    id: PropertyType;
    name: string;
    description: string;
    count: string;
    image: string;
    icon: React.ReactNode;
  }> = [
    {
      id: 'stan',
      name: 'Stanovi',
      description: 'Garsonjere, moderni dvoiposobni i trosobni stanovi, te ekskluzivni penthouse apartmani u gradskim centrima.',
      count: '8 dostupnih oglasa',
      image: APARTMENT_IMAGE,
      icon: <Building2 className="w-5 h-5 text-[#C5A46D]" />,
    },
    {
      id: 'kuca',
      name: 'Kuće',
      description: 'Porodične kuće, savremene vile sa bazenima, dvojni objekti i kuće u mirnim rezidencijalnim naseljima.',
      count: '5 dostupnih oglasa',
      image: VILLA_IMAGE,
      icon: <Home className="w-5 h-5 text-[#C5A46D]" />,
    },
    {
      id: 'zemljiste',
      name: 'Zemljišta',
      description: 'Građevinske parcele sa pristupnim putevima i komunalijama, te poljoprivredna i investiciona zemljišta.',
      count: '2 dostupna oglasa',
      image: HERO_IMAGE,
      icon: <Trees className="w-5 h-5 text-[#C5A46D]" />,
    },
    {
      id: 'poslovni',
      name: 'Poslovni prostori',
      description: 'Reprezentativni uredi, ulični lokali, logističke hale i prostori prilagođeni modernom poslovanju.',
      count: '3 dostupna oglasa',
      image: SARAJEVO_IMAGE,
      icon: <Briefcase className="w-5 h-5 text-[#C5A46D]" />,
    },
    {
      id: 'vikendica',
      name: 'Vikendice',
      description: 'Planinske kolibe na olimpijskim planinama (Bjelašnica, Jahorina) i vikend kuće uz rijeke i jezera.',
      count: '2 dostupna oglasa',
      image: HERO_IMAGE,
      icon: <Tent className="w-5 h-5 text-[#C5A46D]" />,
    },
    {
      id: 'turisticka',
      name: 'Turističke nekretnine',
      description: 'Apartmani na moru u Neumu, nekretnine u starim historijskim jezgrama i objekti sa visokim prinosom od rentanja.',
      count: '1 dostupan oglas',
      image: VILLA_IMAGE,
      icon: <Compass className="w-5 h-5 text-[#C5A46D]" />,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: '-40px 0px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="text-xs font-bold text-[#C5A46D] uppercase tracking-wider mb-2">
            Tipovi nekretnina
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14243B] tracking-tight">
            Istražite nekretnine po kategorijama
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Bilo da kupujete prvi stan, tražite porodičnu kuću ili poslovni prostor za širenje kompanije.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
              whileHover={{ y: -6 }}
              onClick={() => onSelectCategory(cat.id)}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-shadow duration-300 flex flex-col cursor-pointer"
            >
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-2 text-white">
                  <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md">
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg leading-none">{cat.name}</h3>
                    <span className="text-[11px] text-slate-200 mt-0.5 block">{cat.count}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 flex flex-col justify-between flex-1">
                <p className="text-xs text-slate-600 leading-relaxed">
                  {cat.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#14243B] group-hover:text-[#C5A46D] transition-colors">
                  <span>Pregledaj kategoriju</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
