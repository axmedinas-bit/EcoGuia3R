from flask import render_template, request, redirect, url_for, flash, session, jsonify
from werkzeug.security import check_password_hash
from app.db import get_connection
from app.recycling_logic import (
    clasificar_residuo,
    calcular_ahorro_ecologico,
    obtener_estadisticas_db,
    REGLAS_RESIDUOS
)

def register_routes(app):
    @app.route("/")
    def index():
        return render_template("index.html")

    # ================= RUTAS WEB FORMULARIOS =================
    @app.route("/sugerencias", methods=["POST"])
    def create_suggestion():
        nombre = request.form.get("nombre", "").strip()
        correo = request.form.get("correo", "").strip()
        mensaje = request.form.get("mensaje", "").strip()

        if not nombre or not correo or not mensaje:
            flash("Todos los campos son obligatorios.")
            return redirect(url_for("index"))

        conn = get_connection()
        cur = conn.cursor()
        cur.execute(
            """
            INSERT INTO sugerencias (nombre, correo, mensaje)
            VALUES (?, ?, ?)
            """,
            (nombre, correo, mensaje)
        )
        conn.commit()
        conn.close()

        flash("Sugerencia enviada correctamente.")
        return redirect(url_for("index"))

    @app.route("/login", methods=["GET", "POST"])
    def login():
        if request.method == "POST":
            usuario = request.form.get("usuario", "").strip()
            contrasena = request.form.get("contrasena", "")

            conn = get_connection()
            fila = conn.execute(
                "SELECT id, contraseña_hash FROM administradores WHERE usuario = ?",
                (usuario,),
            ).fetchone()
            conn.close()

            if fila and check_password_hash(fila[1], contrasena):
                session.clear()
                session["admin_id"] = fila[0]
                flash("Has iniciado sesión.")
                return redirect(url_for("index"))

            flash("Usuario o contraseña incorrectos.")
            return redirect(url_for("login"))

        return render_template("login.html")

    @app.route("/logout")
    def logout():
        session.clear()
        flash("Has cerrado sesión.")
        return redirect(url_for("index"))

    @app.route("/panel")
    def panel():
        if "admin_id" not in session:
            flash("Debes iniciar sesión para entrar al panel.")
            return redirect(url_for("login"))

        conn = get_connection()
        sugerencias = conn.execute(
            "SELECT id, nombre, correo, mensaje, fecha FROM sugerencias ORDER BY id DESC"
        ).fetchall()
        conn.close()

        return render_template("panel.html", sugerencias=sugerencias)

    # ================= RUTAS DE API REST EN PYTHON =================
    @app.route("/api/status", methods=["GET"])
    def api_status():
        return jsonify({
            "servicio": "EcoGuía3R Flask API",
            "estado": "operativo",
            "framework": "Flask 3.x",
            "base_de_datos": "SQLite 3"
        })

    @app.route("/api/sugerencias", methods=["GET", "POST"])
    def api_sugerencias():
        if request.method == "POST":
            data = request.get_json(silent=True) or request.form
            nombre = data.get("nombre", "").strip()
            correo = data.get("correo", "").strip()
            mensaje = data.get("mensaje", "").strip()

            if not nombre or not correo or not mensaje:
                return jsonify({"exito": False, "error": "Campos obligatorios incompletos."}), 400

            conn = get_connection()
            cur = conn.cursor()
            cur.execute(
                "INSERT INTO sugerencias (nombre, correo, mensaje) VALUES (?, ?, ?)",
                (nombre, correo, mensaje)
            )
            conn.commit()
            nuevo_id = cur.lastrowid
            conn.close()

            return jsonify({
                "exito": True,
                "mensaje": "Sugerencia guardada correctamente.",
                "id": nuevo_id
            }), 201

        conn = get_connection()
        conn.row_factory = lambda c, r: dict(zip([col[0] for col in c.description], r))
        cur = conn.cursor()
        cur.execute("SELECT id, nombre, correo, mensaje, fecha FROM sugerencias ORDER BY id DESC")
        items = cur.fetchall()
        conn.close()
        return jsonify({"exito": True, "total": len(items), "sugerencias": items})

    @app.route("/api/clasificar", methods=["POST"])
    def api_clasificar():
        data = request.get_json(silent=True) or request.form
        material = data.get("material", "") or data.get("residuo", "")
        return jsonify(clasificar_residuo(material))

    @app.route("/api/estadisticas", methods=["GET"])
    def api_estadisticas():
        return jsonify(obtener_estadisticas_db())

    @app.route("/api/residuos", methods=["GET"])
    def api_residuos():
        return jsonify({"exito": True, "reglas": REGLAS_RESIDUOS})

    @app.route("/api/calculadora", methods=["POST"])
    def api_calculadora():
        data = request.get_json(silent=True) or request.form
        kilos = float(data.get("kilos", 1.0))
        tipo = data.get("tipo", "plastico")
        return jsonify(calcular_ahorro_ecologico(kilos, tipo))