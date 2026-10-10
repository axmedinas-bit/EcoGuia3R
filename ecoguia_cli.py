#!/usr/bin/env python3
"""
ecoguia_cli.py - Interfaz de Línea de Comandos (CLI) en Python para EcoGuía3R
Herramienta administrativa, pedagógica y de gestión para la terminal.

Uso:
    python3 ecoguia_cli.py --menu
    python3 ecoguia_cli.py --clasificar "botella de gaseosa"
    python3 ecoguia_cli.py --listar
    python3 ecoguia_cli.py --agregar "María Gómez" "maria@correo.com" "Instalar punto ecológico"
    python3 ecoguia_cli.py --estadisticas
    python3 ecoguia_cli.py --calculadora 10 "plastico"
    python3 ecoguia_cli.py --exportar-json
    python3 ecoguia_cli.py --exportar-csv
"""

import sys
import os
import argparse
import sqlite3
from pathlib import Path

# Agregar directorio actual al path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from app.recycling_logic import (
    clasificar_residuo,
    calcular_ahorro_ecologico,
    obtener_estadisticas_db,
    exportar_sugerencias_json,
    exportar_sugerencias_csv,
    REGLAS_RESIDUOS
)

DB_PATH = "instance/app.db"


def imprimir_encabezado():
    print("""
╔═══════════════════════════════════════════════════════════╗
║                   🌱 EcoGuía3R CLI ♻️                      ║
║      Consola de Gestión y Clasificación de Residuos       ║
║                    Lenguaje: Python 3                     ║
╚═══════════════════════════════════════════════════════════╝
    """)


def comando_clasificar(material: str):
    resultado = clasificar_residuo(material)
    print(f"\n🔍 Resultado para: '{material}'")
    print("─" * 50)
    print(f"📦 Contenedor:    {resultado['color'].upper()}")
    print(f"🏷️  Categoría:     {resultado['categoria']}")
    print(f"ℹ️  Descripción:   {resultado['descripcion']}")
    print(f"💡 Instrucción:   {resultado['instrucciones']}\n")


def comando_listar():
    stats = obtener_estadisticas_db(DB_PATH)
    print(f"\n📋 Total de sugerencias registradas: {stats['total_sugerencias']}")
    print("═" * 65)

    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("SELECT id, nombre, correo, mensaje, fecha FROM sugerencias ORDER BY id DESC")
    filas = cur.fetchall()
    conn.close()

    if not filas:
        print("  (No hay sugerencias en la base de datos)")
        return

    for fila in filas:
        print(f"ID #{fila[0]} | Fecha: {fila[4]}")
        print(f"👤 De: {fila[1]} <{fila[2]}>")
        print(f"💬 Mensaje: {fila[3]}")
        print("─" * 65)


def comando_agregar(nombre: str, correo: str, mensaje: str):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO sugerencias (nombre, correo, mensaje) VALUES (?, ?, ?)",
        (nombre, correo, mensaje)
    )
    conn.commit()
    nuevo_id = cur.lastrowid
    conn.close()
    print(f"\n✅ Sugerencia registrada exitosamente con ID #{nuevo_id}.")


def comando_estadisticas():
    stats = obtener_estadisticas_db(DB_PATH)
    print("\n📊 Estadísticas del Sistema EcoGuía3R")
    print("─" * 45)
    print(f"• Total Sugerencias Ciudadanas: {stats['total_sugerencias']}")
    print(f"• Total Administradores:        {stats['total_administradores']}")
    print(f"• Base de datos activa:         {stats.get('ruta_db', 'SQLite')}")
    print(f"• Última verificación:          {stats.get('fecha_consulta', 'N/A')}\n")


def comando_calculadora(kilos: float, tipo: str):
    res = calcular_ahorro_ecologico(kilos, tipo)
    print(f"\n🌍 Calculadora de Impacto Ecológico")
    print(f"⚖️  Kilos reciclados:      {res['kilos_procesados']} kg de {res['tipo_material']}")
    print("─" * 45)
    print(f"🌿 CO2 evitado:           {res['co2_evitado_kg']} kg")
    print(f"💧 Agua ahorrada:         {res['agua_ahorrada_litros']} litros")
    print(f"⚡ Energía ahorrada:      {res['energia_ahorrada_kwh']} kWh")
    print(f"🌳 Árboles equivalentes:  {res['arboles_preservados_equiv']}\n")


