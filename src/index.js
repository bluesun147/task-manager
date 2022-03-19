const express = require('express');
require('./db/mongoose');
const User = require('./models/user'); // 유저 모델
const Task = require('./models/task');

// 데이터베이스 연결: /Users/blues/mongodb/bin/./mongod.exe --dbpath=/Users/blues/mongodb-data

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // automatically parse json to object

app.post('/users', async (req, res) => { // postman 통해 확인해보기
    console.log(req.body); // { name: 'Andrew', email: 'andrew@example.com', password: 'Red123!$' }
    const user = new User(req.body); // create new user. 생성자

    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }

    // user.save().then(() => { // db에 데이터 저장. promise 리턴
    //     res.status(201).send(user); // 기본은 200(ok). 201은 created. 동작에 영향x, 명확한 구분 위해
    // }).catch((e) => {
    //     // res.status(400);
    //     // res.send(e);
    //     res.status(400).send(e); // 체이닝
    // });
});

app.get('/users', async (req, res) => {

    try {
        const users = await User.find({});
        res.send(users);
    } catch (e) {
        res.status(500).send();
    }

    // User.find({}).then((users) => { // {}안에 조건. 없으면 모두 읽음
    //     res.send(users);
    // }).catch((e) => {
    //     res.status(500).send(); // server error
    // });
});

 // fetch individual user by id. : route parameter
app.get('/users/:id', async (req, res) => {
    const _id = req.params.id; // route parameter 로 입력한 값
    
    try {
        const user = await User.findById(_id);
        if (!user) { // 일치하는 값 없어도 failure 아님.
            return res.status(404).send(); // 찾는 값 없을 때
        }

        res.send(user);
    } catch (e) {
        res.status(500).send();
    }


    // User.findById(_id).then((user) => {
    //     if (!user) { // 일치하는 값 없어도 failure 아님.
    //         return res.status(404).send(); // 찾는 값 없을 때
    //     }

    //     res.send(user);

    // }).catch((e) => {
    //     res.status(500).send(); // 서버 에러
    // })
})

app.post('/tasks', async (req, res) => {
    console.log(req.body);
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e); 
    }
    
    // task.save().then(() => {
    //     res.status(201).send(task);
    // }).catch((e) => {
    //     res.status(400).send(e); // 400은 bad request 뜻함
    // })
});

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
        
    } catch (e) {
        res.status(500).send();
    }

    // Task.find({}).then((tasks) => {
    //     res.send(tasks);
    // }).catch((e) => {
    //     res.status(500).send();
    // })
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }

    // Task.findById(_id).then((task) => {
    //     if (!task) {
    //         return res.status(404).send();
    //     }
    //     res.send(task);
    // }).catch((e) => {
    //     res.status(500).send();
    // })
})

app.listen(port, () => {
    console.log('Server is up on port', port);
})