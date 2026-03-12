var joonghwa = {};
const realization = require('../../testResult/contents_pro_report/14.realization/realization.json');
const basicUse = require('../../manseUtil/basicUse/basicUse')
const manseTool = require('../../manseUtil/chunJiji/checkWord')
const ryeongUtil = require('../../manseUtil/ryeong/ryeongUtil')
joonghwa.randum = function () {
  let result = self()
  return result;
};

const self = () => {
  let result = {
    percent:'',
    keyword:'',
    title:[],
    titleContents:[]
  }
  const ryeong = ryeongUtil.ryeongCollection()
  if(basicUse.getBasicUse()==='basic'){
    if(manseTool.checkPossible(ryeong.junghwa)==='Y' &&manseTool.checkPossible(ryeong.junghwa_gisin)==='Y'){
      result.percent=getResult('basic_both',realization).percent
      result.keyword=getResult('basic_both',realization).contents
      result.title.push(getResult('experience',realization).subtitle)
      result.titleContents.push(getResult('experience',realization).contents)
      result.title.push(getResult('selfDevelopment',realization).subtitle)
      result.titleContents.push(getResult('selfDevelopment',realization).contents)
    }
    else  if(manseTool.checkPossible(ryeong.junghwa)==='Y'){
      result.percent=getResult('basic_junghwa',realization).percent
      result.keyword=getResult('basic_junghwa',realization).contents
      result.title.push(getResult('selfDevelopment',realization).subtitle)
      result.titleContents.push(getResult('selfDevelopment',realization).contents)
    }
    else  if(manseTool.checkPossible(ryeong.junghwa_gisin)==='Y'){
      result.percent=getResult('basic_junghwa_gisin',realization).percent
      result.keyword=getResult('basic_junghwa_gisin',realization).contents
      result.title.push(getResult('experience',realization).subtitle)
      result.titleContents.push(getResult('experience',realization).contents)
    }
    else {
      result.percent=getResult('basic_no',realization).percent
      result.keyword=getResult('basic_no',realization).contents
      result.title.push(getResult('experience',realization).subtitle)
      result.titleContents.push(getResult('experience',realization).contents)
      result.title.push(getResult('selfDevelopment',realization).subtitle)
      result.titleContents.push(getResult('selfDevelopment',realization).contents)
    }
  }
  else {
    if(manseTool.checkPossible(ryeong.junghwa)==='Y' &&manseTool.checkPossible(ryeong.junghwa_gisin)==='Y'){
      result.percent=getResult('uses_both',realization).percent
      result.keyword=getResult('uses_both',realization).contents
      result.title.push(getResult('change',realization).subtitle)
      result.titleContents.push(getResult('change',realization).contents)
      result.title.push(getResult('myLove',realization).subtitle)
      result.titleContents.push(getResult('myLove',realization).contents)
    }
    else  if(manseTool.checkPossible(ryeong.junghwa)==='Y'){
      result.percent=getResult('uses_junghwa',realization).percent
      result.keyword=getResult('uses_junghwa',realization).contents
      result.title.push(getResult('myLove',realization).subtitle)
      result.titleContents.push(getResult('myLove',realization).contents)
    }
    else  if(manseTool.checkPossible(ryeong.junghwa_gisin)==='Y'){
      result.percent=getResult('uses_junghwa_gisin',realization).percent
      result.keyword=getResult('uses_junghwa_gisin',realization).contents
      result.title.push(getResult('change',realization).subtitle)
      result.titleContents.push(getResult('change',realization).contents)
    }
    else {
      result.percent=getResult('uses_no',realization).percent
      result.keyword=getResult('uses_no',realization).contents
      result.title.push(getResult('change',realization).subtitle)
      result.titleContents.push(getResult('change',realization).contents)
      result.title.push(getResult('myLove',realization).subtitle)
      result.titleContents.push(getResult('myLove',realization).contents)
    }
  }

  return result;
};
function getResult(title,contents) {
  let result;
  for (let i = 0; i < contents.contentsList.length; i++) {
    if (title === contents.contentsList[i].title) {
      result = contents.contentsList[i];
      break;
    }
  }
  return result;
}
module.exports = joonghwa;
