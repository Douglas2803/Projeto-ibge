
import express from 'express';
import MunicipioRoutes from './routes/MunicipioRoutes';

const app = express();

app.use(express.json());
app.use('/api', MunicipioRoutes);

export default app;
