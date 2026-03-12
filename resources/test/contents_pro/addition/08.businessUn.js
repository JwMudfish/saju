var ironwall = {};
const manseToolYuksin = require('../../../manseUtil/chunJiji/checkYuksin')
const manseTool = require('../../../manseUtil/chunJiji/checkWord')
const gun = require('../../../manseUtil/gun')
const func = require('./08.businessUn/busnessUn')
var moment = require("moment");
ironwall.randum = function () {
  let result = self()

  return result;
};
const self = () => {
  let result={};
  const start = Number(moment().format("YYYY"));
  
  if(conditionCheck()>=2){
    result=func.businessYes(start)
  }
  else {
    result=func.businessNo(start)
  }

  return result
}

const conditionCheck =() =>{
  let result =0;
  if((manseToolYuksin.checkALL('정재')==='Y'&&manseToolYuksin.checkALL('정관')==='Y') ||
  (manseToolYuksin.checkALL('편재')==='Y'&&manseToolYuksin.checkALL('편관')==='Y')){
    result=result+1
  }
  else   if(manseToolYuksin.checkChunGan('비견')==='Y'&&manseToolYuksin.checkChunGan('겁재')==='Y'){
    result=result+1
  }
  else   if(gun.gun()==='근왕'){
    result=result+1
  }
  return result;
}

module.exports = ironwall;
