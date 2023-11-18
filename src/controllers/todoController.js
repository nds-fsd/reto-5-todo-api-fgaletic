let {todos} = require("../data/todoList");

const getTodo = (req, res) => {
    res.json(todos)
};

const postTodo = (req, res) => {
    if (!req.body.title || typeof req.body.title !== 'string') {
        return res.status(400).json({ error: 'Title is required and must be a string' });
    }

    let date_regex = ([0-9]{4})-([0-9]{1,2})-([0-9]{1,2});

    if (!req.body.fecha || typeof req.body.title !== 'string' || !date_regex.test(req.body.fecha)) {
        return res.status(400).json({ error: 'Please enter date in the YYYY-MM-DD format'});
    }
    //will require a date chooser but also allowing for manual entry

    const newTodo = {
        id: todos.length,
        title: req.body.title,
        fecha: req.body.fecha,
        done: req.body.done
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
};


const getTodoById = (req, res) => {
    const todoFound = todos.find(t => t.id === Number(req.params.id));

    if(!todoFound) {
      return res.status(404).json({error: 'To-do not found'});
    } else {
        res.status(200).json(todoFound);
            }};

const updateTodo = (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === Number(req.params.id));

    if (todoIndex === -1) {
        return res.status(404).json({ error: 'To-do not found' });
    }

    const updatedTodo = { ...todos[todoIndex], ...req.body };
    todos[todoIndex] = updatedTodo;

    return res.json(updatedTodo);
};

const deleteTodo = (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === Number(req.params.id));

    if (todoIndex === -1) {
        return res.status(404).json({ error: 'To-do not found' });
    }

    todos.splice(todoIndex, 1);

    return res.status(204).send();
};

module.exports = {
    getTodo,
    postTodo,
    getTodoById,
    updateTodo,
    deleteTodo
}