const mongoose = require('mongoose');
const validator = require('validator');
// mongoose는 db에 연결
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    //useNewUrlParser: true,
    //useCreateIndex: true
});