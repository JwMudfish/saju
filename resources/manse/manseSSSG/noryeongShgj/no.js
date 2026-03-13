var no = {};
const chunGan = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
const ryeongFunction = require('../../ryeong/ryeong');
const gungshgjFuncWordtion = require('../../gungShgj/gungshgj');
const gil = require('../../gungShgj/gil');
const hung = require('../../gungShgj/hung');
const sssg = require('../../yuksin/getSangSengSangGuk');
const yuksin = require('../../yuksin/getYukSin');
const umYangFunc = require('../../umYangOHang/umYang');
const oHangFunc = require('../../umYangOHang/oHang');
const shgjFuncWord = require('./noShgjFuncWord');
const shgjFuncYuksin = require('./noShgjFuncYuksin');
const ryeongFuncWord = require('./noRyeongWord');
const ryeongFuncYuksin = require('../../../manseUtil/ryeong/getRyeongYuksin');
Object.freeze(chunGan);

// 단어가 실제로 있는지 없는지 확인하는것
no.checkWord = function (check, gukgubun) {
  let result;
  if (check === 'sangsin') {
    result = shgjFuncWord.sangsin(gukgubun);
  } else if (check === 'sangsingisin') {
    result = shgjFuncWord.sangsingisin(gukgubun);
  } else if (check === 'gusin') {
    result = shgjFuncWord.gusin(gukgubun);
  } else if (check === 'gusingisin' || check === 'gusingisin') {
    result = shgjFuncWord.gukgisinGusingisin(gukgubun);
  } else if (check === 'sanghwa') {
    result = shgjFuncWord.sanghwa(gukgubun);
  } else if (check === 'sulhwa') {
    result = shgjFuncWord.sulhwa(gukgubun);
  } else if (check === 'sang_jae') {
    result = shgjFuncWord.sang_jae(gukgubun);
  } else if (check === 'sul_jae') {
    result = shgjFuncWord.sul_jae(gukgubun);
  } else if (check === 'sang_hap') {
    result = shgjFuncWord.sang_hap(gukgubun);
  } else if (check === 'sul_hap') {
    result = shgjFuncWord.sul_hap(gukgubun);
  } else if (check === 'sengHwa_zeHwa') {
    result = shgjFuncWord.sengHwa_zeHwa(gukgubun);
  } else if (check === 'sengHwa_hapHwa') {
    result = shgjFuncWord.sengHwa_hapHwa(gukgubun);
  } else if (check === 'sulHwa_zeHwa') {
    result = shgjFuncWord.sulHwa_zeHwa(gukgubun);
  } else if (check === 'sulHwa_hapHwa') {
    result = shgjFuncWord.sulHwa_hapHwa(gukgubun);
  } else if (check === 'heuisin') {
    result = ryeongFuncWord.heuisin();
  } else if (check === 'junghwa') {
    result = ryeongFuncWord.junghwa();
  } else if (check === 'junghwa_gisin') {
    result = ryeongFuncWord.junghwa_gisin();
  } else if (check === 'jisok') {
    result = ryeongFuncWord.jisok();
  } else if (check === 'jisok_gisin') {
    result = ryeongFuncWord.jisok_gisin();
  } else if (check === 'hwakjang') {
    result = ryeongFuncWord.hwakjang();
  } else if (check === 'hwakjang_gisin') {
    result = ryeongFuncWord.hwakjang_gisin();
  } else if (check === 'um_heuisin_gisin') {
    result = ryeongFuncWord.um_heuisin_gisin();
  } else if (check === 'geuk_heuisin_gisin') {
    result = ryeongFuncWord.geuk_heuisin_gisin();
  } else if (check === 'um_gisin') {
    result = ryeongFuncWord.um_gisin();
  } else if (check === 'geuk_gisin') {
    result = ryeongFuncWord.geuk_gisin();
  }
  return result;
};
// 단어가 실제로 있는지 없는지 확인하는것
no.checkYuksin = function (check, gukgubun) {
  let result;
  if (check === 'sangsin') {
    result = shgjFuncYuksin.sangsin(gukgubun);
  } else if (check === 'sangsingisin') {
    result = shgjFuncYuksin.sangsingisin(gukgubun);
  } else if (check === 'gusin') {
    result = shgjFuncYuksin.gusin(gukgubun);
  } else if (check === 'gusingisin' || check === 'gusingisin') {
    result = shgjFuncYuksin.gukgisinGusingisin(gukgubun);
  } else if (check === 'sanghwa') {
    result = shgjFuncYuksin.sanghwa(gukgubun);
  } else if (check === 'sulhwa') {
    result = shgjFuncYuksin.sulhwa(gukgubun);
  } else if (check === 'sang_jae') {
    result = shgjFuncYuksin.sang_jae(gukgubun);
  } else if (check === 'sul_jae') {
    result = shgjFuncWord.sul_jae(gukgubun);
  } else if (check === 'sang_hap') {
    result = shgjFuncYuksin.sang_hap(gukgubun);
  } else if (check === 'sul_hap') {
    result = shgjFuncYuksin.sul_hap(gukgubun);
  } else if (check === 'sengHwa_zeHwa') {
    result = shgjFuncYuksin.sengHwa_zeHwa(gukgubun);
  } else if (check === 'sengHwa_hapHwa') {
    result = shgjFuncYuksin.sengHwa_hapHwa(gukgubun);
  } else if (check === 'sulHwa_zeHwa') {
    result = shgjFuncYuksin.sulHwa_zeHwa(gukgubun);
  } else if (check === 'sulHwa_hapHwa') {
    result = shgjFuncYuksin.sulHwa_hapHwa(gukgubun);
  } else if (check === 'heuisin') {
    result = ryeongFuncYuksin.heuisin();
  } else if (check === 'junghwa') {
    result = ryeongFuncYuksin.junghwa();
  } else if (check === 'junghwa_gisin') {
    result = ryeongFuncYuksin.junghwa_gisin();
  } else if (check === 'jisok') {
    result = ryeongFuncYuksin.jisok();
  } else if (check === 'jisok_gisin') {
    result = ryeongFuncYuksin.jisok_gisin();
  } else if (check === 'hwakjang') {
    result = ryeongFuncYuksin.hwakjang();
  } else if (check === 'hwakjang_gisin') {
    result = ryeongFuncYuksin.hwakjang_gisin();
  } else if (check === 'um_heuisin_gisin') {
    result = ryeongFuncYuksin.um_heuisin_gisin();
  } else if (check === 'geuk_heuisin_gisin') {
    result = ryeongFuncYuksin.geuk_heuisin_gisin();
  } else if (check === 'um_gisin') {
    result = ryeongFuncYuksin.um_gisin();
  } else if (check === 'geuk_gisin') {
    result = ryeongFuncYuksin.geuk_gisin();
  }
  return result;
};
function checkChunGan(temp) {
  let result = false;
  let chunGan = [
    usePillar.y_sky,
    usePillar.m_sky,
    usePillar.d_sky,
    usePillar.h_sky,
  ];
  for (let i = 0; i < chunGan.length; i++) {
    if (chunGan[i] === temp) {
      result = true;
    }
  }
  return result;
}

