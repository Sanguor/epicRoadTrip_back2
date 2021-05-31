const axios = require('axios');


module.exports = {
    callApi: function (url) {
        return new Promise((resolve, reject) => {
            try {
                axios.get(url).then(response => {
                    data = response.data;
                    resolve(data);
                }).catch(error => {
                    console.log(error);
                });
            } catch (error) {
                reject(err);
            }
        });
    }
}