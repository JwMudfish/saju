var day = {};

day.dayPillarSky = function (number) {
  let result;
  //코드값을 받아서 10으로 나눈 나머지 값으로 배열에 넣음
  let coordinate = number % 10;
  //1월부터
  const sky = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"];
  result = sky[coordinate];
  return result;
};

module.exports = day;
