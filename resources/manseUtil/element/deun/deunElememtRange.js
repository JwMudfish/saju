
const element = require('../../../manse/checkSeunElement/checkDeunElement')

/**
 * Start-end 범위에있는 운의명칭과, 년도를 순서대로 출력한다.
 * @param {Number} start 시작년도
 * @param {Number} end 마무리년도
 * @returns 
 */
 exports.elementRangeWordSort = () => {
  let result=[];
  const chungan = [useDeunSeun.deun.one[0],
  useDeunSeun.deun.two[0],useDeunSeun.deun.three[0]
  ,useDeunSeun.deun.four[0],useDeunSeun.deun.five[0],
  useDeunSeun.deun.six[0],
  useDeunSeun.deun.seven[0],
  useDeunSeun.deun.eight[0],
  useDeunSeun.deun.nine[0],
  useDeunSeun.deun.ten[0]]
  for(let i=0; i<chungan.length; i++){
    result.push(getYN(element.seunElement(chungan[i])))
  }
  result=temp.sort(function(a,b){
    return a.year < b.year ? -1 : 1; 
  })
  return result;
}


/**
 * Start-end 범위에있는 천간글자와 년도를 출력한다
 * @param {Number} start 시작년도
 * @param {Number} end 마무리년도
 * @returns 
 */
 exports.elementRangeWord = (year) => {
  let result=[];
  const chungan =[useDeunSeun.deun.one[0],
  useDeunSeun.deun.two[0],useDeunSeun.deun.three[0]
  ,useDeunSeun.deun.four[0],useDeunSeun.deun.five[0],
  useDeunSeun.deun.six[0],
  useDeunSeun.deun.seven[0],
  useDeunSeun.deun.eight[0],
  useDeunSeun.deun.nine[0],
  useDeunSeun.deun.ten[0]]
  for(let i=0; i<chungan.length; i++){
    result.push(getYN(element.seunElement(chungan[i])))
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
exports.elementRange = (word) => {
    let result;
    result=getYN(element.seunElement(word))
    return result;
}

/**
 * 시작년도와 끝년도에 체크할 요소가 있는지 찾는다(천간육신)
 * @param {String} word  체크할 요소의 글자
 * @param {Number} start 시작년도
 * @param {Number} end 마무리년도
 * @returns 
 */
 exports.elementRangeYuksin = (word) => {
  let result;
  result=getYN(element.seunElementYuksin(word))
  return result;
}
/**
 * 시작년도와 끝년도에 체크할 요소가 있는지 찾는다(지지글자)
 * @param {String} word  체크할 요소의 글자
 * @param {Number} start 시작년도
 * @param {Number} end 마무리년도
 * @returns 
 */
 exports.elementRangeJiJi = (word) => {
  let result;
  result=getYN(element.seunElementJiJi(word))
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