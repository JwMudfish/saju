var latte_is_horse = {};
var title = 'latte_is_horse_';
var num;
var totalTitle;
let options;
const resultTest = require('../testResult/contents_latte_is_horse.json');
latte_is_horse.randum = function (test) {
  self(test);
  return getResult(totalTitle);
};

const self = (test) => {
  if (
    checkGun() === 'mu_root' &&
    almighty(
      useYuksin.h_sky,
      useYuksin.m_sky,
      useYuksin.y_sky,
      useYuksin.d_jangan.d_jangan3,
      useYuksin.h_jangan.h_jangan3,
      useYuksin.m_jangan.m_jangan3,
      useYuksin.y_jangan.y_jangan3
    )
  ) {
    console.log('전지전능형');
    totalTitle = title + 1;
  } else if (
    (checkGun() === 'pure_root' || checkGun() === 'king_root') &&
    armband(
      useYuksin.h_sky,
      useYuksin.m_sky,
      useYuksin.y_sky,
      useYuksin.d_jangan.d_jangan3,
      useYuksin.h_jangan.h_jangan3,
      useYuksin.m_jangan.m_jangan3,
      useYuksin.y_jangan.y_jangan3
    )
  ) {
    console.log('상명하복 완장형');
    totalTitle = title + 2;
  } else if (
    answerSelect(
      useYuksin.h_sky,
      useYuksin.m_sky,
      useYuksin.y_sky,
      useYuksin.d_jangan.d_jangan3,
      useYuksin.h_jangan.h_jangan3,
      useYuksin.m_jangan.m_jangan3,
      useYuksin.y_jangan.y_jangan3
    )
  ) {
    console.log('답정너');
    totalTitle = title + 3;
  } else if (realGonde(useYuksin.h_sky, useYuksin.m_sky, useYuksin.y_sky)) {
    console.log('ㄹㅇ꼰대');
    totalTitle = title + 4;
  } else {
    console.log('false');
    totalTitle = title + 5;
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
const almighty = (god1, god2, god3, god4, god5, god6, god7) => {
  let array = [god1, god2, god3, god4, god5, god6, god7];
  let count1 = 0;
  let count2 = 0;
  let count3 = 0;
  let count4 = 0;
  let result1;
  let result2;
  let almighty = false;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === '정재') {
      count1++;
    } else if (array[i] === '정관') {
      count2++;
    } else if (array[i] === '편재') {
      count3++;
    } else if (array[i] === '편관') {
      count4++;
    }
  }
  if (count1 === 0 || count2 === 0) {
    if (count1 === 0 && count2 === 0) {
      result1 = false;
    } else {
      result1 = true;
    }
  }
  if (count3 === 0 || count4 === 0) {
    if (count3 === 0 && count4 === 0) {
      result2 = false;
    } else {
      result2 = true;
    }
  }

  if (result1 === true && result2 === true) {
    almighty = true;
  }

  return almighty;
};

const armband = (god1, god2, god3, god4, god5, god6, god7) => {
  let array = [god1, god2, god3, god4, god5, god6, god7];
  let count1 = 0;
  let count2 = 0;
  let count3 = 0;
  let count4 = 0;
  let result1 = false;
  let result2 = false;
  let armband = false;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === '정재') {
      count1++;
    } else if (array[i] === '정관') {
      count2++;
    } else if (array[i] === '편재') {
      count3++;
    } else if (array[i] === '편관') {
      count4++;
    }
  }
  if (count1 !== 0 && count2 !== 0) {
    result1 = true;
  }
  if (count3 !== 0 && count4 !== 0) {
    result2 = true;
  }

  if (result1 === true || result2 === true) {
    armband = true;
  }

  return armband;
};

const answerSelect = (god1, god2, god3, god4, god5, god6, god7) => {
  let array = [god1, god2, god3, god4, god5, god6, god7];
  let count1 = 0;
  let count2 = 0;
  let count3 = 0;
  let count4 = 0;
  let result1 = false;
  let result2 = false;
  let answerSelect = false;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === '편인') {
      count1++;
    } else if (array[i] === '정인') {
      count2++;
    } else if (array[i] === '식신') {
      count3++;
    } else if (array[i] === '상관') {
      count4++;
    }
  }
  if (count1 + count2 >= 2) {
    result1 = true;
  }
  if (count3 + count4 <= 3) {
    result2 = true;
  }
  if (result1 === true && result2 === true) {
    answerSelect = true;
  }

  return answerSelect;
};

const realGonde = (god1, god2, god3) => {
  let array = [god1, god2, god3];
  let count1 = 0;
  let count2 = 0;
  let count3 = 0;
  let count4 = 0;
  let result1 = false;
  let result2 = false;
  let realGonde = false;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === '편인') {
      count1++;
    } else if (array[i] === '정인') {
      count2++;
    } else if (array[i] === '비견') {
      count3++;
    } else if (array[i] === '겁재') {
      count4++;
    }
  }
  if (count1 >= 1 || count2 >= 1) {
    result1 = true;
  }
  if (count3 >= 1 || count4 >= 1) {
    result2 = true;
  }
  if (result1 === true && result2 === true) {
    realGonde = true;
  }

  return realGonde;
};

module.exports = latte_is_horse;
