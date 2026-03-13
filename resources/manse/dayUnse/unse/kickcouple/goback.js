var unse = {};
let goback = require('../../../../dayUnseResult/goBack.json');
//연애운
unse.goback = function () {
  let result = getResult('열번찍기만..');
  if (gobackGood(0) === true) {
    result = getResult('오늘이 최적의 날, 하늘도 돕는다 _ 성공률 200%');
  } else if (gobackGood(1) === true) {
    result = getResult('내 마음이 더 앞서는 날, 기회를 보자 _ 성공률 89.9%');
  } else if (
    useGyouk !== '정재격' &&
    useGyouk !== '편재격' &&
    gobackGood(2) === true
  ) {
    result = getResult('확신이 있으면, 달려라 _ 성공률 70%');
  } else if (
    (useGyouk === '정재격' || useGyouk === '편재격') &&
    gobackGood(2) === true
  ) {
    result = getResult('서로 마음이 통했음');
  } else if (
    chunGan('정인', '편인') === true &&
    (useTodayYuksin.d_sky === '비견' || useTodayYuksin.d_sky === '겁재')
  ) {
    result = getResult('언젠간 될거다, 연락하기 좋은 날 _ 성공률 50%');
  } else if (
    chunGan('정인', '편인') === false &&
    (useTodayYuksin.d_sky === '비견' || useTodayYuksin.d_sky === '겁재')
  ) {
    result = getResult('표현이 너무 과해 지는 날 _ 성공률 0.5%');
  } else if (
    (useTodayYuksin.m_land === '식신' || useTodayYuksin.m_land === '상관') &&
    (useTodayYuksin.d_sky === '식신' || useTodayYuksin.d_sky === '상관')
  ) {
    result = getResult('오늘은 고백 받을 가능성 최상');
  } else if (
    chunGan('비견', '겁재') === true &&
    (useTodayYuksin.d_sky === '식신' || useTodayYuksin.d_sky === '상관')
  ) {
    result = getResult('상대의 표현을 받아 주면 좋은 관계로 발전');
  } else if (
    useTodayYuksin.d_sky === '식신' ||
    useTodayYuksin.d_sky === '상관'
  ) {
    result = getResult('고백의 시그널이 있음 틈을 보여주자');
  } else if (
    useTodayYuksin.m_land === '식신' ||
    useTodayYuksin.m_land === '상관'
  ) {
    result = getResult('상대의 시그널을 놓치지 마세요');
  } else if (gobackGoodMonth() === true) {
    result = getResult('이달은 적극적으로 다가가 기회를 만들어야 합니다');
  } else {
    result = getResult('이런 날은 가까워지기 위해 다가가는 것이 중요');
  }

  return result;
};
/** 
년운, 월운, 일운 모두 고백운인 경우 -> num:0

월운, 일운 모두 고백운인 경우 -> num:1

일운 모두 고백운인 경우 -> num:2 
 * @param {string} check 특정숫자
*/
function gobackGood(check) {
  let result = false;
  if (useGyouk === '식신격' || useGyouk === '상관격') {
    if (todayChunGan2('정재', '편재', check) === true) {
      result = true;
    }
  } else if (useGyouk === '정재격' || useGyouk === '편재격') {
    if (todayChunGan2('식신', '상관', check) === true) {
      result = true;
    }
  } else if (useGyouk === '정인격' || useGyouk === '편인격') {
    if (todayChunGan2('정관', '편관', check) === true) {
      result = true;
    }
  } else if (useGyouk === '정관격' || useGyouk === '편관격') {
    if (todayChunGan2('정인', '편인', check) === true) {
      result = true;
    }
  }
  return result;
}

function gobackGoodMonth() {
  let result = false;
  if (useGyouk === '식신격' || useGyouk === '상관격') {
    if (useTodayYuksin.m_sky === '정재' || useTodayYuksin.m_sky === '편재') {
      result = true;
    }
  } else if (useGyouk === '정재격' || useGyouk === '편재격') {
    if (useTodayYuksin.m_sky === '식신' || useTodayYuksin.m_sky === '상관') {
      result = true;
    }
  } else if (useGyouk === '정인격' || useGyouk === '편인격') {
    if (useTodayYuksin.m_sky === '정관' || useTodayYuksin.m_sky === '편관') {
      result = true;
    }
  } else if (useGyouk === '정관격' || useGyouk === '편관격') {
    if (useTodayYuksin.m_sky === '정인' || useTodayYuksin.m_sky === '편인') {
      result = true;
    }
  }
  return result;
}

function chunGan(yuksin1, yuksin2) {
  let result = false;

  let yuksin = [
    useYuksin.y_sky,
    useYuksin.m_sky,
    useYuksin.d_sky,
    useYuksin.h_sky,
  ];

  for (let i = 0; i < yuksin.length; i++) {
    if (yuksin[i] === yuksin1 || yuksin[i] === yuksin2) {
      result = true;
      break;
    }
  }
  return result;
}

/** 
년운, 월운, 일운 모두 고백운인 경우 -> num:0
월운, 일운 모두 고백운인 경우 -> num:1
일운 모두 고백운인 경우 -> num:2 
 * @param {string} yuksin1 육신1
 * @param {string} yuksin2 육신2
 * @param {string} num 특정숫자
*/
function todayChunGan2(yuksin1, yuksin2, num) {
  let result = true;

  let yuksin = [
    useTodayYuksin.y_sky,
    useTodayYuksin.m_sky,
    useTodayYuksin.d_sky,
  ];

  for (let i = num; i < yuksin.length; i++) {
    if (yuksin[i] !== yuksin1 && yuksin[i] !== yuksin2) {
      result = false;
      break;
    }
  }
  return result;
}

function todayChunGan(yuksin1, yuksin2) {
  let result = false;

  let yuksin = [
    useTodayYuksin.y_sky,
    useTodayYuksin.m_sky,
    useTodayYuksin.d_sky,
  ];

  for (let i = 0; i < yuksin.length; i++) {
    if (yuksin[i] === yuksin1 || yuksin[i] === yuksin2) {
      result = true;
      break;
    }
  }
  return result;
}

function getResult(word) {
  let result;
  for (let i = 0; i < goback.data.length; i++) {
    if (goback.data[i].title === word) {
      result = goback.data[i];
      break;
    }
  }
  return result;
}

module.exports = unse;
