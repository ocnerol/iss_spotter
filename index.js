
const { nextISSTimesForMyLocation } = require("./iss");



nextISSTimesForMyLocation((error, passTimes) => {

  if (error) {
    return console.log('It didn\'t work!', error);
  }

  // success, print out the details!
  const passTimesArray = passTimes.map(obj => makeReport(obj));
  console.log(passTimesArray.join('\n'));

});

