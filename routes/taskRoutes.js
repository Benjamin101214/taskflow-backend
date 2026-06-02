const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");

// Récupérer toutes les tâches
router.get("/", taskController.getAllTasks);

// Créer une nouvelle tâche
router.post("/", taskController.createTask);

// Mettre à jour le statut d'une tâche
router.put("/:id", taskController.updateTaskStatus);

// Supprimer une tâche
router.delete("/:id", taskController.deleteTask);

module.exports = router;