const basicUse = require('../../../../manseUtil/basicUse/basicUse')
const manseTool = require('../../../../manseUtil/chunJiji/checkWord')
const gungShgjUtil = require('../../../../manseUtil/gungShgj/gungshgjUtil')
const keyword = require('../../../../testResult/contents_pro_report/addition/07.passUn/one.json')
const keyword2 = require('../../../../testResult/contents_pro_report/addition/07.passUn/two.json')
const keyword3 = require('../../../../testResult/contents_pro_report/addition/07.passUn/three.json')
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
          if (deunInseun[i].ryeong === '지속운') {
            // 1번지속운 년도
            temp.year.push(deunInseun[i].year)
            // 1번 지속운 키워드
            temp.keyword.push(getResult(type+'JisokUn',keyword).contents)
          }
          if (deunInseun[i].ryeong === '확장운') {
             // 1번확장운 년도
            temp.year.push(deunInseun[i].year)
            // 1번확장운 키워드
            temp.keyword.push(getResult(type+'HwakJangUn',keyword).contents)
          }
          if (deunInseun[i].gung === '상신운') {
            // 상신대운 상신운 년도
            temp.year.push(deunInseun[i].year)
            // 상신대운 상신운 키워드
            temp.keyword.push(getResult('sangsinDeunSangsinUn',keyword2).contents)
          }
          if (deunInseun[i].gung === '상신기신운') {
            // 상신대운 상신기신운 년도
            temp.year.push(deunInseun[i].year)
            // 상신대운 상신기신운 키워드
            temp.keyword.push(getResult('sangsinDeunSangsinUn',keyword2).contents)
          }
          if (deunInseun[i].gung === '구신운') {
            // 구신운 (7번 새로 추가된 공식)
            temp.year.push(deunInseun[i].year)
            // 구신운 (7번 새로 추가된 공식) 키워드
            temp.keyword.push(getResult('noGusinUn',keyword3).contents)
          }
          if (deunInseun[i].ryeong === '확장운') {
             // 1번확장운 년도
            temp.year.push(deunInseun[i].year)
            // 1번확장운 키워드
            temp.keyword.push(getResult(type+'HwakJangUn',keyword).contents)
          }
          if (deunInseun[i].ryeong === '용신운') {
            // 용신운 (7번 새로 추가된 공식)
            temp.year.push(deunInseun[i].year)
        // 용신운 (7번 새로 추가된 공식) 키워드
            temp.keyword.push(getResult('noYongsinUn',keyword3).contents)
          }
        }
      }
      if (deunInfo[i].gung === '상신기신운') {
        let year = getDeunInSeun(deunInfo[i].deunsu)
        let deunInseun = checkKind.checkKindWordSeunChunGan(year[0].year)
        for (let i = 0; i < deunInseun.length; i++) {
          if (deunInseun[i].ryeong === '지속운') {
            // 1번지속운 년도
            temp.year.push(deunInseun[i].year)
            // 1번 지속운 키워드
            temp.keyword.push(getResult(type+'JisokUn',keyword).contents)
          }
          if (deunInseun[i].ryeong === '확장운') {
             // 1번확장운 년도
            temp.year.push(deunInseun[i].year)
            // 1번확장운 키워드
            temp.keyword.push(getResult(type+'HwakJangUn',keyword).contents)
          }
          if (deunInseun[i].gung === '상신기신운') {
            // 상신기신대운 상신기신운 년도
            temp.year.push(deunInseun[i].year)
            // 상신기신대운 상신기신운 키워드
            temp.keyword.push(getResult('sangsinGisinDeunSangsinGisinUn',keyword2).contents)
          }
          if (deunInseun[i].gung === '상신운') {
            // 상신운 (7번 새로 추가된 공식)
            temp.year.push(deunInseun[i].year)
            // 상신운 (7번 새로 추가된 공식) 키워드
            temp.keyword.push(getResult('noSangsinUn',keyword3).contents)
          }
          if (deunInseun[i].gung === '구신운') {
            // 구신운 (7번 새로 추가된 공식)
            temp.year.push(deunInseun[i].year)
            // 구신운 (7번 새로 추가된 공식) 키워드
            temp.keyword.push(getResult('noGusinUn',keyword3).contents)
          }

          if (deunInseun[i].ryeong === '용신운') {
            // 용신운 (7번 새로 추가된 공식)
            temp.year.push(deunInseun[i].year)
        // 용신운 (7번 새로 추가된 공식) 키워드
            temp.keyword.push(getResult('noYongsinUn',keyword3).contents)
          }
        }
      }
      if (deunInfo[i].gung !== '상신기신운' &&
        deunInfo[i].gung !== '상신운') {
        let year = getDeunInSeun(deunInfo[i].deunsu)
        let deunInseun = checkKind.checkKindWordSeunChunGan(year[0].year)
        for (let i = 0; i < deunInseun.length; i++) {
          if (deunInseun[i].ryeong === '지속운') {
            // 1번지속운 년도
            temp.year.push(deunInseun[i].year)
            // 1번 지속운 키워드
            temp.keyword.push(getResult(type+'JisokUn',keyword).contents)
          }
          if (deunInseun[i].ryeong === '확장운') {
             // 1번확장운 년도
            temp.year.push(deunInseun[i].year)
            // 1번확장운 키워드
            temp.keyword.push(getResult(type+'HwakJangUn',keyword).contents)
          }
          if (deunInseun[i].gung === '상신운') {
            // 일반대운 상신운 년도
            temp.year.push(deunInseun[i].year)
            // 일반대운 상신운 키워드
            temp.keyword.push(getResult('normalDeunSangsinUn',keyword2).contents)
          }
          if (deunInseun[i].gung === '구신운') {
            // 구신운 (7번 새로 추가된 공식)
            temp.year.push(deunInseun[i].year)
            // 구신운 (7번 새로 추가된 공식) 키워드
            temp.keyword.push(getResult('noGusinUn',keyword3).contents)
          }
          if (deunInseun[i].ryeong === '용신운') {
            // 용신운 (7번 새로 추가된 공식)
            temp.year.push(deunInseun[i].year)
        // 용신운 (7번 새로 추가된 공식) 키워드
            temp.keyword.push(getResult('noYongsinUn',keyword3).contents)
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
            if (deunInseun[i].ryeong === '지속운') {
              // 1번지속운 년도
              temp.year.push(deunInseun[i].year)
              // 1번 지속운 키워드
              temp.keyword.push(getResult(type+'JisokUn',keyword).contents)
            }
            if (deunInseun[i].ryeong === '확장운') {
               // 1번확장운 년도
              temp.year.push(deunInseun[i].year)
              // 1번확장운 키워드
              temp.keyword.push(getResult(type+'HwakJangUn',keyword).contents)
            }
            if (deunInseun[i].gung === '구신운') {
              // 구신대운 구신운 키워드
              temp.year.push(deunInseun[i].year)
              // 구신대운 구신운 키워드
              temp.keyword.push(getResult('gusinDeunguisnUn',keyword2).contents)
            }
            if (deunInseun[i].gung === '상신운') {
              // 상신운 (7번 새로 추가된 공식)
              temp.year.push(deunInseun[i].year)
              // 상신운 (7번 새로 추가된 공식) 키워드
              temp.keyword.push(getResult('noSangsinUn',keyword3).contents)
            }
            if (deunInseun[i].ryeong === '용신운') {
              // 용신운 (7번 새로 추가된 공식)
              temp.year.push(deunInseun[i].year)
          // 용신운 (7번 새로 추가된 공식) 키워드
              temp.keyword.push(getResult('noYongsinUn',keyword3).contents)
            }
          }
        }
        if (deunInfo[i].gung === '구신운') {
          let year = getDeunInSeun(deunInfo[i].deunsu)
          let deunInseun = checkKind.checkKindWordSeunChunGan(year[0].year)
          for (let i = 0; i < deunInseun.length; i++) {
            if (deunInseun[i].ryeong === '지속운') {
              // 1번지속운 년도
              temp.year.push(deunInseun[i].year)
              // 1번 지속운 키워드
              temp.keyword.push(getResult(type+'JisokUn',keyword).contents)
            }
            if (deunInseun[i].ryeong === '확장운') {
               // 1번확장운 년도
              temp.year.push(deunInseun[i].year)
              // 1번확장운 키워드
              temp.keyword.push(getResult(type+'HwakJangUn',keyword).contents)
            }
            if (deunInseun[i].gung === '구신기신운' ||
              deunInseun[i].gung === '격기신운') {
              // 상신대운 상신기신운 년도
              temp.year.push(deunInseun[i].year)
              // 상신대운 상신기신운 키워드
              temp.keyword.push(getResult('gusinDeunGusinGisinUn',keyword2).contents)
            }
            if (deunInseun[i].gung === '상신운') {
              // 상신운 (7번 새로 추가된 공식)
              temp.year.push(deunInseun[i].year)
              // 상신운 (7번 새로 추가된 공식) 키워드
              temp.keyword.push(getResult('noSangsinUn',keyword3).contents)
            }
            if (deunInseun[i].gung === '구신운') {
              // 구신운 (7번 새로 추가된 공식)
              temp.year.push(deunInseun[i].year)
              // 구신운 (7번 새로 추가된 공식) 키워드
              temp.keyword.push(getResult('noGusinUn',keyword3).contents)
            }
            if (deunInseun[i].ryeong === '용신운') {
              // 용신운 (7번 새로 추가된 공식)
              temp.year.push(deunInseun[i].year)
          // 용신운 (7번 새로 추가된 공식) 키워드
              temp.keyword.push(getResult('noYongsinUn',keyword3).contents)
            }
          }
        }
        if (deunInfo[i].gung === '구신기신운' ||
          deunInfo[i].gung === '격기신운') {
          let year = getDeunInSeun(deunInfo[i].deunsu)
          let deunInseun = checkKind.checkKindWordSeunChunGan(year[0].year)
          for (let i = 0; i < deunInseun.length; i++) {
            if (deunInseun[i].ryeong === '지속운') {
              // 1번지속운 년도
              temp.year.push(deunInseun[i].year)
              // 1번 지속운 키워드
              temp.keyword.push(getResult(type+'JisokUn',keyword).contents)
            }
            if (deunInseun[i].ryeong === '확장운') {
               // 1번확장운 년도
              temp.year.push(deunInseun[i].year)
              // 1번확장운 키워드
              temp.keyword.push(getResult(type+'HwakJangUn',keyword).contents)
            }
            if (deunInseun[i].gung === '구신기신운' ||
              deunInseun[i].gung === '격기신운') {
              // 상신기신대운 상신기신운 년도
              temp.year.push(deunInseun[i].year)
              // 상신기신대운 상신기신운 키워드
              temp.keyword.push(getResult('gusinGisinDeunGusinGisinUn',keyword2).contents)
            }
            if (deunInseun[i].gung === '상신운') {
              // 상신운 (7번 새로 추가된 공식)
              temp.year.push(deunInseun[i].year)
              // 상신운 (7번 새로 추가된 공식) 키워드
              temp.keyword.push(getResult('noSangsinUn',keyword3).contents)
            }
            if (deunInseun[i].gung === '구신운') {
              // 구신운 (7번 새로 추가된 공식)
              temp.year.push(deunInseun[i].year)
              // 구신운 (7번 새로 추가된 공식) 키워드
              temp.keyword.push(getResult('noGusinUn',keyword3).contents)
            }
            if (deunInseun[i].ryeong === '용신운') {
              // 용신운 (7번 새로 추가된 공식)
              temp.year.push(deunInseun[i].year)
          // 용신운 (7번 새로 추가된 공식) 키워드
              temp.keyword.push(getResult('noYongsinUn',keyword3).contents)
            }
          }
        }
        if (deunInfo[i].gung !== '구신기신운' &&
          deunInfo[i].gung !== '격기신운' &&
          deunInfo[i].gung !== '구신운') {
          let year = getDeunInSeun(deunInfo[i].deunsu)
          let deunInseun = checkKind.checkKindWordSeunChunGan(year[0].year)
          for (let i = 0; i < deunInseun.length; i++) {
            if (deunInseun[i].ryeong === '지속운') {
              // 1번지속운 년도
              temp.year.push(deunInseun[i].year)
              // 1번 지속운 키워드
              temp.keyword.push(getResult(type+'JisokUn',keyword).contents)
            }
            if (deunInseun[i].ryeong === '확장운') {
               // 1번확장운 년도
              temp.year.push(deunInseun[i].year)
              // 1번확장운 키워드
              temp.keyword.push(getResult(type+'HwakJangUn',keyword).contents)
            }
            if (deunInseun[i].gung === '구신운') {
              // 일반대운 구신운 년도
              temp.year.push(deunInseun[i].year)
              // 일반대운 구신운 키워드
              temp.keyword.push(getResult('normalDeunguisnUn',keyword2).contents)
            }
            if (deunInseun[i].gung === '상신운') {
              // 상신운 (7번 새로 추가된 공식)
              temp.year.push(deunInseun[i].year)
              // 상신운 (7번 새로 추가된 공식) 키워드
              temp.keyword.push(getResult('noSangsinUn',keyword3).contents)
            }
            if (deunInseun[i].ryeong === '용신운') {
              // 용신운 (7번 새로 추가된 공식)
              temp.year.push(deunInseun[i].year)
          // 용신운 (7번 새로 추가된 공식) 키워드
              temp.keyword.push(getResult('noYongsinUn',keyword3).contents)
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
            temp.keyword.push(getResult('gusinYesGyoukUn',keyword2).contents)
          }
          if (deunInseun[i].gung === '구신운') {
            // 일반대운 구신운 년도
            temp.year.push(deunInseun[i].year)
            // 일반대운 구신운 키워드
            temp.keyword.push(getResult('gusinYesGusinUn',keyword2).contents)
          }
          if (deunInseun[i].gung === '상신운') {
            // 상신운 (7번 새로 추가된 공식)
            temp.year.push(deunInseun[i].year)
            // 상신운 (7번 새로 추가된 공식) 키워드
            temp.keyword.push(getResult('noSangsinUn',keyword3).contents)
          }
          if (deunInseun[i].ryeong === '지속운') {
            // 1번지속운 년도
            temp.year.push(deunInseun[i].year)
            // 1번 지속운 키워드
            temp.keyword.push(getResult(type+'JisokUn',keyword).contents)
          }
          if (deunInseun[i].ryeong === '확장운') {
             // 1번확장운 년도
            temp.year.push(deunInseun[i].year)
            // 1번확장운 키워드
            temp.keyword.push(getResult(type+'HwakJangUn',keyword).contents)
          }
          if (deunInseun[i].ryeong === '용신운') {
            // 용신운 (7번 새로 추가된 공식)
            temp.year.push(deunInseun[i].year)
        // 용신운 (7번 새로 추가된 공식) 키워드
            temp.keyword.push(getResult('noYongsinUn',keyword3).contents)
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
            temp.keyword.push(getResult('gusinNoSangsinYesSangsinUn',keyword2).contents)
          }
          if (deunInseun[i].gung === '상신기신운') {
            // 일반대운 구신운 년도
            temp.year.push(deunInseun[i].year)
            // 일반대운 구신운 키워드
            temp.keyword.push(getResult('gusinNoSangsinYesSangsinGisinUn',keyword2).contents)
          }
          if (deunInseun[i].gung === '구신운') {
            // 구신운 (7번 새로 추가된 공식)
            temp.year.push(deunInseun[i].year)
            // 구신운 (7번 새로 추가된 공식) 키워드
            temp.keyword.push(getResult('noGusinUn',keyword3).contents)
          }
          if (deunInseun[i].ryeong === '지속운') {
            // 1번지속운 년도
            temp.year.push(deunInseun[i].year)
            // 1번 지속운 키워드
            temp.keyword.push(getResult(type+'JisokUn',keyword).contents)
          }
          if (deunInseun[i].ryeong === '확장운') {
             // 1번확장운 년도
            temp.year.push(deunInseun[i].year)
            // 1번확장운 키워드
            temp.keyword.push(getResult(type+'HwakJangUn',keyword).contents)
          }
          if (deunInseun[i].ryeong === '용신운') {
            // 용신운 (7번 새로 추가된 공식)
            temp.year.push(deunInseun[i].year)
        // 용신운 (7번 새로 추가된 공식) 키워드
            temp.keyword.push(getResult('noYongsinUn',keyword3).contents)
          }
        }
      }
      result = temp
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