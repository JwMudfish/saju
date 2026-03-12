var Sangsin = {};

const keyword = require('../../testResult/contents_pro_report/11groundlessConfidence/groundlessConfidence.json');
const checkTogan = require('../../manseUtil/togan/togan')
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
  if(checkTogan.yongsinTogan()==='Y'){
    result.type='능력과신'
    result.keyword=getResult('yongsinTogan',keyword).contents
  }
  else   if(checkTogan.gyoukTogan()==='Y'){
    result.type='자신만만'
    result.keyword=getResult('gyoukTogan',keyword).contents
  }
  else   if(checkTogan.gyoukTogan()==='Y'){
    result.type='하면하지'
    result.keyword=getResult('wolTogan',keyword).contents
  }
  else {
    result.type='해당없음'
    result.keyword=getResult('no',keyword).contents
  }
  return result;
};

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
