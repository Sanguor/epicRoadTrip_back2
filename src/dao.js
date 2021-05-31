const config = require('./../config/config.json');
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
// const ObjectID = mongo.ObjectID;

const mongoURL = config.database.mongoClientUrl;
const mongoDB = config.database.mongoClientDatabase;
const mongoCollec = config.database.mongoClientCollection;


module.exports = {
    insertOne: function (data) {
        try {
            return new Promise((resolve, reject) => {
                MongoClient.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true }, (err, client) => {
                    if (err) throw err;
                    const db = client.db(mongoDB);
                    //let doc = { _id: new ObjectID(), user: "paul", date: "YYYY-MM-DD", mood: "sad" };
                    db.collection(mongoCollec).insertOne(data).then((doc) => {
                        resolve({ message: 'User inserted', username: data.firstname });
                    }).catch((err) => {
                        reject(err);
                    });
                });
            });
        } catch (error) {
            reject(error);
        }
    },


    findOne: function (index) {
        return new Promise((resolve, reject) => {
            try {
                MongoClient.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true }, (err, client) => {
                    if (err) throw err;
                    const db = client.db(mongoDB);
                    db.collection(mongoCollec).findOne(index, (err, res) => {
                        if (err) {
                            console.log('error', err);
                            reject({ code_http: 500, code: 1000, message: err });
                        }
                        if (res) {
                            console.log('debug', res);
                            resolve(res);
                        }
                        reject({ code_http: 404, code: 1000, message: "Can't find object" });
                    });
                });
            } catch (err) {
                reject(err);
            }
        });
    },


    findAll: function (index) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true }, (err, client) => {
                if (err) throw err;
                const db = client.db(mongoDB);
                db.collection(mongoCollec).find().toArray().then(data => {
                    console.log('data =', data);
                    resolve(data);
                });
            });
        });
    },



    listCollections: function (req) {
        MongoClient.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true }, (err, client) => {
            if (err) throw err;
            const db = client.db(mongoDB);
            db.listCollections().toArray().then((docs) => {
                console.log('Available collections:');
                docs.forEach((doc, idx, array) => { console.log(doc.name) });
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                client.close();
            });
        });;
    }
}
