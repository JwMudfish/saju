var Sangsin = {};

var title = 'hwakjang_';
var totalTitle;
const resultTest = require('../testResult/contents_hwakjang.json');

Sangsin.randum = function () {
  self();
  return getResult(totalTitle);
};
const self = () => {
  if (
    hwakjangCheck(useRyeong.yongsin) === '계' ||
    hwakjangCheck(useRyeong.yongsin) === '갑' ||
    hwakjangCheck(useRyeong.yongsin) === '정' ||
    hwakjangCheck(useRyeong.yongsin) === '경'
  ) {
    if (useRyeong.hwakjang.exist === 'Y') {
      totalTitle = title + 1;
    } else {
      totalTitle = title + 2;
    }
  } else if (
    hwakjangCheck(useRyeong.yongsin) === '을' ||
    hwakjangCheck(useRyeong.yongsin) === '병' ||
    hwakjangCheck(useRyeong.yongsin) === '신' ||
    hwakjangCheck(useRyeong.yongsin) === '임'
  ) {
    if (useRyeong.hwakjang.exist === 'Y') {
      totalTitle = title + 3;
    } else {
      totalTitle = title + 4;
    }
  }
};

//확장성체크
function hwakjangCheck(dr) {
  let result;
  if (dr === '갑') {
    result = '병';
  } else if (dr === '을') {
    result = '경';
  } else if (dr === '병') {
    result = '경';
  } else if (dr === '정') {
    result = '임';
  } else if (dr === '경') {
    result = '임';
  } else if (dr === '신') {
    result = '갑';
  } else if (dr === '임') {
    result = '갑';
  } else if (dr === '계') {
    result = '병';
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
