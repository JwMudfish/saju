/**
 * 희체크
 * @param {string} dsky 일간
 * @param {string} word 비교할글자
 * @returns {string} 희신 글자
 */
exports.checkHi = (dsky, word) => {
  let result = false;

  if (dsky === '갑' && word === '정') {
    result = true;
  } else if (dsky === '을' && word === '병') {
    result = true;
  } else if (dsky === '병' && word === '을') {
    result = true;
  } else if (dsky === '정' && word === '갑') {
    result = true;
  } else if (dsky === '무' && word === '기') {
    result = true;
  } else if (dsky === '기' && word === '무') {
    result = true;
  } else if (dsky === '경' && word === '계') {
    result = true;
  } else if (dsky === '신' && word === '임') {
    result = true;
  } else if (dsky === '임' && word === '신') {
    result = true;
  } else if (dsky === '계' && word === '경') {
    result = true;
  }
  return result;
}

exports.checkYong = (dsky, word) => {
  let result = false;

  if (dsky === '갑' && word === '경') {
    result = true;
  } else if (dsky === '을' && word === '경') {
    result = true;
  } else if (dsky === '병' && word === '경') {
    result = true;
  } else if (dsky === '정' && word === '경') {
    result = true;
  } else if (dsky === '무' && word === '임') {
    result = true;
  } else if (dsky === '기' && word === '임') {
    result = true;
  } else if (dsky === '경' && word === '갑') {
    result = true;
  } else if (dsky === '신' && word === '병') {
    result = true;
  } else if (dsky === '임' && word === '갑') {
    result = true;
  } else if (dsky === '계' && word === '갑') {
    result = true;
  }
  return result;
}