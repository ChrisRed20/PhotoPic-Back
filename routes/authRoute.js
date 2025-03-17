const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const photographerController = require('../controllers/authPhotographerController');

router.post('/user/signin', authController.autenticarUsuario);
router.post('/user/signup', authController.crearUsuario);
router.post('/photographer/signin', photographerController.autenticarFotografo);
router.post('/photographer/signup', photographerController.crearFotografo);


module.exports = router;