var ilgan = {};
var title = "ilgan_";
var num;
var totalTitle;
const resultTest = require('../testResult/contents_ilgan.json');
const getIlganText = require ('./contents_light_question_test/contents_question_2')
ilgan.randum = function (test) {
  let result = {}
  self(test);
  result =  getResult(totalTitle)
  // result.contents=result.contents+getIlganText.randum()
  return result;
};
const self = (test) => {
  if (usePillar.d_sky === "갑") {
    console.log("갑");
    totalTitle = title + 1;
  } else if (usePillar.d_sky === "을") {
    console.log("을");
    totalTitle = title + 2;
  } else if (usePillar.d_sky === "병") {
    console.log("병");
    totalTitle = title + 3;
  } else if (usePillar.d_sky === "정") {
    console.log("정");
    totalTitle = title + 4;
  } else if (usePillar.d_sky === "무") {
    console.log("무");
    totalTitle = title + 5;
  } else if (usePillar.d_sky === "기") {
    console.log("기");
    totalTitle = title + 6;
  } else if (usePillar.d_sky === "경") {
    console.log("경");
    totalTitle = title + 7;
  } else if (usePillar.d_sky === "신") {
    console.log("신");
    totalTitle = title + 8;
  } else if (usePillar.d_sky === "임") {
    console.log("임");
    totalTitle = title + 9;
  } else if (usePillar.d_sky === "계") {
    console.log("계");
    totalTitle = title + 10;
  }
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
module.exports = ilgan;
