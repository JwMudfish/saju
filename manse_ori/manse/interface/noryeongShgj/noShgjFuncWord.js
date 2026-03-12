var no = {};
const chunGan = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
const ryeongFunction = require('../../ryeong/ryeong');
const gungShgjFunction = require('../../gungShgj/gungshgj');
const gil = require('../../gungShgj/gil');
const hung = require('../../gungShgj/hung');
const sssg = require('../../yuksin/getSangSengSangGuk');
const yuksinFunc = require('../../yuksin/getYukSin');
const umYangFunc = require('../../umYangOHang/umYang');
const oHangFunc = require('../../umYangOHang/oHang');

Object.freeze(chunGan);

// 단어가 실제로 있는지 없는지 확인하는것
no.sangsin = function (gukgubun) {
  let result;
  if (gukgubun === '길격') {
    for (let i = 0; i < chunGan.length; i++) {
      let temp;
      //상극 육신 글자를 다 뽑아주는 함수
      let syw = getSanggukYuksin(chunGan[i]);
      temp = gil.sangsin('  ', syw.sangguk, syw.word, syw.yuksin);
      if (temp.exist === 'Y') {
        result = syw.word;
        break;
      }
    }
  } else {
    for (let i = 0; i < chunGan.length; i++) {
      let temp;
      //상극 육신 글자를 다 뽑아주는 함수
      let syw = getSanggukYuksin(chunGan[i]);
      temp = hung.sangsin('  ', syw.sangguk, syw.word, syw.yuksin);
      if (temp.exist === 'Y') {
        result = syw.word;
        break;
      }
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.sangsingisin = function (gukgubun) {
  let result;

  if (gukgubun === '길격') {
    for (let i = 0; i < chunGan.length; i++) {
      let temp;
      //상극 육신 글자를 다 뽑아주는 함수
      let syw = getSanggukYuksin(chunGan[i]);
      temp = gil.sangsingisin('  ', syw.sangguk, syw.word, syw.yuksin);
      if (temp.exist === 'Y') {
        result = syw.word;
        break;
      }
    }
  } else {
    for (let i = 0; i < chunGan.length; i++) {
      let temp;
      //상극 육신 글자를 다 뽑아주는 함수
      let syw = getSanggukYuksin(chunGan[i]);
      temp = hung.sangsingisin('  ', syw.sangguk, syw.word, syw.yuksin);
      if (temp.exist === 'Y') {
        result = syw.word;
        break;
      }
    }
  }
  return result;
};
// 단어가 실제로 있는지 없는지 확인하는것
no.gusin = function (gukgubun) {
  let result;

  if (gukgubun === '길격') {
    for (let i = 0; i < chunGan.length; i++) {
      let temp;
      //상극 육신 글자를 다 뽑아주는 함수
      let syw = getSanggukYuksin(chunGan[i]);
      temp = gil.gusin('  ', syw.sangguk, syw.word, syw.yuksin);
      if (temp.exist === 'Y') {
        result = syw.word;
        break;
      }
    }
  } else {
    for (let i = 0; i < chunGan.length; i++) {
      let temp;
      //상극 육신 글자를 다 뽑아주는 함수
      let syw = getSanggukYuksin(chunGan[i]);
      temp = hung.gusin('  ', syw.sangguk, syw.word, syw.yuksin);
      if (temp.exist === 'Y') {
        result = syw.word;
        break;
      }
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.gukgisinGusingisin = function (gukgubun) {
  let result;

  if (gukgubun === '길격') {
    for (let i = 0; i < chunGan.length; i++) {
      let temp;
      //상극 육신 글자를 다 뽑아주는 함수
      let syw = getSanggukYuksin(chunGan[i]);
      temp = gil.gukgisin('  ', syw.sangguk, syw.word, syw.yuksin);
      if (temp.exist === 'Y') {
        result = syw.word;
        break;
      }
    }
  } else {
    for (let i = 0; i < chunGan.length; i++) {
      let temp;
      //상극 육신 글자를 다 뽑아주는 함수
      let syw = getSanggukYuksin(chunGan[i]);
      temp = hung.gusingisin('  ', syw.sangguk, syw.word, syw.yuksin);
      if (temp.exist === 'Y') {
        result = syw.word;
        break;
      }
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.sanghwa = function (gukgubun) {
  let result;

  if (gukgubun === '길격') {
    for (let i = 0; i < chunGan.length; i++) {
      let temp;
      //상극 육신 글자를 다 뽑아주는 함수
      let syw = getSanggukYuksin(chunGan[i]);
      temp = gil.sanghwa('  ', syw.sangguk, syw.word, syw.yuksin);
      if (temp.exist === 'Y') {
        result = syw.word;
        break;
      }
    }
  } else {
    for (let i = 0; i < chunGan.length; i++) {
      let temp;
      //상극 육신 글자를 다 뽑아주는 함수
      let syw = getSanggukYuksin(chunGan[i]);
      temp = hung.sanghwa('  ', syw.word, syw.yuksin);
      if (temp.exist === 'Y') {
        result = syw.word;
        break;
      }
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.sulhwa = function (gukgubun) {
  let result;

  if (gukgubun === '길격') {
    for (let i = 0; i < chunGan.length; i++) {
      let temp;
      //상극 육신 글자를 다 뽑아주는 함수
      let syw = getSanggukYuksin(chunGan[i]);
      temp = gil.sulhwa('  ', syw.sangguk, syw.word, syw.yuksin);
      if (temp.exist === 'Y') {
        result = syw.word;
        break;
      }
    }
  } else {
    for (let i = 0; i < chunGan.length; i++) {
      let temp;
      //상극 육신 글자를 다 뽑아주는 함수
      let syw = getSanggukYuksin(chunGan[i]);
      temp = hung.sulhwa('  ', syw.word, syw.yuksin);
      if (temp.exist === 'Y') {
        result = syw.word;
        break;
      }
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.sang_jae = function (gukgubun) {
  let result;

  if (gukgubun === '길격') {
    for (let i = 0; i < chunGan.length; i++) {
      let temp;
      //상극 육신 글자를 다 뽑아주는 함수
      let syw = getSanggukYuksin(chunGan[i]);
      temp = gil.sang_jae('  ', syw.sangguk, syw.word, syw.yuksin);
      if (temp.exist === 'Y') {
        result = syw.word;
        break;
      }
    }
  } else {
    for (let i = 0; i < chunGan.length; i++) {
      let temp;
      //상극 육신 글자를 다 뽑아주는 함수
      let syw = getSanggukYuksin(chunGan[i]);
      temp = hung.sang_jae('  ', syw.sangguk, syw.word, syw.yuksin);
      if (temp.exist === 'Y') {
        result = syw.word;
        break;
      }
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.sul_jae = function (gukgubun) {
  let result;

  if (gukgubun === '길격') {
    for (let i = 0; i < chunGan.length; i++) {
      let temp;
      //상극 육신 글자를 다 뽑아주는 함수
      let syw = getSanggukYuksin(chunGan[i]);
      temp = gil.sul_jae('  ', syw.sangguk, syw.word, syw.yuksin);
      if (temp.exist === 'Y') {
        result = syw.word;
        break;
      }
    }
  } else {
    for (let i = 0; i < chunGan.length; i++) {
      let temp;
      //상극 육신 글자를 다 뽑아주는 함수
      let syw = getSanggukYuksin(chunGan[i]);
      temp = hung.sul_jae('  ', syw.sangguk, syw.word, syw.yuksin);
      if (temp.exist === 'Y') {
        result = syw.word;
        break;
      }
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.sang_hap = function (gukgubun) {
  let result;

  if (gukgubun === '길격') {
    for (let i = 0; i < chunGan.length; i++) {
      let temp;
      //상극 육신 글자를 다 뽑아주는 함수
      let syw = getSanggukYuksin(chunGan[i]);
      temp = gil.sang_hap('  ', syw.sangguk, syw.word, syw.yuksin);
      if (temp.exist === 'Y') {
        result = syw.word;
        break;
      }
    }
  } else {
    for (let i = 0; i < chunGan.length; i++) {
      let temp;
      //상극 육신 글자를 다 뽑아주는 함수
      let syw = getSanggukYuksin(chunGan[i]);
      temp = hung.sang_hap('  ', syw.yuksin, syw.word);
      if (temp.exist === 'Y') {
        result = syw.word;
        break;
      }
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.sul_hap = function (gukgubun) {
  let result;

  if (gukgubun === '길격') {
    for (let i = 0; i < chunGan.length; i++) {
      let temp;
      //상극 육신 글자를 다 뽑아주는 함수
      let syw = getSanggukYuksin(chunGan[i]);
      temp = gil.sul_hap('  ', syw.sangguk, syw.word, syw.yuksin);
      if (temp.exist === 'Y') {
        result = syw.word;
        break;
      }
    }
  } else {
    for (let i = 0; i < chunGan.length; i++) {
      let temp;
      //상극 육신 글자를 다 뽑아주는 함수
      let syw = getSanggukYuksin(chunGan[i]);
      temp = hung.sul_hap('  ', syw.yuksin, syw.word);
      if (temp.exist === 'Y') {
        result = syw.word;
        break;
      }
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.sengHwa_zeHwa = function (gukgubun) {
  let result;

  if (gukgubun === '길격') {
    for (let i = 0; i < chunGan.length; i++) {
      let temp;
      //상극 육신 글자를 다 뽑아주는 함수
      let syw = getSanggukYuksin(chunGan[i]);
      temp = gil.sengHwa_zeHwa('  ', syw.sangguk, syw.word, syw.yuksin);
      if (temp.exist === 'Y') {
        result = syw.word;
        break;
      }
    }
  } else {
    for (let i = 0; i < chunGan.length; i++) {
      let temp;
      //상극 육신 글자를 다 뽑아주는 함수
      let syw = getSanggukYuksin(chunGan[i]);
      temp = hung.sengHwa_zeHwa('  ', syw.sangguk, syw.word, syw.yuksin);
      if (temp.exist === 'Y') {
        result = syw.word;
        break;
      }
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.sulHwa_zeHwa = function (gukgubun) {
  let result;

  if (gukgubun === '길격') {
    for (let i = 0; i < chunGan.length; i++) {
      let temp;
      //상극 육신 글자를 다 뽑아주는 함수
      let syw = getSanggukYuksin(chunGan[i]);
      temp = gil.sulHwa_zeHwa('  ', syw.sangguk, syw.word, syw.yuksin);
      if (temp.exist === 'Y') {
        result = syw.word;
        break;
      }
    }
  } else {
    for (let i = 0; i < chunGan.length; i++) {
      let temp;
      //상극 육신 글자를 다 뽑아주는 함수
      let syw = getSanggukYuksin(chunGan[i]);
      temp = hung.sulHwa_zeHwa('  ', syw.yuksin, syw.word);
      if (temp.exist === 'Y') {
        result = syw.word;
        break;
      }
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.sengHwa_hapHwa = function (gukgubun) {
  let result;

  if (gukgubun === '길격') {
    for (let i = 0; i < chunGan.length; i++) {
      let temp;
      //상극 육신 글자를 다 뽑아주는 함수
      let syw = getSanggukYuksin(chunGan[i]);
      temp = gil.sengHwa_hapHwa('  ', syw.sangguk, syw.word, syw.yuksin);
      if (temp.exist === 'Y') {
        result = syw.word;
        break;
      }
    }
  } else {
    for (let i = 0; i < chunGan.length; i++) {
      let temp;
      //상극 육신 글자를 다 뽑아주는 함수
      let syw = getSanggukYuksin(chunGan[i]);
      temp = hung.sengHwa_hapHwa('  ', syw.sangguk, syw.word, syw.yuksin);
      if (temp.exist === 'Y') {
        result = syw.word;
        break;
      }
    }
  }
  return result;
};

// 단어가 실제로 있는지 없는지 확인하는것
no.sulHwa_hapHwa = function (gukgubun) {
  let result;

  if (gukgubun === '길격') {
    for (let i = 0; i < chunGan.length; i++) {
      let temp;
      //상극 육신 글자를 다 뽑아주는 함수
      let syw = getSanggukYuksin(chunGan[i]);
      temp = gil.sulHwa_hapHwa('  ', syw.sangguk, syw.word, syw.yuksin);
      if (temp.exist === 'Y') {
        result = syw.word;
        break;
      }
    }
  } else {
    for (let i = 0; i < chunGan.length; i++) {
      let temp;
      //상극 육신 글자를 다 뽑아주는 함수
      let syw = getSanggukYuksin(chunGan[i]);
      temp = hung.sulHwa_hapHwa('  ', syw.sangguk, syw.word, syw.yuksin);
      if (temp.exist === 'Y') {
        result = syw.word;
        break;
      }
    }
  }
  return result;
};

function word(obj) {
  let result = '';
  let word = [
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
  let name = [
    'y_sky',
    'm_sky',
    'd_sky',
    'h_sky',
    'y_jangan1',
    'y_jangan2',
    'y_jangan3',
    'm_jangan1',
    'm_jangan2',
    'm_jangan3',
    'd_jangan1',
    'd_jangan2',
    'd_jangan3',
    'h_jangan1',
    'h_jangan2',
    'h_jangan3',
  ];
  for (let i = 0; i < name.length; i++) {
    if (name[i].includes(obj.position[0]) === true) {
      result = word[i];
      return result;
    }
  }
}
function getSanggukYuksin(word) {
  let result = {
    word: '',
    sangguk: '',
    yuksin: '',
  };
  let umYangOHang = {
    umYang: umYangFunc.umYang(word, 1),
    oHang: oHangFunc.oHang(word),
  };

  let yuksin = yuksinFunc.yuksin(
    sssg.sssg(useUmYangOHang.d_sky.oHang, umYangOHang.oHang),
    umYangOHang.umYang
  );

  let sangguk = gungShgjFunction.sangguk(yuksin);
  result.yuksin = yuksin;
  result.sangguk = sangguk;
  result.word = word;
  return result;
}

module.exports = no;
