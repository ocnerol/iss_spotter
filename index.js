
const { fetchMyIP, fetchcoordsByIP } = require("./iss");

fetchcoordsByIP('104.205.47.132', (error, data) => {
  if (error) {
    console.log(`There was an error!: `, error);
    return;
  }

  console.log('Got some coordinates: ', data);

});


// fetchMyIP((error, ip) => {

//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);

// });