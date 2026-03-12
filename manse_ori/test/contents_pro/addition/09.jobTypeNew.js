var ironwall = {};
const manseToolYuksin = require('../../../manseUtil/chunJiji/checkYuksin')
const manseTool = require('../../../manseUtil/chunJiji/checkWord')
const gun = require('../../../manseUtil/gun')
const ryeongFunc = require('../../../manseUtil/ryeong/ryeongUtil')
const gungFunc = require('../../../manseUtil/gungShgj/gungshgjUtil')
const keyword = require('../../../testResult/contents_pro_report/addition/09.jobType/jobTypeNew.json')
var moment = require("moment");
ironwall.randum = function () {
  let result = self()

  return result;
};
const self = () => {
  let result={
    gun:{},
    job:[],
    njob:{}
  };
  result.gun =changeGunWord()
  if(gun.gun()==='근약'){
    let one = checkGunYakOne()
    let two = checkGunYakTwo()
    let three = checkGunYakThree()
    if(Object.keys(one).length!==0){
      result.job.push(one)
    }
    if(Object.keys(two).length!==0){
      result.job.push(two)
    }
    if(Object.keys(three).length!==0){
      result.job.push(three)
    }


    let temp = Object.keys(one).length + Object.keys(two).length+ Object.keys(three).length
    
    if(temp===0 || temp===2 ){
      let aa = {}
      aa.title='전문가'
      aa.keyword = getResult('expert',keyword).contents
      result.job.push(aa)
    }
  }
  else {
    let one = checkGunWangOne()
    let two = checkGunWangTwo()
    let three = checkGunWangThree()
    if(Object.keys(one).length!==0){
      result.job.push(one)
    }
    if(Object.keys(two).length!==0){
      result.job.push(two)
    }
    if(Object.keys(three).length!==0){
      result.job.push(three)
    }
    let temp = Object.keys(one).length + Object.keys(two).length+ Object.keys(three).length
    if(temp===0 || temp===2 ){
      let aa = {}
      aa.title='전문가'
      aa.keyword = getResult('expert',keyword).contents
      result.job.push(aa)
    }
  }
  result.njob = checkNJob()
  return result
}
const changeGunWord = () => {
  let result ='개인'
  if(gun.gun()==='근약'){
    result ='조직'
  }
  return result
}
const checkGunYakOne = () => {
  let result = {}
  let gung=gungFunc.gungShgjCollection()
  let temp = 'N'
  if(useGyouk==='정인격'){
    if(manseTool.checkALL(gung.sanghwa)==='Y') {
      temp='Y'
    }  
  }
  else   if(useGyouk==='정관격'){
    if(manseTool.checkALL(gung.sanghwa)==='Y') {
      temp='Y'
    }  
  }
  else   if(useGyouk==='정재격'){
    if(manseTool.checkALL(gung.sulhwa)==='Y') {
      temp='Y'
    }  
  }
  else   if(useGyouk==='상관격'){
    if(manseTool.checkALL(gung.sangsin)==='Y') {
      temp='Y'
    }  
  }
  else   if(useGyouk==='편인격'){
    if(manseTool.checkALL(gung.sanghwa)==='Y') {
      temp='Y'
    }  
  }
  else   if(useGyouk==='식신격'){
    if(manseToolYuksin.checkALL('비견')==='Y') {
      temp='Y'
    }  
  }
  else   if(useGyouk==='편재격'){
    if(manseTool.checkALL(gung.sulhwa)==='Y') {
      temp='Y'
    }  
  }
  else   if(useGyouk==='편관격'){
    if(manseToolYuksin.checkALL('편인')==='Y') {
      temp='Y'
    }  
  }
  else   if(useGyouk==='양인격'){
    if(manseToolYuksin.checkALL('편관')==='Y') {
      temp='Y'
    }  
  }
  else   if(useGyouk==='건록격'){
    if(manseToolYuksin.checkALL('정관')==='Y') {
      temp='Y'
    }  
  }

  if(temp==='Y'){
    result.title='일반직장인'
    result.keyword = getResult('normalJob',keyword).contents
  }

  return result;
}

const checkGunYakTwo = () => {
  let result = {}
if(jesengGuan()==='Y'){
  result.title='퇴사 못하는 직장인'
  result.keyword = getResult('cantTalJu',keyword).contents
}
  return result;
}
const checkGunYakThree= () => {
  let result = {}
  let gung=gungFunc.gungShgjCollection()
if(checkJisokHakjang()==='N' && jesengGuanAll()==='N' &&manseTool.checkALL(gung.sangsin)==='N' ){
  result.title='계약직'
  result.keyword = getResult('contract',keyword).contents
}
  return result;
}

