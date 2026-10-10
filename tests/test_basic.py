import sys
import os
import unittest
import tempfile
import sqlite3
from pathlib import Path

# Agregar raíz del proyecto al path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.recycling_logic import (
    clasificar_residuo,
    calcular_ahorro_ecologico,
    normalizar_texto,
    obtener_estadisticas_db,
    exportar_sugerencias_json,
    exportar_sugerencias_csv,
    exportar_database_sql,
    exportar_schema_sql,
    REGLAS_RESIDUOS
)


class TestEcoGuiaLogica(unittest.TestCase):
    """Pruebas unitarias para la lógica de negocio y clasificación de EcoGuía3R."""

    def test_normalizar_texto(self):
        self.assertEqual(normalizar_texto("Plástico, botellas."), "plastico botellas")
        self.assertEqual(normalizar_texto("Cáscara de Plátano"), "cascara de platano")
        self.assertEqual(normalizar_texto(""), "")

    def test_clasificacion_blanco_aprovechable(self):
        # Botellas y plásticos
        res = clasificar_residuo("botella de plástico PET")
        self.assertTrue(res["exito"])
        self.assertEqual(res["color_codigo"], "blanco")
        self.assertEqual(res["color"], "Blanco")
        self.assertIn("Aprovechables", res["categoria"])

        # Vidrio
        res_vidrio = clasificar_residuo("frasco de vidrio")
        self.assertEqual(res_vidrio["color_codigo"], "blanco")

        # Papel y cartón
        res_papel = clasificar_residuo("cajas de cartón corrugado")
        self.assertEqual(res_papel["color_codigo"], "blanco")

    def test_clasificacion_verde_organicos(self):
        res = clasificar_residuo("cáscaras de manzana y café")
        self.assertTrue(res["exito"])
        self.assertEqual(res["color_codigo"], "verde")
        self.assertEqual(res["color"], "Verde")
        self.assertIn("Orgánicos", res["categoria"])

    def test_clasificacion_negro_no_aprovechables(self):
        res = clasificar_residuo("papel higiénico y servilletas usadas")
        self.assertTrue(res["exito"])
        self.assertEqual(res["color_codigo"], "negro")
        self.assertEqual(res["color"], "Negro")

        res_icopor = clasificar_residuo("vaso de icopor sucio")
        self.assertEqual(res_icopor["color_codigo"], "negro")

    def test_clasificacion_rojo_peligrosos(self):
        res = clasificar_residuo("pilas y baterías alcalinas")
        self.assertTrue(res["exito"])
        self.assertEqual(res["color_codigo"], "rojo")
        self.assertEqual(res["color"], "Rojo")
        self.assertIn("Peligrosos", res["categoria"])

    def test_calculadora_impacto_ecologico(self):
        calculo = calcular_ahorro_ecologico(10.0, "plastico")
        self.assertEqual(calculo["kilos_procesados"], 10.0)
        self.assertGreater(calculo["co2_evitado_kg"], 0)
        self.assertGreater(calculo["agua_ahorrada_litros"], 0)
        self.assertGreater(calculo["energia_ahorrada_kwh"], 0)
        self.assertGreater(calculo["arboles_preservados_equiv"], 0)

    def test_persistencia_sqlite_y_exportaciones(self):
        # Crear base de datos temporal
        with tempfile.NamedTemporaryFile(suffix=".db", delete=False) as tmp:
            tmp_db_path = tmp.name

        try:
            conn = sqlite3.connect(tmp_db_path)
            cur = conn.cursor()
            cur.execute("""
                CREATE TABLE sugerencias (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nombre TEXT NOT NULL,
                    correo TEXT NOT NULL,
                    mensaje TEXT NOT NULL,
                    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            cur.execute("""
                CREATE TABLE administradores (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    usuario TEXT NOT NULL UNIQUE,
                    contraseña_hash TEXT NOT NULL
                )
            """)

            # Insertar registro de prueba
            cur.execute(
                "INSERT INTO sugerencias (nombre, correo, mensaje) VALUES (?, ?, ?)",
                ("Eco Test", "test@ecoguia.org", "Prueba de persistencia SQLite")
            )
            conn.commit()
            conn.close()

            # Verificar consulta con módulo Python
            stats = obtener_estadisticas_db(tmp_db_path)
            self.assertEqual(stats["total_sugerencias"], 1)
            self.assertEqual(stats["ultimas_sugerencias"][0]["nombre"], "Eco Test")

            # Probar exportación JSON
            tmp_json = tmp_db_path + ".json"
            exportar_sugerencias_json(tmp_db_path, tmp_json)
            self.assertTrue(os.path.exists(tmp_json))
            if os.path.exists(tmp_json):
                os.remove(tmp_json)

            # Probar exportación CSV
            tmp_csv = tmp_db_path + ".csv"
            exportar_sugerencias_csv(tmp_db_path, tmp_csv)
            self.assertTrue(os.path.exists(tmp_csv))
            if os.path.exists(tmp_csv):
                os.remove(tmp_csv)

            # Probar exportación de volcado SQL completo
            tmp_sql = tmp_db_path + ".sql"
            res_sql = exportar_database_sql(tmp_db_path, tmp_sql)
            self.assertTrue(res_sql)
            self.assertTrue(os.path.exists(tmp_sql))
            with open(tmp_sql, "r", encoding="utf-8") as f:
                sql_content = f.read()
                self.assertIn("CREATE TABLE", sql_content)
                self.assertIn("INSERT INTO", sql_content)
                self.assertIn("sugerencias", sql_content)
            if os.path.exists(tmp_sql):
                os.remove(tmp_sql)

            # Probar exportación de esquema DDL
            tmp_schema = tmp_db_path + "_schema.sql"
            res_schema = exportar_schema_sql(tmp_db_path, tmp_schema)
            self.assertTrue(res_schema)
            self.assertTrue(os.path.exists(tmp_schema))
            with open(tmp_schema, "r", encoding="utf-8") as f:
                schema_content = f.read()
                self.assertIn("CREATE TABLE", schema_content)
                self.assertIn("administradores", schema_content)
            if os.path.exists(tmp_schema):
                os.remove(tmp_schema)

        finally:
            if os.path.exists(tmp_db_path):
                os.remove(tmp_db_path)


if __name__ == "__main__":
    unittest.main()
