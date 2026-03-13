const unseMergeUtil = require('../unseMergeUtil')
const func = require('./deunElementFunc/deunElementOneYearFunc')

/**
 * 입력받은 년도가, Ryeong중에서 어떠한것에 해당하는지 알려주는것(천간만 해당)
 * @param {String} word 
 * @param {Number} year 
 * @returns 
 */
exports.elementOneYearRyeong = (year) => {
    let result;
    let ryeongArray = Object.entries(func.getRyeongTenYear(year))
    for(let i=0; i<ryeongArray.length;i++){
      if(Number(ryeongArray[i][1].year)===Number(year)){
        result=unseMergeUtil.ryeongKind(ryeongArray[i][0])
        break
      }
    }
    return result;
}

/**
 * 입력받은 년도가, 구응성패 운세전용에서 어떠한것에 해당하는지 알려주는것이다.
 * 상신,상신기신,구신,구신기신(격기신), 격이 그것이다.
 * @param {String} word 
 * @param {Number} year 
 * @returns 
 */
 exports.elementOneYearGungUn = (word) => {
  let result;
  let gungArray = Object.entries(func.getGungTenYear())
   for(let i=0; i<gungArray.length;i++){
     if(gungArray[i][1].word===undefined){
     }
    else if(func.checkYearOhang(gungArray[i][1].word[0])===func.checkYearOhang(word)){
      result=unseMergeUtil.gungKind(gungArray[i][0])
      break
    }
  }
  return result;
}

/**
 * 입력받은 년도가, 생화극제 운세전용에서 어떠한것에 해당하는지 알려주는것이다.
 * 생화,생화제화,설화,설화제화,격이 그것이다.
 * 길격에서만 사용해야한다!!!!!!!
 * @param {String} word 
 * @param {Number} year 
 * @returns 
 */
 exports.elementOneYearShgjUn = (year) => {
  let result;
  let shgjArray = Object.entries(func.getShgjTenYear(year))
  for(let i=0; i<shgjArray.length;i++){
    if(func.checkYearOhang(Number(shgjArray[i][1].year))===func.checkYearOhang(Number(year))){
      result=unseMergeUtil.gungShgjKind(shgjArray[i][0])
      break
    }
  }
  return result;
}


/**
 * 입력받은 년도가, 육신중에서 어떠한것에 해당하는지 알려주는것(지지만해당)
 * @param {String} word 
 * @param {Number} year 
 * @returns 
 */
exports.elementOneYearYuksinJiJi = (year) => {
  let result;
  let yuksinArray = func.getYuksinTwelveYear(year)

  for(let i=0; i<yuksinArray.length; i++){
    if(Number(yuksinArray[i].year)===Number(year)){
      result=yuksinArray[i].yuksin
      break;
    }
  }
  return result;
}


/**
 * 입력받은 년도가, 육신중에서 어떠한것에 해당하는지 알려주는것(천간만해당)
 * @param {String} word 
 * @param {Number} year 
 * @returns 
 */
 exports.elementOneYearYuksin = (year) => {
  let result;
  let yuksinArray = func.getYuksinTenYear(year)
  for(let i=0; i<yuksinArray.length; i++){
    if(Number(yuksinArray[i].year)===Number(year)){
      result=yuksinArray[i].yuksin
      break;
    }
  }
  return result;
}
