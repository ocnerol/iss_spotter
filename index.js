
const { nextISSTimesForMyLocation } = require("./iss");


nextISSTimesForMyLocation((error, passTimes) => {

  if (error) {
    return console.log('It didn\'t work!', error);
  }

  // success, print out the details!
  const makeReport = (passTimeObject) => {
    const date = Date(passTimeObject.risetime);
    const duration = passTimeObject.duration;
    return `Next pass at ${date} for ${duration} seconds!`;
  };
  passTimesArray = passTimes.map(obj => makeReport(obj));
  console.log(passTimesArray.join('\n'));
})


// fetchMyIP((error, ip) => {

//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
//   fetchcoordsByIP(ip, (error, coords) => {
//     if (error) {
//       console.log(`There was an error!: `, error);
//       return;
//     }

//     console.log('Got some coordinates: ', coords);
//     fetchISSFlyOverTimes(coords, (error, flyovers) => {
//       if (error) {
//         console.log(`There was an error!:`, error);
//         return;
//       }

//       console.log('These are the flyovertimes:', flyovers);

//     });

//   });

// });

// fetchcoordsByIP('IP goes here', (error, data) => {
//   if (error) {
//     console.log(`There was an error!: `, error);
//     return;
//   }

//   console.log('Got some coordinates: ', data);


// });




// fetchISSFlyOverTimes({ latitude: '55.1834',  longitude: '-118.7457' }, (error, flyovers) => {
//   if (error) {
//     console.log(`There was an error!:`, error);
//     return;
//   }

//   console.log('These are the flyovertimes:', flyovers);

// });