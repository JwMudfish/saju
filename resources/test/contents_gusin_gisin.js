var gusin = {};

var title = 'gusin_gisin_';
var num;
var totalTitle;
// num = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
const resultTest = require('../testResult/contents_gusin_gisin.json');
gusin.randum = function () {
  self();
  let result = getResult(totalTitle);
  if (useShgj.gukgubun === '길격') {
    result.use = checkUse(useShgj.gukgisin.use);
  } else {
    result.use = checkUse(useShgj.gusingisin.use);
  }
  return result;
};
const self = () => {
  if (useShgj.gukgubun === '길격') {
    if (useShgj.gukgisin.exist === 'N') {
      totalTitle = title + 2;
    } else {
      totalTitle = title + 1;
    }
  } else {
    if (useShgj.gusingisin.exist === 'N') {
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
module.exports = gusin;
