var request = require("request");

const options = {
  uri: "http://barosaju.cafe24.com/calc_jsonp.php",
  qs: {
    NAME: "임이니",
    SEX: "F",
    GUBUN_CALENDAR: "1",
    YEAR: "1990",
    MONTH: "3",
    DAY: "4",
    HOUR: "4",
    MINUTE: "0",
    GUBUN_TIME: "0",
  },
};

request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var test = JSON.parse(body);
  }
});
