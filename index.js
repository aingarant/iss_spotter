const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require("./iss");

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  fetchCoordsByIP(ip, (error, coords) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }

    fetchISSFlyOverTimes(coords, (error, flyTimes) => {
      if (error) {
        console.log("It didn't work!", error);
        return;
      }

      nextISSTimesForMyLocation(flyTimes, (error, details) => {
        if (error) {
          return console.log("It didn't work!", error);
        }
        // console.log(flyTimes);
        console.log(details);
      });
    });
  });
});