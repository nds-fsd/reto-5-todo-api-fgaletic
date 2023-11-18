const express = require('express');
const todoRouter = require('./todo');
const userRouter = require('./user');

const router = express.Router();

router.use('/todo', todoRouter);
router.use('/users', userRouter);

module.exports = router;