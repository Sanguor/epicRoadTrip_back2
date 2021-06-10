const axios = require('axios');

const geocode_google = require('../config/geocode_auth');

module.exports = {
    callGeocoder: function(address) {
        return new Promise((resolve, reject) => {
            try {
                geocode_google.res_geocoder(address)
                    .then((res) => {
                        let coord = {
                            latitude: res[0].latitude,
                            longitude: res[0].longitude
                        }
                        resolve(coord);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            } catch (err) {
                throw (err);
            }
        });
    },
    
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