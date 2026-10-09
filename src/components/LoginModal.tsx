import React, { useState } from 'react';
import { X, Lock, User, ShieldCheck, KeyRound, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { sqliteService } from '../db/sqlite';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await sqliteService.login(usuario, contrasena);
      if (res.success) {
        onLoginSuccess();
        onClose();
        setUsuario('');
        setContrasena('');
      } else {
        setError(res.error || 'Usuario o contraseña incorrectos.');
      }
    } catch {
      setError('Error al iniciar sesión.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDefaults = () => {
    setUsuario('admin');
    setContrasena('admin123');
    setError('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full p-7 sm:p-9 shadow-2xl border border-emerald-200 relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-md">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-emerald-950">
              Acceso Administrativo
            </h3>
            <p className="text-sm text-emerald-800 font-semibold mt-0.5">
              Gestión de sugerencias comunitarias
            </p>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-5 p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-950 text-sm font-bold flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-extrabold text-emerald-950 uppercase tracking-wider mb-2">
              Usuario
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-emerald-700 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="admin"
                required
                className="w-full bg-[#F4FBF5] text-emerald-950 text-base rounded-2xl pl-12 pr-4 py-3 border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-extrabold text-emerald-950 uppercase tracking-wider mb-2">
              Contraseña
            </label>
            <div className="relative">
              <KeyRound className="w-5 h-5 text-emerald-700 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#F4FBF5] text-emerald-950 text-base rounded-2xl pl-12 pr-12 py-3 border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-700 hover:text-emerald-950 cursor-pointer p-1"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-3 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2.5"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>{isLoading ? 'Verificando...' : 'Entrar al Panel'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
