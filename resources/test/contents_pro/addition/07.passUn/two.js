const manseTool = require('../../../../manseUtil/chunJiji/checkWord')
const gungShgjUtil = require('../../../../manseUtil/gungShgj/gungshgjUtil')
const checkKind = require('../../../../manseUtil/chunJiji/checkKind')
const keyword = require('../../../../testResult/contents_pro_report/addition/07.passUn/two.json')
const keyword2 = require('../../../../testResult/contents_pro_report/addition/07.passUn/three.json')
let yearPillar = require("../../../../manse/pillar/yearPillar/yearPillar");
exports.two = (unse) => {
  let result = {}
  let deunInfo = checkKind.checkKindWordDeunChunGan()
  let gung = gungShgjUtil.gungShgjCollection()

  if (manseTool.checkALL(gung.sangsin) === 'Y' &&
    (manseTool.checkChunGan(gung.sangsingisin) === 'Y' ||
      manseTool.checkGangGuanPossible(gung.sangsingisin) === 'Y')) {
    let temp = {
      year: [],
      keyword: []
    }
    for (let i = 0; i < deunInfo.length; i++) {
      if (deunInfo[i].gung === '상신운') {
        let year = getDeunInSeun(deunInfo[i].deunsu)
        let deunInseun = checkKind.checkKindWordSeunChunGan(year[0].year)
        for (let i = 0; i < deunInseun.length; i++) {
          if (deunInseun[i].gung === '상신운') {
            // 상신대운 상신운 년도
            temp.year.push(deunInseun[i].year)
            // 상신대운 상신운 키워드
            temp.keyword.push(getResult('sangsinDeunSangsinUn',keyword).contents)
          }
          if (deunInseun[i].gung === '상신기신운') {
            // 상신대운 상신기신운 년도
            temp.year.push(deunInseun[i].year)
            // 상신대운 상신기신운 키워드
            temp.keyword.push(getResult('sangsinDeunSangsinUn',keyword).contents)
          }
          if (deunInseun[i].gung === '구신운') {
            // 구신운 (7번 새로 추가된 공식)
            temp.year.push(deunInseun[i].year)
            // 구신운 (7번 새로 추가된 공식) 키워드
            temp.keyword.push(getResult('noGusinUn',keyword2).contents)
          }
          if (deunInseun[i].ryeong === '지속운') {
            // 지속운 (7번 새로 추가된 공식)
            temp.year.push(deunInseun[i].year)
        // 지속운 (7번 새로 추가된 공식) 키워드
            temp.keyword.push(getResult('noJisokUn',keyword2).contents)
          }
          if (deunInseun[i].ryeong === '용신운') {
            // 용신운 (7번 새로 추가된 공식)
            temp.year.push(deunInseun[i].year)
        // 용신운 (7번 새로 추가된 공식) 키워드
            temp.keyword.push(getResult('noYongsinUn',keyword2).contents)
          }
        }
      }
      if (deunInfo[i].gung === '상신기신운') {
        let year = getDeunInSeun(deunInfo[i].deunsu)
        let deunInseun = checkKind.checkKindWordSeunChunGan(year[0].year)
        for (let i = 0; i < deunInseun.length; i++) {
          if (deunInseun[i].gung === '상신기신운') {
            // 상신기신대운 상신기신운 년도
            temp.year.push(deunInseun[i].year)
            // 상신기신대운 상신기신운 키워드
            temp.keyword.push(getResult('sangsinGisinDeunSangsinGisinUn',keyword).contents)
          }
          if (deunInseun[i].gung === '상신운') {
            // 상신운 (7번 새로 추가된 공식)
            temp.year.push(deunInseun[i].year)
            // 상신운 (7번 새로 추가된 공식) 키워드
            temp.keyword.push(getResult('noSangsinUn',keyword2).contents)
          }
          if (deunInseun[i].gung === '구신운') {
            // 구신운 (7번 새로 추가된 공식)
            temp.year.push(deunInseun[i].year)
            // 구신운 (7번 새로 추가된 공식) 키워드
            temp.keyword.push(getResult('noGusinUn',keyword2).contents)
          }
          if (deunInseun[i].ryeong === '지속운') {
            // 지속운 (7번 새로 추가된 공식)
            temp.year.push(deunInseun[i].year)
        // 지속운 (7번 새로 추가된 공식) 키워드
            temp.keyword.push(getResult('noJisokUn',keyword2).contents)
          }
          if (deunInseun[i].ryeong === '용신운') {
            // 용신운 (7번 새로 추가된 공식)
            temp.year.push(deunInseun[i].year)
        // 용신운 (7번 새로 추가된 공식) 키워드
            temp.keyword.push(getResult('noYongsinUn',keyword2).contents)
          }
        }
      }
      if (deunInfo[i].gung !== '상신기신운' &&
        deunInfo[i].gung !== '상신운') {
        let year = getDeunInSeun(deunInfo[i].deunsu)
        let deunInseun = checkKind.checkKindWordSeunChunGan(year[0].year)
        for (let i = 0; i < deunInseun.length; i++) {
          if (deunInseun[i].gung === '상신운') {
            // 일반대운 상신운 년도
            temp.year.push(deunInseun[i].year)
            // 일반대운 상신운 키워드
            temp.keyword.push(getResult('normalDeunSangsinUn',keyword).contents)
          }
          if (deunInseun[i].gung === '구신운') {
            // 구신운 (7번 새로 추가된 공식)
            temp.year.push(deunInseun[i].year)
            // 구신운 (7번 새로 추가된 공식) 키워드
            temp.keyword.push(getResult('noGusinUn',keyword2).contents)
          }
          if (deunInseun[i].ryeong === '지속운') {
            // 지속운 (7번 새로 추가된 공식)
            temp.year.push(deunInseun[i].year)
        // 지속운 (7번 새로 추가된 공식) 키워드
            temp.keyword.push(getResult('noJisokUn',keyword2).contents)
          }
          if (deunInseun[i].ryeong === '용신운') {
            // 용신운 (7번 새로 추가된 공식)
            temp.year.push(deunInseun[i].year)
        // 용신운 (7번 새로 추가된 공식) 키워드
            temp.keyword.push(getResult('noYongsinUn',keyword2).contents)
          }
        }
      }
    }
    result = temp
  }
  else if (manseTool.checkALL(gung.gusin) === 'Y' &&
      (manseTool.checkChunGan(gyeokGusinGisin()) === 'Y' ||
        manseTool.checkGangGuanPossible(gyeokGusinGisin()) === 'Y')) {
      let temp = {
        year: [],
        keyword: []
      }
      for (let i = 0; i < deunInfo.length; i++) {
        if (deunInfo[i].gung === '구신운') {
          let year = getDeunInSeun(deunInfo[i].deunsu)
          let deunInseun = checkKind.checkKindWordSeunChunGan(year[0].year)
          for (let i = 0; i < deunInseun.length; i++) {
            if (deunInseun[i].gung === '구신운') {
              // 구신대운 구신운 키워드
              temp.year.push(deunInseun[i].year)
              // 구신대운 구신운 키워드
              temp.keyword.push(getResult('gusinDeunguisnUn',keyword).contents)
            }
            if (deunInseun[i].gung === '상신운') {
              // 상신운 (7번 새로 추가된 공식)
              temp.year.push(deunInseun[i].year)
              // 상신운 (7번 새로 추가된 공식) 키워드
              temp.keyword.push(getResult('noSangsinUn',keyword2).contents)
            }
            if (deunInseun[i].ryeong === '지속운') {
              // 지속운 (7번 새로 추가된 공식)
              temp.year.push(deunInseun[i].year)
          // 지속운 (7번 새로 추가된 공식) 키워드
              temp.keyword.push(getResult('noJisokUn',keyword2).contents)
            }
            if (deunInseun[i].ryeong === '용신운') {
              // 용신운 (7번 새로 추가된 공식)
              temp.year.push(deunInseun[i].year)
          // 용신운 (7번 새로 추가된 공식) 키워드
              temp.keyword.push(getResult('noYongsinUn',keyword2).contents)
            }
          }
        }
        if (deunInfo[i].gung === '구신운') {
          let year = getDeunInSeun(deunInfo[i].deunsu)
          let deunInseun = checkKind.checkKindWordSeunChunGan(year[0].year)
          for (let i = 0; i < deunInseun.length; i++) {
            if (deunInseun[i].gung === '구신기신운' ||
              deunInseun[i].gung === '격기신운') {
              // 상신대운 상신기신운 년도
              temp.year.push(deunInseun[i].year)
              // 상신대운 상신기신운 키워드
              temp.keyword.push(getResult('gusinDeunGusinGisinUn',keyword).contents)
            }
            if (deunInseun[i].gung === '상신운') {
              // 상신운 (7번 새로 추가된 공식)
              temp.year.push(deunInseun[i].year)
              // 상신운 (7번 새로 추가된 공식) 키워드
              temp.keyword.push(getResult('noSangsinUn',keyword2).contents)
            }
            if (deunInseun[i].gung === '구신운') {
              // 구신운 (7번 새로 추가된 공식)
              temp.year.push(deunInseun[i].year)
              // 구신운 (7번 새로 추가된 공식) 키워드
              temp.keyword.push(getResult('noGusinUn',keyword2).contents)
            }
            if (deunInseun[i].ryeong === '지속운') {
              // 지속운 (7번 새로 추가된 공식)
              temp.year.push(deunInseun[i].year)
          // 지속운 (7번 새로 추가된 공식) 키워드
              temp.keyword.push(getResult('noJisokUn',keyword2).contents)
            }
            if (deunInseun[i].ryeong === '용신운') {
              // 용신운 (7번 새로 추가된 공식)
              temp.year.push(deunInseun[i].year)
          // 용신운 (7번 새로 추가된 공식) 키워드
              temp.keyword.push(getResult('noYongsinUn',keyword2).contents)
            }
          }
        }
        if (deunInfo[i].gung === '구신기신운' ||
          deunInfo[i].gung === '격기신운') {
          let year = getDeunInSeun(deunInfo[i].deunsu)
          let deunInseun = checkKind.checkKindWordSeunChunGan(year[0].year)
          for (let i = 0; i < deunInseun.length; i++) {
            if (deunInseun[i].gung === '구신기신운' ||
              deunInseun[i].gung === '격기신운') {
              // 상신기신대운 상신기신운 년도
              temp.year.push(deunInseun[i].year)
              // 상신기신대운 상신기신운 키워드
              temp.keyword.push(getResult('gusinGisinDeunGusinGisinUn',keyword).contents)
            }
            if (deunInseun[i].gung === '상신운') {
              // 상신운 (7번 새로 추가된 공식)
              temp.year.push(deunInseun[i].year)
              // 상신운 (7번 새로 추가된 공식) 키워드
              temp.keyword.push(getResult('noSangsinUn',keyword2).contents)
            }
            if (deunInseun[i].gung === '구신운') {
              // 구신운 (7번 새로 추가된 공식)
              temp.year.push(deunInseun[i].year)
              // 구신운 (7번 새로 추가된 공식) 키워드
              temp.keyword.push(getResult('noGusinUn',keyword2).contents)
            }
            if (deunInseun[i].ryeong === '지속운') {
              // 지속운 (7번 새로 추가된 공식)
              temp.year.push(deunInseun[i].year)
          // 지속운 (7번 새로 추가된 공식) 키워드
              temp.keyword.push(getResult('noJisokUn',keyword2).contents)
            }
            if (deunInseun[i].ryeong === '용신운') {
              // 용신운 (7번 새로 추가된 공식)
              temp.year.push(deunInseun[i].year)
          // 용신운 (7번 새로 추가된 공식) 키워드
              temp.keyword.push(getResult('noYongsinUn',keyword2).contents)
            }
          }
        }
        if (deunInfo[i].gung !== '구신기신운' &&
          deunInfo[i].gung !== '격기신운' &&
          deunInfo[i].gung !== '구신운') {
          let year = getDeunInSeun(deunInfo[i].deunsu)
          let deunInseun = checkKind.checkKindWordSeunChunGan(year[0].year)
          for (let i = 0; i < deunInseun.length; i++) {
            if (deunInseun[i].gung === '구신운') {
              // 일반대운 구신운 년도
              temp.year.push(deunInseun[i].year)
              // 일반대운 구신운 키워드
              temp.keyword.push(getResult('normalDeunguisnUn',keyword).contents)
            }
            if (deunInseun[i].gung === '상신운') {
              // 상신운 (7번 새로 추가된 공식)
              temp.year.push(deunInseun[i].year)
              // 상신운 (7번 새로 추가된 공식) 키워드
              temp.keyword.push(getResult('noSangsinUn',keyword2).contents)
            }
            if (deunInseun[i].ryeong === '지속운') {
              // 지속운 (7번 새로 추가된 공식)
              temp.year.push(deunInseun[i].year)
          // 지속운 (7번 새로 추가된 공식) 키워드
              temp.keyword.push(getResult('noJisokUn',keyword2).contents)
            }
            if (deunInseun[i].ryeong === '용신운') {
              // 용신운 (7번 새로 추가된 공식)
              temp.year.push(deunInseun[i].year)
          // 용신운 (7번 새로 추가된 공식) 키워드
              temp.keyword.push(getResult('noYongsinUn',keyword2).contents)
            }
          }
        }
      }
      result = temp
    }
    else if (manseTool.checkALL(gung.gusin) === 'Y') {
      let temp = {
        year: [],
        keyword: []
      }
      for (let i = 0; i < deunInfo.length; i++) {
        let year = getDeunInSeun(deunInfo[i].deunsu)
        let deunInseun = checkKind.checkKindWordSeunChunGan(year[0].year)
        for (let i = 0; i < deunInseun.length; i++) {
          if (deunInseun[i].gung === '격운') {
            // 일반대운 격운 년도
            temp.year.push(deunInseun[i].year)
            // 일반대운 격운 키워드
            temp.keyword.push(getResult('gusinYesGyoukUn',keyword).contents)
          }
          if (deunInseun[i].gung === '구신운') {
            // 일반대운 구신운 년도
            temp.year.push(deunInseun[i].year)
            // 일반대운 구신운 키워드
            temp.keyword.push(getResult('gusinYesGusinUn',keyword).contents)
          }
          if (deunInseun[i].gung === '상신운') {
            // 상신운 (7번 새로 추가된 공식)
            temp.year.push(deunInseun[i].year)
            // 상신운 (7번 새로 추가된 공식) 키워드
            temp.keyword.push(getResult('noSangsinUn',keyword2).contents)
          }
          if (deunInseun[i].ryeong === '지속운') {
            // 지속운 (7번 새로 추가된 공식)
            temp.year.push(deunInseun[i].year)
        // 지속운 (7번 새로 추가된 공식) 키워드
            temp.keyword.push(getResult('noJisokUn',keyword2).contents)
          }
          if (deunInseun[i].ryeong === '용신운') {
            // 용신운 (7번 새로 추가된 공식)
            temp.year.push(deunInseun[i].year)
        // 용신운 (7번 새로 추가된 공식) 키워드
            temp.keyword.push(getResult('noYongsinUn',keyword2).contents)
          }
        }
      }
      result = temp
    }
    else if (manseTool.checkALL(gung.gusin) === 'N' &&
      manseTool.checkALL(gung.sangsin) === 'Y') {
      let temp = {
        year: [],
        keyword: []
      }
      for (let i = 0; i < deunInfo.length; i++) {
        let year = getDeunInSeun(deunInfo[i].deunsu)
        let deunInseun = checkKind.checkKindWordSeunChunGan(year[0].year)
        for (let i = 0; i < deunInseun.length; i++) {
          if (deunInseun[i].gung === '상신운') {
            // 일반대운 격운 년도
            temp.year.push(deunInseun[i].year)
            // 일반대운 격운 키워드
            temp.keyword.push(getResult('gusinNoSangsinYesSangsinUn',keyword).contents)
          }
          if (deunInseun[i].gung === '상신기신운') {
            // 일반대운 구신운 년도
            temp.year.push(deunInseun[i].year)
            // 일반대운 구신운 키워드
            temp.keyword.push(getResult('gusinNoSangsinYesSangsinGisinUn',keyword).contents)
          }
          if (deunInseun[i].gung === '구신운') {
            // 구신운 (7번 새로 추가된 공식)
            temp.year.push(deunInseun[i].year)
            // 구신운 (7번 새로 추가된 공식) 키워드
            temp.keyword.push(getResult('noGusinUn',keyword2).contents)
          }
          if (deunInseun[i].ryeong === '지속운') {
            // 지속운 (7번 새로 추가된 공식)
            temp.year.push(deunInseun[i].year)
        // 지속운 (7번 새로 추가된 공식) 키워드
            temp.keyword.push(getResult('noJisokUn',keyword2).contents)
          }
          if (deunInseun[i].ryeong === '용신운') {
            // 용신운 (7번 새로 추가된 공식)
            temp.year.push(deunInseun[i].year)
        // 용신운 (7번 새로 추가된 공식) 키워드
            temp.keyword.push(getResult('noYongsinUn',keyword2).contents)
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