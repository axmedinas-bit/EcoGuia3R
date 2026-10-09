import React from 'react';
import { Trash2, Trees, Droplets, Building2 } from 'lucide-react';

export const WhyRecycle: React.FC = () => {
  return (
    <section id="por-que-reciclar" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="max-w-3xl mb-14">
        <p className="text-sm font-extrabold uppercase tracking-wider text-emerald-800 mb-2.5">
          Educación ambiental &bull; Conciencia ciudadana
        </p>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-emerald-950 tracking-tight">
          ¿Por qué reciclar?
        </h2>
        <p className="text-emerald-950/85 text-base sm:text-xl mt-4 leading-relaxed font-normal">
          Cada día generamos muchísima basura, y buena parte de ella termina en rellenos sanitarios o
          contaminando ríos y calles. Reciclar permite darles una segunda vida a materiales como el papel,
          el plástico, el vidrio y el metal. Así se ahorran recursos naturales, se gasta menos energía en
          fabricar productos nuevos y se reduce la cantidad de residuos que se desechan.
        </p>
      </div>

      {/* 4 Cards Grid with deeper shadows and comfortable typography */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        
        {/* Card 1: Reducimos residuos */}
        <div className="bg-gradient-to-br from-white to-emerald-50/70 rounded-3xl p-7 border border-emerald-200/90 shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300 border-t-4 border-t-emerald-500 hover:-translate-y-2 group">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-sm">
            <Trash2 className="w-7 h-7" />
          </div>
          <h3 className="font-display font-bold text-xl text-emerald-950 mb-2.5">
            Reducimos residuos
          </h3>
          <p className="text-emerald-950/80 text-base leading-relaxed">
            Separar bien evita que toneladas de materiales útiles terminen saturando los rellenos sanitarios.
          </p>
        </div>

        {/* Card 2: Protegemos el medio ambiente */}
        <div className="bg-gradient-to-br from-white to-teal-50/70 rounded-3xl p-7 border border-teal-200/90 shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300 border-t-4 border-t-teal-500 hover:-translate-y-2 group">
          <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-sm">
            <Trees className="w-7 h-7" />
          </div>
          <h3 className="font-display font-bold text-xl text-emerald-950 mb-2.5">
            Protegemos el entorno
          </h3>
          <p className="text-emerald-950/80 text-base leading-relaxed">
            Menos residuos arrojados de manera inapropiada significa suelos, quebradas, ríos y aire más limpios.
          </p>
        </div>

        {/* Card 3: Ahorramos recursos */}
        <div className="bg-gradient-to-br from-white to-sky-50/70 rounded-3xl p-7 border border-sky-200/90 shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300 border-t-4 border-t-sky-500 hover:-translate-y-2 group">
          <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-sm">
            <Droplets className="w-7 h-7" />
          </div>
          <h3 className="font-display font-bold text-xl text-emerald-950 mb-2.5">
            Ahorramos recursos
          </h3>
          <p className="text-emerald-950/80 text-base leading-relaxed">
            Reutilizar materiales reduce notablemente el consumo de agua, combustibles y tala de árboles.
          </p>
        </div>

        {/* Card 4: Ciudades más sostenibles */}
        <div className="bg-gradient-to-br from-white to-amber-50/70 rounded-3xl p-7 border border-amber-200/90 shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300 border-t-4 border-t-amber-500 hover:-translate-y-2 group">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-sm">
            <Building2 className="w-7 h-7" />
          </div>
          <h3 className="font-display font-bold text-xl text-emerald-950 mb-2.5">
            Ciudades sostenibles
          </h3>
          <p className="text-emerald-950/80 text-base leading-relaxed">
            La separación en el origen dignifica el trabajo de los recicladores de oficio y optimiza las rutas de aseo.
          </p>
        </div>

      </div>

      {/* Illustrated Cycle Banner with deep shadow */}
      <div className="mt-14 bg-gradient-to-r from-emerald-100/90 via-teal-100/80 to-emerald-100/90 rounded-3xl p-6 sm:p-8 border border-emerald-300/80 shadow-elevation-2 overflow-hidden">
        <div className="text-center mb-6">
          <span className="text-sm font-extrabold uppercase tracking-wider text-emerald-950 bg-white px-5 py-2 rounded-full border border-emerald-300 shadow-sm inline-flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
            Ciclo de aprovechamiento de los materiales
          </span>
        </div>
        <div className="w-full max-w-4xl mx-auto">
          <svg viewBox="0 0 900 190" className="w-full h-auto drop-shadow-sm" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="roadGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#455A64" />
                <stop offset="100%" stopColor="#263238" />
              </linearGradient>
              <linearGradient id="truckBodyGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#26A69A" />
                <stop offset="100%" stopColor="#00796B" />
              </linearGradient>
              <linearGradient id="truckCabGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFA726" />
                <stop offset="100%" stopColor="#F57C00" />
              </linearGradient>
              <linearGradient id="houseWallGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#E8F5E9" />
              </linearGradient>
              <linearGradient id="plantWallGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#E0F2F1" />
              </linearGradient>
            </defs>

            {/* Suelo y calle unificada (Grounded road for house, truck and eco-plant) */}
            <ellipse cx="450" cy="180" rx="430" ry="8" fill="#C5DDCB" opacity="0.6" />
            
            {/* Acera / Césped verde continuo */}
            <rect x="20" y="123" width="860" height="5" rx="2.5" fill="#A5D6A7" />

            {/* Carretera asfaltada continua donde circula el camión */}
            <rect x="160" y="126" width="560" height="20" rx="4" fill="url(#roadGrad)" />
            <line x1="175" y1="136" x2="705" y2="136" stroke="#FFD54F" strokeWidth="2.5" strokeDasharray="16 12" />

            {/* ================= ETAPA 1: HOGAR / ORIGEN ================= */}
            <g transform="translate(45, 0)">
              {/* Casa firme sobre la acera (Base en y=123, techo a y=28) */}
              {/* Fachada */}
              <rect x="25" y="62" width="76" height="61" rx="4" fill="url(#houseWallGrad)" stroke="#81C784" strokeWidth="2" />
              
              {/* Tejado de la casa */}
              <polygon points="63,26 108,63 18,63" fill="#4CAF50" stroke="#2E7D32" strokeWidth="2" />
              
              {/* Chimenea */}
              <rect x="85" y="34" width="10" height="18" fill="#E0E0E0" stroke="#BDBDBD" strokeWidth="1" />
              
              {/* Puerta */}
              <rect x="53" y="85" width="20" height="38" rx="3" fill="#2E7D32" />
              <circle cx="68" cy="104" r="2" fill="#FFF59D" />

              {/* Ventanas */}
              <rect x="32" y="74" width="16" height="16" rx="2" fill="#E3F2FD" stroke="#90CAF9" strokeWidth="1.2" />
              <line x1="40" y1="74" x2="40" y2="90" stroke="#90CAF9" strokeWidth="1" />
              <line x1="32" y1="82" x2="48" y2="82" stroke="#90CAF9" strokeWidth="1" />

              <rect x="78" y="74" width="16" height="16" rx="2" fill="#E3F2FD" stroke="#90CAF9" strokeWidth="1.2" />
              <line x1="86" y1="74" x2="86" y2="90" stroke="#90CAF9" strokeWidth="1" />
              <line x1="78" y1="82" x2="94" y2="82" stroke="#90CAF9" strokeWidth="1" />

              {/* Canecas en la entrada del hogar para separación */}
              <rect x="105" y="103" width="9" height="20" rx="2" fill="#4CAF50" />
              <rect x="116" y="103" width="9" height="20" rx="2" fill="#FFFFFF" stroke="#81C784" strokeWidth="1" />
              <rect x="127" y="103" width="9" height="20" rx="2" fill="#263238" />

              {/* Rótulo de la etapa 1 */}
              <circle cx="63" cy="154" r="10" fill="#4CAF50" />
              <text x="63" y="158" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800">1</text>
              <text x="63" y="174" textAnchor="middle" fill="#145A32" fontSize="12" fontWeight="800" fontFamily="sans-serif">
                HOGAR (SEPARACIÓN)
              </text>
            </g>

            {/* Flecha Curva de Flujo 1 (Desde el hogar hacia el camión) */}
            <path className="anim-dash-flow" d="M 185 68 C 260 22, 335 22, 395 68" stroke="#4CAF50" strokeWidth="3" fill="none" strokeDasharray="6 6" />
            <polygon points="390,58 406,69 388,76" fill="#4CAF50" />

            {/* ================= ETAPA 2: CAMIÓN DE RECOLECCIÓN ================= */}
            {/* El camión está posicionado en la calle, con las ruedas sobre el asfalto (y=136) y su techo a y=78, debajo del techo de la casa */}
            <g transform="translate(390, 74)" className="anim-truck-bob">
              {/* Sombra de ruedas sobre el asfalto */}
              <ellipse cx="62" cy="62" rx="58" ry="4" fill="#000000" opacity="0.35" />

              {/* Caja compactadora de reciclaje */}
              <rect x="0" y="8" width="78" height="44" rx="6" fill="url(#truckBodyGrad)" stroke="#004D40" strokeWidth="2" />
              
              {/* Moldura superior de la caja */}
              <path d="M0 14 Q39 6 78 14 L78 20 L0 20 Z" fill="#00897B" />

              {/* Emblema con símbolo de reciclaje */}
              <circle cx="39" cy="31" r="14" fill="#FFFFFF" stroke="#80CBC4" strokeWidth="1.5" />
              <text x="39" y="37" textAnchor="middle" fontSize="18" fill="#00796B" fontWeight="bold">♻</text>

              {/* Cinta reflectiva trasera */}
              <rect x="-3" y="24" width="3" height="22" rx="1" fill="#FFC107" />

              {/* Cabina delantera del camión */}
              <rect x="78" y="18" width="38" height="34" rx="5" fill="url(#truckCabGrad)" stroke="#E65100" strokeWidth="1.5" />
              
              {/* Parabrisas y ventana */}
              <path d="M82 22 L105 22 C109 22 112 25 112 29 L112 35 L82 35 Z" fill="#E1F5FE" stroke="#0288D1" strokeWidth="1" />
              
              {/* Línea de puerta y manija */}
              <line x1="94" y1="35" x2="94" y2="52" stroke="#E65100" strokeWidth="1" />
              <rect x="91" y="41" width="4" height="2" rx="0.5" fill="#FFFFFF" />

              {/* Faros delanteros */}
              <rect x="113" y="40" width="3" height="7" rx="1" fill="#FFF59D" />
              <rect x="111" y="47" width="5" height="5" rx="1" fill="#455A64" />

              {/* Ruedas apoyadas exactamente en el pavimento (centro en cy=53, radio 10 -> base en y=63) */}
              {/* Rueda trasera 1 */}
              <circle cx="20" cy="53" r="10" fill="#263238" stroke="#102027" strokeWidth="1.5" />
              <circle cx="20" cy="53" r="5" fill="#CFD8DC" />

              {/* Rueda trasera 2 */}
              <circle cx="44" cy="53" r="10" fill="#263238" stroke="#102027" strokeWidth="1.5" />
              <circle cx="44" cy="53" r="5" fill="#CFD8DC" />

              {/* Rueda delantera */}
              <circle cx="98" cy="53" r="10" fill="#263238" stroke="#102027" strokeWidth="1.5" />
              <circle cx="98" cy="53" r="5" fill="#CFD8DC" />

              {/* Rótulo de la etapa 2 */}
              <circle cx="58" cy="80" r="10" fill="#26A69A" />
              <text x="58" y="84" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800">2</text>
              <text x="58" y="100" textAnchor="middle" fill="#145A32" fontSize="12" fontWeight="800" fontFamily="sans-serif">
                RECOLECCIÓN DIFERENCIADA
              </text>
            </g>

            {/* Flecha Curva de Flujo 2 (Desde el camión hacia la planta de reciclaje) */}
            <path className="anim-dash-flow" d="M 525 68 C 595 22, 665 22, 730 68" stroke="#4A90E2" strokeWidth="3" fill="none" strokeDasharray="6 6" />
            <polygon points="724,58 740,70 722,77" fill="#4A90E2" />

            {/* ================= ETAPA 3: PLANTA DE RECICLAJE & NUEVOS PRODUCTOS ================= */}
            <g transform="translate(735, 0)">
              {/* Edificio de transformación ecológica */}
              <rect x="0" y="60" width="66" height="63" rx="4" fill="url(#plantWallGrad)" stroke="#4CAF50" strokeWidth="2" />
              
              {/* Tejado eco con paneles solares */}
              <polygon points="-3,60 69,60 56,44 10,44" fill="#1B5E20" stroke="#0D3B13" strokeWidth="1.5" />
              <rect x="15" y="47" width="36" height="10" rx="1" fill="#1976D2" stroke="#90CAF9" strokeWidth="1" />

              {/* Portón de recepción y ventana */}
              <rect x="18" y="88" width="28" height="35" rx="2" fill="#2E7D32" />
              <line x1="32" y1="88" x2="32" y2="123" stroke="#81C784" strokeWidth="1" />

              {/* Insignia circular de economía circular */}
              <circle cx="33" cy="74" r="8" fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
              <text x="33" y="78" textAnchor="middle" fontSize="10">🌱</text>

              {/* Árbol y nuevos productos (símbolo de vida renovada) */}
              <rect x="80" y="82" width="11" height="41" rx="2" fill="#8D6E63" />
              <circle cx="85.5" cy="70" r="26" fill="#4CAF50" />
              <circle cx="72" cy="78" r="16" fill="#81C784" />
              <circle cx="99" cy="78" r="16" fill="#66BB6A" />
              <circle cx="82" cy="63" r="3" fill="#E53935" />
              <circle cx="92" cy="69" r="3" fill="#E53935" />

              {/* Rótulo de la etapa 3 */}
              <circle cx="48" cy="154" r="10" fill="#4A90E2" />
              <text x="48" y="158" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800">3</text>
              <text x="48" y="174" textAnchor="middle" fill="#145A32" fontSize="12" fontWeight="800" fontFamily="sans-serif">
                NUEVOS PRODUCTOS
              </text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
};
