const thisYear = require('../../../../manseUtil/element/wol/wolElememtRange')
const manseUtil = require('../../../../manseUtil/chunJiji/checkWord')
const keywordOne = require('../../../../testResult/contents_pro_report/addition/04.loveDay/one.json')
const keywordTwo = require('../../../../testResult/contents_pro_report/addition/04.loveDay/two.json')
const keywordThreeFour = require('../../../../testResult/contents_pro_report/addition/04.loveDay/three,four.json')
const keywordFiveSix= require('../../../../testResult/contents_pro_report/addition/04.loveDay/five,six.json')
var moment = require("moment");
exports.one = () => {
    let result=[]
    if (myManse.info.gender === "M" &&
        manseUtil.checkChunGanWord('무') === 'Y' &&
        (manseUtil.checkChunGanWord('병') === 'Y' ||
            manseUtil.checkChunGanWord('임') === 'Y')) {
        // [남자] 천간 무토 + 병 or 임
        result = oneCommonFunc('병','임', "4-1-1")
    }
    else if (myManse.info.gender === "F" &&
        manseUtil.checkChunGanWord('무') === 'Y' &&
        (manseUtil.checkChunGanWord('병') === 'Y' ||
            manseUtil.checkChunGanWord('임') === 'Y')) {
        // [여자] 천간 무토 + 병 or 임
        result = oneCommonFunc('무','무',"4-1-2")
    }
    else if (myManse.info.gender === "F" &&
        manseUtil.checkChunGanWord('기') === 'Y' &&
        (manseUtil.checkChunGanWord('계') === 'Y' ||
            manseUtil.checkChunGanWord('정') === 'Y')) {
        //[여자] 천간 기토 + 계 or 정
        result = oneCommonFunc('기','기',"4-1-3")
    }
    else if (myManse.info.gender === "M" &&
        manseUtil.checkChunGanWord('기') === 'Y' &&
        (manseUtil.checkChunGanWord('계') === 'Y' ||
            manseUtil.checkChunGanWord('정') === 'Y')) {
        //[남자] 천간 기토 + 계 or 정
        result = oneCommonFunc('계','정',"4-1-4")
    }
    else if (myManse.info.gender === "M" &&
        manseUtil.checkChunGanWord('기') === 'Y' &&
        (manseUtil.checkChunGanWord('병') === 'Y' ||
            manseUtil.checkChunGanWord('임') === 'Y')) {
        //[남자] 천간 기토 + 병 or 임
        result = oneCommonFunc('계','정',"4-1-5")
    }
    else if (myManse.info.gender === "F" &&
        manseUtil.checkChunGanWord('기') === 'Y' &&
        (manseUtil.checkChunGanWord('병' === 'Y' ||
            manseUtil.checkChunGanWord('임') === 'Y'))) {
        //[여자] 천간 기토 + 병 or 임
        result = oneCommonFunc('무','무',"4-1-6")
    }
    else if (myManse.info.gender === "F" &&
        manseUtil.checkChunGanWord('무') === 'Y' &&
        (manseUtil.checkChunGanWord('계') === 'Y' ||
            manseUtil.checkChunGanWord('정') === 'Y')) {
        //[여자] 천간 무토 + 계 or 정
        result = oneCommonFunc('기','기',"4-1-7")
    }
    else if (myManse.info.gender === "M" &&
        manseUtil.checkChunGanWord('무') === 'Y' &&
        (manseUtil.checkChunGanWord('계') === 'Y' ||
            manseUtil.checkChunGanWord('정') === 'Y')) {
        //[남자] 천간 무토 + 계 or 정
        result = oneCommonFunc('계','정', "4-1-8")
    }

    return result;
}
const oneCommonFunc = (word1,word2,type) => {
    let result=[]

    const start = Number(moment().format("YYYY"));
    // 올해년도
    let unType = thisYear.elementRangeWord(start)
    // 내년년도
    let unType2 = thisYear.elementRangeWord(start+1)

    const nowMonth = Number(moment().format("MM"));
    // const nowMonth = 11
    for(let i=0; i<unType.length; i++) {
        let temp={};
        if (unType[i].month<nowMonth) {
        }
        else if(unType[i].word[0]===word1 || unType[i].word[0]===word2 ) {
            temp.year=start
            temp.month=unType[i].month
            temp.keyword=getResult(type,keywordOne).contents
            result.push(temp)
        }
    }
        for(let i=0; i<unType2.length; i++) {
            let temp={};
           if(unType2[i].word[0]===word1 || unType2[i].word[0]===word2) {
                temp.year=start+1
                temp.month=unType2[i].month
                temp.keyword=getResult(type,keywordOne).contents
                result.push(temp)
            }
    }
    return result;
}
exports.two = () => {

    let result =[]
    if (manseUtil.checkChunGanWord('기') === 'Y' &&
        manseUtil.checkChunGanWord('무') === 'Y') {
            result=twoCommonFunc('gitomoto4-2-')
    }
    else if (manseUtil.checkChunGanWord('기') === 'Y') {
        result=twoCommonFunc('gito4-2-')
    }    
    else if (manseUtil.checkChunGanWord('무') === 'Y') {
        result=twoCommonFunc('moto4-2-')
    }

    return result;
}
const twoCommonFunc =  (type) => {
    let result=[]

    const start = Number(moment().format("YYYY"));
    // 올해년도 월리스트
    let unType = thisYear.elementRangeWord(start)
    unType.sort(function(a,b){
        return a.month < b.month ? -1 : 1; 
      })
    // 내년년도 월리스트
    let unType2 = thisYear.elementRangeWord(start+1)
    unType2.sort(function(a,b){
        return a.month < b.month ? -1 : 1; 
      })

    const nowMonth = Number(moment().format("MM"));
    // const nowMonth = 11
    for(let i=0; i<unType.length; i++) {
        let temp={};
        if (unType[i].month<nowMonth) {
        }
        else if(unType[i].word[0]==='계' || unType[i].word[0]==='정' ) {
            temp.year=start
            temp.month=unType[i].month
            temp.keyword=getResult('common',keywordTwo).contents+getResult(type+1,keywordTwo).contents
            result.push(temp)
        }
        else if(unType[i].word[0]==='병' || unType[i].word[0]==='임' ) {
            temp.year=start
            temp.month=unType[i].month
            temp.keyword=getResult('common',keywordTwo).contents+getResult(type+2,keywordTwo).contents
            result.push(temp)
        }
    }
        for(let i=0; i<unType2.length; i++) {
            let temp={};
            if(unType2[i].word[0]==='계' || unType2[i].word[0]==='정' ) {
                temp.year=start+1
                temp.month=unType2[i].month
                temp.keyword=getResult('common',keywordTwo).contents+getResult(type+1,keywordTwo).contents
                result.push(temp)
            }
            else if(unType2[i].word[0]==='병' || unType2[i].word[0]==='임' ) {
                temp.year=start+1
                temp.month=unType2[i].month
                temp.keyword=getResult('common',keywordTwo).contents+getResult(type+2,keywordTwo).contents
                result.push(temp)
            }
    }
    return result;
}
exports.threeFour = () => {
    let result={}
    if(manseUtil.checkChunGanWord('계') === 'Y'||
    manseUtil.checkChunGanWord('정') === 'Y'){
        result=threeFourCommonFunc('4-3-')
    }
    else if (manseUtil.checkChunGanWord('무') === 'Y'||
    manseUtil.checkChunGanWord('임') === 'Y') {
        result=threeFourCommonFunc('4-4-')
    }

    return result;
}
exports.fiveSix= () => {
    let result={}
    if(myManse.info.gender==='M'){
        result=fiveSixCommonFunc('4-5-')
    }
    else {
        result=fiveSixCommonFunc('4-6-')
    }

    return result;
}

