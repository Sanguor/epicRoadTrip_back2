const Utils = require("./utils");
const DAO = require("./dao");
const Services = require("./services");
const config = require('./../config/config.json');

module.exports = {

    findSingleUser: function (params) {
        try {
            return new Promise(async (resolve, reject) => {
                /* console.log('params = ', params); */
                const index = { firstname: params.user };
                let data = await DAO.findOne(index).catch((error) => { reject(error) });
                if (data != undefined) {
                    delete data._id;
                }
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
                let data = await DAO.findAll({ firstname: params.user }).catch((error) => { reject(error) });
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


    callApi: function (params) {
        try {
            return new Promise(async (resolve, reject) => {
                const url = config.apis.find(api => api.name == params.api_name).url;

                let data;
                if (url == 'url') {
                    reject(data = ({ message: "this api call has not been implemented yet" }));
                } else {
                    data = await Services.callApi(url).catch((error) => { reject(error) });
                    resolve(data);
                }
            });
        }
        catch (err) {
            throw { code_http: 500, message: err.message };
        }
    },


    insertSingleUser: function (body) {
        try {
            return new Promise(async (resolve, reject) => {
                let msg = await DAO.insertOne(body).catch((error) => { reject(error) });
                resolve(msg);
            }).catch((err) => {
                reject(err);
            });
        }
        catch (err) {
            throw { code_http: 500, message: err.message };
        }
    },


    deleteSingleUser: function (params) {
        try {
            return new Promise(async (resolve, reject) => {
                index = { firstname: params.user }
                let msg = await DAO.deleteOne(index).catch((error) => { reject(error) });
                resolve(msg);
            }).catch((err) => {
                console.log('in controller.deleteSingleUser .catch');
                reject(err);
            });
        }
        catch (err) {
            console.log('in controller.deleteSingleUser catch');
            throw { code_http: 500, message: err.message };
        }
    }
}
