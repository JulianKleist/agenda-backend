require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use( cors() );

app.use( express.json() );

// Base de datos
dbConnection();

// Path
app.use( '/api/contacts', require('./routes/contacts') );
app.use( '/api/search', require('./routes/search') );
app.use( '/api/upload', require('./routes/uploads') );

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );
});

