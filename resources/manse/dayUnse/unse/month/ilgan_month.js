var unse = {};
let resultTest;
let contents;
unse.ilganMonth = function (month) {
  let result;
  resultTest = require('../../../../monthUnse/ilgan/ilgan_' +
    month +
    '_unse.json');
  contents = require('./ilgan_month_contents/contents' + month);
  let ilganCommon = getResult(usePillar.d_sky, '');
  let getCaseTitle = checkCase(usePillar.d_sky);
  let getCase = '';
  for (let i = 0; i < getCaseTitle.length; i++) {
    getCase =
      getCase + getResult(usePillar.d_sky, getCaseTitle[i]).contents + '\\n';
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
  } else if (dsky === '무') {
    result = contents.contentsMu();
  } else if (dsky === '기') {
    result = contents.contentsGi();
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
    if (resultTest.data[i].title === 'd_sky_' + change(word) + whatCase) {
      result = resultTest.data[i];
      break;
    }
  }
  return result;
}

function change(word) {
  let result;

  if (word === '갑') {
    result = 'gap';
  } else if (word === '을') {
    result = 'eul';
  } else if (word === '병') {
    result = 'byeong';
  } else if (word === '정') {
    result = 'jeong';
  } else if (word === '무') {
    result = 'mu';
  } else if (word === '기') {
    result = 'gi';
  } else if (word === '경') {
    result = 'gyeong';
  } else if (word === '신') {
    result = 'shin';
  } else if (word === '임') {
    result = 'lim';
  } else if (word === '계') {
    result = 'gye';
  }
  return result;
}
module.exports = unse;
