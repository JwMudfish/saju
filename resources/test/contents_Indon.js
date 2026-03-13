var Indon = {};

var title = 'Indon_';
var num;
var totalTitle;
const resultTest = require('../testResult/contents_Indon.json');
let options;
Indon.randum = function (test) {
  self(test);
  return getResult(totalTitle);
};
const self = (test) => {
  if (usePalPum.people === 'Y' && usePalPum.money === 'Y') {
    totalTitle = title + 1;
  } else if (usePalPum.people === 'Y' && usePalPum.money === 'N') {
    totalTitle = title + 2;
  } else if (usePalPum.people === 'N' && usePalPum.money === 'Y') {
    totalTitle = title + 3;
  } else if (usePalPum.people === 'N' && usePalPum.money === 'N') {
    totalTitle = title + 4;
  }
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
module.exports = Indon;
