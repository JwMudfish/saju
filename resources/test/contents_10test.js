var Sangsin = {};

var title = 'ilgan_attitude_';
var num;
var totalTitle;
const basicFile = require('../testResult/contents_10testbasic.json');
const usesFile = require('../testResult/contents_10testuses.json');
let options;
Sangsin.randum = function () {
  let result = {
    one: self()
  };
  return result;
};
const self = () => {
  let result = '';
  if (usejijanggan.m_jangan.m_jangan3 === "계" ||
    usejijanggan.m_jangan.m_jangan3 === "갑" ||
    usejijanggan.m_jangan.m_jangan3 === "정" ||
    usejijanggan.m_jangan.m_jangan3 === "경"
  ) {
    result = result + getResultBasic("basic").contents
    if (useRyeong.heuisin.exist === "Y" && useRyeong.heuisin.use === "Y") {
      result = result + getResultBasic("hisinYes").contents
    }
    else {
      result = result + getResultBasic("hisinNo").contents
    }
    if (useRyeong.hwakjang.exist === "Y" && useRyeong.hwakjang.use === "Y") {
      result = result + getResultBasic("hwakjangYes").contents
    }
    else {
      result = result + getResultBasic("hwakjangNo").contents
    }
  }
  else if (usejijanggan.m_jangan.m_jangan3 === "을" ||
    usejijanggan.m_jangan.m_jangan3 === "병" ||
    usejijanggan.m_jangan.m_jangan3 === "신" ||
    usejijanggan.m_jangan.m_jangan3 === "임"
  ) {
    result = result + getResultUse("uses").contents
    if (useRyeong.heuisin.exist === "Y" && useRyeong.heuisin.use === "Y") {
      result = result + getResultUse("hisinYes").contents
    }
    else {
      result = result + getResultUse("hisinNo").contents
    }
    if (useRyeong.hwakjang.exist === "Y" && useRyeong.hwakjang.use === "Y") {
      result = result + getResultUse("hwakjangYes").contents
    }
    else {
      result = result + getResultUse("hwakjangNo").contents
    }
  }
  return result;
};
function getResultBasic(title) {
  let result;
  for (let i = 0; i < basicFile.contentsList.length; i++) {
    if (title === basicFile.contentsList[i].title) {
      result = basicFile.contentsList[i];
      break;
    }
  }
  return result;
}
function getResultUse(title) {
  let result;
  for (let i = 0; i < usesFile.contentsList.length; i++) {
    if (title === usesFile.contentsList[i].title) {
      result = usesFile.contentsList[i];
      break;
    }
  }
  return result;
}
module.exports = Sangsin;
