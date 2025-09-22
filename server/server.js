import { configDotenv } from 'dotenv';
import express from 'express';
import { connectToDB } from './db/index.js';
import userRoutes from './Routes/user-routes.js';
import RoadmapRoutes from './Routes/roadmap-routes.js';
import ProfileRoutes from './Routes/profile-routes.js';
import cors from 'cors';
import SubscriptionRoutes from './Routes/subscription-routes.js';
import path from 'path';
import { fileURLToPath } from 'url';


configDotenv();
connectToDB();

connectToDB().query('SELECT 1', (err, results) => {
    if (err) {
      console.error('Test query failed:', err);
    } else {
      console.log('Database connection pool created !!!!!');
    }
  });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

app.use(cors())

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', userRoutes);
app.use('/api', RoadmapRoutes);
app.use('/api', ProfileRoutes);
app.use('/api', SubscriptionRoutes);

app.use('/api/test-route', (req, res) => {
   res.send({ message: 'Server is running' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
        status: 'error',
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'production' ? {} : err.stack
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is listening on port ${PORT}`);
});

process.on('SIGINT', () => {
    console.log('Server is gracefully shutting down');
    process.exit(0);
});
