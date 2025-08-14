const express = require('express');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const app = express();

app.use(express.json());

// Routes
app.use('/', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${process.env.PORT}`);
});