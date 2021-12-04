
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

  const passTimesArray = passTimes.map(obj => makeReport(obj));
  console.log(passTimesArray.join('\n'));

});