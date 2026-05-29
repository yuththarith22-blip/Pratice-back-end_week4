import { articles, categories, journalists } from '../models/data.js';

const getJournalistById = (journalistId) => journalists.find((journalist) => journalist.id === journalistId);
const getCategoryById = (categoryId) => categories.find((category) => category.id === categoryId);

const populateArticle = (article) => ({
    ...article,
    journalist: getJournalistById(article.journalistId) || null,
    category: getCategoryById(article.categoryId) || null,
});

export const getAllArticles = (req, res) => {
    res.json(articles.map(populateArticle));
};

export const getArticleById = (req, res) => {
    const articleId = Number.parseInt(req.params.id, 10);
    const article = articles.find((item) => item.id === articleId);

    if (!article) {
        return res.status(404).json({ error: 'Article not found' });
    }

    res.json(populateArticle(article));
};

export const createArticle = (req, res) => {
    const { title, content, journalistId, categoryId } = req.body;

    if (!title || !content || !journalistId || !categoryId) {
        return res.status(400).json({ error: 'Title, content, journalistId, and categoryId are required' });
    }

    const journalist = getJournalistById(Number(journalistId));
    const category = getCategoryById(Number(categoryId));

    if (!journalist) {
        return res.status(400).json({ error: 'Invalid journalistId' });
    }

    if (!category) {
        return res.status(400).json({ error: 'Invalid categoryId' });
    }

    const newArticle = {
        id: articles.length ? Math.max(...articles.map((article) => article.id)) + 1 : 1,
        title,
        content,
        journalistId: Number(journalistId),
        categoryId: Number(categoryId),
    };

    articles.push(newArticle);
    res.status(201).json(populateArticle(newArticle));
};

export const updateArticle = (req, res) => {
    const articleId = Number.parseInt(req.params.id, 10);
    const article = articles.find((item) => item.id === articleId);

    if (!article) {
        return res.status(404).json({ error: 'Article not found' });
    }

    const { title, content, journalistId, categoryId } = req.body;

    if (journalistId !== undefined) {
        const journalist = getJournalistById(Number(journalistId));
        if (!journalist) {
            return res.status(400).json({ error: 'Invalid journalistId' });
        }
        article.journalistId = Number(journalistId);
    }

    if (categoryId !== undefined) {
        const category = getCategoryById(Number(categoryId));
        if (!category) {
            return res.status(400).json({ error: 'Invalid categoryId' });
        }
        article.categoryId = Number(categoryId);
    }

    if (title !== undefined) {
        article.title = title;
    }

    if (content !== undefined) {
        article.content = content;
    }

    res.json(populateArticle(article));
};

export const deleteArticle = (req, res) => {
    const articleId = Number.parseInt(req.params.id, 10);
    const articleIndex = articles.findIndex((item) => item.id === articleId);

    if (articleIndex === -1) {
        return res.status(404).json({ error: 'Article not found' });
    }

    articles.splice(articleIndex, 1);
    res.status(204).send();
};