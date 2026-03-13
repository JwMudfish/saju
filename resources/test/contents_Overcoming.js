var Overcoming = {};

Overcoming.randum = function (month, day) {
  var title = "Overcoming_";
  var num = Math.floor(Math.random() * (4 - 1 + 1)) + 1;

  return title + num;
};

module.exports = Overcoming;
