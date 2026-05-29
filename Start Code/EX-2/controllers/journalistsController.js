import { articles, journalists } from '../models/data.js';

const getArticlesByJournalistId = (journalistId) => articles.filter((article) => article.journalistId === journalistId);

export const getAllJournalists = (req, res) => {
    res.json(journalists);
};

export const getJournalistById = (req, res) => {
    const journalistId = Number.parseInt(req.params.id, 10);
    const journalist = journalists.find((item) => item.id === journalistId);

    if (!journalist) {
        return res.status(404).json({ error: 'Journalist not found' });
    }

    res.json({
        ...journalist,
        articles: getArticlesByJournalistId(journalistId),
    });
};