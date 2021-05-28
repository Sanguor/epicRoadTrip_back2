const Utils = require("./utils");
const DAO = require("./dao");

module.exports = {

    insert: function (req) {
        try {
            return new Promise((resolve, reject) => {
                let msg = DAO.insertOne(req.body);
                resolve(msg);
            });
        }
        catch (err) {
            throw { code_http: 500, message: err.message };
        }
    },


    find: function (req) {
        try {
            return new Promise(async (resolve, reject) => {
                //let data = DAO.findOne({ user: req.params.user });
                let data = await DAO.findAll({ firstname: req.params.user });
                //let data = DAO.listCollections({ user: req.params.user });
                console.log('data =', data);
                let parsedData = Utils.parseData(data);
                console.log('parsedData =', parsedData);
                resolve(parsedData);
            });
        }
        catch (err) {
            throw { code_http: 500, message: err.message };
        }
    }
}
