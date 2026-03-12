var Sangsin = {};
const keyword = require('../../testResult/contents_pro_report/02gunWanggunWak/gunWanggunWak.json');
const gunCheck = require('../../manseUtil/gun')
/**
 * wangYak ===Y 면 근왕 아니면 아니면 근약
 * keyword는  키워드를 의미하는것이다
 * @returns 
 */
Sangsin.randum = function () {
  let result = self();
  return result;
};

const self = () => {
  let result = {
    wangYak:'N',
    keyword:''
  }
  if(  gunCheck.gun()==='근왕') {
    result.wangYak='Y'
    result.keyword=getResult("gunWang",keyword).contents
  }
  else {
    result.wangYak='N'
    result.keyword=getResult("gunWak",keyword).contents
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
