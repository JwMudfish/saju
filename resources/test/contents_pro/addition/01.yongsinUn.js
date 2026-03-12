var Sangsin = {};
var moment = require("moment");
const thisYear = require('../../../manseUtil/element/seun/seunElememtOneYear')
const yongsinUnFunc = require('./01.yongsinUnFunc/functionCollection')
Sangsin.randum = function () {
  let result = self()
  return result;
};

const self = () => {
  let result = '';
  const start = moment().format("YYYY");
  // const start = 2019;
  const unType=thisYear.elementOneYearRyeong(start)
  if(unType==='용신운'){
    result=yongsinUnFunc.yongsinUn()
  }
  else if (unType==='희신운'){
    result=yongsinUnFunc.heuisinUn()
  }
  else if (unType==='중화운'){
    result=yongsinUnFunc.junghwaUn()
  }
  else if (unType==='확장운'){
    result=yongsinUnFunc.hwakjangUn()
  }
  else if (unType==='지속운'){
    result=yongsinUnFunc.jisokUn()
  }
  return result;
};

module.exports = Sangsin;
