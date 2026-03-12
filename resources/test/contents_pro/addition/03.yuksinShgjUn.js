var Sangsin = {};
var moment = require("moment");
const thisYear = require('../../../manseUtil/element/seun/seunElememtOneYear')
const gil = require('./03.yuksinShgjUn/gilGyouk')
const hung = require('./03.yuksinShgjUn/hungGyouk')
Sangsin.randum = function () {
  let result = self()
  return result;
};

const self = () => {
  let result = {
    type:'',
    keyword:''
  };
  const start = moment().format("YYYY");
  // const start = 2024;
  let unType
  if(useShgj.gukgubun==='길격'){
    unType=thisYear.elementOneYearShgjUn(start)
    if(unType==='생화운'){
      result.type='생화운'
      result.keyword=gil.gil('sengHwaUn_')
    }
    else   if(unType==='생화제화운'){
      result.type='생화제화운'
      result.keyword=gil.gil('sengHwaZehwaUn_')
    }
    else   if(unType==='설화운'){
      result.type='설화운'
      result.keyword=gil.gil('sulHwaUn_')
    }
    else   if(unType==='설화제화운'){
      result.type='설화제화운'
      result.keyword=gil.gil('sulHwaZehwaUn_')
    }
    else   if(unType==='격운'){
      result.type='격운'
      result.keyword=gil.gilGyouk('gyoukUn_')
    }
  }
  else if(useShgj.gukgubun==='흉격'){
    unType=thisYear.elementOneYearYuksin(start)
    if(useGyouk==='상관격'){
      result=hung.sangGuan(unType)
    }
    else     if(useGyouk==='편관격'){
      result=hung.pyeonGuan(unType)
  }
    else     if(useGyouk==='건록격'||useGyouk==='양인격'){
      result=hung.gunlokYangIn(unType)
  }
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
