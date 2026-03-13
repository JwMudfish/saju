var dash = {};

var title = 'dash_';
var num;
var totalTitle;
// num = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
let options;

const gungShgjFunction = require('../manse/gungShgj/gungshgj');
const umYang = require('../manse/umYangOHang/umYang');
const resultTest = require('../testResult/contents_ilgan_love.json');
dash.randum = function () {
  return self();
};
const self = () => {
  let result;
  let shgj = [
    gungShgjFunction.sangguk('갑'),
    gungShgjFunction.sangguk('을'),
    gungShgjFunction.sangguk('병'),
    gungShgjFunction.sangguk('정'),
    gungShgjFunction.sangguk('무'),
    gungShgjFunction.sangguk('기'),
    gungShgjFunction.sangguk('경'),
    gungShgjFunction.sangguk('신'),
    gungShgjFunction.sangguk('임'),
    gungShgjFunction.sangguk('계'),
  ];

  let pillar = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
  for (let i = 0; i < shgj.length; i++) {
    if (shgj[i].sssg === 'shang_come' && shgj[i].JP === 'Y') {
      result = umYang.umYang(pillar[i]);
      break;
    }
  }

  let temp;
  //상대가 어필
  if (result === '양') {
    temp =getResult( "close_depend");
  }
  //내가 어필
  else {
    temp =getResult( "close_dash");
  }

  return temp;
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

module.exports = dash;
