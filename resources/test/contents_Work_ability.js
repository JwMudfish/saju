var Work_ability = {};

Work_ability.randum = function (month, day) {
  var title = "Work_ability_";
  var num = Math.floor(Math.random() * (5 - 1 + 1)) + 1;

  return title + num;
};

module.exports = Work_ability;
