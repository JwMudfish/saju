var unse = {};

const resultTest = require('../../../../dayUnseResult/hapguk.json');
const todayJungHwaHisin = require('./todayHisinJungHwa');
const todayShgjFunc = require('./todaysengsul');
//합격공식
unse.hapguk = function () {
  let result = good();
  if (useRyeong.junghwa.exist === 'Y' && result.title === '해당사항없음') {
    result = license('Y');
  } else if (
    useRyeong.junghwa.exist === 'N' &&
    result.title === '해당사항없음'
  ) {
    result = license('N');
  }
  if (useRyeong.heuisin.exist === 'Y' && result.title === '해당사항없음') {
    result = study('Y');
  } else if (
    useRyeong.heuisin.exist === 'N' &&
    result.title === '해당사항없음'
  ) {
    result = study('N');
  }

  return result;
};

function good() {
  let result = getResult('해당사항없음');
  let todayShgj = todayShgjFunc.todayShgjFunc();
  if (todayShgj.sang_jae !== undefined && useShgj.sanghwa.exist === 'Y') {
    if (todayShgj.sang_jae !== undefined && todayShgj.sang_jae.exist === 'Y') {
      result = getResult('합격 축하');
    }
  } else if (useShgj.sulhwa !== undefined && useShgj.sulhwa.exist === 'Y') {
    if (todayShgj.sul_jae !== undefined && todayShgj.sul_jae.exist === 'Y') {
      result = getResult('합격 축하');
    }
  } else if (useShgj.sanghwa !== undefined && useShgj.sanghwa.exist === 'N') {
    if (todayShgj.sang_jae !== undefined && todayShgj.sang_jae.exist === 'Y') {
      result = getResult('아슬아슬 합격');
    }
  } else if (useShgj.sulhwa !== undefined && useShgj.sulhwa.exist === 'N') {
    if (todayShgj.sanghwa !== undefined && todayShgj.sul_jae.exist === 'Y') {
      result = getResult('아슬아슬 합격');
    }
  } else {
    result = getResult('해당사항없음');
  }
  return result;
}

function study(YN) {
  let result;

  if (
    useRyeong.yongsin === '임' ||
    useRyeong.yongsin === '계' ||
    useRyeong.yongsin === '신' ||
    useRyeong.yongsin === '갑'
  ) {
    if (returnPillarYN('갑')) {
      if (YN === 'Y') {
        result = getResult('연구, 대회수상');
      } else if (YN === 'N') {
        result = getResult('아슬아슬 연구, 대회수상');
      }
    } else if (todayJungHwaHisin.junghwaHeusin().heuisin.exist === 'Y') {
      result = getResult('노력해 볼만 한 연구, 대회수상');
    } else {
      result = getResult('해당사항없음');
    }
  } else if (
    useRyeong.yongsin === '병' ||
    useRyeong.yongsin === '을' ||
    useRyeong.yongsin === '정' ||
    useRyeong.yongsin === '경'
  ) {
    if (returnPillarYN('경')) {
      if (YN === 'Y') {
        result = getResult('연구, 대회수상');
      } else if (YN === 'N') {
        result = getResult('아슬아슬 연구, 대회수상');
      }
    } else if (todayJungHwaHisin.junghwaHeusin().heuisin.exist === 'Y') {
      result = getResult('노력해 볼만 한 연구, 대회수상');
    } else {
      result = getResult('해당사항없음');
    }
  }

  return result;
}

function license(YN) {
  let result;
  if (
    useRyeong.yongsin === '임' ||
    useRyeong.yongsin === '계' ||
    useRyeong.yongsin === '신' ||
    useRyeong.yongsin === '갑'
  ) {
    if (returnPillarYN('갑')) {
      if (YN === 'Y') {
        result = getResult('자격증 합격');
      } else if (YN === 'N') {
        result = getResult('아슬아슬 자격증 합격');
      }
    } else if (todayJungHwaHisin.junghwaHeusin().junghwa.exist === 'Y') {
      result = getResult('노력해 볼만 한 자격증 합격');
    } else {
      result = getResult('해당사항없음');
    }
  } else if (
    useRyeong.yongsin === '병' ||
    useRyeong.yongsin === '을' ||
    useRyeong.yongsin === '정' ||
    useRyeong.yongsin === '경'
  ) {
    if (returnPillarYN('경')) {
      if (YN === 'Y') {
        result = getResult('자격증 합격');
      } else if (YN === 'N') {
        result = getResult('아슬아슬 자격증 합격');
      }
    } else if (todayJungHwaHisin.junghwaHeusin().junghwa.exist === 'Y') {
      result = getResult('노력해 볼만 한 자격증 합격');
    } else {
      result = getResult('해당사항없음');
    }
  }

  return result;
}

function returnPillarYN(pillar) {
  let result = false;
  if (
    useTodayPillar.y_sky === pillar ||
    useTodayPillar.y_sky === pillar ||
    useTodayPillar.y_sky === pillar ||
    useTodayPillar.y_sky === pillar
  ) {
    result = true;
  }
  return result;
}

function getResult(word) {
  let result;
  for (let i = 0; i < resultTest.data.length; i++) {
    if (resultTest.data[i].title === word) {
      result = resultTest.data[i];
      break;
    }
  }
  return result;
}
//오늘팔자 생화극제 얻어오는거
//본인팔자 기준임

module.exports = unse;
