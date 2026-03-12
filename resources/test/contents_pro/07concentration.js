var Sangsin = {};
const keyword = require('../../testResult/contents_pro_report/07concentration/concentration.json');
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
    type:'분산',
    keyword:''
  };
  if(countHisinGisin()===2 && manseTool.checkALL(useRyeong.heuisin)==='Y' ){
    result.type='멀티태스킹'
    result.keyword=getResult('Multi-tasking1',keyword).contents
  }
  else if(countHisinGisin()===1 && manseTool.checkALL(useRyeong.heuisin)==='N' ){
    result.type='멀티태스킹'
    result.keyword=getResult('Multi-tasking2',keyword).contents
  }
  else if(countHisinGisin()<=1 && manseTool.checkALL(useRyeong.heuisin)==='Y' ){
    result.type='집중력'
    result.keyword=getResult('concentraiton1',keyword).contents
  }
  else if(countHisinGisin()===0 && manseTool.checkALL(useRyeong.heuisin)==='N' ){
    result.type='분산'
    result.keyword=getResult('noconcentration1',keyword).contents
  }
  else {
    result.type='분산'
    result.keyword=getResult('noconcentration2',keyword).contents
  }
  return result;
};

const countHisinGisin = () => {
  let result=0;

  if(manseTool.checkChunGan(useRyeong.um_heuisin_gisin)==='Y') {
    result=result+1
  }
  if(manseTool.checkChunGan(useRyeong.geuk_heuisin_gisin)==='Y') {
    result=result+1
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
