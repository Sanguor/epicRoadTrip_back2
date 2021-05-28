const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const ObjectID = mongo.ObjectID;

const mongoURL = "mongodb+srv://admin:admin@epicroadtrip.toqro.mongodb.net/test";
// const mongoURL = "mongodb+srv://admin:admin>@epicroadtrip.toqro.mongodb.net/admin?retryWrites=true&w=majority"
const mongoDB = "admin";
const mongoCollec = "users";


module.exports = {

    insertOne: function (req) {
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        MongoClient.connect(mongoURL, {useUnifiedTopology: true, useNewUrlParser: true }, (err, client) => {
            if (err) throw err;
            console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');
            const db = client.db(mongoDB);
            //let doc = { _id: new ObjectID(), user: "paul", date: "YYYY-MM-DD", mood: "sad" };
            db.collection(mongoCollec).insertOne(req).then((doc) => {
                //console.log(doc);
            }).catch((err) => {
                console.log(err);
            })
            return ('User Inserted');
        });
    },

    /* insertOne: function insertData(value) {

        try {
            MongoClient.connect(
                mongoURL,
                { useNewUrlParser: true, useUnifiedTopology: true },
                (err, client) => {
                    if (err) throw err;
                    let value = { $set: { user: "paul", date: "YYYY-MM-DD", mood: "enerve" } };
                    console.log('value =', value);
                    client
                        .db(mongoDB).collection(mongoCollec).insert(value, () => {
                            client.close();
                        })
                }
            );
        } catch (error) {
            throw (error);
        }
    }, */


    findOne: function (index) {
        return new Promise((resolve, reject) => {
            try {
                MongoClient.connect(mongoURL, {useUnifiedTopology: true,  useNewUrlParser: true }, (err, client) => {
                    if (err) throw err;
                    const db = client.db(mongoDB);
                    db.collection(mongoCollec).findOne(index, (err, res) => {
                        if (err) {
                            console.log('error', err)
                            reject({ code_http: 500, code: 1000, message: err })
                        }
                        if (res) {
                            console.log('debug', res.ops)
                            resolve(res)
                        }
                        reject({ code_http: 404, code: 1000, message: "Can't find object" });
                    })
                })
            } catch (err) {
                reject(err)
            }
        })
    },

    findAll: function (index) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(mongoURL, {useUnifiedTopology: true,  useNewUrlParser: true }, (err, client) => {
                if (err) throw err;
                const db = client.db(mongoDB);
                db.collection(mongoCollec).find(index).toArray().then(docs =>
                    resolve(docs));
            })
        })
    },



    listCollections: function (req) {
        MongoClient.connect(mongoURL, {useUnifiedTopology: true,  useNewUrlParser: true }, (err, client) => {
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
