const request = require("request");
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


}

module.exports = { fetchMyIP, fetchcoordsByIP };