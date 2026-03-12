const range = require('../../../../manseUtil/chunJiji/checkKind')
const keyword = require('../../../../testResult/contents_pro_report/addition/05.loveYear/woman.json')
var moment = require("moment");
exports.woman = () => {
    const start = Number(moment().format("YYYY")) - 10;
    const end = Number(moment().format("YYYY"));
    let result={
        pass:[],
        future:[],
        passKeyword:'',
        futureKeyword:'',
        title:[]
    }
    let pass = [];
    let future = [];
    // const start = 2024;
    // 기준년도 기준으로, 10년이전까지
    let unType = range.checkKindWordSeunChunGan(start)
    // 기준년도 기준으로 10년 이후까지
    let unType2 = range.checkKindWordSeunChunGan(end)

    // unType 가장 최근과 unType2의 가장 최저값
    for (let i = unType.length - 1; i >= 0; i--) {
        if (unType[i].yuksin === '비겁운') {
            pass = [Number(unType[i].year) - 1, Number(unType[i].year)]
            result.passKeyword=getResult('bigubUn',keyword).contents
            result.title.push('프로포즈 받는 운')
            break;
        }
        else if (unType[i].ryeong === '용신운') {
            pass = [Number(unType[i].year) - 1, Number(unType[i].year)]
            result.passKeyword=getResult('yongsinUn',keyword).contents
            result.title.push('하늘이 정해준 운명')
            break;
        }
        else if (unType[i].gung === '상신운') {
            pass = [Number(unType[i].year) - 1, Number(unType[i].year)]
            result.passKeyword=getResult('sangsinUn',keyword).contents
            result.title.push('가정을 이루기 좋은 운')
            break;
        }
        else if (unType[i].gung === '구신운') {
            pass = [Number(unType[i].year) - 1, Number(unType[i].year)]
            result.passKeyword=getResult('gusinUn',keyword).contents
            result.title.push('계획에 없던 결혼')
            break;
        }
    }

    for (let i = 0 ; i < unType2.length ; i++) {
        if (unType2[i].yuksin === '비겁운') {
            let temp = {
                year:[Number(unType2[i].year), Number(unType2[i].year)+1],
                keyword:getResult('bigubUn',keyword).contents,
                title:'프로포즈 받는 운'
            }
            i=i+1
            future.push(temp)
        }
        else if (unType2[i].ryeong === '용신운') {
            let temp = {
                year:[Number(unType2[i].year), Number(unType2[i].year)+1],
                keyword:getResult('yongsinUn',keyword).contents,
                title:'하늘이 정해준 운명'
            }
            i=i+1
            future.push(temp)
        }
        else if (unType2[i].gung === '상신운') {
            let temp = {
                year:[Number(unType2[i].year), Number(unType2[i].year)+1],
                keyword:getResult('sangsinUn',keyword).contents,
                title:'가정을 이루기 좋은 운'
            }
            i=i+1
            future.push(temp)
        }
        else if (unType2[i].gung === '구신운') {
            let temp = {
                year:[Number(unType2[i].year), Number(unType2[i].year)+1],
                keyword:getResult('gusinUn',keyword).contents,
                title:'계획에 없던 결혼'
            }
            i=i+1
            future.push(temp)
        }
    }
    result.pass=pass;
    result.future=[future[0].year,future[1].year]
    result.futureKeyword=[future[0].keyword,future[1].keyword]
    result.title.push(future[0].title)
    result.title.push(future[1].title)

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
