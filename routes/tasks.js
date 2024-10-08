const express = require('express');
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const Task = require('../models/Task');

const router = express.Router();

// Get All Tasks (Protected Route)
router.get('/', authMiddleware, async (req, res) => {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
});

// Create Task (Protected Route)
router.post('/', authMiddleware, [
    check('description').notEmpty(),
    check('dueDate').notEmpty(),
    check('priority').isIn(['Low', 'Medium', 'High']),
    check('category').notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { description, dueDate, priority, category } = req.body;
    const newTask = new Task({ description, dueDate, priority, category, user: req.user._id });
    await newTask.save();
    res.status(201).json(newTask);
});

module.exports = router;
