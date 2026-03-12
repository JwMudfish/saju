var Landlord = {};
var title = 'Landlord_';
var num;
var totalTitle;
// num = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
let options;

const resultTest = require('../testResult/contents_Landlord.json');
Landlord.randum = function (test) {
  self(test);
  return getResult(totalTitle);
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
const hapChug = require('../manse/hapChug/hapChug');
const self = (test) => {
  if (pillarMonthCheck(usePillar.m_land) === true) {
    if (
      matchingThungan(
        usePillar.y_sky,
        usePillar.m_sky,
        usePillar.d_sky,
        usePillar.h_sky,
        usejijanggan.y_jangan.y_jangan3,
        usejijanggan.m_jangan.m_jangan3,
        usejijanggan.d_jangan.d_jangan3,
        usejijanggan.h_jangan.h_jangan3,
        '무',
        '계',
        '갑'
      )
    ) {
      console.log('내건물에는 똑같은사람들이 바글바글');
      totalTitle = title + 8;
    } else if (
      matchingThungan(
        usePillar.y_sky,
        usePillar.m_sky,
        usePillar.d_sky,
        usePillar.h_sky,
        usejijanggan.y_jangan.y_jangan3,
        usejijanggan.m_jangan.m_jangan3,
        usejijanggan.d_jangan.d_jangan3,
        usejijanggan.h_jangan.h_jangan3,
        '무',
        '정',
        '경'
      )
    ) {
      console.log('자는 거 빼고 다 가능해');
      totalTitle = title + 7;
    } else if (
      matchingGod10(
        useYuksin.y_sky,
        useYuksin.m_sky,
        useYuksin.h_sky,
        useYuksin.y_jangan.y_jangan3,
        useYuksin.m_jangan.m_jangan3,
        useYuksin.d_jangan.d_jangan3,
        useYuksin.h_jangan.h_jangan3,
        '식신',
        '편인',
        '편재'
      ) ||
      matchingGod10(
        useYuksin.y_sky,
        useYuksin.m_sky,
        useYuksin.h_sky,
        useYuksin.y_jangan.y_jangan3,
        useYuksin.m_jangan.m_jangan3,
        useYuksin.d_jangan.d_jangan3,
        useYuksin.h_jangan.h_jangan3,
        '상관',
        '정인',
        '정재'
      )
    ) {
      console.log('땅따먹기 놀이해볼까');
      totalTitle = title + 4;
    } else if (
      matchingGod10(
        useYuksin.y_sky,
        useYuksin.m_sky,
        useYuksin.h_sky,
        useYuksin.y_jangan.y_jangan3,
        useYuksin.m_jangan.m_jangan3,
        useYuksin.d_jangan.d_jangan3,
        useYuksin.h_jangan.h_jangan3,
        '정관',
        '정인',
        '상관'
      ) ||
      matchingGod10(
        useYuksin.y_sky,
        useYuksin.m_sky,
        useYuksin.h_sky,
        useYuksin.y_jangan.y_jangan3,
        useYuksin.m_jangan.m_jangan3,
        useYuksin.d_jangan.d_jangan3,
        useYuksin.h_jangan.h_jangan3,
        '편관',
        '편인',
        '식신'
      )
    ) {
      console.log('너는 계획이 다 있구나.');
      totalTitle = title + 6;
    } else {
      console.log('ㄴr는 ㄱr끔 건물주를 꿈꾼ㄷr..☆');
      totalTitle = title + 9;
    }
  } else {
    if (searchBanghap(usePillar.y_land, usePillar.d_land, usePillar.h_land)) {
      console.log('이번 생은 이미 늦었어');
      totalTitle = title + 3;
    } else if (
      /* searchSamhap(
        test.SAMHAP.SAMHAP_YEAR_LAND,
        test.SAMHAP.SAMHAP_DAY_LAND,
        test.SAMHAP.SAMHAP_HOUR_LAND
      ) */
      hapChug.samhap(
        usePillar.y_land,
        usePillar.d_land,
        usePillar.h_land,
        usePillar.m_land,
        'y'
      ) !== '' &&
      hapChug.samhap(
        usePillar.d_land,
        usePillar.y_land,
        usePillar.h_land,
        usePillar.m_land,
        'd'
      ) !== '' &&
      hapChug.samhap(
        usePillar.h_land,
        usePillar.d_land,
        usePillar.y_land,
        usePillar.m_land,
        'h'
      ) !== ''
    ) {
      console.log('그 돈으로 주식 살래');
      totalTitle = title + 2;
    } else {
      console.log('건물주 그거 피곤하지 않아?');
      totalTitle = title + 5;
    }
  }
};
const pillarMonthCheck = (month) => {
  let checkLand;
  if (month == '진' || month == '술' || month == '축' || month == '미') {
    checkLand = true;
  } else {
    checkLand = false;
  }

  return checkLand;
};

const searchBanghap = (gigiYear, gigiDay, gigiHour) => {
  let checkBanghap;
  let tree = 0;
  let fire = 0;
  let rock = 0;
  let water = 0;
  let checkArray = [gigiYear, gigiDay, gigiHour];
  for (let i = 0; i < 3; i++) {
    if (
      checkArray[i] == '인' ||
      checkArray[i] == '묘' ||
      checkArray[i] == '진'
    ) {
      tree++;
    } else if (
      checkArray[i] == '사' ||
      checkArray[i] == '오' ||
      checkArray[i] == '미'
    ) {
      fire++;
    } else if (
      checkArray[i] == '신' ||
      checkArray[i] == '유' ||
      checkArray[i] == '술'
    ) {
      rock++;
    } else if (
      checkArray[i] == '해' ||
      checkArray[i] == '자' ||
      checkArray[i] == '축'
    ) {
      water++;
    }
  }

  if (tree == 2 || fire == 2 || rock == 2 || water == 2) {
    checkBanghap = true;
  } else {
    checkBanghap = false;
  }
  return checkBanghap;
};

const searchSamhap = (gigiYear, gigiDay, gigiHour) => {
  let checkSamhap;

  if (gigiYear == '' && gigiDay == '' && gigiHour == '') {
    checkSamhap = false;
  } else {
    checkSamhap = true;
  }

  return checkSamhap;
};

const matchingThungan = (
  thunganYear,
  thunganMon,
  thunganDay,
  thunganHour,
  gigangganYear,
  gigangganMon,
  gigangganDay,
  gigangganHour,
  thungan1,
  thungan2,
  thungan3
) => {
  let checkMatchingThungan;
  let yumWater = false;
  let yangTree = false;
  let yangLand = false;
  let checkArray = [
    thunganYear,
    thunganMon,
    thunganDay,
    thunganHour,
    gigangganYear,
    gigangganMon,
    gigangganDay,
    gigangganHour,
  ];
  for (let i = 0; i < 8; i++) {
    if (checkArray[i] == thungan1) {
      yangLand = true;
    } else if (checkArray[i] == thungan2) {
      yumWater = true;
    } else if (checkArray[i] == thungan3) {
      yangTree = true;
    }
  }

  if (yangLand && yumWater && yangTree) {
    checkMatchingThungan = true;
  } else {
    checkMatchingThungan = false;
  }

  return checkMatchingThungan;
};

const matchingGod10 = (
  thunganYear,
  thunganMon,
  thunganHour,
  gigangganYear,
  gigangganMon,
  gigangganDay,
  gigangganHour,
  god1,
  god2,
  god3
) => {
  let checkMatchingGod10;
  let yumWater = false;
  let yangTree = false;
  let yangLand = false;
  let checkArray = [
    thunganYear,
    thunganMon,
    thunganHour,
    gigangganYear,
    gigangganMon,
    gigangganDay,
    gigangganHour,
  ];
  for (let i = 0; i < 7; i++) {
    if (checkArray[i] == god1) {
      yangLand = true;
    } else if (checkArray[i] == god2) {
      yumWater = true;
    } else if (checkArray[i] == god3) {
      yangTree = true;
    }
  }

  if (yangLand && yumWater && yangTree) {
    checkMatchingGod10 = true;
  } else {
    checkMatchingGod10 = false;
  }

  return checkMatchingGod10;
};

module.exports = Landlord;
