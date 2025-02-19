const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
const nodemailer = require('nodemailer');

// Crear el servidor
const app = express();

// Conectar a la base de datos
conectarDB();

// Habilitar cors
app.use(cors());
app.use(express.json());

// Puerto de la app
const PORT = process.env.PORT || 4000;

// Importar rutas
app.use('/api/usuarios', require('./routes/userRoute'));
app.use('/api/auth', require('./routes/authRoute'));

// Arrancar la app
app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${PORT}`);
});