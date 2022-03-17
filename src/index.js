const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
// 데이터베이스 연결: /Users/blues/mongodb/bin/./mongod.exe --dbpath=/Users/bluesmongodb-data
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // automatically parse json to object

app.post('/users', (req, res) => { // postman 통해 확인해보기
    console.log(req.body); // { name: 'Andrew', email: 'andrew@example.com', password: 'Red123!$' }
    const user = new User(req.body); // create new user. 생성자

    user.save().then(() => { // db에 데이터 저장. promise 리턴
        res.send(user);
    }).catch((e) => {
        // res.status(400);
        // res.send(e);
        res.status(400).send(e); // 체이닝
    })
})

app.listen(port, () => {
    console.log('Server is up on port', port);
})