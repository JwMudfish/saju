var hapChug = {};
const hapChugFunc = require("../../manseUtil/hapchung/samhapUtil");
//삼합을 뱉어내는 함수
//one이 기준점 other가 비교할 요소들
//checkYMDH은 년지인지 월지인지 일지인지 시지인지 구분하는것
//checkYMDH===y ->년지
//checkYMDH===m ->월지
//checkYMDH===d ->일지
//checkYMDH===h ->시지
//설명글에 WOL_samhap->월지기준
//hapChug.samhap = function (one, other1, other2, other3, checkYMDH, today) {

/**
 * 팔자 전체에 합충이 있는지 없는지 체크하는 함수이다
 * @param {*} one 
 * @param {*} checkYMDH ->년지,월지,일지,시지
 * @returns {String}
 * 변경사항: hapchungFunc를 사용하기 시작
 */
hapChug.samhap = function (one, checkYMDH) {
  let result;
  /*if (
    checkYMDH === 'ty' ||
    checkYMDH === 'tm' ||
    checkYMDH === 'td' ||
    checkYMDH === 'th'
  ) {
    if (
      getSamHap(today, other1) === true ||
      getSamHap(today, other2) === true ||
      getSamHap(today, other3) === true ||
      getSamHap(today, one) === true
    ) {
      //   result = today + "," + jiji;
      result = today;
    } else {
      result = '';
    }
  } else {*/
  if (
    hapChugFunc.checkSamhapChoiceYN(one, checkYMDH) === 'Y'
  ) {
    //  result = one + "," + jiji;
    result = one;
  } else {
    result = '';
  }
  //  }
  return result;
};
/*hapChug.checkSamhap = function (one, other) {
  let result;
  if (getSamHap(one, other) === true) {
    result = 'Y';
  } else {
    result = 'N';
  }
  return result;
};*/

//삼합을 뱉어내는 함수
//one이 기준점 other가 비교할 요소들
//checkYMDH은 년지인지 월지인지 일지인지 시지인지 구분하는것
//checkYMDH===y ->년지
//checkYMDH===m ->월지
//checkYMDH===d ->일지
//checkYMDH===h ->시지
hapChug.banghap = function (one, checkYMDH) {
  let result;
  if (
    hapChugFunc.checkBanghapChoiceYN(one, checkYMDH) === 'Y'
  ) {
    // result = one + "," + jiji;
    result = one;
  } else {
    result = '';
  }
  return result;
};

//충을 뱉어내는 함수
//one이 기준점 other가 비교할 요소들
//checkYMDH은 년지인지 월지인지 일지인지 시지인지 구분하는것
//checkYMDH===y ->년지
//checkYMDH===m ->월지
//checkYMDH===d ->일지
//checkYMDH===h ->시지
hapChug.yukhap = function (one, checkYMDH) {
  let result;
  if (
    hapChugFunc.checkYukhapYN(one, checkYMDH) === 'Y'
  ) {
    result = one;
  } else {
    result = '';
  }
  return result;
};

//충을 뱉어내는 함수
//one이 기준점 other가 비교할 요소들
//checkYMDH은 년지인지 월지인지 일지인지 시지인지 구분하는것
//checkYMDH===y ->년지
//checkYMDH===m ->월지
//checkYMDH===d ->일지
//checkYMDH===h ->시지
hapChug.chung = function (one, checkYMDH) {
  let result;
  if (
    hapChugFunc.checkChungChoiceYN(one, checkYMDH) === 'Y'
  ) {
    result = one;
  } else {
    result = '';
  }
  return result;
};