def menu_interactivo():
    imprimir_encabezado()
    while True:
        print("\n[Menú Principal]")
        print("1. 🔍 Clasificar un residuo o material")
        print("2. 📋 Ver sugerencias ciudadanas (SQLite)")
        print("3. ✍️  Agregar nueva sugerencia")
        print("4. 🌍 Calculadora de ahorro ecológico")
        print("5. 📊 Ver estadísticas de la base de datos")
        print("6. 💾 Exportar datos a JSON y CSV")
        print("7. 🚪 Salir")

        opcion = input("\nSelecciona una opción (1-7): ").strip()

        if opcion == "1":
            mat = input("Ingresa el residuo (ej. 'botella de plástico', 'cáscara de plátano'): ").strip()
            if mat:
                comando_clasificar(mat)
        elif opcion == "2":
            comando_listar()
        elif opcion == "3":
            nom = input("Tu nombre: ").strip()
            cor = input("Tu correo: ").strip()
            men = input("Tu sugerencia: ").strip()
            if nom and cor and men:
                comando_agregar(nom, cor, men)
            else:
                print("⚠️ Todos los campos son requeridos.")
        elif opcion == "4":
            try:
                kg = float(input("Cantidad en kilogramos (kg): ").strip())
                tipo = input("Tipo (plastico, papel, carton, vidrio, metal, organico): ").strip()
                comando_calculadora(kg, tipo)
            except ValueError:
                print("⚠️ Por favor ingresa un número válido.")
        elif opcion == "5":
            comando_estadisticas()
        elif opcion == "6":
            exportar_sugerencias_json()
            exportar_sugerencias_csv()
            print("✅ Datos exportados exitosamente a dist/api_sugerencias.json e instance/sugerencias_export.csv")
        elif opcion == "7":
            print("\n👋 ¡Gracias por usar EcoGuía3R CLI!")
            break
        else:
            print("⚠️ Opción no válida.")


def main():
    parser = argparse.ArgumentParser(description="CLI en Python para la plataforma EcoGuía3R.")
    parser.add_argument("--menu", action="store_true", help="Iniciar menú interactivo en terminal")
    parser.add_argument("--clasificar", type=str, help="Clasificar un residuo")
    parser.add_argument("--listar", action="store_true", help="Listar sugerencias de la base de datos")
    parser.add_argument("--agregar", nargs=3, metavar=("NOMBRE", "CORREO", "MENSAJE"), help="Agregar sugerencia")
    parser.add_argument("--estadisticas", action="store_true", help="Ver estadísticas de la base de datos")
    parser.add_argument("--calculadora", nargs=2, metavar=("KILOS", "TIPO"), help="Calcular ahorro ecológico")
    parser.add_argument("--exportar-json", action="store_true", help="Exportar datos a JSON")
    parser.add_argument("--exportar-csv", action="store_true", help="Exportar datos a CSV")

    args = parser.parse_args()

    # Si no se pasan argumentos, iniciar menú por defecto
    if len(sys.argv) == 1 or args.menu:
        menu_interactivo()
        return

    imprimir_encabezado()

    if args.clasificar:
        comando_clasificar(args.clasificar)
    if args.listar:
        comando_listar()
    if args.agregar:
        comando_agregar(args.agregar[0], args.agregar[1], args.agregar[2])
    if args.estadisticas:
        comando_estadisticas()
    if args.calculadora:
        try:
            comando_calculadora(float(args.calculadora[0]), args.calculadora[1])
        except ValueError:
            print("⚠️ Error: Los kilos deben ser un valor numérico.")
    if args.exportar_json:
        exportar_sugerencias_json()
        print("✅ Archivo exportado a dist/api_sugerencias.json")
    if args.exportar_csv:
        exportar_sugerencias_csv()
        print("✅ Archivo exportado a instance/sugerencias_export.csv")


if __name__ == "__main__":
    main()