const checkGunWangOne= () => {
  let result = {}
  let gung=gungFunc.gungShgjCollection()
  let temp = 'N'
   if(useGyouk==='정관격'){
    if(manseToolYuksin.checkALL('겁재')==='Y') {
      temp='Y'
    }  
  }
  else   if(useGyouk==='정재격'){
    if(manseToolYuksin.checkALL('겁재')==='Y') {
      temp='Y'
    }  
  }
  else   if(useGyouk==='편재격'){
    if(manseToolYuksin.checkALL('비견')==='Y') {
      temp='Y'
    }  
  }
  else   if(useGyouk==='상관격'){
    if(manseTool.checkALL(gung.sangsin)==='N' && 
    manseToolYuksin.checkALL('정재')==='Y') {
      temp='Y'
    }  
  }
  else   if(useGyouk==='편관격'){
    if(manseTool.checkALL(gung.sangsin)==='N' &&
    manseToolYuksin.checkALL('편관')==='Y') {
      temp='Y'
    }  
  }
  else   if(useGyouk==='양인격'){
    if(manseTool.checkALL(gung.sangsin)==='N'
    && (manseToolYuksin.checkALL('비견')==='Y'|| 
    manseToolYuksin.checkALL('겁재')==='Y')) {
      temp='Y'
    }  
  }
  else   if(useGyouk==='건록격'){
 
    if(   manseTool.checkALL(gung.sangsin)==='N'
     && (manseToolYuksin.checkALL('비견')==='Y'|| 
    manseToolYuksin.checkALL('겁재')==='Y')) {
      temp='Y'
    }  
  }

  if(temp==='Y'){
    result.title='자영업'
    result.keyword = getResult('self-employment',keyword).contents
  }
  return result;
}
const checkGunWangTwo= () => {
  let result = {}
  if(checkJisokHakjang()==='N' && jesengGuanAll()==='N' &&manseTool.checkALL(gung.sangsin)==='N' ){
    result.title='프리랜서'
    result.keyword = getResult('freelancer',keyword).contents
  }
    return result;
}
const checkGunWangThree= () => {
  let result = {}
  let ryeong =ryeongFunc.ryeongCollection()
  let temp = 'N'
  if(ryeong.yongsin==='계'){
    if(manseTool.checkChunGanWord('무')==='Y') {
      temp = 'Y'
    }
  }
  else  if(ryeong.yongsin==='갑'){
    if(manseTool.checkChunGanWord('기')==='Y') {
      temp = 'Y'
    }
  }
  else  if(ryeong.yongsin==='을'){
    if(manseTool.checkChunGanWord('경')==='Y') {
      temp = 'Y'
    }
  }
  else  if(ryeong.yongsin==='병'){
    if(manseTool.checkChunGanWord('신')==='Y') {
      temp = 'Y'
    }
  }
  else  if(ryeong.yongsin==='정'){
    if(manseTool.checkChunGanWord('임')==='Y') {
      temp = 'Y'
    }
  }
  else  if(ryeong.yongsin==='경'){
    if(manseTool.checkChunGanWord('을')==='Y') {
      temp = 'Y'
    }
  }
  else  if(ryeong.yongsin==='신'){
    if(manseTool.checkChunGanWord('병')==='Y') {
      temp = 'Y'
    }
  }
  else  if(ryeong.yongsin==='임'){
    if(manseTool.checkChunGanWord('정')==='Y') {
      temp = 'Y'
    }
  }
  if(temp==='Y'){
    result.title='공동작업'
    result.keyword = getResult('withJob',keyword).contents
  }
    return result;
}

const checkNJob = () => {
  let result='N'
  if(    usePillar.d_sky==='신' &&
  usePillar.d_land==='사') {
    result='Y'
  }
  else if(    usePillar.d_sky==='기' &&
  usePillar.d_land==='해') {
    result='Y'
  }
  else if(    usePillar.d_sky==='무' &&
  usePillar.d_land==='진') {
    result='Y'
  }
  else if(    usePillar.d_sky==='정' &&
  usePillar.d_land==='해') {
    result='Y'
  }
  else if(    usePillar.d_sky==='경' &&
  usePillar.d_land==='진') {
    result='Y'
  }
  return result;
}
const jesengGuan = () => {
  let result ='N'
  if((manseToolYuksin.checkPossible('정재')==='Y'&&manseToolYuksin.checkPossible('정관')==='Y') ||
(manseToolYuksin.checkPossible('편재')==='Y'&&manseToolYuksin.checkPossible('편관')==='Y')){
  result='Y'
}
return result;
}

const jesengGuanAll = () => {
  let result ='N'
  if((manseToolYuksin.checkALL('정재')==='Y'&&manseToolYuksin.checkALL('정관')==='Y') ||
(manseToolYuksin.checkALL('편재')==='Y'&&manseToolYuksin.checkALL('편관')==='Y')){
  result='Y'
}
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
