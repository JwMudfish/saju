var hisin = {};
var title = 'Hisin_';

var totalTitle;
const resultTest = require('../testResult/contents_Hisin.json');

hisin.randum = function () {
  self();
  let result = getResult(totalTitle);
  result.use = checkUse(useRyeong.heuisin.use);
  return result;
};
const self = () => {
  if (useRyeong.heuisin.exist === 'N') {
    totalTitle = title + 2;
  } else {
    totalTitle = title + 1;
  }
};

function checkUse(use) {
  let result = 'N';
  if (use.includes('Y') || use.includes('y')) {
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
module.exports = hisin;