//삼합 계산하는 함수
//월지와 (정확히는 기준요소와) 다른요소랑 비교
function getSamHap(one, other) {
  let result = false;
  if (one === '인' || one === '오' || one === '술') {
    if (one !== other && (other === '인' || other === '오' || other === '술')) {
      result = true;
    }
  } else if (one === '해' || one === '묘' || one === '미') {
    if (one !== other && (other === '해' || other === '묘' || other === '미')) {
      result = true;
    }
  } else if (one === '신' || one === '자' || one === '진') {
    if (one !== other && (other === '신' || other === '자' || other === '진')) {
      result = true;
    }
  } else if (one === '사' || one === '유' || one === '축') {
    if (one !== other && (other === '사' || other === '유' || other === '축')) {
      result = true;
    }
  }
  return result;
}
hapChug.whatSamhap = function (samhap) {
  let fire = '';
  let fireMonth = '';
  const fireArray = ['인', '오', '술'];
  let water = '';
  let waterMonth = '';
  const waterArray = ['신', '자', '진'];
  let tree = '';
  let treeMonth = '';
  const treeArray = ['해', '묘', '미'];
  let rock = '';
  let rockMonth = '';
  const rockArray = ['사', '유', '축'];
  let result = {}

  let array = [samhap.year, samhap.day, samhap.hour];
  let arrayMonth = [samhap.year, samhap.month, samhap.day, samhap.hour];
  fireMonth = getHapChungMonth(arrayMonth, array, fireArray)
  if (fireMonth.word !== '') {
    result.monthWord = fireMonth.word
    result.monthArray = fireMonth.array
    result.monthExist = fireMonth.exist
  }

  fire = getHapChung(array, fireArray)
  if (fire.word !== '') {
    result.word = fire.word
    result.array = fire.array
    result.exist = fire.exist
  }
  waterMonth = getHapChungMonth(arrayMonth, array, waterArray)
  if (waterMonth.word !== '') {
    result.monthWord = waterMonth.word
    result.monthArray = waterMonth.array
    result.monthExist = waterMonth.exist
  }

  water = getHapChung(array, waterArray)
  if (water.word !== '') {
    result.word = water.word
    result.array = water.array
    result.exist = water.exist
  }

  treeMonth = getHapChungMonth(arrayMonth, array, treeArray)
  if (treeMonth.word !== '') {
    result.monthWord = treeMonth.word
    result.monthArray = treeMonth.array
    result.monthExist = treeMonth.exist
  }

  tree = getHapChung(array, treeArray)
  if (tree.word !== '') {
    result.word = tree.word
    result.array = tree.array
    result.exist = tree.exist
  }
  rockMonth = getHapChungMonth(arrayMonth, array, rockArray)
  if (rockMonth.word !== '') {
    result.monthWord = rockMonth.word
    result.monthArray = rockMonth.array
    result.monthExist = rockMonth.exist
  }


  rock = getHapChung(array, rockArray)
  if (rock.word !== '') {
    result.word = rock.word
    result.array = rock.array
    result.exist = rock.exist
  }
  //월지기준과 월지기준이 아닐때 같은게 나오면
  //월지 기준만 출력하게 설정
  if (result.monthExist !== undefined && result.exist !== undefined) {
    if (result.monthExist[0] === result.exist[0] &&
      result.monthExist[1] === result.exist[1] &&
      result.monthExist[2] === result.exist[2]) {
      result.word = ''
      result.array = []
      result.exist = []
    }
  }
  // 월지기준 undefined 설정
  if (result.monthExist === undefined) {
    result.monthWord = ''
    result.monthArray = []
    result.monthExist = []
  }
  // 월지아님기준 undefined 설정
  if (result.exist === undefined) {
    result.word = ''
    result.array = []
    result.exist = []
  }


  return result;
};
const getHapChung = (array, word) => {
  let hapChungWord = '';
  let hapChungWordArray = [];
  let result = {
    word: '',
    array: [],
    exist: [],
  };
  if (array.includes(word[0]) && array.includes(word[1]) && array.includes(word[2])) {
    hapChungWord = word[0] + ' ' + word[1] + ' ' + word[2];
    hapChungWordArray = [word[0], word[1], word[2]];

  } else if (array.includes(word[1]) && array.includes(word[2])) {
    hapChungWord = word[1] + ' ' + word[2];
    hapChungWordArray = ['', word[1], word[2]];

  } else if (array.includes(word[0]) && array.includes(word[2])) {
    hapChungWord = word[0] + ' ' + word[2];
    hapChungWordArray = [word[0], '', word[2]];

  } else if (array.includes(word[0]) && array.includes(word[1])) {
    hapChungWord = word[0] + ' ' + word[1];
    hapChungWordArray = [word[0], word[1], ''];

  }
  if (hapChungWord !== '') {
    result.word = hapChungWord;
    result.array = hapChungWordArray;
    result.exist.push(word[0])
    result.exist.push(word[1])
    result.exist.push(word[2])
  }

  return result;
}

