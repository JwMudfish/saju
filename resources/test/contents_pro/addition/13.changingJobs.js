var ironwall = {};
const manseToolYuksin = require('../../../manseUtil/chunJiji/checkYuksin')
const manseTool = require('../../../manseUtil/chunJiji/checkWord')
const gungFunc = require('../../../manseUtil/gungShgj/gungshgjUtil')
const keyword = require('../../../testResult/contents_pro_report/addition/13.changingJobs/13.changingJobs.json')
const yearFunc = require('../../../manseUtil/element/seun/seunElememtOneYear')
const ryeongFunc = require('../../../manseUtil/ryeong/ryeongUtil')
const hapChungFunc = require('../../../manseUtil/hapchung/samhapUtil')
var moment = require("moment");
ironwall.randum = function () {
  let result = self()

  return result;
};
const self = () => {
  let result={};
  let one = checkUnGood()
  let two =   checkUnSoSo()
  if(one.yn==='Y')
  {
    result.title='이직유리'
    result.keyword=one.keyword
  }
  else   if(two.yn==='Y')
  {
    result.title='이직권장'
    result.keyword=two.keyword
  }
  else {
    result.title='이직보류'
    result.keyword=getResult('no',keyword).contents
  }
  return result
}

const checkUnSoSo = () => {
  let result = {yn:'N',
  keyword:'',}
  const nowStart = Number(moment().format("YYYY"));
  let nowYear = yearFunc.elementOneYear(nowStart);
  let nowYearGun = yearFunc.elementOneYearGunJiJi(nowStart);
  let nowYearGung = yearFunc.elementOneYearGungUn(nowStart);

  let ryeong  = ryeongFunc.ryeongCollection()
  let gung  = gungFunc.gungShgjCollection()
  if(manseTool.checkALL(gung.gusin)==='N' && (nowYearGung==='격기신운' ||
  nowYearGung==='구신기신운')){
    result.yn = 'Y'
    result.keyword=getResult('gusingisinUn',keyword).contents
  }
  else if(ryeong.yongsin==='신' &&manseTool.checkChunGanWord('임')==='Y' && nowYear==='임'){
    result.yn = 'Y'
    result.keyword=getResult('gumChimGang',keyword).contents
  }
  else  if(ryeong.yongsin==='신' && nowYear[0]==='임'){
    result.yn = 'Y'
    result.keyword=getResult('gumChimYak',keyword).contents
  }
  else  if(ryeong.yongsin==='임' && nowYear[0]==='기'){
    result.yn = 'Y'
    result.keyword=getResult('toBungYak',keyword).contents
  }
  else  if(ryeong.yongsin==='임' &&manseTool.checkChunGanWord('임')==='Y' && nowYear[0]==='기'){
    result.yn = 'Y'
    result.keyword=getResult('toBungGang',keyword).contents
  }
  else  if((manseToolYuksin.checkChunGan('비견')==='Y' ||
  manseToolYuksin.checkChunGan('겁재')==='Y') && jesengGuanAll()==='N' 
  && (nowYear.yuksin==='정재' || nowYear.yuksin==='편재')){
    result.yn = 'Y'
    result.keyword=getResult('jengje',keyword).contents
  }
 else  if(useGyouk==='상관격' && nowYearGun==='근왕'){
    result.yn = 'Y'
    result.keyword=getResult('gyeonGuan1',keyword).contents
  }
 else  if(useGyouk==='정관격' && nowYearGun==='근왕'){
    result.yn = 'Y'
    result.keyword=getResult('gyeonGuan2',keyword).contents
  }

  return result;
}
const  checkUnGood = () => {
  let result = {yn:'N'}
  const nowStart = Number(moment().format("YYYY"));
  let nowYear = yearFunc.elementOneYear(nowStart);
  let nowYearRyeong = yearFunc.elementOneYearRyeong(nowStart);
  let nowYearGung = yearFunc.elementOneYearGungUn(nowStart);
  if(hapChungFunc.checkChungWolJiSpecificJiJiYN(nowYear[1])==='Y'){
    result.yn = 'Y'
    result.keyword=getResult('sangChungUn',keyword).contents
  }
  else if(nowYearRyeong==='용신운'){
    result.yn = 'Y'
    result.keyword=getResult('yangsinUn',keyword).contents
  }
  else if(nowYearGung==='상신운'){
    result.yn = 'Y'
    result.keyword=getResult('sangsinUn',keyword).contents
  }
  else if(nowYearGung==='구신운'){
    result.yn = 'Y'
    result.keyword=getResult('gusinUn',keyword).contents
  }
  return result;
}

const jesengGuanAll = () => {
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
