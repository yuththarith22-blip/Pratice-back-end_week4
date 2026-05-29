import { articles, categories } from '../models/data.js';

const getArticlesByCategoryId = (categoryId) => articles.filter((article) => article.categoryId === categoryId);

export const getAllCategories = (req, res) => {
    res.json(categories);
};

export const getCategoryById = (req, res) => {
    const categoryId = Number.parseInt(req.params.id, 10);
    const category = categories.find((item) => item.id === categoryId);

    if (!category) {
        return res.status(404).json({ error: 'Category not found' });
    }

    res.json({
        ...category,
        articles: getArticlesByCategoryId(categoryId),
    });
};