const getHapChungMonth = (arrayMonth, array, word) => {
  let hapChungWord = '';
  let hapChungWordArray = [];
  let result = {
    word: '',
    array: [],
    exist: [],
  };
  if (word.includes(usePillar.m_land) && array.filter(x => word.includes(x)).length !== 0) {
    let temp = array.filter(x => word.includes(x))
    temp.push(usePillar.m_land)
    if (temp.includes(word[0])) {
      hapChungWord = word[0] + ' '
      hapChungWordArray.push(word[0])
    }
    else {
      hapChungWordArray.push('')
    }
    if (temp.includes(word[1])) {
      hapChungWord = word[1] + ' '
      hapChungWordArray.push(word[1])
    }
    else {
      hapChungWordArray.push('')
    }
    if (temp.includes(word[2])) {
      hapChungWord = word[2] + ' '
      hapChungWordArray.push(word[2])
    }
    else {
      hapChungWordArray.push('')
    }
  }
  /*if (array.includes(word[0]) && array.includes(word[1]) && array.includes(word[2])) {
    hapChungWord = word[0] + ' ' + word[1] + ' ' + word[2];
    hapChungWordArray = [word[0], word[1], word[2]];
  } else if (arrayMonth.includes(word[1]) && arrayMonth.includes(word[2])) {
    hapChungWord = word[1] + ' ' + word[2];
    hapChungWordArray = ['', word[1], word[2]];

  } else if (arrayMonth.includes(word[0]) && arrayMonth.includes(word[2])) {
    hapChungWord = word[0] + ' ' + word[2];
    hapChungWordArray = [word[0], '', word[2]];

  } else if (arrayMonth.includes(word[0]) && arrayMonth.includes(word[1])) {
    hapChungWord = word[0] + ' ' + word[1];
    hapChungWordArray = [word[0], word[1], ''];

  } else if (usePillar.m_land === word[0] && array.includes(word[0])) {
    hapChungWord = word[0];
    hapChungWordArray = [word[0], '', ''];

  } else if (usePillar.m_land === word[1] && array.includes(word[1])) {
    hapChungWord = word[1];
    hapChungWordArray = ['', word[1], ''];

  } else if (usePillar.m_land === word[2] && array.includes(word[2])) {
    hapChungWord = word[2];
    hapChungWordArray = ['', '', word[2]];

  } */
  if (hapChungWord !== '') {
    result.word = hapChungWord;
    result.array = hapChungWordArray;
    result.exist.push(word[0])
    result.exist.push(word[1])
    result.exist.push(word[2])
  }

  return result;
}

const checkMonthHap = (word) => {
  let result = false;
  if (word.includes(usePillar.m_land)) {

  }
  return result;
}
hapChug.whatBanghap = function (banghap) {
  let fire = '';
  let fireMonth = '';
  const fireArray = ['사', '오', '미'];
  let water = '';
  let waterMonth = '';
  const waterArray = ['해', '자', '축'];
  let tree = '';
  let treeMonth = '';
  const treeArray = ['인', '묘', '진'];
  let rock = '';
  let rockMonth = '';
  const rockArray = ['신', '유', '술'];
  let result = {}

  let array = [banghap.year, banghap.day, banghap.hour];
  let arrayMonth = [banghap.year, banghap.month, banghap.day, banghap.hour];
  fireMonth = getHapChungMonth(arrayMonth, array, fireArray)
  if (fireMonth.word !== '') {
    result.monthWord = fireMonth.word
    result.monthArray = fireMonth.array
    result.monthExist = fireMonth.exist
  }

  fire = getHapChung(array, fireArray)
  if (fire.word !== '') {
    result.word = fire.word
    result.array = fire.array
    result.exist = fire.exist
  }
  waterMonth = getHapChungMonth(arrayMonth, array, waterArray)
  if (waterMonth.word !== '') {
    result.monthWord = waterMonth.word


    result.monthArray = waterMonth.array
    result.monthExist = waterMonth.exist
  }

  water = getHapChung(array, waterArray)
  if (water.word !== '') {
    result.word = water.word
    result.array = water.array
    result.exist = water.exist
  }

  treeMonth = getHapChungMonth(arrayMonth, array, treeArray)
  if (treeMonth.word !== '') {
    result.monthWord = treeMonth.word
    result.monthArray = treeMonth.array
    result.monthExist = treeMonth.exist
  }

  tree = getHapChung(array, treeArray)
  if (tree.word !== '') {
    result.word = tree.word
    result.array = tree.array
    result.exist = tree.exist
  }
  rockMonth = getHapChungMonth(arrayMonth, array, rockArray)
  if (rockMonth.word !== '') {
    result.monthWord = rockMonth.word
    result.monthArray = rockMonth.array
    result.monthExist = rockMonth.exist
  }


  rock = getHapChung(array, rockArray)
  if (rock.word !== '') {
    result.word = rock.word
    result.array = rock.array
    result.exist = rock.exist
  }
  //월지기준과 월지기준이 아닐때 같은게 나오면
  //월지 기준만 출력하게 설정
  if (result.monthExist !== undefined && result.exist !== undefined) {
    if (result.monthExist[0] === result.exist[0] &&
      result.monthExist[1] === result.exist[1] &&
      result.monthExist[2] === result.exist[2]) {
      result.word = ''
      result.array = []
      result.exist = []
    }
  }
  // 월지기준 undefined 설정
  if (result.monthExist === undefined) {
    result.monthWord = ''
    result.monthArray = []
    result.monthExist = []
  }
  // 월지아님기준 undefined 설정
  if (result.exist === undefined) {
    result.word = ''
    result.array = []
    result.exist = []
  }

  return result;
};

