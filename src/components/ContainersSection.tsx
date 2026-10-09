import React, { useState } from 'react';
import { ContenedorInfo } from '../types';
import { X, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

const CONTENEDORES_DATA: ContenedorInfo[] = [
  {
    id: 'verde',
    nombre: 'Contenedor Verde',
    color: '#2E7D32',
    colorClase: 'from-[#4CAF50] to-[#2E7D32]',
    subtitulo: 'Residuos orgánicos aprovechables',
    descripcion: 'Aquí van los residuos de origen biológico que se descomponen naturalmente y sirven para elaborar abono orgánico (compost) o generar biogás en plantas de tratamiento.',
    icono: '🍃',
    ejemplos: [
      'Cáscaras de frutas (banano, naranja, manzana, etc.)',
      'Restos de verduras crudas y ensaladas sin aderezos',
      'Borra o concho de café y bolsitas de té usadas',
      'Cáscaras de huevo trituradas',
      'Restos de poda de jardín, hojas secas y flores',
      'Semillas y cuescos de frutas',
    ],
  },
  {
    id: 'blanco',
    nombre: 'Contenedor Blanco',
    color: '#FFFFFF',
    colorClase: 'from-[#F7FFF9] to-[#CDE9D6]',
    subtitulo: 'Residuos aprovechables (Reciclaje)',
    descripcion: 'Materiales limpios y secos que pueden transformarse en nuevos productos industriales. Es la caneca principal que recolectan los recicladores de oficio.',
    icono: '🧴',
    ejemplos: [
      'Botellas y recipientes de plástico vacíos y aplastados',
      'Cajas de cartón corrugado limpias y dobladas',
      'Hojas de papel de archivo, cuadernos y periódicos',
      'Botellas y frascos de vidrio (sin tapas)',
      'Latas de aluminio y de conservas enjuagadas',
      'Envases Tetra Pak escurridos y aplanados',
    ],
  },
  {
    id: 'negro',
    nombre: 'Contenedor Negro',
    color: '#263238',
    colorClase: 'from-[#37474F] to-[#212121]',
    subtitulo: 'Residuos no aprovechables (Basura ordinaria)',
    descripcion: 'Materiales que no pueden reciclarse debido a su contaminación, grado de degradación o riesgo higiénico. Son transportados al relleno sanitario autorizado.',
    icono: '🧻',
    ejemplos: [
      'Papel higiénico y pañitos húmedos usados',
      'Servilletas de cocina usadas o engrasadas',
      'Papeles y cartones mojados o con grasa (caja de pizza sucia)',
      'Envolturas metalizadas de papas fritas y snacks mixtos',
      'Colillas de cigarrillo apagadas',
      'Tapabocas, guantes y curitas de uso doméstico',
    ],
  },
];

export const ContainersSection: React.FC = () => {
  const [selectedContainer, setSelectedContainer] = useState<ContenedorInfo | null>(null);

  return (
    <section id="contenedores" className="py-20 px-4 sm:px-6 bg-gradient-to-b from-emerald-50/70 via-emerald-100/50 to-emerald-50/70 border-y border-emerald-200/60">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <p className="text-sm font-extrabold uppercase tracking-wider text-emerald-800 mb-2.5">
            Resolución 2184 de 2019 &bull; Código unificado nacional
          </p>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-emerald-950 tracking-tight">
            ¿Cómo separar los residuos?
          </h2>
          <p className="text-emerald-950/85 text-base sm:text-xl mt-4 leading-relaxed font-normal">
            Colombia adoptó un código unificado de tres colores para estandarizar 
            el reciclaje en todo el país. Haz clic en cada contenedor para conocer sus características 
            y los residuos que le corresponden.
          </p>
        </div>

        {/* Rule Banner */}
        <div className="mb-12 inline-flex flex-wrap items-center gap-3.5 bg-white px-6 py-3.5 rounded-full border border-emerald-300 shadow-md text-sm sm:text-base text-emerald-950 font-bold">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <span>🌿 Regla de oro nacional:</span>
          <span className="text-emerald-800 font-extrabold uppercase tracking-wider bg-emerald-100/90 px-3 py-1 rounded-lg border border-emerald-200">
            Limpio, seco y separado
          </span>
        </div>

        {/* 3 Containers Cards Grid with deep shadows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CONTENEDORES_DATA.map((c) => {
            const isWhite = c.id === 'blanco';
            return (
              <button
                key={c.id}
                onClick={() => setSelectedContainer(c)}
                className={`text-left rounded-3xl p-8 sm:p-9 shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300 transform hover:-translate-y-2.5 relative overflow-hidden group cursor-pointer ${
                  c.id === 'verde'
                    ? 'bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] text-white border border-emerald-600'
                    : isWhite
                    ? 'bg-gradient-to-br from-[#FFFFFF] to-[#D5EBDC] text-emerald-950 border-2 border-emerald-300'
                    : 'bg-gradient-to-br from-[#37474F] to-[#1E272C] text-white border border-zinc-700'
                }`}
              >
                {/* Decorative background circle */}
                <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/10 pointer-events-none group-hover:scale-125 transition-transform" />

                {/* Container Icon illustration */}
                <div className="w-18 h-18 rounded-2xl bg-white/25 backdrop-blur-sm flex items-center justify-center text-4xl mb-6 shadow-md">
                  {c.icono}
                </div>

                <div className="space-y-3">
                  <h3 className={`font-display font-bold text-2xl sm:text-3xl ${isWhite ? 'text-emerald-950' : 'text-white'}`}>
                    {c.nombre}
                  </h3>
                  <p className={`text-base font-extrabold ${isWhite ? 'text-emerald-800' : 'text-emerald-200'}`}>
                    {c.subtitulo}
                  </p>
                  <p className={`text-sm sm:text-base line-clamp-3 mt-2 leading-relaxed ${isWhite ? 'text-emerald-950/80' : 'text-white/90'}`}>
                    {c.descripcion}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-white/20 flex items-center justify-between text-sm font-extrabold">
                  <span>Ver lista de ejemplos</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Hazard Note with deeper shadow */}
        <div className="mt-12 bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-7 flex items-start gap-4 text-sm sm:text-base text-amber-950 shadow-md">
          <AlertTriangle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Nota sobre residuos peligrosos (Contenedor Rojo / Posconsumo):</strong>{' '}
            Pilas, baterías, bombillos fluorescentes, medicamentos vencidos, aceites de cocina usados e insecticidas{' '}
            <em>nunca</em> deben depositarse en ninguna de estas tres canecas comunes. Deben llevarse a puntos de recolección posconsumo autorizados.
          </p>
        </div>

      </div>

      {/* Detail Modal */}
      {selectedContainer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm"
          onClick={() => setSelectedContainer(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-7 sm:p-9 shadow-2xl border border-emerald-200 relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedContainer(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-[#174D32] transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4 mb-5">
              <span className="text-4xl p-3 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-sm">
                {selectedContainer.icono}
              </span>
              <div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-emerald-950">
                  {selectedContainer.nombre}
                </h3>
                <p className="text-sm font-bold text-emerald-700">
                  {selectedContainer.subtitulo}
                </p>
              </div>
            </div>

            <p className="text-emerald-950/85 text-base leading-relaxed mb-6 font-normal">
              {selectedContainer.descripcion}
            </p>

            <h4 className="font-display font-bold text-base text-emerald-950 mb-3.5 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              ¿Qué residuos van en este contenedor?
            </h4>

            <ul className="space-y-2.5 mb-8">
              {selectedContainer.ejemplos.map((ej, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm sm:text-base text-emerald-950 bg-emerald-50/80 p-3 rounded-2xl border border-emerald-200 shadow-xs"
                >
                  <span className="text-emerald-700 font-extrabold text-base">•</span>
                  <span className="font-medium">{ej}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setSelectedContainer(null)}
              className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base shadow-lg transition-colors cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
