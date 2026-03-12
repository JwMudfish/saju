var ryeong = {};
var moment = require('moment');
const umYangFunc = require('../umYangOHang/umYang');
const oHangFunc = require('../umYangOHang/oHang');
const ryeongWord = require('../../manseUtil/ryeong/ryeongWord');
//령
ryeong.ryeong = function () {
  let result;
  const myBirth = moment(
    useDate.year +
    '-' +
    useDate.month +
    '-' +
    useDate.day +
    ' ' +
    useDate.hour +
    ':' +
    useDate.minute +
    ':00',
    'YYYY-MM-DD HH:mm:ss '
  );
  if (myBirth.diff(moment(useRealJulib.junggi), 'minutes') <= 0) {
    result = smallJunggi();
  } else {
    result = bigJunggi();
  }
  return result;
};

//희신
ryeong.heuisin = function (pillar, word, yuksin, use) {
  let result;
  result = checkRyeongElement(pillar, word, yuksin, use)
  return result;
};

/**
 * 령의 이요소의 글자가있는지 확인
 * @param {string} pillar 
 * @param {string} word 
 * @param {string} use 
 * @returns {Object} exist-> 존재여부 , word->글자 possible->사용가능/불가능
 */
function checkRyeongElement(pillar, word, yuksin, use) {
  let result;
  if (pillar === word) {
    if (
      String(use).includes('young') ||
      String(use).trim() === '' ||
      use === undefined
    ) {
      result = {
        exist: 'y',
        word: word,
        yuksin: yuksin,
        possible: 'y',
      };
    } else {
      result = {
        exist: 'y',
        word: word,
        yuksin: yuksin,
        possible: 'n',
      };
    }
  } else {
    result = {
      exist: 'n',
      word: word,
      yuksin: yuksin,
      possible: 'n',
    };
  }
  return result;
}

//중화
ryeong.junghwa = function (pillar, word, yuksin, use) {
  let result;
  result = checkRyeongElement(pillar, word, yuksin, use)
  return result;
};
//중화기신
ryeong.junghwa_gisin = function (pillar, word, yuksin, use) {
  let result;
  result = checkRyeongElement(pillar, word, yuksin, use)
  return result;
};
//지속
ryeong.jisok = function (pillar, word, yuksin, use) {
  let result;
  result = checkRyeongElement(pillar, word, yuksin, use)
  return result;
};
//지속기신
ryeong.jisok_gisin = function (pillar, word, yuksin, use) {
  let result;
  result = checkRyeongElement(pillar, word, yuksin, use)
  return result;
};
//확장
ryeong.hwakjang = function (pillar, word, yuksin, use) {
  let result;
  result = checkRyeongElement(pillar, word, yuksin, use)
  return result;
};
//확장기신
ryeong.hwakjang_gisin = function (pillar, word, yuksin, use) {
  let result;
  result = checkRyeongElement(pillar, word, yuksin, use)
  return result;
};

//UM_heuisin_gisin
ryeong.um_heuisin_gisin = function (pillar, word, yuksin, use, jiji, check) {
  let result;

  if (
    jiji !== undefined &&
    (jiji === '자' || jiji === '오' || jiji === '묘' || jiji === '유')
  ) {
    result = wang_um_hisin_gisin(word, pillar, check);
  } else {
    result = checkRyeongElement(pillar, word, yuksin, use)
  }
  return result;
};

function wang_um_hisin_gisin(word, pillar, check) {
  let result;
  if (check === 'm') {
    result = {
      exist: 'n',
      word: ' ',
      possible: 'n',
    };
  } else {
    let um_heuisin_gisin = word;
    if (pillar === um_heuisin_gisin) {
      if (setNoWolUm(um_heuisin_gisin) === true) {
        result = {
          exist: 'y',
          word: um_heuisin_gisin,
          possible: 'y',
        };
      } else {
        result = {
          exist: 'n',
          word: ' ',
          possible: 'n',
        };
      }
    } else {
      result = {
        exist: 'n',
        word: ' ',
        possible: 'n',
      };
    }
  }
  return result;
}

//GEUK_heuisin_gisin
ryeong.geuk_heuisin_gisin = function (pillar, word, yuksin, use) {
  let result;
  result = checkRyeongElement(pillar, word, yuksin, use)
  return result;
};
//UM_gisin
ryeong.um_gisin = function (pillar, word, yuksin, use, jiji, check) {
  let result;

  if (
    jiji !== undefined &&
    (jiji === '자' || jiji === '오' || jiji === '묘' || jiji === '유')
  ) {
    result = wang_um_gisin(word, pillar, check);
  } else {
    result = checkRyeongElement(pillar, word, yuksin, use)
  }
  return result;
};

//음양 ** 
function wang_um_gisin(word, pillar, check) {
  let result;
  if (check === 'm') {
    result = {
      exist: 'n',
      word: ' ',
      possible: 'n',
    };
  } else {
    let um_heuisin_gisin = word;
    if (pillar === um_heuisin_gisin) {
      if (setNoWolUm(um_heuisin_gisin) === true) {
        result = {
          exist: 'y',
          word: um_heuisin_gisin,
          possible: 'y',
        };
      } else {
        result = {
          exist: 'n',
          word: ' ',
          possible: 'n',
        };
      }
    } else {
      result = {
        exist: 'n',
        word: ' ',
        possible: 'n',
      };
    }
  }
  return result;
}

