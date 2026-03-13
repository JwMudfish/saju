var Indon = {};

var title = "sangsin_compliment";
var num;
var totalTitle;
const resultTest = require('../testResult/contents_sangsin_compliment.json');
let options;
Indon.randum = function () {
  self();
  return getResult(totalTitle);
};
const self = () => {
  if (useShgj.gukgubun === "길격") {
    totalTitle =
      title +
      getGoodWrong(
        useShgj.sangsin.exist,
        useShgj.sangsingisin.exist,
        useShgj.gusin.exist,
        useShgj.gukgisin.exist
      );
  } else if (useShgj.gukgubun === "흉격") {
    totalTitle =
      title +
      Number(
        getGoodWrong(
          useShgj.sangsin.exist,
          useShgj.sangsingisin.exist,
          useShgj.gusin.exist,
          useShgj.gusingisin.exist
        ) + 16
      );
  } else {
  }
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
function getGoodWrong(sangsin, sangisin, one, other) {
  let result;
  if (sangsin === "Y" && sangisin === "Y" && one === "Y" && other === "Y") {
    result = 1;
  } else if (
    sangsin === "Y" &&
    sangisin === "Y" &&
    one === "Y" &&
    other === "N"
  ) {
    result = 2;
  } else if (
    sangsin === "Y" &&
    sangisin === "Y" &&
    one === "N" &&
    other === "Y"
  ) {
    result = 3;
  } else if (
    sangsin === "Y" &&
    sangisin === "Y" &&
    one === "N" &&
    other === "N"
  ) {
    result = 4;
  } else if (
    sangsin === "Y" &&
    sangisin === "N" &&
    one === "Y" &&
    other === "Y"
  ) {
    result = 5;
  } else if (
    sangsin === "Y" &&
    sangisin === "N" &&
    one === "Y" &&
    other === "N"
  ) {
    result = 6;
  } else if (
    sangsin === "Y" &&
    sangisin === "N" &&
    one === "N" &&
    other === "Y"
  ) {
    result = 7;
  } else if (
    sangsin === "Y" &&
    sangisin === "N" &&
    one === "N" &&
    other === "N"
  ) {
    result = 8;
  } else if (
    sangsin === "N" &&
    sangisin === "Y" &&
    one === "Y" &&
    other === "Y"
  ) {
    result = 9;
  } else if (
    sangsin === "N" &&
    sangisin === "Y" &&
    one === "Y" &&
    other === "N"
  ) {
    result = 10;
  } else if (
    sangsin === "N" &&
    sangisin === "Y" &&
    one === "N" &&
    other === "Y"
  ) {
    result = 11;
  } else if (
    sangsin === "N" &&
    sangisin === "Y" &&
    one === "N" &&
    other === "N"
  ) {
    result = 12;
  } else if (
    sangsin === "N" &&
    sangisin === "N" &&
    one === "Y" &&
    other === "Y"
  ) {
    result = 13;
  } else if (
    sangsin === "N" &&
    sangisin === "N" &&
    one === "Y" &&
    other === "N"
  ) {
    result = 14;
  } else if (
    sangsin === "N" &&
    sangisin === "N" &&
    one === "N" &&
    other === "Y"
  ) {
    result = 15;
  } else if (
    sangsin === "N" &&
    sangisin === "N" &&
    one === "N" &&
    other === "N"
  ) {
    result = 16;
  }
  return result;
}

module.exports = Indon;
