const { nextISSTimesForMyLocation } = require('./iss_promised');


nextISSTimesForMyLocation();

// my implementation
// learned that we can pass the next functions as callbacks to the next .then()
// and that the promise chaining can occur in the file where we defined our functions, so our index file just calls it

// fetchMyIP()
//   .then(data => fetchcoordsByIP(data))
//   .then(response => fetchISSFlyOverTimes(response))
//   .then(response => {
//     const responseArray = JSON.parse(response).response;
//     const responses = responseArray.map(respObj => makeReport(respObj));
//     console.log(responses.join('\n'));
//   });

// example of passing functions as callbacks to .then()
// fetchMyIP()
//   .then(fetchcoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(body => console.log(body))


