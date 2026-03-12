var gusin = {};

var title = 'old_young_';
var num;
var totalTitle;
const resultTest = require('../testResult/contents_old_young.json');
gusin.randum = function () {
  self();

  return getResult(totalTitle);
};
const self = () => {
  if (countYuksin('정재', '편재') >= 3) {
    totalTitle = title + 1;
  } else if (countYuksin('편관', '편관') >= 3) {
    totalTitle = title + 2;
  } else if (
    checkPillar('무', '계') === true ||
    checkPillar('기', '병') === true
  ) {
    totalTitle = title + 3;
  } else if (
    checkPillar('기', '임') === true ||
    checkPillar('무', '정') === true
  ) {
    totalTitle = title + 3;
  } else if (countYuksin('정인', '편인') >= 3) {
    totalTitle = title + 4;
  } else if (countYuksin('식신', '상관') >= 3) {
    totalTitle = title + 5;
  } else {
    totalTitle = title + 6;
  }
};
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
function checkPillar(pillar1, pillar2) {
  let result = false;

  let pillar = [
    usePillar.y_sky,
    usePillar.m_sky,
    usePillar.d_sky,
    usePillar.h_sky,
    usejijanggan.y_jangan.y_jangan1,
    usejijanggan.y_jangan.y_jangan2,
    usejijanggan.y_jangan.y_jangan3,
    usejijanggan.m_jangan.m_jangan1,
    usejijanggan.m_jangan.m_jangan2,
    usejijanggan.m_jangan.m_jangan3,
    usejijanggan.d_jangan.d_jangan1,
    usejijanggan.d_jangan.d_jangan2,
    usejijanggan.d_jangan.d_jangan3,
    usejijanggan.h_jangan.h_jangan1,
    usejijanggan.h_jangan.h_jangan2,
    usejijanggan.h_jangan.h_jangan3,
  ];
  let jjangproperty = [
    ' ',
    ' ',
    ' ',
    ' ',
    usejijangganUse.yong.y_land.y_jangan1,
    usejijangganUse.yong.y_land.y_jangan2,
    ' ',
    usejijangganUse.yong.m_land.m_jangan1,
    usejijangganUse.yong.m_land.m_jangan2,
    ' ',
    usejijangganUse.yong.d_land.d_jangan1,
    usejijangganUse.yong.d_land.d_jangan2,
    ' ',
    usejijangganUse.yong.h_land.h_jangan1,
    usejijangganUse.yong.h_land.h_jangan2,
    ' ',
  ];

  for (let i = 0; i < pillar.length; i++) {
    if (
      jjangproperty[i] === 'm_yu_sihwa_young' ||
      jjangproperty[i] === 'm_yu_sihwa' ||
      jjangproperty[i] === 'yu_sihwa_young' ||
      String(jjangproperty[i]).trim() === '' ||
      jjangproperty[i] === undefined
    ) {
      if (pillar1 === pillar[i] || pillar2 === pillar[i]) {
        result = true;
      }
    }
  }

  return result;
}

function countYuksin(yuksin1, yuksin2) {
  let result = 0;

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
  let jjangproperty = [
    ' ',
    ' ',
    ' ',
    ' ',
    usejijangganUse.yong.y_land.y_jangan1,
    usejijangganUse.yong.y_land.y_jangan2,
    ' ',
    usejijangganUse.yong.m_land.m_jangan1,
    usejijangganUse.yong.m_land.m_jangan2,
    ' ',
    usejijangganUse.yong.d_land.d_jangan1,
    usejijangganUse.yong.d_land.d_jangan2,
    ' ',
    usejijangganUse.yong.h_land.h_jangan1,
    usejijangganUse.yong.h_land.h_jangan2,
    ' ',
  ];

  for (let i = 0; i < yuksin.length; i++) {
    if (yuksin[i] === '비견' || yuksin[i] === '겁재') {
    } else if (
      jjangproperty[i] === 'm_yu_sihwa_young' ||
      jjangproperty[i] === 'm_yu_sihwa' ||
      jjangproperty[i] === 'yu_sihwa_young' ||
      String(jjangproperty[i]).trim() === '' ||
      jjangproperty[i] === undefined
    ) {
      if (yuksin1 === yuksin[i] || yuksin2 === yuksin[i]) {
        result = result + 1;
      }
    } else {
    }
  }

  return result;
}

module.exports = gusin;
