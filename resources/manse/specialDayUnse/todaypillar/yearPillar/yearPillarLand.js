var year = {};

year.yearPillarLand = function (year) {
  let temp = year % 12;
  let result;
  switch (temp) {
    case 0:
      result = "신";

      break;

    case 1:
      result = "유";

      break;

    case 2:
      result = "술";

      break;

    case 3:
      result = "해";

      break;
    case 4:
      result = "자";

      break;
    case 5:
      result = "축";

      break;
    case 6:
      result = "인";

      break;
    case 7:
      result = "묘";

      break;
    case 8:
      result = "진";

      break;
    case 9:
      result = "사";

      break;
    case 10:
      result = "오";

      break;
    case 11:
      result = "미";

      break;

    default:
      result = "";

      break;
  }
  return result;
};

module.exports = year;
