var Doljabi = {};
var title = "yongsin_";
var num;
var totalTitle;
const resultTest = require('../testResult/contents_yongsin.json');
Doljabi.randum = function () {
  self();
  return getResult(totalTitle);
};

//일단 사용가능하든 안하든 있으면 있는거고
//없으면 없는걸루
const self = () => {
  if (useRyeong.yongsin === "계") {
    totalTitle = title + 1;
  } else if (useRyeong.yongsin === "갑") {
    totalTitle = title + 2;
  } else if (useRyeong.yongsin === "을") {
    totalTitle = title + 3;
  } else if (useRyeong.yongsin === "병") {
    totalTitle = title + 4;
  } else if (useRyeong.yongsin === "정") {
    totalTitle = title + 5;
  } else if (useRyeong.yongsin === "경") {
    totalTitle = title + 6;
  } else if (useRyeong.yongsin === "신") {
    totalTitle = title + 7;
  } else if (useRyeong.yongsin === "임") {
    totalTitle = title + 8;
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
module.exports = Doljabi;
