const express = require('express');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/utilisateurs', userRoutes);

app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`🚀 Serveur démarré sur ${process.env.LINK}${process.env.PORT}`);
});