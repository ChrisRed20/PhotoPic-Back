const express = require('express');
const photographerController = require('../controllers/photographerController');

const router = express.Router();

// Ruta para obtener todos los fotógrafos
router.get('/', photographerController.getAllPhotographers);

// Ruta para obtener un fotógrafo por ID
router.get('/:id', photographerController.getPhotographerById);

// Ruta para actualizar un fotógrafo por ID
router.put('/update/:id', photographerController.updatePhotographer);

// Ruta para eliminar un fotógrafo por ID
router.delete('/delete/:id', photographerController.deletePhotographer);

module.exports = router;