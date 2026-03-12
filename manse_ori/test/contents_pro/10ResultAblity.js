var Sangsin = {};

const keyword = require('../../testResult/contents_pro_report/10resultAblity/resultAblity.json');
const manseTool = require('../../manseUtil/chunJiji/checkWord')
/**
 * level은 높,보,낮을 의미하는거고
 * contents는 키워드를 의미하는것이다
 * @returns 
 */
Sangsin.randum = function () {
  let result = self();
  return result;
};

const self = () => {
  let result={
    type:'',
    keyword:''
  };
  if(manseTool.checkALL(useShgj.gusin)==='N'){
    // 구신이 없음 (운에 맡김)
    result.type='운에맡김'
    result.keyword=getResult('no',keyword).contents
  }
  else {
    if(manseTool.checkALL(useShgj.sangsin)==='Y'){
      // 튼튼느림 (상신있음)
      result=checkType('튼튼느림','slow')
    }
    else {
      result=checkType('부실빠름','fast')
    }
  }
  return result;
};

const checkType = (type,keywordType) => {
  let result={
    type:'',
    keyword:''
  };
  result.type=type
  if(manseTool.checkALL(gyeokGusinGisin())==='N'){
    // 격기신 없음
    result.keyword=getResult(keywordType+5,keyword).contents
}
else {
  // 격기신 있음
  if(manseTool.checkChunGan(useShgj.gusin)==='Y'){
    // 천간에 구신이 있음
    if(manseTool.checkChunGan(gyeokGusinGisin())==='Y'){
      // 천간에 격기신(구신기신) 있음
      result.keyword=getResult(keywordType+3,keyword).contents
    }
    else {
       // 지장간에 격기신(구신기신)있음
      result.keyword=getResult(keywordType+4,keyword).contents
    }
  }
  else {
    // 지장간에 구신이 있음
    if(manseTool.checkChunGan(gyeokGusinGisin())==='Y'){
      // 천간에 격기신(구신기신) 있음
      result.keyword=getResult(keywordType+2,keyword).contents
    }
    else {
       // 지장간에 격기신(구신기신)있음
      result.keyword=getResult(keywordType+1,keyword).contents
    }
  }
}
  return result;

}
const gyeokGusinGisin = () => {
  let result = {}
  if(useShgj.gukgisin!==undefined){
    result=useShgj.gukgisin
  }
  else {
    result = useShgj.gusingisin
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
