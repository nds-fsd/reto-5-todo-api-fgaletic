const express = require('express');
const todoRouter = require('./todo');
const userRouter = require('./user');

const router = express.Router();

router.use('/user', userRouter);
router.use('/todo', todoRouter);

module.exports = router;