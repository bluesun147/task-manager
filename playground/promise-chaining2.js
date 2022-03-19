require('../src/db/mongoose');
const Task = require('../src/models/task');
const User = require('../src/models/user');

// Task.findByIdAndDelete('62333162a05dce385ea462bd').then((task) => {
//     console.log(task);
//     return Task.countDocuments({completed: false}) // age 1인 사람 세기
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed: false});

    return count;
}

deleteTaskAndCount('623330476455c29cc2092e04').then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
})