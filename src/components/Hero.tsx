import React from 'react';
import { ArrowRight, Gamepad2, Send, CheckCircle2, Recycle, Compass, Sparkles } from 'lucide-react';
import { AnimatedContainersHero } from './AnimatedContainersHero';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20 px-4 sm:px-6">
      {/* Decorative blurred background orbs */}
      <div className="absolute top-8 left-1/3 w-80 h-80 bg-[#81C784]/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-4 right-1/4 w-96 h-96 bg-[#4A90E2]/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto text-center space-y-7">
        
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-950 text-sm font-extrabold uppercase tracking-wider shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
          <span>Aprende &bull; Separa &bull; Recicla &bull; Guía Ciudadana</span>
        </div>

        {/* Main Title */}
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-emerald-950 leading-[1.12] drop-shadow-sm">
          EcoGuía
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent ml-3">
            3R
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-emerald-950/85 max-w-3xl mx-auto font-medium leading-relaxed">
          Plataforma educativa para aprender a clasificar tus residuos correctamente según la normativa nacional colombiana. 
          Descubre qué materiales se aprovechan, cómo separar en cada contenedor y contribuye a un futuro más limpio y sostenible.
        </p>

        {/* Informative pills with larger typography and depth */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-1 text-sm font-bold text-emerald-900">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-200 shadow-md hover:shadow-lg transition-shadow">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            Resolución 2184 de Colombia
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-200 shadow-md hover:shadow-lg transition-shadow">
            <Recycle className="w-4 h-4 text-teal-600 shrink-0" />
            Economía Circular en el Hogar
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-300 shadow-md text-emerald-950">
            <Compass className="w-4 h-4 text-emerald-700 shrink-0" />
            Código Oficial de 3 Canecas
          </span>
        </div>

        {/* ================= IMAGEN ANIMADA DE LOS CONTENEDORES AL PRINCIPIO ================= */}
        <div className="pt-2">
          <AnimatedContainersHero />
        </div>

        {/* Actions with larger buttons and deeper shadows */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="#por-que-reciclar"
            className="btn-shine inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-extrabold text-base bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer"
          >
            <span>♻ Aprender a reciclar</span>
            <ArrowRight className="w-5 h-5" />
          </a>

          <a
            href="#juego"
            className="btn-shine inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-extrabold text-base bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer"
          >
            <Gamepad2 className="w-5 h-5" />
            <span>Juego interactivo</span>
          </a>

          <a
            href="#sugerencias"
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full font-bold text-base bg-white hover:bg-emerald-50 text-emerald-950 border border-emerald-300 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Send className="w-5 h-5 text-emerald-600" />
            <span>Buzón ciudadano</span>
          </a>
        </div>

        {/* Highlights banner with deep shadow */}
        <div className="pt-4 max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-emerald-50 via-white to-emerald-50 rounded-2xl p-4 border border-emerald-200/80 shadow-md flex items-center justify-center gap-3 text-sm text-emerald-950 font-semibold">
            <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Separar en la fuente ahorra agua, energía y dignifica la labor de los recicladores de oficio.</span>
          </div>
        </div>

      </div>
    </section>
  );
};
