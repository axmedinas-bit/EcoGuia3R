"""
app/recycling_logic.py - Módulo de Lógica de Negocio y Clasificación en Python
EcoGuía3R · Plataforma Educativa sobre Separación en la Fuente
"""

import json
import sqlite3
import csv
from pathlib import Path
from datetime import datetime
from typing import Dict, Any, List, Optional

# Diccionario de materiales y reglas según Resolución 2184 / Código de Colores 3R
REGLAS_RESIDUOS = {
    "blanco": {
        "color": "Blanco",
        "categoria": "Aprovechables",
        "descripcion": "Residuos limpios y secos que pueden transformarse en nuevos productos.",
        "ejemplos": [
            "plastico", "botella", "bolsa", "envase", "tapa", "pet",
            "vidrio", "cristal", "frasco", "tarro",
            "papel", "periodico", "revista", "hoja", "cuaderno", "archivo",
            "carton", "caja", "tetra pak", "tetrapak",
            "metal", "aluminio", "lata", "cobre", "hierro"
        ],
        "instrucciones": "Lavar, escurrir y secar. Retirar tapas y aplastar botellas para ahorrar espacio."
    },
    "verde": {
        "color": "Verde",
        "categoria": "Orgánicos Aprovechables",
        "descripcion": "Restos biológicos que pueden convertirse en compost, abono o biogás.",
        "ejemplos": [
            "cascara", "fruta", "verdura", "comida", "sobras", "huevo",
            "hojarasca", "poda", "pasto", "rama", "flores", "jardin",
            "cafe", "borra", "te", "bolsita de te", "huesos"
        ],
        "instrucciones": "Depositar sin bolsas plásticas, no mezclar con carnes en descomposición masiva ni líquidos."
    },
    "negro": {
        "color": "Negro",
        "categoria": "No Aprovechables (Ordinarios)",
        "descripcion": "Residuos que no pueden reciclarse ni biodegradarse fácilmente y van al relleno sanitario.",
        "ejemplos": [
            "papel higienico", "higienico", "servilleta", "toalla de papel", "panal", "toalla higienica",
            "colilla", "icopor", "poliestireno", "envoltura", "paquete", "papas", "chitos",
            "metalizado", "carton sucio", "papel engrasado", "grasa", "barrido", "polvo", "loza rota"
        ],
        "instrucciones": "Empacar bien en bolsas selladas para facilitar la recolección sin esparcir olores."
    },
    "rojo": {
        "color": "Rojo",
        "categoria": "Peligrosos y Especiales",
        "descripcion": "Materiales con sustancias químicas, biológicas o componentes tóxicos.",
        "ejemplos": [
            "pila", "bateria", "acumulador",
            "medicamento", "pastilla", "jeringa", "aguja",
            "bombillo", "fluorescente", "foco", "termometro",
            "aceite usado", "aceite de cocina", "pintura", "solvente", "insecticida",
            "celular", "electronico", "computador", "cable", "raee"
        ],
        "instrucciones": "Llevar a puntos posconsumo designados (centros comerciales, almacenes de cadena o droguerías)."
    }
}

# Factores de conversión ambiental promedio por kilogramo reciclado
FACTORES_AHORRO = {
    "plastico": {"co2_kg": 1.5, "agua_litros": 24, "energia_kwh": 5.6},
    "papel": {"co2_kg": 0.9, "agua_litros": 26, "energia_kwh": 4.0},
    "carton": {"co2_kg": 0.8, "agua_litros": 20, "energia_kwh": 3.5},
    "vidrio": {"co2_kg": 0.3, "agua_litros": 4, "energia_kwh": 1.2},
    "metal": {"co2_kg": 2.1, "agua_litros": 15, "energia_kwh": 14.0},
    "organico": {"co2_kg": 0.5, "agua_litros": 2, "energia_kwh": 0.5},
}


def normalizar_texto(texto: str) -> str:
    """Elimina tildes, signos de puntuación y convierte a minúsculas."""
    if not texto:
        return ""
    texto = texto.lower().strip()
    reemplazos = {
        "á": "a", "é": "e", "í": "i", "ó": "o", "ú": "u", "ñ": "n",
        ",": "", ".": "", "-": " ", "_": " "
    }
    for orig, rep in reemplazos.items():
        texto = texto.replace(orig, rep)
    return texto


