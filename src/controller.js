const Utils = require("./utils");
const DAO = require("./dao");

module.exports = {

    findSingleUser: function (params) {
        try {
            return new Promise(async (resolve, reject) => {
                const index = { firstname: params.user };
                let data = await DAO.findOne(index);
                delete data._id;
                resolve(data);
            });
        }
        catch (err) {
            throw { code_http: 500, message: err.message };
        }
    },


    findManyUsers: function (params) {
        try {
            return new Promise(async (resolve, reject) => {
                let data = await DAO.findAll({ firstname: params.user });
                for (element of data) {
                    delete element._id;
                }
                resolve(data);
            });
        }
        catch (err) {
            throw { code_http: 500, message: err.message };
        }
    },


    insertSingleUser: function (body) {
        try {
            return new Promise(async (resolve, reject) => {
                let msg = await DAO.insertOne(body);
                resolve(msg);
            }).catch((err) => {
                reject(err)
            });
        }
        catch (err) {
            throw { code_http: 500, message: err.message };
        }
    }
}
