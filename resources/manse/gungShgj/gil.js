var gil = {};

//상신
//지장간 속성없음이 빈칸2개이므로
gil.sangsin = function (use, sangguk, word, yuksin,gun) {
  let result = {};
  let possible = 'N';
  let sangsin = '  ';
  let exist = 'N';
  if (use.includes('bunhwa') === true && use !== undefined) {
  } 
  else if( useGyouk === "식신격"){
    possible=checkSiksin(use, sangguk, word, yuksin,gun).possible
    exist=checkSiksin(use, sangguk, word, yuksin,gun).exist
  }
  else if (
    use === 'm_yu_sihwa_young' ||
    use === 'm_yu_sihwa' ||
    use === 'yu_sihwa_young' ||
    String(use).trim() === '' ||
    use === undefined 
  ) {
    if (sangguk.sssg === 'shang_come' && sangguk.JP === 'Y') {
      possible = 'Y';
      sangsin = word;
      exist = 'Y';
    }
  } else {
    if (sangguk.sssg === 'shang_come' && sangguk.JP === 'Y') {
      possible = 'N';
      sangsin = word;
      exist = 'Y';
    }
  }
  result = {
    possible: possible,
    word: word,
    yuksin: yuksin,
    exist: exist,
  };
  return result;
};

// 식신격 
const checkSiksin = (use, sangguk, word, yuksin,gun) => {
  let result={
    possible : 'N',
    sangsin  : word,
    exist  : 'N'
  };

    if (gun === 'pure_root') {
      result = {
        possible : 'Y',
        sangsin  : word,
        exist  : 'Y'
      }
    }
    else if(String(use).trim() === '' ||
    use === undefined) {
      if (sangguk.sssg === 'shang_come' && sangguk.JP === 'Y') {
        result = {
          possible : 'Y',
          sangsin  : word,
          exist  : 'Y'
        }
    }
    else {
      if (sangguk.sssg === 'shang_come' && sangguk.JP === 'Y') {
        result = {
          possible : 'N',
          sangsin  : word,
          exist  : 'Y'
        }
    }
  }
}
  return result
}

//상신기신
//지장간 속성없음이 빈칸2개이므로
gil.sangsingisin = function (use, sangguk, word, yuksin) {
  let result = {};
  let possible = 'N';
  let exist = 'N';
  let sangsingisin = '  ';
  /* if (yuksin === "비견" || yuksin === "겁재") {
  } else if ( */
  if (use.includes('bunhwa') === true && use !== undefined) {
  } else if (
    use === 'm_yu_sihwa_young' ||
    use === 'm_yu_sihwa' ||
    use === 'yu_sihwa_young' ||
    String(use).trim() === '' ||
    use === undefined
  ) {
    if (sangguk.sssg === 'geuk_go' && sangguk.JP === 'Y') {
      possible = 'Y';
      sangsingisin = word;
      exist = 'Y';
    }
  } else {
    if (sangguk.sssg === 'geuk_go' && sangguk.JP === 'Y') {
      possible = 'N';
      sangsingisin = word;
      exist = 'Y';
    }
  }
  result = {
    possible: possible,
    word: word,
    yuksin: yuksin,
    exist: exist,
  };
  return result;
};

//구신
//지장간 속성없음이 빈칸2개이므로
gil.gusin = function (use, sangguk, word, yuksin) {
  let result = {};
  let possible = 'N';
  let exist = 'N';
  let gusin = '  ';
  /* if (yuksin === "비견" || yuksin === "겁재") {
  } else if ( */
  if (use.includes('bunhwa') === true && use !== undefined) {
  } else if (
    use === 'm_yu_sihwa_young' ||
    use === 'm_yu_sihwa' ||
    use === 'yu_sihwa_young' ||
    String(use).trim() === '' ||
    use === undefined
  ) {
    if (sangguk.sssg === 'shang_go' && sangguk.JP === 'Y') {
      possible = 'Y';
      gusin = word;
      exist = 'Y';
    }
  } else {
    if (sangguk.sssg === 'shang_go' && sangguk.JP === 'Y') {
      possible = 'N';
      gusin = word;
      exist = 'Y';
    }
  }
  result = {
    possible: possible,
    word: word,
    yuksin: yuksin,
    exist: exist,
  };
  return result;
};

