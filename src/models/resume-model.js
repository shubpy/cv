const mongo = require('../../database');

var fetch = function() {
    return mongo.dbClient.connect().then(async function(client) {
        var db = client.db('shubpy');

        let fetchWork = new Promise(function(resolve, reject) {
            resolve(db.collection('work').find().toArray());    
        });

        let fetchProjects = new Promise(function(resolve, reject) {
            resolve(db.collection('projects').find().toArray());    
        });

        let fetchEducation = new Promise(function(resolve, reject) {
            resolve(db.collection('education').find().toArray());    
        });

        return Promise.all([fetchWork, fetchProjects, fetchEducation ]).then( data =>{
            return data;
        });

    })
    .catch(function (err) {
        if(err.name === 'MongoNetworkError') {
            console.error('Unable to connect with database.')
        } else {
            console.error(err.message);
        }
    });
}

exports.fetch = fetch;