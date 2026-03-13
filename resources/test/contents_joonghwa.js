var joonghwa = {};

var title = 'joonghwa_';
var totalTitle;
const resultTest = require('../testResult/contents_joonghwa.json');
const basicUse = require('../manseUtil/basicUse/basicUse')
joonghwa.randum = function () {
  self();
  let result = getResult(totalTitle);
  result.use = checkUse(useRyeong.junghwa.use, useRyeong.junghwa_gisin.use);
  result.exist = checkExist(
    useRyeong.junghwa.exist,
    useRyeong.junghwa_gisin.exist
  );
   result.contentsTitle = checkTitle(
    useRyeong.junghwa,
    useRyeong.junghwa_gisin
  );
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

function checkTitle(junghwa, junghwa_gisin) {
  let result = []
if(basicUse.getBasicUse()==='basic'){

    if((junghwa.exist.includes('Y')&& junghwa.use.includes('y'))===false&&(junghwa_gisin.exist.includes('Y') && junghwa_gisin.use.includes('y'))===false){
      result.push('현장경험')
      result.push('자기개발')
    }
    else {
      if (junghwa.exist.includes('Y')&&junghwa.use.includes('y')) {
        result.push('자기개발')
      }
      if (junghwa_gisin.exist.includes('Y')&& junghwa_gisin.use.includes('y')) {
        result.push('현장경험')
      }
    }
   
  }
  else {
    if((junghwa.exist.includes('Y') &&junghwa.use.includes('y'))===false&&(junghwa_gisin.exist.includes('Y')&&  junghwa_gisin.use.includes('y'))===false){
      result.push('환경변화')
      result.push('자기중심')
    }
    else {
      if (junghwa.exist.includes('Y')&&junghwa.use.includes('y')) {
        result.push('자기중심')
      }
      if (junghwa_gisin.exist.includes('Y')&&  junghwa_gisin.use.includes('y')) {
        result.push('환경변화')
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
function getResult(title) {
  let result;
  for (let i = 0; i < resultTest.contentsList.length; i++) {
    if (title === resultTest.contentsList[i].title) {
      result = resultTest.contentsList[i];
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
