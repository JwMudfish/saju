var Sangsin = {};

const yongsinFile = require('../testResult/contents_Hisin10/contents_yongsin.json');
const yongsinTitleFile = require('../testResult/contents_Hisin10/contents_yongsinTitle.json');
let defaultFile = '../testResult/contents_Hisin10'
let useFolder;
let options;
Sangsin.randum = function () {
  let result = {
    title: '',
    contents: '',
  };
  result.title = getTitle(),
    result.contents = self()
  return result;
};
const getTitle = () => {
  let result = "";
  if (useRyeong.yongsin === "계") {
    result = getResultYongsinTitle("yongsin_GyeSu").contents
  }
  else if (useRyeong.yongsin === "갑") {
    result = getResultYongsinTitle("yongsin_GapMok").contents
  }
  else if (useRyeong.yongsin === "을") {
    result = getResultYongsinTitle("yongsin_UlMok").contents
  }
  else if (useRyeong.yongsin === "병") {
    result = getResultYongsinTitle("yongsin_ByeongHwa").contents
  }
  else if (useRyeong.yongsin === "정") {
    result = getResultYongsinTitle("yongsin_JungHwa").contents
  }
  else if (useRyeong.yongsin === "경") {
    result = getResultYongsinTitle("yongsin_GyeongGum").contents
  }
  else if (useRyeong.yongsin === "신") {
    result = getResultYongsinTitle("yongsin_SinGum").contents
  }
  else if (useRyeong.yongsin === "임") {
    result = getResultYongsinTitle("yongsin_Limsu").contents
  }
  return result;
}
const self = () => {
  let result = '';

  getFolder()
  result = getYongsinText() + getHisinText() + defaultSentence() +
    getUmyangukHisinText() + choiceJosa() + getSangukHisinText()

  return result;
};

const defaultSentence = () => {
  let result = '';
  if (checkYN(useRyeong.heuisin) === true) {
    if ((checkYN(useRyeong.geuk_heuisin_gisin) === true) ||
      (checkYN(useRyeong.um_heuisin_gisin) === true)) {
      result = "자신의 재능을 직업으로 만드는데 있어 한계가 없어요. 응용력이 뛰어나 다양한 직업으로 확장이 가능해요. 희신의 기신인 "
    }

  }
  else if (checkYN(useRyeong.heuisin) === false) {
    if ((checkYN(useRyeong.geuk_heuisin_gisin) === true) ||
      (checkYN(useRyeong.um_heuisin_gisin) === true)) {
      result = "환경적으로 자신을 단련시키고 기술훈련에 매진하는 일이 익숙하지만, 희신의 기신인 "
    }

  }
  return result;
}

