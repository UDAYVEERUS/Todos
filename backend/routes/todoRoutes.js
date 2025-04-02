// backend/routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// GET all todos with pagination
router.get('/', todoController.getAllTodos);

// GET a single todo by ID
router.get('/:id', todoController.getTodoById);

// POST create a new todo
router.post('/', todoController.createTodo);

// PUT update a todo
router.put('/:id', todoController.updateTodo);

// DELETE a todo
router.delete('/:id', todoController.deleteTodo);

module.exports = router;