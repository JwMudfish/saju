var jobless = {};

jobless.randum = function (month, day) {
  var title = "jobless_";
  var num = Math.floor(Math.random() * (2 - 1 + 1)) + 1;

  return title + num;
};

module.exports = jobless;
