import express from 'express';
import articleRoutes from './routes/articlesRoutes.js';
import journalistRoutes from './routes/journalistsRoutes.js';
import categoryRoutes from './routes/categoriesRoutes.js';

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/', (req, res) => {
    res.json({ message: 'EX-2 API is running' });
});

app.use('/articles', articleRoutes);
app.use('/journalists', journalistRoutes);
app.use('/categories', categoryRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});