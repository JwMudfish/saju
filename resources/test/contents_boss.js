var boss = {};
var title = "boss_";
var num;
var totalTitle;
// num = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
const resultTest = require('../testResult/contents_boss.json');
boss.randum = function () {
  self();
  return getResult(totalTitle);
};
const self = () => {
  const pillar = [
    usePillar.y_sky,
    usePillar.m_sky,
    usePillar.d_sky,
    usePillar.h_sky,
    /*    test.PILLAR.YEAR_PILLAR_SKY,
    test.PILLAR.MONTH_PILLAR_SKY,
    test.PILLAR.DAY_PILLAR_SKY,
    test.PILLAR.HOUR_PILLAR_SKY,*/
  ];
  if (checkTest(pillar, "기", "갑")) {
    console.log("믿음형");
    totalTitle = title + 1;
  } else if (checkTest(pillar, "을", "갑")) {
    console.log("가족형");
    totalTitle = title + 2;
  } else if (checkTest(pillar, "신", "병")) {
    console.log("다정형");
    totalTitle = title + 3;
  } else if (checkTest(pillar, "정", "병")) {
    console.log("리더형");
    totalTitle = title + 4;
  } else if (checkTest(pillar, "계", "무")) {
    console.log("호구형");
    totalTitle = title + 5;
  } else if (checkTest(pillar, "무", "기")) {
    console.log("숙주형");
    totalTitle = title + 6;
  } else if (checkTest(pillar, "경", "을")) {
    console.log("각개전투형");

    totalTitle = title + 7;
  } else if (checkTest(pillar, "신", "경")) {
    console.log("카리스마형");
    totalTitle = title + 8;
  } else if (checkTest(pillar, "정", "임")) {
    console.log("친구형");
    totalTitle = title + 9;
  } else if (checkTest(pillar, "임", "계")) {
    console.log("스승형");
    totalTitle = title + 10;
  } else {
    console.log("집착보다도 무서운 무관심.");
    totalTitle = title + 11;
  }
};

const checkTest = (pillar, one, two) => {
  let resultValue = false;
  let oneCount = 0;
  let twoCount = 0;
  for (let i = 0; i < pillar.length; i++) {
    if (pillar[i] === one) {
      oneCount = oneCount + 1;
    } else if (pillar[i] === two) {
      twoCount = twoCount = 1;
    }
  }
  if (oneCount > 0 && twoCount > 0) {
    resultValue = true;
  }

  return resultValue;
};
function getResult(title) {
  let result;
  for (let i = 0; i < resultTest.contentsList.length; i++) {
    if (title === resultTest.contentsList[i].title) {
      result = resultTest.contentsList[i];
      break;
    }
  }
  return result;
}
module.exports = boss;
