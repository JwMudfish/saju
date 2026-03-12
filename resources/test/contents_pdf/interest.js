var Sangsin = {};
const manseTool = require('../../manseUtil/chunJiji/checkWord')
const ryeongUtil = require('../../manseUtil/ryeong/ryeongUtil')
const basicUse = require('../../manseUtil/basicUse/basicUse')
const contents = require('../../testResult/content_pdf/contents_interest.json')
/**
 * wangYak ===Y 면 근왕 아니면 아니면 근약
 * keyword는  키워드를 의미하는것이다
 * @returns 
 */
Sangsin.randum = function () {
  let result = self();
  return result;
};

const self = () => {
  let result ={}

    result.professional=professional()
    result.fusion=fusion()
    result.um_heuisin_gisin=gisin('um_heuisin_gisin')
    result.geuk_heuisin_gisin=gisin('geuk_heuisin_gisin')
    result.um_gisin=gisin('um_gisin')
    result.geuk_gisin=gisin('geuk_gisin')
  return result;
};

const gisin = (word) => {
    let result='';
    let yongsinTitle = new Map()
    yongsinTitle.set("계", "gyesu_")
    yongsinTitle.set("갑", "gapmok_")
    yongsinTitle.set("을", "ulmok_")
    yongsinTitle.set("병", "byeonghwa_")
    yongsinTitle.set("정", "jeonghwa_")
    yongsinTitle.set("경", "gyounggum_")
    yongsinTitle.set("신", "singum_")
    yongsinTitle.set("임", "limsu_")
    let title = yongsinTitle.get(useRyeong.yongsin)
    const ryeong = ryeongUtil.ryeongCollection()
if(manseTool.checkPossible(ryeong.heuisin)==='Y'){
    result=getResult(title+word+'_hisinYes',contents).contents
}
else {
    result=getResult(title+word+'_hisinNo',contents).contents
}
    return result;
}

const professional = () => {
    let result=1
// 빠른작업을 위해 useRyeong을 함수화 시킴
// 객체들 리스트가 목록에 떠서 좀더 빠른작업 가능함
const ryeong = ryeongUtil.ryeongCollection()
if(manseTool.checkPossible(ryeong.heuisin)==='Y'){
    result=result+4
}
else {
    result=result+2
}

if(basicUse.getBasicUse()==='basic'){
    if(manseTool.checkPossible(ryeong.jisok)==='Y'){
        result=result+3
    }
    else  if(manseTool.checkPossible(ryeong.hwakjang)==='Y'){
        result=result+1
    }
}
else if(basicUse.getBasicUse()==='uses'){
    if(manseTool.checkPossible(ryeong.jisok)==='Y'){
        result=result+1
    }
    else  if(manseTool.checkPossible(ryeong.hwakjang)==='Y'){
        result=result+3
    }
}
if(manseTool.checkPossible(ryeong.geuk_gisin)==='Y'){
    result=result-2
}
if(manseTool.checkPossible(ryeong.geuk_heuisin_gisin)==='Y'){
    result=result-1
}
    return result;
}

const fusion = () => {
    let result=0
    // 빠른작업을 위해 useRyeong을 함수화 시킴
// 객체들 리스트가 목록에 떠서 좀더 빠른작업 가능함
const ryeong = ryeongUtil.ryeongCollection()
    if(manseTool.checkPossible(ryeong.heuisin)==='N'){
        result=result+4
    }
    if(manseTool.checkPossible(ryeong.geuk_gisin)==='Y'){
        result=result+2
    }
    if(manseTool.checkPossible(ryeong.um_gisin)==='Y'){
        result=result+1
    }
    if(manseTool.checkPossible(ryeong.geuk_heuisin_gisin)==='Y'){
        result=result+2
    }
    if(manseTool.checkPossible(ryeong.um_heuisin_gisin)==='Y'){
        result=result+1
    }
    return result
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
