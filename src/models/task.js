const mongoose = require('mongoose');
// task 모델
const Task = mongoose.model('Task', { // define Task model
    description: {
        type: String, // 자료형
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = Task;