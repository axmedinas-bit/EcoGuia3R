import React, { useState } from 'react';
import { Leaf, Search, Shield, LogOut, LayoutDashboard, Menu, X } from 'lucide-react';
import { ResiduoItem } from '../types';

interface NavbarProps {
  isAdmin: boolean;
  onOpenLogin: () => void;
  onLogout: () => void;
  onOpenPanel: () => void;
  activeView: 'home' | 'panel';
  onGoHome: () => void;
  onSelectSearchResiduo: (item: ResiduoItem) => void;
  sugerenciasCount: number;
  onOpenPython?: () => void;
}

const RESIDUOS_DATABASE: ResiduoItem[] = [
  { nombre: 'Botella de plástico', emoji: '🧴', tipo: 'blanco', categoria: 'Plástico', explicacion: 'Plástico limpio y seco → Contenedor blanco (Aprovechable).' },
  { nombre: 'Caja de cartón', emoji: '📦', tipo: 'blanco', categoria: 'Papel y cartón', explicacion: 'Cartón aplanado y seco → Contenedor blanco (Aprovechable).' },
  { nombre: 'Periódico / Papel', emoji: '📄', tipo: 'blanco', categoria: 'Papel y cartón', explicacion: 'Papel limpio sin grasa → Contenedor blanco (Aprovechable).' },
  { nombre: 'Lata de refresco', emoji: '🥫', tipo: 'blanco', categoria: 'Metal', explicacion: 'Aluminio o metal enjuagado → Contenedor blanco (Aprovechable).' },
  { nombre: 'Botella o frasco de vidrio', emoji: '🍾', tipo: 'blanco', categoria: 'Vidrio', explicacion: 'Vidrio sin tapa ni residuos → Contenedor blanco (Aprovechable).' },
  { nombre: 'Cáscara de fruta o verdura', emoji: '🍌', tipo: 'verde', categoria: 'Orgánico', explicacion: 'Residuo orgánico para compost → Contenedor verde (Orgánico).' },
  { nombre: 'Restos de comida cruda', emoji: '🥬', tipo: 'verde', categoria: 'Orgánico', explicacion: 'Orgánico aprovechable → Contenedor verde (Orgánico).' },
  { nombre: 'Borra de café o té', emoji: '☕', tipo: 'verde', categoria: 'Orgánico', explicacion: 'Residuos vegetales → Contenedor verde (Orgánico).' },
  { nombre: 'Servilleta usada', emoji: '🧻', tipo: 'negro', categoria: 'No aprovechable', explicacion: 'Papel contaminado con grasa → Contenedor negro (No aprovechable).' },
  { nombre: 'Papel higiénico', emoji: '🧻', tipo: 'negro', categoria: 'No aprovechable', explicacion: 'Residuo sanitario → Contenedor negro (No aprovechable).' },
  { nombre: 'Empaque metalizado de snacks', emoji: '🍿', tipo: 'negro', categoria: 'No aprovechable', explicacion: 'Plástico metalizado mixto → Contenedor negro (No aprovechable).' },
  { nombre: 'Tapabocas y guantes', emoji: '😷', tipo: 'negro', categoria: 'No aprovechable', explicacion: 'Residuo de protección sanitaria → Contenedor negro (No aprovechable).' },
];

