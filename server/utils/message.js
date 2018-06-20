var moment = require('moment');


var generateMessage = (from, text) => {
  var createdAt = moment().valueOf();
  return {
    from,
    text,
    createdAt
  };
};

var generateLocationMessage = (from, latitude, longitude) => {
  var createdAt = moment().valueOf();
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt
  };
};

module.exports = {generateMessage, generateLocationMessage};
