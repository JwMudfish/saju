/**
 * 세운별 요소 샘플코드
 * 추후에 코드를 수정할일 있으면, 이것을 수정하지 말고 이코드를 복사해서 붙여넣는 방식으로 작업하면됨
 */
var seunElement = {};
const ryeong = require('./ryeongWord')
const shgj = require('./shgjWord')
const element = require('./checkSeunElement')
// TestCode
const wolFunction = require('./checkWolElementIF')
const deunFunction = require('./checkDeunElementIF')
const hiyong = require('../../manseUtil/hiyong/hiyongUtil')
var moment = require("moment");
seunElement.seunElementIF = function (start, end) {
  let seun = {

    ryeong: {},
    shgj: {},
    hiyong: {},

  }
  seun.hiyong.hi = getYN(element.seunElement(hiyong.hiCheck(), start, end))
  seun.hiyong.yong = getYN(element.seunElement(hiyong.yongCheck(), start, end))
  seun.ryeong.yongsin = getYN(element.seunElement(useRyeong.yongsin, start, end))
  seun.ryeong.heuisin = getYN(element.seunElement(ryeong.heuisin(), start, end))
  seun.ryeong.junghwa = getYN(element.seunElement(ryeong.junghwa(), start, end))
  seun.ryeong.junghwa_gisin = getYN(element.seunElement(ryeong.junghwa_gisin(), start, end))
  seun.ryeong.jisok = getYN(element.seunElement(ryeong.jisok(), start, end))
  seun.ryeong.jisok_gisin = getYN(element.seunElement(ryeong.jisok_gisin(), start, end))
  seun.ryeong.hwakjang = getYN(element.seunElement(ryeong.hwakjang(), start, end))
  seun.ryeong.hwakjang_gisin = getYN(element.seunElement(ryeong.hwakjang_gisin(), start, end))
  seun.ryeong.um_heuisin_gisin = getYN(element.seunElement(ryeong.um_heuisin_gisin(), start, end))
  seun.ryeong.geuk_heuisin_gisin = getYN(element.seunElement(ryeong.geuk_heuisin_gisin(), start, end))
  seun.ryeong.um_gisin = getYN(element.seunElement(ryeong.um_gisin(), start, end))
  seun.ryeong.geuk_gisin = getYN(element.seunElement(ryeong.geuk_gisin(), start, end))
  seun.shgj.sangsin = getYN(element.seunElement(shgj.sangsin(useShgj.gukgubun), start, end))
  seun.shgj.sangsingisin = getYN(element.seunElement(shgj.sangsingisin(useShgj.gukgubun), start, end))
  seun.shgj.gusin = getYN(element.seunElement(shgj.gusin(useShgj.gukgubun), start, end))
  if (useShgj.gusingisin === undefined) {
  } else {
    seun.shgj.gusingisin = getYN(element.seunElement(shgj.gukgisinGusingisin(useShgj.gukgubun), start, end))
  }
  if (useShgj.gukgisin === undefined) {
  } else {
    seun.shgj.gukgisin = getYN(element.seunElement(shgj.gukgisinGusingisin(useShgj.gukgubun), start, end))
  }
  seun.shgj.sanghwa = getYN(element.seunElement(shgj.sanghwa(useShgj.gukgubun), start, end))
  seun.shgj.sulhwa = getYN(element.seunElement(shgj.sulhwa(useShgj.gukgubun), start, end))
  if (useShgj.sang_jae === undefined) {
  } else {
    seun.shgj.sang_jae = getYN(element.seunElement(shgj.sang_jae(useShgj.gukgubun), start, end))
  }
  if (useShgj.sul_jae === undefined) {
  } else {
    seun.shgj.sul_jae = getYN(element.seunElement(shgj.sul_jae(useShgj.gukgubun), start, end))
  }
  if (useShgj.yido === undefined) {
  } else {
    seun.shgj.sul_jae = getYN(element.seunElement(shgj.sul_jae(useShgj.gukgubun), start, end))
  }
  if (useShgj.sang_hap === undefined) {
  } else {
    seun.shgj.sang_hap = getYN(element.seunElement(shgj.sang_hap(useShgj.gukgubun), start, end))
  }
  if (useShgj.sul_hap === undefined) {
  } else {
    seun.shgj.sul_hap = getYN(element.seunElement(shgj.sul_hap(useShgj.gukgubun), start, end))
  }
  if (useShgj.sengHwa_zeHwa === undefined) {
  } else {
    seun.shgj.sengHwa_zeHwa = getYN(element.seunElement(shgj.sengHwa_zeHwa(useShgj.gukgubun), start, end))
  }
  if (useShgj.sulHwa_zeHwa === undefined) {
  } else {
    seun.shgj.sulHwa_zeHwa = getYN(element.seunElement(shgj.sulHwa_zeHwa(useShgj.gukgubun), start, end))
  }
  if (useShgj.sengHwa_hapHwa === undefined) {
  } else {
    seun.shgj.sengHwa_hapHwa = getYN(element.seunElement(shgj.sengHwa_hapHwa(useShgj.gukgubun), start, end))
  }
  if (useShgj.sulHwa_hapHwa === undefined) {
  } else {
    seun.shgj.sulHwa_hapHwa = getYN(element.seunElement(shgj.sulHwa_hapHwa(useShgj.gukgubun), start, end))
  }

  return seun

  // wolFunction.seunElementIF()
  // deunFunction.seunElementIF()
};

const getYN = (element) => {
  let result = {
    YN: 'N'
  };
  for (let i = 0; i < element.length; i++) {
    if (element[i].YN === 'Y') {
      result = element[i]
    }
  }
  return result;
}
module.exports = seunElement;
