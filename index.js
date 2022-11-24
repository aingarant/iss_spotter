const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// // fetchMyIP((error, ip) => {
// //   if (error) {
// //     console.log("It didn't work!", error);
// //     return;
// //   }

// //   console.log('It worked! Returned IP:', ip);
// // });

// const ip = "99.244.238.208";
// // const ip = "99.28";


// fetchCoordsByIP(ip, (error, coords) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', coords);
// });



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
      console.log('It Worked: ', flyTimes);

      // return flyover times in here.
    });
  });
});