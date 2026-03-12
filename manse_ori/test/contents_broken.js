var broken = {};
var title = "broken_";
var num;
var totalTitle;

const resultTest = require('../testResult/contents_broken.json');
broken.randum = function () {
  self();
  return getResult(totalTitle);
};
const self = () => {
  const pillar = [
    usePillar.y_sky,
    usePillar.m_sky,
    usePillar.d_sky,
    usePillar.h_sky,
  ];
  if (checkTest(pillar, "경", "갑")) {
    console.log("나도 모르게 자꾸 하는 비교질.");
    totalTitle = title + 1;
  } else if (checkTest(pillar, "을", "신")) {
    console.log("상대도 지치게 하는 비관적언행.");
    totalTitle = title + 2;
  } else if (checkTest(pillar, "임", "병")) {
    console.log("상대를 불안하게 한 나의 행적.");
    totalTitle = title + 3;
  } else if (checkTest(pillar, "정", "계")) {
    console.log("선을 넘은 나의 참견.");
    totalTitle = title + 4;
  } else if (checkTest(pillar, "갑", "무")) {
    console.log("상대도 다운되게 하는 무기력증.");
    totalTitle = title + 5;
  } else if (checkTest(pillar, "을", "기")) {
    console.log("현실능력이 부족해보이는 언행.");
    totalTitle = title + 6;
  } else if (checkTest(pillar, "정", "신")) {
    console.log("무의식적으로 했던 핑계.");
    totalTitle = title + 7;
  } else if (checkTest(pillar, "병", "경")) {
    console.log("자존감 깎아내는 무시.");
    totalTitle = title + 8;
  } else if (checkTest(pillar, "무", "임")) {
    console.log("답정너같은 고집.");
    totalTitle = title + 9;
  } else if (checkTest(pillar, "기", "계")) {
    console.log("과거경험을 빌미로한 의심.");
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
module.exports = broken;
