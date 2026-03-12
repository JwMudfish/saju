var bf = {};
var title = "relation_";
var num;
var totalTitle;
// num = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
bf.randum = function (test, partner_gyouk) {
  self(test, partner_gyouk);
  return totalTitle;
};
const self = (test, partner_gyouk) => {
  let num = 999;
  if (useGyouk === "식신격" || useGyouk === "주왕 식신격") {
    num = 0;
  } else if (useGyouk === "편인격" || useGyouk === "주왕 편인격") {
    num = 10;
  } else if (useGyouk === "정관격" || useGyouk === "주왕 정관격") {
    num = 20;
  } else if (useGyouk === "정인격" || useGyouk === "주왕 정인격") {
    num = 30;
  } else if (useGyouk === "정재격" || useGyouk === "주왕 정재격") {
    num = 40;
  } else if (useGyouk === "편재격" || useGyouk === "주왕 편재격") {
    num = 50;
  } else if (useGyouk === "편관격" || useGyouk === "주왕 편관격") {
    num = 60;
  } else if (useGyouk === "상관격" || useGyouk === "주왕 상관격") {
    num = 70;
  } else if (useGyouk === "건록격" || useGyouk === "주왕 건록격") {
    num = 80;
  } else if (useGyouk === "양인격" || useGyouk === "주왕 양인격") {
    num = 90;
  }
  getDBName(partner_gyouk, num);
};
function getDBName(gyouk, num) {
  if (gyouk === "정관격") {
    totalTitle = title + Number(1 + num);
  } else if (gyouk === "편관격") {
    totalTitle = title + Number(2 + num);
  } else if (gyouk === "정인격") {
    totalTitle = title + Number(3 + num);
  } else if (gyouk === "편인격") {
    totalTitle = title + Number(4 + num);
  } else if (gyouk === "정재격") {
    totalTitle = title + Number(5 + num);
  } else if (gyouk === "편재격") {
    totalTitle = title + Number(6 + num);
  } else if (gyouk === "식신격") {
    totalTitle = title + Number(7 + num);
  } else if (gyouk === "상관격 ") {
    totalTitle = title + Number(8 + num);
  } else if (gyouk === "건록격") {
    totalTitle = title + Number(9 + num);
  } else if (gyouk === "양인격") {
    totalTitle = title + Number(10 + num);
  }
}

module.exports = bf;