export const Navbar: React.FC<NavbarProps> = ({
  isAdmin,
  onOpenLogin,
  onLogout,
  onOpenPanel,
  activeView,
  onGoHome,
  onSelectSearchResiduo,
  sugerenciasCount,
  onOpenPython,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredResiduos = searchTerm.trim()
    ? RESIDUOS_DATABASE.filter(r =>
        r.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.tipo.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSelectSearch = (item: ResiduoItem) => {
    setSearchTerm('');
    setIsSearchOpen(false);
    onSelectSearchResiduo(item);
  };

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#145A32] via-[#1F7A45] to-[#4CAF50] text-white shadow-xl border-b border-white/25 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        
        {/* Brand */}
        <button
          onClick={onGoHome}
          className="flex items-center gap-3 text-left focus:outline-none cursor-pointer group"
        >
          <span className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center brand-leaf border border-white/35 text-white shadow-md">
            <Leaf className="w-6 h-6 text-[#CFEF9D]" />
          </span>
          <div>
            <div className="font-display font-bold text-2xl tracking-tight text-white flex items-center gap-1.5 drop-shadow-xs">
              EcoGuía<span className="text-[#CFEF9D]">3R</span>
            </div>
            <p className="text-xs text-[#DDF3E3] font-semibold tracking-wide">
              Aprende &bull; Separa &bull; Recicla
            </p>
          </div>
        </button>

        {/* Nav links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-bold text-white/95">
          <button
            onClick={onGoHome}
            className={`hover:text-[#CFEF9D] transition-colors cursor-pointer py-1 border-b-2 text-sm ${
              activeView === 'home' ? 'border-[#CFEF9D] text-white' : 'border-transparent text-white/85'
            }`}
          >
            Inicio
          </button>
          <a href="#por-que-reciclar" className="hover:text-[#CFEF9D] transition-colors py-1 text-sm">
            ¿Por qué reciclar?
          </a>
          <a href="#que-reciclar" className="hover:text-[#CFEF9D] transition-colors py-1 text-sm">
            Materiales
          </a>
          <a href="#contenedores" className="hover:text-[#CFEF9D] transition-colors py-1 text-sm">
            Contenedores
          </a>
          <a href="#consejos" className="hover:text-[#CFEF9D] transition-colors py-1 text-sm">
            Consejos prácticos
          </a>
          <a href="#juego" className="hover:text-[#CFEF9D] transition-colors py-1 flex items-center gap-1.5 text-sm">
            <span>🎮</span> Juego
          </a>
          <a href="#sugerencias" className="hover:text-[#CFEF9D] transition-colors py-1 text-sm">
            Buzón ciudadano
          </a>
          <button
            onClick={onOpenPython}
            className="bg-emerald-950/50 hover:bg-emerald-950/80 border border-[#CFEF9D]/50 text-[#CFEF9D] hover:text-white px-3 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ml-1"
            title="Ver arquitectura y herramientas en Python"
          >
            <span>🐍</span> Python
          </button>
        </nav>

        {/* Search bar & Admin Actions */}
        <div className="flex items-center gap-3.5">
          
          {/* Search Input */}
          <div className="relative hidden md:block w-52 lg:w-64">
            <div className="relative">
              <Search className="w-4 h-4 text-emerald-800 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="¿Qué residuo buscas?..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                className="w-full bg-white text-emerald-950 placeholder-emerald-800/60 text-sm font-medium rounded-full pl-10 pr-3.5 py-2.5 border border-emerald-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#CFEF9D]"
              />
            </div>

            {/* Search Dropdown */}
            {isSearchOpen && searchTerm.trim() && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsSearchOpen(false)}
                />
                <div className="absolute top-full mt-2 left-0 right-0 z-50 bg-white rounded-2xl shadow-2xl border border-emerald-200 overflow-hidden text-emerald-950">
                  {filteredResiduos.length > 0 ? (
                    <div className="max-h-72 overflow-y-auto divide-y divide-emerald-100">
                      {filteredResiduos.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelectSearch(item)}
                          className="w-full text-left px-4 py-3 hover:bg-emerald-50 transition-colors flex items-center gap-3 text-sm cursor-pointer"
                        >
                          <span className="text-2xl">{item.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-emerald-950 truncate text-sm">{item.nombre}</p>
                            <p className="text-xs text-emerald-800 truncate">{item.explicacion}</p>
                          </div>
                          <span
                            className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase ${
                              item.tipo === 'verde'
                                ? 'bg-emerald-100 text-emerald-900'
                                : item.tipo === 'blanco'
                                ? 'bg-slate-100 text-slate-800 border border-slate-300'
                                : 'bg-zinc-800 text-white'
                            }`}
                          >
                            {item.tipo}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-sm text-center text-emerald-800 font-medium">
                      No se encontró "{searchTerm}". Prueba con <em>plástico, cartón, banano, lata</em>.
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Admin Login/Panel Button */}
          {isAdmin ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenPanel}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-extrabold bg-[#CFEF9D] hover:bg-[#b8e874] text-[#145A32] shadow-md transition-all cursor-pointer"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Panel Admin</span>
                <span className="bg-[#145A32] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {sugerenciasCount}
                </span>
              </button>
              <button
                onClick={onLogout}
                className="p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer shadow-sm"
                title="Cerrar sesión"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-extrabold bg-white text-[#174D32] hover:bg-emerald-50 transition-all shadow-md cursor-pointer"
            >
              <Shield className="w-4 h-4 text-[#2E7D32]" />
              <span className="hidden sm:inline">Acceso</span> Admin
            </button>
          )}

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#174D32] border-t border-white/20 px-5 py-5 space-y-3 shadow-2xl">
          <div className="flex flex-col gap-2.5 font-bold text-base">
            <button
              onClick={() => {
                onGoHome();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-xl hover:bg-white/10 text-white"
            >
              🌱 Inicio
            </button>
            <a
              href="#por-que-reciclar"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-xl hover:bg-white/10 text-white"
            >
              ¿Por qué reciclar?
            </a>
            <a
              href="#que-reciclar"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-xl hover:bg-white/10 text-white"
            >
              ¿Qué se puede reciclar?
            </a>
            <a
              href="#contenedores"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-xl hover:bg-white/10 text-white"
            >
              Los 3 Contenedores
            </a>
            <a
              href="#consejos"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-xl hover:bg-white/10 text-white"
            >
              Tres consejos prácticos
            </a>
            <a
              href="#juego"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-xl hover:bg-white/10 text-white"
            >
              🎮 Mini juego interactivo
            </a>
            <a
              href="#sugerencias"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-xl hover:bg-white/10 text-white"
            >
              📝 Buzón ciudadano de sugerencias
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPython?.();
              }}
              className="py-2.5 px-3 rounded-xl bg-emerald-950/60 border border-[#CFEF9D]/40 text-[#CFEF9D] font-bold flex items-center gap-2 text-left"
            >
              <span>🐍</span> Ecosistema & Backend Python
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
