
const element = require('../../../manse/checkSeunElement/checkWolElement')

/**
 * Start-end 범위에있는 천간글자와 년도를 출력한다
 * @param {Number} start 시작년도
 * @param {Number} end 마무리년도
 * @returns 
 */
 exports.elementRangeWord = (year) => {
  let result=[];
  const chungan = ['자','축','인','묘','진','사','오','미','신','유','술','해']
    // 시작년도
    let start = 1
    // 끝년도
    let end = 12
  for(let i=0; i<end; i++){
    result.push(getYN(element.seunElementJiJi(chungan[i], year, start, end)))
  }
  return result;
}

/**
 * 시작년도와 끝년도에 체크할 요소가 있는지 찾는다(천간글자)
 * @param {String} word  체크할 요소의 글자
 * @param {Number} start 시작년도
 * @param {Number} end 마무리년도
 * @returns 
 */
exports.elementRange = (word,start,end) => {
    let result;
    result=getYN(element.seunElement(word, start, end))
    return result;
}

/**
 * 시작년도와 끝년도에 체크할 요소가 있는지 찾는다(천간육신)
 * @param {String} word  체크할 요소의 글자
 * @param {Number} start 시작년도
 * @param {Number} end 마무리년도
 * @returns 
 */
 exports.elementRangeYuksin = (word,start,end) => {
  let result;
  result=getYN(element.seunElementYuksin(word, start, end))
  return result;
}
/**
 * 시작년도와 끝년도에 체크할 요소가 있는지 찾는다(지지글자)
 * @param {String} word  체크할 요소의 글자
 * @param {Number} start 시작년도
 * @param {Number} end 마무리년도
 * @returns 
 */
 exports.elementRangeJiJi = (word,start,end) => {
  let result;
  result=getYN(element.seunElementJiJi(word, start, end))
  return result;
}

const getYN = (element) => {
    let result = {
      YN: 'N'
    };
    for (let i = 0; i < element.length; i++) {
      if (element[i].YN === 'Y') {
        result = element[i]
      }
    }
    return result;
  }