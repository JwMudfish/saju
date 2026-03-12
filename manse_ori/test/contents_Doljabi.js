var Doljabi = {};
var title = "Doljabi_";
var num;
var totalTitle;

const resultTest = require('../testResult/contents_Doljabi.json');
Doljabi.randum = function (test) {
  self(test);
  return getResult(totalTitle);
};

//일단 사용가능하든 안하든 있으면 있는거고
//없으면 없는걸루
const self = (test) => {
  if (useRyeong.yongsin === "갑") {
    if (useRyeong.heuisin.exist === "N") {
      totalTitle = title + 2;
    } else {
      totalTitle = title + 1;
    }
  } else if (useRyeong.yongsin === "을") {
    if (useRyeong.heuisin.exist === "N") {
      totalTitle = title + 4;
    } else {
      totalTitle = title + 3;
    }
  } else if (useRyeong.yongsin === "병") {
    if (useRyeong.heuisin.exist === "N") {
      totalTitle = title + 6;
    } else {
      totalTitle = title + 4;
    }
  } else if (useRyeong.yongsin === "정") {
    if (useRyeong.heuisin.exist === "N") {
      totalTitle = title + 8;
    } else {
      totalTitle = title + 7;
    }
  } else if (useRyeong.yongsin === "경") {
    if (useRyeong.heuisin.exist === "N") {
      totalTitle = title + 10;
    } else {
      totalTitle = title + 9;
    }
  } else if (useRyeong.yongsin === "신") {
    if (useRyeong.heuisin.exist === "N") {
      totalTitle = title + 12;
    } else {
      totalTitle = title + 11;
    }
  } else if (useRyeong.yongsin === "임") {
    if (useRyeong.heuisin.exist === "N") {
      totalTitle = title + 14;
    } else {
      totalTitle = title + 13;
    }
  } else if (useRyeong.yongsin === "계") {
    if (useRyeong.heuisin.exist === "N") {
      totalTitle = title + 16;
    } else {
      totalTitle = title + 15;
    }
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
