var no = {};
const chunGan = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
const ryeongFunction = require('../../ryeong/ryeong');
const ryeongWord = require('../../../manseUtil/ryeong/ryeongWord');
const gil = require('../../gungShgj/gil');
const hung = require('../../gungShgj/hung');
const sssg = require('../../yuksin/getSangSengSangGuk');
const yuksinFunc = require('../../yuksin/getYukSin');
const umYangFunc = require('../../umYangOHang/umYang');
const oHangFunc = require('../../umYangOHang/oHang');

Object.freeze(chunGan);

// 단어가 실제로 있는지 없는지 확인하는것
no.heuisin = function () {
  let result;
  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.heuisin(ryeongWord.hisinCheck(useRyeong.yongsin), chunGan[i]);
    if (temp.exist === 'y') {
      result = chunGan[i];
      break;
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.junghwa = function () {
  let result;
  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.junghwa(ryeongWord.junghwaCheck(useRyeong.yongsin), chunGan[i]);
    if (temp.exist === 'y') {
      result = chunGan[i];
      break;
    }
  }
  return result;
};
// 단어가 실제로 있는지 없는지 확인하는것
no.junghwa_gisin = function () {
  let result;

  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.junghwa_gisin(ryeongWord.junghwaGisinCheck(useRyeong.yongsin), chunGan[i]);
    if (temp.exist === 'y') {
      result = chunGan[i];
      break;
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.jisok = function () {
  let result;
  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.jisok(ryeongWord.jisokCheck(useRyeong.yongsin), chunGan[i]);
    if (temp.exist === 'y') {
      result = chunGan[i];
      break;
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.jisok_gisin = function () {
  let result;

  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.jisok_gisin(ryeongWord.jisok_gisinCheck(useRyeong.yongsin), chunGan[i]);
    if (temp.exist === 'y') {
      result = chunGan[i];
      break;
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.hwakjang = function () {
  let result;
  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.hwakjang(ryeongWord.hwakjangCheck(useRyeong.yongsin), chunGan[i]);
    if (temp.exist === 'y') {
      result = chunGan[i];
      break;
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.hwakjang_gisin = function () {
  let result;
  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.hwakjang_gisin(ryeongWord.hwakjang_gisinCheck(useRyeong.yongsin), chunGan[i]);
    if (temp.exist === 'y') {
      result = chunGan[i];
      break;
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.um_heuisin_gisin = function () {
  let result;

  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.um_heuisin_gisin(ryeongWord.um_heuisin_gisinCheck(useRyeong.yongsin), chunGan[i]);
    if (temp.exist === 'y') {
      result = chunGan[i];
      break;
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.geuk_heuisin_gisin = function () {
  let result;

  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.geuk_heuisin_gisin(ryeongWord.geuk_heuisin_gisinCheck(useRyeong.yongsin), chunGan[i]);
    if (temp.exist === 'y') {
      result = chunGan[i];
      break;
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.um_gisin = function () {
  let result;
  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.um_gisin(ryeongWord.um_gisinCheck(useRyeong.yongsin), chunGan[i]);
    if (temp.exist === 'y') {
      result = chunGan[i];
      break;
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.geuk_gisin = function () {
  let result;
  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.geuk_gisin(ryeongWord.geuk_gisinCheck(useRyeong.yongsin), chunGan[i]);
    if (temp.exist === 'y') {
      result = chunGan[i];
      break;
    }
  }
  return result;
};

module.exports = no;
