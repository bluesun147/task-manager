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

// userSchema.methods: for methods on the instance and individual user. 인스턴스에 대한 메서드
// userSchema.methods.getPublicProfile = function() { // routers/user.js에서 res.send({user: user.getPublicProfile(), token}) 처럼 사용
// this 사용하기 때문에 화살표 함수 안씀. toJSON으로 작성하면 res.send({user: user, token}) 에도 해당 메소드 적용 됨. 위랑 같은 결과
userSchema.methods.toJSON = function() { // toJSON은 객체를 문자열로 반환하는데, 반환하는 문자열 조작 가능. 여기서는 pw, tokens를 제거
    const user = this;
    const userObject = user.toObject(); // raw profile data 얻기 위해. 
    
    delete userObject.password; // delete: obj로부터 해당 프로퍼티 삭제. 객체 메서드
    delete userObject.tokens;

    return userObject;
}

userSchema.methods.generateAuthToken = async function () { // 토큰 생성
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, 'thisismynewcourse'); // {provide a payload that uniquely identifies the user}, 'secret string'

    user.tokens = user.tokens.concat({token: token});

    await user.save(); // token을 db에 저장

    return token;
}

// userSchema.statics: for methods on the actual User. 자체에 대한 메서드
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