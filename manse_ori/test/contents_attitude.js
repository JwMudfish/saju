var Sangsin = {};

var title = 'ilgan_attitude_';
var num;
var totalTitle;
const resultTest = require('../testResult/contents_attitude.json');
let options;
Sangsin.randum = function () {
  self();

  let result = {
    attitudeSocial: {},
    attitudeProblem: {},
  };
  result.attitudeSocial = getResult(totalTitle);
  result.attitudeProblem = getResult(getProblem('attitude_munjea_'));
  return result;
};
const self = () => {
  if (useBasicFunc.rootTong.totalRoot === 'king_root' || useBasicFunc.rootTong.totalRoot === 'pure_root') {
    totalTitle = title + 1;
  } else {
    totalTitle = title + 2;
  }
};

const getProblem = (check) => {
  let result;
  let root = Object.values(useBasicFunc.rootTong)
  if (useBasicFunc.rootTong.totalRoot === 'king_root') {
    result = check + 1;
  } else if (root.includes('samhap_root') === true) {
    result = check + 2;
  } else if (root.includes('noonchi_root') === true) {
    result = check + 3;
  } else if (root.includes('seson_root') === true) {
    result = check + 4;
  } else if (useBasicFunc.rootTong.totalRoot === 'pure_root') {
    result = check + 5;
  } else if (useBasicFunc.rootTong.totalRoot === 'mu_root') {
    result = check + 6;
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
