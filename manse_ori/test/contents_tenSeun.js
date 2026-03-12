var Sangsin = {};
const checkSeunElement = require('../manse/checkSeunElement/checkSeunElementIF');
let yongsinFileRoot = '../testResult/contents_tenSeun/YongsinUn/'
let hisinFileRoot = '../testResult/contents_tenSeun/HisinUn/'
let jisokFileRoot = '../testResult/contents_tenSeun/jisokUn/'
let hwakjangFileRoot = '../testResult/contents_tenSeun/hwakjangUn/'
let jungHwaFileRoot = '../testResult/contents_tenSeun/JungHwaUn/'
const yongsinTitleFile = require('../testResult/contents_Hisin10/contents_yongsinTitle.json');
let defaultFile = '../testResult/contents_tenSeun/YongsinUn/'
let useFolder;
const umYangOHangFunc = require("../manseUtil/umYangOHang/oHang");
let options;
var moment = require("moment");
Sangsin.randum = function () {
  let result = self()
  return result;
};

const self = () => {
  let result = '';
  const start = moment().format("YYYY");
  const end = Number(moment().format("YYYY")) + 10;
  let useSeunElement = checkSeunElement.seunElementIF(start, end)
  return result;
};

const jungHwaUn = () => {
  let root = jungHwaFileRoot
  let result = ''
  if (checkYN(useRyeong.heuisin) === true) {
    root = root + '/HisinYes/contents_yongsin.json'
    useFolder = require(root)
  }
  else {
    root = root + '/HisinNo/contents_yongsin.json'
    useFolder = require(root)
  }
  if (useRyeong.yongsin === "신" ||
    useRyeong.yongsin === "임") {
    result = result + getResult('yongsin_simLim').contents
  }
  else if (useRyeong.yongsin === "경") {
    result = result + getResult('yongsin_gyeongGum').contents
  }
  else if (useRyeong.yongsin === "정") {
    result = result + getResult('yongsin_jungHwa').contents
  }
  else if (useRyeong.yongsin === "을" ||
    useRyeong.yongsin === "병") {
    result = result + getResult('yongsin_elByeong').contents
  }
  else if (useRyeong.yongsin === "계" ||
    useRyeong.yongsin === "갑") {
    result = result + getResult('yongsin_gyeGap').contents
  }
  return result;

}
const hwakjangUn = () => {
  let result = "";
  let root = hwakjangFileRoot
  if (checkYN(useRyeong.heuisin) === true) {
    root = root + '/HisinYes'
  }
  else {
    root = root + '/HisinNo'
  }
  if (getBasicUse() === "basic") {
    root = root + '/basic/contents_hwakjangUn.json'
    useFolder = require(root)
    result = result + getResult('basic').contents
  }
  else {
    root = root + '/use/contents_hwakjangUn.json'
    useFolder = require(root)
    result = result + getResult('use').contents
  }



  if (checkYN(useRyeong.jisok) === true &&
    checkYN(useRyeong.hwakjang) === true) {
    result = result + getResult('jisokHwakJangYes').contents
  }
  else if (checkYN(useRyeong.jisok) === true) {
    result = result + getResult('jisokYes').contents
  }
  else if (checkYN(useRyeong.hwakjang) === true) {
    result = result + getResult('HwakJangYes').contents
  }

  return result;
}
const jisokUn = () => {
  let result = "";
  let root = jisokFileRoot
  if (checkYN(useRyeong.heuisin) === true) {
    root = root + '/HisinYes'
  }
  else {
    root = root + '/HisinNo'
  }
  if (getBasicUse() === "basic") {
    root = root + '/basic/contents_jisokUn.json'
    useFolder = require(root)
    result = result + getResult('basic').contents
  }
  else {
    root = root + '/use/contents_jisokUn.json'
    useFolder = require(root)
    result = result + getResult('use').contents
  }



  if (checkYN(useRyeong.jisok) === true &&
    checkYN(useRyeong.hwakjang) === true) {
    result = result + getResult('jisokHwakJangYes').contents
  }
  else if (checkYN(useRyeong.jisok) === true) {
    result = result + getResult('jisokYes').contents
  }
  else if (checkYN(useRyeong.hwakjang) === true) {
    result = result + getResult('HwakJangYes').contents
  }

  return result;
}