//격기신
//지장간 속성없음이 빈칸2개이므로
gil.gukgisin = function (use, sangguk, word, yuksin) {
  let result = {};
  let possible = 'N';
  let exist = 'N';
  let gukgisin = '  ';
  /* if (yuksin === "비견" || yuksin === "겁재") {
  } else if ( */
  if (use.includes('bunhwa') === true && use !== undefined) {
  } else if (
    use === 'm_yu_sihwa_young' ||
    use === 'm_yu_sihwa' ||
    use === 'yu_sihwa_young' ||
    String(use).trim() === '' ||
    use === undefined
  ) {
    if (sangguk.sssg === 'geuk_come' && sangguk.JP === 'Y') {
      possible = 'Y';
      gukgisin = word;
      exist = 'Y';
    }
  } else {
    if (sangguk.sssg === 'geuk_come' && sangguk.JP === 'Y') {
      possible = 'N';
      gukgisin = word;
      exist = 'Y';
    }
  }
  result = {
    possible: possible,
    word: word,
    yuksin: yuksin,
    exist: exist,
  };
  return result;
};

//생화
//지장간 속성없음이 빈칸2개이므로
gil.sanghwa = function (use, sangguk, word, yuksin) {
  let result = {};
  let possible = 'N';
  let sanghwa = '  ';
  let exist = 'N';
  /* if (yuksin === "비견" || yuksin === "겁재") {
  } else if ( */
  if (use.includes('bunhwa') === true && use !== undefined) {
  } else if (
    use === 'm_yu_sihwa_young' ||
    use === 'm_yu_sihwa' ||
    use === 'yu_sihwa_young' ||
    String(use).trim() === '' ||
    use === undefined
  ) {
    if (sangguk.sssg === 'shang_come' && sangguk.JP === 'Y') {
      possible = 'Y';
      sanghwa = word;
      exist = 'Y';
    }
  } else {
    if (sangguk.sssg === 'shang_come' && sangguk.JP === 'Y') {
      possible = 'N';
      sanghwa = word;
      exist = 'Y';
    }
  }
  result = {
    possible: possible,
    word: word,
    yuksin: yuksin,
    exist: exist,
  };
  return result;
};

//생재
//지장간 속성없음이 빈칸2개이므로
gil.sang_jae = function (use, sangguk, word, yuksin) {
  let result = {};
  let possible = 'N';
  let exist = 'N';
  let sang_jae = '  ';
  /* if (yuksin === "비견" || yuksin === "겁재") {
  } else if ( */
  if (use.includes('bunhwa') === true && use !== undefined) {
  } else if (
    use === 'm_yu_sihwa_young' ||
    use === 'm_yu_sihwa' ||
    use === 'yu_sihwa_young' ||
    String(use).trim() === '' ||
    use === undefined
  ) {
    if (sangguk.sssg === 'geuk_go' && sangguk.JP === 'Y') {
      possible = 'Y';
      sang_jae = word;
      exist = 'Y';
    }
  } else {
    if (sangguk.sssg === 'geuk_go' && sangguk.JP === 'Y') {
      possible = 'N';
      sang_jae = word;
      exist = 'Y';
    }
  }
  result = {
    possible: possible,
    word: word,
    yuksin: yuksin,
    exist: exist,
  };
  return result;
};

//설화
//지장간 속성없음이 빈칸2개이므로
gil.sulhwa = function (use, sangguk, word, yuksin) {
  let result = {};
  let possible = 'N';
  let exist = 'N';
  let sulhwa = '  ';
  /* if (yuksin === "비견" || yuksin === "겁재") {
  } else if ( */
  if (use.includes('bunhwa') === true && use !== undefined) {
  } else if (
    use === 'm_yu_sihwa_young' ||
    use === 'm_yu_sihwa' ||
    use === 'yu_sihwa_young' ||
    String(use).trim() === '' ||
    use === undefined
  ) {
    if (sangguk.sssg === 'shang_go' && sangguk.JP === 'Y') {
      possible = 'Y';
      sulhwa = word;
      exist = 'Y';
    }
  } else {
    if (sangguk.sssg === 'shang_go' && sangguk.JP === 'Y') {
      possible = 'N';
      sulhwa = word;
      exist = 'Y';
    }
  }
  result = {
    possible: possible,
    word: word,
    yuksin: yuksin,
    exist: exist,
  };
  return result;
};

