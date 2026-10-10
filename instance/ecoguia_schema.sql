-- ==========================================================
-- EcoGuía3R · Esquema DDL de Tablas e Índices (SQLite)
-- Generado: 2026-10-10 00:14:30
-- ==========================================================

CREATE TABLE administradores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario TEXT NOT NULL UNIQUE,
            contraseña_hash TEXT NOT NULL
        );

CREATE TABLE sqlite_sequence(name,seq);

CREATE TABLE sugerencias (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            correo TEXT NOT NULL,
            mensaje TEXT NOT NULL,
            fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

