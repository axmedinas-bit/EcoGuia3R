import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhyRecycle } from './components/WhyRecycle';
import { WhatToRecycle } from './components/WhatToRecycle';
import { ContainersSection } from './components/ContainersSection';
import { PracticalTips } from './components/PracticalTips';
import { WasteGame } from './components/WasteGame';
import { SuggestionsForm } from './components/SuggestionsForm';
import { AdminPanel } from './components/AdminPanel';
import { LoginModal } from './components/LoginModal';
import { PythonModal } from './components/PythonModal';
import { Footer } from './components/Footer';
import { sqliteService } from './db/sqlite';
import { ResiduoItem } from './types';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem('ecoguia_admin_session') === 'true';
  });
  const [activeView, setActiveView] = useState<'home' | 'panel'>('home');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isPythonModalOpen, setIsPythonModalOpen] = useState(false);
  const [sugerenciasCount, setSugerenciasCount] = useState<number>(() => {
    return sqliteService.getSugerencias().length;
  });
  const [flashMessage, setFlashMessage] = useState<string | null>(null);

  // Initialize SQLite state
  useEffect(() => {
    sqliteService.init();
    setSugerenciasCount(sqliteService.getSugerencias().length);
  }, []);

  const showFlash = (msg: string) => {
    setFlashMessage(msg);
    setTimeout(() => {
      setFlashMessage((current) => (current === msg ? null : current));
    }, 4000);
  };

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    sessionStorage.setItem('ecoguia_admin_session', 'true');
    setActiveView('panel');
    showFlash('Has iniciado sesión como administrador.');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('ecoguia_admin_session');
    setActiveView('home');
    showFlash('Has cerrado sesión correctamente.');
  };

  const handleRefreshData = () => {
    setSugerenciasCount(sqliteService.getSugerencias().length);
  };

  const handleSuggestionAdded = () => {
    setSugerenciasCount(sqliteService.getSugerencias().length);
    showFlash('¡Tu sugerencia fue recibida exitosamente! Muchas gracias por tu aporte.');
  };

  const handleSelectSearchResiduo = (item: ResiduoItem) => {
    showFlash(`Búsqueda: ${item.nombre} corresponde al contenedor ${item.tipo.toUpperCase()}.`);
    const elem = document.getElementById('contenedores');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-body selection:bg-emerald-200 selection:text-emerald-950">
      
      {/* Flash Notification Banner */}
      {flashMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-[#174D32] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#CFEF9D]/40 backdrop-blur-md flex items-center gap-3 text-xs sm:text-sm font-semibold max-w-md">
            <CheckCircle2 className="w-4 h-4 text-[#CFEF9D] shrink-0" />
            <p className="flex-1">{flashMessage}</p>
            <button
              onClick={() => setFlashMessage(null)}
              className="text-white/70 hover:text-white text-xs px-1 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        isAdmin={isAdmin}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
        onOpenPanel={() => setActiveView('panel')}
        activeView={activeView}
        onGoHome={() => setActiveView('home')}
        onSelectSearchResiduo={handleSelectSearchResiduo}
        sugerenciasCount={sugerenciasCount}
        onOpenPython={() => setIsPythonModalOpen(true)}
      />

      {/* Main Content Router */}
      <main id="inicio" className="flex-1">
        {activeView === 'panel' ? (
          <AdminPanel
            onGoHome={() => setActiveView('home')}
            onLogout={handleLogout}
            onRefresh={handleRefreshData}
          />
        ) : (
          <>
            <Hero />
            <WhyRecycle />
            <WhatToRecycle />
            <ContainersSection />
            <PracticalTips />
            <WasteGame />
            <SuggestionsForm
              onSuggestionAdded={handleSuggestionAdded}
              sugerenciasCount={sugerenciasCount}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenLogin={() => setIsLoginOpen(true)}
        isAdmin={isAdmin}
        onOpenPanel={() => setActiveView('panel')}
        onOpenPython={() => setIsPythonModalOpen(true)}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Python Ecosystem Modal */}
      <PythonModal
        isOpen={isPythonModalOpen}
        onClose={() => setIsPythonModalOpen(false)}
      />
    </div>
  );
}
