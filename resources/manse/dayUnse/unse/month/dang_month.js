var unse = {};
let resultTest;
let contents;
unse.dangMonth = function (month) {
  let result;
  resultTest = require('../../../../monthUnse/dang/dang_' +
    month +
    '_unse.json');
  contents = require('./dang_month_contents/contents' + month);

  let ilganCommon = getResult(useRyeong.yongsin, getTitle(useRyeong.yongsin));
  let getCaseTitle = contents.contentsTotal();
  let getCase = '';

  for (let i = 0; i < getCaseTitle.length; i++) {

    if (getResult2(getCaseTitle[i]) !== undefined) {
      getCase = getCase + getResult2(getCaseTitle[i]).contents + '\\n';
    }

  }
  result = '';
  result = {
    title: ilganCommon.title,
    subtitle: ilganCommon.subtitle,
    contents: ilganCommon.contents,
    advice: getCase,
  };
  return result;
};

function getTitle(dsky) {
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