const hisinUn = () => {
  let result = "";
  let root = hisinFileRoot
  let hisinUnText = ""
  let hisinYesNoText = ""
  let basicUseText = ""
  let yongSinText = ""
  let temp = require(hisinFileRoot + '/contents_hisin.json')
  hisinUnText = getResult2("hisinUn", temp).contents
  if (checkYN(useRyeong.heuisin) === true) {
    root = root + '/HisinYes'
    hisinYesNoText = getResult2("hisinYes", temp).contents
  }
  else {
    root = root + '/HisinNo'
    hisinYesNoText = getResult2("hisinNo", temp).contents
  }
  if (getBasicUse() === "basic") {
    root = root + '/basic/contents_yongsin.json'
    useFolder = require(root)
    basicUseText = getResult('basic').contents
  }
  else {
    root = root + '/use/contents_yongsin.json'
    useFolder = require(root)
    basicUseText = getResult('use').contents
  }



  if (umYangOHangFunc.oHang(useRyeong.yongsin) === "수" ||
    umYangOHangFunc.oHang(useRyeong.yongsin) === "화") {
    yongSinText = getResult('yongsin_SuHwa').contents
  }
  else if (umYangOHangFunc.oHang(useRyeong.yongsin) === "목" ||
    umYangOHangFunc.oHang(useRyeong.yongsin) === "금") {
    yongSinText = getResult('yongsin_MokGum').contents
  }

  result = hisinUnText + hisinYesNoText + basicUseText + yongSinText

  return result;
}
const yongsinUn = () => {
  let result = "";
  let root = yongsinFileRoot
  if (checkYN(useRyeong.heuisin) === true) {
    root = root + '/HisinYes'
  }
  else {
    root = root + '/HisinNo'
  }
  if (getBasicUse() === "basic") {
    root = root + '/basic/contents_yongsin.json'
    useFolder = require(root)
    result = result + getResult('basic').contents
  }
  else {
    root = root + '/use/contents_yongsin.json'
    useFolder = require(root)
    result = result + getResult('use').contents
  }



  if (umYangOHangFunc.oHang(useRyeong.yongsin) === "수" ||
    umYangOHangFunc.oHang(useRyeong.yongsin) === "화") {
    result = result + getResult('yongsin_SuHwa').contents
  }
  else if (umYangOHangFunc.oHang(useRyeong.yongsin) === "목" ||
    umYangOHangFunc.oHang(useRyeong.yongsin) === "금") {
    result = result + getResult('yongsin_MokGum').contents
  }

  return result;
}

const getBasicUse = () => {
  let result = ""
  if (useRyeong.yongsin === "계" ||
    useRyeong.yongsin === "갑" ||
    useRyeong.yongsin === "정" ||
    useRyeong.yongsin === "경") {
    result = "basic"
  }
  else if (useRyeong.yongsin === "을" ||
    useRyeong.yongsin === "병" ||
    useRyeong.yongsin === "신" ||
    useRyeong.yongsin === "임") {
    result = "uses"
  }

  return result;
}

const checkYN = (word) => {
  let result = false;
  if (word.exist === 'Y' &&
    (word.use.includes('y') || word.use.includes('Y'))) {
    result = true;
  }
  return result
}
/*function getResultYongsinTitle(title) {
  let result;
  for (let i = 0; i < yongsinTitleFile.contentsList.length; i++) {
    if (title === yongsinTitleFile.contentsList[i].title) {
      result = yongsinTitleFile.contentsList[i];
      break;
    }
  }
  return result;
}*/
function getResult(title) {
  let result;
  for (let i = 0; i < useFolder.contentsList.length; i++) {
    if (title === useFolder.contentsList[i].title) {
      result = useFolder.contentsList[i];
      break;
    }
  }
  return result;
}

function getResult2(title, folder) {
  let result;
  for (let i = 0; i < folder.contentsList.length; i++) {
    if (title === folder.contentsList[i].title) {
      result = folder.contentsList[i];
      break;
    }
  }
  return result;
}

module.exports = Sangsin;
