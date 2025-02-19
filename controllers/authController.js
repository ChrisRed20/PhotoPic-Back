const Usuario = require('../models/userModel');
const jwt = require('jsonwebtoken');
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
    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email }); 
        // Revisar si el usuario ya existe
        if (usuario) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        } 
        // Crear nuevo usuario
        usuario = new Usuario(req.body); // Hashear el password
        // Guardar usuario
        await usuario.save();
        // Crear y firmar el JWT
        const payload = {usuario: {id: usuario.id}};
        // Firmar el JWT
        jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 }, (error, token) => {
            if (error) throw error; 
            // Mensaje de confirmación
            res.json({ token });
        });
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    } 
    // Enviar email de confirmación
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Bienvenido a la app',
        text: 'Bienvenido a la app'
    }; 
    // Enviar email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

exports.autenticarUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ msg: 'El usuario no existe' });
        }
        // Revisar el password
        if (password === usuario.password) {
            return res.status(400).json({ msg: 'Password incorrecto' });
        }
        // Si todo es correcto
        const payload = {
            usuario: { id: usuario.id }
        };
        // Firmar el JWT
        jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 }, (error, token) => {
            if (error) throw error;
            res.json({ token });
        });
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}