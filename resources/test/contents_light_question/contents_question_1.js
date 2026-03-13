var Doljabi = {};
var title = "yongsin_";
var num;
var totalTitle;
const yongsin = require('../../testResult/contents_light_question/q1/q1_yongsin.json');
const gyeok = require('../../testResult/contents_light_question/q1/q1_gyouk.json');
Doljabi.randum = function () {
  let result='';
  result=self();
  return result;
};

const self = () => {
  let result;
  result="사주팔자의 모든 글자가 중요한 것은 아닙니다. 가장 중요한 글자인 용신과 격국이라는 기준을 잡고 사주를 풀이해야 합니다.용신은"+
  getYongSinName()+getYongsin()+'\n'+'격국은'+useGyouk+'으로 이들은'+getGyouk()
  return result
};

const getYongSinName = () => {
  let result = '';
  if(useRyeong.yongsin==='갑'){
    result='갑목이므로 이들은'
  }
  else   if(useRyeong.yongsin==='을'){
    result='을목이므로 이들은'
  }
  else   if(useRyeong.yongsin==='병'){
    result='병화이므로 이들은'
  }
  else   if(useRyeong.yongsin==='정'){
    result='정화이므로 이들은'
  }
  else   if(useRyeong.yongsin==='경'){
    result='경금이므로 이들은'
  }
  else   if(useRyeong.yongsin==='신'){
    result='신금이므로 이들은'
  }
  else   if(useRyeong.yongsin==='임'){
    result='임수이므로 이들은'
  }

  return result
}

const getYongsin = () => {
  let result =''
  if (useRyeong.yongsin === "계") {
    result = getResultYongsin("yongsin_GyeSu").contents;
  } else if (useRyeong.yongsin === "갑") {
    result = getResultYongsin("yongsin_GapMok").contents;
  } else if (useRyeong.yongsin === "을") {
    result = getResultYongsin("yongsin_UlMok").contents;
  } else if (useRyeong.yongsin === "병") {
    result = getResultYongsin("yongsin_ByeongHwa").contents;
  } else if (useRyeong.yongsin === "정") {
    result = getResultYongsin("yongsin_JungHwa").contents;
  } else if (useRyeong.yongsin === "경") {
    result = getResultYongsin("yongsin_GyeongGum").contents;
  } else if (useRyeong.yongsin === "신") {
    result = getResultYongsin("yongsin_SinGum").contents;
  } else if (useRyeong.yongsin === "임") {
    result = getResultYongsin("yongsin_Limsu").contents;
  }
  return result;
}

const getGyouk = () => {
  let result =''
  if (useGyouk === "정관격") {
    result=getResultGyouk("jungGuan").contents
  } else if (useGyouk === "편관격" ) {
    result=getResultGyouk("pyeonGuan").contents
  } else if (useGyouk === "정인격" ) {
    result=getResultGyouk("jungIn").contents
  } else if (useGyouk === "편인격" ) {
    result=getResultGyouk("pyeonIn").contents
  } else if (useGyouk === "정재격") {
    result=getResultGyouk("jungJe").contents
  } else if (useGyouk === "편재격" ) {
    result=getResultGyouk("pyeonje").contents
  } else if (useGyouk === "상관격") {
    result=getResultGyouk("sangGuan").contents
  } else if (useGyouk === "식신격") {
    result=getResultGyouk("siksin").contents
  } else if (useGyouk === "건록격") {
    result=getResultGyouk("gunlok").contents
  } else if (useGyouk === "양인격") {
    result=getResultGyouk("yangin").contents
  }
  return result;
}
function getResultYongsin(title) {
  let result;
  for (let i = 0; i < yongsin.contentsList.length; i++) {
    if (title === yongsin.contentsList[i].title) {
      result = yongsin.contentsList[i];
      break;
    }
  }
  return result;
}

function getResultGyouk(title) {
  let result;
  for (let i = 0; i < gyeok.contentsList.length; i++) {
    if (title === gyeok.contentsList[i].title) {
      result = gyeok.contentsList[i];
      break;
    }
  }
  return result;
}
module.exports = Doljabi;
