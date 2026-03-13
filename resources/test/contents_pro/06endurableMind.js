var Sangsin = {};
const keyword = require('../../testResult/contents_pro_report/06endurableMind/endurableMind.json');
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
    yong:'N',
    keyword:''
  };
  if(checkHiYong.checkYongYN()==='Y'){
    result.yong='Y'
    result.keyword=getResult('yongYes',keyword).contents
  }
  else {
    result.yong='N'
    result.keyword=getResult('yongNo',keyword).contents
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
