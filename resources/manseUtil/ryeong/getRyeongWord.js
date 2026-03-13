var no = {};
const chunGan = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
const ryeongFunction = require('../../manse/ryeong/ryeong');
const ryeongWord = require('./ryeongWord');

Object.freeze(chunGan);

/**
 * Ryeong 글자 콜렉션
 * @returns 
 */
no.ryeongWordCollection = () => {
  let result = {
    yongsin:useRyeong.yongsin,
    heuisin : ryeongWord.hisinCheck(useRyeong.yongsin),
    junghwa : ryeongWord.junghwaCheck(useRyeong.yongsin),
    junghwa_gisin : ryeongWord.junghwaGisinCheck(useRyeong.yongsin),
    jisok : ryeongWord.jisokCheck(useRyeong.yongsin),
    jisok_gisin : ryeongWord.jisok_gisinCheck(useRyeong.yongsin),
    hwakjang : ryeongWord.hwakjangCheck(useRyeong.yongsin),
    hwakjang_gisin : ryeongWord.hwakjang_gisinCheck(useRyeong.yongsin),
    um_heuisin_gisin : ryeongWord.um_heuisin_gisinCheck(useRyeong.yongsin),
    geuk_heuisin_gisin : ryeongWord.geuk_heuisin_gisinCheck(useRyeong.yongsin),
    um_gisin: ryeongWord.um_gisinCheck(useRyeong.yongsin),
    geuk_gisin: ryeongWord.geuk_gisinCheck(useRyeong.yongsin)
  }

  return result;
}

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
