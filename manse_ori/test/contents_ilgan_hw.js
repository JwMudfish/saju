var Sangsin = {};
var num;
var totalTitle;
const resultTest = require('../testResult/contents_ilgan_hw.json');
const hiYongWord = require('../manseUtil/hiyong/hiyongUtil')
let options;
Sangsin.randum = function () {
  let result = {
    doit: {},
    patience: {},
    all: {},
  };

  result.doit = getResult(doIt('do_it_'));
  result.patience = getResult(patience('patience_'));
  result.all = getResult(all('ALL_'));
  return result;
};
const doIt = (check) => {
  let result;
  if (hiYongWord.checkHiYN() === 'N') {
    result = check + 1;
  } else {
    result = check + 2;
  }
  return result;
};

const patience = (check) => {
  let result;
  if (hiYongWord.checkYongYN() === 'Y') {
    result = check + 1;
  } else {
    result = check + 2;
  }
  return result;
};

const all = (check) => {
  let result;

  if (hiYongWord.checkHiYN() === 'N' && hiYongWord.checkYongYN() === 'N') {
    result = check + 1;
  } else if (hiYongWord.checkHiYN() === 'Y' && hiYongWord.checkYongYN() === 'N') {
    result = check + 2;
  } else if (hiYongWord.checkHiYN() === 'N' && hiYongWord.checkYongYN() === 'Y') {
    result = check + 3;
  } else if (hiYongWord.checkHiYN() === 'Y' && hiYongWord.checkYongYN() === 'Y') {
    result = check + 4;
  }
  return result;
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
module.exports = Sangsin;
