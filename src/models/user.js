const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// 유저 모델

const userSchema = new mongoose.Schema({ // model()에 두번째 인자로 들어가는 값. 속성들
    name: { // type, validation... 속성
        type: String,
        required: true, // 필수로 입력해야 하는 속성
        trim: true
    },
    email: {
        type: String,
        unique: true, // 하나만 있어야 함. 같은 이메일로 생성 x
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is not valid.');
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
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.generateAuthToken = async function () { // 토큰 생성
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, 'thisismynewcourse'); // {provide a payload that uniquely identifies the user}, 'secret string'

    user.tokens = user.tokens.concat({token: token});

    await user.save(); // token을 db에 저장

    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email }); // provide object with our search criteria 

    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login');
    }
    return user;
}

// pre는 'save'되기 전 실행. 미들웨어
// hash the plain text password before saving
userSchema.pre('save', async function(next) { // this binding 해야 하므로
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;