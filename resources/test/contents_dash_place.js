var dash = {};

var title = 'dash_place_';
var num;
var totalTitle;
// num = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
let options;

const gungShgjFunction = require('../manse/gungShgj/gungshgj');
const resultTest = require('../testResult/contents_ilgan_love.json');
const umYangFunc = require("../manse/umYangOHang/umYang");
const oHangFunc = require("../manse/umYangOHang/oHang");
const sssg = require('../manse/yuksin/getSangSengSangGuk');
const yuksin = require('../manse/yuksin/getYukSin');
dash.randum = function () {

  return self();
};
const self = () => {
  let result;
  yuksin.yuksin(
    sssg.sssg(useUmYangOHang.d_sky.oHang, oHangFunc.oHang('갑')),
    umYangFunc.umYang('갑', 1)
  );
  let shgj = [
    gungShgjFunction.sangguk(yuksin.yuksin(
      sssg.sssg(useUmYangOHang.d_sky.oHang, oHangFunc.oHang('갑')),
      umYangFunc.umYang('갑', 1)
    )),
    gungShgjFunction.sangguk(yuksin.yuksin(
      sssg.sssg(useUmYangOHang.d_sky.oHang, oHangFunc.oHang('을')),
      umYangFunc.umYang('을', 1)
    )),
    gungShgjFunction.sangguk(yuksin.yuksin(
      sssg.sssg(useUmYangOHang.d_sky.oHang, oHangFunc.oHang('병')),
      umYangFunc.umYang('병', 1)
    )),
    gungShgjFunction.sangguk(yuksin.yuksin(
      sssg.sssg(useUmYangOHang.d_sky.oHang, oHangFunc.oHang('정')),
      umYangFunc.umYang('정', 1)
    )),
    gungShgjFunction.sangguk(yuksin.yuksin(
      sssg.sssg(useUmYangOHang.d_sky.oHang, oHangFunc.oHang('무')),
      umYangFunc.umYang('무', 1)
    )),
    gungShgjFunction.sangguk(yuksin.yuksin(
      sssg.sssg(useUmYangOHang.d_sky.oHang, oHangFunc.oHang('기')),
      umYangFunc.umYang('기', 1)
    )),
    gungShgjFunction.sangguk(yuksin.yuksin(
      sssg.sssg(useUmYangOHang.d_sky.oHang, oHangFunc.oHang('경')),
      umYangFunc.umYang('경', 1)
    )),
    gungShgjFunction.sangguk(yuksin.yuksin(
      sssg.sssg(useUmYangOHang.d_sky.oHang, oHangFunc.oHang('신')),
      umYangFunc.umYang('신', 1)
    )),
    gungShgjFunction.sangguk(yuksin.yuksin(
      sssg.sssg(useUmYangOHang.d_sky.oHang, oHangFunc.oHang('임')),
      umYangFunc.umYang('임', 1)
    )),
    gungShgjFunction.sangguk(yuksin.yuksin(
      sssg.sssg(useUmYangOHang.d_sky.oHang, oHangFunc.oHang('계')),
      umYangFunc.umYang('계', 1)
    )),
  ];

  let pillar = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
  if(useShgj.gukgubun==="길격"){
    for (let i = 0; i < shgj.length; i++) {
      if (shgj[i].sssg === 'shang_come' && shgj[i].JP === 'Y') {
        result = pillar[i];
        break;
      }
    }
  }
  else {
    for (let i = 0; i < shgj.length; i++) {
      if (shgj[i].sssg === 'geuk_come' && shgj[i].JP === 'Y') {
        result = pillar[i];
        break;
      }
    }
  }
 
  let temp;
  //스터디, 동아리
  if (result === '계' || result === '갑') {
    temp = getResult("hotspot_1")
  }
  //사교, 친목 모임
  else if (result === '을' || result === '병') {
    temp = getResult("hotspot_2")
  }
  //중매, 소개팅
  else if (result === '무' || result === '기') {
    temp = getResult("hotspot_3")
  }
  //직장, 직업 훈련소
  else if (result === '정' || result === '경') {
    temp = getResult("hotspot_4")
  }
  //헌팅
  else if (result === '신' || result === '임') {
    temp = getResult("hotspot_5")
  }
  return temp;
};


function getResult(title) {
  let result;
  for (let i = 0; i < resultTest.contentsList.length; i++) {
    if (title === resultTest.contentsList[i].title) {
      result = resultTest.contentsList[i];
      break;
    }
  }
  return result;
}
module.exports = dash;
