const MongoClient = require('mongodb').MongoClient;


const dbClient = new MongoClient('mongodb://localhost:27017/shubpy',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

exports.dbClient = dbClient;