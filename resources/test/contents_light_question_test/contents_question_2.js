var Doljabi = {};
const yongsin = require('../../testResult/contents_light_question/q2/q2_yongsin.json');
const gyeok = require('../../testResult/contents_light_question/q2/q2_ilgan.json');
Doljabi.randum = function () {
  let result='';
  result=self();
  return result;
};

const self = () => {
  let result;
  result='내가 보여지고 싶은 모습은 일간인 '+getIlganName()+'일간으로 확인 가능합니다.'+getIlgan()+
  '명심해야 하는 것은 두 가지의 '+getYongSinName()+'월령과 '+getIlganName()+'일간의 복합적인 모습으로 지금의 내가 비춰집니다.'
  return result
};

const getIlganName = () => {
  let result = '';
  if(usePillar.d_sky==='갑'){
    result='갑목'
  }
  else   if(usePillar.d_sky==='을'){
    result='을목'
  }
  else   if(usePillar.d_sky==='병'){
    result='병화'
  }
  else   if(usePillar.d_sky==='정'){
    result='정화'
  }
  else   if(usePillar.d_sky==='무'){
    result='무토'
  }
  else   if(usePillar.d_sky==='기'){
    result='기토'
  }
  else   if(usePillar.d_sky==='경'){
    result='경금'
  }
  else   if(usePillar.d_sky==='신'){
    result='신금'
  }
  else   if(usePillar.d_sky==='임'){
    result='임수'
  }
  else   if(usePillar.d_sky==='계'){
    result='계수'
  }

  return result
}

const getYongSinName = () => {
  let result = '';
  if(useRyeong.yongsin==='갑'){
    result='갑목'
  }
  else   if(useRyeong.yongsin==='을'){
    result='을목'
  }
  else   if(useRyeong.yongsin==='병'){
    result='병화'
  }
  else   if(useRyeong.yongsin==='정'){
    result='정화'
  }
  else   if(useRyeong.yongsin==='경'){
    result='경금'
  }
  else   if(useRyeong.yongsin==='신'){
    result='신금'
  }
  else   if(useRyeong.yongsin==='임'){
    result='임수'
  }
  else   if(useRyeong.yongsin==='계'){
    result='계수'
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

const getIlgan = () => {
  let result =''
  if (usePillar.d_sky==='갑') {
    result=getResultIlgan("gapMok").contents
  } else if (usePillar.d_sky==='을') {
    result=getResultIlgan("ulMok").contents
  } else if (usePillar.d_sky==='병') {
    result=getResultIlgan("byeongHwa").contents
  } else if (usePillar.d_sky==='정') {
    result=getResultIlgan("jungHwa").contents
  } else if (usePillar.d_sky==='무') {
    result=getResultIlgan("muTo").contents
  } else if (usePillar.d_sky==='기') {
    result=getResultIlgan("giTo").contents
  } else if (usePillar.d_sky==='경') {
    result=getResultIlgan("gyeongGum").contents
  } else if (usePillar.d_sky==='신') {
    result=getResultIlgan("sinGum").contents
  } else if (usePillar.d_sky==='임') {
    result=getResultIlgan("limsu").contents
  } else if (usePillar.d_sky==='계') {
    result=getResultIlgan("gyeSu").contents
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

function getResultIlgan(title) {
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
