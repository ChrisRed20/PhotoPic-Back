const express = require('express');
const morgan = require('morgan');
const app = express();

// ...existing code...

// Configurar Morgan para el registro de logs
app.use(morgan('combined'));

// ...existing code...

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
