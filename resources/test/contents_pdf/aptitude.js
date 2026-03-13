var Sangsin = {};
const manseTool = require('../../manseUtil/chunJiji/checkWord')
const ryeongUtil = require('../../manseUtil/ryeong/ryeongUtil')
const basicUse = require('../../manseUtil/basicUse/basicUse')
const contents_attitude = require('../../testResult/content_pdf/contents_aptitude.json')

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
  result.yongsin = checkHisin()
  result.myYongsin = myYongsin()
  result.inverseYongsin = inverseYongsin()
  return result;
};
const inverseYongsin = () => {
  // 빠른작업을 위해 useRyeong을 함수화 시킴
// 객체들 리스트가 목록에 떠서 좀더 빠른작업 가능함
let result=''
let yongsinTitle = new Map()
yongsinTitle.set("계", "jeonghwa")
yongsinTitle.set("갑", "gyounggum")
yongsinTitle.set("을", "singum")
yongsinTitle.set("병", "limsu")
yongsinTitle.set("정", "gyesu")
yongsinTitle.set("경", "gapmok")
yongsinTitle.set("신", "ulmok")
yongsinTitle.set("임", "byeonghwa")
let title = yongsinTitle.get(useRyeong.yongsin)
result=getResult(title,contents_attitude).contents
return result;
}

const myYongsin = () => {
    // 빠른작업을 위해 useRyeong을 함수화 시킴
// 객체들 리스트가 목록에 떠서 좀더 빠른작업 가능함
let result=''
let yongsinTitle = new Map()
yongsinTitle.set("계", "gyesu")
yongsinTitle.set("갑", "gapmok")
yongsinTitle.set("을", "ulmok")
yongsinTitle.set("병", "byeonghwa")
yongsinTitle.set("정", "jeonghwa")
yongsinTitle.set("경", "gyounggum")
yongsinTitle.set("신", "singum")
yongsinTitle.set("임", "limsu")
let title = yongsinTitle.get(useRyeong.yongsin)
result=getResult(title,contents_attitude).contents
return result;
}

const checkHisin = () => {
    // 빠른작업을 위해 useRyeong을 함수화 시킴
// 객체들 리스트가 목록에 떠서 좀더 빠른작업 가능함
let result=''
const ryeong = ryeongUtil.ryeongCollection()
let yongsinTitle = new Map()
yongsinTitle.set("계", "gyesu")
yongsinTitle.set("갑", "gapmok")
yongsinTitle.set("을", "ulmok")
yongsinTitle.set("병", "byeonghwa")
yongsinTitle.set("정", "jeonghwa")
yongsinTitle.set("경", "gyounggum")
yongsinTitle.set("신", "singum")
yongsinTitle.set("임", "limsu")
let title = yongsinTitle.get(useRyeong.yongsin)
if(manseTool.checkPossible(ryeong.heuisin)==='Y'){
    result=getResult(title+'_hisin_Y',contents_attitude).contents
}
else {
    result=getResult(title+'_hisin_N',contents_attitude).contents
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
