const Task = require("../models/Task");

// GET : récupérer toutes les tâches
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des tâches",
      error: error.message
    });
  }
};

// POST : créer une nouvelle tâche
exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();

    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la création de la tâche",
      error: error.message
    });
  }
};

// PUT : mettre à jour uniquement le statut
exports.updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      {
        new: true,
        runValidators: true
      }
    );

    if (!task) {
      return res.status(404).json({
        message: "Tâche introuvable"
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la mise à jour",
      error: error.message
    });
  }
};

// DELETE : supprimer une tâche
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Tâche introuvable"
      });
    }

    res.status(200).json({
      message: "Tâche supprimée avec succès"
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression",
      error: error.message
    });
  }
};