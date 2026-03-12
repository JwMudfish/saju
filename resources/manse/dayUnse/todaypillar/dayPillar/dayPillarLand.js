var day = {};

day.dayPillarLand = function (number) {
  let result;
  //1월부터

  const land = [
    "술",
    "해",
    "자",
    "축",
    "인",
    "묘",
    "진",
    "사",
    "오",
    "미",
    "신",
    "유",
  ];
  //코드값을 받아서 12으로 나눈 나머지 값으로 배열에 넣음
  let coordinate = number % 12;
  result = land[coordinate];
  return result;
};

module.exports = day;
