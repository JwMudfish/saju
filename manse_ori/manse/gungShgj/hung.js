var hung = {};

//상신
//지장간 속성없음이 빈칸2개이므로
hung.sangsin = function (use, sangguk, word, yuksin) {
  let result = {};
  let possible = 'N';
  let sangsin = '  ';
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
    if (sangguk.sssg === 'geuk_come' && sangguk.JP === 'Y') {
      possible = 'Y';
      sangsin = word;
      exist = 'Y';
    }
  } else {
    if (sangguk.sssg === 'geuk_come' && sangguk.JP === 'Y') {
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

//상신기신
//지장간 속성없음이 빈칸2개이므로
hung.sangsingisin = function (use, sangguk, word, yuksin) {
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
    if (sangguk.sssg === 'shang_go' && sangguk.JP === 'Y') {
      possible = 'Y';
      sangsingisin = word;
      exist = 'Y';
    }
  } else {
    if (sangguk.sssg === 'shang_go' && sangguk.JP === 'Y') {
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
hung.gusin = function (use, sangguk, word, yuksin) {
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
    if (sangguk.sssg === 'shang_come' && sangguk.JP === 'Y') {
      possible = 'Y';
      gusin = word;
      exist = 'Y';
    }
  } else {
    if (sangguk.sssg === 'shang_come' && sangguk.JP === 'Y') {
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

//구신기신
//지장간 속성없음이 빈칸2개이므로
hung.gusingisin = function (use, sangguk, word, yuksin) {
  let result = {};
  let possible = 'N';
  let exist = 'N';
  let gusingisin = '  ';
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
      gusingisin = word;
      exist = 'Y';
    }
  } else {
    if (sangguk.sssg === 'geuk_go' && sangguk.JP === 'Y') {
      possible = 'N';
      gusingisin = word;
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
hung.sanghwa = function (use, word, yuksin, yuksinCheck) {
  let result = {};
  let possible = 'N';
  let exist = 'N';
  let sanghwa = '  ';
  /* if (yuksin === "비견" || yuksin === "겁재") {
  } else if ( */
  if (use.includes('bunhwa') === true && use !== undefined) {
  } else if (useGyouk === '편관격') {
    if (yuksinCheck === '비견') {
      exist = 'Y';
      sanghwa = word;
    }
  } else if (useGyouk === '상관격') {
    if (yuksinCheck === '정관') {
      exist = 'Y';
      sanghwa = word;
    }
  } else if (useGyouk === '건록격') {
    if (yuksinCheck === '정재') {
      exist = 'Y';
      sanghwa = word;
    }
  } else if (useGyouk === '양인격') {
    if (yuksinCheck === '편재') {
      exist = 'Y';
      sanghwa = word;
    }
  }
  if (use.includes('bunhwa') === true && use !== undefined) {
  } else if (
    (use === 'm_yu_sihwa_young' ||
      use === 'm_yu_sihwa' ||
      use === 'yu_sihwa_young' ||
      String(use).trim() === '' ||
      use === undefined) &&
    exist === 'Y' &&
    sanghwa === word
  ) {
    possible = 'Y';
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
hung.sulhwa = function (use, word, yuksin,yuksinCheck) {
  let result = {};
  let possible = 'N';
  let exist = 'N';
  let sulhwa = '  ';
  /* if (yuksin === "비견" || yuksin === "겁재") {
  } else if ( */
  if (use.includes('bunhwa') === true && use !== undefined) {
  } else if (useGyouk === '편관격') {
    if (yuksinCheck === '편재') {
      exist = 'Y';
      sulhwa = word;
    }
  } else if (useGyouk === '상관격') {
    if (yuksinCheck === '겁재') {
      exist = 'Y';
      sulhwa = word;
    }
  } else if (useGyouk === '건록격') {
    if (yuksinCheck === '정인') {
      exist = 'Y';
      sulhwa = word;
    }
  } else if (useGyouk === '양인격') {
    if (yuksinCheck === '편인') {
      exist = 'Y';
      sulhwa = word;
    }
  }
  if (use.includes('bunhwa') === true && use !== undefined) {
  } else if (
    (use === 'm_yu_sihwa_young' ||
      use === 'm_yu_sihwa' ||
      use === 'yu_sihwa_young' ||
      String(use).trim() === '' ||
      use === undefined) &&
    exist === 'Y' &&
    sulhwa === word
  ) {
    possible = 'Y';
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
hung.sul_jae = function (use, word, yuksin,yuksinCheck) {
  let result = {};
  let possible = 'N';
  let exist = 'N';
  let sul_jae = '  ';
  /* if (yuksin === "비견" || yuksin === "겁재") {
  } else if ( */
  if (useGyouk === '편관격') {
    if (yuksinCheck === '편인') {
      exist = 'Y';
      sul_jae = word;
    }
  } else if (useGyouk === '상관격') {
    if (yuksinCheck === '정재') {
      exist = 'Y';
      sul_jae = word;
    }
  } else if (useGyouk === '건록격') {
    if (yuksinCheck === '상관') {
      exist = 'Y';
      sul_jae = word;
    }
  } else if (useGyouk === '양인격') {
    if (yuksinCheck === '식신') {
      exist = 'Y';
      sul_jae = word;
    }
  }
  if (
    (use === 'm_yu_sihwa_young' ||
      use === 'm_yu_sihwa' ||
      use === 'yu_sihwa_young' ||
      String(use).trim() === '' ||
      use === undefined) &&
    exist === 'Y' &&
    sul_jae === word
  ) {
    possible = 'Y';
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
hung.sul_hap = function (use, word, yuksin,yuksinCheck) {
  let result = {};
  let possible = 'N';
  let exist = 'N';
  let sul_hap = '  ';
  /* if (yuksin === "비견" || yuksin === "겁재") {
  } else if ( */
  if (useGyouk === '편관격') {
    if (yuksinCheck === '정인') {
      exist = 'Y';
      sul_hap = word;
    }
  } else if (useGyouk === '상관격') {
    if (yuksinCheck === '편재') {
      exist = 'Y';
      sul_hap = word;
    }
  }
  /*   else if (useGyouk === "건록격") {
        if (yuksin === "상관") {
          result = "Y";
        } else {
          result = "N";
        }
      }
      else if (useGyouk === "양인격") {
        if (yuksin === "식신") {
          result = "Y";
        } else {
          result = "N";
        }
      }*/
  if (
    (use === 'm_yu_sihwa_young' ||
      use === 'm_yu_sihwa' ||
      use === 'yu_sihwa_young' ||
      String(use).trim() === '' ||
      use === undefined) &&
    exist === 'Y' &&
    sul_hap === word
  ) {
    possible = 'Y';
  }
  result = {
    possible: possible,
    word: word,
    yuksin: yuksin,
    exist: exist,
  };
  return result;
};

//이도
//지장간 속성없음이 빈칸2개이므로
hung.yido = function (use, sky1, sky2, sky3, sky4, root, word, yuksin) {
  let result = {};
  let possible = 'N';
  let exist = 'N';
  let yido = '  ';
  /* if (yuksin === "비견" || yuksin === "겁재") {
  } else if ( */
  if (useGyouk === '상관격') {
    if (root === 'pure_root' || root === 'seson_root' || root === 'king_root') {
      if (
        sky1 === '정재' ||
        sky2 === '정재' ||
        sky3 === '정재' ||
        sky4 === '정재'
      ) {
        exist = 'Y';
        yido = word;
      }
    }
  } else if (useGyouk === '편관격') {
    if (root === 'mu_root') {
      if (
        sky1 === '편인' ||
        sky2 === '편인' ||
        sky3 === '편인' ||
        sky4 === '편인'
      ) {
        exist = 'Y';
        yido = word;
      }
    }
  } else if (useGyouk === '건록격') {
    if (root === 'mu_root') {
      if (
        sky1 === '겁재' ||
        sky2 === '겁재' ||
        sky3 === '겁재' ||
        sky4 === '겁재'
      ) {
        exist = 'Y';
        yido = word;
      }
    }
  } else if (useGyouk === '양인격') {
    if (root === 'mu_root') {
      if (
        sky1 === '비견' ||
        sky2 === '비견' ||
        sky3 === '비견' ||
        sky4 === '비견'
      ) {
        exist = 'Y';
        yido = word;
      }
    }
  }
  if (
    (use === 'm_yu_sihwa_young' ||
      use === 'm_yu_sihwa' ||
      use === 'yu_sihwa_young' ||
      String(use).trim() === '' ||
      use === undefined) &&
    exist === 'Y' &&
    yido === word
  ) {
    possible = 'Y';
  }
  result = {
    possible: possible,
    exist: exist,
    word: yido,
  };
  return result;
};

//설화제화
//지장간 속성없음이 빈칸2개이므로
hung.sulHwa_zeHwa = function (use, word ,yuksin, yuksinCheck) {
  let result = {};
  let possible = 'N';
  let exist = 'N';
  let sul_hap = '  ';
  /* if (yuksin === "비견" || yuksin === "겁재") {
  } else if ( */
  if (useGyouk === '편관격') {
    if (yuksinCheck === '편인') {
      exist = 'Y';
      sul_hap = word;
    }
  } else if (useGyouk === '상관격') {
    if (yuksinCheck === '정재') {
      exist = 'Y';
      sul_hap = word;
    }
  }
  if (
    (use === 'm_yu_sihwa_young' ||
      use === 'm_yu_sihwa' ||
      use === 'yu_sihwa_young' ||
      String(use).trim() === '' ||
      use === undefined) &&
    exist === 'Y' &&
    sul_hap === word
  ) {
    possible = 'Y';
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
hung.sengHwa_hapHwa = function (use, sangguk, word, yuksin) {
  let result = {};
  let possible = 'N';
  let exist = 'N';
  let sangsingisin = '  ';
  /* if (yuksin === "비견" || yuksin === "겁재") {
  } else if ( */
  if (
    use === 'm_yu_sihwa_young' ||
    use === 'm_yu_sihwa' ||
    use === 'yu_sihwa_young' ||
    String(use).trim() === '' ||
    use === undefined
  ) {
    if (sangguk.sssg === 'geuk_go' && sangguk.JP === 'N') {
      possible = 'Y';
      sangsingisin = word;
      exist = 'Y';
    }
  } else {
    if (sangguk.sssg === 'geuk_go' && sangguk.JP === 'N') {
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
//설화합화
//지장간 속성없음이 빈칸2개이므로
hung.sulHwa_hapHwa = function (use, sangguk, word, yuksin) {
  let result = {};
  let possible = 'N';
  let exist = 'N';
  let gukgisin = '  ';
  /* if (yuksin === "비견" || yuksin === "겁재") {
  } else if ( */
  if (
    use === 'm_yu_sihwa_young' ||
    use === 'm_yu_sihwa' ||
    use === 'yu_sihwa_young' ||
    String(use).trim() === '' ||
    use === undefined
  ) {
    if (sangguk.sssg === 'geuk_come' && sangguk.JP === 'N') {
      possible = 'Y';
      gukgisin = word;
      exist = 'Y';
    }
  } else {
    if (sangguk.sssg === 'geuk_come' && sangguk.JP === 'N') {
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

module.exports = hung;
