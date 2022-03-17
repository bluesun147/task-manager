const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    //useNewUrlParser: true,
    //useCreateIndex: true
})



// const me = new User({ // 생성자
//     name: '    mike ',
//     email: 'MYEMAIL@AA.IO    ',
//     password: 'a1'
// })

// me.save() // db에 데이터 저장. promise 리턴
// .then(() => {
//     console.log(me);
// }).catch((error) => {
//     console.log('Error!', error);
// })

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