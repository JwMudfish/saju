var oHang = {};

//오행 뱉어내는 함수
oHang.oHang = function (pillar) {
  let result;
  //목
  if (
    pillar === "갑" ||
    pillar === "을" ||
    pillar === "인" ||
    pillar === "묘"
  ) {
    result = "목";
  }
  //화
  else if (
    pillar === "병" ||
    pillar === "정" ||
    pillar === "사" ||
    pillar === "오"
  ) {
    result = "화";
  }
  //토
  else if (
    pillar === "무" ||
    pillar === "기" ||
    pillar === "진" ||
    pillar === "술" ||
    pillar === "축" ||
    pillar === "미"
  ) {
    result = "토";
  }
  //금 (천간 신금 지지 신금 모두 금이므로 신이라는 글자는 하나만 들어감)
  else if (pillar === "경" || pillar === "신" || pillar === "유") {
    result = "금";
  } //수
  else if (
    pillar === "임" ||
    pillar === "계" ||
    pillar === "해" ||
    pillar === "자"
  ) {
    result = "수";
  } else {
    result = "  ";
  }

  return result;
};

module.exports = oHang;
