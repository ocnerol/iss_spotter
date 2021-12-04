
const makeReport = (passTimeObject) => {
  const date = Date(passTimeObject.risetime);
  const duration = passTimeObject.duration;
  return `Next pass at ${date} for ${duration} seconds!`;
};

module.exports = { makeReport }