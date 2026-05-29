import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser
} from '../models/userModel.js';

const getUsers = (req, res) => {
    res.json(getAllUsers());
};

const getUser = (req, res) => {
    const userId = Number.parseInt(req.params.id, 10);
    const user = getUserById(userId);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
};

const createNewUser = (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const newUser = createUser({ name, email });

    return res.status(201).json(newUser);
};

const updateExistingUser = (req, res) => {
    const userId = Number.parseInt(req.params.id, 10);
    const updatedUser = updateUser(userId, req.body);

    if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
    }

    return res.json(updatedUser);
};

const removeUser = (req, res) => {
    const userId = Number.parseInt(req.params.id, 10);
    const wasDeleted = deleteUser(userId);

    if (!wasDeleted) {
        return res.status(404).json({ error: 'User not found' });
    }

    return res.status(204).send();
};

export {
    createNewUser,
    getUser,
    getUsers,
    removeUser,
    updateExistingUser
};