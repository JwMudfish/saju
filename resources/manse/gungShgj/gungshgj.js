var gungshgj = {};
const sssgFunc = require('./yuksinSSSG');
gungshgj.gukgubun = function () {
  let result;
  if (
    useGyouk === '건록격' ||
    useGyouk === '양인격' ||
    useGyouk === '상관격' ||
    useGyouk === '편관격' 
  ) {
    result = '흉격';
  } else if (
    useGyouk === '정재격' ||
    useGyouk === '편재격' ||
    useGyouk === '정관격' ||
    useGyouk === '식신격' ||
    useGyouk === '정인격'||
    useGyouk === '편인격'
  ) {
    result = '길격';
  } else {
    result = '';
  }
  return result;
};

gungshgj.sangguk = function (yuksin) {
  let result;
  let gyoukYuksin = changeGyoukYuksin();
  let divideYuksin = getDivideYuksin(yuksin);
  let divideGyoukYuksin = getDivideYuksin(gyoukYuksin);

  let yuksinJungPyun = jungPyun(yuksin);
  let yuksinGyoukJungPyun = jungPyun(gyoukYuksin, 'gyouk');
  let sssg = sssgFunc.sssg(divideGyoukYuksin, divideYuksin);
  if (yuksinJungPyun === yuksinGyoukJungPyun) {
    result = {
      sssg: sssg,
      JP: 'Y',
    };
  } else {
    result = {
      sssg: sssg,
      JP: 'N',
    };
  }
  return result;
};

function jungPyun(yuksin, gyouk) {
  let result = '';
  let check = false;
  if (gyouk === 'gyouk') {
    if (useGyouk === '양인격') {
      result = '편';
      check = true;
    } else if (useGyouk === '건록격') {
      result = '정';
      check = true;
    }else if (
      (yuksin === '겁재' ||
        yuksin === '상관' ||
        yuksin === '정재' ||
        yuksin === '정관' ||
        yuksin === '정인') &&
      check === false
    ) {
      result = '정';
    } else if (
      (yuksin === '비견' ||
        yuksin === '식신' ||
        yuksin === '편재' ||
        yuksin === '편관' ||
        yuksin === '편인') &&
      check === false
    ) {
      result = '편';
    }
    
  } else if (
    (yuksin === '겁재' ||
      yuksin === '상관' ||
      yuksin === '정재' ||
      yuksin === '정관' ||
      yuksin === '정인') &&
    check === false
  ) {
    result = '정';
  } else if (
    (yuksin === '비견' ||
      yuksin === '식신' ||
      yuksin === '편재' ||
      yuksin === '편관' ||
      yuksin === '편인') &&
    check === false
  ) {
    result = '편';
  }
  return result;
}

function getDivideYuksin(yuksin) {
  let result = '';
  if (yuksin === '비견' || yuksin === '겁재') {
    result = '비겁';
  } else if (yuksin === '식신' || yuksin === '상관') {
    result = '식상';
  } else if (yuksin === '편재' || yuksin === '정재') {
    result = '재성';
  } else if (yuksin === '편관' || yuksin === '정관') {
    result = '관성';
  } else if (yuksin === '정인' || yuksin === '편인') {
    result = '인성';
  }
  return result;
}

function changeGyoukYuksin() {
  let result = '';
  if (useGyouk === '양인격') {
    result = '겁재';
  } else if (useGyouk === '건록격') {
    result = '비견';
  } else if (useGyouk === '정재격') {
    result = '정재';
  } else if (useGyouk === '편재격') {
    result = '편재';
  } else if (useGyouk === '정인격') {
    result = '정인';
  } else if (useGyouk === '편인격') {
    result = '편인';
  } else if (useGyouk === '정관격') {
    result = '정관';
  } else if (useGyouk === '편관격') {
    result = '편관';
  } else if (useGyouk === '식신격') {
    result = '식신';
  } else if (useGyouk === '상관격') {
    result = '상관';
  }

  return result;
}
module.exports = gungshgj;
