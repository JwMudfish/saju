var SangsinGisin = {};
var title = 'sangsin_gisin_';
var num;
var totalTitle;
const resultTest = require('../testResult/contents_sangsin_gisin.json');
let options;
SangsinGisin.randum = function (test) {
  self();
  let result = getResult(totalTitle);
  result.use = checkUse(useShgj.sangsingisin.use);
  return result;
};
const self = (test) => {
  if (useShgj.gukgubun === '길격') {
    if (useShgj.sangsingisin.exist === 'N') {
      totalTitle = title + 2;
    } else {
      totalTitle = title + 1;
    }
  } else {
    if (useShgj.sangsingisin.exist === 'N') {
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
module.exports = SangsinGisin;
