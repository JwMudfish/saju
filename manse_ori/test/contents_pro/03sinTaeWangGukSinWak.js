var Sangsin = {};
const keyword = require('../../testResult/contents_pro_report/03sinTaeWangGukSinWak/sinTaeWangGukSinWak.json');
const sinTaeGukSin = require('../../manseUtil/sinTaeWangGukSinWak')
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
    sinTaeWang:'N',
    gukSinWak:'N',
    taeWangSinYak:'N',
    keyWord:''
  }
  if(sinTaeGukSin.checkSinTaeWang()==='Y') {
    result.sinTeaWang='Y'
    result.taeWangSinYak='T'
    result.keyWord=getResult("sinTaeWang",keyword).contents
  }
  else if(sinTaeGukSin.checkGukSinYak()==='Y') {
    result.gukSinWak='Y'
    result.taeWangSinYak='S'
    result.keyWord=getResult("gukSinWak",keyword).contents
  }
  else {
    result.keyWord=getResult("no",keyword).contents
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
