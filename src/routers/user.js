const express = require('express');
const userController = require('../controllers/userController');
// const {users} = require('../data/userList');

const userRouter = express.Router();

// GET all users
userRouter.get('/', userController.getUser);

// GET user by id
userRouter.get('/:id', userController.getUserById);

// CREATE user
userRouter.post('/', userController.postUser);

// UPDATE user by id
userRouter.patch('/:id', userController.updateUser);

// DELETE user by id
userRouter.delete('/:id', userController.deleteUser);

// // // Update a complete user
// userRouter.put('/', async (req, res) => {
//     const user = new User(req.body);
//     try {
//         await user.save();
//         res.status(201).send(user);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

module.exports = userRouter; 
