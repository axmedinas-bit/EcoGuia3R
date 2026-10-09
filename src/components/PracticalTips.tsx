import React from 'react';
import { Sparkles, Minimize2, AlertOctagon } from 'lucide-react';

export const PracticalTips: React.FC = () => {
  return (
    <section id="consejos" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="max-w-3xl mb-14">
        <p className="text-sm font-extrabold uppercase tracking-wider text-emerald-800 mb-2.5">
          Hábitos diarios &bull; Paso a paso
        </p>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-emerald-950 tracking-tight">
          Tres consejos prácticos
        </h2>
        <p className="text-emerald-950/85 text-base sm:text-xl mt-4 leading-relaxed font-normal">
          Reciclar no tiene por qué ser complicado. Integrar estas tres acciones en tu rutina diaria
          hace que el material llegue en perfectas condiciones y no termine contaminando otros residuos.
        </p>
      </div>

      {/* 3 Main Tips in Large Cards with deeper shadows */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
        
        {/* Tip 1 */}
        <div className="bg-white rounded-3xl p-8 border border-emerald-200/90 shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-6 right-6 text-5xl font-display font-black text-emerald-100 group-hover:text-emerald-200 transition-colors">
            01
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-6 shadow-sm">
            <Sparkles className="w-7 h-7" />
          </div>
          <h3 className="font-display font-bold text-2xl text-emerald-950 mb-3.5">
            Enjuaga y vacía
          </h3>
          <p className="text-emerald-950/85 text-base leading-relaxed">
            Quita los restos de comida, salsas o lácteos de los envases antes de guardarlos. 
            No necesitas usar jabón; basta con una pequeña cantidad de agua para eliminar residuos y evitar malos olores e insectos.
          </p>
        </div>

        {/* Tip 2 */}
        <div className="bg-white rounded-3xl p-8 border border-sky-200/90 shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-6 right-6 text-5xl font-display font-black text-sky-100 group-hover:text-sky-200 transition-colors">
            02
          </div>
          <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center mb-6 shadow-sm">
            <Minimize2 className="w-7 h-7" />
          </div>
          <h3 className="font-display font-bold text-2xl text-emerald-950 mb-3.5">
            Aplasta y compacta
          </h3>
          <p className="text-emerald-950/85 text-base leading-relaxed">
            Aplasta botellas plásticas, cajas de cartón y latas de aluminio. 
            Al compactar reduces hasta un 70% del volumen ocupado en casa y facilitas el transporte para los recicladores de oficio.
          </p>
        </div>

        {/* Tip 3 */}
        <div className="bg-white rounded-3xl p-8 border border-amber-200/90 shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-6 right-6 text-5xl font-display font-black text-amber-100 group-hover:text-amber-200 transition-colors">
            03
          </div>
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-6 shadow-sm">
            <AlertOctagon className="w-7 h-7" />
          </div>
          <h3 className="font-display font-bold text-2xl text-emerald-950 mb-3.5">
            No mezcles con comida
          </h3>
          <p className="text-emerald-950/85 text-base leading-relaxed">
            Un solo envase sucio o mojado puede arruinar un lote completo de papel o cartón seco. 
            Mantén los residuos aprovechables estrictamente separados de restos orgánicos húmedos.
          </p>
        </div>

      </div>

      {/* Checklist banner with deep shadow */}
      <div className="bg-gradient-to-r from-emerald-900 to-[#1B4332] text-white rounded-3xl p-8 sm:p-10 shadow-elevation-3 flex flex-col md:flex-row items-center justify-between gap-7 border border-emerald-700/50">
        <div className="space-y-3 text-center md:text-left">
          <span className="text-sm font-extrabold uppercase tracking-wider text-[#CFEF9D] bg-white/10 px-4 py-1.5 rounded-full border border-white/20 shadow-xs">
            Buenas prácticas en el hogar
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold">
            ¿Listo para empezar hoy mismo?
          </h3>
          <p className="text-base text-emerald-100/90 max-w-xl leading-relaxed">
            Asigna un espacio en tu cocina con dos recipientes o bolsas: una blanca para reciclaje limpio y seco, y otra negra para residuos ordinarios. ¡Es el primer gran paso hacia la sostenibilidad!
          </p>
        </div>
        <a
          href="#sugerencias"
          className="shrink-0 px-8 py-4 rounded-full bg-[#CFEF9D] hover:bg-[#b5e670] text-[#145A32] font-extrabold text-base shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer"
        >
          Dejar una sugerencia
        </a>
      </div>
    </section>
  );
};
