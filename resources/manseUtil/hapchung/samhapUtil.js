
const hapChungWord = require('./samhapWord')
/**
 * 월지기준 삼합 있는지 (월지기준 모든지지 비교)
 * @returns {string} 존재여부
 */
exports.checkSamhapWolYN = () => {
  let result
  result = checkChoiceYN(hapChungWord.getSamHap, usePillar.m_land, 'M')
  return result;
}
/**
 * 월지랑 특정지지랑 삼합이 되는지 (월지랑 특정 한 지지 비교)
 * @returns {string} 존재여부
 */
exports.checkSamhapWolSpecificJiJiYN = (jiji) => {
  let result
  if (hapChungWord.getSamHap(usePillar.m_land, jiji) === true) {
    result = 'Y'
  }
  else {
    result = 'N'
  }

  return result;
}
/**
 * 월지기준아닌거 기준으로 삼합 있는지
 * @returns {string} 존재여부
 */
exports.checkSamhapYN = () => {
  let result
  result = checkYN(hapChungWord.getSamHap)
  return result;
}

/**
 * 특정지지기준 삼합 있는지
 * @param {string} jiji 지지
 * @param {string} char 'Y' ->년지 'M'-> 월지 'D'->일지 'H'-> 시지
 * @returns {string} 존재여부
 */
exports.checkSamhapChoiceYN = (jiji, char) => {
  let result
  result = checkChoiceYN(hapChungWord.getSamHap, jiji, char)
  return result;
}

/**
 * 월지기준 방합 있는지
 * @returns {string} 존재여부
 */
exports.checkbanghapWolYN = () => {
  let result
  result = checkChoiceYN(hapChungWord.getbangHap, usePillar.m_land, 'M')
  return result;
}
/**
 * 월지기준아닌거 기준으로 방합 있는지
 * @returns {string} 존재여부
 */
exports.checkbanghapYN = () => {
  let result
  result = checkYN(hapChungWord.getbangHap)
  return result;
}

/**
 * 월지랑 특정지지랑 방합이 되는지 (월지랑 특정 한 지지 비교)
 * @returns {string} 존재여부
 */
 exports.checkBanghapWolSpecificJiJiYN = (jiji) => {
  let result
  if (hapChungWord.getbangHap(usePillar.m_land, jiji) === true) {
    result = 'Y'
  }
  else {
    result = 'N'
  }

  return result;
}

/**
 * 특정지지기준 방합 있는지
 * @returns {string} 존재여부
 */
exports.checkBanghapChoiceYN = (jiji, char) => {
  let result
  result = checkChoiceYN(hapChungWord.getbangHap, jiji, char)
  return result;
}

/**
 * 월지기준 충 있는지
 * @returns {string} 존재여부
 */
exports.checkChungWolYN = () => {
  let result
  result = checkChoiceYN(hapChungWord.getChung, usePillar.m_land, 'M')
  return result;
}
/**
 * 일지기준 충 있는지
 * @returns {string} 존재여부
 */
 exports.checkChungilJiYN = () => {
  let result
  result = checkChoiceYN(hapChungWord.getChung, usePillar.d_land, 'D')
  return result;
}
/**
 * 월지기준아닌거 기준으로 충 있는지
 * @returns {string} 존재여부
 */
exports.checkChungYN = () => {
  let result
  result = checkYN(hapChungWord.getChung)
  return result;
}
/**
 * 일지랑 특정지지랑 충이 되는지 (일지랑 특정 한 지지 비교)
 * @returns {string} 존재여부
 */
 exports.checkChungIlJiSpecificJiJiYN = (jiji) => {
  let result
  if (hapChungWord.getChung(usePillar.d_land, jiji) === true) {
    result = 'Y'
  }
  else {
    result = 'N'
  }
  return result;
}