//설재
//지장간 속성없음이 빈칸2개이므로
gil.sul_jae = function (use, sangguk, word, yuksin) {
  let result = {};
  let possible = 'N';
  let exist = 'N';
  let sul_jae = '  ';
  /* if (yuksin === "비견" || yuksin === "겁재") {
  } else if ( */
  if (use.includes('bunhwa') === true && use !== undefined) {
  } else if (
    use === 'm_yu_sihwa_young' ||
    use === 'm_yu_sihwa' ||
    use === 'yu_sihwa_young' ||
    String(use).trim() === '' ||
    use === undefined
  ) {
    if (sangguk.sssg === 'geuk_come' && sangguk.JP === 'Y') {
      possible = 'Y';
      sul_jae = word;
      exist = 'Y';
    }
  } else {
    if (sangguk.sssg === 'geuk_come' && sangguk.JP === 'Y') {
      possible = 'N';
      sul_jae = word;
      exist = 'Y';
    }
  }
  result = {
    possible: possible,
    word: word,
    yuksin: yuksin,
    exist: exist,
  };
  return result;
};

//설합
//지장간 속성없음이 빈칸2개이므로
gil.sul_hap = function (use, sangguk, word, yuksin) {
  let result = {};
  let possible = 'N';
  let exist = 'N';
  let sul_hap = '  ';
  /* if (yuksin === "비견" || yuksin === "겁재") {
  } else if ( */
  if (use.includes('bunhwa') === true && use !== undefined) {
  } else if (
    use === 'm_yu_sihwa_young' ||
    use === 'm_yu_sihwa' ||
    use === 'yu_sihwa_young' ||
    String(use).trim() === '' ||
    use === undefined
  ) {
    if (sangguk.sssg === 'geuk_come' && sangguk.JP === 'Y') {
      possible = 'Y';
      sul_hap = word;
      exist = 'Y';
    }
  } else {
    if (sangguk.sssg === 'geuk_come' && sangguk.JP === 'Y') {
      possible = 'N';
      sul_hap = word;
      exist = 'Y';
    }
  }
  result = {
    possible: possible,
    word: word,
    yuksin: yuksin,
    exist: exist,
  };
  return result;
};

//상합
//지장간 속성없음이 빈칸2개이므로
gil.sang_hap = function (use, sangguk, word, yuksin) {
  let result = {};
  let possible = 'N';
  let exist = 'N';
  let sang_hap = '  ';
  /* if (yuksin === "비견" || yuksin === "겁재") {
  } else if ( */
  if (use.includes('bunhwa') === true && use !== undefined) {
  } else if (
    use === 'm_yu_sihwa_young' ||
    use === 'm_yu_sihwa' ||
    use === 'yu_sihwa_young' ||
    String(use).trim() === '' ||
    use === undefined
  ) {
    if (sangguk.sssg === 'shang_come' && sangguk.JP === 'N') {
      possible = 'Y';
      sang_hap = word;
      exist = 'Y';
    }
  } else {
    if (sangguk.sssg === 'shang_come' && sangguk.JP === 'N') {
      possible = 'N';
      sang_hap = word;
      exist = 'Y';
    }
  }
  result = {
    possible: possible,
    word: word,
    yuksin: yuksin,
    exist: exist,
  };
  return result;
};