import re

def clasificar_residuo(material: str) -> Dict[str, Any]:
    """
    Clasifica un material en el código de colores correspondiente utilizando
    análisis léxico y coincidencia de patrones por orden de especificidad.
    """
    normalizado = normalizar_texto(material)
    if not normalizado:
        return {
            "exito": False,
            "mensaje": "Debes ingresar el nombre de un material o residuo.",
            "color": "Desconocido",
            "categoria": "Sin clasificar"
        }

    # Recolectar todos los pares (palabra_clave, codigo_color, data) y ordenar por longitud descendente
    todos_criterios = []
    for codigo_color, data in REGLAS_RESIDUOS.items():
        for kw in data["ejemplos"]:
            todos_criterios.append((kw, codigo_color, data))

    # Las frases más largas y específicas se evalúan primero (ej: "papel higienico" antes que "papel")
    todos_criterios.sort(key=lambda item: len(item[0]), reverse=True)

    palabras = set(re.findall(r'\b\w+\b', normalizado))

    for keyword, codigo_color, data in todos_criterios:
        kw_norm = normalizar_texto(keyword)
        # Si es una frase compuesta de varias palabras:
        if " " in kw_norm:
            if kw_norm in normalizado:
                return {
                    "exito": True,
                    "material_consultado": material,
                    "color_codigo": codigo_color,
                    "color": data["color"],
                    "categoria": data["categoria"],
                    "descripcion": data["descripcion"],
                    "instrucciones": data["instrucciones"],
                    "coincidencia": keyword
                }
        else:
            # Si es palabra simple, buscar límite de palabra o plural
            patron = rf"\b{re.escape(kw_norm)}(?:s|es)?\b"
            if re.search(patron, normalizado) or kw_norm in palabras:
                return {
                    "exito": True,
                    "material_consultado": material,
                    "color_codigo": codigo_color,
                    "color": data["color"],
                    "categoria": data["categoria"],
                    "descripcion": data["descripcion"],
                    "instrucciones": data["instrucciones"],
                    "coincidencia": keyword
                }

    # Si no hay coincidencia exacta, se asigna sugerencia por defecto (generalmente negro si es ordinario)
    return {
        "exito": True,
        "material_consultado": material,
        "color_codigo": "negro",
        "color": "Negro",
        "categoria": "No Aprovechables / Pendiente por verificar",
        "descripcion": "Si el material está contaminado con grasas, comida o fluidos, deposítalo en el contenedor negro.",
        "instrucciones": "Verifica si el material está completamente limpio y seco para evaluar si puede ser reciclable (Blanco).",
        "coincidencia": "defecto"
    }


def calcular_ahorro_ecologico(kilos: float, tipo_material: str = "plastico") -> Dict[str, Any]:
    """
    Calcula el impacto ecológico positivo (CO2 ahorrado, agua y energía).
    """
    kilos = max(0.0, float(kilos))
    tipo_norm = normalizar_texto(tipo_material)
    factor = FACTORES_AHORRO.get(tipo_norm, FACTORES_AHORRO["plastico"])

    co2_ahorrado = round(kilos * factor["co2_kg"], 2)
    agua_ahorrada = round(kilos * factor["agua_litros"], 2)
    energia_ahorrada = round(kilos * factor["energia_kwh"], 2)
    arboles_equivalentes = round(kilos * 0.017, 3)

    return {
        "kilos_procesados": kilos,
        "tipo_material": tipo_material,
        "co2_evitado_kg": co2_ahorrado,
        "agua_ahorrada_litros": agua_ahorrada,
        "energia_ahorrada_kwh": energia_ahorrada,
        "arboles_preservados_equiv": arboles_equivalentes
    }


