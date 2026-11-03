import React, { useState } from 'react';
import { 
  X, 
  PlusCircle, 
  Building2, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  UploadCloud,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { OfferType, PropertyType } from '../types/property';
import { CITIES_LIST } from '../data/properties';

interface PublishListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessListing?: (newListing: any) => void;
}

export const PublishListingModal: React.FC<PublishListingModalProps> = ({
  isOpen,
  onClose,
  onSuccessListing,
}) => {
  const [step, setStep] = useState<number>(1);
  const [offerType, setOfferType] = useState<OfferType>('prodaja');
  const [propertyType, setPropertyType] = useState<PropertyType>('stan');
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('Sarajevo');
  const [neighborhood, setNeighborhood] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [area, setArea] = useState('');
  const [rooms, setRooms] = useState('3');
  const [bathrooms, setBathrooms] = useState('1');
  const [description, setDescription] = useState('');
  const [hasParking, setHasParking] = useState(false);
  const [hasBalcony, setHasBalcony] = useState(false);
  const [hasElevator, setHasElevator] = useState(false);
  const [isFurnished, setIsFurnished] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleNext = () => {
    setErrorMsg('');
    if (step === 1) {
      if (!title.trim()) {
        setErrorMsg('Molimo unesite naslov oglasa.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!price || Number(price) <= 0) {
        setErrorMsg('Molimo unesite ispravnu cijenu u KM.');
        return;
      }
      if (!area || Number(area) <= 0) {
        setErrorMsg('Molimo unesite površinu u m².');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!description.trim()) {
        setErrorMsg('Molimo unesite barem kratak opis nekretnine.');
        return;
      }
      setStep(4);
    } else if (step === 4) {
      if (!contactName.trim() || !contactPhone.trim()) {
        setErrorMsg('Molimo unesite vaše ime i kontakt telefon.');
        return;
      }
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setStep(1);
    setTitle('');
    setNeighborhood('');
    setAddress('');
    setPrice('');
    setArea('');
    setDescription('');
    setContactName('');
    setContactPhone('');
    setContactEmail('');
    setIsFinished(false);
    setErrorMsg('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleReset}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="px-6 py-4 bg-[#14243B] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-[#C5A46D]" />
            <h2 className="font-extrabold text-base tracking-tight">
              Objava nekretnine na DINO PLUS
            </h2>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 text-white/70 hover:text-white rounded-lg cursor-pointer"
            aria-label="Zatvori modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step indicator (if not finished) */}
        {!isFinished && (
          <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500 font-semibold">
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                step >= 1 ? 'bg-[#14243B] text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                1
              </span>
              <span className={step === 1 ? 'text-[#14243B] font-bold' : ''}>Osnovno</span>
            </div>

            <span className="text-slate-300">→</span>

            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                step >= 2 ? 'bg-[#14243B] text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                2
              </span>
              <span className={step === 2 ? 'text-[#14243B] font-bold' : ''}>Lokacija i cijena</span>
            </div>

            <span className="text-slate-300">→</span>

            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                step >= 3 ? 'bg-[#14243B] text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                3
              </span>
              <span className={step === 3 ? 'text-[#14243B] font-bold' : ''}>Detalji</span>
            </div>

            <span className="text-slate-300">→</span>

            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                step >= 4 ? 'bg-[#14243B] text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                4
              </span>
              <span className={step === 4 ? 'text-[#14243B] font-bold' : ''}>Kontakt</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {errorMsg && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {isFinished ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-extrabold text-[#14243B]">
                Vaš oglas je uspješno kreiran (Demonstracija)!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Nekretnina <strong>"{title}"</strong> ({city}, {price} KM) je pripremljena za objavu. U ovoj demonstracionoj verziji podaci su validirani i evidentirani u sesiji.
              </p>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl max-w-sm mx-auto text-xs text-left space-y-1.5">
                <div><span className="font-semibold text-slate-500">ID oglasa:</span> <span className="font-mono font-bold text-slate-800">DP-BIH-{Math.floor(100000 + Math.random() * 900000)}</span></div>
                <div><span className="font-semibold text-slate-500">Ponuda:</span> <span className="capitalize text-slate-800">{offerType}</span></div>
                <div><span className="font-semibold text-slate-500">Oglašivač:</span> <span className="text-slate-800">{contactName} ({contactPhone})</span></div>
              </div>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 bg-[#14243B] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#1d3353] cursor-pointer"
                >
                  U redu, zatvori obrazac
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Step 1: Osnovno */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Vrsta ponude
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setOfferType('prodaja')}
                        className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                          offerType === 'prodaja'
                            ? 'bg-[#14243B] text-white border-[#14243B]'
                            : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        Prodaja
                      </button>
                      <button
                        type="button"
                        onClick={() => setOfferType('iznajmljivanje')}
                        className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                          offerType === 'iznajmljivanje'
                            ? 'bg-[#14243B] text-white border-[#14243B]'
                            : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        Iznajmljivanje
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Vrsta nekretnine
                    </label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                      className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#14243B] cursor-pointer"
                    >
                      <option value="stan">Stan</option>
                      <option value="kuca">Kuća</option>
                      <option value="zemljiste">Zemljište</option>
                      <option value="poslovni">Poslovni prostor</option>
                      <option value="vikendica">Vikendica</option>
                      <option value="turisticka">Turistička nekretnina</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Naslov oglasa <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="npr. Dvosoban namješten stan u Novom Sarajevu sa balkonom"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#14243B]"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Lokacija i cijena */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Grad u BiH
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#14243B] cursor-pointer"
                      >
                        {CITIES_LIST.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Naselje / Područje
                      </label>
                      <input
                        type="text"
                        placeholder="npr. Centar, Novo Sarajevo, Borik..."
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#14243B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Ulica i broj (opcionalno)
                    </label>
                    <input
                      type="text"
                      placeholder="npr. Maršala Tita 12"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#14243B]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Cijena u Konvertibilnim markama (KM) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="number"
                        placeholder="npr. 250000"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#14243B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Kvadratura (m²) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="number"
                        placeholder="npr. 65"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#14243B]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Karakteristike */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Broj soba
                      </label>
                      <select
                        value={rooms}
                        onChange={(e) => setRooms(e.target.value)}
                        className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                      >
                        <option value="1">1 soba (Garsonjera)</option>
                        <option value="2">2 sobe</option>
                        <option value="3">3 sobe</option>
                        <option value="4">4 sobe</option>
                        <option value="5">5+ soba</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Broj kupatila
                      </label>
                      <select
                        value={bathrooms}
                        onChange={(e) => setBathrooms(e.target.value)}
                        className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                      >
                        <option value="1">1 kupatilo</option>
                        <option value="2">2 kupatila</option>
                        <option value="3">3+ kupatila</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Pogodnosti
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hasParking}
                          onChange={(e) => setHasParking(e.target.checked)}
                          className="w-4 h-4 rounded text-[#14243B]"
                        />
                        <span>Parking / Garaža</span>
                      </label>

                      <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hasBalcony}
                          onChange={(e) => setHasBalcony(e.target.checked)}
                          className="w-4 h-4 rounded text-[#14243B]"
                        />
                        <span>Balkon / Terasa</span>
                      </label>

                      <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hasElevator}
                          onChange={(e) => setHasElevator(e.target.checked)}
                          className="w-4 h-4 rounded text-[#14243B]"
                        />
                        <span>Lift</span>
                      </label>

                      <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isFurnished}
                          onChange={(e) => setIsFurnished(e.target.checked)}
                          className="w-4 h-4 rounded text-[#14243B]"
                        />
                        <span>Namješteno</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Opis nekretnine <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Detaljno opišite prostor, stanje, raspored prostorija, vrstu grijanja..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#14243B] resize-none"
                    />
                  </div>

                  <div className="p-3 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-center">
                    <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                    <span className="text-xs font-semibold text-slate-700 block">Fotografije nekretnine</span>
                    <span className="text-[11px] text-slate-400">U demonstraciji se automatski dodjeljuju visoko-rezolutne fotografije.</span>
                  </div>
                </div>
              )}

              {/* Step 4: Kontakt */}
              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Ime i prezime ili naziv agencije <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="npr. Haris Mehić"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#14243B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Broj telefona <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="npr. +387 61 123 456"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#14243B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      E-mail adresa
                    </label>
                    <input
                      type="email"
                      placeholder="npr. haris@email.ba"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#14243B]"
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Navigation */}
        {!isFinished && (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Prethodni korak</span>
              </button>
            ) : <div />}

            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 bg-[#14243B] hover:bg-[#1d3353] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer border border-[#C5A46D]/40"
            >
              <span>{step === 4 ? 'Objavi oglas' : 'Nastavi'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C5A46D]" />
            </button>
          </div>
        )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