const fiveSixCommonFunc =  (type) => {
    let result=[]

    const start = Number(moment().format("YYYY"));
    // 올해년도 월리스트
    let unType = thisYear.elementRangeWord(start)
    unType.sort(function(a,b){
        return a.month < b.month ? -1 : 1; 
      })
    // 내년년도 월리스트
    let unType2 = thisYear.elementRangeWord(start+1)
    unType2.sort(function(a,b){
        return a.month < b.month ? -1 : 1; 
      })
    const nowMonth = Number(moment().format("MM"));
    // const nowMonth = 11
    for(let i=0; i<unType.length; i++) {
        let temp={};
        if (unType[i].month<nowMonth) {
        }
        else if(unType[i].yuksin[0]==='식신' || unType[i].yuksin[0]==='상관') {
            temp.year=start
            temp.month=unType[i].month
            temp.type='yuksin'
            result.push(temp)
            temp.keyword=getResult(type+1,keywordFiveSix).contents
        }
        else if(unType[i].yuksin[0]==='비견' || unType[i].yuksin[0]==='겁재') {
            temp.year=start
            temp.month=unType[i].month
            temp.type='yuksin'
            result.push(temp)
            temp.keyword=getResult(type+2,keywordFiveSix).contents
        }
    }
        for(let i=0; i<unType2.length; i++) {
            let temp={};
            if(unType2[i].yuksin[0]==='식신' || unType2[i].yuksin[0]==='상관') {
                temp.year=start+1
                temp.month=unType2[i].month
                temp.type='yuksin'
                result.push(temp)
                temp.keyword=getResult(type+1,keywordFiveSix).contents
            }
            else if(unType2[i].yuksin[0]==='비견' || unType2[i].yuksin[0]==='겁재') {
                temp.year=start+1
                temp.month=unType2[i].month
                temp.type='yuksin'
                result.push(temp)
                temp.keyword=getResult(type+2,keywordFiveSix).contents
            }
           
    }
    return result;
}


