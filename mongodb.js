// CRUD (create, read, update, delete)

// mongodb npm library. allowing us to connect to Mongo DB from node.js
const mongodb = require('mongodb');

// MongoClient is going to give us access to the function necessary to 
// connect to the db so we can perform CRUD operations.
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager'; // 이름 정하고 access하면 mongodb가 알아서 생성함. 따로 create할 필요 없다

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName); // db reference. 연결
    
    // table 대신 collection
    // db.collection('users').insertOne({ // async
    //     name: 'Haechan',
    //     age: 24
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user.');
    //     }

    //     console.log(result.insertedId); // array of document.
    // })

    // db.collection('users').insertMany([ // insert 2 documents. 여러개 삽입
    //     {
    //         name: 'Jen',
    //         age: 28
    //     }, {
    //         name: 'Eric',
    //         age: 24
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents.');
    //     }

    //     console.log(result.insertedIds);
    // })

    db.collection('tasks').insertMany([
        {
            description: 'desc 1',
            conpleted: true
        }, {
            description: 'desc 2',
            conpleted: false
        } , {
            description: 'desc 3',
            conpleted: true
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert tasks!');
        }

        console.log(result.insertedIds);
    })

    console.log('Connected correctly!');
})