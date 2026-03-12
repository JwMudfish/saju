var Spanding_mind = {};

var title = "spand_mind_";
var num;
var totalTitle;
const resultTest = require('../testResult/contents_spand_mind.json');
let options;
Spanding_mind.randum = function (test) {
  self(test);
  return getResult(totalTitle);
};
const self = (test) => {
  if (useGyouk === "주왕 건록격" || useGyouk === "건록격") {
    totalTitle = title + 1;
  } else if (useGyouk === "주왕 양인격" || useGyouk === "양인격") {
    totalTitle = title + 2;
  } else if (useGyouk === "상관격" || useGyouk === "주왕 상관격") {
    totalTitle = title + 3;
  } else if (useGyouk === "식신격" || useGyouk === "주왕 식신격") {
    totalTitle = title + 4;
  } else if (useGyouk === "정인격" || useGyouk === "주왕 정인격") {
    totalTitle = title + 5;
  } else if (useGyouk === "편인격" || useGyouk === "주왕 편인격") {
    totalTitle = title + 6;
  } else if (useGyouk === "정재격" || useGyouk === "주왕 정재격") {
    totalTitle = title + 7;
  } else if (useGyouk === "편재격" || useGyouk === "주왕 편재격") {
    totalTitle = title + 8;
  } else if (useGyouk === "정관격" || useGyouk === "주왕 정관격") {
    totalTitle = title + 9;
  } else if (useGyouk === "편관격" || useGyouk === "주왕 편관격") {
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
module.exports = Spanding_mind;
