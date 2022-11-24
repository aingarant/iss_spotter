const request = require("request");
const fetchIpUrl = `https://api.ipify.org?format=js`;
const ipWhoIsUrl = `http://ipwho.is/`;
let error = null;
let desc = null;

const fetchMyIP = (callback) => {
  request(fetchIpUrl, (error, response, body) => {

    if (error) {
      callback(error, desc);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), desc);
      return;
    }
    callback(error, body);
  });
};

const fetchCoordsByIP = (callback) => {
  const ip = '8.8.4.4';
  request(ipWhoIsUrl + ip, (error, response, body) => {
    const data = JSON.parse(response.body);

    if (error) {
      callback(error, desc);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), desc);
      return;
    }

    const coords = {
      'latitude': data.latitude,
      'longitude': data.longitude
    };

    callback(error, coords);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };
