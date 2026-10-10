-- ==========================================================
-- EcoGuía3R · Dump de Base de Datos SQLite
-- Generado: 2026-10-10 00:31:20
-- ==========================================================
PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE administradores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario TEXT NOT NULL UNIQUE,
            contraseña_hash TEXT NOT NULL
        );
INSERT INTO "administradores" VALUES(1,'admin','240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9');
CREATE TABLE sugerencias (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            correo TEXT NOT NULL,
            mensaje TEXT NOT NULL,
            fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
INSERT INTO "sugerencias" VALUES(1,'María Gómez','maria.gomez@eco.co','Instalar puntos limpios de pilas y bombillos posconsumo en los parques.','2026-10-09 00:59:10');
INSERT INTO "sugerencias" VALUES(2,'Carlos Rojas','carlos.rojas@udea.edu.co','Agregar infografías descargables para las zonas comunes de conjuntos residenciales.','2026-10-09 00:59:10');
INSERT INTO "sugerencias" VALUES(3,'Valentina Castro','valen.castro@gmail.com','Talleres comunitarios de compostaje para aprovechar la caneca verde.','2026-10-09 00:59:10');
DELETE FROM "sqlite_sequence";
INSERT INTO "sqlite_sequence" VALUES('administradores',1);
INSERT INTO "sqlite_sequence" VALUES('sugerencias',3);
COMMIT;
