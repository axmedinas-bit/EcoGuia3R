import React, { useState } from 'react';
import { RotateCcw, Trophy, CheckCircle, XCircle } from 'lucide-react';
import { ResiduoItem } from '../types';

const JUEGO_RESIDUOS: ResiduoItem[] = [
  { nombre: 'Cáscara de banano', emoji: '🍌', tipo: 'verde', categoria: 'Orgánico', explicacion: 'Es un residuo orgánico aprovechable para compostaje.' },
  { nombre: 'Botella plástica limpia', emoji: '🧴', tipo: 'blanco', categoria: 'Aprovechable', explicacion: 'El plástico limpio y seco se recicla en la caneca blanca.' },
  { nombre: 'Caja de cartón doblada', emoji: '📦', tipo: 'blanco', categoria: 'Aprovechable', explicacion: 'El cartón limpio es un residuo aprovechable.' },
  { nombre: 'Servilleta con grasa', emoji: '🧻', tipo: 'negro', categoria: 'No aprovechable', explicacion: 'El papel engrasado o sucio pierde su fibra y va a la caneca negra.' },
  { nombre: 'Lata de gaseosa', emoji: '🥫', tipo: 'blanco', categoria: 'Aprovechable', explicacion: 'El aluminio es 100% reciclable en la caneca blanca.' },
  { nombre: 'Restos de lechuga y zanahoria', emoji: '🥬', tipo: 'verde', categoria: 'Orgánico', explicacion: 'Los restos de verduras crudas son orgánicos aprovechables.' },
  { nombre: 'Papel higiénico usado', emoji: '🧻', tipo: 'negro', categoria: 'No aprovechable', explicacion: 'Es un residuo sanitario contaminado, debe ir a la caneca negra.' },
  { nombre: 'Botella de vidrio', emoji: '🍾', tipo: 'blanco', categoria: 'Aprovechable', explicacion: 'El vidrio desocupado y sin tapa va en la caneca blanca.' },
  { nombre: 'Cáscara de huevo triturada', emoji: '🥚', tipo: 'verde', categoria: 'Orgánico', explicacion: 'Aporta calcio al compost, pertenece al contenedor verde.' },
  { nombre: 'Empaque metalizado de galletas', emoji: '🍿', tipo: 'negro', categoria: 'No aprovechable', explicacion: 'Los empaques mixtos aluminizados no son reciclables comunes.' },
  { nombre: 'Periódico seco', emoji: '📄', tipo: 'blanco', categoria: 'Aprovechable', explicacion: 'El papel de archivo o periódico seco se aprovecha en la caneca blanca.' },
  { nombre: 'Borra de café', emoji: '☕', tipo: 'verde', categoria: 'Orgánico', explicacion: 'La borra de café enriquece el compost orgánico verde.' },
];

