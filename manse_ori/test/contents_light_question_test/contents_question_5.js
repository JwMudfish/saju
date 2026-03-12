var Sangsin = {};

const gilHungMainText = require('../../testResult/contents_gungGilHung/contents_gungGilHung.json');
let defaultGilFile = '../../testResult/contents_gungGilHung/gil'
let defaultHungFile = '../../testResult/contents_gungGilHung/hung'

Sangsin.randum = function () {
  let result = {
    title: '타이틀 준비중',
    contents: self(),
  };
  return result;
};
const self = () => {
  let result = '';
  if(useShgj.gukgubun==='길격'){
    result=gilHungMainText.contentsList[0].contents+'\n\n'+getGilGyeok(defaultGilFile)
  }
  else {
    result=gilHungMainText.contentsList[0].contents+'\n\n'+getHungGyeok(defaultHungFile)
  }
  return result;
};

//// 흉격
const getHungGyeok= (fileRoot) => {
  let result='';
  let folder = require(fileRoot + "/contents_sangsin.json")
  // 상신있음
  if(useShgj.sangsin.exist.includes('Y') &&
  useShgj.sangsin.use.includes('Y')){
    result=getResult("hungSangSinYes",folder).contents +getHungSangsinGisinYN(fileRoot+'/contents_sangsinYes')
  }
  // 상신없음
  else {
    result=getResult("hungSangSinNo",folder).contents+getHungSangsinGisinYN(fileRoot+'/contents_sangsinNo')
  }
  return result;
}

const getHungSangsinGisinYN= (fileRoot) => {
  let result='';
  let folder = require(fileRoot + "/contents_sangsinGisin.json")
  let gusinRoot='';
  if(useShgj.sangsingisin.exist.includes('Y') &&
  useShgj.sangsingisin.use.includes('Y')){
    //상신기신 있음
    result='\n\n'+getResult("sangsinGisinYes",folder).contents
    gusinRoot= fileRoot+'/contents_SangsinGisinYes'
  }
  else {
    // 상신기신 없음
    result='\n\n'+getResult("sangsinGisinNo",folder).contents
    gusinRoot=fileRoot+'/contents_SangsinGisinNo'
  }

  if(useShgj.sangsin.exist.includes('Y') &&
  useShgj.sangsin.use.includes('Y')){
    // 상신이 있을경우 구신글 불러오기 시작
    result=result+getHungGusinYN(gusinRoot)
  }
  else {
    // 아닌경우 상신기신에서 끝 
  }
  return result;
}

const getHungGusinYN= (fileRoot) => {
  let result='';
  let folder = require(String(fileRoot)+ "/contents_gusin.json")
  if(useShgj.gusin.exist.includes('Y') &&
  useShgj.gusin.use.includes('Y')){
    //구신 있음
    result='\n\n'+getResult("gusinYes",folder).contents+getGusinGisinYN(fileRoot+'/contents_GusinYes')
  }
  else {
  //구신 없음 (구신이 없는경우 구신기신이 보이지 않음)
    result='\n\n'+getResult("gusinNo",folder).contents
  }
  return result;
}

const getGusinGisinYN= (fileRoot) => {
  let result='';
  let folder = require(fileRoot + "/contents_gusinGisin.json")
  if(useShgj.gusingisin.exist.includes('Y') &&
  useShgj.gusingisin.use.includes('Y')){
    //구신기신 있음
    result='\n\n'+getResult("gusingisinYes",folder).contents
  }
  else {
    //구신기신 없음 (없으면 글이 존재하지 않음)
  }
  return result;
}

///// 길격
const getGilGyeok= (fileRoot) => {
  let result='';
  let folder = require(fileRoot + "/contents_sangsin.json")
  // 상신있음
  if(useShgj.sangsin.exist.includes('Y') &&
  useShgj.sangsin.use.includes('Y')){
    result=getResult("gilSangSinYes",folder).contents +getGilSangsinGisinYN(fileRoot+'/contents_sangsinYes')
  }
  // 상신없음
  else {
    result=getResult("gilSangSinNo",folder).contents+getGilSangsinGisinYN(fileRoot+'/contents_sangsinNo')
  }
  return result;
}



const getGilSangsinGisinYN= (fileRoot) => {
  let result='';
  let folder = require(fileRoot + "/contents_sangsinGisin.json")
  if(useShgj.sangsingisin.exist.includes('Y') &&
  useShgj.sangsingisin.use.includes('Y')){
    //상신기신 있음
    result='\n\n'+getResult("sangsinGisinYes",folder).contents+getGilGusinYN(fileRoot+'/contents_SangsinGisinYes')
  }
  else {
        //상신기신 없음
    result='\n\n'+getResult("sangsinGisinNo",folder).contents+getGilGusinYN(fileRoot+'/contents_SangsinGisinNo')
  }
  return result;
}

const getGilGusinYN= (fileRoot) => {
  let result='';
  let folder = require(fileRoot + "/contents_gusin.json")
  if(useShgj.gusin.exist.includes('Y') &&
  useShgj.gusin.use.includes('Y')){
    //구신 있음
    result='\n\n'+getResult("gusinYes",folder).contents+getGyoukGisinYN(fileRoot+'/contents_GusinYes')
  }
  else {
  //구신 없음
    result='\n\n'+getResult("gusinNo",folder).contents+getGyoukGisinYN(fileRoot+'/contents_GusinNo')
  }
  return result;
}

const getGyoukGisinYN= (fileRoot) => {
  let result='';
  let folder = require(fileRoot + "/contents_gyoukGisin.json")
  if(useShgj.gukgisin.exist.includes('Y') &&
  useShgj.gukgisin.use.includes('Y')){
    //격기신 있음
    result='\n\n'+getResult("gyoukgisinYes",folder).contents
  }
  else {
    //격기신 없음
    result='\n\n'+getResult("gyoukgisinNo",folder).contents
  }
  return result;
}
function getResult(title,folder) {
  let result;
  for (let i = 0; i < folder.contentsList.length; i++) {
    if (title === folder.contentsList[i].title) {
      result = folder.contentsList[i];
      break;
    }
  }
  return result;
}
module.exports = Sangsin;
