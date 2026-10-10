import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  Code2, 
  CheckCircle2, 
  Copy, 
  Download, 
  FileCode2, 
  Database, 
  Cpu, 
  Play, 
  FileText,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface PythonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PythonModal: React.FC<PythonModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'arquitectura' | 'simulador' | 'comandos' | 'descargas'>('arquitectura');
  const [testMaterial, setTestMaterial] = useState('botella de plástico');
  const [simResultado, setSimResultado] = useState<{
    color: string;
    categoria: string;
    instrucciones: string;
    codigo: string;
  } | null>({
    color: 'Blanco',
    categoria: 'Aprovechables',
    instrucciones: 'Lavar, escurrir y secar. Retirar tapas y aplastar botellas para ahorrar espacio.',
    codigo: 'blanco'
  });
  const [simKilos, setSimKilos] = useState(10);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2500);
  };

  const handleSimularClasificacion = (mat: string) => {
    const norm = mat.toLowerCase().trim();
    if (norm.includes('plastico') || norm.includes('vidrio') || norm.includes('papel') || norm.includes('carton') || norm.includes('lata') || norm.includes('metal')) {
      setSimResultado({
        color: 'Blanco',
        categoria: 'Aprovechables',
        instrucciones: 'Lavar, escurrir y secar. Depositar en el contenedor blanco para reciclaje.',
        codigo: 'blanco'
      });
    } else if (norm.includes('comida') || norm.includes('cascara') || norm.includes('fruta') || norm.includes('organico') || norm.includes('huevo') || norm.includes('cafe')) {
      setSimResultado({
        color: 'Verde',
        categoria: 'Orgánicos Aprovechables',
        instrucciones: 'Depositar sin bolsas ni plásticos para compostaje o biogás.',
        codigo: 'verde'
      });
    } else if (norm.includes('pila') || norm.includes('bateria') || norm.includes('medicamento') || norm.includes('bombillo') || norm.includes('aceite')) {
      setSimResultado({
        color: 'Rojo',
        categoria: 'Peligrosos y Posconsumo',
        instrucciones: 'Llevar a un punto posconsumo especial autorizado. No mezclar con basura común.',
        codigo: 'rojo'
      });
    } else {
      setSimResultado({
        color: 'Negro',
        categoria: 'No Aprovechables (Ordinarios)',
        instrucciones: 'Empacar en bolsa sellada. Si no está limpio ni seco, va al contenedor negro.',
        codigo: 'negro'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-emerald-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-emerald-300 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white p-6 sm:p-7 flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#CFEF9D] to-emerald-400 text-emerald-950 flex items-center justify-center font-mono font-bold text-2xl shadow-lg">
              🐍
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Ecosistema & Backend Python</h2>
                <span className="bg-[#CFEF9D] text-emerald-950 text-xs font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                  Python 3.10+
                </span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-200/90 mt-0.5">
                Servidor nativo, CLI de consola, algoritmos según Res. 2184, SQLite y pipeline GitHub Pages.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-emerald-50/80 px-6 border-b border-emerald-200 flex gap-2 overflow-x-auto text-sm font-bold">
          <button
            onClick={() => setActiveTab('arquitectura')}
            className={`py-3.5 px-4 border-b-2 transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'arquitectura'
                ? 'border-emerald-700 text-emerald-950'
                : 'border-transparent text-emerald-800/70 hover:text-emerald-950'
            }`}
          >
            <Cpu className="w-4 h-4" /> Arquitectura Python
          </button>
          <button
            onClick={() => setActiveTab('simulador')}
            className={`py-3.5 px-4 border-b-2 transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'simulador'
                ? 'border-emerald-700 text-emerald-950'
                : 'border-transparent text-emerald-800/70 hover:text-emerald-950'
            }`}
          >
            <Play className="w-4 h-4" /> Algoritmo & Simulador
          </button>
          <button
            onClick={() => setActiveTab('comandos')}
            className={`py-3.5 px-4 border-b-2 transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'comandos'
                ? 'border-emerald-700 text-emerald-950'
                : 'border-transparent text-emerald-800/70 hover:text-emerald-950'
            }`}
          >
            <Terminal className="w-4 h-4" /> Comandos de Terminal
          </button>
          <button
            onClick={() => setActiveTab('descargas')}
            className={`py-3.5 px-4 border-b-2 transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'descargas'
                ? 'border-emerald-700 text-emerald-950'
                : 'border-transparent text-emerald-800/70 hover:text-emerald-950'
            }`}
          >
            <Download className="w-4 h-4" /> Archivos & Exportaciones
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 text-emerald-950 space-y-6">
          
          {/* TAB 1: ARQUITECTURA */}
          {activeTab === 'arquitectura' && (
            <div className="space-y-6">
              <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 flex items-start gap-3.5">
                <Sparkles className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-bold text-emerald-950 text-base">¿Por qué este proyecto destaca en Python?</p>
                  <p className="text-emerald-900/80 mt-1 leading-relaxed">
                    EcoGuía3R implementa una arquitectura híbrida completa: cuenta con un <strong>servidor HTTP y REST nativo en Python</strong>, 
                    una <strong>consola CLI interactiva</strong> con menús para terminal, <strong>lógica de clasificación</strong> basada en la normativa ambiental colombiana (Res. 2184), 
                    <strong>persistencia SQLite 3</strong> y un <strong>pipeline automatizado de pruebas y despliegue</strong> para GitHub Pages.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* server.py */}
                <div className="p-4 rounded-2xl border border-emerald-200 bg-white hover:border-emerald-400 transition-all shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-emerald-900 flex items-center gap-2 text-sm">
                      <FileCode2 className="w-4 h-4 text-emerald-600" /> server.py
                    </span>
                    <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-md">HTTP / REST Nativo</span>
                  </div>
                  <p className="text-xs text-emerald-900/80 leading-relaxed">
                    Servidor web completo utilizando la biblioteca estándar de Python (<code className="bg-emerald-50 px-1 py-0.5 rounded">http.server</code>). 
                    No requiere <code className="bg-emerald-50 px-1 py-0.5 rounded">pip install</code>. Ofrece endpoints REST como <code className="bg-emerald-50 px-1 py-0.5 rounded">/api/sugerencias</code> y <code className="bg-emerald-50 px-1 py-0.5 rounded">/api/clasificar</code>.
                  </p>
                </div>

                {/* ecoguia_cli.py */}
                <div className="p-4 rounded-2xl border border-emerald-200 bg-white hover:border-emerald-400 transition-all shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-emerald-900 flex items-center gap-2 text-sm">
                      <Terminal className="w-4 h-4 text-teal-600" /> ecoguia_cli.py
                    </span>
                    <span className="text-xs bg-teal-100 text-teal-900 font-bold px-2 py-0.5 rounded-md">Consola CLI</span>
                  </div>
                  <p className="text-xs text-emerald-900/80 leading-relaxed">
                    Herramienta de terminal con menú interactivo, calculadora de CO₂/agua, listado de sugerencias de SQLite y comando de clasificación directa con banderas CLI.
                  </p>
                </div>

                {/* app/recycling_logic.py */}
                <div className="p-4 rounded-2xl border border-emerald-200 bg-white hover:border-emerald-400 transition-all shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-emerald-900 flex items-center gap-2 text-sm">
                      <Code2 className="w-4 h-4 text-sky-600" /> app/recycling_logic.py
                    </span>
                    <span className="text-xs bg-sky-100 text-sky-900 font-bold px-2 py-0.5 rounded-md">Algoritmos 3R</span>
                  </div>
                  <p className="text-xs text-emerald-900/80 leading-relaxed">
                    Módulo con normalización léxica, expresiones regulares, mapeo de código de colores (Blanco, Verde, Negro, Rojo) y factores de impacto ecológico por kilogramo.
                  </p>
                </div>

                {/* build_pages.py */}
                <div className="p-4 rounded-2xl border border-emerald-200 bg-white hover:border-emerald-400 transition-all shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-emerald-900 flex items-center gap-2 text-sm">
                      <Play className="w-4 h-4 text-amber-600" /> build_pages.py
                    </span>
                    <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-md">Pipeline CI/CD</span>
                  </div>
                  <p className="text-xs text-emerald-900/80 leading-relaxed">
                    Script de integración continua que ejecuta pruebas unitarias en Python, valida la base SQLite, exporta volcados SQL y JSON, y prepara los artefactos para GitHub Pages.
                  </p>
                </div>

                {/* tests/test_basic.py */}
                <div className="p-4 rounded-2xl border border-emerald-200 bg-white hover:border-emerald-400 transition-all shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-emerald-900 flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> tests/test_basic.py
                    </span>
                    <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-md">7 Pruebas Unitarias</span>
                  </div>
                  <p className="text-xs text-emerald-900/80 leading-relaxed">
                    Suite de pruebas automatizadas con el framework estándar <code className="bg-emerald-50 px-1 py-0.5 rounded">unittest</code> que valida persistencia SQLite, clasificación y cálculos.
                  </p>
                </div>

                {/* instance/app.db */}
                <div className="p-4 rounded-2xl border border-emerald-200 bg-white hover:border-emerald-400 transition-all shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-emerald-900 flex items-center gap-2 text-sm">
                      <Database className="w-4 h-4 text-purple-600" /> instance/app.db
                    </span>
                    <span className="text-xs bg-purple-100 text-purple-900 font-bold px-2 py-0.5 rounded-md">SQLite 3</span>
                  </div>
                  <p className="text-xs text-emerald-900/80 leading-relaxed">
                    Base de datos relacional para sugerencias ciudadanas y autenticación de administradores mediante hashes criptográficos.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: SIMULADOR DE ALGORITMO PYTHON */}
          {activeTab === 'simulador' && (
            <div className="space-y-6">
              <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200">
                <h3 className="font-bold text-emerald-950 text-base mb-1">
                  🧪 Probador del Algoritmo Python (`app/recycling_logic.py`)
                </h3>
                <p className="text-xs text-emerald-900/80 mb-4">
                  Escribe cualquier material o residuo para comprobar la clasificación léxica y las instrucciones según la Resolución 2184:
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={testMaterial}
                    onChange={(e) => setTestMaterial(e.target.value)}
                    placeholder="Ej. botella de gaseosa, cáscaras de plátano, pilas, servilleta..."
                    className="flex-1 px-4 py-2.5 rounded-xl border border-emerald-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  <button
                    onClick={() => handleSimularClasificacion(testMaterial)}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4" /> Clasificar Residuo
                  </button>
                </div>

                {simResultado && (
                  <div className="mt-5 p-4 rounded-xl border bg-white border-emerald-200 shadow-xs flex items-start gap-4">
                    <div 
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg text-white shrink-0 shadow-md ${
                        simResultado.codigo === 'blanco'
                          ? 'bg-slate-700 border-2 border-slate-300'
                          : simResultado.codigo === 'verde'
                          ? 'bg-emerald-600'
                          : simResultado.codigo === 'rojo'
                          ? 'bg-rose-600'
                          : 'bg-zinc-800'
                      }`}
                    >
                      {simResultado.codigo === 'blanco' ? '⚪' : simResultado.codigo === 'verde' ? '🟢' : simResultado.codigo === 'rojo' ? '🔴' : '⚫'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-base text-emerald-950">
                          Contenedor {simResultado.color.toUpperCase()}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                          {simResultado.categoria}
                        </span>
                      </div>
                      <p className="text-xs text-emerald-900/80 mt-1 leading-relaxed">
                        <strong>Instrucción ambiental:</strong> {simResultado.instrucciones}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Calculadora de Ahorro en Python */}
              <div className="p-5 rounded-2xl border border-emerald-200 bg-white">
                <h4 className="font-bold text-emerald-950 text-sm mb-3">
                  ⚖️ Calculadora de Impacto Ambiental en Python
                </h4>
                <div className="flex items-center gap-4 mb-4">
                  <label className="text-xs font-bold text-emerald-900">Kilogramos a reciclar:</label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={simKilos}
                    onChange={(e) => setSimKilos(Number(e.target.value) || 1)}
                    className="w-24 px-3 py-1.5 rounded-lg border border-emerald-300 text-sm font-bold text-center"
                  />
                  <span className="text-xs text-emerald-800 font-semibold">kg de material</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                    <p className="text-lg font-extrabold text-emerald-900">{Math.round(simKilos * 1.5 * 10) / 10} kg</p>
                    <p className="text-[11px] font-bold text-emerald-700 uppercase">CO₂ Evitado</p>
                  </div>
                  <div className="p-3 rounded-xl bg-teal-50 border border-teal-200">
                    <p className="text-lg font-extrabold text-teal-900">{simKilos * 24} L</p>
                    <p className="text-[11px] font-bold text-teal-700 uppercase">Agua Ahorrada</p>
                  </div>
                  <div className="p-3 rounded-xl bg-sky-50 border border-sky-200">
                    <p className="text-lg font-extrabold text-sky-900">{Math.round(simKilos * 5.6 * 10) / 10} kWh</p>
                    <p className="text-[11px] font-bold text-sky-700 uppercase">Energía</p>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                    <p className="text-lg font-extrabold text-amber-900">{Math.round(simKilos * 0.017 * 100) / 100}</p>
                    <p className="text-[11px] font-bold text-amber-700 uppercase">Árboles Equiv.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COMANDOS DE TERMINAL */}
          {activeTab === 'comandos' && (
            <div className="space-y-4">
              <p className="text-xs text-emerald-900/80">
                Puedes ejecutar cualquiera de estos scripts directamente desde la terminal de tu computador:
              </p>

              {[
                {
                  id: 'server',
                  titulo: '1. Iniciar Servidor Nativo en Python (Sin dependencias)',
                  cmd: 'python3 server.py',
                  desc: 'Inicia el servidor web nativo y la API REST en http://localhost:5000'
                },
                {
                  id: 'cli-menu',
                  titulo: '2. Iniciar Consola Interactiva (CLI)',
                  cmd: 'python3 ecoguia_cli.py --menu',
                  desc: 'Abre un menú interactivo en la terminal para clasificar, ver datos y calcular ahorros.'
                },
                {
                  id: 'cli-class',
                  titulo: '3. Clasificar un residuo desde la terminal',
                  cmd: 'python3 ecoguia_cli.py --clasificar "botella de vidrio"',
                  desc: 'Consulta directa del contenedor ambiental correspondiente.'
                },
                {
                  id: 'tests',
                  titulo: '4. Ejecutar Suite de Pruebas Unitarias',
                  cmd: 'python3 -m unittest discover tests',
                  desc: 'Ejecuta las 7 pruebas unitarias de persistencia, lógica y exportación (100% OK).'
                },
                {
                  id: 'build',
                  titulo: '5. Ejecutar Pipeline para GitHub Pages',
                  cmd: 'python3 build_pages.py',
                  desc: 'Corre pruebas, valida SQLite, genera respaldos SQL y prepara la carpeta dist/.'
                },
                {
                  id: 'report',
                  titulo: '6. Generar Reporte Ambiental',
                  cmd: 'python3 report_generator.py',
                  desc: 'Genera instance/reporte_ambiental.md y dist/reporte_ambiental.html con métricas ecológicas.'
                }
              ].map((item) => (
                <div key={item.id} className="p-4 rounded-2xl border border-emerald-200 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-sm text-emerald-950">{item.titulo}</p>
                    <button
                      onClick={() => handleCopy(item.cmd, item.id)}
                      className="text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedCmd === item.id ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> ¡Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copiar comando
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-slate-900 text-emerald-400 font-mono text-xs px-3.5 py-2.5 rounded-xl overflow-x-auto">
                    $ {item.cmd}
                  </div>
                  <p className="text-xs text-emerald-800/80">{item.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: ARCHIVOS & DESCARGAS */}
          {activeTab === 'descargas' && (
            <div className="space-y-4">
              <p className="text-xs text-emerald-900/80">
                Los siguientes artefactos y volcados generados por Python están listos para descargarse o inspeccionarse:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Respaldo SQL */}
                <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 flex flex-col justify-between">
                  <div>
                    <span className="font-bold text-sm text-emerald-950 flex items-center gap-2">
                      <Database className="w-4 h-4 text-emerald-700" /> ecoguia_database.sql
                    </span>
                    <p className="text-xs text-emerald-800/80 mt-1">
                      Volcado completo en SQL de las tablas y registros de sugerencias y administradores generado por Python.
                    </p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <a
                      href="./ecoguia_database.sql"
                      download="ecoguia_database.sql"
                      className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2 px-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                      title="Volcado completo con datos e inserciones"
                    >
                      <Download className="w-3.5 h-3.5" /> Dump SQL
                    </a>
                    <a
                      href="./ecoguia_schema.sql"
                      download="ecoguia_schema.sql"
                      className="bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 font-bold text-xs py-2 px-2.5 rounded-xl flex items-center justify-center gap-1 transition-colors"
                      title="Esquema DDL de tablas e índices"
                    >
                      <FileCode2 className="w-3.5 h-3.5" /> Esquema DDL
                    </a>
                  </div>
                </div>

                {/* Reporte HTML */}
                <div className="p-4 rounded-2xl border border-emerald-200 bg-teal-50/50 flex flex-col justify-between">
                  <div>
                    <span className="font-bold text-sm text-emerald-950 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-teal-700" /> reporte_ambiental.html
                    </span>
                    <p className="text-xs text-emerald-800/80 mt-1">
                      Informe ejecutivo generado por <code className="text-xs">report_generator.py</code> con métricas de CO₂, agua y energía.
                    </p>
                  </div>
                  <a
                    href="./reporte_ambiental.html"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Ver Reporte HTML
                  </a>
                </div>

                {/* API Sugerencias JSON */}
                <div className="p-4 rounded-2xl border border-emerald-200 bg-sky-50/50 flex flex-col justify-between">
                  <div>
                    <span className="font-bold text-sm text-emerald-950 flex items-center gap-2">
                      <FileCode2 className="w-4 h-4 text-sky-700" /> api_sugerencias.json
                    </span>
                    <p className="text-xs text-emerald-800/80 mt-1">
                      Exportación en formato JSON de las sugerencias y estadísticas generadas durante la compilación.
                    </p>
                  </div>
                  <a
                    href="./api_sugerencias.json"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Ver JSON de Sugerencias
                  </a>
                </div>

                {/* API Residuos JSON */}
                <div className="p-4 rounded-2xl border border-emerald-200 bg-amber-50/50 flex flex-col justify-between">
                  <div>
                    <span className="font-bold text-sm text-emerald-950 flex items-center gap-2">
                      <FileCode2 className="w-4 h-4 text-amber-700" /> api_residuos.json
                    </span>
                    <p className="text-xs text-emerald-800/80 mt-1">
                      Diccionario JSON de los códigos de colores y materiales según la Resolución 2184 exportado por Python.
                    </p>
                  </div>
                  <a
                    href="./api_residuos.json"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Ver JSON de Residuos
                  </a>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-emerald-50 px-6 py-4 border-t border-emerald-200 flex items-center justify-between text-xs text-emerald-900 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>Python 3.10 &bull; SQLite 3 &bull; Despliegue en GitHub Pages</span>
          </div>
          <button
            onClick={onClose}
            className="bg-emerald-900 hover:bg-emerald-950 text-white font-bold px-5 py-2 rounded-xl text-xs transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
};
