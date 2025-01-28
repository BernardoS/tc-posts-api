import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from './config/db.js'; 
import publicRoutes from './routes/publicRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import swaggerConfig from './config/swagger.js';
import { authenticate } from './middleware/auth.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: true, // Permite apenas a origem do frontend
}));
app.use(bodyParser.json());
app.use('/posts', publicRoutes);
app.use('/admin/posts', authenticate, adminRoutes);

swaggerConfig(app);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});