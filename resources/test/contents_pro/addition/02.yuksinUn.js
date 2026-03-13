var Sangsin = {};
var moment = require("moment");
const thisYear = require('../../../manseUtil/element/seun/seunElememtOneYear')
const keyword = require('../../../testResult/contents_pro_report/addition/02yuksinUn/yuksinUn.json')
Sangsin.randum = function () {
  let result = self()
  return result;
};

const self = () => {
  let result = {
    type:'',
    keyword:'',
    card:''
  };
  const start = moment().format("YYYY");
  // const start = 2024;
  const unType=thisYear.elementOneYearYuksinJiJi(start)
  if(unType==='정관'){
    result.type='정관운'
    result.keyword=getResult('jungGuanUn',keyword).contents
    result.card='감투 조심'
  }
  else   if(unType==='편관'){
    result.type='편관운'
    result.keyword=getResult('pyeonGuanUn',keyword).contents
    result.card='과로 조심'
  }
  else   if(unType==='정재'){
    result.type='정재운'
    result.keyword=getResult('jungJeUn',keyword).contents
    result.card='책임 과중'
  }
  else   if(unType==='편재'){
    result.type='편재운'
    result.keyword=getResult('pyeonJeUn',keyword).contents
    result.card='더 큰 곳으로'
  }
  else   if(unType==='식신'){
    result.type='식신운'
    result.keyword=getResult('siksinUn',keyword).contents
    result.card='함께하기'
  }
  else   if(unType==='상관'){
    result.type='상관운'
    result.keyword=getResult('sangGuanUn',keyword).contents
    result.card='반면교사'
  }
  else   if(unType==='정인'){
    result.type='정인운'
    result.keyword=getResult('jungInUn',keyword).contents
    result.card='관심갖기'
  }
  else   if(unType==='편인'){
    result.type='편인운'
    result.keyword=getResult('pyeonInUn',keyword).contents
    result.card='도움주기'
  }
  else   if(unType==='비견'){
    result.type='비견운'
    result.keyword=getResult('bigyeonUn',keyword).contents
    result.card='벤치마킹'
  }
  else   if(unType==='겁재'){
    result.type='겁재운'
    result.keyword=getResult('gupJeUn',keyword).contents
    result.card='오히려 좋아'
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
