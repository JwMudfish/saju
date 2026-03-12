var seunElement = {};
const ryeong = require('./ryeongWord')
const shgj = require('./shgjWord')
const element = require('./checkWolElement')
var moment = require("moment");
seunElement.seunElementIF = function () {
  return new Promise((resolve) => {
    const start = 1;
    const end = 12;
    const year = Number(moment().format("YYYY"))
    let test = element.seunElement(ryeong.heuisin(), start, end)
    useWolElement = {
      ryeong: {},
      shgj: {}
    }
    useWolElement.ryeong.heuisin = getYN(element.seunElement(ryeong.heuisin(), year, start, end))
    useWolElement.ryeong.junghwa = getYN(element.seunElement(ryeong.junghwa(), year, start, end))
    useWolElement.ryeong.junghwa_gisin = getYN(element.seunElement(ryeong.junghwa_gisin(), year, start, end))
    useWolElement.ryeong.jisok = getYN(element.seunElement(ryeong.jisok(), year, start, end))
    useWolElement.ryeong.jisok_gisin = getYN(element.seunElement(ryeong.jisok_gisin(), year, start, end))
    useWolElement.ryeong.hwakjang = getYN(element.seunElement(ryeong.hwakjang(), year, start, end))
    useWolElement.ryeong.hwakjang_gisin = getYN(element.seunElement(ryeong.hwakjang_gisin(), year, start, end))
    useWolElement.ryeong.um_heuisin_gisin = getYN(element.seunElement(ryeong.um_heuisin_gisin(), year, start, end))
    useWolElement.ryeong.geuk_heuisin_gisin = getYN(element.seunElement(ryeong.geuk_heuisin_gisin(), year, start, end))
    useWolElement.ryeong.um_gisin = getYN(element.seunElement(ryeong.um_gisin(), year, start, end))
    useWolElement.ryeong.geuk_gisin = getYN(element.seunElement(ryeong.geuk_gisin(), year, start, end))
    useWolElement.shgj.sangsin = getYN(element.seunElement(shgj.sangsin(useShgj.gukgubun), year, start, end))
    useWolElement.shgj.sangsingisin = getYN(element.seunElement(shgj.sangsingisin(useShgj.gukgubun), year, start, end))
    useWolElement.shgj.gusin = getYN(element.seunElement(shgj.gusin(useShgj.gukgubun), year, start, end))
    if (useShgj.gusingisin === undefined) {
    } else {
      useWolElement.shgj.gusingisin = getYN(element.seunElement(shgj.gukgisinGusingisin(useShgj.gukgubun), year, start, end))
    }
    if (useShgj.gukgisin === undefined) {
    } else {
      useWolElement.shgj.gukgisin = getYN(element.seunElement(shgj.gukgisinGusingisin(useShgj.gukgubun), year, start, end))
    }
    useWolElement.shgj.sanghwa = getYN(element.seunElement(shgj.sanghwa(useShgj.gukgubun), year, start, end))
    useWolElement.shgj.sulhwa = getYN(element.seunElement(shgj.sulhwa(useShgj.gukgubun), year, start, end))
    if (useShgj.sang_jae === undefined) {
    } else {
      useWolElement.shgj.sang_jae = getYN(element.seunElement(shgj.sang_jae(useShgj.gukgubun), year, start, end))
    }
    if (useShgj.sul_jae === undefined) {
    } else {
      useWolElement.shgj.sul_jae = getYN(element.seunElement(shgj.sul_jae(useShgj.gukgubun), year, start, end))
    }
    if (useShgj.yido === undefined) {
    } else {
      useWolElement.shgj.sul_jae = getYN(element.seunElement(shgj.sul_jae(useShgj.gukgubun), year, start, end))
    }
    if (useShgj.sang_hap === undefined) {
    } else {
      useWolElement.shgj.sang_hap = getYN(element.seunElement(shgj.sang_hap(useShgj.gukgubun), year, start, end))
    }
    if (useShgj.sul_hap === undefined) {
    } else {
      useWolElement.shgj.sul_hap = getYN(element.seunElement(shgj.sul_hap(useShgj.gukgubun), year, start, end))
    }
    if (useShgj.sengHwa_zeHwa === undefined) {
    } else {
      useWolElement.shgj.sul_hap = getYN(element.seunElement(shgj.sul_hap(useShgj.gukgubun), year, start, end))
    }
    if (useShgj.sulHwa_zeHwa === undefined) {
    } else {
      useWolElement.shgj.sulHwa_zeHwa = getYN(element.seunElement(shgj.sulHwa_zeHwa(useShgj.gukgubun), year, start, end))
    }
    if (useShgj.sengHwa_hapHwa === undefined) {
    } else {
      useWolElement.shgj.sengHwa_hapHwa = getYN(element.seunElement(shgj.sengHwa_hapHwa(useShgj.gukgubun), year, start, end))
    }
    if (useShgj.sulHwa_hapHwa === undefined) {
    } else {
      useWolElement.shgj.sulHwa_hapHwa = getYN(element.seunElement(shgj.sulHwa_hapHwa(useShgj.gukgubun), year, start, end))
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
