var year = {};

year.yearPillarSky = function (year) {
  let temp = year % 10;
  let result;
  switch (temp) {
    case 0:
      result = "경";

      break;

    case 1:
      result = "신";

      break;

    case 2:
      result = "임";

      break;

    case 3:
      result = "계";

      break;
    case 4:
      result = "갑";

      break;
    case 5:
      result = "을";

      break;
    case 6:
      result = "병";

      break;
    case 7:
      result = "정";

      break;
    case 8:
      result = "무";

      break;
    case 9:
      result = "기";

      break;

    default:
      result = "";

      break;
  }
  return result;
};

module.exports = year;
