var month = {};

month.monthPillarLand = function (month) {
  let result;
  //1월부터
  const land = [
    "축",
    "인",
    "묘",
    "진",
    "사",
    "오",
    "미",
    "신",
    "유",
    "술",
    "해",
    "자",
  ];
  result = land[month - 1];
  return result;
};

module.exports = month;
