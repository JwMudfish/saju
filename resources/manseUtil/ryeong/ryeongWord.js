/**
 * 희신체크
 * @param {string} dr 당령
 * @returns {string} 희신 글자
 */
exports.hisinCheck = (dr) => {
  let result;
  if (dr === '갑') {
    result = '계';
  } else if (dr === '을') {
    result = '병';
  } else if (dr === '병') {
    result = '을';
  } else if (dr === '정') {
    result = '경';
  } else if (dr === '경') {
    result = '정';
  } else if (dr === '신') {
    result = '임';
  } else if (dr === '임') {
    result = '신';
  } else if (dr === '계') {
    result = '갑';
  }
  return result;
}

/**
 * 중화체크
 * @param {string} dr 당령
 * @returns {string} 중화 글자
 */
exports.junghwaCheck = (dr) => {
  let result;
  if (dr === '갑') {
    result = '기';
  } else if (dr === '을') {
    result = '무';
  } else if (dr === '병') {
    result = '무';
  } else if (dr === '정') {
    result = '기';
  } else if (dr === '경') {
    result = '기';
  } else if (dr === '신') {
    result = '무';
  } else if (dr === '임') {
    result = '무';
  } else if (dr === '계') {
    result = '기';
  }
  return result;
}

/**
 * 중화기신체크
 * @param {string} dr 당령
 * @returns {string} 중화기신 글자
 */
exports.junghwaGisinCheck = (dr) => {
  let result;
  if (dr === '갑') {
    result = '무';
  } else if (dr === '을') {
    result = '기';
  } else if (dr === '병') {
    result = '기';
  } else if (dr === '정') {
    result = '무';
  } else if (dr === '경') {
    result = '무';
  } else if (dr === '신') {
    result = '기';
  } else if (dr === '임') {
    result = '기';
  } else if (dr === '계') {
    result = '무';
  }
  return result;
}


/**
 * 지속성체크
 * @param {string} dr 당령
 * @returns {string} 지속성 글자
 */
exports.jisokCheck = (dr) => {
  let result;
  if (dr === '갑') {
    result = '신';
  } else if (dr === '을') {
    result = '계';
  } else if (dr === '병') {
    result = '계';
  } else if (dr === '정') {
    result = '을';
  } else if (dr === '경') {
    result = '을';
  } else if (dr === '신') {
    result = '정';
  } else if (dr === '임') {
    result = '정';
  } else if (dr === '계') {
    result = '신';
  }
  return result;
}

/**
 * 지속성기신체크
 * @param {string} dr 당령
 * @returns {string} 지속성기신 글자
 */
exports.jisok_gisinCheck = (dr) => {
  let result;
  if (dr === '갑') {
    result = '경';
  } else if (dr === '을') {
    result = '임';
  } else if (dr === '병') {
    result = '임';
  } else if (dr === '정') {
    result = '갑';
  } else if (dr === '경') {
    result = '갑';
  } else if (dr === '신') {
    result = '병';
  } else if (dr === '임') {
    result = '병';
  } else if (dr === '계') {
    result = '경';
  }
  return result;
}

/**
 * 확장성체크
 * @param {string} dr 당령
 * @returns {string} 확장성 글자
 */
exports.hwakjangCheck = (dr) => {
  let result;
  if (dr === '갑') {
    result = '병';
  } else if (dr === '을') {
    result = '경';
  } else if (dr === '병') {
    result = '경';
  } else if (dr === '정') {
    result = '임';
  } else if (dr === '경') {
    result = '임';
  } else if (dr === '신') {
    result = '갑';
  } else if (dr === '임') {
    result = '갑';
  } else if (dr === '계') {
    result = '병';
  }
  return result;
}

/**
 * 확장성기신체크
 * @param {string} dr 당령
 * @returns {string} 확장성기신 글자
 */
exports.hwakjang_gisinCheck = (dr) => {
  let result;
  if (dr === '갑') {
    result = '정';
  } else if (dr === '을') {
    result = '신';
  } else if (dr === '병') {
    result = '신';
  } else if (dr === '정') {
    result = '계';
  } else if (dr === '경') {
    result = '계';
  } else if (dr === '신') {
    result = '을';
  } else if (dr === '임') {
    result = '을';
  } else if (dr === '계') {
    result = '정';
  }
  return result;
}

/**
 * 음양희신기신체크
 * @param {string} dr 당령
 * @returns {string} 음양희신기신 글자
 */
exports.um_heuisin_gisinCheck = (dr) => {
  let result;
  if (dr === '갑') {
    result = '임';
  } else if (dr === '을') {
    result = '정';
  } else if (dr === '병') {
    result = '갑';
  } else if (dr === '정') {
    result = '신';
  } else if (dr === '경') {
    result = '병';
  } else if (dr === '신') {
    result = '계';
  } else if (dr === '임') {
    result = '경';
  } else if (dr === '계') {
    result = '을';
  }
  return result;
}

/**
 * 상극 희신기신체크
 * @param {string} dr 당령
 * @returns {string} 상극 희신기신 글자
 */
exports.geuk_heuisin_gisinCheck = (dr) => {
  let result;
  if (dr === '갑') {
    result = '정';
  } else if (dr === '을') {
    result = '임';
  } else if (dr === '병') {
    result = '신';
  } else if (dr === '정') {
    result = '갑';
  } else if (dr === '경') {
    result = '계';
  } else if (dr === '신') {
    result = '병';
  } else if (dr === '임') {
    result = '을';
  } else if (dr === '계') {
    result = '경';
  }
  return result;
}
/**
 * 음양기신체크
 * @param {string} dr 당령
 * @returns {string} 음양기신 글자
 */
exports.um_gisinCheck = (dr) => {
  let result;
  if (dr === '갑') {
    result = '을';
  } else if (dr === '을') {
    result = '갑';
  } else if (dr === '병') {
    result = '정';
  } else if (dr === '정') {
    result = '병';
  } else if (dr === '경') {
    result = '신';
  } else if (dr === '신') {
    result = '경';
  } else if (dr === '임') {
    result = '계';
  } else if (dr === '계') {
    result = '임';
  }
  return result;
}
/**
 * 상극기신 체크
 * @param {string} dr 당령
 * @returns {string} 상극기신  글자
 */
exports.geuk_gisinCheck = (dr) => {
  let result;
  if (dr === '갑') {
    result = '경';
  } else if (dr === '을') {
    result = '신';
  } else if (dr === '병') {
    result = '임';
  } else if (dr === '정') {
    result = '계';
  } else if (dr === '경') {
    result = '갑';
  } else if (dr === '신') {
    result = '을';
  } else if (dr === '임') {
    result = '병';
  } else if (dr === '계') {
    result = '정';
  }
  return result;
}