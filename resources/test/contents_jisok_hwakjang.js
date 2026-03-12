var hisin = {};
const jisok = require('./contents_jisok');
const hwakjang = require('./contents_hwakjang');

hisin.randum = function () {
  let result = {};
  result.jisok = jisok.randum();
  result.hwakjang = hwakjang.randum();
  return result;
};
module.exports = hisin;
