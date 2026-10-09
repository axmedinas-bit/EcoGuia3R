from flask import render_template, request, redirect, url_for, flash, session
from werkzeug.security import check_password_hash
from app.db import get_connection

def register_routes(app):
    @app.route("/")
    def index():
        return render_template("index.html")

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