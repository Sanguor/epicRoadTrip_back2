const Utils = require("./utils");
const DAO = require("./dao");
const Services = require("./services");
const config = require('./../config/config.json');
var amadeus_travel = require('../config/amadeus_auth');

module.exports = {

    searchPointsOfInterest: function(params) {
        try {
            return new Promise(async (resolve, reject) => {
                Services.callGeocoder(params.address) // Call to the Google Geocoder API to retrieve the coordinates of the place entered
                .then((res) => {
                    // Call Amadeus API to get the Points of interests near the place entered
                    let data = amadeus_travel.amadeus.referenceData.locations.pointsOfInterest.get({
                        latitude: res.latitude,
                        longitude: res.longitude,
                        radius: params.radius // Optionnal argument (radius = 1 km, min = 0 km, max = 20 km)
                    });
                    resolve (data);
                })
                .catch ((err) => {
                    console.log(err);
                    reject (err);
                });
            });
        } catch (err) {
            throw { code_http: 500, message: err.message };
        }
    },

    searchToursAndActivities: function(params) {
        try {
            return new Promise(async (resolve, reject) => {
                Services.callGeocoder(params.location) // Call to the Google Geocoder API to retrieve the coordinates of the place entered
                .then((res) => {
                    // Call Amadeus API to get the Points of interests near the place entered
                    let data = amadeus_travel.amadeus.shopping.activities.get({
                        latitude: res.latitude,
                        longitude: res.longitude,
                    });
                    resolve (data);
                })
                .catch ((err) => {
                    console.log(err);
                    reject (err);
                });
            });
        } catch (err) {
            throw { code_http: 500, message: err.message };
        }
    },

    LocationSafety: function(params) {
        try {
            return new Promise(async (resolve, reject) => {
                Services.callGeocoder(params.location) // Call to the Google Geocoder API to retrieve the coordinates of the place entered
                .then((res) => {
                    // Call Amadeus API to get the Points of interests near the place entered
                    let data = amadeus_travel.amadeus.safety.safetyRatedLocations.get({
                        latitude: res.latitude,
                        longitude: res.longitude,
                    });
                    resolve (data);
                })
                .catch ((err) => {
                    console.log(err);
                    reject (err);
                });
            });
        } catch (err) {
            throw { code_http: 500, message: err.message };
        }
    }
}