/**
 * 월지랑 특정지지랑 충이 되는지 (월지랑 특정 한 지지 비교)
 * @returns {string} 존재여부
 */
 exports.checkChungWolJiSpecificJiJiYN = (jiji) => {
  let result
  if (hapChungWord.getChung(usePillar.m_land, jiji) === true) {
    result = 'Y'
  }
  else {
    result = 'N'
  }
  return result;
}
/**
 * 특정지지기준 충 있는지
 * @param {string} jiji 지지
 * @param {string} char 'Y' ->년지 'M'-> 월지 'D'->일지 'H'-> 시지
 * @returns {string} 존재여부
 */
exports.checkChungChoiceYN = (jiji, char) => {
  let result
  result = checkChoiceYN(hapChungWord.getChung, jiji, char)
  return result;
}

/**
 * 월지기준 육합 있는지
 * @returns {string} 존재여부
 */
exports.checkYukhapWolYN = () => {
  let result
  result = checkChoiceYN(hapChungWord.getYukhap, usePillar.m_land, 'M')
  return result;
}

/**
 * 일지기준 육합 있는지
 * @returns {string} 존재여부
 */
 exports.checkYukhapilJiYN = () => {
  let result
  result = checkChoiceYN(hapChungWord.getYukhap, usePillar.d_land, 'D')
  return result;
}
/**
 * 월지기준아닌거 기준으로 육합 있는지
 * @returns {string} 존재여부
 */
exports.checkYukhapYN = () => {
  let result
  result = checkYN(hapChungWord.getYukhap)
  return result;
}

/**
 * 특정지지기준 육합 있는지
 * @param {string} jiji 지지
 * @param {string} char 'Y' ->년지 'M'-> 월지 'D'->일지 'H'-> 시지
 * @returns {string} 존재여부
 */
exports.checkYukhapChoiceYN = (jiji, char) => {
  let result
  result = checkChoiceYN(hapChungWord.getYukhap, jiji, char)
  return result;
}
/**
 * 일지랑 특정지지랑 육합이 되는지 (일지랑 특정 한 지지 비교)
 * @returns {string} 존재여부
 */
 exports.checkYukhapIlJiSpecificJiJiYN = (jiji) => {
  let result
  if (hapChungWord.getYukhap(usePillar.d_land, jiji) === true) {
    result = 'Y'
  }
  else {
    result = 'N'
  }

  return result;
}
/**
 * 공통된 함수 묶어두기 (월지버전)
 * @param {string} word 비교단어
 * @param {string} jiji 지지
 * @param {string} char 'Y' ->년지 'M'-> 월지 'D'->일지 'H'-> 시지
 * @returns {string} 존재여부
 */
const checkChoiceYN = (word, jiji, char) => {
  const pillar = [
    usePillar.y_land,
    usePillar.m_land,
    usePillar.d_land,
    usePillar.h_land,
  ]
  let result = 'N'
  let charToInt = changeCharToInt(char)
  for (let i = 0; i < pillar.length; i++) {
    if (charToInt !== i)
      if (word(jiji, pillar[i])) {
        result = 'Y'
      }
  }
  return result;
}

const changeCharToInt = (char) => {
  let result = 999;
  if (String(char).toUpperCase() === 'Y') {
    result = 0
  }
  else if (String(char).toUpperCase() === 'M') {
    result = 1
  }
  else if (String(char).toUpperCase() === 'D') {
    result = 2
  }
  else if (String(char).toUpperCase() === 'H') {
    result = 3
  }
  return result;
}

// 공통된 함수 묶어두기
const checkYN = (word) => {
  const onepillar = [
    usePillar.y_land,
    usePillar.d_land,
    usePillar.h_land,
  ]
  const otherpillar = [
    usePillar.y_land,
    usePillar.d_land,
    usePillar.h_land,
  ]
  let result = 'N'
  for (let i = 0; i < onepillar.length; i++) {
    for (let j = 0; j < otherpillar.length; j++) {
      if (i !== j) {
        if (word(onepillar[i], otherpillar[j])) {
          result = 'Y'
        }
      }
    }
  }
  return result;
}
