const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
const nodemailer = require('nodemailer');
const swaggerUI = require('swagger-ui-express')
const specs = require('./swagger/swagger.js')
// import swaggerUI from 'swagger-ui-express';
// import specs from './swagger/swagger.js';

// Crear el servidor
const app = express();

// Conectar a la base de datos
conectarDB();

// Habilitar cors
app.use(cors());
// Swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
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