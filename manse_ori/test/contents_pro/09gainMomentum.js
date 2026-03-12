var Sangsin = {};

const palpumFunc = require('../../manseUtil/palpum/palpum');
const keyword = require('../../testResult/contents_pro_report/09gainMomentum/gainMomentum.json')
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
    yn:'N',
    keyword:''
  };
  if(palpumFunc.johwaYN()==='Y'){
    result.yn='Y'
    result.keyword=getResult('actYes',keyword).contents
  }
  else {
    result.keyword=getResult('actNo',keyword).contents
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