function checkYuksin(temp) {
  let result = false;
  let yuksin = [
    useYuksin.y_sky,
    useYuksin.m_sky,
    useYuksin.d_sky,
    useYuksin.y_jangan.y_jangan1,
    useYuksin.y_jangan.y_jangan2,
    useYuksin.y_jangan.y_jangan3,
    useYuksin.m_jangan.m_jangan1,
    useYuksin.m_jangan.m_jangan2,
    useYuksin.m_jangan.m_jangan3,
    useYuksin.d_jangan.d_jangan1,
    useYuksin.d_jangan.d_jangan2,
    useYuksin.d_jangan.d_jangan3,
    useYuksin.h_jangan.h_jangan1,
    useYuksin.h_jangan.h_jangan2,
    useYuksin.h_jangan.h_jangan3,
  ];
  for (let i = 0; i < yuksin.length; i++) {
    if (yuksin[i] === temp) {
      result = true;
    }
  }
  return result;
}

function checkJiJi(temp) {
  let result = false;
  let jiji = [
    usePillar.y_land,
    usePillar.m_land,
    usePillar.d_land,
    usePillar.h_land,
  ];
  for (let i = 0; i < jiji.length; i++) {
    if (jiji[i] === temp) {
      result = true;
    }
  }
  return result;
}
module.exports = no;
