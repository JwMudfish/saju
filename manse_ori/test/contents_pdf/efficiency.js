var Sangsin = {};
const manseTool = require('../../manseUtil/chunJiji/checkWord')
const ryeongUtil = require('../../manseUtil/ryeong/ryeongUtil')
const basicUse = require('../../manseUtil/basicUse/basicUse')
const sentence = require('../../testResult/content_pdf/contents_efficiency.json')
/**
 * wangYak ===Y 면 근왕 아니면 아니면 근약
 * keyword는  키워드를 의미하는것이다
 * @returns 
 */
Sangsin.randum = function () {
  let result =self();
  return result;
};

const self = () => {
  let result ={}
  let jisokTitle= jisok()
  let hwakjangTitle= hwakjang()
  result.jisok=  getResult(jisokTitle,sentence).contents
  result.hwakjang=   getResult(hwakjangTitle,sentence).contents
  result.total=getResult(jisokTitle+'_'+hwakjangTitle,sentence).contents
  result.title=title()
  return result;
};

const title = () => {
    let result='보통'
     // 빠른작업을 위해 useRyeong을 함수화 시킴
    // 객체들 리스트가 목록에 떠서 좀더 빠른작업 가능함
    const ryeong = ryeongUtil.ryeongCollection()
    if(manseTool.checkPossible(ryeong.heuisin)==='Y' &&
    manseTool.checkPossible(ryeong.jisok)==='Y' &&
    manseTool.checkPossible(ryeong.hwakjang)==='Y'){
        result='최상'
    }
    else     if(manseTool.checkPossible(ryeong.heuisin)==='N' &&
    manseTool.checkPossible(ryeong.jisok)==='N' &&
    manseTool.checkPossible(ryeong.hwakjang)==='N'){
        result='낮음'
    }
    else     if(checkHigh()==='Y'){
        result='높음'
    }

    return result;
}

const checkHigh = () => {
    const ryeong = ryeongUtil.ryeongCollection()
    let result='N'
    if(basicUse.getBasicUse()==='basic'){
        if(manseTool.checkPossible(ryeong.jisok)==='Y' &&
    manseTool.checkPossible(ryeong.hwakjang)==='N'){
        result='Y'
    }
    }
    else {
        if(manseTool.checkPossible(ryeong.jisok)==='N' &&
        manseTool.checkPossible(ryeong.hwakjang)==='Y'){
            result='Y'
        }
    }

    return result
}

const jisok = () => {
    let result='jisok_'
     // 빠른작업을 위해 useRyeong을 함수화 시킴
    // 객체들 리스트가 목록에 떠서 좀더 빠른작업 가능함
    const ryeong = ryeongUtil.ryeongCollection()
    result=result+checkGetNumber(ryeong.jisok)
    return result;
}
const hwakjang = () => {
    let result='hwakjang_'
     // 빠른작업을 위해 useRyeong을 함수화 시킴
    // 객체들 리스트가 목록에 떠서 좀더 빠른작업 가능함
    const ryeong = ryeongUtil.ryeongCollection()
    result=result+checkGetNumber(ryeong.hwakjang)
    return result;
}

const checkGetNumber = (word) => {
    let result=0
         // 빠른작업을 위해 useRyeong을 함수화 시킴
    // 객체들 리스트가 목록에 떠서 좀더 빠른작업 가능함
    const ryeong = ryeongUtil.ryeongCollection()
    if(manseTool.checkPossible(ryeong.heuisin)==='Y'){
        result=getNumber(word,0)
    }
    else {
        result=getNumber(word,4)
    }

    return result;
}

const getNumber = (word,number) => {
    let result= 0;
    if(basicUse.getBasicUse()==='basic'){
        if(manseTool.checkPossible(word)==='Y'){
            result=1+number
        }
        else {
            result=2+number
        }
    }
    else  if(basicUse.getBasicUse()==='uses'){
        if(manseTool.checkPossible(word)==='Y'){
            result=3+number
        }
        else {
            result=4+number
        }
    }
    return result;
}

const checkD = (obj,word) => {
    let result='';
    if(manseTool.checkPossible(obj)==='N'){
        result=word+'이 사용대기 상태입니다! '
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
module.exports = Sangsin;
