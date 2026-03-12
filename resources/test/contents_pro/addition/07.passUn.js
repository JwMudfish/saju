var ironwall = {};

var totalTitle;
const one = require('./07.passUn/one');
const two = require('./07.passUn/two');
const three = require('./07.passUn/three');
const oneTwo = require('./07.passUn/onetwo');
const manseTool = require('../../../manseUtil/chunJiji/checkWord')
const ryeongUtil = require('../../../manseUtil/ryeong/ryeongUtil');
var moment = require("moment");
const { isObject } = require('mongoose/lib/utils');
let options;
ironwall.randum = function () {
  let result = self()

  return result;
};
const self = () => {
  let result={};
  let oneResult =checkOne()
  let twoResult = two.two()
  let threeResult = three.three()
  let oneTwoResult = oneTwo.one()

  if(Object.keys(oneResult).length ===0 &&Object.keys(twoResult).length ===0 ){
    result=checkPassFuture(threeResult)
  }
  else  if(Object.keys(oneResult).length ===0 ){
    result=checkPassFuture(twoResult)
  }
  else  if(Object.keys(twoResult).length ===0 ){
    result= checkPassFuture(oneResult)
  }
  else {
    result=checkPassFuture(oneTwoResult)
   /* let oneSort = checkPassFuture(oneResult)
    let twoSort = checkPassFuture(twoResult)
    let passArray = [
      oneSort.pass,
      twoSort.pass
    ]

    let futureArray = [
      oneSort.future,
      twoSort.future
    ]
    passArray=passArray.sort(function(a,b){
      return a.year < b.year ? -1 : 1; 
    })
 
    futureArray=futureArray.sort(function(a,b){
      return a.year < b.year ? -1 : 1; 
    })

    result={
      pass:passArray[passArray.length-1],
      future:futureArray[0],
      future2:futureArray[1]
    } */
  }
  return result
  
};

const checkPassFuture = (obj) =>{
  let result={};
  const start = Number(moment().format("YYYY"));
  let pass={}
  let future ={}
  let future2 ={}
  for(let i=0; i<obj.year.length; i++){
      if(Number(obj.year[i])>=start){
        // 미래
        if(obj.year[i]%2===0){
          if(obj.year[i+1]===undefined){
            future.year=[obj.year[i]]
            future2.year=[obj.year[i]]
            future2.keyword=obj.keyword[i]
          }
          else if(Number(obj.year[i+1])!==Number(obj.year[i])+1){
            future.year=[obj.year[i]]
            future2=checkfuture2(obj,i+1)
          }
          else {
            future.year=[obj.year[i],obj.year[i+1]]
            if(obj.year[i+2]===undefined){
              future2=checkfuture2(obj,i+1)
            }
            else {
              future2=checkfuture2(obj,i+2)
            }

          }
          future.keyword=obj.keyword[i]
        }
        else {
          if(obj.year[i-1]===undefined){
            future.year=[obj.year[i]]
            if(obj.year[i+1]===undefined){
              future2=checkfuture2(obj,i)
            }
            else {
              future2=checkfuture2(obj,i+1)
            }
          }
          else if(Number(obj.year[i-1])!==Number(obj.year[i])-1){
            future.year=[obj.year[i]]
            future2=checkfuture2(obj,i+1)
          }
          else {
            future.year=[obj.year[i-1],obj.year[i]]
            future2=checkfuture2(obj,i+1)
          }
          future.keyword=obj.keyword[i]
        }
        // 과거
        if(obj.year[i-1]%2===0){
          if(obj.year[i-1]===undefined){
            pass.year=[obj.year[i]]

          }
          if(Number(obj.year[i-1])!==Number(obj.year[i])-1){
            pass.year=[obj.year[i-1]]
          }
          else {
            pass.year=[obj.year[i-1],obj.year[i]]
          }
          pass.keyword=obj.keyword[i-1]
        }
        else {
          if(obj.year[i-2]===undefined && obj.year[i-1]===undefined){
            pass.year=[obj.year[i-1]]
            pass.keyword=obj.keyword[i-1]
          }
          else if(obj.year[i-1]===undefined){
            pass.year=[obj.year[i]]
            pass.keyword=obj.keyword[i]
          }
          else if(Number(obj.year[i-2])!==Number(obj.year[i-1])-1){
            pass.year=[obj.year[i-2]]
            pass.keyword=obj.keyword[i-2]
          }
          else {
            pass.year=[obj.year[i-2],obj.year[i-1]]
            pass.keyword=obj.keyword[i-1]
          }
        }
        break;
      }
  }
  result.future=future;
  result.future2=future2;
  result.pass=pass
  return result
}

const checkfuture2 = (obj,index) => {
  let future= {}
      // 미래
      if(obj.year[index]%2===0){
        if(obj.year[index+1]===undefined){
          future.year=[obj.year[index]]
        }
        else if(Number(obj.year[index+1])!==Number(obj.year[index])+1){
          future.year=[obj.year[index]]
        }
        else {
          future.year=[obj.year[index],obj.year[index+1]]
        }
        
        future.keyword=obj.keyword[index]
      }
      else {
        if(obj.year[index-1]===undefined){
          future.year=[obj.year[index]]
        }
        else if(Number(obj.year[index-1])!==Number(obj.year[index])-1){
          future.year=[obj.year[index]]
        }
        else {
          future.year=[obj.year[index-1],obj.year[index]]
        }
        future.keyword=obj.keyword[index]
      }
      let result= {}
      result = future
      return result;
}

const checkOne = () =>{
  let result={};
  const ryeong = ryeongUtil.ryeongCollection()
  if(manseTool.checkALL(ryeong.heuisin)==='Y' &&
  (manseTool.checkGangGuanPossible(ryeong.hwakjang)==='Y'||
  manseTool.checkChunGan(ryeong.hwakjang)==='Y')&&
  manseTool.checkALL(ryeong.jisok)==='Y'){
    result=one.one()
  }

 return result;
}

module.exports = ironwall;
