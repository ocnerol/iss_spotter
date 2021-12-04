const request = require('request-promise-native');
const { makeReport } = require('./makeReport');

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

/* 
 * Makes a request to freegeoip.app using the provided IP address, to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */

const fetchcoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return (request(`https://freegeoip.app/json/${ip}`));
  // const body = JSON.parse(request(`https://freegeoip.app/json/${ip}`));
  // const { latitude, longitude } = body;
  // return { latitude, longitude };

};

const fetchISSFlyOverTimes = function(body) {
  const responseObject = JSON.parse(body);
  const { latitude, longitude } = responseObject;
  return (request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`));
}

const nextISSTimesForMyLocation = function() {
  fetchMyIP()
    .then(fetchcoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(response => {
      const responseArray = JSON.parse(response).response;
      const responses = responseArray.map(respObj => makeReport(respObj));
      console.log(responses.join('\n'));
    })
    .catch((error) => {
      console.log('It didn\'t work: ', error.message);
    });
};

module.exports = { nextISSTimesForMyLocation };