export const WasteGame: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [totalClassified, setTotalClassified] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);
  const [animState, setAnimState] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const currentItem = JUEGO_RESIDUOS[currentIndex];

  const handleClassify = (selectedBin: 'verde' | 'blanco' | 'negro') => {
    if (!currentItem) return;

    const isCorrect = selectedBin === currentItem.tipo;
    setTotalClassified((prev) => prev + 1);

    if (isCorrect) {
      setPoints((prev) => prev + 10);
      setCorrectCount((prev) => prev + 1);
      setAnimState('correct');
      setFeedback({
        message: `✅ ¡Correcto! ${currentItem.explicacion}`,
        isCorrect: true,
      });
    } else {
      setWrongCount((prev) => prev + 1);
      setAnimState('wrong');
      const binNombre =
        currentItem.tipo === 'verde'
          ? 'Verde (Orgánicos)'
          : currentItem.tipo === 'blanco'
          ? 'Blanco (Aprovechables)'
          : 'Negro (No aprovechables)';
      setFeedback({
        message: `❌ Incorrecto. Corresponde al contenedor ${binNombre}: ${currentItem.explicacion}`,
        isCorrect: false,
      });
    }

    setTimeout(() => {
      setAnimState('idle');
      setCurrentIndex((prev) => (prev + 1) % JUEGO_RESIDUOS.length);
    }, 1300);
  };

  const handleRestart = () => {
    setPoints(0);
    setTotalClassified(0);
    setCorrectCount(0);
    setWrongCount(0);
    setFeedback(null);
    setCurrentIndex(0);
    setAnimState('idle');
  };

  return (
    <section id="juego" className="py-20 px-4 sm:px-6 bg-gradient-to-b from-white via-emerald-50/50 to-white">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-extrabold uppercase tracking-wider text-amber-700 mb-2.5">
            Pon a prueba tus conocimientos
          </p>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-emerald-950 tracking-tight flex items-center justify-center gap-3">
            <span>🎮</span> ¡Clasifica el Residuo!
          </h2>
          <p className="text-emerald-950/85 text-base sm:text-lg mt-3 font-normal">
            Observa el residuo en pantalla y selecciona el contenedor correcto. ¡Aprende jugando!
          </p>
        </div>

        {/* Scoreboard with larger text and deeper shadows */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <div className="bg-white px-5 py-3 rounded-full border border-emerald-300 shadow-md flex items-center gap-2.5 text-sm sm:text-base font-extrabold text-emerald-950">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>Puntuación:</span>
            <span className="text-emerald-700 text-lg font-black">{points} pts</span>
          </div>

          <div className="bg-white px-5 py-3 rounded-full border border-emerald-300 shadow-md text-sm sm:text-base font-extrabold text-emerald-950">
            <span>Clasificados:</span>{' '}
            <span className="text-sky-700 text-lg font-black">{totalClassified}</span>
          </div>

          <div className="bg-emerald-50 px-5 py-3 rounded-full border border-emerald-300 shadow-md text-sm sm:text-base font-extrabold text-emerald-950 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span>Aciertos:</span>{' '}
            <span className="text-emerald-700 text-lg font-black">{correctCount}</span>
          </div>

          <div className="bg-rose-50 px-5 py-3 rounded-full border border-rose-300 shadow-md text-sm sm:text-base font-extrabold text-rose-950 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-rose-600" />
            <span>Errores:</span>{' '}
            <span className="text-rose-700 text-lg font-black">{wrongCount}</span>
          </div>
        </div>

        {/* Board with deep multi-layer shadow */}
        <div className="bg-gradient-to-br from-white via-emerald-50/60 to-white rounded-3xl p-7 sm:p-12 border border-emerald-200/90 shadow-elevation-3 relative overflow-hidden">
          
          {/* Item Stage */}
          <div className="flex flex-col items-center justify-center mb-10">
            <div
              className={`w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-emerald-100 to-teal-50 border-4 border-emerald-300 shadow-xl flex items-center justify-center text-6xl sm:text-7xl select-none transition-all duration-300 ${
                animState === 'correct'
                  ? 'scale-110 ring-8 ring-emerald-400 bg-emerald-100'
                  : animState === 'wrong'
                  ? 'animate-bounce ring-8 ring-rose-400 bg-rose-50'
                  : 'hover:scale-105'
              }`}
            >
              {currentItem.emoji}
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-emerald-950 mt-5 text-center">
              {currentItem.nombre}
            </h3>
            <span className="text-sm font-extrabold text-emerald-800 bg-emerald-100/90 px-4 py-1.5 rounded-full mt-2 border border-emerald-200 shadow-xs">
              Categoría: {currentItem.categoria}
            </span>
          </div>

          {/* 3 Bins Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            
            {/* Verde */}
            <button
              onClick={() => handleClassify('verde')}
              className="group p-6 rounded-3xl bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] text-white shadow-elevation-1 hover:shadow-elevation-3 transition-all transform hover:-translate-y-1.5 text-center cursor-pointer border border-emerald-600"
            >
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">🟢</div>
              <h4 className="font-display font-bold text-xl">Contenedor Verde</h4>
              <p className="text-sm text-emerald-100 mt-1 font-semibold">Orgánicos aprovechables</p>
            </button>

            {/* Blanco */}
            <button
              onClick={() => handleClassify('blanco')}
              className="group p-6 rounded-3xl bg-gradient-to-br from-white to-slate-100 text-emerald-950 shadow-elevation-1 hover:shadow-elevation-3 transition-all transform hover:-translate-y-1.5 text-center cursor-pointer border-2 border-emerald-300"
            >
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">⚪</div>
              <h4 className="font-display font-bold text-xl">Contenedor Blanco</h4>
              <p className="text-sm text-emerald-800 mt-1 font-semibold">Aprovechables limpios</p>
            </button>

            {/* Negro */}
            <button
              onClick={() => handleClassify('negro')}
              className="group p-6 rounded-3xl bg-gradient-to-br from-[#37474F] to-[#212121] text-white shadow-elevation-1 hover:shadow-elevation-3 transition-all transform hover:-translate-y-1.5 text-center cursor-pointer border border-zinc-700"
            >
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">⚫</div>
              <h4 className="font-display font-bold text-xl">Contenedor Negro</h4>
              <p className="text-sm text-zinc-300 mt-1 font-semibold">No aprovechables</p>
            </button>

          </div>

          {/* Feedback banner */}
          {feedback && (
            <div
              className={`mt-8 p-5 rounded-2xl text-center text-sm sm:text-base font-extrabold border shadow-md transition-all animate-in fade-in slide-in-from-bottom-2 ${
                feedback.isCorrect
                  ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                  : 'bg-rose-100 text-rose-950 border-rose-300'
              }`}
            >
              {feedback.message}
            </div>
          )}

          {/* Restart */}
          <div className="mt-10 flex justify-center">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-extrabold bg-white hover:bg-emerald-50 text-emerald-950 border border-emerald-300 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-emerald-700" />
              <span>Reiniciar juego</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
