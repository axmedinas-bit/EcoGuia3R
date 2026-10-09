export interface Sugerencia {
  id: number;
  nombre: string;
  correo: string;
  mensaje: string;
  fecha: string;
}

export interface Administrador {
  id: number;
  usuario: string;
  contraseña_hash: string;
}

export interface ResiduoItem {
  nombre: string;
  emoji: string;
  tipo: 'verde' | 'blanco' | 'negro';
  categoria: string;
  explicacion: string;
}

export interface ContenedorInfo {
  id: 'verde' | 'blanco' | 'negro';
  nombre: string;
  color: string;
  colorClase: string;
  subtitulo: string;
  descripcion: string;
  ejemplos: string[];
  icono: string;
}
