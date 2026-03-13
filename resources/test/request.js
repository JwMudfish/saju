var request = require("request-promise-native");

var request_module = {};

request_module.req = function (options) {
  return new Promise((resolve) => {
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var test = JSON.parse(body);
        resolve(test);
      }
    });
  }).catch((error) => {
    console.log(error);
    return error;
});
};

module.exports = request_module;
