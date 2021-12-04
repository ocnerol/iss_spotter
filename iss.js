const request = require("request");

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    // error with fetching IP
    if (error) {
      return callback(error, null);
    }

    // no error!, we have an IP address!
    fetchcoordsByIP(ip, (error, coords) => {
      // error with fetching coords
      if (error) {
        return callback(error, null);
      }

      //no error, we have coords!
      fetchISSFlyOverTimes(coords, (error, flytimes) => {
        // error with getting flyover times
        if (error) {
          return callback(error, null);
        }

        // no error, we have flyover times data!
        callback(null, flytimes);
      });
    });
  });

};

/*
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = function(callback) {

  request('https://api.ipify.org?format=json', (error, response, body) => {
    // error handling
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // no error, we have the ip address!
    const data = JSON.parse(body);
    return callback(null, data.ip);

  });

};

const fetchcoordsByIP = function(ip, callback) {

  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    // error handling
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // no errors, we have coordinates!
    const obj = JSON.parse(body);
    const latitude = obj.latitude;
    const longitude = obj.longitude;
    return callback(null, { latitude, longitude });

  });


};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {

  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {

    // error handling
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching flyover times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // no errors, we have flyovertimes!
    const flyoverTimes = JSON.parse(body).response;
    callback(null, flyoverTimes);


  });
};

module.exports = { nextISSTimesForMyLocation };