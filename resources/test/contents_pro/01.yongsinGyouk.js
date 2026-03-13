var Sangsin = {};
const keyword = require('../../testResult/contents_pro_report/01.yongsinGyouk/yongsinGyouk.json');
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
  let result ={}
  if(useRyeong.yongsin==='계') {
    result.yongsinWord='계수'
    result.yongsinKeyword=getResult("gyesu",keyword).contents
  }
  else   if(useRyeong.yongsin==='갑') {
    result.yongsinWord='갑목'
    result.yongsinKeyword=getResult("gapMok",keyword).contents
  }
  else   if(useRyeong.yongsin==='을') {
    result.yongsinWord='을목'
    result.yongsinKeyword=getResult("ulMok",keyword).contents
  }
  else   if(useRyeong.yongsin==='병') {
    result.yongsinWord='병화'
    result.yongsinKeyword=getResult("byeongHwa",keyword).contents
  }
  else   if(useRyeong.yongsin==='정') {
    result.yongsinWord='정화'
    result.yongsinKeyword=getResult("jungHwa",keyword).contents
  }
  else   if(useRyeong.yongsin==='경') {
    result.yongsinWord='경금'
    result.yongsinKeyword=getResult("gyeongGum",keyword).contents
  }
  else   if(useRyeong.yongsin==='신') {
    result.yongsinWord='신금'
    result.yongsinKeyword=getResult("sinGum",keyword).contents
  }
  else   if(useRyeong.yongsin==='임') {
    result.yongsinWord='임수'
    result.yongsinKeyword=getResult("limSu",keyword).contents
  }
if(useGyouk==='정관격') {
    result.gyoukWord='정관격'
    result.gyoukKeyword=getResult("jungGuan",keyword).contents
  }
  else if(useGyouk==='정재격') {
    result.gyoukWord='정재격'
    result.gyoukKeyword=getResult("jungJe",keyword).contents
  }
  else if(useGyouk==='편재격') {
    result.gyoukWord='편재격'
    result.gyoukKeyword=getResult("pyeonJe",keyword).contents
  }
  else if(useGyouk==='정인격') {
    result.gyoukWord='정인격'
    result.gyoukKeyword=getResult("jungIn",keyword).contents
  }
  else if(useGyouk==='편인격') {
    result.gyoukWord='편인격'
    result.gyoukKeyword=getResult("pyeonIn",keyword).contents
  }
  else if(useGyouk==='식신격') {
    result.gyoukWord='식신격'
    result.gyoukKeyword=getResult("siksin",keyword).contents
  }
  else if(useGyouk==='상관격') {
    result.gyoukWord='상관격'
    result.gyoukKeyword=getResult("sangGuan",keyword).contents
  }
  else if(useGyouk==='편관격') {
    result.gyoukWord='편관격'
    result.gyoukKeyword=getResult("pyeonGuan",keyword).contents
  }
  else if(useGyouk==='양인격') {
    result.gyoukWord='양인격'
    result.gyoukKeyword=getResult("yangIn",keyword).contents
  }
  else if(useGyouk==='건록격') {
    result.gyoukWord='건록격'
    result.gyoukKeyword=getResult("gunLok",keyword).contents
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
