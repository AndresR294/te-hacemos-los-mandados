import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let pedidos = [];

app.get("/", (req, res) => {
  res.send("API LEDL ONLINE 🚀");
});

app.post("/pedidos", (req, res) => {
  const pedido = {
    id: Date.now(),
    ...req.body,
    estado: "pendiente"
  };

  pedidos.push(pedido);
  res.json(pedido);
});

app.get("/pedidos", (req, res) => {
  res.json(pedidos);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor en puerto " + PORT);
});
