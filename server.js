const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

app.get("/api/ping", (req, res) => {
  res.json({ message: "Serveur TaskFlow operationnel" });
});

app.listen(PORT, () => {
  console.log("Serveur démarré sur le port 5000");
});