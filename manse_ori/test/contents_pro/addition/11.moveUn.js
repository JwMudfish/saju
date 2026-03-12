var ironwall = {};
const manseTool = require('../../../manseUtil/chunJiji/checkWord')
const wolFunc = require('../../../manseUtil/element/wol/wolElememtRange')
const yearFunc = require('../../../manseUtil/element/seun/seunElememtRange')
const ryeongFunc = require('../../../manseUtil/ryeong/ryeongUtil')
const gungFunc = require('../../../manseUtil/gungShgj/gungshgjUtil')
const keyword = require('../../../testResult/contents_pro_report/addition/11.moveUn/11.moveUn.json')

const checkChung = require('../../../manseUtil/hapchung/samhapUtil')
var moment = require("moment");
ironwall.randum = function () {
  let result = self()

  return result;
};
const self = () => {
  let result=[];
  let one =checkChange();
  let two =checkImprovement();
  let three =checkAvoiding();
  let temp=[]
  temp.push(one)
  temp.push(two)
  if(Object.keys(three).length !==0){
    temp.push(three)
  }
  let aa =[]
  for(let i =0 ; i< temp.length;i++) {
    for(let j =0; j<temp[i].length; j++){
      if(Object.keys(temp[i][j]).length!==0){
        aa.push(temp[i][j])
      }
    }
  }
  aa.sort(function(a,b){
    let result = 1
    if(Number(a.year) < Number(b.year)) {
      result=-1
    }
    else if(Number(a.year)  ===Number(b.year)){
      if(Number(a.month) < Number(b.month)){
        result=-1
      }
    }
    return result; 
  })
  let cc = []
  const year = Number(moment().format("YYYY"))
  for(let i =0 ;i<aa.length;i++){
    if(aa[i].year>=year){
      cc.push(aa[i-1])
      cc.push(aa[i])
      cc.push(aa[i+1])
      break
    }
  }
  result=[cc[0],cc[1],cc[2]]
  return result
}
const checkAvoiding =() =>{
  let result=[];
  let now=[];
  const nowStart = Number(moment().format("YYYY"));
  let nowWord=yearFunc.elementRangeWordJiJi(nowStart);
  let pass=[];
  const passStart = Number(moment().format("YYYY"))-10;
  let passWord=yearFunc.elementRangeWord(passStart);
  let furture=[];
  const furtureStart = Number(moment().format("YYYY"))+10;
  let furtureWord=yearFunc.elementRangeWord(furtureStart);
  nowWord.sort(function(a,b){
    return a.year < b.year ? -1 : 1; 
  })
  passWord.sort(function(a,b){
    return a.year < b.year ? -1 : 1; 
  })
  furtureWord.sort(function(a,b){
    return a.year < b.year ? -1 : 1; 
  })

  now = checkAvd(nowWord)
  pass = checkAvd(passWord)
  furture = checkAvd(furtureWord)
  result.push(now)
  result.push(pass)
  result.push(furture)
  return result;
}

const checkAvd = (word) => {
  let result ={}
  let gung =gungFunc.gungShgjCollection()
  if(manseTool.checkALL(gung.sangsin)==='N'){
    for(let i =0 ;i<word.length; i++) {
      let temp ={}
      temp.word='회피'
      if(word[i].yuksin==='비견' ||
      word[i].yuksin==='겁재'){
        temp.year=word[i].year
        let wol = wolFunc.elementRangeWord(word[i].year)
        for (let j =0 ; j<wol.length; j++) {
          if(wol[j].yuksin[0]==='비견' ||
          wol[j].yuksin[0]==='겁재') {
            temp.month=wol[j].month
            temp.keyword=getResult('avoid',keyword).contents
            result=temp;
            break;          }
        }
      }
  }
  }
  return result;
}

const checkChange =() =>{
  let result=[];
  let now=[];
  const nowStart = Number(moment().format("YYYY"));
  let nowWord=yearFunc.elementRangeWordJiJi(nowStart);
  let pass=[];
  const passStart = Number(moment().format("YYYY"))-10;
  let passWord=yearFunc.elementRangeWord(passStart);
  let furture=[];
  const furtureStart = Number(moment().format("YYYY"))+10;
  let furtureWord=yearFunc.elementRangeWord(furtureStart);
  nowWord.sort(function(a,b){
    return a.year < b.year ? -1 : 1; 
  })
  passWord.sort(function(a,b){
    return a.year < b.year ? -1 : 1; 
  })
  furtureWord.sort(function(a,b){
    return a.year < b.year ? -1 : 1; 
  })

  now = checkChg(nowWord)
  pass = checkChg(passWord)
  furture = checkChg(furtureWord)
  result.push(now)
  result.push(pass)
  result.push(furture)
  return result;
}

const checkChg = (word) => {
  let result= {}
  for(let i =0 ;i<word.length; i++) {
    let temp = {}
    temp.word = "환경변화"
    if(checkChung.checkChungWolJiSpecificJiJiYN(word[i].word[1])==='Y'){
      temp.year=word[i].year
      let wol = wolFunc.elementRangeWord(word[i].year)
      for (let j =0 ; j<wol.length; j++) {
        if(checkChung.checkChungWolJiSpecificJiJiYN(wol[j].word[1])==='Y') {
          temp.month=wol[j].month
          temp.keyword=getResult('change',keyword).contents
          result=temp
          break;
        }
      }
    }
}

return result;
}

const checkImprovement = () => {
  let total = []
  let now=[];
  const nowStart = Number(moment().format("YYYY"));
  let nowWord=yearFunc.elementRangeWord(nowStart);
  let pass=[];
  const passStart = Number(moment().format("YYYY"))-10;
  let passWord=yearFunc.elementRangeWord(passStart);
  let furture=[];
  const furtureStart = Number(moment().format("YYYY"))+10;
  let furtureWord=yearFunc.elementRangeWord(furtureStart);
 
  nowWord.sort(function(a,b){
    return a.year < b.year ? -1 : 1; 
  })
  passWord.sort(function(a,b){
    return a.year < b.year ? -1 : 1; 
  })
  furtureWord.sort(function(a,b){
    return a.year < b.year ? -1 : 1; 
  })
  now = checkimp(nowWord)
  pass = checkimp(passWord)
  furture = checkimp(furtureWord)
  total.push(now)
  total.push(pass)
  total.push(furture)
  return total;
}
const checkimp = (word) => {
  let result ={};
  let ryeong =ryeongFunc.ryeongCollection()
  for(let i =0 ;i<word.length; i++) {
    let temp={};
    temp.word = "환경개선"
      if(word[i].word[0]===ryeong.yongsin){
        temp.year=word[i].year
        let wol = wolFunc.elementRangeWord(word[i].year)
        for (let j =0 ; j<wol.length; j++) {
          if(wol[j].word[0]===ryeong.yongsin){
            temp.month=wol[j].month
              if(  manseTool.checkALL(ryeong.heuisin)==='Y') {
                temp.keyword=getResult('Improvement1',keyword).contents
              }
              else {
                temp.keyword=getResult('Improvement2',keyword).contents
              }
          }
        }
        result=temp
        break;
      }
  }

  return result;
}

function getResult(title, word) {
  let result;
  for (let i = 0; i < word.contentsList.length; i++) {
    if (title === word.contentsList[i].title) {
      result = word.contentsList[i];
      break;
    }
  }
  return result;
}


module.exports = ironwall;
