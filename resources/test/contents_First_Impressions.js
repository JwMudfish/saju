var First_Impressions = {};

First_Impressions.randum = function (month, day) {
  var title = "First_Impressions_";
  var num = Math.floor(Math.random() * (5 - 1 + 1)) + 1;

  return title + num;
};

module.exports = First_Impressions;
