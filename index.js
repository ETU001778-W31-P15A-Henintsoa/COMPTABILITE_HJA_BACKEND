const express = require('express');
<<<<<<< Updated upstream
const allparkings = require('./parkings.json');

=======
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
>>>>>>> Stashed changes
const app = express();

app.use(express.json());

// Routes
app.use('/users', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${process.env.PORT}`);
});
>>>>>>> Stashed changes
