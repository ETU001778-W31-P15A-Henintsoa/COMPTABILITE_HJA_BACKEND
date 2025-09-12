const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

// Routes
const userRoutes = require('./routes/userRoutes');
const inputRoutes = require('./routes/inputRoutes');
const rapportRoutes = require('./routes/rapportRoutes');
const accountRoutes = require('./routes/accountRoutes');

dotenv.config();

const app = express();
app.use(cors({
  origin: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','X-Requested-With'],
  credentials: false
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  next();
});

app.use(helmet());
app.use(express.json());

// Routes
app.use('/utilisateurs', userRoutes);
app.use('/saisies', inputRoutes);
app.use('/rapports', rapportRoutes);
app.use('/plans-comptables', accountRoutes);

app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log(`🚀 Serveur démarré sur ${process.env.LINK}${process.env.PORT}`);
}); 