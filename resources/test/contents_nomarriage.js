var Sangsin = {};

var title = 'nomarriage_';
var num;
var totalTitle;
const resultTest = require('../testResult/contents_nomarriage.json');
let options;
Sangsin.randum = function () {
  self();
  return getResult(totalTitle);
};
const self = () => {
  if (
    checkPillar('계') === true &&
    checkPillar('병') === true &&
    checkPillar('갑') === false &&
    checkPillar('을') === false
  ) {
    totalTitle = title + 1;
  } else if (
    checkPillar('정') === true &&
    checkPillar('임') === true &&
    checkPillar('경') === false &&
    checkPillar('신') === false
  ) {
    totalTitle = title + 2;
  } else if (
    (checkYuksin('정인') === true || checkYuksin('편인') === true) &&
    checkYuksin('식신') === false &&
    checkYuksin('상관') === false
  ) {
    totalTitle = title + 3;
  } else if (
    checkOHang('수') === false &&
    checkOHang('화') === false &&
    checkOHang('목') === true &&
    checkOHang('금') === true
  ) {
    totalTitle = title + 4;
  } else if (
    checkYuksin('편관') === true &&
    checkYuksin('편재') === true &&
    checkGun() === 'mu_root'
  ) {
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
//근체크
function checkGun() {
  let result = 'mu_root';
  if (useBasicFunc.rootTong.totalRoot === 'king_root') {
    result = 'king_root'
  }
  else if (useBasicFunc.rootTong.totalRoot === 'pure_root') {
    result = 'pure_root'
  }
  return result;
}

//오행체크
function checkOHang(chkohang) {
  let result = false;
  let ohang = [
    useUmYangOHang.y_sky.ohang,
    useUmYangOHang.m_sky.ohang,
    useUmYangOHang.d_sky.ohang,
    useUmYangOHang.h_sky.ohang,
  ];

  for (let i = 0; i < ohang.length; i++) {
    if (chkohang === ohang[i]) {
      result = true;
    }
  }
  return result;
}

//육신체크
function checkYuksin(chkYuksin) {
  let result = false;
  let pillar = [
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
  for (let i = 0; i < pillar.length; i++) {
    if (String(pillar[i]).trim() !== '') {
      if (
        jjangproperty[i] === 'm_yu_sihwa_young' ||
        jjangproperty[i] === 'm_yu_sihwa' ||
        jjangproperty[i] === 'yu_sihwa_young' ||
        String(jjangproperty[i]).trim() === '' ||
        jjangproperty[i] === undefined
      ) {
        if (chkYuksin === pillar[i]) {
          result = true;
        }
      }
    }
  }
  return result;
}

//천간지장간 체크
function checkPillar(chkpillar) {
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
    if (String(pillar[i]).trim() !== '') {
      if (
        jjangproperty[i] === 'm_yu_sihwa_young' ||
        jjangproperty[i] === 'm_yu_sihwa' ||
        jjangproperty[i] === 'yu_sihwa_young' ||
        String(jjangproperty[i]).trim() === '' ||
        jjangproperty[i] === undefined
      ) {
        if (chkpillar === pillar[i]) {
          result = true;
        }
      }
    }
  }
  return result;
}

module.exports = Sangsin;
