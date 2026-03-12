var unse = {};
const resultTest = require('../../../../yearUnse/dang_unse.json');
const contents = require('./dang_year_contents/contents');
unse.dangYear = function () {
  let result;
  let ilganCommon = getResult(useRyeong.yongsin, '');
  let getCaseTitle = checkCase(useRyeong.yongsin);
  let totalTitle = contents.contentsTotal();
  let getCase = '';
  let total = '';
  for (let i = 0; i < getCaseTitle.length; i++) {
    getCase =
      getCase + getResult(useRyeong.yongsin, getCaseTitle[i]).contents + '\\n';
  }
  for (let i = 0; i < totalTitle.length; i++) {

    total =
      total + getResult2(totalTitle[i]).contents + '\\n';
  }
  result = '';
  result = {
    title: ilganCommon.title,
    subtitle: ilganCommon.subtitle,
    contents: ilganCommon.contents,
    advice: getCase,
    total: total,
  };
  return result;
};

function checkCase(dsky) {
  let result;
  if (dsky === '갑') {
    result = contents.contentsGap();
  } else if (dsky === '을') {
    result = contents.contentsEul();
  } else if (dsky === '병') {
    result = contents.contentsByeong();
  } else if (dsky === '정') {
    result = contents.contentsJeong();
  } else if (dsky === '경') {
    result = contents.contentsGyeong();
  } else if (dsky === '신') {
    result = contents.contentsSin();
  } else if (dsky === '임') {
    result = contents.contentsLim();
  } else if (dsky === '계') {
    result = contents.contentsGye();
  }
  return result;
}

function getResult(word, whatCase) {
  let result;
  for (let i = 0; i < resultTest.data.length; i++) {
    if (resultTest.data[i].title === 'wol_1_' + change(word) + whatCase) {
      result = resultTest.data[i];
      break;
    }
  }
  return result;
}
function getResult2(total) {
  let result;
  for (let i = 0; i < resultTest.data.length; i++) {
    if (resultTest.data[i].title === 'wol_2_' + total) {
      result = resultTest.data[i];
      break;
    }
  }
  return result;
}

function change(word) {
  let result;

  if (word === '갑') {
    result = 'gapdang';
  } else if (word === '을') {
    result = 'euldang';
  } else if (word === '병') {
    result = 'byeongdang';
  } else if (word === '정') {
    result = 'jeongdang';
  } else if (word === '경') {
    result = 'gyeongdang';
  } else if (word === '신') {
    result = 'shindang';
  } else if (word === '임') {
    result = 'limdang';
  } else if (word === '계') {
    result = 'gyedang';
  }
  return result;
}
module.exports = unse;