hapChug.whatChung = function (chung) {
  let result = {
    word: [],
    one: [],
    two: [],
  };
  let resultArray = []
  let array = [chung.year, chung.month, chung.day, chung.hour];

  if (array.includes('인') && array.includes('신')) {
    result.word.push('인 신');
    resultArray.push(['인', '신']);
  } if (array.includes('사') && array.includes('해')) {
    result.word.push('사 해');
    resultArray.push(['사', '해']);
  } if (array.includes('자') && array.includes('오')) {
    result.word.push('자 오');
    resultArray.push(['자', '오']);
  } if (array.includes('묘') && array.includes('유')) {
    result.word.push('묘 유');
    resultArray.push(['묘', '유']);
  } if (array.includes('진') && array.includes('술')) {
    result.word.push('진 술');
    resultArray.push(['진', '술']);
  } if (array.includes('축') && array.includes('미')) {
    result.word.push('축 미');
    resultArray.push(['축', '미']);
  }
  if (resultArray.length === 1) {
    result.one = resultArray[0]
  }
  else if (resultArray.length === 2) {
    result.one = resultArray[0]
    result.two = resultArray[1]
    if ((resultArray[0][0] === resultArray[1][0]) &&
      (resultArray[0][1] === resultArray[1][1])) {
      result.two = []
    }
  }
  return result;
};

hapChug.whatYukhap = function (yukhap) {
  let result = {
    word: [],
    one: [],
    two: [],
  };
  let resultArray = []
  let array = [yukhap.year, yukhap.month, yukhap.day, yukhap.hour];

  if (array.includes('자') && array.includes('축')) {
    result.word.push('자 축');
    resultArray.push(['자', '축']);
  } if (array.includes('인') && array.includes('해')) {
    result.word.push('인 해');
    resultArray.push(['인', '해']);
  } if (array.includes('묘') && array.includes('술')) {
    result.word.push('묘 술');
    resultArray.push(['묘', '술']);
  } if (array.includes('진') && array.includes('유')) {
    result.word.push('진 유');
    resultArray.push(['진', '유']);
  } if (array.includes('사') && array.includes('신')) {
    result.word.push('사 신');
    resultArray.push(['사', '신']);
  } if (array.includes('오') && array.includes('미')) {
    result.word.push('오 미');
    resultArray.push(['오', '미']);
  }
  if (resultArray.length === 1) {
    result.one = resultArray[0]
  }
  else if (resultArray.length === 2) {
    result.one = resultArray[0]
    result.two = resultArray[1]
    if ((resultArray[0][0] === resultArray[1][0]) &&
      (resultArray[0][1] === resultArray[1][1])) {
      result.two = []
    }
  }
  return result;
};
module.exports = hapChug;
