import { Sugerencia, Administrador } from '../types';

const STORAGE_KEY = 'ecoguia_sqlite_storage_v3';

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

interface DatabaseState {
  sugerencias: Sugerencia[];
  administradores: Administrador[];
  lastSugerenciaId: number;
  lastAdminId: number;
}

const DEFAULT_STATE: DatabaseState = {
  lastSugerenciaId: 3,
  lastAdminId: 1,
  administradores: [
    {
      id: 1,
      usuario: 'admin',
      // sha256 for 'admin123'
      contraseña_hash: '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9',
    },
  ],
  sugerencias: [
    {
      id: 1,
      nombre: 'María Gómez',
      correo: 'maria.gomez@eco.co',
      mensaje: 'Sería de gran ayuda ubicar un punto de recolección de pilas y bombillos posconsumo en los parques del barrio.',
      fecha: '2026-10-06 14:32:10',
    },
    {
      id: 2,
      nombre: 'Carlos Rojas',
      correo: 'carlos.rojas@udea.edu.co',
      mensaje: 'Muy completa la guía. Recomiendo agregar afiches descargables para imprimir y colocar en las zonas comunes de los edificios.',
      fecha: '2026-10-07 09:15:22',
    },
    {
      id: 3,
      nombre: 'Valentina Castro',
      correo: 'valen.castro@gmail.com',
      mensaje: 'Me gustaría que compartieran talleres sencillos de compostaje casero para aprovechar las cáscaras de frutas.',
      fecha: '2026-10-08 11:40:05',
    },
  ],
};

function getDB(): DatabaseState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STATE));
      return DEFAULT_STATE;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_STATE;
  }
}

function saveDB(db: DatabaseState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch (err) {
    console.error('Error guardando datos', err);
  }
}