function setNoWolUm(um_heuisin_gisin) {
  let checkOhangObj = '';
  let result = false;

  if (um_heuisin_gisin === '갑') {
    checkOhangObj = '수';
  } else if (um_heuisin_gisin === '을') {
    checkOhangObj = '화';
  } else if (um_heuisin_gisin === '병') {
    checkOhangObj = '목';
  } else if (um_heuisin_gisin === '정') {
    checkOhangObj = '금';
  } else if (um_heuisin_gisin === '경') {
    checkOhangObj = '화';
  } else if (um_heuisin_gisin === '신') {
    checkOhangObj = '수';
  } else if (um_heuisin_gisin === '임') {
    checkOhangObj = '금';
  } else if (um_heuisin_gisin === '계') {
    checkOhangObj = '목';
  }
  if (checkOhang(checkOhangObj) === true) {
    result = true;
  }
  return result;
}

function checkOhang(ohang) {
  let result = false;
  let pillar = [
    usePillar.y_sky,
    usePillar.m_sky,
    usePillar.d_sky,
    usePillar.h_sky,
    usePillar.y_land,
    usePillar.m_land,
    usePillar.d_land,
    usePillar.h_land,
  ];
  for (let i = 0; i < pillar.length; i++) {
    if (oHangFunc.oHang(pillar[i]) === ohang) {
      result = true;
      break;
    }
  }
  return result;
}

//GEUK_gisin
ryeong.geuk_gisin = function (pillar, word, yuksin, use) {
  let result;
  result = checkRyeongElement(pillar, word, yuksin, use)
  return result;
};

//중기이전
//당령과 사령은 천간
function smallJunggi() {
  let result;
  if (usePillar.m_land === '인') {
    result = {
      dang_ryeong: '갑',
      sa_ryeong: '병',
    };
  } else if (usePillar.m_land === '묘') {
    result = {
      dang_ryeong: '갑',
      sa_ryeong: '갑',
    };
  } else if (usePillar.m_land === '진') {
    result = {
      dang_ryeong: '을',
      sa_ryeong: '을',
    };
  } else if (usePillar.m_land === '사') {
    result = {
      dang_ryeong: '병',
      sa_ryeong: '경',
    };
  } else if (usePillar.m_land === '오') {
    result = {
      dang_ryeong: '병',
      sa_ryeong: '병',
    };
  } else if (usePillar.m_land === '미') {
    result = {
      dang_ryeong: '정',
      sa_ryeong: '정',
    };
  } else if (usePillar.m_land === '신') {
    result = {
      dang_ryeong: '경',
      sa_ryeong: '임',
    };
  } else if (usePillar.m_land === '유') {
    result = {
      dang_ryeong: '경',
      sa_ryeong: '경',
    };
  } else if (usePillar.m_land === '술') {
    result = {
      dang_ryeong: '신',
      sa_ryeong: '신',
    };
  } else if (usePillar.m_land === '해') {
    result = {
      dang_ryeong: '임',
      sa_ryeong: '갑',
    };
  } else if (usePillar.m_land === '자') {
    result = {
      dang_ryeong: '임',
      sa_ryeong: '임',
    };
  } else if (usePillar.m_land === '축') {
    result = {
      dang_ryeong: '계',
      sa_ryeong: '계',
    };
  }
  return result;
}
//중기이후
//당령과 사령은 천간
function bigJunggi() {
  let result;
  if (usePillar.m_land === '인') {
    result = {
      dang_ryeong: '갑',
      sa_ryeong: '갑',
    };
  } else if (usePillar.m_land === '묘') {
    result = {
      dang_ryeong: '을',
      sa_ryeong: '을',
    };
  } else if (usePillar.m_land === '진') {
    result = {
      dang_ryeong: '을',
      sa_ryeong: '계',
    };
  } else if (usePillar.m_land === '사') {
    result = {
      dang_ryeong: '병',
      sa_ryeong: '병',
    };
  } else if (usePillar.m_land === '오') {
    result = {
      dang_ryeong: '정',
      sa_ryeong: '정',
    };
  } else if (usePillar.m_land === '미') {
    result = {
      dang_ryeong: '정',
      sa_ryeong: '을',
    };
  } else if (usePillar.m_land === '신') {
    result = {
      dang_ryeong: '경',
      sa_ryeong: '경',
    };
  } else if (usePillar.m_land === '유') {
    result = {
      dang_ryeong: '신',
      sa_ryeong: '신',
    };
  } else if (usePillar.m_land === '술') {
    result = {
      dang_ryeong: '신',
      sa_ryeong: '정',
    };
  } else if (usePillar.m_land === '해') {
    result = {
      dang_ryeong: '임',
      sa_ryeong: '임',
    };
  } else if (usePillar.m_land === '자') {
    result = {
      dang_ryeong: '계',
      sa_ryeong: '계',
    };
  } else if (usePillar.m_land === '축') {
    result = {
      dang_ryeong: '계',
      sa_ryeong: '신',
    };
  }
  return result;
}
module.exports = ryeong;
