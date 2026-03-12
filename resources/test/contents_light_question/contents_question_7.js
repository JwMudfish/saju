var Sangsin = {};

const hiYongGun = require('../../testResult/contents_hiYongGun.json');
const checkHiYong = require('../../manseUtil/hiyong/hiyongUtil')
let useFolder;
let options;
Sangsin.randum = function () {
  let result = {
    title: '',
    contents: '',
  };
  result.title = '타이틀 준비중',
    result.contents = self()
  return result;
};
const self = () => {
  let result = '';
  result = "일간은 나의 태도와 사회에 참여의지를 나타내요. \n\n첫 번째로 참여의지인"+checkHi()
  +'\n\n'+"두 번째로"+checkYong()+'\n\n'+"다음으로는 태도로 사람들과 관계에 대해 어떻게 생각하는가 나타나요.\n\n"+checkGunWangYak()

  return result;
};

const checkHi = () =>{
  let result=''
  if(  checkHiYong.checkHiYN()==='Y'){
    result=getResult('hiYes').contents
  }
   else {
    result=getResult('hiNo').contents
   }
  return result
}
const checkYong = () =>{
  let result=''
  if(  checkHiYong.checkYongYN()==='Y'){
    result=getResult('yongYes').contents
  }
   else {
    result=getResult('yongNo').contents
   }
  return result
}

const checkGunWangYak = () => {
  let result=''
    if(useBasicFunc.rootTong.totalRoot === 'king_root' || useBasicFunc.rootTong.totalRoot === 'pure_root'){
      result=getResult('gunWang').contents
    }
    else {
      result=getResult('gunYak').contents
    }
    return result
}
function getResult(title) {
  let result;
  for (let i = 0; i < hiYongGun.contentsList.length; i++) {
    if (title === hiYongGun.contentsList[i].title) {
      result = hiYongGun.contentsList[i];
      break;
    }
  }
  return result;
}

module.exports = Sangsin;
