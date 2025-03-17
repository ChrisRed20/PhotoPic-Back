const express = require('express');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

// Ruta para obtener todas las sesiones de fotos
router.get('/', sessionController.getAllSessions);

// Ruta para obtener una sesión de fotos por ID
router.get('/:id', sessionController.getSessionById);

// Ruta para obtener todas las sesiones de fotos por cliente
router.get('/client/:clientID', sessionController.getSessionsByClient);

// Ruta para obtener todas las sesiones de fotos por fotógrafo
router.get('/photographer/:photographerID', sessionController.getSessionsByPhotographer);

// Ruta para crear una nueva sesión de fotos
router.post('/create', sessionController.createSession);

// Ruta para actualizar una sesión de fotos por ID
router.put('/edit/:id', sessionController.updateSession);

// Ruta para eliminar una sesión de fotos por ID
router.delete('/delete/:id', sessionController.deleteSession);

module.exports = router;