def obtener_estadisticas_db(db_path: str = "instance/app.db") -> Dict[str, Any]:
    """
    Genera un informe analítico en Python a partir de la base de datos SQLite.
    """
    path = Path(db_path)
    if not path.exists():
        return {
            "estado": "sin_base_de_datos",
            "total_sugerencias": 0,
            "total_administradores": 0,
            "ultimas_sugerencias": []
        }

    conn = sqlite3.connect(str(path))
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    try:
        cur.execute("SELECT COUNT(*) as cant FROM sugerencias")
        total_sug = cur.fetchone()["cant"]

        cur.execute("SELECT COUNT(*) as cant FROM administradores")
        total_admin = cur.fetchone()["cant"]

        cur.execute("SELECT id, nombre, correo, mensaje, fecha FROM sugerencias ORDER BY id DESC LIMIT 5")
        ultimas = [dict(row) for row in cur.fetchall()]

        return {
            "estado": "activo",
            "ruta_db": str(path.resolve()),
            "total_sugerencias": total_sug,
            "total_administradores": total_admin,
            "ultimas_sugerencias": ultimas,
            "fecha_consulta": datetime.now().isoformat()
        }
    except sqlite3.OperationalError as e:
        return {
            "estado": "error",
            "mensaje": str(e),
            "total_sugerencias": 0,
            "total_administradores": 0
        }
    finally:
        conn.close()


def exportar_sugerencias_json(db_path: str = "instance/app.db", output_path: str = "dist/api_sugerencias.json") -> bool:
    """Exporta las sugerencias de la base de datos a un archivo JSON."""
    stats = obtener_estadisticas_db(db_path)
    output = Path(output_path)
    output.parent.mkdir(parents=True, exist_ok=True)

    with open(output, "w", encoding="utf-8") as f:
        json.dump(stats, f, ensure_ascii=False, indent=2)
    return True


def exportar_sugerencias_csv(db_path: str = "instance/app.db", output_path: str = "instance/sugerencias_export.csv") -> bool:
    """Exporta todas las sugerencias a un archivo CSV estructurado."""
    path = Path(db_path)
    if not path.exists():
        return False

    conn = sqlite3.connect(str(path))
    cur = conn.cursor()
    cur.execute("SELECT id, nombre, correo, mensaje, fecha FROM sugerencias ORDER BY id ASC")
    rows = cur.fetchall()
    conn.close()

    out_file = Path(output_path)
    out_file.parent.mkdir(parents=True, exist_ok=True)

    with open(out_file, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["ID", "Nombre", "Correo", "Mensaje", "Fecha"])
        writer.writerows(rows)
    return True


def exportar_database_sql(db_path: str = "instance/app.db", output_path: str = "instance/ecoguia_database.sql") -> bool:
    """
    Genera un volcado SQL completo (dump) de la base de datos SQLite con estructura y datos.
    """
    path = Path(db_path)
    if not path.exists():
        return False

    conn = sqlite3.connect(str(path))
    out_file = Path(output_path)
    out_file.parent.mkdir(parents=True, exist_ok=True)

    header = (
        "-- ==========================================================\n"
        "-- EcoGuía3R · Dump de Base de Datos SQLite\n"
        f"-- Generado: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n"
        "-- ==========================================================\n"
        "PRAGMA foreign_keys=OFF;\n"
        "BEGIN TRANSACTION;\n"
    )

    with open(out_file, "w", encoding="utf-8") as f:
        f.write(header)
        for line in conn.iterdump():
            if line not in ("BEGIN TRANSACTION;", "COMMIT;"):
                f.write(f"{line}\n")
        f.write("COMMIT;\n")

    conn.close()
    return True


def exportar_schema_sql(db_path: str = "instance/app.db", output_path: str = "instance/ecoguia_schema.sql") -> bool:
    """
    Genera un archivo SQL que contiene únicamente el esquema DDL (tablas e índices).
    """
    path = Path(db_path)
    if not path.exists():
        return False

    conn = sqlite3.connect(str(path))
    cur = conn.cursor()
    cur.execute("SELECT sql FROM sqlite_master WHERE type IN ('table', 'index') AND sql IS NOT NULL ORDER BY type DESC, name")
    rows = cur.fetchall()
    conn.close()

    out_file = Path(output_path)
    out_file.parent.mkdir(parents=True, exist_ok=True)

    header = (
        "-- ==========================================================\n"
        "-- EcoGuía3R · Esquema DDL de Tablas e Índices (SQLite)\n"
        f"-- Generado: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n"
        "-- ==========================================================\n\n"
    )

    with open(out_file, "w", encoding="utf-8") as f:
        f.write(header)
        for row in rows:
            ddl = row[0]
            if ddl:
                f.write(f"{ddl};\n\n")

    return True

