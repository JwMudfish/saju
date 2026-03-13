const ryeongFunc = require('../element/seun/seunElementFunc/seunElementOneYearFunc')
const gungShgjFunc = require('../element/seun/seunElememtOneYear')
const ryeongFuncDeun = require('../element/deun/deunElementFunc/deunElementOneYearFunc')
const gungShgjFuncDeun = require('../element/deun/deunElememtOneYear')
const getBasicRange = require('../element/seun/seunElememtRange')
const getBasicRangeDeun = require('../element/deun/deunElememtRange')
const unseMergeUtil = require('../element/unseMergeUtil')
const yuksinFunc = require('../yuksin/yuksin')
exports.checkKindWordSeunChunGan = (year) => {
      let ryeong = ryeongYear(year)
      let gung = gungYear(year)
      let yuksin = yuksinYear(year)

      let result = getBasicRange.elementRangeWord(year)
      result.sort(function(a,b){
        return a.year < b.year ? -1 : 1; 
      })


      for (let i=0 ; i<result.length; i++){
        let temp = {
          ryeong:ryeong[i][1].ryeong,
          gung:gung[i],
          yuksin:yuksin[i]
        }
        Object.assign(result[i],temp)
      }
      return result
}

exports.checkKindWordDeunChunGan = () => {
  let ryeong = ryeongYearDeun()
  let gung = gungYearDeun()
  let yuksin = yuksinYearDeun()
  let result = getBasicRangeDeun.elementRangeWord()
 for (let i=0 ; i<result.length; i++){
    let temp = {
      ryeong:ryeong[i][1].ryeong,
      gung:gung[i],
      yuksin:yuksin[i]
    }
    Object.assign(result[i],temp) 
  }

  return result
}

exports.checkKindWordJiJi= (year) => {
  let result = getBasicRange.elementRangeWordJiJi(year)
  result.sort(function(a,b){
    return a.year < b.year ? -1 : 1; 
  })
  return result
}

const ryeongYear = (year) =>{
  let result;
  let ryeong =  Object.entries(ryeongFunc.getRyeongTenYear(year))
  ryeong.sort(function(a,b){
    return a[1].year < b[1].year ? -1 : 1; 
  })
  for(let i =0 ; i<ryeong.length; i++){
    ryeong[i][1].ryeong = unseMergeUtil.ryeongKind(ryeong[i][0])
  }
  result=ryeong

  return result;
}

const ryeongYearDeun = () =>{
  let result;
  let ryeong =  Object.entries(ryeongFuncDeun.getRyeongTenYear())
  ryeong.sort(function(a,b){
    return a[1].deunsu < b[1].deunsu ? -1 : 1; 
  })
  for(let i =0 ; i<ryeong.length; i++){
    ryeong[i][1].ryeong = unseMergeUtil.ryeongKind(ryeong[i][0])
  }
  result=ryeong

  return result;
}

const gungYear = (year) =>{
  let result=[];
  let start = Number(year)
  let end = Number(year)+10

  for(let i =start ;i<end ;i++){
    result.push(gungShgjFunc.elementOneYearGungUn(i))
  }
  return result;
}

const gungYearDeun = () =>{
  let result=[]
  const deunArray = Object.values(useDeunSeun.deun)
  for(let i =0 ;i<10 ;i++){
    result.push(gungShgjFuncDeun.elementOneYearGungUn(deunArray[i][0]))
  }
  return result;
}
const yuksinYear = (year) =>{
  let result=[];
  let start = Number(year)
  let end = Number(year)+10

  for(let i =start ;i<end ;i++){
    result.push(unseMergeUtil.yuksinKind(gungShgjFunc.elementOneYearYuksin(i)))
  }
  return result;
}
const yuksinYearDeun = () =>{
  let result=[];
  const deunArray = Object.values(useDeunSeun.deun)
  for(let i =0 ;i<10 ;i++){
    result.push(unseMergeUtil.yuksinKind( yuksinFunc.getYuksin(deunArray[i][0],1)))
  }
  return result;
}
/* const shgjYear = (year) =>{
  let result;
  let shgj =  Object.entries(ryeongFunc.getShgjTenYear(year))
  shgj.sort(function(a,b){
    return a[1].year < b[1].year ? -1 : 1; 
  })
  for(let i =0 ; i<gung.length; i++){
    shgj[i][1].shgj = unseMergeUtil.gungKind(shgj[i][0])
  }
  result=shgj

  return result;
} */