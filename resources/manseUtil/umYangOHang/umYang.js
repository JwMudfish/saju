var umYang = {};

/**
 * 
 * @param {String} pillar 
 * @param {Number} SkyLand (1은 천간 2는 지지)
 * @returns 
 */
umYang.umYang = function (pillar, SkyLand) {
  let result;
  //skyLand는 천간신금인지 지지신금인지 구분하기위한 용도!
  //천간 양
  if (
    SkyLand === 1 &&
    (pillar === "갑" ||
      pillar === "병" ||
      pillar === "무" ||
      pillar === "경" ||
      pillar === "임")
  ) {
    result = "양";
  }
  //천간 음
  else if (
    SkyLand === 1 &&
    (pillar === "을" ||
      pillar === "정" ||
      pillar === "기" ||
      pillar === "신" ||
      pillar === "계")
  ) {
    result = "음";
  }
  //지지 양
  else if (
    SkyLand === 2 &&
    (pillar === "인" ||
      pillar === "신" ||
      pillar === "사" ||
      pillar === "해" ||
      pillar === "진" ||
      pillar === "술")
  ) {
    result = "양";
  } else if (
    SkyLand === 2 &&
    (pillar === "자" ||
      pillar === "오" ||
      pillar === "묘" ||
      pillar === "유" ||
      pillar === "축" ||
      pillar === "미")
  ) {
    result = "음";
  } else {
    result = "  ";
  }

  return result;
};

module.exports = umYang;
