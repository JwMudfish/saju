var ironwall = {};
const manseToolYuksin = require('../../../manseUtil/chunJiji/checkYuksin')
const manseTool = require('../../../manseUtil/chunJiji/checkWord')
const gun = require('../../../manseUtil/gun')
const func = require('./08.businessUn/busnessUn')
const ryeongFunc = require('../../../manseUtil/ryeong/ryeongUtil')
const gungFunc = require('../../../manseUtil/gungShgj/gungshgjUtil')
const keyword = require('../../../testResult/contents_pro_report/addition/09.jobType/jobType.json')
var moment = require("moment");
ironwall.randum = function () {
  let result = self()

  return result;
};
const self = () => {
  let result={};
  let gung = gungFunc.gungShgjCollection()
  const start = Number(moment().format("YYYY"));
  if(checkFour()==='Y'){
    result.type='직장인'
    result.keyword=getResult('workers',keyword).contents
  }
  else if(gun.gun()==='근왕' && jesengGuan()==='N'){
    result.type='1인창업'
    result.keyword=getResult('oneJob',keyword).contents
  }
  else   if(checkJisokHakjang()==='N' && jesengGuan()==='N' &&manseTool.checkALL(gung.sangsin)==='N' ){
    result.type='프리랜서'
    result.keyword=getResult('contract',keyword).contents
  }
  else   if(checkThree()==='Y'){
    result.type='에이전시'
    result.keyword=getResult('agency',keyword).contents
  }
  else {
    result.type='월급쟁이'
    result.keyword=getResult('no',keyword).contents
  }
  return result
}

const checkFour =() => {
  let result='N'
  if(gun.gun()==='근약' &&
  (manseToolYuksin.checkChunGan('비견')==='N' &&
  manseToolYuksin.checkChunGan('겁재')==='N'  )&&
  jesengGuan()==='Y' ){
    result='Y'
  }
  return result
}

const checkThree = () => {
  let result='N';
  if(useUmYangOHang.d_sky.umYang==='양') {
    if(manseToolYuksin.checkJangguanPossible('정인')==='Y' &&
    manseToolYuksin.checkJangguanPossible('식신')==='Y') {
      result='Y'
    }
  }
  else if(useUmYangOHang.d_sky.umYang==='음') {
    if(manseToolYuksin.checkJangguanPossible('편인')==='Y' &&
    manseToolYuksin.checkJangguanPossible('상관')==='Y') {
      result='Y'
    }
  }
  return result;
}

const checkJisokHakjang = () => {
  let result='N'
  let ryeong =ryeongFunc.ryeongCollection()
    if(manseTool.checkALL(ryeong.jisok)==='N' &&
    manseTool.checkALL(ryeong.hwakjang)==='N'){
      result='Y'
    }

    return result;
}
const jesengGuan = () => {
  let result ='N'
  if((manseToolYuksin.checkALL('정재')==='Y'&&manseToolYuksin.checkALL('정관')==='Y') ||
(manseToolYuksin.checkALL('편재')==='Y'&&manseToolYuksin.checkALL('편관')==='Y')){
  result='Y'
}

return result;
}
function getResult(title, word) {
  let result;
  for (let i = 0; i < word.contentsList.length; i++) {
    if (title === word.contentsList[i].title) {
      result = word.contentsList[i];
      break;
    }
  }
  return result;
}


module.exports = ironwall;