const choiceJosa = () => {
  let result = '';
  if ((checkYN(useRyeong.um_heuisin_gisin) === true)
    &&
    (checkYN(useRyeong.geuk_heuisin_gisin) === true)) {
    result = "또한 "
  }
  return result
}
const getFolder = () => {
  if (useRyeong.yongsin === "계") {
    if (checkYN(useRyeong.heuisin) === true) {
      useFolder = require(defaultFile + "/contents_gyesu/contents_HisinYes.json")
    }
    else {
      useFolder = require(defaultFile + "/contents_gyesu/contents_HisinNo.json")
    }
  }
  else if (useRyeong.yongsin === "갑") {
    if (checkYN(useRyeong.heuisin) === true) {
      useFolder = require(defaultFile + "/contents_gapmuk/contents_HisinYes.json")
    }
    else {
      useFolder = require(defaultFile + "/contents_gapmuk/contents_HisinNo.json")
    }
  }
  else if (useRyeong.yongsin === "을") {
    if (checkYN(useRyeong.heuisin) === true) {
      useFolder = require(defaultFile + "/contents_ulmok/contents_HisinYes.json")
    }
    else {
      useFolder = require(defaultFile + "/contents_ulmok/contents_HisinNo.json")
    }
  }
  else if (useRyeong.yongsin === "병") {
    if (checkYN(useRyeong.heuisin) === true) {
      useFolder = require(defaultFile + "/content_byeongHwa/contents_HisinYes.json")
    }
    else {
      useFolder = require(defaultFile + "/content_byeongHwa/contents_HisinNo.json")
    }
  }
  else if (useRyeong.yongsin === "정") {
    if (checkYN(useRyeong.heuisin) === true) {
      useFolder = require(defaultFile + "/contents_jungHwa/contents_HisinYes.json")
    }
    else {
      useFolder = require(defaultFile + "/contents_jungHwa/contents_HisinNo.json")
    }
  }
  else if (useRyeong.yongsin === "경") {
    if (checkYN(useRyeong.heuisin) === true) {
      useFolder = require(defaultFile + "/contents_GyeongGum/contents_HisinYes.json")
    }
    else {
      useFolder = require(defaultFile + "/contents_GyeongGum/contents_HisinNo.json")
    }
  }
  else if (useRyeong.yongsin === "신") {
    if (checkYN(useRyeong.heuisin) === true) {
      useFolder = require(defaultFile + "/content_sinGum/contents_HisinYes.json")
    }
    else {
      useFolder = require(defaultFile + "/content_sinGum/contents_HisinNo.json")
    }
  }
  else if (useRyeong.yongsin === "임") {
    if (checkYN(useRyeong.heuisin) === true) {
      useFolder = require(defaultFile + "/content_Limsu/contents_HisinYes.json")
    }
    else {
      useFolder = require(defaultFile + "/content_Limsu/contents_HisinNo.json")
    }
  }
}

const getHisinText = () => {
  let result = ''
  if (checkYN(useRyeong.heuisin) === true) {
    result = getResult("hisinYes").contents;
  }
  else {
    result = getResult("hisinNo").contents;
  }
  return result + "\n\n"
}
const getSangukHisinText = () => {
  let result = ''
  if (checkYN(useRyeong.geuk_heuisin_gisin) === true) {
    result = getResult("hisinSanggukYes").contents + "\n\n";
  }
  return result
}
const getUmyangukHisinText = () => {
  let result = ''
  if (checkYN(useRyeong.um_heuisin_gisin) === true) {
    result = getResult("hisinUmYangYes").contents + "\n\n";
  }
  return result
}

function getYongsinText() {
  let result = "";
  if (useRyeong.yongsin === "계") {
    result = getResultYongsin("yongsin_GyeSu").contents
  }
  else if (useRyeong.yongsin === "갑") {
    result = getResultYongsin("yongsin_GapMok").contents
  }
  else if (useRyeong.yongsin === "을") {
    result = getResultYongsin("yongsin_UlMok").contents
  }
  else if (useRyeong.yongsin === "병") {
    result = getResultYongsin("yongsin_ByeongHwa").contents
  }
  else if (useRyeong.yongsin === "정") {
    result = getResultYongsin("yongsin_JungHwa").contents
  }
  else if (useRyeong.yongsin === "경") {
    result = getResultYongsin("yongsin_GyeongGum").contents
  }
  else if (useRyeong.yongsin === "신") {
    result = getResultYongsin("yongsin_SinGum").contents
  }
  else if (useRyeong.yongsin === "임") {
    result = getResultYongsin("yongsin_Limsu").contents
  }
  return result + "\n\n";
}

function getResultYongsin(title) {
  let result;
  for (let i = 0; i < yongsinFile.contentsList.length; i++) {
    if (title === yongsinFile.contentsList[i].title) {
      result = yongsinFile.contentsList[i];
      break;
    }
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
function getResultYongsinTitle(title) {
  let result;
  for (let i = 0; i < yongsinTitleFile.contentsList.length; i++) {
    if (title === yongsinTitleFile.contentsList[i].title) {
      result = yongsinTitleFile.contentsList[i];
      break;
    }
  }
  return result;
}
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

module.exports = Sangsin;
