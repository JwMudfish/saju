var Sangsin = {};

var title = 'jisok_';
var totalTitle;
const resultTest = require('../testResult/contents_jisok.json');

Sangsin.randum = function () {
  self();
  return getResult(totalTitle);
};
const self = () => {
  if (
    jisokCheck(useRyeong.yongsin) === '계' ||
    jisokCheck(useRyeong.yongsin) === '갑' ||
    jisokCheck(useRyeong.yongsin) === '정' ||
    jisokCheck(useRyeong.yongsin) === '경'
  ) {
    if (useRyeong.jisok.exist === 'Y') {
      totalTitle = title + 1;
    } else {
      totalTitle = title + 2;
    }
  } else if (
    jisokCheck(useRyeong.yongsin) === '을' ||
    jisokCheck(useRyeong.yongsin) === '병' ||
    jisokCheck(useRyeong.yongsin) === '신' ||
    jisokCheck(useRyeong.yongsin) === '임'
  ) {
    if (useRyeong.jisok.exist === 'Y') {
      totalTitle = title + 3;
    } else {
      totalTitle = title + 4;
    }
  }
};

function jisokCheck(dr) {
  let result;
  if (dr === '갑') {
    result = '신';
  } else if (dr === '을') {
    result = '계';
  } else if (dr === '병') {
    result = '계';
  } else if (dr === '정') {
    result = '을';
  } else if (dr === '경') {
    result = '을';
  } else if (dr === '신') {
    result = '정';
  } else if (dr === '임') {
    result = '정';
  } else if (dr === '계') {
    result = '신';
  }
  return result;
}
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
module.exports = Sangsin;
