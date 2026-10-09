import React from 'react';
import { Leaf, Shield, Heart } from 'lucide-react';

interface FooterProps {
  onOpenLogin: () => void;
  isAdmin: boolean;
  onOpenPanel: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLogin,
  isAdmin,
  onOpenPanel,
}) => {
  return (
    <footer className="bg-[#1B4332] text-white/90 pt-16 pb-12 border-t-2 border-emerald-900 shadow-2xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/15">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center brand-leaf border border-white/35 text-white shadow-md">
                <Leaf className="w-5 h-5 text-[#CFEF9D]" />
              </span>
              <span className="font-display font-bold text-3xl text-white">
                EcoGuía<span className="text-[#CFEF9D]">3R</span>
              </span>
            </div>
            <p className="text-sm text-white/80 max-w-md leading-relaxed font-normal">
              Plataforma informativa para la educación ambiental y la correcta separación de residuos sólidos en la fuente. 
              Promovemos hábitos sostenibles para reducir la contaminación y proteger los recursos naturales.
            </p>
            <div className="pt-2 text-sm text-[#CFEF9D] font-bold flex items-center gap-2">
              <Heart className="w-4 h-4 fill-[#CFEF9D]" />
              <span>Por un entorno más limpio, solidario y consciente</span>
            </div>
          </div>

          {/* Links Col */}
          <div>
            <h4 className="font-display font-bold text-base text-white uppercase tracking-wider mb-4">
              Guías Informativas
            </h4>
            <ul className="space-y-3 text-sm font-semibold text-white/80">
              <li>
                <a href="#inicio" className="hover:text-[#CFEF9D] transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#por-que-reciclar" className="hover:text-[#CFEF9D] transition-colors">
                  ¿Por qué reciclar?
                </a>
              </li>
              <li>
                <a href="#que-reciclar" className="hover:text-[#CFEF9D] transition-colors">
                  Materiales aprovechables
                </a>
              </li>
              <li>
                <a href="#contenedores" className="hover:text-[#CFEF9D] transition-colors">
                  Código de 3 contenedores
                </a>
              </li>
              <li>
                <a href="#consejos" className="hover:text-[#CFEF9D] transition-colors">
                  Consejos prácticos
                </a>
              </li>
              <li>
                <a href="#juego" className="hover:text-[#CFEF9D] transition-colors">
                  Juego de clasificación
                </a>
              </li>
              <li>
                <a href="#sugerencias" className="hover:text-[#CFEF9D] transition-colors">
                  Buzón de sugerencias
                </a>
              </li>
            </ul>
          </div>

          {/* Admin & Normative info */}
          <div>
            <h4 className="font-display font-bold text-base text-white uppercase tracking-wider mb-4">
              Normativa & Acceso
            </h4>
            <div className="space-y-4 text-sm text-white/80">
              <div className="bg-white/10 p-4 rounded-2xl border border-white/15 space-y-1.5 shadow-sm">
                <p className="font-extrabold text-white text-xs sm:text-sm">Resolución 2184 de 2019</p>
                <p className="text-xs text-white/75 leading-relaxed font-medium">Código oficial de colores en Colombia (Verde, Blanco, Negro)</p>
              </div>

              <div className="pt-1">
                {isAdmin ? (
                  <button
                    onClick={onOpenPanel}
                    className="inline-flex items-center gap-2 text-[#CFEF9D] font-extrabold text-sm hover:underline cursor-pointer bg-white/10 px-4 py-2 rounded-xl border border-white/20 shadow-sm"
                  >
                    <Shield className="w-4 h-4" />
                    Ir al panel de control
                  </button>
                ) : (
                  <button
                    onClick={onOpenLogin}
                    className="inline-flex items-center gap-2 text-white hover:text-[#CFEF9D] hover:underline cursor-pointer font-bold text-sm bg-white/10 px-4 py-2 rounded-xl border border-white/20 shadow-sm transition-colors"
                  >
                    <Shield className="w-4 h-4 text-[#CFEF9D]" />
                    Acceso para administradores
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/60 font-medium">
          <p>&copy; {new Date().getFullYear()} EcoGuía3R &bull; Aprende, separa y recicla correctamente.</p>
          <p className="text-[#CFEF9D]/90 font-bold">Iniciativa ciudadana para la sostenibilidad ambiental</p>
        </div>
      </div>
    </footer>
  );
};