const threeFourCommonFunc =  (type) => {
    let result=[]

    const start = Number(moment().format("YYYY"));
    // 올해년도 월리스트
    let unType = thisYear.elementRangeWord(start)
    unType.sort(function(a,b){
        return a.month < b.month ? -1 : 1; 
      })
    // 내년년도 월리스트
    let unType2 = thisYear.elementRangeWord(start+1)
    unType2.sort(function(a,b){
        return a.month < b.month ? -1 : 1; 
      })

    const nowMonth = Number(moment().format("MM"));
    // const nowMonth = 11
    for(let i=0; i<unType.length; i++) {
        let temp={};
        if (unType[i].month<nowMonth) {
        }
        else if(unType[i].word[0]==='기') {
            temp.year=start
            temp.month=unType[i].month
            result.push(temp)
            temp.keyword=getResult(type+1,keywordThreeFour).contents
        }
        else if(unType[i].word[0]==='무') {
            temp.year=start
            temp.month=unType[i].month
            result.push(temp)
            temp.keyword=getResult(type+2,keywordThreeFour).contents
        }
        else if(unType[i].word[1]==='진' || unType[i].word[1]==='술' ) {
            temp.year=start
            temp.month=unType[i].month
            result.push(temp)
            temp.keyword=getResult(type+3,keywordThreeFour).contents
        }
        else if(unType[i].word[1]==='축' || unType[i].word[1]==='미' ) {
            temp.year=start
            temp.month=unType[i].month
            result.push(temp)
            temp.keyword=getResult(type+4,keywordThreeFour).contents
        }
    }
        for(let i=0; i<unType2.length; i++) {
            let temp={};
            if(unType2[i].word[0]==='기') {
                temp.year=start+1
                temp.month=unType2[i].month
                result.push(temp)
                temp.keyword=getResult(type+1,keywordThreeFour).contents
            }
            else if(unType2[i].word[0]==='무') {
                temp.year=start+1
                temp.month=unType2[i].month
                result.push(temp)
                temp.keyword=getResult(type+2,keywordThreeFour).contents
            }
            else if(unType2[i].word[1]==='진' || unType2[i].word[1]==='술' ) {
                temp.year=start+1
                temp.month=unType2[i].month
                result.push(temp)
                temp.keyword=getResult(type+3,keywordThreeFour).contents
            }
            else if(unType2[i].word[1]==='축' || unType2[i].word[1]==='미' ) {
                temp.year=start+1
                temp.month=unType2[i].month
                result.push(temp)
                temp.keyword=getResult(type+4,keywordThreeFour).contents
            }
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