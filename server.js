import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ==========================
// 🔗 Connexion MongoDB Atlas
// ==========================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connecté"))
  .catch((err) => console.error("❌ Erreur MongoDB :", err));

// ==========================
// 📦 Modèle Task (Mongoose)
// ==========================
const taskSchema = new mongoose.Schema({
  titre: String,
  description: String,
  statut: {
    type: String,
    enum: ["A faire", "En cours", "Terminé"],
    default: "A faire"
  }
});

const Task = mongoose.model("Task", taskSchema);

// ==========================
// 📡 ROUTES API
// ==========================

// ✔ GET toutes les tâches
app.get("/api/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// ✔ POST ajouter une tâche
app.post("/api/tasks", async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.json(newTask);
});

// ✔ DELETE supprimer une tâche
app.delete("/api/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Tâche supprimée" });
});

// ✔ PUT modifier statut
app.put("/api/tasks/:id", async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedTask);
});

// ==========================
// 🚀 Lancer serveur
// ==========================
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});