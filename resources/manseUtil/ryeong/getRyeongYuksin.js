var no = {};
const chunGan = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
const ryeongWord = require('./ryeongWord');
const ryeongFunction = require('../../manse/ryeong/ryeong');
const sssg = require('../../manse/yuksin/getSangSengSangGuk');
const yuksinFunc = require('../../manse/yuksin/getYukSin');
const umYangFunc = require('../../manse/umYangOHang/umYang');
const oHangFunc = require('../../manse/umYangOHang/oHang');

Object.freeze(chunGan);

// 단어가 실제로 있는지 없는지 확인하는것
no.heuisin = function (yongsin) {
  let result;

  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.heuisin(ryeongWord.hisinCheck(yongsin), chunGan[i]);
    if (temp.exist === 'y') {
      result = getSanggukYuksin(chunGan[i]);
      break;
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.junghwa = function (yongsin) {
  let result;
  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.junghwa(ryeongWord.junghwaCheck(yongsin), chunGan[i]);
    if (temp.exist === 'y') {
      result = getSanggukYuksin(chunGan[i]);
      break;
    }
  }
  return result;
};
// 단어가 실제로 있는지 없는지 확인하는것
no.junghwa_gisin = function (yongsin) {
  let result;

  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.junghwa_gisin(ryeongWord.junghwaGisinCheck(yongsin), chunGan[i]);
    if (temp.exist === 'y') {
      result = getSanggukYuksin(chunGan[i]);
      break;
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.jisok = function (yongsin) {
  let result;
  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.jisok(ryeongWord.jisokCheck(yongsin), chunGan[i]);
    if (temp.exist === 'y') {
      result = getSanggukYuksin(chunGan[i]);
      break;
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.jisok_gisin = function (yongsin) {
  let result;

  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.jisok_gisin(ryeongWord.jisok_gisinCheck(yongsin), chunGan[i]);
    if (temp.exist === 'y') {
      result = getSanggukYuksin(chunGan[i]);
      break;
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.hwakjang = function (yongsin) {
  let result;
  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.hwakjang(ryeongWord.hwakjangCheck(yongsin), chunGan[i]);
    if (temp.exist === 'y') {
      result = getSanggukYuksin(chunGan[i]);
      break;
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.hwakjang_gisin = function (yongsin) {
  let result;
  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.hwakjang_gisin(ryeongWord.hwakjang_gisinCheck(yongsin), chunGan[i]);
    if (temp.exist === 'y') {
      result = getSanggukYuksin(chunGan[i]);
      break;
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.um_heuisin_gisin = function (yongsin) {
  let result;

  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.um_heuisin_gisin(ryeongWord.um_heuisin_gisinCheck(yongsin), chunGan[i]);

    if (temp.exist === 'y') {
      result = getSanggukYuksin(chunGan[i]);
      break;
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.geuk_heuisin_gisin = function (yongsin) {
  let result;

  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.geuk_heuisin_gisin(ryeongWord.geuk_heuisin_gisinCheck(yongsin), chunGan[i]);
    if (temp.exist === 'y') {
      result = getSanggukYuksin(chunGan[i]);
      break;
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.um_gisin = function (yongsin) {
  let result;
  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.um_gisin(ryeongWord.um_gisinCheck(yongsin), chunGan[i]);
    if (temp.exist === 'y') {
      result = getSanggukYuksin(chunGan[i]);
      break;
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.geuk_gisin = function (yongsin) {
  let result;
  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.geuk_gisin(ryeongWord.geuk_gisinCheck(yongsin), chunGan[i]);
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
