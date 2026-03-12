var Sangsin = {};

const keyword = require('../../testResult/contents_pro_report/12growthPotential/growthPotential.json');
const level = require('../../testResult/contents_pro_report/12growthPotential/growthPotentialLevel.json');
const checkTogan = require('../../manseUtil/togan/togan')
const chunganTongGun = require('../../manseUtil/tongGun/tongGun')
const manseTool = require('../../manseUtil/chunJiji/checkWord')
const ohangFunc = require('../../manseUtil/umYangOHang/oHang')
/**
 * level은 높,보,낮을 의미하는거고
 * contents는 키워드를 의미하는것이다
 * @returns 
 */
Sangsin.randum = function () {
  let result = self();
  return result;
};

const self = () => {
  let result = {
    type: '',
    keyword: '',
    score:0
  };
  let goalScore=[98,94,90,86]
  let plansScore=[82,78,74,70]
  let developmentScore=[66,62,58,54]
  let effortScore=[50,46,42,38]
  if (manseTool.checkALL(useShgj.sangsin) === 'N') {
    // 상신없음
    result.type = '노력형'
    let detail= detailKeyword('effort',effortScore)
    result.keyword = getResult('effort', level).contents +'/'+ detail.keyword
    result.score=detail.percent
  }
  else if (manseTool.checkChunGan(useShgj.sangsin) === 'N') {
    //지장간상신
    result.type = '발전형'
    let detail= detailKeyword('development',developmentScore)
    result.keyword = getResult('development', level).contents+'/'+ detail.keyword
    result.score=detail.percent
  }
  else if (manseTool.checkChunGan(useShgj.sangsin) === 'Y' &&
  chunganTongGun.chunGanTongGunYN(ohangFunc.oHang(useShgj.sangsin.word)) === 'Y') {
    //천간상신(통근 되어있음)
    result.type = '목표형'
    let detail= detailKeyword('goals',goalScore)
    result.keyword = getResult('goals', level).contents+ '/'+ detail.keyword
    result.score=detail.percent
  }
  else if (manseTool.checkChunGan(useShgj.sangsin) === 'Y') {
    //천간상신(통근 되어있음)
    result.type = '계획형'
    let detail= detailKeyword('plans',plansScore)
    result.keyword = getResult('plans', level).contents+'/'+ detail.keyword
    result.score=detail.percent
  }
  return result;
};

function detailKeyword(type,score) {
  let result = {}
  if (manseTool.checkChunGan(gyeokGusinGisin()) === 'N' &&
    checkTogan.gyoukTogan() === 'N') {
    result.percent = score[0]
    result.keyword = getResult(type + 1, keyword).contents
  }
  else if (manseTool.checkChunGan(gyeokGusinGisin()) === 'N' &&
    checkTogan.gyoukTogan() === 'Y') {
      result.percent = score[1]
    result.keyword = getResult(type + 2, keyword).contents
  } else if (manseTool.checkChunGan(gyeokGusinGisin()) === 'Y' &&
    checkTogan.gyoukTogan() === 'N') {
      result.percent = score[2]
    result.keyword = getResult(type + 3, keyword).contents
  } else if (manseTool.checkChunGan(gyeokGusinGisin()) === 'Y' &&
    checkTogan.gyoukTogan() === 'Y') {
      result.percent = score[3]
    result.keyword = getResult(type + 4, keyword).contents
  }

  return result;

}

const gyeokGusinGisin = () => {
  let result = {}
  if (useShgj.gukgisin !== undefined) {
    result = useShgj.gukgisin
  }
  else {
    result = useShgj.gusingisin
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
module.exports = Sangsin;
