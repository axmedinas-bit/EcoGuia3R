import React, { useState } from 'react';
import { Sugerencia, Administrador } from '../types';
import { sqliteService } from '../db/sqlite';
import { 
  Trash2, 
  Edit3, 
  Eye, 
  FileSpreadsheet, 
  Search, 
  ArrowLeft, 
  LogOut, 
  Users, 
  UserPlus, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  RefreshCw,
  Mail,
  Calendar,
  MessageSquare,
  ShieldCheck,
  UserCheck,
  Database
} from 'lucide-react';

interface AdminPanelProps {
  onGoHome: () => void;
  onLogout: () => void;
  onRefresh: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  onGoHome,
  onLogout,
  onRefresh,
}) => {
  const [sugerencias, setSugerencias] = useState<Sugerencia[]>(sqliteService.getSugerencias());
  const [administradores, setAdministradores] = useState<Administrador[]>(sqliteService.getAdministradores());
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'sugerencias' | 'administradores'>('sugerencias');

  // Modals state
  const [viewingSugerencia, setViewingSugerencia] = useState<Sugerencia | null>(null);
  const [editingSugerencia, setEditingSugerencia] = useState<Sugerencia | null>(null);
  
  // Edit form state
  const [editNombre, setEditNombre] = useState('');
  const [editCorreo, setEditCorreo] = useState('');
  const [editMensaje, setEditMensaje] = useState('');
  const [editError, setEditError] = useState('');

  // Password change state
  const [changingPassAdmin, setChangingPassAdmin] = useState<Administrador | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [passChangeStatus, setPassChangeStatus] = useState<{ success: boolean; message: string } | null>(null);

  // New Admin form
  const [newAdminUser, setNewAdminUser] = useState('');
  const [newAdminPass, setNewAdminPass] = useState('');
  const [adminStatus, setAdminStatus] = useState<{ success: boolean; message: string } | null>(null);

  const reloadData = () => {
    setSugerencias(sqliteService.getSugerencias());
    setAdministradores(sqliteService.getAdministradores());
    onRefresh();
  };

  const handleDelete = (s: Sugerencia) => {
    if (window.confirm(`¿Confirmas que deseas eliminar permanentemente la sugerencia de "${s.nombre}" (ID #${s.id})?`)) {
      sqliteService.deleteSugerencia(s.id);
      reloadData();
    }
  };

  const handleStartEdit = (s: Sugerencia) => {
    setEditingSugerencia(s);
    setEditNombre(s.nombre);
    setEditCorreo(s.correo);
    setEditMensaje(s.mensaje);
    setEditError('');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSugerencia) return;

    if (!editNombre.trim() || !editCorreo.trim() || !editMensaje.trim()) {
      setEditError('Todos los campos son obligatorios.');
      return;
    }

    const success = sqliteService.updateSugerencia(
      editingSugerencia.id,
      editNombre,
      editCorreo,
      editMensaje
    );

    if (success) {
      setEditingSugerencia(null);
      reloadData();
    } else {
      setEditError('No se pudo guardar la modificación.');
    }
  };

  // Download Excel (.xls format compatible with Microsoft Excel and Google Sheets)
  const handleDownloadExcel = () => {
    const data = sqliteService.getSugerencias();
    const dateStr = new Date().toLocaleDateString('es-CO');

    // Create a styled HTML table spreadsheet that Excel opens natively with all styles and accents
    let excelContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
        <x:Name>Sugerencias EcoGuía</x:Name>
        <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
        </x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
        <style>
          body { font-family: Calibri, Arial, sans-serif; }
          table { border-collapse: collapse; width: 100%; }
          th { background-color: #2E7D32; color: #FFFFFF; font-weight: bold; text-align: left; padding: 10px; border: 1px solid #1B5E20; }
          td { padding: 8px 10px; border: 1px solid #C5DDCB; vertical-align: top; }
          tr:nth-child(even) { background-color: #F4FBF5; }
          .title { font-size: 16pt; font-weight: bold; color: #174D32; margin-bottom: 5px; }
          .subtitle { font-size: 10pt; color: #4A5A4E; margin-bottom: 15px; }
        </style>
      </head>
      <body>
        <div class="title">EcoGuía - Reporte de Sugerencias Ciudadanas</div>
        <div class="subtitle">Generado el: ${dateStr} | Total de registros: ${data.length}</div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre del Remitente</th>
              <th>Correo Electrónico</th>
              <th>Propuesta o Sugerencia</th>
              <th>Fecha y Hora</th>
            </tr>
          </thead>
          <tbody>
    `;

    for (const s of data) {
      excelContent += `
        <tr>
          <td>${s.id}</td>
          <td>${escapeHtml(s.nombre)}</td>
          <td>${escapeHtml(s.correo)}</td>
          <td>${escapeHtml(s.mensaje)}</td>
          <td>${s.fecha}</td>
        </tr>
      `;
    }

    excelContent += `
          </tbody>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Sugerencias_Reciclaje_EcoGuia_${new Date().toISOString().slice(0, 10)}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportPythonSQL = () => {
    const dump = sqliteService.exportSQLDump();
    const blob = new Blob([dump], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ecoguia_python_sqlite_${new Date().toISOString().slice(0, 10)}.sql`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const escapeHtml = (str: string) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };

  // Admin creation
  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminUser.trim() || !newAdminPass) return;
    const res = await sqliteService.createAdmin(newAdminUser, newAdminPass);
    if (res.success) {
      setAdminStatus({ success: true, message: `El administrador '${newAdminUser}' ha sido registrado exitosamente.` });
      setNewAdminUser('');
      setNewAdminPass('');
      reloadData();
    } else {
      setAdminStatus({ success: false, message: res.error || 'No se pudo crear el administrador.' });
    }
  };

  // Password update
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!changingPassAdmin || !newPassword.trim()) return;
    const res = await sqliteService.updateAdminPassword(changingPassAdmin.id, newPassword);
    if (res.success) {
      setPassChangeStatus({ success: true, message: `Contraseña actualizada correctamente para ${changingPassAdmin.usuario}.` });
      setNewPassword('');
      setTimeout(() => {
        setChangingPassAdmin(null);
        setPassChangeStatus(null);
      }, 1500);
      reloadData();
    } else {
      setPassChangeStatus({ success: false, message: res.error || 'Error al actualizar.' });
    }
  };

  // Delete admin
  const handleDeleteAdmin = (admin: Administrador) => {
    if (window.confirm(`¿Confirmas que deseas retirar el acceso al administrador '${admin.usuario}'?`)) {
      const res = sqliteService.deleteAdmin(admin.id);
      if (res.success) {
        reloadData();
      } else {
        alert(res.error || 'No se pudo eliminar el administrador.');
      }
    }
  };

  const filtered = sugerencias.filter(s =>
    s.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.mensaje.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4FBF5] via-[#E3F1E6] to-[#F4FBF5] py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#C5DDCB] shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <button
              onClick={onGoHome}
              className="p-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-[#174D32] transition-colors cursor-pointer border border-[#C5DDCB]"
              title="Volver a la página informativa"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-bold text-2xl text-[#1F2E24]">
                  Panel de Administración
                </h1>
                <span className="text-xs bg-emerald-100 text-[#174D32] px-2.5 py-0.5 rounded-full font-bold">
                  EcoGuía
                </span>
              </div>
              <p className="text-xs text-[#4A5A4E] font-medium mt-0.5">
                Control de sugerencias comunitarias y gestión de administradores
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onGoHome}
              className="px-4 py-2.5 rounded-xl text-sm font-bold text-[#174D32] hover:bg-emerald-50 border border-[#C5DDCB] transition-colors cursor-pointer shadow-xs"
            >
              Ir a la página principal
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2.5 rounded-xl text-sm font-bold bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-3 border-b border-[#C5DDCB] pb-3 text-sm font-bold">
          <button
            onClick={() => setActiveTab('sugerencias')}
            className={`px-6 py-3 rounded-2xl transition-all cursor-pointer flex items-center gap-2.5 ${
              activeTab === 'sugerencias'
                ? 'bg-[#2E7D32] text-white shadow-lg'
                : 'text-[#1F2E24] hover:bg-white/80 bg-white/50 border border-[#C5DDCB] shadow-xs'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Sugerencias recibidas</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
              activeTab === 'sugerencias' ? 'bg-white text-[#174D32]' : 'bg-emerald-100 text-[#174D32]'
            }`}>
              {sugerencias.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('administradores')}
            className={`px-6 py-3 rounded-2xl transition-all cursor-pointer flex items-center gap-2.5 ${
              activeTab === 'administradores'
                ? 'bg-[#2E7D32] text-white shadow-lg'
                : 'text-[#1F2E24] hover:bg-white/80 bg-white/50 border border-[#C5DDCB] shadow-xs'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Apartado de Administradores</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
              activeTab === 'administradores' ? 'bg-white text-[#174D32]' : 'bg-emerald-100 text-[#174D32]'
            }`}>
              {administradores.length}
            </span>
          </button>
        </div>

        {/* TAB 1: SUGERENCIAS */}
        {activeTab === 'sugerencias' && (
          <div className="space-y-6">
            
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Search */}
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[#174D32] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, correo o mensaje..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white text-[#1F2E24] text-sm font-medium rounded-xl pl-10 pr-3.5 py-3 border border-[#C5DDCB] focus:outline-none focus:ring-2 focus:ring-[#4CAF50] shadow-sm"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  onClick={reloadData}
                  className="p-3 rounded-xl bg-white hover:bg-emerald-50 text-[#174D32] border border-[#C5DDCB] text-sm font-bold transition-colors cursor-pointer shadow-sm"
                  title="Actualizar datos"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>

                <button
                  onClick={handleDownloadExcel}
                  className="btn-shine px-5 py-3 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-xl"
                  title="Descargar tabla en formato compatible con Microsoft Excel"
                >
                  <FileSpreadsheet className="w-5 h-5" />
                  <span>Descargar en Excel</span>
                </button>

                <button
                  onClick={handleExportPythonSQL}
                  className="btn-shine px-4 py-3 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-[#174D32] border border-emerald-300 text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md"
                  title="Descargar base de datos compatible con Python y SQLite (instance/app.db)"
                >
                  <Database className="w-4 h-4 text-emerald-800" />
                  <span className="hidden sm:inline">Respaldo Python</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-3xl border border-[#C5DDCB] shadow-elevation-2 overflow-hidden">
              <div className="p-6 border-b border-[#E3F1E6] flex items-center justify-between bg-gradient-to-r from-[#F4FBF5] to-white">
                <div>
                  <h2 className="font-display font-bold text-xl text-[#1F2E24]">
                    Listado de sugerencias de reciclaje
                  </h2>
                  <p className="text-sm text-[#4A5A4E] mt-0.5">
                    Mostrando {filtered.length} de {sugerencias.length} registro(s)
                  </p>
                </div>
                <span className="text-xs sm:text-sm font-extrabold text-[#2E7D32] bg-emerald-100/90 px-3.5 py-1.5 rounded-full border border-emerald-300 shadow-xs">
                  Buzón Activo
                </span>
              </div>

              {filtered.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm sm:text-base">
                    <thead>
                      <tr className="bg-[#E8F5E9] text-[#174D32] font-extrabold border-b border-[#C5DDCB] text-sm">
                        <th className="py-4 px-5 w-14 text-center">ID</th>
                        <th className="py-4 px-5">Remitente</th>
                        <th className="py-4 px-5">Correo</th>
                        <th className="py-4 px-5">Mensaje</th>
                        <th className="py-4 px-5 whitespace-nowrap">Fecha</th>
                        <th className="py-4 px-5 text-center w-40">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E3F1E6]">
                      {filtered.map((s) => (
                        <tr key={s.id} className="hover:bg-[#F4FBF5] transition-colors">
                          <td className="py-4 px-5 font-mono font-bold text-center text-[#2E7D32]">
                            {s.id}
                          </td>
                          <td className="py-4 px-5 font-bold text-[#1F2E24]">
                            {s.nombre}
                          </td>
                          <td className="py-4 px-5 text-[#4A5A4E]">
                            <a href={`mailto:${s.correo}`} className="underline hover:text-[#2E7D32]">
                              {s.correo}
                            </a>
                          </td>
                          <td className="py-4 px-5 text-[#1F2E24] max-w-sm truncate text-sm" title={s.mensaje}>
                            {s.mensaje}
                          </td>
                          <td className="py-4 px-5 text-xs sm:text-sm font-mono text-[#4A5A4E] whitespace-nowrap">
                            {s.fecha}
                          </td>
                          <td className="py-4 px-5 text-center">
                            <div className="inline-flex items-center gap-2">
                              {/* Visualizar */}
                              <button
                                onClick={() => setViewingSugerencia(s)}
                                className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#174D32] transition-colors cursor-pointer shadow-xs border border-emerald-200"
                                title="Visualizar detalles completos"
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              {/* Editar */}
                              <button
                                onClick={() => handleStartEdit(s)}
                                className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors cursor-pointer shadow-xs border border-amber-200"
                                title="Editar sugerencia"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>

                              {/* Eliminar */}
                              <button
                                onClick={() => handleDelete(s)}
                                className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors cursor-pointer shadow-xs border border-rose-200"
                                title="Eliminar registro"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-12 text-center text-[#4A5A4E]">
                  <MessageSquare className="w-10 h-10 text-emerald-300 mx-auto mb-2" />
                  <p className="font-display font-bold text-lg text-[#1F2E24]">No se encontraron sugerencias</p>
                  <p className="text-xs">Los mensajes nuevos aparecerán aquí automáticamente.</p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: APARTADO DE ADMINISTRADORES */}
        {activeTab === 'administradores' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Lista de administradores */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-[#C5DDCB] shadow-md space-y-5">
              <div className="border-b border-[#E3F1E6] pb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-xl text-[#1F2E24] flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-[#2E7D32]" />
                    Administradores autorizados
                  </h3>
                  <p className="text-xs text-[#4A5A4E] mt-0.5">
                    Usuarios con permisos para ver, editar y descargar sugerencias
                  </p>
                </div>
                <span className="text-xs font-bold bg-emerald-100 text-[#174D32] px-2.5 py-1 rounded-full">
                  {administradores.length} activo(s)
                </span>
              </div>

              <div className="divide-y divide-[#E3F1E6]">
                {administradores.map((admin) => (
                  <div key={admin.id} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#174D32] flex items-center justify-center font-bold text-sm">
                        {admin.usuario.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-[#1F2E24]">{admin.usuario}</p>
                        <p className="text-[11px] text-[#4A5A4E]">ID #{admin.id} &bull; Acceso total</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setChangingPassAdmin(admin);
                          setNewPassword('');
                          setPassChangeStatus(null);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer border border-amber-200"
                        title="Cambiar contraseña de este administrador"
                      >
                        <KeyRound className="w-3.5 h-3.5" />
                        <span>Cambiar clave</span>
                      </button>

                      {administradores.length > 1 && (
                        <button
                          onClick={() => handleDeleteAdmin(admin)}
                          className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors cursor-pointer border border-rose-200"
                          title="Eliminar administrador"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Crear nuevo administrador */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-[#C5DDCB] shadow-md space-y-5">
              <div className="border-b border-[#E3F1E6] pb-4">
                <h3 className="font-display font-bold text-xl text-[#1F2E24] flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-[#2E7D32]" />
                  Nuevo Administrador
                </h3>
                <p className="text-xs text-[#4A5A4E] mt-0.5">
                  Crea una nueva cuenta con usuario y clave segura
                </p>
              </div>

              {adminStatus && (
                <div className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                  adminStatus.success
                    ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                    : 'bg-rose-100 text-rose-950 border border-rose-300'
                }`}>
                  {adminStatus.success ? <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-700 shrink-0" />}
                  <p>{adminStatus.message}</p>
                </div>
              )}

              <form onSubmit={handleCreateAdmin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#1F2E24] uppercase tracking-wider mb-1.5">
                    Nombre de usuario
                  </label>
                  <input
                    type="text"
                    value={newAdminUser}
                    onChange={(e) => setNewAdminUser(e.target.value)}
                    placeholder="Ej. coordinador, supervisor..."
                    required
                    className="w-full bg-[#F4FBF5] text-[#1F2E24] text-xs rounded-xl px-4 py-2.5 border border-[#C5DDCB] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1F2E24] uppercase tracking-wider mb-1.5">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    value={newAdminPass}
                    onChange={(e) => setNewAdminPass(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-[#F4FBF5] text-[#1F2E24] text-xs rounded-xl px-4 py-2.5 border border-[#C5DDCB] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                >
                  Guardar Nuevo Administrador
                </button>
              </form>
            </div>

          </div>
        )}

      </div>

      {/* MODAL 1: VISUALIZAR SUGERENCIA */}
      {viewingSugerencia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setViewingSugerencia(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#C5DDCB] relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setViewingSugerencia(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-[#174D32] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#2E7D32] flex items-center justify-center font-display font-bold text-xl">
                #{viewingSugerencia.id}
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-[#1F2E24]">
                  Detalles de la Sugerencia
                </h3>
                <span className="text-xs font-semibold text-[#2E7D32]">
                  Recibida en el buzón ciudadano
                </span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="bg-[#F4FBF5] p-3.5 rounded-2xl border border-[#C5DDCB]">
                <p className="text-[11px] font-bold text-[#4A5A4E] uppercase">Remitente</p>
                <p className="font-bold text-[#1F2E24] text-base mt-0.5">{viewingSugerencia.nombre}</p>
              </div>

              <div className="bg-[#F4FBF5] p-3.5 rounded-2xl border border-[#C5DDCB] flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#2E7D32]" />
                <div>
                  <p className="text-[11px] font-bold text-[#4A5A4E] uppercase">Correo Electrónico</p>
                  <a href={`mailto:${viewingSugerencia.correo}`} className="font-bold text-[#1F2E24] hover:underline">
                    {viewingSugerencia.correo}
                  </a>
                </div>
              </div>

              <div className="bg-[#F4FBF5] p-3.5 rounded-2xl border border-[#C5DDCB] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#2E7D32]" />
                <div>
                  <p className="text-[11px] font-bold text-[#4A5A4E] uppercase">Fecha de Envío</p>
                  <p className="font-mono text-[#1F2E24]">{viewingSugerencia.fecha}</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#C5DDCB]">
                <p className="text-[11px] font-bold text-[#4A5A4E] uppercase mb-1.5">Mensaje / Propuesta</p>
                <p className="text-[#1F2E24] whitespace-pre-wrap leading-relaxed text-sm">
                  {viewingSugerencia.mensaje}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2.5">
              <button
                onClick={() => {
                  const s = viewingSugerencia;
                  setViewingSugerencia(null);
                  handleStartEdit(s);
                }}
                className="px-4 py-2 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs transition-colors cursor-pointer"
              >
                Editar mensaje
              </button>
              <button
                onClick={() => setViewingSugerencia(null)}
                className="px-5 py-2 rounded-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: EDITAR SUGERENCIA */}
      {editingSugerencia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setEditingSugerencia(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#C5DDCB] relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setEditingSugerencia(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-[#174D32] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-display font-bold text-xl">
                <Edit3 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-[#1F2E24]">
                  Editar Sugerencia #{editingSugerencia.id}
                </h3>
                <span className="text-xs font-semibold text-[#4A5A4E]">
                  Modifica los datos del registro y guarda los cambios
                </span>
              </div>
            </div>

            {editError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 text-xs font-bold">
                {editError}
              </div>
            )}

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1F2E24] uppercase tracking-wider mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  value={editNombre}
                  onChange={(e) => setEditNombre(e.target.value)}
                  required
                  className="w-full bg-[#F4FBF5] text-[#1F2E24] text-xs rounded-xl px-3.5 py-2.5 border border-[#C5DDCB] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1F2E24] uppercase tracking-wider mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={editCorreo}
                  onChange={(e) => setEditCorreo(e.target.value)}
                  required
                  className="w-full bg-[#F4FBF5] text-[#1F2E24] text-xs rounded-xl px-3.5 py-2.5 border border-[#C5DDCB] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1F2E24] uppercase tracking-wider mb-1">
                  Mensaje o propuesta
                </label>
                <textarea
                  rows={4}
                  value={editMensaje}
                  onChange={(e) => setEditMensaje(e.target.value)}
                  required
                  className="w-full bg-[#F4FBF5] text-[#1F2E24] text-xs rounded-xl p-3.5 border border-[#C5DDCB] focus:outline-none focus:ring-2 focus:ring-[#4CAF50] resize-y"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingSugerencia(null)}
                  className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-[#1F2E24] text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: CAMBIAR CONTRASEÑA DE ADMINISTRADOR */}
      {changingPassAdmin && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setChangingPassAdmin(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#C5DDCB] relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setChangingPassAdmin(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-[#174D32] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-display font-bold text-lg text-[#1F2E24] mb-1">
              Cambiar Contraseña
            </h3>
            <p className="text-xs text-[#4A5A4E] mb-4">
              Para el administrador: <strong className="text-[#2E7D32]">{changingPassAdmin.usuario}</strong>
            </p>

            {passChangeStatus && (
              <div className={`mb-3 p-3 rounded-xl text-xs font-semibold ${
                passChangeStatus.success
                  ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                  : 'bg-rose-100 text-rose-950 border border-rose-300'
              }`}>
                {passChangeStatus.message}
              </div>
            )}

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1F2E24] uppercase mb-1">
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#F4FBF5] text-[#1F2E24] text-xs rounded-xl px-3.5 py-2.5 border border-[#C5DDCB] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setChangingPassAdmin(null)}
                  className="px-3 py-1.5 rounded-full bg-slate-100 text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 rounded-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold cursor-pointer"
                >
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
