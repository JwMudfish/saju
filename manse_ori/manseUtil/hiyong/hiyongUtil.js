
const hiyongWord = require('./hiyongWord')

const chunGan = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
Object.freeze(chunGan);

/**
 * 희 존재여부 (천간에서만 따짐)
 * @returns {string} 존재애부
 */
exports.checkHiYN = () => {
  let result
  result = checkYN(hiyongWord.checkHi)
  return result;
}
/**
 * 용 존재여부 (천간에서만 따짐)
 * @returns {string} 존재애부
 */
exports.checkYongYN = () => {
  let result
  result = checkYN(hiyongWord.checkYong)
  return result;
}

// 희용 공통된 함수 묶어두기
const checkYN = (word) => {
  const pillar = [
    usePillar.y_sky,
    usePillar.m_sky,
    usePillar.h_sky,
  ]
  let result = 'N'
  for (let i = 0; i < pillar.length; i++) {
    if (word(usePillar.d_sky, pillar[i])) {
      result = 'Y'
    }
  }
  return result;
}


/**
 * 일간에 해당하는 희 글자 출력
 * @returns {String}
 */
exports.hiCheck = function () {
  let result = '';
  for (let i = 0; i < chunGan.length; i++) {
    let temp = hiyongWord.checkHi(usePillar.d_sky, chunGan[i])
    if (temp === true) {
      result = chunGan[i];
      break;
    }
  }
  return result;
};

/**
 * 일간에 해당하는 용 글자 출력
 * @returns {String}
 */
exports.yongCheck = function () {
  let result = '';
  for (let i = 0; i < chunGan.length; i++) {
    let temp = hiyongWord.checkYong(usePillar.d_sky, chunGan[i])
    if (temp === true) {
      result = chunGan[i];
      break;
    }
  }
  return result;
};