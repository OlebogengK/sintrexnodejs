const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    name: { 
        type: String, 
        required: true,
        trim: true
    },
    next_execute_date_time: { 
        type: Date, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['pending', 'done'], 
        default: 'pending' 
    },
    description: { 
        type: String,
        required: true,
        trim: true
    },
    date_time: { 
        type: Date,
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    },
});

taskSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Task = mongoose.model('Task', taskSchema); 
module.exports = Task;
