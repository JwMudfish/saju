const range = require('../../../../manseUtil/chunJiji/checkKind')
const manseToolYuksin = require('../../../../manseUtil/chunJiji/checkYuksin')
const keyword = require('../../../../testResult/contents_pro_report/addition/08.businessUn/business.json')
const gun = require('../../../../manseUtil/gun')
exports.businessYes = (year) => {
  let result = {}

  if ((manseToolYuksin.checkALL('정재') === 'Y' && manseToolYuksin.checkALL('정관') === 'N') ||
    (manseToolYuksin.checkALL('편재') === 'Y' && manseToolYuksin.checkALL('편관') === 'N')) {
      result=getKeywordYear('jeSungYesGuanSungNo', year)
  }
  else   if ((manseToolYuksin.checkALL('정재') === 'N' && manseToolYuksin.checkALL('정관') === 'Y') ||
  (manseToolYuksin.checkALL('편재') === 'N' && manseToolYuksin.checkALL('편관') === 'Y')) {
    result=getKeywordYear('jeSungNoGuanSungYes', year)
}
else   if ((manseToolYuksin.checkALL('정재') === 'N' && manseToolYuksin.checkALL('정관') === 'N') ||
(manseToolYuksin.checkALL('편재') === 'N' && manseToolYuksin.checkALL('편관') === 'N')) {
  result=getKeywordYear('jeSungNoGuanSungNo', year)
}

return result;
}

exports.businessNo= (year) => {
  let result = {}

  if (gun.gun()==='근왕' &&
  (manseToolYuksin.checkALL('비견') || manseToolYuksin.checkALL('겁재'))) {
      result=getKeywordYearNo('jeSungYesGuanSungYesGunWangBiGubSangsinUn', year,'상신운')
  }
  else   if (gun.gun()==='근왕') {
    result=getKeywordYearNo('jeSungYesGuanSungYesGunWangSangsinUn', year,'상신운')
}
else   if (gun.gun()==='근약') {
  result=getKeywordYearNo('jeSungYesGuanSungYesGunWakGunWangUn', year,'근왕')
}

return result;
}

const getKeywordYearNo = (type, start,un) => {
  let result = {
    year: '',
    keyword: ''
  }

  let jijiRange = range.checkKindWordJiJi(start)
  let chunRange = range.checkKindWordSeunChunGan(start)
  for (let i = 0; i < 10; i++) {
    if (jijiRange[i].gun === un ||
      chunRange[i].gung === un) {
      result.year = jijiRange[i].year
      result.keyword = getResult(type,keyword).contents
    }
  }
  return result;
}
const getKeywordYear = (type, start) => {
  let result = {
    year: '',
    keyword: ''
  }

  let jijiRange = range.checkKindWordJiJi(start)
  let chunRange = range.checkKindWordSeunChunGan(start)
  for (let i = 0; i < 10; i++) {
    if (jijiRange[i].gun === '근왕' ||
      chunRange[i].yuksin === '비겁운') {
      result.year = jijiRange[i].year
      result.keyword = getResult(type,keyword).contents
    }
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
