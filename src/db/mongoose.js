const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {})

const User = mongoose.model('User', {
    name: { // type, validation... 속성
        type: String,
        required: true, // 필수로 입력해야 하는 속성
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is not valid.');
            }
        }
    },
    age: { // 필수 아님
        type: Number,
        default: 0, // 입력 안했을 시 기본 값
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be positive number.');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7, // built-in validator
        trim: true,
        validate(value) {
            // if (value.length < 7) {
            //     throw new Error('pw length must be greater than 6.');
            // } 
            if (value.toLowercase().includes('password')) {
                throw new Error('pw should not contain the word "password"');
            }
        }
    }
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

const task = new Task({ // create new instance of a model
    description: '    Eat lunch   ',
    //completed: false
})

task.save()
.then(() => {
    console.log(task);
}).catch((error) => {
    console.log('Error!', error);
})