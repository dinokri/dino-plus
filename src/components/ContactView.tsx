import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building2, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { ContactFormData } from '../types/property';
import { ScrollReveal } from './ScrollReveal';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const errs: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Ime i prezime je obavezno polje.';
    }

    if (!formData.email.trim()) {
      errs.email = 'E-mail adresa je obavezno polje.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Unesite ispravnu e-mail adresu (npr. korisnik@domena.ba).';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Broj telefona je obavezno polje.';
    }

    if (!formData.subject.trim()) {
      errs.subject = 'Predmet poruke je obavezno polje.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Poruka mora sadržavati najmanje 10 znakova.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitted(true);
    // As instructed by prompt: "Klikom na dugme „Pošalji poruku“ prikaži odgovarajuću demonstracionu potvrdu slanja. Nemoj tvrditi da je poruka stvarno poslana na server."
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <ScrollReveal direction="up" yOffset={25} amount={0.2} className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[#C5A46D] text-xs font-bold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5 text-[#14243B]" />
            <span>Korisnička podrška</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#14243B] tracking-tight">
            Tu smo za vas.
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Imate pitanje vezano za oglašavanje, saradnju ili pretragu nekretnina? Naš tim vam stoji na raspolaganju.
          </p>
        </ScrollReveal>

        {/* Contact Grid: Form on Left, Offices & Info on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Form Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-bold text-[#14243B] mb-2">
              Pošaljite nam poruku
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Ispunite kontakt formu u nastavku i dobit ćete odgovor u najkraćem mogućem roku.
            </p>

            {isSubmitted ? (
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-4 animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-extrabold text-[#14243B]">
                  Potvrda unosa poruke (Demonstracioni mod)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Vaša poruka pod nazivom <strong>"{formData.subject}"</strong> je uspješno evidentirana u korisničkom interfejsu. Napomena: U ovoj demonstracionoj verziji podaci se obrađuju lokalno na klijentu bez slanja na stvarni eksterni server.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-5 py-2.5 bg-[#14243B] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#1d3353] cursor-pointer"
                  >
                    Pošalji novu poruku
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                
                {/* Ime i prezime */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ime i prezime <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="npr. Emir Hadžić"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full h-11 px-3.5 bg-slate-50 border rounded-xl text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:bg-white transition-all ${
                      errors.fullName ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-[#14243B]'
                    }`}
                  />
                  {errors.fullName && (
                    <span className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3" />
                      {errors.fullName}
                    </span>
                  )}
                </div>

                {/* Email i Telefon */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      E-mail adresa <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="npr. emir@primjer.ba"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full h-11 px-3.5 bg-slate-50 border rounded-xl text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:bg-white transition-all ${
                        errors.email ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-[#14243B]'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Broj telefona <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="npr. +387 61 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full h-11 px-3.5 bg-slate-50 border rounded-xl text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:bg-white transition-all ${
                        errors.phone ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-[#14243B]'
                      }`}
                    />
                    {errors.phone && (
                      <span className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3" />
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                {/* Predmet poruke */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Predmet poruke <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="npr. Upit za oglašavanje nekretnine / Partnerska saradnja"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={`w-full h-11 px-3.5 bg-slate-50 border rounded-xl text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:bg-white transition-all ${
                      errors.subject ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-[#14243B]'
                    }`}
                  />
                  {errors.subject && (
                    <span className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3" />
                      {errors.subject}
                    </span>
                  )}
                </div>

                {/* Poruka */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Vaša poruka <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Unesite detalje vašeg upita ili pitanje..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full p-3 bg-slate-50 border rounded-xl text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:bg-white transition-all resize-none ${
                      errors.message ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-[#14243B]'
                    }`}
                  />
                  {errors.message && (
                    <span className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#14243B] hover:bg-[#1d3353] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#C5A46D]/40"
                  >
                    <Send className="w-4 h-4 text-[#C5A46D]" />
                    <span>Pošalji poruku</span>
                  </button>
                </div>

              </form>
            )}
          </div>

          {/* Contact Details & Office Locations Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Contacts Box */}
            <div className="bg-[#F5F6F8] rounded-3xl p-6 sm:p-8 border border-slate-200">
              <h3 className="font-bold text-base text-[#14243B] mb-5">
                Direktni kontakt podaci
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white text-[#C5A46D] shadow-2xs shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Centralna e-mail adresa:</span>
                    <span className="text-slate-800 font-bold text-sm">info@dinoplus.ba</span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">[kontakt pretinac platforme]</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white text-[#C5A46D] shadow-2xs shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Korisnička linija za BiH:</span>
                    <span className="text-slate-800 font-bold text-sm">+387 33 221 450</span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">[zamjenjivi demo podatak]</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white text-[#C5A46D] shadow-2xs shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Radno vrijeme podrške:</span>
                    <span className="text-slate-800 font-semibold">Ponedjeljak – Petak: 08:30 – 17:00 h</span>
                    <span className="text-slate-500 block">Subota: 09:00 – 14:00 h</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Regional Offices in BiH */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200">
              <h3 className="font-bold text-base text-[#14243B] mb-4">
                Regionalni centri u BiH
              </h3>

              <div className="space-y-4 text-xs">
                <div className="pb-3 border-b border-slate-100">
                  <div className="font-bold text-slate-900 flex items-center justify-between">
                    <span>Sarajevo (Glavni ured)</span>
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded">Centar</span>
                  </div>
                  <div className="text-slate-500 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A46D]" />
                    <span>Zmaja od Bosne bb, 71000 Sarajevo [demo lokacija]</span>
                  </div>
                </div>

                <div className="pb-3 border-b border-slate-100">
                  <div className="font-bold text-slate-900 flex items-center justify-between">
                    <span>Banja Luka</span>
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded">Krajina</span>
                  </div>
                  <div className="text-slate-500 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A46D]" />
                    <span>Kralja Petra I Karađorđevića, 78000 Banja Luka</span>
                  </div>
                </div>

                <div>
                  <div className="font-bold text-slate-900 flex items-center justify-between">
                    <span>Mostar</span>
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded">Hercegovina</span>
                  </div>
                  <div className="text-slate-500 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A46D]" />
                    <span>Kneza Branimira bb, 88000 Mostar</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
