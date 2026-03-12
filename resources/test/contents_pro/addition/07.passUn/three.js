const checkKind = require('../../../../manseUtil/chunJiji/checkKind')
const keyword = require('../../../../testResult/contents_pro_report/addition/07.passUn/three.json')
let yearPillar = require("../../../../manse/pillar/yearPillar/yearPillar");
exports.three = (unse) => {
  let result = {}
  let deunInfo = checkKind.checkKindWordDeunChunGan()

      let temp = {
        year: [],
        keyword: []
      }
      for (let i = 0; i < deunInfo.length; i++) {
        let year = getDeunInSeun(deunInfo[i].deunsu)
        let deunInseun = checkKind.checkKindWordSeunChunGan(year[0].year)
        for (let i = 0; i < deunInseun.length; i++) {
          if (deunInseun[i].gung === '상신운') {
            // 일반대운 구신운 년도
            temp.year.push(deunInseun[i].year)
            // 일반대운 구신운 키워드
            temp.keyword.push(getResult('noSangsinUn',keyword).contents)
          }
          if (deunInseun[i].gung === '구신운') {
            // 일반대운 구신운 년도
            temp.year.push(deunInseun[i].year)
            // 일반대운 구신운 키워드
            temp.keyword.push(getResult('noGusinUn',keyword).contents)
          }
          if (deunInseun[i].ryeong === '지속운') {
            // 일반대운 구신운 년도
            temp.year.push(deunInseun[i].year)
            // 일반대운 구신운 키워드
            temp.keyword.push(getResult('noJisokUn',keyword).contents)
          }
          if (deunInseun[i].ryeong === '용신운') {
            // 일반대운 구신운 년도
            temp.year.push(deunInseun[i].year)
            // 일반대운 구신운 키워드
            temp.keyword.push(getResult('noYongsinUn',keyword).contents)
          }
        }
      }
      result = temp
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