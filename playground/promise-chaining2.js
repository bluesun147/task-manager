require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findByIdAndDelete('62333162a05dce385ea462bd').then((task) => {
    console.log(task);
    return Task.countDocuments({completed: false}) // age 1인 사람 세기
}).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
})