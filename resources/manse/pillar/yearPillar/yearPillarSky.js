var year = {};

year.yearPillarSky = function (year) {
  let temp = year % 10;
  const array = ["경", "신", "임", "계", "갑", "을", "병", "정", "무", "기"]
  let result = array[temp];
  return result;
};

module.exports = year;
