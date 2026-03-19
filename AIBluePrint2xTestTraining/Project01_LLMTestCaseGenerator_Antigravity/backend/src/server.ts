import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Import our routes
import settingsRoutes from './routes/settingsRoutes';
import generationRoutes from './routes/generationRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/settings', settingsRoutes);
app.use('/api/generate', generationRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Test Case Generator API is running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
