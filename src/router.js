const express = require('express');
const router = express.Router();
const ProfileController = require("./controllers/ProfileController");
const JobController = require("./controllers/JobControllers");
const DashboardController = require("./controllers/DashboardController");

express.urlencoded();

// index
router.get("/", DashboardController.index);

// Job
router.get("/job/:id", JobController.show); // Mostra o job específico
router.post("/job/:id", JobController.update); // Atualiza o job específico
router.post("/job/delete/:id", JobController.delete); // Deleta o job específico
router.get("/job", JobController.create);
router.post("/job", JobController.save);

router.get("/profile", ProfileController.index);
router.post("/profile", ProfileController.update);

module.exports = router;
