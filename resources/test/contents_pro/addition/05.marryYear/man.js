const thisYear = require('../../../../manseUtil/element/seun/seunElememtRange')
const keyword = require('../../../../testResult/contents_pro_report/addition/05.loveYear/man.json')
var moment = require("moment");
exports.man = () => {
    const start = Number(moment().format("YYYY")) - 10;
    const end = Number(moment().format("YYYY"));
    let result={
        pass:[],
        future:[],
        passKeyword:'',
        futureKeyword:[],
        title:[]
    }
    let pass = [];
    let future = [];
    // const start = 2024;
    // 기준년도 기준으로, 10년이전까지
    let unType = thisYear.elementRangeWordSort(start)
    // 기준년도 기준으로 10년 이후까지
    let unType2 = thisYear.elementRangeWordSort(end)

    // unType 가장 최근과 unType2의 가장 최저값
    for (let i = unType.length - 1; i >= 0; i--) {
        if (unType[i].yuksin === '비견' ||
            unType[i].yuksin === '겁재') {
            pass = [Number(unType[i].year) - 1, Number(unType[i].year)]
            result.passKeyword=getResult('bigubUn',keyword).contents
            result.title.push('프로포즈 하는 운')
            break;
        }
        else if (unType[i].yuksin === '식신' ||
            unType[i].yuksin === '상관') {
            pass = [Number(unType[i].year) - 1, Number(unType[i].year)]
            result.passKeyword=getResult('siksangUn',keyword).contents
            result.title.push('대시 받는 운')
            break;
        }
    }

    for (let i = 0 ; i < unType2.length ; i++) {
        if (unType[i].yuksin === '비견' ||
            unType[i].yuksin === '겁재') {
                let temp = {
                    year:[Number(unType2[i].year), Number(unType2[i].year)+1],
                    keyword:getResult('bigubUn',keyword).contents,
                    title:'프로포즈 하는 운'
                }
                i=i+1
                future.push(temp)
        }
        else if (unType[i].yuksin === '식신' ||
            unType[i].yuksin === '상관') {
                let temp = {
                    year:[Number(unType2[i].year), Number(unType2[i].year)+1],
                    keyword:getResult('siksangUn',keyword).contents,
                    title:'대시 받는 운'
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