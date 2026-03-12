var Doljabi = {};
var title = "gyouk_";
var num;
var totalTitle;
// num = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
const resultTest = require('../../testResult/contents_gyoukSimple.json');
Doljabi.randum = function () {
  let result={
    title:'',
    contents:''
  }
  let temp = self();
  result.title=temp.subtitle
  result.contents=
  "우리가 사람들과 관계를 맺으면서 가장 중요한 첫인상은 사실 자연스러운 나를 보여 줬을 때예요. 이러한 모습은 가식이 섞이지 않은 참된 나의 모습을 보여 줬을 때예요 "
  + temp.contents
  return result ;
};

//일단 사용가능하든 안하든 있으면 있는거고
//없으면 없는걸루
const self = () => {
  let result={};
  if (useGyouk === "정관격") {
    result=getResult("jungGuan")
  } else if (useGyouk === "편관격" ) {
    result=getResult("pyeonGuan")
  } else if (useGyouk === "정인격" ) {
    result=getResult("jungIn")
  } else if (useGyouk === "편인격" ) {
    result=getResult("pyeonIn")
  } else if (useGyouk === "정재격") {
    result=getResult("jungJe")
  } else if (useGyouk === "편재격" ) {
    result=getResult("pyeonje")
  } else if (useGyouk === "상관격") {
    result=getResult("sangGuan")
  } else if (useGyouk === "식신격") {
    result=getResult("siksin")
  } else if (useGyouk === "건록격") {
    result=getResult("gunlok")
  } else if (useGyouk === "양인격") {
    result=getResult("yangin")
  }

  return result;
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
module.exports = Doljabi;
