
const express = require('express');
const {users} = require('../data/userList');

const router = express.Router();

// GET all users
router.get('/', (req, res) => {
    res.json(users)
});

// GET user by id
router.get('/:id', (req, res) => {
    const userFound = users.find(u => u.id === Number(req.params.id));

    if(!userFound) {
        res.status(404).json({error: 'User not found'});
    } else {
        res.status(200).json(userFound);
            }};
)

// CREATE user
router.post('/', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// UPDATE user by id
router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// DELETE user by id
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// // ADD new user
// router.put('/', async (req, res) => {
//     const user = new User(req.body);
//     try {
//         await user.save();
//         res.status(201).send(user);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

// module.exports = router;
