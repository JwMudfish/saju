/**
 * 삼합체크
 * @param {string} one 기준요소
 * @param {string} other 비교할글자
 * @returns {boolean} 삼합 존재여부
 */
exports.getSamHap = (one, other) => {
  let result = false;
  if (one === '인' || one === '오' || one === '술') {
    // if (                                                                                                                                                 (other === '인' || other === '오' || other === '술')) {
    if (one!== other && (other === '인' || other === '오' || other === '술')) {
      result = true;
    }
  } else if (one === '해' || one === '묘' || one === '미') {
    // if (one !== other && (other === '해' || other === '묘' || other === '미')) {
    if (one!== other &&(other === '해' || other === '묘' || other === '미')) {
      result = true;
    }
  } else if (one === '신' || one === '자' || one === '진') {
    // if (one !== other && (other === '신' || other === '자' || other === '진')) {
    if (one!== other &&(other === '신' || other === '자' || other === '진')) {
      result = true;
    }
  } else if (one === '사' || one === '유' || one === '축') {
    // if (one !== other && (other === '사' || other === '유' || other === '축')) {
    if (one!== other &&(other === '사' || other === '유' || other === '축')) {
      result = true;
    }
  }
  return result;
}
/**
 * 방합체크
 * @param {string} one 기준요소
 * @param {string} other 비교할글자
 * @returns {boolean} 방합 존재여부
 */
exports.getbangHap = (one, other) => {
  let result = false;
  if (one === '인' || one === '묘' || one === '진') {
    // if (one !== other && (other === '인' || other === '묘' || other === '진')) {
    if ((other === '인' || other === '묘' || other === '진')) {
      result = true;
    }
  } else if (one === '사' || one === '오' || one === '미') {
    // if (one !== other && (other === '사' || other === '오' || other === '미')) {
    if ((other === '사' || other === '오' || other === '미')) {
      result = true;
    }
  } else if (one === '신' || one === '유' || one === '술') {
    // if (one !== other && (other === '신' || other === '유' || other === '술')) {
    if ((other === '신' || other === '유' || other === '술')) {
      result = true;
    }
  } else if (one === '해' || one === '자' || one === '축') {
    // if (one !== other && (other === '해' || other === '자' || other === '축')) {
    if ((other === '해' || other === '자' || other === '축')) {
      result = true;
    }
  }
  return result;
}
/**
 * 충체크
 * @param {string} one 기준요소
 * @param {string} other 비교할글자
 * @returns {boolean} 충 존재여부
 */
exports.getChung = (one, other) => {
  let result = false;
  if (one === '인' || one === '신') {
    if (one !== other && (other === '인' || other === '신')) {
      result = true;
    }
  } else if (one === '사' || one === '해') {
    if (one !== other && (other === '사' || other === '해')) {
      result = true;
    }
  } else if (one === '자' || one === '오') {
    if (one !== other && (other === '자' || other === '오')) {
      result = true;
    }
  } else if (one === '묘' || one === '유') {
    if (one !== other && (other === '묘' || other === '유')) {
      result = true;
    }
  } else if (one === '진' || one === '술') {
    if (one !== other && (other === '진' || other === '술')) {
      result = true;
    }
  } else if (one === '축' || one === '미') {
    if (one !== other && (other === '축' || other === '미')) {
      result = true;
    }
  }
  return result;
}

exports.getYukhap = (one, other) => {
  let result = false;
  if (one === '자' || one === '축') {
    if (one !== other && (other === '자' || other === '축')) {
      result = true;
    }
  } else if (one === '인' || one === '해') {
    if (one !== other && (other === '인' || other === '해')) {
      result = true;
    }
  } else if (one === '묘' || one === '술') {
    if (one !== other && (other === '묘' || other === '술')) {
      result = true;
    }
  } else if (one === '진' || one === '유') {
    if (one !== other && (other === '진' || other === '유')) {
      result = true;
    }
  } else if (one === '사' || one === '신') {
    if (one !== other && (other === '사' || other === '신')) {
      result = true;
    }
  } else if (one === '오' || one === '미') {
    if (one !== other && (other === '오' || other === '미')) {
      result = true;
    }
  }
  return result;
}