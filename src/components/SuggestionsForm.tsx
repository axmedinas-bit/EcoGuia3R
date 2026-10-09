import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, MessageSquare, HeartHandshake } from 'lucide-react';
import { sqliteService } from '../db/sqlite';

interface SuggestionsFormProps {
  onSuggestionAdded: () => void;
  sugerenciasCount: number;
}

export const SuggestionsForm: React.FC<SuggestionsFormProps> = ({
  onSuggestionAdded,
  sugerenciasCount,
}) => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || !correo.trim() || !mensaje.trim()) {
      setStatus('error');
      setStatusMessage('Todos los campos son obligatorios.');
      return;
    }

    if (!correo.includes('@') || !correo.includes('.')) {
      setStatus('error');
      setStatusMessage('Por favor ingresa un correo electrónico válido.');
      return;
    }

    setIsSubmitting(true);

    try {
      sqliteService.createSugerencia(nombre, correo, mensaje);
      setStatus('success');
      setStatusMessage('¡Muchas gracias! Tu sugerencia ha sido enviada correctamente al equipo de EcoGuía.');
      setNombre('');
      setCorreo('');
      setMensaje('');
      onSuggestionAdded();
    } catch {
      setStatus('error');
      setStatusMessage('Ocurrió un error al enviar tu mensaje. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="sugerencias" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-white via-[#F4FBF5] to-white rounded-3xl p-7 sm:p-12 border border-[#C5DDCB] shadow-elevation-3 relative overflow-hidden">
        
        {/* Decorative corner element */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-emerald-100/50 to-teal-100/30 rounded-bl-full pointer-events-none -z-0" />

        <div className="relative z-10">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10 pb-7 border-b border-[#E3F1E6]">
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-[#174D32] mb-2">
                <MessageSquare className="w-4 h-4 text-[#2E7D32]" />
                <span>Buzón Ciudadano &bull; Participación Activa</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1F2E24] tracking-tight">
                Sugerencias de reciclaje
              </h2>
              <p className="text-[#4A5A4E] text-base mt-2 leading-relaxed">
                ¿Tienes una idea para promover la separación en tu comunidad o enriquecer esta guía? Déjanos tu mensaje.
              </p>
            </div>

            {/* Civic Badge with deeper shadow */}
            <div className="shrink-0 flex items-center gap-2.5 bg-emerald-100/90 border border-emerald-300 text-[#174D32] px-4 py-2.5 rounded-2xl text-sm font-bold shadow-sm">
              <HeartHandshake className="w-5 h-5 text-[#2E7D32]" />
              <div>
                <p className="text-xs text-[#2E7D32] uppercase font-extrabold tracking-wide">Comunidad EcoGuía</p>
                <p className="text-sm font-bold">{sugerenciasCount} aporte(s) recibidos</p>
              </div>
            </div>
          </div>

          {/* Flash Feedback Alert */}
          {status === 'success' && (
            <div className="mb-8 p-5 rounded-2xl bg-emerald-100 border border-emerald-300 text-[#174D32] text-base font-bold flex items-center gap-3.5 shadow-md animate-in fade-in">
              <CheckCircle2 className="w-6 h-6 text-[#2E7D32] shrink-0" />
              <p>{statusMessage}</p>
            </div>
          )}

          {status === 'error' && (
            <div className="mb-8 p-5 rounded-2xl bg-rose-50 border border-rose-300 text-rose-950 text-base font-bold flex items-center gap-3.5 shadow-md animate-in fade-in">
              <AlertCircle className="w-6 h-6 text-rose-600 shrink-0" />
              <p>{statusMessage}</p>
            </div>
          )}

          {/* The Form with larger fonts and deeper shadows */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Nombre */}
              <div>
                <label htmlFor="nombre" className="block text-sm font-extrabold text-[#1F2E24] uppercase tracking-wider mb-2">
                  Nombre completo <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. Sofía Morales"
                  required
                  className="w-full bg-white text-[#1F2E24] placeholder-[#4A5A4E]/60 text-base rounded-2xl px-4 py-3.5 border border-[#C5DDCB] focus:outline-none focus:ring-2 focus:ring-[#4CAF50] shadow-sm transition-all"
                />
              </div>

              {/* Correo */}
              <div>
                <label htmlFor="correo" className="block text-sm font-extrabold text-[#1F2E24] uppercase tracking-wider mb-2">
                  Correo electrónico <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="sofia@ejemplo.com"
                  required
                  className="w-full bg-white text-[#1F2E24] placeholder-[#4A5A4E]/60 text-base rounded-2xl px-4 py-3.5 border border-[#C5DDCB] focus:outline-none focus:ring-2 focus:ring-[#4CAF50] shadow-sm transition-all"
                />
              </div>

            </div>

            {/* Mensaje */}
            <div>
              <label htmlFor="mensaje" className="block text-sm font-extrabold text-[#1F2E24] uppercase tracking-wider mb-2">
                Mensaje o propuesta ambiental <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={5}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Escribe tu recomendación para mejorar los puntos limpios, ideas para reciclar o dudas sobre separación de residuos..."
                required
                className="w-full bg-white text-[#1F2E24] placeholder-[#4A5A4E]/60 text-base rounded-2xl p-4 border border-[#C5DDCB] focus:outline-none focus:ring-2 focus:ring-[#4CAF50] shadow-sm transition-all resize-y leading-relaxed"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pt-3">
              <p className="text-sm text-[#4A5A4E] font-medium leading-relaxed">
                🌱 Todas las sugerencias recibidas son revisadas por los coordinadores para enriquecer las campañas ambientales.
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto btn-shine inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] hover:from-[#1B5E20] hover:to-[#174D32] text-white font-extrabold text-base shadow-xl hover:shadow-2xl transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Enviando...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Enviar sugerencia</span>
                  </>
                )}
              </button>
            </div>

          </form>

        </div>
      </div>
    </section>
  );
};
