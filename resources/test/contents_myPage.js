var Spanding_mind = {};

const resultTest = require('../testResult/contents_myPage/contents_myTitle.json');
const umYangFunc = require("../manseUtil/umYangOHang/umYang")
const gunFunc = require("../manseUtil/gun")
Spanding_mind.randum = function () {
  let result = self()
  return result;
};
const self = () => {
  let result = {
    title: "",
    jukSung: 0,
    potention: 0,
    power: 0,
    treatment: 0,

  }
  result.title = getTitle()
  result.jukSung = getJuksung()
  result.potention = getPotention()
  result.power = getPower()
  result.treatment = getTreatment()
  return result;
};
const getTitle = () => {
  let result = getGyeokTitle() + " " + getYongsinTitle()
  return result;
}

const getTreatment =() =>{
  let result =5;
    if(useShgj.sangsin.exist==='Y'&&getGyoukGun()===true){
      result =10
    }
    else if(getGyoukGun()===true){
      result =8
    }
    else if(useShgj.gusin.exist==='Y'){
      result =6
    }
    else if(umYangFunc.umYang(usePillar.d_sky, 1) === '음'){
      result =4
    }
    else if(useBasicFunc.rootTong.totalRoot === 'king_root' ){
      result =2
    }
    return result;
}

const getGyoukGun =() => {
  let result=false;
  if(getJungPyeonGyeok()==='정'&&
  gunFunc.gun()==='근약'
  ){
    result=true;
  }
  else   if(getJungPyeonGyeok()==='편'&&
  gunFunc.gun()==='근왕'
  ){
    result=true;
  }
  return result;
}

const getJungPyeonGyeok = () => {
  let result='';
  if(useGyouk==="상관격"||
  useGyouk==="정관격"||
  useGyouk==="정재격"||
  useGyouk==="정인격"||
  useGyouk==="건록격"){
    result='정'
  }
  else if(useGyouk==="식신격"||
  useGyouk==="편관격"||
  useGyouk==="편재격"||
  useGyouk==="편인격"||
  useGyouk==="양인격"){
    result='편'
  }

  return result;

}

const getPower = () => {
  let result = 5;

  let yuksinChunGan = [
    useYuksin.y_sky,
    useYuksin.m_sky,
    useYuksin.d_sky,
    useYuksin.h_sky
  ]
  let yuksinJiJangGang = [
    useYuksin.y_jangan.y_jangan1,
    useYuksin.y_jangan.y_jangan2,
    useYuksin.y_jangan.y_jangan3,
    useYuksin.m_jangan.m_jangan1,
    useYuksin.m_jangan.m_jangan2,
    useYuksin.m_jangan.m_jangan3,
    useYuksin.d_jangan.d_jangan1,
    useYuksin.d_jangan.d_jangan2,
    useYuksin.d_jangan.d_jangan3,
  ]
  const used = [
    usejijangganUse.yong.y_land.y_jangan1,
    usejijangganUse.yong.y_land.y_jangan2,
    usejijangganUse.yong.y_land.y_jangan3,
    usejijangganUse.yong.m_land.m_jangan1,
    usejijangganUse.yong.m_land.m_jangan2,
    usejijangganUse.yong.m_land.m_jangan3,
    usejijangganUse.yong.d_land.d_jangan1,
    usejijangganUse.yong.d_land.d_jangan2,
    usejijangganUse.yong.d_land.d_jangan3,
    usejijangganUse.yong.h_land.h_jangan1,
    usejijangganUse.yong.h_land.h_jangan2,
    usejijangganUse.yong.h_land.h_jangan3,
  ]
  let siksinSangGuanChunGan = []
  let siksinSangGuanJangGan = []
  let pyeonGuan = []

  for (let i = 0; i < yuksinChunGan.length; i++) {
    if (yuksinChunGan[i] === '식신' ||
      yuksinChunGan[i] === '상관') {
      siksinSangGuanChunGan.push(yuksinChunGan[i])
    }
    if(yuksinChunGan[i] === '편관' ){
      pyeonGuan.push(yuksinChunGan[i])
    }
    
  }
  for (let i = 0; i < yuksinJiJangGang.length; i++) {
    if (String(used[i]).includes('young') ||
      String(used[i]).trim() === '' ||
      used[i] === undefined) {
      if (yuksinJiJangGang[i] === '식신' ||
        yuksinJiJangGang[i] === '상관') {
        siksinSangGuanJangGan.push(yuksinJiJangGang[i])
      }
      if(yuksinJiJangGang[i] === '편관'){
        pyeonGuan.push(yuksinJiJangGang[i])
      }
    }
  }

  if (siksinSangGuanChunGan.length === 0) {
    result = 10
  }
  else if (siksinSangGuanChunGan.length === 1) {
    if (umYangFunc.umYang(usePillar.d_sky, 1) === '양') {
      result = 8
    }
    else {
      result = 6
    }
  }
  else if (umYangFunc.umYang(usePillar.d_sky, 1) === '음'&&
  (siksinSangGuanChunGan.length+
    siksinSangGuanJangGan.length)>=2) {
      result = 4
  }
  else if (umYangFunc.umYang(usePillar.d_sky, 1) === '음'&&
  ((siksinSangGuanChunGan.length+
    siksinSangGuanJangGan.length)>=2)&&pyeonGuan.length>=1) {
      result = 2
  }
  return result;
}

