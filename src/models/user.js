const mongoose = require('mongoose');
const validator = require('validator');
// 유저 모델
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
            if (value.toLowerCase().includes('password')) {
                throw new Error('pw should not contain the word "password"');
            }
        }
    }
})

module.exports = User;