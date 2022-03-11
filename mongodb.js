// CRUD (create, read, update, delete)

// // mongodb npm library. allowing us to connect to Mongo DB from node.js
// const mongodb = require('mongodb');

// const ObjectID = mongodb.ObjectID;

// // MongoClient is going to give us access to the function necessary to 
// // connect to the db so we can perform CRUD operations.
// const MongoClient = mongodb.MongoClient;

const {MongoClient, ObjectID} = require('mongodb'); // destructuring. 같은 의미

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager'; // 이름 정하고 access하면 mongodb가 알아서 생성함. 따로 create할 필요 없다

// const id = new ObjectID(); // string아닌 binary data.
// console.log(id.id);
// console.log(id.getTimestamp());

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName); // db reference. 연결
    
    // // search 1 user
    // db.collection('users').findOne({_id: new ObjectID('622a8c1e629133e59bb9e95f')}, (error, user) => { // 제일 첫째값 리턴. 아이디는 binary
    //     if (error) {
    //         return console.log('Unable to fetch.');
    //     }

    //     console.log(user);
    // })

    // search all users
    // 두번째 인수로 콜백x. find는 커서(db에 있는 데이터 포인터) 리턴함
    db.collection('users').find({age: 24}).toArray((err, users) => {
        console.log(users);
    });

    db.collection('users').find({age: 24}).count((err, count) => {
        console.log(count);
    });

    

    // table 대신 collection
    // insert
    // db.collection('users').insertOne({ // async
    //     // _id: id, // 원하면 can provide id if you want
    //     name: 'Vikram',
    //     age: 27
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user.');
    //     }

    //     console.log(result.insertedId); // array of document.
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'desc 1',
    //         conpleted: true
    //     }, {
    //         description: 'desc 2',
    //         conpleted: false
    //     } , {
    //         description: 'desc 3',
    //         conpleted: true
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert tasks!');
    //     }

    //     console.log(result.insertedIds);
    // })

    db.collection('tasks').findOne({_id: new ObjectID('6229f6b86b903b11ffca6731')}, (err, task) => {
        console.log(task);
    })

    db.collection('tasks').find({completed: true}).toArray((err, tasks) => {
        console.log(tasks);
    });


    console.log('Connected correctly!');
})