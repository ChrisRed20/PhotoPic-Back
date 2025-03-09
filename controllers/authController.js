const Usuario = require('../models/userModel');
const jwt = require('jsonwebtoken');
const crypt = require('bcryptjs');
const nodemailer = require('nodemailer');

// Configurar nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
    tls: {
        ciphers: 'SSLv3'
    }
});

exports.crearUsuario = async (req, res) => {

    try {
        const { name, lastName, email, password } = req.body;

        // Verificar si el usuario ya existe
        let user = await Usuario.findOne({ email });
        if (user) return res.status(400).json({ msg: 'El usuario ya está registrado' });

        // Encriptar la contraseña
        const salt = await crypt.genSalt(10);
        const hashedPassword = await crypt.hash(password, salt);

        // Crear nuevo usuario
        user = new Usuario({ name, lastName, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ msg: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ msg: `Error en el servidor: ${error}` });
    }
}

exports.autenticarUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ msg: 'El usuario no existe' });
        }
        // Revisar el password
        const validPassword = await crypt.compare(password, usuario.password);
        if (!validPassword) return res.status(400).json({ msg: 'Contraseña incorrecta' });
        // Si todo es correcto
        const payload = {
            usuario: { id: usuario.id }
        };
        // Firmar el JWT
        jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 }, (error, token) => {
            if (error) throw error;
            res.json({ 
                token,
                user: { // Include user data in the response
                    name: usuario.name,
                    newUser: usuario.newUser
                }
            });
        });
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}