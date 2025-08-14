const express = require('express');
const allparkings = require('./parkings.json');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const app = express();

app.use(express.json());

// Routes
app.use('/users', userRoutes);

// app.listen(8080, () => {  console.log("Serveur à l'écoute sur le port 8080")});
app.listen(process.env.PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${process.env.PORT}`);
});