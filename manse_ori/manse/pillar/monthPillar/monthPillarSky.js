var month = {};

month.monthPillarSky = function (month, yearSky) {
  let result;
  //1월때문에 임시의 변수에다가 담음
  let mon = month;
  //2월부터
  //갑기
  const gabgi = [
    "병",
    "정",
    "무",
    "기",
    "경",
    "신",
    "임",
    "계",
    "갑",
    "을",
    "병",
    "정",
  ];
  //을경
  const ulgung = [
    "무",
    "기",
    "경",
    "신",
    "임",
    "계",
    "갑",
    "을",
    "병",
    "정",
    "무",
    "기",
  ];
  //병신
  const byongsin = [
    "경",
    "신",
    "임",
    "계",
    "갑",
    "을",
    "병",
    "정",
    "무",
    "기",
    "경",
    "신",
  ];
  //정임
  const jungim = [
    "임",
    "계",
    "갑",
    "을",
    "병",
    "정",
    "무",
    "기",
    "경",
    "신",
    "임",
    "계",
  ];
  //무계
  const muje = [
    "갑",
    "을",
    "병",
    "정",
    "무",
    "기",
    "경",
    "신",
    "임",
    "계",
    "갑",
    "을",
  ];

  if (Number(mon) === 1) {
    mon = 13;
  }
  if (yearSky === "갑" || yearSky === "기") {
    result = gabgi[mon - 2];
  } else if (yearSky === "을" || yearSky === "경") {
    result = ulgung[mon - 2];
  } else if (yearSky === "병" || yearSky === "신") {
    result = byongsin[mon - 2];
  } else if (yearSky === "정" || yearSky == "임") {
    result = jungim[mon - 2];
  } else if (yearSky === "무" || yearSky == "계") {
    result = muje[mon - 2];
  } else {
    result = "";
  }
  return result;
};

module.exports = month;
