var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',

  httpAdapter: 'https',
  apiKey: 'AIzaSyAcUYs-kPkptezbhZnMQ0u4C_jo5PmePNo',
  formatter: null
};

var geocoder = NodeGeocoder(options);

const res_geocoder = (address) => geocoder.geocode(address);

exports.res_geocoder = res_geocoder;