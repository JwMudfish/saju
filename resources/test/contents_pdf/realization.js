var joonghwa = {};

var title = 'joonghwa_';
var totalTitle;
const resultTest = require('../../testResult/contents_joonghwa.json');
const realization = require('../../testResult/content_pdf/contents_realization.json');
const basicUse = require('../../manseUtil/basicUse/basicUse')
const manseTool = require('../../manseUtil/chunJiji/checkWord')
const ryeongUtil = require('../../manseUtil/ryeong/ryeongUtil')
joonghwa.randum = function () {
  self();
  let result = getResult(totalTitle,resultTest);
  result.use = checkUse(useRyeong.junghwa.use, useRyeong.junghwa_gisin.use);
  result.exist = checkExist(
    useRyeong.junghwa.exist,
    useRyeong.junghwa_gisin.exist
  );
  let func = checkAll(
    useRyeong.junghwa,
    useRyeong.junghwa_gisin
  );
   result.contentsTitle = func.title
   result.total=func.total
   result.keyword= func.keyword
  return result;
};

const self = () => {
  if (useRyeong.junghwa.exist === 'Y' && jungHwaCheckUseable() === 'possible') {
    if (
      useRyeong.yongsin === '계' ||
      useRyeong.yongsin === '갑' ||
      useRyeong.yongsin === '정' ||
      useRyeong.yongsin === '경'
    ) {
      totalTitle = title + 1;
    } else {
      totalTitle = title + 2;
    }
  } else if (
    useRyeong.junghwa_gisin.exist === 'Y' &&
    jungHwaGisinCheckUseable() === 'possible'
  ) {
    if (
      useRyeong.yongsin === '계' ||
      useRyeong.yongsin === '갑' ||
      useRyeong.yongsin === '정' ||
      useRyeong.yongsin === '경'
    ) {
      totalTitle = title + 3;
    } else {
      totalTitle = title + 4;
    }
  } else {
    totalTitle = title + 5;
  }
};

function checkUse(junghwa, junghwa_gisin) {
  let result = {
    junghwa: 'N',
    junghwa_gisin: 'N',
  };
  if (junghwa.includes('Y') || junghwa.includes('y')) {
    result.junghwa = 'Y';
  }
  if (junghwa_gisin.includes('Y') || junghwa_gisin.includes('y')) {
    result.junghwa_gisin = 'Y';
  }
  return result;
}

function checkAll(junghwa, junghwa_gisin) {
  let result = {
    title:[],
    total:'',
    keyword:''
  }
  const ryeong = ryeongUtil.ryeongCollection()
if(basicUse.getBasicUse()==='basic'){

    if(manseTool.checkPossible(ryeong.junghwa)==='Y' &&manseTool.checkPossible(ryeong.junghwa_gisin)==='Y'){
      result.title.push('현장경험')
      result.title.push('자기개발')
      result.total=getResult('basic_both',realization).contents;
      result.keyword=getResult('basic_both_keyword',realization).contents;
    }
    else     if(manseTool.checkPossible(ryeong.junghwa)==='N' &&manseTool.checkPossible(ryeong.junghwa_gisin)==='N'){
      result.title.push('현장경험')
      result.title.push('자기개발')
      result.total=getResult('basic_no',realization).contents;
      result.keyword=getResult('basic_no_keyword',realization).contents;
    }
    else {
      if (junghwa.exist.includes('Y')&&junghwa.use.includes('y')) {
        result.title.push('자기개발')
        result.total=getResult('basic_junghwa',realization).contents;
        result.keyword=getResult('basic_junghwa_keyword',realization).contents;
      }
      if (junghwa_gisin.exist.includes('Y')&& junghwa_gisin.use.includes('y')) {
        result.title.push('현장경험')
        result.total=getResult('basic_junghwa_gisin',realization).contents;
        result.keyword=getResult('basic_junghwa_gisin_keyword',realization).contents;
      }
    }
   
  }
  else {
    if(manseTool.checkPossible(ryeong.junghwa)==='Y' &&manseTool.checkPossible(ryeong.junghwa_gisin)==='Y'){
      result.title.push('환경변화')
      result.title.push('자기중심')
      result.total=getResult('uses_both',realization).contents;
      result.keyword=getResult('uses_both_keyword',realization).contents;
    }
    else    if(manseTool.checkPossible(ryeong.junghwa)==='N' &&manseTool.checkPossible(ryeong.junghwa_gisin)==='N'){
      result.title.push('환경변화')
      result.title.push('자기중심')
      result.total=getResult('uses_no',realization).contents;
      result.keyword=getResult('uses_no_keyword',realization).contents;
    }
    else {
      if (junghwa.exist.includes('Y')&&junghwa.use.includes('y')) {
        result.title.push('자기중심')
        result.total=getResult('uses_junghwa',realization).contents;
        result.keyword=getResult('uses_junghwa_keyword',realization).contents;

      }
      if (junghwa_gisin.exist.includes('Y')&&  junghwa_gisin.use.includes('y')) {
        result.title.push('환경변화')
        result.total=getResult('uses_junghwa_gisin',realization).contents;
        result.keyword=getResult('uses_junghwa_gisin_keyword',realization).contents;
      }
    }

  }
  return result;
}
function checkExist(junghwa, junghwa_gisin) {
  let result = {
    junghwa: 'N',
    junghwa_gisin: 'N',
  };
  if (junghwa.includes('Y') && junghwa.includes('y')) {
    result.junghwa = 'Y';
  }
  if (junghwa_gisin.includes('Y') && junghwa_gisin.includes('y')) {
    result.junghwa_gisin = 'Y';
  }
  return result;
}
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
//중화 사용가능성 체크
function jungHwaCheckUseable() {
  let result;
  let use = useRyeong.junghwa.use;
  for (let i = 0; i < use.length; i++) {
    if (use[i] === 'Y' || use[i] === 'y') {
      result = 'possible';
      break;
    } else {
      result = 'impossible';
    }
  }
  return result;
}

//중화기신 사용가능성 체크
function jungHwaGisinCheckUseable() {
  let result;
  let use = useRyeong.junghwa_gisin.use;
  for (let i = 0; i < use.length; i++) {
    if (use[i] === 'Y' || use[i] === 'y') {
      result = 'possible';
      break;
    } else {
      result = 'impossible';
    }
  }
  return result;
}
module.exports = joonghwa;
