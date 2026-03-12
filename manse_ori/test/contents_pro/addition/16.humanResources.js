var Sangsin = {};
const manseTool = require('../../../manseUtil/chunJiji/checkWord')
const ryeongUtil = require('../../../manseUtil/ryeong/ryeongUtil')
const human = require('../../../testResult/contents_pro_report/addition/16.humanResources/contents_humanResources.json')
/**
 * wangYak ===Y 면 근왕 아니면 아니면 근약
 * keyword는  키워드를 의미하는것이다
 * @returns 
 */
Sangsin.randum = function () {
  let result ={};
  result =  self();
  return result;
};

const self = () => {
  let result ={
    title:'',
    type:'',
    keyword:''
  }

    if(T()==='Y'){
        result.title='전문 분야'
        result.type='ㅜ자형 인재'
        result.keyword=getResult('T_human',human).contents
    }
    else if(uu()==='Y'){
        result.title='넓은 분야'
        result.type='ㅡ자형 인재'
        result.keyword=getResult('uu_huamn',human).contents
    }
    else if(l()==='Y'){
        result.title='깊은 분야'
        result.type='ㅣ자형 인재'
        result.keyword=getResult('l_huamn',human).contents
    }
    else {
        result.title='다양한 분야'
        result.type='ㅠ자형 인재'
        result.keyword=getResult('TT_human',human).contents
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