//생화제화
//지장간 속성없음이 빈칸2개이므로
gil.sengHwa_zeHwa = function (use, sangguk, word, yuksin) {
  let result = {};
  let possible = 'N';
  let exist = 'N';
  let sengHwa_zeHwa = '  ';
  /* if (yuksin === "비견" || yuksin === "겁재") {
  } else if ( */
  if (use.includes('bunhwa') === true && use !== undefined) {
  } else if (
    use === 'm_yu_sihwa_young' ||
    use === 'm_yu_sihwa' ||
    use === 'yu_sihwa_young' ||
    String(use).trim() === '' ||
    use === undefined
  ) {
    if (sangguk.sssg === 'geuk_go' && sangguk.JP === 'Y') {
      possible = 'Y';
      sengHwa_zeHwa = word;
      exist = 'Y';
    }
  } else {
    if (sangguk.sssg === 'geuk_go' && sangguk.JP === 'Y') {
      possible = 'N';
      sengHwa_zeHwa = word;
      exist = 'Y';
    }
  }
  result = {
    possible: possible,
    word: word,
    yuksin: yuksin,
    exist: exist,
  };
  return result;
};
//설화제화
//지장간 속성없음이 빈칸2개이므로
gil.sulHwa_zeHwa = function (use, sangguk, word, yuksin) {
  let result = {};
  let possible = 'N';
  let exist = 'N';
  let sulHwa_zeHwa = '  ';
  /* if (yuksin === "비견" || yuksin === "겁재") {
  } else if ( */
  if (use.includes('bunhwa') === true && use !== undefined) {
  } else if (
    use === 'm_yu_sihwa_young' ||
    use === 'm_yu_sihwa' ||
    use === 'yu_sihwa_young' ||
    String(use).trim() === '' ||
    use === undefined
  ) {
    if (sangguk.sssg === 'geuk_come' && sangguk.JP === 'Y') {
      possible = 'Y';
      sulHwa_zeHwa = word;
      exist = 'Y';
    }
  } else {
    if (sangguk.sssg === 'geuk_come' && sangguk.JP === 'Y') {
      possible = 'N';
      sulHwa_zeHwa = word;
      exist = 'Y';
    }
  }
  result = {
    possible: possible,
    word: word,
    yuksin: yuksin,
    exist: exist,
  };
  return result;
};

//생화합화
//지장간 속성없음이 빈칸2개이므로
gil.sengHwa_hapHwa = function (use, sangguk, word, yuksin) {
  let result = {};
  let possible = 'N';
  let exist = 'N';
  let sengHwa_hapHwa = '  ';
  /* if (yuksin === "비견" || yuksin === "겁재") {
  } else if ( */
  if (use.includes('bunhwa') === true && use !== undefined) {
  } else if (
    use === 'm_yu_sihwa_young' ||
    use === 'm_yu_sihwa' ||
    use === 'yu_sihwa_young' ||
    String(use).trim() === '' ||
    use === undefined
  ) {
    if (sangguk.sssg === 'geuk_go' && sangguk.JP === 'N') {
      possible = 'Y';
      sengHwa_hapHwa = word;
      exist = 'Y';
    }
  } else {
    if (sangguk.sssg === 'geuk_go' && sangguk.JP === 'N') {
      possible = 'N';
      sengHwa_hapHwa = word;
      exist = 'Y';
    }
  }
  result = {
    possible: possible,
    word: word,
    yuksin: yuksin,
    exist: exist,
  };
  return result;
};
//설화합화
//지장간 속성없음이 빈칸2개이므로
gil.sulHwa_hapHwa = function (use, sangguk, word, yuksin) {
  let result = {};
  let possible = 'N';
  let exist = 'N';
  let sulHwa_hapHwa = '  ';
  /* if (yuksin === "비견" || yuksin === "겁재") {
  } else if ( */
  if (use.includes('bunhwa') === true && use !== undefined) {
  } else if (
    use === 'm_yu_sihwa_young' ||
    use === 'm_yu_sihwa' ||
    use === 'yu_sihwa_young' ||
    String(use).trim() === '' ||
    use === undefined
  ) {
    if (sangguk.sssg === 'geuk_come' && sangguk.JP === 'N') {
      possible = 'Y';
      sulHwa_hapHwa = word;
      exist = 'Y';
    }
  } else {
    if (sangguk.sssg === 'geuk_come' && sangguk.JP === 'N') {
      possible = 'N';
      sulHwa_hapHwa = word;
      exist = 'Y';
    }
  }
  result = {
    possible: possible,
    word: word,
    yuksin: yuksin,
    exist: exist,
  };
  return result;
};

module.exports = gil;
