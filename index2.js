const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require("./iss_promised");

const getInfo = () => {
  fetchMyIP()
    .then((result) => {
      fetchCoordsByIP(result)
        .then(result2 => {
          fetchISSFlyOverTimes(JSON.parse(result2))
            .then(result3 => {
              nextISSTimesForMyLocation(JSON.parse(result3).response)
                .then(output => console.log(output));
            });
        });
    })

    .catch((error) => console.log(error));
};

getInfo();