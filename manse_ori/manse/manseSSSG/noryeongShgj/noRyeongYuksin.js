var no = {};
const chunGan = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
const ryeongFunction = require('../../ryeong/ryeong');
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
    let temp = ryeongFunction.heuisin(useRyeong.yongsin, chunGan[i]);
    if (temp.exist === 'y') {
      result = getSanggukYuksin(chunGan[i]);
      break;
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.junghwa = function () {
  let result;
  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.junghwa(useRyeong.yongsin, chunGan[i]);
    if (temp.exist === 'y') {
      result = getSanggukYuksin(chunGan[i]);
      break;
    }
  }
  return result;
};
// 단어가 실제로 있는지 없는지 확인하는것
no.junghwa_gisin = function () {
  let result;

  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.junghwa_gisin(useRyeong.yongsin, chunGan[i]);
    if (temp.exist === 'y') {
      result = getSanggukYuksin(chunGan[i]);
      break;
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.jisok = function () {
  let result;
  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.jisok(useRyeong.yongsin, chunGan[i]);
    if (temp.exist === 'y') {
      result = getSanggukYuksin(chunGan[i]);
      break;
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.jisok_gisin = function () {
  let result;

  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.jisok_gisin(useRyeong.yongsin, chunGan[i]);
    if (temp.exist === 'y') {
      result = getSanggukYuksin(chunGan[i]);
      break;
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.hwakjang = function () {
  let result;
  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.hwakjang(useRyeong.yongsin, chunGan[i]);
    if (temp.exist === 'y') {
      result = getSanggukYuksin(chunGan[i]);
      break;
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.hwakjang_gisin = function () {
  let result;
  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.hwakjang_gisin(useRyeong.yongsin, chunGan[i]);
    if (temp.exist === 'y') {
      result = getSanggukYuksin(chunGan[i]);
      break;
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.um_heuisin_gisin = function () {
  let result;

  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.um_heuisin_gisin(useRyeong.yongsin, chunGan[i]);

    if (temp.exist === 'y') {
      result = getSanggukYuksin(chunGan[i]);
      break;
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.geuk_heuisin_gisin = function () {
  let result;

  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.geuk_heuisin_gisin(useRyeong.yongsin, chunGan[i]);
    if (temp.exist === 'y') {
      result = getSanggukYuksin(chunGan[i]);
      break;
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.um_gisin = function () {
  let result;
  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.um_gisin(useRyeong.yongsin, chunGan[i]);
    if (temp.exist === 'y') {
      result = getSanggukYuksin(chunGan[i]);
      break;
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.geuk_gisin = function () {
  let result;
  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.geuk_gisin(useRyeong.yongsin, chunGan[i]);
    if (temp.exist === 'y') {
      result = getSanggukYuksin(chunGan[i]);
      break;
    }
  }
  return result;
};
function getSanggukYuksin(word) {
  let result = '';
  let umYangOHang = {
    umYang: umYangFunc.umYang(word, 1),
    oHang: oHangFunc.oHang(word),
  };

  let yuksin = yuksinFunc.yuksin(
    sssg.sssg(useUmYangOHang.d_sky.oHang, umYangOHang.oHang),
    umYangOHang.umYang
  );
  result = yuksin;
  return result;
}
module.exports = no;
