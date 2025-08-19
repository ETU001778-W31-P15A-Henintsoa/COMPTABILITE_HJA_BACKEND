const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

// Routes
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/utilisateurs', userRoutes);

app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`🚀 Serveur démarré sur ${process.env.LINK}${process.env.PORT}`);
});