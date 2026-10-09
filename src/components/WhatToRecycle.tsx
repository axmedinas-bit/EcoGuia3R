import React from 'react';
import { FileText, Milk, Wine, Cog } from 'lucide-react';

export const WhatToRecycle: React.FC = () => {
  return (
    <section id="que-reciclar" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="max-w-3xl mb-14">
        <p className="text-sm font-extrabold uppercase tracking-wider text-emerald-800 mb-2.5">
          Clasificación de materiales aprovechables
        </p>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-emerald-950 tracking-tight">
          ¿Qué se puede reciclar?
        </h2>
        <p className="text-emerald-950/85 text-base sm:text-xl mt-4 leading-relaxed font-normal">
          Los materiales aprovechables son aquellos que pueden reincorporarse a los ciclos productivos
          como materia prima secundaria. Para que no pierdan su valor, deben entregarse siempre{' '}
          <strong className="text-emerald-950 font-bold">limpios, secos y desocupados</strong>.
        </p>
      </div>

      {/* 4 Core categories with deeper shadows and comfortable typography */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        
        {/* 1. Papel y cartón */}
        <div className="bg-white rounded-3xl p-7 sm:p-8 border border-emerald-200/90 shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 shadow-md">
              <FileText className="w-8 h-8" />
            </div>
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-xs sm:text-sm font-extrabold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                  Fibras naturales
                </span>
                <span className="text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">Caneca Blanca</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-emerald-950">
                Papel y cartón
              </h3>
              <p className="text-emerald-950/85 text-base leading-relaxed">
                Hojas de cuaderno o archivo, periódicos, revistas, cajas de cartón corrugado, carpetas y empaques limpios y secos.
              </p>
              <div className="bg-emerald-50/80 rounded-2xl p-4 text-sm text-emerald-950 space-y-1.5 border border-emerald-200/80 shadow-xs">
                <p className="font-bold text-emerald-950">💡 Cómo entregarlo:</p>
                <p className="leading-relaxed">Aplana las cajas para optimizar espacio. Retira cinta adhesiva excesiva y evita que se humedezcan con líquidos.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Plástico */}
        <div className="bg-white rounded-3xl p-7 sm:p-8 border border-emerald-200/90 shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center shrink-0 shadow-md">
              <Milk className="w-8 h-8" />
            </div>
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-xs sm:text-sm font-extrabold px-3 py-1 rounded-full bg-sky-100 text-sky-900 border border-sky-200">
                  Polímeros reciclables
                </span>
                <span className="text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">Caneca Blanca</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-emerald-950">
                Plástico (PET, PEAD, PEBD)
              </h3>
              <p className="text-emerald-950/85 text-base leading-relaxed">
                Botellas de agua y gaseosa, recipientes de detergente y shampoo, envases de lácteos, tapas plásticas y bolsas limpias.
              </p>
              <div className="bg-emerald-50/80 rounded-2xl p-4 text-sm text-emerald-950 space-y-1.5 border border-emerald-200/80 shadow-xs">
                <p className="font-bold text-emerald-950">💡 Cómo entregarlo:</p>
                <p className="leading-relaxed">Vacía todo el líquido, enjuaga con un poco de agua residual si tiene restos y aplasta la botella antes de taparla.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Vidrio */}
        <div className="bg-white rounded-3xl p-7 sm:p-8 border border-emerald-200/90 shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 shadow-md">
              <Wine className="w-8 h-8" />
            </div>
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-xs sm:text-sm font-extrabold px-3 py-1 rounded-full bg-teal-100 text-teal-900 border border-teal-200">
                  100% Reciclable infinito
                </span>
                <span className="text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">Caneca Blanca</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-emerald-950">
                Vidrio
              </h3>
              <p className="text-emerald-950/85 text-base leading-relaxed">
                Botellas de bebidas, frascos de conservas, salsas y café. El vidrio puede fundirse infinitas veces sin perder pureza.
              </p>
              <div className="bg-emerald-50/80 rounded-2xl p-4 text-sm text-emerald-950 space-y-1.5 border border-emerald-200/80 shadow-xs">
                <p className="font-bold text-emerald-950">💡 Cómo entregarlo:</p>
                <p className="leading-relaxed">Entrega sin tapas metálicas. Si un frasco está roto, envuélvelo en cartón para evitar accidentes con los recicladores.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Metal */}
        <div className="bg-white rounded-3xl p-7 sm:p-8 border border-emerald-200/90 shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 shadow-md">
              <Cog className="w-8 h-8" />
            </div>
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-xs sm:text-sm font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                  Aluminio y Hojalata
                </span>
                <span className="text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">Caneca Blanca</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-emerald-950">
                Metal
              </h3>
              <p className="text-emerald-950/85 text-base leading-relaxed">
                Latas de bebidas de aluminio, latas de atún o verduras en conserva, tapas corona y perfiles metálicos pequeños.
              </p>
              <div className="bg-emerald-50/80 rounded-2xl p-4 text-sm text-emerald-950 space-y-1.5 border border-emerald-200/80 shadow-xs">
                <p className="font-bold text-emerald-950">💡 Cómo entregarlo:</p>
                <p className="leading-relaxed">Enjuaga para retirar residuos de salsas o aceites y dobla hacia adentro los bordes filosos de las latas de conserva.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
