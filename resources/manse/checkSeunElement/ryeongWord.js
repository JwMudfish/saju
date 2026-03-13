var no = {};
const chunGan = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
const ryeongFunction = require('../ryeong/ryeong');
const ryeongWord = require('../../manseUtil/ryeong/ryeongWord');
Object.freeze(chunGan);

// 단어가 실제로 있는지 없는지 확인하는것
no.heuisin = function () {
  let result;
  for (let i = 0; i < chunGan.length; i++) {
    let temp = ryeongFunction.heuisin(chunGan[i], ryeongWord.hisinCheck(useRyeong.yongsin,));
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
    let temp = ryeongFunction.junghwa(chunGan[i], ryeongWord.junghwaCheck(useRyeong.yongsin,));
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
    let temp = ryeongFunction.junghwa_gisin(
      chunGan[i], ryeongWord.junghwaGisinCheck(useRyeong.yongsin,));
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
    let temp = ryeongFunction.jisok(chunGan[i],
      ryeongWord.jisokCheck(useRyeong.yongsin,));
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
    let temp = ryeongFunction.jisok_gisin(chunGan[i],
      ryeongWord.jisok_gisinCheck(useRyeong.yongsin,));
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
    let temp = ryeongFunction.hwakjang(chunGan[i],
      ryeongWord.hwakjangCheck(useRyeong.yongsin,));
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
    let temp = ryeongFunction.hwakjang_gisin(chunGan[i],
      ryeongWord.hwakjang_gisinCheck(useRyeong.yongsin,));
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
    let temp = ryeongFunction.um_heuisin_gisin(chunGan[i],
      ryeongWord.um_heuisin_gisinCheck(useRyeong.yongsin,));
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
    let temp = ryeongFunction.geuk_heuisin_gisin(chunGan[i],
      ryeongWord.geuk_heuisin_gisinCheck(useRyeong.yongsin,));
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
    let temp = ryeongFunction.um_gisin(chunGan[i],
      ryeongWord.um_gisinCheck(useRyeong.yongsin,));
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
    let temp = ryeongFunction.geuk_gisin(chunGan[i],
      ryeongWord.geuk_gisinCheck(useRyeong.yongsin,));
    if (temp.exist === 'y') {
      result = chunGan[i];
      break;
    }
  }
  return result;
};

module.exports = no;
