var Sangsin = {};
const manseUtil = require('../../../manseUtil/chunJiji/checkWord')
const loveDayFunc = require('./04.loveDay/loveDay')
var moment = require("moment");
Sangsin.randum = function () {
  let result = self()
  return result;
};

const self = () => {
  const start = Number(moment().format("YYYY"));
  let one =[]
  let two =[]
   if(checkChunGroup()==='Y'){
    one=loveDayFunc.one()
  }
  else    if(manseUtil.checkChunGanWord('기') === 'Y' ||
  manseUtil.checkChunGanWord('무') === 'Y'){
    one=loveDayFunc.one()
  }
  else    if(manseUtil.checkChunGanWord('계') === 'Y' ||
  manseUtil.checkChunGanWord('정') === 'Y' || 
  manseUtil.checkChunGanWord('임') === 'Y' ||
  manseUtil.checkChunGanWord('계') === 'Y' ){
    one=loveDayFunc.threeFour()
  }

  two = loveDayFunc.fiveSix()

  let temp =one.concat(two);
  temp.sort(function(a,b){
    return a.year < b.year ? -1 : 1; 
  } )
  one =[]
  two=[]
  for (let i=0; i<temp.length;i++) {
    if(temp[i].year===start){
      one.push(temp[i])
    }
    else {
      two.push(temp[i])
    }
  }
  one.sort(function(a,b){
    return a.month < b.month ? -1 : 1; 
  })
  two.sort(function(a,b){
    return a.month < b.month ? -1 : 1; 
  })
  temp =one.concat(two);
  for (let i=0;i<temp.length;i++){
    if(temp[i+1]!==undefined){
      if(temp[i].month===temp[i+1].month){
        if(temp[i].type!==undefined){
          temp.splice(i, 1);
          i--;
        }
        else  if(temp[i+1].type!==undefined){
          temp.splice(i+1, 1);
          i--;
        }
      }
      else if (temp[i].keyword===temp[i+1].keyword) {
        temp.splice(i, 1);
        i--;
      }
    }
  }
  let result={}
  result.month=[temp[0].month,temp[1].month]
  result.keyword=[temp[0].keyword,temp[1].keyword]
  return result;
};

const checkChunGroup = () => {
  let result='N'
  if(manseUtil.checkChunGanWord('기')=== 'Y' &&
  manseUtil.checkChunGanWord('계')=== 'Y' ){
    result='Y'
  }
  else   if(manseUtil.checkChunGanWord('무')=== 'Y' &&
  manseUtil.checkChunGanWord('병')=== 'Y' ){
    result='Y'
  }
  else   if(manseUtil.checkChunGanWord('기')=== 'Y' &&
  manseUtil.checkChunGanWord('정')=== 'Y' ){
    result='Y'
  }
  else   if(manseUtil.checkChunGanWord('무')=== 'Y' &&
  manseUtil.checkChunGanWord('임')=== 'Y' ){
    result='Y'
  }
  return result;
}
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
