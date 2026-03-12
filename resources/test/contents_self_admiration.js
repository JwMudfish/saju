var self_admiration = {};
var title = 'self_admiration_';
let options;
var totalTitle;
var title;
const resultTest = require('../testResult/contents_self_admiration.json');
self_admiration.randum = function () {
  self();
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
const self = () => {
  if (checkGun() === 'pure_root') {
    if (
      checkMonChungan(
        usePillar.m_land,
        usePillar.d_sky,
        usePillar.h_sky,
        usePillar.m_sky,
        usePillar.y_sky
      )
    ) {
      console.log('허세란 마약..');
      totalTitle = title + 2;
    } else {
      console.log('나란멋짐');
      totalTitle = title + 1;
    }
  } else if (searchBiGup(useYuksin.h_sky, useYuksin.m_sky, useYuksin.y_sky)) {
    console.log('화려한 조명이 나를 감싸네');
    totalTitle = title + 3;
  } else if (
    checkGun() === 'king_root' &&
    checkChungan(
      useYuksin.h_sky,
      useYuksin.m_sky,
      useYuksin.y_sky,
      '식신',
      '정관'
    )
  ) {
    console.log('나없이는 밥도 못먹지?');
    totalTitle = title + 5;
  } else if (
    checkGun() === 'king_root' &&
    checkChungan(
      useYuksin.h_sky,
      useYuksin.m_sky,
      useYuksin.y_sky,
      '상관',
      '편관'
    )
  ) {
    console.log('나없었으면 어쩔뻔했냐');
    totalTitle = title + 6;
  } else if (
    checkYongsinChungan(
      useRyeong.yongsin,
      usePillar.d_sky,
      usePillar.m_sky,
      usePillar.y_sky,
      usePillar.h_sky,
      '을',
      '신'
    )
  ) {
    console.log('내가 다함');
    totalTitle = title + 7;
  } else if (
    checkYongsinChungan(
      useRyeong.yongsin,
      usePillar.d_sky,
      usePillar.m_sky,
      usePillar.y_sky,
      usePillar.h_sky,
      '갑',
      '경'
    )
  ) {
    console.log('다 내덕이야');
    totalTitle = title + 8;
  } else if (
    checkilganChungan(
      usePillar.d_sky,
      usePillar.m_sky,
      usePillar.y_sky,
      usePillar.h_sky
    )
  ) {
    console.log('나같은사람 또 없어');
    totalTitle = title + 9;
  } else {
    console.log('자뻑이 뭐지,먹는건가?');
    totalTitle = title + 10;
  }
};
const checkMonChungan = (mon, chungan1, chungan2, chungan3, chungan4) => {
  let matchMonChungan = false;
  let array = [chungan1, chungan2, chungan3, chungan4];
  let i;
  for (i = 0; i < array.length; i++) {
    if (mon === '진' && array[i] === '을') {
      matchMonChungan = true;
      break;
    } else if (mon === '술' && array[i] === '신') {
      matchMonChungan = true;
      break;
    } else if (mon === '축' && array[i] === '계') {
      matchMonChungan = true;
      break;
    } else if (mon === '미' && array[i] === '정') {
      matchMonChungan = true;
      break;
    }
  }
  return matchMonChungan;
};

const searchBiGup = (god1, god2, god3) => {
  let findBiGup = false;
  let array = [god1, god2, god3];
  for (i = 0; i < array.length; i++) {
    if (array[i] === '비견') {
      findBiGup = true;
      break;
    } else if (array[i] === '겁재') {
      findBiGup = true;
      break;
    }
  }
  return findBiGup;
};

const checkChungan = (god1, god2, god3, checkGod1, checkGod2) => {
  let chunganCount = 0;
  let chunganTrueFalse = false;
  let array = [god1, god2, god3];
  for (i = 0; i < array.length; i++) {
    if (array[i] === checkGod1) {
      chunganCount++;
    } else if (array[i] === checkGod2) {
      chunganCount++;
    }
  }
  if (chunganCount === 2) {
    chunganTrueFalse = true;
  }
  return chunganTrueFalse;
};

const checkYongsinChungan = (
  yongsin,
  chungan1,
  chungan2,
  chungan3,
  chungan4,
  checkChun1,
  checkChun2
) => {
  let chunganTrueFalse = false;
  let count = 0;
  let array = [chungan1, chungan2, chungan3, chungan4];
  if (
    yongsin === '갑' ||
    yongsin === '을' ||
    yongsin === '병' ||
    yongsin === '정'
  ) {
    for (i = 0; i < array.length; i++) {
      if (array[i] === checkChun1) {
        count++;
      } else if (array[i] === '병') {
        count++;
      }
    }
  } else if (
    yongsin === '경' ||
    yongsin === '신' ||
    yongsin === '임' ||
    yongsin === '계'
  ) {
    for (i = 0; i < array.length; i++) {
      if (array[i] === checkChun2) {
        count++;
      } else if (array[i] === '임') {
        count++;
      }
    }
  }
  if (count === 2) {
    chunganTrueFalse = true;
  }

  return chunganTrueFalse;
};

const checkilganChungan = (ilgan1, chungan1, chungan2, chungan3) => {
  let chunganTrueFalse = false;
  let array = [chungan1, chungan2, chungan3];
  if ((ilgan1 = '갑')) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === '기') {
        chunganTrueFalse = true;
        break;
      }
    }
  } else if ((ilgan1 = '기')) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === '갑') {
        chunganTrueFalse = true;
        break;
      }
    }
  } else if ((ilgan1 = '을')) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === '경') {
        chunganTrueFalse = true;
        break;
      }
    }
  } else if ((ilgan1 = '경')) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === '을') {
        chunganTrueFalse = true;
        break;
      }
    }
  } else if ((ilgan1 = '병')) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === '신') {
        chunganTrueFalse = true;
        break;
      }
    }
  } else if ((ilgan1 = '신')) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === '병') {
        chunganTrueFalse = true;
        break;
      }
    }
  } else if ((ilgan1 = '정')) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === '임') {
        chunganTrueFalse = true;
        break;
      }
    }
  } else if ((ilgan1 = '임')) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === '정') {
        chunganTrueFalse = true;
        break;
      }
    }
  } else if ((ilgan1 = '무')) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === '계') {
        chunganTrueFalse = true;
        break;
      }
    }
  } else if ((ilgan1 = '계')) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === '무') {
        chunganTrueFalse = true;
        break;
      }
    }
  }

  return chunganTrueFalse;
};

module.exports = self_admiration;