const getPotention = () => {
  let result = 4
  if (useRyeong.heuisin.exist === 'Y' &&
    useRyeong.jisok.exist === 'Y' &&
    useRyeong.hwakjang.exist === 'Y') {
    result = 10
  }
  else if (useRyeong.jisok.exist === 'Y' &&
    useRyeong.hwakjang.exist === 'Y') {
    result = 8
  }
  else if (checkJisokHwakjang() === "Y") {
    result = 6
  }

  return result;
}

const checkJisokHwakjang = () => {
  let result = "N"
  if (useRyeong.yongsin == "계" ||
    useRyeong.yongsin == "갑" ||
    useRyeong.yongsin == "정" ||
    useRyeong.yongsin == "경") {
    if (useRyeong.jisok.exist === 'Y') {
      result = "Y"
    }
  }
  else if (useRyeong.yongsin == "을" ||
    useRyeong.yongsin == "병" ||
    useRyeong.yongsin == "신" ||
    useRyeong.yongsin == "임") {
    if (useRyeong.hwakjang.exist === 'Y') {
      result = "Y"
    }
  }
  result = 'N'
}
const getJuksung = () => {
  let result = 3;
  for (let i = 0; i < useRyeong.heuisin.position.length; i++) {
    if (useRyeong.heuisin.position[i].includes('jangan') &&
      useRyeong.heuisin.use[i] === 'y') {
      if (useRyeong.heuisin.position[i].includes('_sky') &&
        useRyeong.heuisin.use[i] === 'y') {
        result = 10
      }
      else {
        result = 8
      }
    }
    else if (useRyeong.heuisin.position[i].includes('_sky') &&
      useRyeong.heuisin.use[i] === 'y') {
      result = 7
    }
    else if ((useRyeong.um_heuisin_gisin.exist[i] === 'Y' &&
      useRyeong.um_heuisin_gisin.use[i] === 'y') ||
      (useRyeong.geuk_heuisin_gisin.exist[i] === 'Y' &&
        useRyeong.geuk_heuisin_gisin.use[i] === 'y')) {
      result = 5
    }
  }
  return result;
}

const getGyeokTitle = () => {
  let result = ''
  let changeGyouk = new Map()
  changeGyouk.set("정관격", "jungGuan")
  changeGyouk.set("정재격", "jungJe")
  changeGyouk.set("정인격", "jungIn")
  changeGyouk.set("식신격", "siksin")
  changeGyouk.set("편재격", "pyeonJe")
  changeGyouk.set("편인격", "pyeonIn")
  changeGyouk.set("편관격", "pyeonGuan")
  changeGyouk.set("상관격", "sangGuan")
  changeGyouk.set("양인격", "yangIn")
  changeGyouk.set("건록격", "gunLok")
  let title = changeGyouk.get(useGyouk)
  result = getResult(title).contents
  return result;
}

const getYongsinTitle = () => {
  let result = ''
  let changeGyouk = new Map()
  changeGyouk.set("계", "gyeSu")
  changeGyouk.set("갑", "gabMok")
  changeGyouk.set("을", "ulMok")
  changeGyouk.set("병", "bungHwa")
  changeGyouk.set("정", "jungHwa")
  changeGyouk.set("경", "gyeongGum")
  changeGyouk.set("신", "sinGum")
  changeGyouk.set("임", "limSu")
  let title = changeGyouk.get(useRyeong.yongsin)
  result = getResult(title).contents
  return result;
}
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
module.exports = Spanding_mind;
