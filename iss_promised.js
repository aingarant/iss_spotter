const request = require("request-promise-native");
const fetchIpUrl = `https://api.ipify.org?format=json`;
const ipWhoIsUrl = `http://ipwho.is/`;
const flyOverUrl = `https://iss-flyover.herokuapp.com/json/?`;

const fetchMyIP = () => {
  return request(fetchIpUrl);
};

const fetchCoordsByIP = (body) => {

  const ip = JSON.parse(body).ip;
  const url = `${ipWhoIsUrl}${ip}`;
  return request(url);

};

const fetchISSFlyOverTimes = (data) => {

  const coords = {
    latitude: data.latitude,
    longitude: data.longitude,
  };
  const url = `${flyOverUrl}lat=${coords.latitude}&lon=${coords.longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = (flytimes) => {
  let output = "";
  flytimes.map(flytime => {
    const time = new Date(flytime.risetime * 1000);
    const duration = flytime.duration;
    output += `Next pass at ${time} for ${duration} seconds! \n`;
  });
  return Promise.resolve(output);
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
};
