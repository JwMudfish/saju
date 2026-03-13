var Sangsin = {};
const manseTool = require('../../manseUtil/chunJiji/checkWord')
const ryeongUtil = require('../../manseUtil/ryeong/ryeongUtil')
/**
 * wangYak ===Y 면 근왕 아니면 아니면 근약
 * keyword는  키워드를 의미하는것이다
 * @returns 
 */
Sangsin.randum = function () {
  let result ={};
  result.keyword =  self();
  return result;
};

const self = () => {
  let result =''

    if(T()==='Y'){
        result='ㅜ자형 인재'
    }
    else if(uu()==='Y'){
        result='ㅡ자형 인재'
    }
    else if(l()==='Y'){
        result='ㅣ자형 인재'
    }
    else {
        result='ㅠ자형 인재'
    }
  return result;
};

const l = () => {
    let result='N'
// 빠른작업을 위해 useRyeong을 함수화 시킴
// 객체들 리스트가 목록에 떠서 좀더 빠른작업 가능함
const ryeong = ryeongUtil.ryeongCollection()
if(manseTool.checkPossible(ryeong.heuisin)==='Y' &&
manseTool.checkPossible(ryeong.jisok)==='Y'){
    if(countGisin()<=1){
        result='Y'
    }
}
    return result;
}
const uu = ()  => {
    let result='N'
    // 빠른작업을 위해 useRyeong을 함수화 시킴
    // 객체들 리스트가 목록에 떠서 좀더 빠른작업 가능함
    const ryeong = ryeongUtil.ryeongCollection()
    if(manseTool.checkPossible(ryeong.heuisin)==='N' &&
    manseTool.checkPossible(ryeong.jisok)==='N'){
        if(countGisin()>=1){
            result='Y'
        }
    }
        return result;
}
const T = ()  => {
    let result='N'
    // 빠른작업을 위해 useRyeong을 함수화 시킴
    // 객체들 리스트가 목록에 떠서 좀더 빠른작업 가능함
    const ryeong = ryeongUtil.ryeongCollection()
    if(manseTool.checkPossible(ryeong.heuisin)==='Y' &&
    manseTool.checkPossible(ryeong.jisok)==='Y' &&
    manseTool.checkPossible(ryeong.geuk_gisin)==='N'&&
    manseTool.checkPossible(ryeong.um_gisin)==='N'){
        result='Y'
    }
        return result;
}
const TT = ()  => {
    let result='N'
    // 빠른작업을 위해 useRyeong을 함수화 시킴
    // 객체들 리스트가 목록에 떠서 좀더 빠른작업 가능함
    const ryeong = ryeongUtil.ryeongCollection()
    if(manseTool.checkALL(ryeong.heuisin)==='Y' &&
    manseTool.checkALL(ryeong.jisok)==='Y'){
        if(countGisin()>=2){
            if(checkChun()==='Y')
            {
                result='Y'
            }
        }
    }
        return result;
}

const checkChun = () => {
    let result ='N'
    if(manseTool.checkChunGanWord('계')==='Y'&&manseTool.checkChunGanWord('갑')==='Y' ){
        result ='Y'
    }
    else  if(manseTool.checkChunGanWord('을')==='Y'&&manseTool.checkChunGanWord('병') ==='Y'){
        result ='Y'
    }
    else  if(manseTool.checkChunGanWord('신')==='Y'&&manseTool.checkChunGanWord('임') ==='Y'){
        result ='Y'
    }
    else  if(manseTool.checkChunGanWord('정')==='Y'&&manseTool.checkChunGanWord('경')==='Y' ){
        result ='Y'
    }
    return result;
}
const countGisin = () => {
    let result =0;
    // 빠른작업을 위해 useRyeong을 함수화 시킴
// 객체들 리스트가 목록에 떠서 좀더 빠른작업 가능함
const ryeong = ryeongUtil.ryeongCollection()
    if(manseTool.checkChunGan(ryeong.geuk_gisin)==='Y'){
        result=result+1
    }
    if(manseTool.checkChunGan(ryeong.um_gisin)==='Y'){
        result=result+1
    }
    if(manseTool.checkChunGan(ryeong.geuk_heuisin_gisin)==='Y'){
        result=result+1
    }
    if(manseTool.checkChunGan(ryeong.um_heuisin_gisin)==='Y'){
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
