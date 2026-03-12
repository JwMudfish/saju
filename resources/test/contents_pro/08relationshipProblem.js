var Sangsin = {};
const keyword = require('../../testResult/contents_pro_report/08relationshipProblem/relationshipProblem.json');
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
    type:'관계문제없음',
    keyword:''
  };
  if(manseTool.checkChunGan(useShgj.sangsingisin)==='Y'){
    result.type='승패집착'
    if(manseTool.checkALL(useShgj.sangsin)==='N'){
      // 상신X, 천간의 상신기신
      result.keyword=getResult('winlose1',keyword).contents
    }
    else {
      // 상신O, 천간의 상신기신
      result.keyword=getResult('winlose2',keyword).contents
    }
  }
  else if(manseTool.checkChunGan(gyeokGusinGisin())==='Y'){
    result.type='구설수'
    if(manseTool.checkALL(useShgj.sangsin)==='Y'){
      // 상신O, 천간의 격(구신)기신
      result.keyword=getResult('rumor1',keyword).contents
    }
    else {
      // 상신X, 천간의 격(구신)기신
      result.keyword=getResult('rumor2',keyword).contents
    }
  }
  else {
    // 해당없음
    result.type='관계문제없음'
    result.keyword=getResult('goodRelation',keyword).contents
  }
  return result;
};

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
