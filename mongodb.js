// CRUD (create, read, update, delete)

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

    const db = client.db(databaseName); // db reference
    
    // table 대신 collection
    db.collection('users').insertOne({
        name: 'Haechan',
        age: 24
    })

    console.log('Connected correctly!');
})