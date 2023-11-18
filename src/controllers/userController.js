let {users} = require("../data/userList");

const getUser = (req, res) => {
    res.json(users)
};

const postUser = (req, res) => {
    if (!req.body.name || typeof req.body.name !== 'string') {
        return res.status(400).json({ error: 'A username is required and must be a string' });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d{1}|\W{1}).{8,}$/;
    if (!passwordRegex.test(req.body.password)) {
        return res.status(400).json({ error: 'Password must have at least 8 characters, an uppercase letter, and at least one special character' });
    };

    const emailRegex = /^[^@]+@\w+(\.\w+)+\w$/;
    if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({ error: 'A valid email is required' });
    };

    const newUser = {
        id: users.length,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    users.push(newUser);
    res.status(201).json(newUser);
}

const getUserById = (req, res) => {
    const userFound = users.find(u => u.id === Number(req.params.id));

    if (!userFound) {
        res.status(404).json({ error: 'User not found' });
    } else {
        res.status(200).json(userFound);
    }};

const updateUser = (req, res) => {
    const userIndex = users.findIndex(u => u.id === Number(req.params.id));

    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = { ...users[userIndex], ...req.body };
    users[userIndex] = updatedUser;

    return res.json(updatedUser);
};

const deleteUser = (req, res) => {
    const userIndex = users.findIndex(u => u.id === Number(req.params.id));

    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    users.splice(userIndex, 1);

    return res.status(204).send();
};


module.exports = {
    getUser,
    postUser,
    getUserById,
    updateUser,
    deleteUser
}