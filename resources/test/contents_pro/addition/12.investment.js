var ironwall = {};
const manseToolYuksin = require('../../../manseUtil/chunJiji/checkYuksin')
const manseTool = require('../../../manseUtil/chunJiji/checkWord')
const gungFunc = require('../../../manseUtil/gungShgj/gungshgjUtil')
const keyword = require('../../../testResult/contents_pro_report/addition/12.investment/12.investment.json')
ironwall.randum = function () {
  let result = self()

  return result;
};
const self = () => {
  let result={};
  if((manseToolYuksin.checkChunGan('정재')==='Y'  ||
  manseToolYuksin.checkChunGan('편재')==='Y'  ) &&
  (manseToolYuksin.checkGangGuan('정인')==='Y' ||
  manseToolYuksin.checkGangGuan('편인')==='Y' )) {
    result.type='유의'
    result.keyword=getKeyword('noted')
  }
  else    if((manseToolYuksin.checkChunGan('정인')==='Y' ||
  manseToolYuksin.checkChunGan('편인')==='Y'  ) &&
  (manseToolYuksin.checkJangguanPossible('정재')==='Y' ||
  manseToolYuksin.checkJangguanPossible('편재')==='Y' )) {
    result.type='추천'
    result.keyword=getKeywordRecommend('recommendation')
  }
  else if (checkThree()==='Y') {
    result.type='자제'
    result.keyword=getKeyword('refrainment')
  }
  else {
    result.type='금지'
    result.keyword=getKeyword('ban')
  }
  return result
}

const getKeywordRecommend =(type) => {
  const gung = gungFunc.gungShgjCollection()
  let result;
  if(gung.sulhwa===undefined){
    // 설화가 없는 격이거나
    result=getResult(type+5,keyword).contents
  }
  else   if(manseTool.checkGangGuanPossible(gung.sulhwa)==='N'){
    // 설화라는 글자가 없는 경우
    result=getResult(type+5,keyword).contents
  }
  else if(manseTool.checkGangGuanPossible(gung.sanghwa)==='Y') {
    if(manseTool.checkChunGan(gung.sulhwa)==='Y') {
      result=getResult(type+1,keyword).contents
    }
    else {
      result=getResult(type+2,keyword).contents
    }
  }  else if(manseTool.checkGangGuanPossible(gung.sanghwa)==='N') {
    if(manseTool.checkChunGan(gung.sulhwa)==='Y') {
      result=getResult(type+3,keyword).contents
    }
    else {
      result=getResult(type+4,keyword).contents
    }
  }
  else {
    result=getResult(type+5,keyword).contents
  }

  return result
}

const getKeyword =(type) => {
  const gung = gungFunc.gungShgjCollection()
  let result;
  if(gung.sulhwa===undefined){
    // 설화가 없는 격이거나
    result=getResult(type+5,keyword).contents
  }
  else   if(manseTool.checkALL(gung.sulhwa)==='N'){
    // 설화라는 글자가 없는 경우
    result=getResult(type+5,keyword).contents
  }
  else if(manseTool.checkALL(gung.sanghwa)==='Y') {
    if(manseTool.checkChunGan(gung.sulhwa)==='Y') {
      result=getResult(type+1,keyword).contents
    }
    else {
      result=getResult(type+2,keyword).contents
    }
  }  else if(manseTool.checkALL(gung.sanghwa)==='N') {
    if(manseTool.checkChunGan(gung.sulhwa)==='Y') {
      result=getResult(type+3,keyword).contents
    }
    else {
      result=getResult(type+4,keyword).contents
    }
  }
  else {
    result=getResult(type+5,keyword).contents
  }

  return result
}
const checkThree = () =>{
  let result='N'
  if((manseToolYuksin.checkGangGuan('정재') ==='Y' ||
  manseToolYuksin.checkGangGuan('편재')==='Y'  ) &&
  (manseToolYuksin.checkGangGuan('정인')==='Y' ||
  manseToolYuksin.checkGangGuan('편인')==='Y' )) {
    result='Y'
  }
  else if ((manseToolYuksin.checkChunGan('정재') ==='Y' ||
  manseToolYuksin.checkChunGan('편재')==='Y'  ) &&
  (manseToolYuksin.checkChunGan('정인')==='Y' ||
  manseToolYuksin.checkChunGan('편인')==='Y' )) {
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
