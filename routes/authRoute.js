const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signin', authController.autenticarUsuario);
router.post('/signup', authController.crearUsuario);

module.exports = router;