const Photographer = require('../models/photographerModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { encryptPayload } = require('../utils/jwe');

// Configure nodemailer
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

exports.crearFotografo = async (req, res) => {

    try {
        const { name, lastName, email, password, phone, website, bio, logo } = req.body;

        // Check if the photographer already exists
        let photographer = await Photographer.findOne({ email });
        if (photographer) return res.status(400).json({ msg: 'The photographer is already registered' });

        if (!name || !lastName || !email || !password || !phone) return res.status(400).json({ msg: 'Please fill in all the fields' });
        if (password.length < 6) return res.status(400).json({ msg: 'The password must be at least 6 characters long' });
        if (phone.length < 10) return res.status(400).json({ msg: 'The phone number must be at least 10 characters long' });
        if (!email.includes('@') || !email.includes('.')) return res.status(400).json({ msg: 'Please enter a valid email' });

        // Encriptar contra
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new photographer
        photographer = new Photographer({ name, lastName, email, password: hashedPassword, phone, website, bio, logo });
        await photographer.save();

        // Generate token
        const payload = {
            photographer: { id: photographer.id }
        };
        jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 }, (error, token) => {
            if (error) throw error;
            res.status(201).json({
                msg: 'Fotografo registrado exitosamente',
                token,
                photographer: { // Include photographer data in the response
                    name: photographer.name,
                    email: photographer.email
                }
            });
        });
    } catch (error) {
        res.status(500).json({ msg: `Server error: ${error}` });
    }
}

exports.autenticarFotografo = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the photographer is registered
        let photographer = await Photographer.findOne({ email });
        if (!photographer) return res.status(400).json({ msg: 'The photographer is not registered' });

        // Check if the password is correct
        const passwordMatch = await bcrypt.compare(password, photographer.password);
        if (!passwordMatch) return res.status(400).json({ msg: 'Incorrect password' });

        // Generate token
        // const payload = {
        //     photographer: { id: photographer.id }
        // };
        const payload = {
            id: photographer.id,
            email: photographer.email
        };

        const signedToken = jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 });

        const token = await encryptPayload({ token: signedToken });

        res.status(200).json({
            msg: 'Fotógrafo autenticado',
            token,
            photographer: {
                name: photographer.name,
                email: photographer.email
            }
        });

        // jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 }, (error, token) => {
        //     if (error) throw error;
        //     res.status(200).json({ 
        //         msg: 'Fotografo autenticado',
        //         token,
        //         photographer: { // Include photographer data in the response
        //             name: photographer.name,
        //             email: photographer.email
        //         }
        //     });
        // });
    } catch (error) {
        res.status(500).json({ msg: `Server error: ${error}` });
    }
}