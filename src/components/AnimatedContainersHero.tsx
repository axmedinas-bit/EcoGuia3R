import React, { useState } from 'react';
import { Sparkles, CheckCircle2, RotateCw } from 'lucide-react';

export const AnimatedContainersHero: React.FC = () => {
  const [activeBin, setActiveBin] = useState<'verde' | 'blanco' | 'negro' | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto my-7 px-2 select-none">
      {/* Outer Card with layered deep shadows and ambient glow */}
      <div className="bg-gradient-to-b from-white/95 via-emerald-50/70 to-white/95 rounded-3xl p-6 sm:p-10 border-2 border-emerald-200/90 shadow-elevation-3 backdrop-blur-sm relative overflow-hidden">
        
        {/* Ambient background glow circles */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-emerald-300/25 rounded-full blur-3xl pointer-events-none anim-aura" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-sky-300/20 rounded-full blur-3xl pointer-events-none anim-aura" style={{ animationDelay: '1.5s' }} />

        {/* Floating background decorative leaves */}
        <div className="absolute top-4 left-6 text-xl opacity-30 select-none pointer-events-none" style={{ animation: 'leafDrift 6s ease-in-out infinite' }}>
          🍃
        </div>
        <div className="absolute top-10 right-8 text-xl opacity-30 select-none pointer-events-none" style={{ animation: 'leafDrift 7s ease-in-out infinite 1s' }}>
          🌿
        </div>

        {/* Top badge with animated rotating icon */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-950 font-extrabold text-xs sm:text-sm border border-emerald-300 shadow-sm hover:scale-105 transition-transform">
            <RotateCw className="w-4 h-4 text-emerald-600 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Código de Colores de Separación en la Fuente</span>
          </span>
        </div>

        {/* The 3 Animated Containers Stage */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 items-end justify-items-center pt-6 pb-4">
          
          {/* ================= CONTENEDOR VERDE ================= */}
          <div 
            onMouseEnter={() => setActiveBin('verde')}
            onMouseLeave={() => setActiveBin(null)}
            className="w-full max-w-[240px] flex flex-col items-center cursor-pointer group"
          >
            {/* Floating waste items above bin */}
            <div className="h-14 flex items-center justify-center anim-item-hover">
              <span className="text-4xl filter drop-shadow-md group-hover:scale-125 transition-transform">
                🍌
              </span>
              <span className="text-3xl -ml-2 filter drop-shadow-md" style={{ animation: 'leafDrift 3.2s ease-in-out infinite' }}>
                🍃
              </span>
            </div>

            {/* Container Body (Animated SVG) */}
            <div className="relative w-full anim-bin-1 group-hover:-translate-y-2.5 transition-transform duration-300">
              <svg viewBox="0 0 160 210" className="w-full h-auto drop-shadow-xl group-hover:drop-shadow-2xl transition-all" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="heroGreenGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5FB878" />
                    <stop offset="35%" stopColor="#4CAF50" />
                    <stop offset="100%" stopColor="#2E7D32" />
                  </linearGradient>
                  <linearGradient id="heroGreenLid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#81C784" />
                    <stop offset="100%" stopColor="#1B5E20" />
                  </linearGradient>
                  <linearGradient id="greenRimShine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                    <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                  </linearGradient>
                </defs>

                {/* Ground shadow under bin */}
                <ellipse cx="80" cy="202" rx="60" ry="8" fill="#145A32" opacity="0.25" />

                {/* Handle on lid */}
                <rect x="62" y="10" width="36" height="14" rx="5" fill="#1B5E20" stroke="#81C784" strokeWidth="1.5" />

                {/* Lid top */}
                <rect x="18" y="22" width="124" height="26" rx="9" fill="url(#heroGreenLid)" filter="drop-shadow(0 3px 4px rgba(0,0,0,0.2))" />
                <rect x="24" y="24" width="112" height="4" rx="2" fill="url(#greenRimShine)" />

                {/* Bin tapered body */}
                <path d="M26,46 L34,192 C35,198 42,202 50,202 L110,202 C118,202 125,198 126,192 L134,46 Z" fill="url(#heroGreenGrad)" />

                {/* Subtle vertical stripes on body */}
                <path d="M48,56 L53,186 M80,56 L80,186 M112,56 L107,186" stroke="rgba(255,255,255,0.2)" strokeWidth="3" strokeLinecap="round" />

                {/* Front emblem badge */}
                <circle cx="80" cy="115" r="28" fill="#FFFFFF" opacity="0.95" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))" />
                <circle cx="80" cy="115" r="24" fill="#E8F5E9" />
                <text x="80" y="125" textAnchor="middle" fontSize="28">🍃</text>

                {/* Micro badge with adjusted proportional font size */}
                <rect x="42" y="158" width="76" height="18" rx="5" fill="#174D32" opacity="0.95" />
                <text x="80" y="170.5" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.6">
                  ORGÁNICO
                </text>
              </svg>
            </div>

            {/* Label Card with clear title visibility */}
            <div className={`mt-3.5 text-center transition-all duration-200 ${activeBin === 'verde' ? 'scale-105' : ''}`}>
              <h4 className="font-display font-extrabold text-lg sm:text-xl text-[#174D32] flex items-center justify-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#4CAF50] inline-block shadow-xs" />
                Caneca Verde
              </h4>
              <p className="text-xs sm:text-sm font-bold text-emerald-900 mt-0.5">
                Orgánicos aprovechables
              </p>
              <p className="text-xs text-[#4A5A4E] mt-0.5 max-w-[200px]">
                Cáscaras, restos de frutas, verduras y café
              </p>
            </div>
          </div>

          {/* ================= CONTENEDOR BLANCO ================= */}
          <div 
            onMouseEnter={() => setActiveBin('blanco')}
            onMouseLeave={() => setActiveBin(null)}
            className="w-full max-w-[240px] flex flex-col items-center cursor-pointer group"
          >
            {/* Floating waste items above bin */}
            <div className="h-14 flex items-center justify-center anim-item-hover" style={{ animationDelay: '0.4s' }}>
              <span className="text-4xl filter drop-shadow-md group-hover:scale-125 transition-transform">
                🧴
              </span>
              <span className="text-3xl -ml-2 filter drop-shadow-md" style={{ animation: 'leafDrift 3.5s ease-in-out infinite' }}>
                📦
              </span>
            </div>

            {/* Container Body (Animated SVG) */}
            <div className="relative w-full anim-bin-2 group-hover:-translate-y-2.5 transition-transform duration-300">
              <svg viewBox="0 0 160 210" className="w-full h-auto drop-shadow-2xl group-hover:drop-shadow-3xl transition-all" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="heroWhiteGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="50%" stopColor="#F5FFF8" />
                    <stop offset="100%" stopColor="#CFEBDD" />
                  </linearGradient>
                  <linearGradient id="heroWhiteLid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#BFE3C8" />
                  </linearGradient>
                </defs>

                {/* Ground shadow under bin */}
                <ellipse cx="80" cy="202" rx="64" ry="9" fill="#145A32" opacity="0.3" />

                {/* Handle on lid */}
                <rect x="62" y="10" width="36" height="14" rx="5" fill="#A5D6A7" stroke="#2E7D32" strokeWidth="1.5" />

                {/* Lid top */}
                <rect x="18" y="22" width="124" height="26" rx="9" fill="url(#heroWhiteLid)" stroke="#81C784" strokeWidth="2.5" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.15))" />
                <rect x="24" y="24" width="112" height="4" rx="2" fill="rgba(255,255,255,0.9)" />

                {/* Bin tapered body */}
                <path d="M26,46 L34,192 C35,198 42,202 50,202 L110,202 C118,202 125,198 126,192 L134,46 Z" fill="url(#heroWhiteGrad)" stroke="#81C784" strokeWidth="2.5" />

                {/* Stripes */}
                <path d="M48,56 L53,186 M80,56 L80,186 M112,56 L107,186" stroke="rgba(129,199,132,0.3)" strokeWidth="3" strokeLinecap="round" />

                {/* Front emblem badge */}
                <circle cx="80" cy="115" r="29" fill="#FFFFFF" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))" stroke="#81C784" strokeWidth="2" />
                <circle cx="80" cy="115" r="24" fill="#E8F5E9" />
                <text x="80" y="125" textAnchor="middle" fontSize="30">♻</text>

                {/* Micro badge with adjusted proportional font size */}
                <rect x="38" y="158" width="84" height="18" rx="5" fill="#2E7D32" opacity="0.95" />
                <text x="80" y="170.5" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.6">
                  RECICLABLE
                </text>
              </svg>
            </div>

            {/* Label Card with clear title visibility */}
            <div className={`mt-3.5 text-center transition-all duration-200 ${activeBin === 'blanco' ? 'scale-105' : ''}`}>
              <h4 className="font-display font-extrabold text-lg sm:text-xl text-[#1F2E24] flex items-center justify-center gap-2">
                <span className="w-3 h-3 rounded-full bg-white border-2 border-slate-400 inline-block shadow-xs" />
                Caneca Blanca
              </h4>
              <p className="text-xs sm:text-sm font-bold text-emerald-900 mt-0.5">
                Residuos aprovechables
              </p>
              <p className="text-xs text-[#4A5A4E] mt-0.5 max-w-[200px]">
                Plástico, botellas, cartón, papel, vidrio y metal
              </p>
            </div>
          </div>

          {/* ================= CONTENEDOR NEGRO ================= */}
          <div 
            onMouseEnter={() => setActiveBin('negro')}
            onMouseLeave={() => setActiveBin(null)}
            className="w-full max-w-[240px] flex flex-col items-center cursor-pointer group"
          >
            {/* Floating waste items above bin */}
            <div className="h-14 flex items-center justify-center anim-item-hover" style={{ animationDelay: '0.8s' }}>
              <span className="text-4xl filter drop-shadow-md group-hover:scale-125 transition-transform">
                🧻
              </span>
              <span className="text-3xl -ml-2 filter drop-shadow-md" style={{ animation: 'leafDrift 2.8s ease-in-out infinite' }}>
                🍿
              </span>
            </div>

            {/* Container Body (Animated SVG) */}
            <div className="relative w-full anim-bin-3 group-hover:-translate-y-2.5 transition-transform duration-300">
              <svg viewBox="0 0 160 210" className="w-full h-auto drop-shadow-xl group-hover:drop-shadow-2xl transition-all" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="heroBlackGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#455A64" />
                    <stop offset="40%" stopColor="#37474F" />
                    <stop offset="100%" stopColor="#212121" />
                  </linearGradient>
                  <linearGradient id="heroBlackLid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#546E7A" />
                    <stop offset="100%" stopColor="#263238" />
                  </linearGradient>
                </defs>

                {/* Ground shadow under bin */}
                <ellipse cx="80" cy="202" rx="60" ry="8" fill="#145A32" opacity="0.25" />

                {/* Handle on lid */}
                <rect x="62" y="10" width="36" height="14" rx="5" fill="#212121" stroke="#78909C" strokeWidth="1.5" />

                {/* Lid top */}
                <rect x="18" y="22" width="124" height="26" rx="9" fill="url(#heroBlackLid)" filter="drop-shadow(0 3px 4px rgba(0,0,0,0.3))" />
                <rect x="24" y="24" width="112" height="4" rx="2" fill="rgba(255,255,255,0.2)" />

                {/* Bin tapered body */}
                <path d="M26,46 L34,192 C35,198 42,202 50,202 L110,202 C118,202 125,198 126,192 L134,46 Z" fill="url(#heroBlackGrad)" />

                {/* Stripes */}
                <path d="M48,56 L53,186 M80,56 L80,186 M112,56 L107,186" stroke="rgba(255,255,255,0.08)" strokeWidth="3" strokeLinecap="round" />

                {/* Front emblem badge */}
                <circle cx="80" cy="115" r="28" fill="#FFFFFF" opacity="0.9" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.2))" />
                <circle cx="80" cy="115" r="24" fill="#ECEFF1" />
                <text x="80" y="125" textAnchor="middle" fontSize="28">🧻</text>

                {/* Micro badge with adjusted proportional font size */}
                <rect x="36" y="158" width="88" height="18" rx="5" fill="#1B1B1B" opacity="0.95" />
                <text x="80" y="170.5" textAnchor="middle" fill="#FFFFFF" fontSize="8.2" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.5">
                  NO RECICLABLE
                </text>
              </svg>
            </div>

            {/* Label Card with clear title visibility */}
            <div className={`mt-3.5 text-center transition-all duration-200 ${activeBin === 'negro' ? 'scale-105' : ''}`}>
              <h4 className="font-display font-extrabold text-lg sm:text-xl text-zinc-900 flex items-center justify-center gap-2">
                <span className="w-3 h-3 rounded-full bg-zinc-800 inline-block shadow-xs" />
                Caneca Negra
              </h4>
              <p className="text-xs sm:text-sm font-bold text-zinc-800 mt-0.5">
                Residuos no aprovechables
              </p>
              <p className="text-xs text-[#4A5A4E] mt-0.5 max-w-[200px]">
                Papel higiénico, servilletas y envolturas sucias
              </p>
            </div>
          </div>

        </div>

        {/* Platform base bar with shadow and micro-interaction */}
        <div className="mt-5 pt-4 border-t border-emerald-200/80 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-emerald-950 font-semibold text-center">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 animate-pulse" />
            <span>Pasa el cursor o toca cada contenedor para ver sus características y residuos correspondientes</span>
          </span>
        </div>

      </div>
    </div>
  );
};
