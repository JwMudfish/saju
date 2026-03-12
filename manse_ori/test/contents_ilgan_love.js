var ilgan = {};
var title = 'ilgan_lovetype_';
var num;
var totalTitle;
// num = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
const ilganLove = require('./contents_ilgan_lovetype');
const dash = require('./contents_dash');
const dashplace = require('./contents_dash_place');

ilgan.randum = function (test) {
  let result ={
    lovetype:ilganLove.randum(),
    dash:dash.randum(),
    dashplace:dashplace.randum(),
  }
  return result;
};

module.exports = ilgan;
