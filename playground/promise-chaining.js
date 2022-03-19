require('../src/db/mongoose'); // 연결
const User = require('../src/models/user');

// 622ca0d330cf34db5ae4d358

User.findByIdAndUpdate('62332bb183d24c6cd299c1ed', { age: 1 }).then((user) => {
    console.log(user)
    return User.countDocuments({age: 1}) // age 1인 사람 세기
}).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
})