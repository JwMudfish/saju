var Sangsin = {};

var title = 'Sangsin_';
var num;
var totalTitle;
const resultTest = require('../testResult/contents_sangsin.json');
let options;
Sangsin.randum = function () {
  self();
  let result = getResult(totalTitle);
  result.use = checkUse(useShgj.sangsin.use);
  return result;
};

const self = () => {
  if (useShgj.gukgubun === '길격') {
    if (useShgj.sangsin.exist === 'N') {
      totalTitle = title + 2;
    } else {
      totalTitle = title + 1;
    }
  } else {
    if (useShgj.sangsin.exist === 'N') {
      totalTitle = title + 4;
    } else {
      totalTitle = title + 3;
    }
  }
};

function checkUse(use) {
  let result = 'N';
  if (use.includes('Y')) {
    result = 'Y';
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
