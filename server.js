const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const PORT = 3000;

// MongoDB Connection
mongoose.connect('mongodb://localhost/taskmanager', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api', authRoutes);  // Authentication routes
app.use('/api/tasks', taskRoutes);  // Task management routes

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
