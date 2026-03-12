const basicUse = require('../../../../manseUtil/basicUse/basicUse')
const manseTool = require('../../../../manseUtil/chunJiji/checkWord')
const ryeongUtil = require('../../../../manseUtil/ryeong/ryeongUtil')
const keyword = require('../../../../testResult/contents_pro_report/addition/07.passUn/one.json')
const checkKind = require('../../../../manseUtil/chunJiji/checkKind')
let yearPillar = require("../../../../manse/pillar/yearPillar/yearPillar");
exports.one = (unse) => {
    let result={}
 if(basicUse.getBasicUse()==='basic'){
    result=check('basic')
 }
 else {
    result=check('uses')
 }
 return result;
}

const check = (type) => {
    let result={} ; 
        // 빠른작업을 위해 useRyeong을 함수화 시킴
    // 객체들 리스트가 목록에 떠서 좀더 빠른작업 가능함
    const ryeong = ryeongUtil.ryeongCollection()
    let deunInfo = checkKind.checkKindWordDeunChunGan()

    if(manseTool.checkALL(ryeong.heuisin)==='Y' &&
    (manseTool.checkGangGuanPossible(ryeong.hwakjang)==='Y'||
    manseTool.checkChunGan(ryeong.hwakjang)==='Y')&&
    manseTool.checkALL(ryeong.jisok)==='Y') {
        let temp = {
            year: [],
            keyword: []
          }
        for (let i = 0; i < deunInfo.length; i++) {
            let year = getDeunInSeun(deunInfo[i].deunsu)
            let deunInseun = checkKind.checkKindWordSeunChunGan(year[0].year)
            for (let i = 0; i < deunInseun.length; i++) {
              if (deunInseun[i].ryeong === '지속운') {
                // 일반대운 격운 년도
                temp.year.push(deunInseun[i].year)
                // 일반대운 격운 키워드
                temp.keyword.push(getResult(type+'JisokUn',keyword).contents)
              }
              if (deunInseun[i].ryeong === '확장운') {
                // 일반대운 구신운 년도
                temp.year.push(deunInseun[i].year)
                // 일반대운 구신운 키워드
                temp.keyword.push(getResult(type+'HwakJangUn',keyword).contents)
              }
            }
          }
          result = temp
        }
    return result;
}
const getDeunInSeun = (deunsu) => {
    let result = []
    let year = useDate.year;
    if (useDate.month === 1) {
      year = year - 1
    }
    for (let i = 0; i < 10; i++) {
      let temp = {
        year: '',
        word: ''
      }
      temp.word = yearPillar.getYear(Number(year + deunsu - 1 + i))
      temp.year = Number(year) + Number(deunsu - 1) + Number(i)
      result.push(temp)
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