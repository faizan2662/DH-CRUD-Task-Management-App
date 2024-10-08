const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
    category: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Task', taskSchema);
