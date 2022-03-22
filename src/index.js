const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

// 데이터베이스 연결: /Users/blues/mongodb/bin/./mongod.exe --dbpath=/Users/blues/mongodb-data

// index.js creates the express app and runs it
// what the express app actually does is defined in router files.

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // automatically parse json to object

app.use(userRouter); // register user router
app.use(taskRouter); // register task router

app.listen(port, () => {
    console.log('Server is up on port', port);
})

const bcrypt = require('bcryptjs');

const myFunction = async () => {
    const password = 'Red12345!'
    const hashedPassword = await bcrypt.hash(password, 8); // 몇 라운드 돌릴지. 8이 적당. pw를 해시로
    // encryption 은 원문 복구 가능. hash는 x. one way algorithm
    console.log(password);
    console.log(hashedPassword);

    const isMatch = await bcrypt.compare('Red12345!', hashedPassword); // 원본 pw를 해싱한것과 데이터에 저장해둔 해시된 pw를 비교
    console.log(isMatch);
}

myFunction()