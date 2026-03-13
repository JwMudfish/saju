var seunElement = {};
const ryeong = require('./ryeongWord')
const shgj = require('./shgjWord')
const hiyong = require('../../manseUtil/hiyong/hiyongUtil')
const element = require('./checkDeunElement')
var moment = require("moment");
seunElement.seunElementIF = function () {
  return new Promise((resolve) => {
    useDeunElement = {
      ryeong: {},
      shgj: {},
      hiyong: {}
    }
    useDeunElement.hiyong.hi = getYN(element.seunElement(hiyong.hiCheck()))
    useDeunElement.hiyong.yong = getYN(element.seunElement(hiyong.yongCheck()))
    useDeunElement.ryeong.heuisin = getYN(element.seunElement(ryeong.heuisin()))
    useDeunElement.ryeong.junghwa = getYN(element.seunElement(ryeong.junghwa()))
    useDeunElement.ryeong.heuisin = getYN(element.seunElement(ryeong.heuisin()))
    useDeunElement.ryeong.junghwa = getYN(element.seunElement(ryeong.junghwa()))
    useDeunElement.ryeong.junghwa_gisin = getYN(element.seunElement(ryeong.junghwa_gisin()))
    useDeunElement.ryeong.jisok = getYN(element.seunElement(ryeong.jisok()))
    useDeunElement.ryeong.jisok_gisin = getYN(element.seunElement(ryeong.jisok_gisin()))
    useDeunElement.ryeong.hwakjang = getYN(element.seunElement(ryeong.hwakjang()))
    useDeunElement.ryeong.hwakjang_gisin = getYN(element.seunElement(ryeong.hwakjang_gisin()))
    useDeunElement.ryeong.um_heuisin_gisin = getYN(element.seunElement(ryeong.um_heuisin_gisin()))
    useDeunElement.ryeong.geuk_heuisin_gisin = getYN(element.seunElement(ryeong.geuk_heuisin_gisin()))
    useDeunElement.ryeong.um_gisin = getYN(element.seunElement(ryeong.um_gisin()))
    useDeunElement.ryeong.geuk_gisin = getYN(element.seunElement(ryeong.geuk_gisin()))
    useDeunElement.shgj.sangsin = getYN(element.seunElement(shgj.sangsin(useShgj.gukgubun)))
    useDeunElement.shgj.sangsingisin = getYN(element.seunElement(shgj.sangsingisin(useShgj.gukgubun)))
    useDeunElement.shgj.gusin = getYN(element.seunElement(shgj.gusin(useShgj.gukgubun)))
    if (useShgj.gusingisin === undefined) {
    } else {
      useDeunElement.shgj.gusingisin = getYN(element.seunElement(shgj.gukgisinGusingisin(useShgj.gukgubun)))
    }
    if (useShgj.gukgisin === undefined) {
    } else {
      useDeunElement.shgj.gukgisin = getYN(element.seunElement(shgj.gukgisinGusingisin(useShgj.gukgubun)))
    }
    useDeunElement.shgj.sanghwa = getYN(element.seunElement(shgj.sanghwa(useShgj.gukgubun)))
    useDeunElement.shgj.sulhwa = getYN(element.seunElement(shgj.sulhwa(useShgj.gukgubun)))
    if (useShgj.sang_jae === undefined) {
    } else {
      useDeunElement.shgj.sang_jae = getYN(element.seunElement(shgj.sang_jae(useShgj.gukgubun)))
    }
    if (useShgj.sul_jae === undefined) {
    } else {
      useDeunElement.shgj.sul_jae = getYN(element.seunElement(shgj.sul_jae(useShgj.gukgubun)))
    }
    if (useShgj.yido === undefined) {
    } else {
      useDeunElement.shgj.sul_jae = getYN(element.seunElement(shgj.sul_jae(useShgj.gukgubun)))
    }
    if (useShgj.sang_hap === undefined) {
    } else {
      useDeunElement.shgj.sang_hap = getYN(element.seunElement(shgj.sang_hap(useShgj.gukgubun)))
    }
    if (useShgj.sul_hap === undefined) {
    } else {
      useDeunElement.shgj.sul_hap = getYN(element.seunElement(shgj.sul_hap(useShgj.gukgubun)))
    }
    if (useShgj.sengHwa_zeHwa === undefined) {
    } else {
      useDeunElement.shgj.sul_hap = getYN(element.seunElement(shgj.sul_hap(useShgj.gukgubun)))
    }
    if (useShgj.sulHwa_zeHwa === undefined) {
    } else {
      useDeunElement.shgj.sulHwa_zeHwa = getYN(element.seunElement(shgj.sulHwa_zeHwa(useShgj.gukgubun)))
    }
    if (useShgj.sengHwa_hapHwa === undefined) {
    } else {
      useDeunElement.shgj.sengHwa_hapHwa = getYN(element.seunElement(shgj.sengHwa_hapHwa(useShgj.gukgubun)))
    }
    if (useShgj.sulHwa_hapHwa === undefined) {
    } else {
      useDeunElement.shgj.sulHwa_hapHwa = getYN(element.seunElement(shgj.sulHwa_hapHwa(useShgj.gukgubun)))
    }
    resolve(seunElement);
  }).catch((error) => {
    console.log(error);
    return error;
});
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
