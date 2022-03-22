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