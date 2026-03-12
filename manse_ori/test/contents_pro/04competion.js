var Sangsin = {};
const level = require('../../testResult/contents_pro_report/04competition_will/competition_will_level.json');
const keyword = require('../../testResult/contents_pro_report/04competition_will/competition_will_keyword.json');
const manseTool = require('../../manseUtil/chunJiji/checkWord')

/**
 * level은 높음,보통,낮음을 의미하는거고
 * contents는 키워드를 의미하는것이다
 * @returns 
 */
Sangsin.randum = function () {
  let result = self();
  return result;
};

const self = () => {

  let contents = {
    level:'',
    will:''
  };
  let result = {
    level:'',
    contents: ''
  }
  // 상신기신이 있니?
  if(manseTool.checkALL(useShgj.sangsingisin)==='Y'){
    // 상신기신이 천간에 있니?
    if(manseTool.checkChunGan(useShgj.sangsingisin)==='Y'){
      // 상신이 천간에 있니?
      if(manseTool.checkChunGan(useShgj.sangsin)==='Y'){
        // 상신O, 천간의 상신기신
        result.level='높음'
        contents.level=getResult("high",level).contents
        contents.will=getResult("high1",keyword).contents
      }
      else {
        // 상신X, 천간의 상신기신
        result.level='높음'
        contents.level=getResult("high",level).contents
        contents.will=getResult("high3",keyword).contents
      }
    }
    else {
      // 상신이 천간에 있니?
      if(manseTool.checkChunGan(useShgj.sangsin)==='Y'){
        // 상신O, 천간의 상신기신
        result.level='높음'
        contents.level=getResult("high",level).contents
        contents.will=getResult("high2",keyword).contents
      }
      else {
        // 상신X, 천간의 상신기신
        result.level='보통'
        contents.level=getResult("middle",level).contents
        contents.will=getResult("middle2",keyword).contents
      }
    }
  }
  else {
    if(manseTool.checkChunGan(gyeokGusinGisin())==='Y') {
            // 상신기신X, 격(구신)기신O
            result.level='보통'
            contents.level=getResult("middle",level).contents
            contents.will=getResult("middle1",keyword).contents
    }
    else {
            // 상신기신X, 격(구신)기신X
            result.level='낮음'
            contents.level=getResult("low",level).contents
            contents.will=getResult("low1",keyword).contents
    }
  }
  result.contents=contents.level+'/ '+contents.will
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
