const request = require("request");
const fetchIpUrl = `https://api.ipify.org?format=json`;
const ipWhoIsUrl = `http://ipwho.is/`;
const flyOverUrl = `https://iss-flyover.herokuapp.com/json/?`;

// lat=YOUR_LAT_INPUT_HERE&lon=YOUR_LON_INPUT_HERE`

const fetchMyIP = (callback) => {
  request(fetchIpUrl, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(error, JSON.parse(body).ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(ipWhoIsUrl + ip, (error, response, body) => {
    const data = JSON.parse(response.body);

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    if (data.success !== true) {
      const msg = data.message;
      callback(msg, null);
      return;
    }

    const coords = {
      latitude: data.latitude,
      longitude: data.longitude,
    };

    callback(null, coords);
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  const url = `${flyOverUrl}lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    const data = JSON.parse(response.body);

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    if (data.message !== "success") {
      const msg = data.message;
      callback(msg, null);
      return;
    }

    callback(null, data.response);
  });
};

const nextISSTimesForMyLocation = (flytimes, callback) => {
  let output = "";

  flytimes.map(flytime => {
    const time = new Date(flytime.risetime * 1000);
    const duration = flytime.duration;
    output += `Next pass at ${time} for ${duration} seconds! \n`;
  });
  callback(null, output);
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
};
