var year = {};

year.yearPillarLand = function (year) {
  let temp = year % 12;
  const array = ["신", "유", "술", "해", "자", "축", "인", "묘", "진", "사", "오", "미"]
  let result = array[temp];
  return result;

};

module.exports = year;
