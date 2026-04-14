require('dotenv').config();
import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
const PORT = 3000;

const cors = require("cors");

app.use(cors({
  origin: "*"
}));

app.use(express.json());

/* =========================
   HEALTH
========================= */
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

/* =========================
   CREAR PEDIDO
========================= */
app.post("/crear-pedido", async (req, res) => {
  try {
    const { cliente, direccion } = req.body;

    const result = await pool.query(
      "INSERT INTO envios(cliente, direccion, estado) VALUES($1,$2,'pendiente') RETURNING *",
      [cliente, direccion]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creando pedido" });
  }
});

/* =========================
   VER PEDIDOS
========================= */
app.get("/pedidos", async (req, res) => {
  const result = await pool.query("SELECT * FROM envios ORDER BY id DESC");
  res.json(result.rows);
});

/* =========================
   REPARTIDORES
========================= */
app.get("/repartidores", async (req, res) => {
  const result = await pool.query("SELECT * FROM repartidores");
  res.json(result.rows);
});

/* =========================
   ASIGNAR PEDIDO
========================= */
app.post("/asignar", async (req, res) => {
  const { pedido_id, repartidor_id } = req.body;

  await pool.query(
    "UPDATE envios SET repartidor_id=$1, estado='asignado' WHERE id=$2",
    [repartidor_id, pedido_id]
  );

  res.json({ ok: true });
});

/* =========================
   START
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Servidor activo en puerto", PORT);
});
