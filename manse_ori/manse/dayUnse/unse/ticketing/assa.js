var unse = {};
let assa = require('../../../../dayUnseResult/ticketing.json');
//당첨운
unse.assa = function () {
  let result = getResult('도전하지마');
  if (manper() === true && result.title === '도전하지마') {
    result = getResult('10000% 기운이 온다');
  }
  if (fifty() === true && result.title === '도전하지마') {
    result = getResult('50% 성공');
  }
  if (snaiper() === true && result.title === '도전하지마') {
    result = getResult('취소표');
  }
  if (parachute() === true && result.title === '도전하지마') {
    result = getResult('인맥');
  }
  return result;
};
//1. 10000% 기운이 온다 (당첨운)
function manper() {
  let result = false;

  if (getPossobleYuksin('상관') && getPossobleYuksin('편관')) {
    if (todayChunGan('편관') || todayChunGan('상관')) {
      result = true;
    }
  } else if (getPossobleYuksin('식신') && getPossobleYuksin('정관')) {
    if (todayChunGan('식신') || todayChunGan('정관')) {
      result = true;
    }
  }
  return result;
}

//2. 50%의 기운
function fifty() {
  let result = false;

  if (getPossobleYuksin('상관')) {
    if (todayChunGan('편관')) {
      result = true;
    }
  } else if (getPossobleYuksin('편관')) {
    if (todayChunGan('상관')) {
      result = true;
    }
  } else if (getPossobleYuksin('식신')) {
    if (todayChunGan('정관')) {
      result = true;
    }
  } else if (getPossobleYuksin('정관')) {
    if (todayChunGan('식신')) {
      result = true;
    }
  }

  return result;
}

//3. 빈자리를 노린다. (취소표)
function snaiper() {
  let result = false;

  if (getPossobleYuksin('정재') && getPossobleYuksin('정인')) {
    if (todayChunGan('정재') || todayChunGan('정인')) {
      result = true;
    }
  } else if (getPossobleYuksin('편재') && getPossobleYuksin('편인')) {
    if (todayChunGan('편재') || todayChunGan('편인')) {
      result = true;
    }
  }
  return result;
}

//4.인맥(낙하산)
function parachute() {
  let result = false;

  if (useGyouk === '양인격') {
    if (todayChunGan('편관')) {
      result = true;
    }
  } else if (chunGan('겁재')) {
    if (todayChunGan('편관')) {
      result = true;
    }
  } else if (useGyouk === '편관격') {
    if (todayChunGan('겁재')) {
      result = true;
    }
  } else if (chunGan('편관')) {
    if (todayChunGan('겁재')) {
      result = true;
    }
  }
  return result;
}

function getPossobleYuksin(yuksinCheck) {
  let yuksin = [
    useYuksin.y_sky,
    useYuksin.m_sky,
    useYuksin.d_sky,
    useYuksin.h_sky,
    useYuksin.y_jangan.y_jangan1,
    useYuksin.y_jangan.y_jangan2,
    useYuksin.y_jangan.y_jangan3,
    useYuksin.m_jangan.m_jangan1,
    useYuksin.m_jangan.m_jangan2,
    useYuksin.m_jangan.m_jangan3,
    useYuksin.d_jangan.d_jangan1,
    useYuksin.d_jangan.d_jangan2,
    useYuksin.d_jangan.d_jangan3,
    useYuksin.h_jangan.h_jangan1,
    useYuksin.h_jangan.h_jangan2,
    useYuksin.h_jangan.h_jangan3,
  ];

  let use = [
    '  ',
    '  ',
    '  ',
    '  ',
    usejijangganUse.yong.y_land.y_jangan1,
    usejijangganUse.yong.y_land.y_jangan2,
    usejijangganUse.yong.y_land.y_jangan3,
    usejijangganUse.yong.m_land.m_jangan1,
    usejijangganUse.yong.m_land.m_jangan2,
    usejijangganUse.yong.m_land.m_jangan3,
    usejijangganUse.yong.d_land.d_jangan1,
    usejijangganUse.yong.d_land.d_jangan2,
    usejijangganUse.yong.d_land.d_jangan3,
    usejijangganUse.yong.h_land.h_jangan1,
    usejijangganUse.yong.h_land.h_jangan2,
    usejijangganUse.yong.h_land.h_jangan3,
  ];

  let result = false;
  for (let i = 0; i < yuksin.length; i++) {
    if (String(use[i]).trim() === '' || String(use).includes('young')) {
      if (yuksinCheck === yuksin[i]) {
        result = true;
      }
    }
  }
  return result;
}

function todayChunGan(yuksin1) {
  let result = false;

  let yuksin = [
    useTodayYuksin.y_sky,
    useTodayYuksin.m_sky,
    useTodayYuksin.d_sky,
    useTodayYuksin.h_sky,
  ];

  for (let i = 0; i < yuksin.length; i++) {
    if (yuksin[i] === yuksin1) {
      result = true;
      break;
    }
  }
  return result;
}

function chunGan(yuksin1) {
  let result = false;

  let yuksin = [
    useYuksin.y_sky,
    useYuksin.m_sky,
    useYuksin.d_sky,
    useYuksin.h_sky,
  ];

  for (let i = 0; i < yuksin.length; i++) {
    if (yuksin[i] === yuksin) {
      result = true;
      break;
    }
  }
  return result;
}

function getResult(word) {
  let result;
  for (let i = 0; i < assa.data.length; i++) {
    if (assa.data[i].title === word) {
      result = assa.data[i];
      break;
    }
  }
  return result;
}

module.exports = unse;
