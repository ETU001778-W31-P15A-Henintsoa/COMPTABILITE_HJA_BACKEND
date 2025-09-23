import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';

// Routes
import userRoutes from './routes/userRoutes.js';
import inputRoutes from './routes/inputRoutes.js';
import rapportRoutes from './routes/rapportRoutes.js';
import accountRoutes from './routes/accountRoutes.js';

config();

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
app.use(json());

// Routes
app.use('/utilisateurs', userRoutes);
app.use('/saisies', inputRoutes);
app.use('/rapports', rapportRoutes);
app.use('/plans-comptables', accountRoutes);

app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log(`🚀 Serveur démarré sur ${process.env.LINK}${process.env.PORT}`);
}); 