var Sangsin = {};
const keyword = require('../../testResult/contents_pro_report/05praticeMind/praticeMind.json');
const checkHiYong = require('../../manseUtil/hiyong/hiyongUtil')

/**
 * level은 높,보,낮을 의미하는거고
 * contents는 키워드를 의미하는것이다
 * @returns 
 */
Sangsin.randum = function () {
  let result = self();
  return result;
};

const self = () => {
  let result={
    hi:'N',
    keyword:''
  };
  if(checkHiYong.checkHiYN()==='Y'){
    result.hi='Y'
    result.keyword=getResult('hiYes',keyword).contents
  }
  else {
    result.hi='N'
    result.keyword=getResult('hiNo',keyword).contents
  }
  return result;
};


function getResult(title,word) {
  let result;
  for (let i = 0; i < word.contentsList.length; i++) {
    if (title === word.contentsList[i].title) {
      result = word.contentsList[i];
      break;
    }
  }
  return result;
}
module.exports = Sangsin;
