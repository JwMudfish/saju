var ironwall = {};
const manseToolYuksin = require('../../../manseUtil/chunJiji/checkYuksin')
const manseTool = require('../../../manseUtil/chunJiji/checkWord')
const gun = require('../../../manseUtil/gun')
const keyword = require('../../../testResult/contents_pro_report/addition/10.copyRight/10.copyRight.json')
ironwall.randum = function () {
  let result = self()

  return result;
};
const self = () => {
  let result={};
  if (checkfour_one()==='Y') {
    result.type='근로소득'
    result.keyword=getResult('earnedIncome1',keyword).contents
  }
  else if (checkfour_two()==='Y') {
    result.type='근로소득'
    result.keyword=getResult('earnedIncome2',keyword).contents
  }
  else if (checkthree_one()==='Y') {
    result.type='불로소득'
    result.keyword=getResult('capitalInvestment1',keyword).contents
  }
  else if (checkthree_two()==='Y') {
    result.type='불로소득'
    result.keyword=getResult('capitalInvestment2',keyword).contents
  }
  else if(checkOne_one()==='Y')
  {
    result.type='불로소득'
    result.keyword=getResult('copyRight1',keyword).contents
  }
  else if (checkOne_two()==='Y') {
    result.type='불로소득'
    result.keyword=getResult('copyRight2',keyword).contents
  }
  else {
    result.type='근로소득'
    result.keyword=getResult('earnedIncome2',keyword).contents
  }
  return result
}

const checkfour_two = () => {
  let result ='N'
  if(
 manseToolYuksin.checkALL('정관')==='Y' &&
  manseToolYuksin.checkALL('정인')==='Y') {
    result ='Y'
  }

  return result;
}
const checkfour_one = () => {
  let result ='N'
  if(
  ( manseToolYuksin.checkALL('식신')==='Y' ||
  manseToolYuksin.checkALL('상관')==='Y') &&
  ( manseToolYuksin.checkALL('정재')==='Y' ||
  manseToolYuksin.checkALL('편재')==='Y')) {
    result ='Y'
  }

  return result;
}

const checkthree_two= () => {
  let result ='N'
  if(manseToolYuksin.checkALL('정재')==='Y' &&
  ( manseToolYuksin.checkALL('정인')==='Y' ||
  manseToolYuksin.checkALL('편인')==='Y') &&
  ( manseToolYuksin.checkChunGan('비견')==='Y' ||
  manseToolYuksin.checkChunGan('겁재')==='Y') ) {
    result ='Y'
  }
  return result;
}

const checkthree_one= () => {
  let result ='N'
  if(manseToolYuksin.checkALL('정재')==='Y' &&
  ( manseToolYuksin.checkALL('정인')==='Y' ||
  manseToolYuksin.checkALL('편인')==='Y') &&
  ( manseToolYuksin.checkALL('식신')==='Y' ||
  manseToolYuksin.checkALL('상관')==='Y')) {
    result ='Y'
  }
  return result;
}

const checktwo_one= () => {
  let result ='N'
  if(manseToolYuksin.checkALL('편재')==='Y' &&
  ( manseToolYuksin.checkALL('정인')==='Y' ||
  manseToolYuksin.checkALL('편인')==='Y') &&
  ( manseToolYuksin.checkALL('식신')==='Y' ||
  manseToolYuksin.checkALL('상관')==='Y')) {
    result ='Y'
  }
  return result;
}

const checktwo_two= () => {
  let result ='N'
  if(manseToolYuksin.checkALL('편재')==='Y' &&
  ( manseToolYuksin.checkALL('정인')==='Y' ||
  manseToolYuksin.checkALL('편인')==='Y') &&
  ( manseToolYuksin.checkChunGan('비견')==='Y' ||
  manseToolYuksin.checkChunGan('겁재')==='Y') ) {
    result ='Y'
  }
  return result;
}
const checkOne_two= () => {
  let result ='N'
  if(gun.gun()==='근왕' &&
  manseToolYuksin.checkChunGan('비견')==='Y'&&
  manseToolYuksin.checkChunGan('식신')==='Y' &&
  manseToolYuksin.checkALL('편인')==='Y' ) {
    result ='Y'
  }
  else   if(gun.gun()==='근왕' &&
  manseToolYuksin.checkChunGan('겁재')==='Y'&&
  manseToolYuksin.checkChunGan('상관')==='Y' &&
  manseToolYuksin.checkALL('정인')==='Y' ) {
    result ='Y'
  }
  return result;
}

const checkOne_one = () => {
  let result ='N'
  if(usePillar.m_land==='축' && 
  manseTool.checkChunGanWord('무')==='Y' &&
  manseTool.checkAllWordWolJiNo('신')==='Y'  &&
  manseTool.checkAllWord('갑')==='Y' ) {
    result ='Y'
  }
  else   if(usePillar.m_land==='미' && 
  manseTool.checkChunGanWord('무')==='Y'  &&
  manseTool.checkAllWordWolJiNo('을') ==='Y' &&
  manseTool.checkAllWord('경')==='Y' ) {
    result ='Y'
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
