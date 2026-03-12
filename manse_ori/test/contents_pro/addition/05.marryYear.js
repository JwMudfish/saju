var Sangsin = {};
var moment = require("moment");
const man = require('./05.marryYear/man')
const woman = require('./05.marryYear/woman')
Sangsin.randum = function () {
  let result = self()
  return result;
};

const self = () => {
  let result = {}
  const start = Number(moment().format("YYYY"));
  // const start = 2024;
  if(myManse.info.gender==='M') {
    result = man.man(start)
  }
  else if (myManse.info.gender==='F') {
   result = woman.woman(start)
  }
  return result;
};
module.exports = Sangsin;
