const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {})

const User = mongoose.model('User', {
    name: { // type, validation... 속성
        type: String
    },
    age: {
        type: Number
    }
})

// const me = new User({ // 생성자
//     name: 'Haechan',
//     age: 24
// })

// me.save() // db에 데이터 저장. promise 리턴
// .then(() => {
//     console.log(me);
// }).catch((error) => {
//     console.log('Error!', error);
// })

const Task = mongoose.model('Task', { // define Task model
    description: {
        type: String // 자료형
    },
    completed: {
        type: Boolean
    }
})

const task = new Task({ // create new instance of a model
    description: 'Learn the Mongoose library!!',
    completed: false
})

task.save()
.then(() => {
    console.log(task);
}).catch((error) => {
    console.log('Error!', error);
})