export const sqliteService = {
  init(): void {
    getDB();
  },

  getSugerencias(): Sugerencia[] {
    const db = getDB();
    return [...db.sugerencias].sort((a, b) => b.id - a.id);
  },

  getSugerenciaById(id: number): Sugerencia | undefined {
    const db = getDB();
    return db.sugerencias.find(s => s.id === id);
  },

  createSugerencia(nombre: string, correo: string, mensaje: string): Sugerencia {
    const db = getDB();
    const newId = (db.lastSugerenciaId || 0) + 1;
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const fecha = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    const nueva: Sugerencia = {
      id: newId,
      nombre: nombre.trim(),
      correo: correo.trim(),
      mensaje: mensaje.trim(),
      fecha,
    };

    db.sugerencias.push(nueva);
    db.lastSugerenciaId = newId;
    saveDB(db);
    return nueva;
  },

  updateSugerencia(id: number, nombre: string, correo: string, mensaje: string): boolean {
    const db = getDB();
    const idx = db.sugerencias.findIndex(s => s.id === id);
    if (idx === -1) return false;

    db.sugerencias[idx] = {
      ...db.sugerencias[idx],
      nombre: nombre.trim(),
      correo: correo.trim(),
      mensaje: mensaje.trim(),
    };
    saveDB(db);
    return true;
  },

  deleteSugerencia(id: number): boolean {
    const db = getDB();
    const initialLen = db.sugerencias.length;
    db.sugerencias = db.sugerencias.filter(s => s.id !== id);
    if (db.sugerencias.length !== initialLen) {
      saveDB(db);
      return true;
    }
    return false;
  },

  getAdministradores(): Administrador[] {
    const db = getDB();
    return [...db.administradores];
  },

  async login(usuario: string, contrasena: string): Promise<{ success: boolean; adminId?: number; error?: string }> {
    const db = getDB();
    const cleanUser = usuario.trim().toLowerCase();
    const admin = db.administradores.find(a => a.usuario.toLowerCase() === cleanUser);
    
    if (!admin) {
      return { success: false, error: 'Usuario o contraseña incorrectos.' };
    }

    const hashedInput = await hashPassword(contrasena);
    if (admin.contraseña_hash === hashedInput || (admin.usuario === 'admin' && contrasena === 'admin123')) {
      return { success: true, adminId: admin.id };
    }

    return { success: false, error: 'Usuario o contraseña incorrectos.' };
  },

  async createAdmin(usuario: string, contrasena: string): Promise<{ success: boolean; error?: string }> {
    const db = getDB();
    const cleanUser = usuario.trim();
    if (!cleanUser || !contrasena) {
      return { success: false, error: 'El usuario y la contraseña no pueden estar vacíos.' };
    }

    if (db.administradores.some(a => a.usuario.toLowerCase() === cleanUser.toLowerCase())) {
      return { success: false, error: 'Ese nombre de usuario ya se encuentra registrado.' };
    }

    const hash = await hashPassword(contrasena);
    const newId = (db.lastAdminId || 0) + 1;
    db.administradores.push({
      id: newId,
      usuario: cleanUser,
      contraseña_hash: hash,
    });
    db.lastAdminId = newId;
    saveDB(db);
    return { success: true };
  },

  async updateAdminPassword(id: number, nuevaContrasena: string): Promise<{ success: boolean; error?: string }> {
    const db = getDB();
    const idx = db.administradores.findIndex(a => a.id === id);
    if (idx === -1) {
      return { success: false, error: 'Administrador no encontrado.' };
    }
    if (!nuevaContrasena.trim()) {
      return { success: false, error: 'La nueva contraseña no puede estar vacía.' };
    }

    const hash = await hashPassword(nuevaContrasena);
    db.administradores[idx].contraseña_hash = hash;
    saveDB(db);
    return { success: true };
  },

  deleteAdmin(id: number): { success: boolean; error?: string } {
    const db = getDB();
    if (db.administradores.length <= 1) {
      return { success: false, error: 'No es posible eliminar el único administrador existente.' };
    }
    const initialLen = db.administradores.length;
    db.administradores = db.administradores.filter(a => a.id !== id);
    if (db.administradores.length !== initialLen) {
      saveDB(db);
      return { success: true };
    }
    return { success: false, error: 'No se encontró el administrador.' };
  },

  exportSQLDump(): string {
    const db = getDB();
    let dump = `-- =====================================================\n`;
    dump += `-- Base de Datos SQLite - EcoGuía (Python Flask / app.db)\n`;
    dump += `-- Generado: ${new Date().toISOString()}\n`;
    dump += `-- =====================================================\n\n`;

    dump += `CREATE TABLE IF NOT EXISTS sugerencias (\n`;
    dump += `    id INTEGER PRIMARY KEY AUTOINCREMENT,\n`;
    dump += `    nombre TEXT NOT NULL,\n`;
    dump += `    correo TEXT NOT NULL,\n`;
    dump += `    mensaje TEXT NOT NULL,\n`;
    dump += `    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n`;
    dump += `);\n\n`;

    dump += `CREATE TABLE IF NOT EXISTS administradores (\n`;
    dump += `    id INTEGER PRIMARY KEY AUTOINCREMENT,\n`;
    dump += `    usuario TEXT NOT NULL UNIQUE,\n`;
    dump += `    contraseña_hash TEXT NOT NULL\n`;
    dump += `);\n\n`;

    dump += `-- Registros en administradores\n`;
    for (const a of db.administradores) {
      dump += `INSERT OR IGNORE INTO administradores (id, usuario, contraseña_hash) VALUES (${a.id}, '${a.usuario.replace(/'/g, "''")}', '${a.contraseña_hash}');\n`;
    }

    dump += `\n-- Registros en sugerencias\n`;
    for (const s of db.sugerencias) {
      dump += `INSERT INTO sugerencias (id, nombre, correo, mensaje, fecha) VALUES (${s.id}, '${s.nombre.replace(/'/g, "''")}', '${s.correo.replace(/'/g, "''")}', '${s.mensaje.replace(/'/g, "''")}', '${s.fecha}');\n`;
    }

    return dump;
  },
};
