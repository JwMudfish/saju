// 단어가 실제로 있는지 없는지 확인하는것
const chunGan = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
/**
 * @param {Object} obj -> 요소
 * 명식전체인데 월지에있는 요소는 제외함 이것에 대해서 해당하는 글자가 있는지 확인한다
 * 천간에 상신이 있는지 -> 상신에 대한 글자가 천간에 존재하는지 확인
 * 방식은 일단 요소를 보낸다음에, position에 sky가 포함되어있으면 Y 를 출력 아니면 N를 출력
 * @returns 
 */
 exports.checkAllWordWolJiNo = function (obj) {
  let result = 'N';  
  const pilarSky = [
    usePillar.y_sky,
    usePillar.m_sky,
    usePillar.d_sky,
    usePillar.h_sky,
    usejijanggan.y_jangan.y_jangan1,
    usejijanggan.y_jangan.y_jangan2,
    usejijanggan.y_jangan.y_jangan3,
    usejijanggan.d_jangan.d_jangan1,
    usejijanggan.d_jangan.d_jangan2,
    usejijanggan.d_jangan.d_jangan3,
    usejijanggan.h_jangan.h_jangan1,
    usejijanggan.h_jangan.h_jangan2,
    usejijanggan.h_jangan.h_jangan3,
  ];
  for (let i = 0; i < pilarSky.length; i++) {
    if (obj===pilarSky[i]) {
      result = 'Y'
      break
    }
  }

  return result;
};
/**
 * @param {Object} obj -> 요소
 * 명식전체에 대해서 이것에 대해서 해당하는 글자가 있는지 확인한다
 * 천간에 상신이 있는지 -> 상신에 대한 글자가 천간에 존재하는지 확인
 * 방식은 일단 요소를 보낸다음에, position에 sky가 포함되어있으면 Y 를 출력 아니면 N를 출력
 * @returns 
 */
 exports.checkAllWord = function (obj) {
  let result = 'N';  
  const pilarSky = [
    usePillar.y_sky,
    usePillar.m_sky,
    usePillar.d_sky,
    usePillar.h_sky,
    usejijanggan.y_jangan.y_jangan1,
    usejijanggan.y_jangan.y_jangan2,
    usejijanggan.y_jangan.y_jangan3,
    usejijanggan.m_jangan.m_jangan1,
    usejijanggan.m_jangan.m_jangan2,
    usejijanggan.m_jangan.m_jangan3,
    usejijanggan.d_jangan.d_jangan1,
    usejijanggan.d_jangan.d_jangan2,
    usejijanggan.d_jangan.d_jangan3,
    usejijanggan.h_jangan.h_jangan1,
    usejijanggan.h_jangan.h_jangan2,
    usejijanggan.h_jangan.h_jangan3,
  ];
  for (let i = 0; i < pilarSky.length; i++) {
    if (obj===pilarSky[i]) {
      result = 'Y'
      break
    }
  }

  return result;
};

/**
 * @param {Object} obj -> 요소
 * 천간에 이것에 대해서 해당하는 글자가 있는지 확인한다
 * 천간에 상신이 있는지 -> 상신에 대한 글자가 천간에 존재하는지 확인
 * 방식은 일단 요소를 보낸다음에, position에 sky가 포함되어있으면 Y 를 출력 아니면 N를 출력
 * @returns 
 */
 exports.checkChunGanWord = function (obj) {
  let result = 'N';  
  const pilarSky = [
    usePillar.y_sky,
    usePillar.m_sky,
    usePillar.d_sky,
    usePillar.h_sky,
  ];
  for (let i = 0; i < pilarSky.length; i++) {
    if (obj===pilarSky[i]) {
      result = 'Y'
      break
    }
  }

  return result;
};

/**
 * @param {Object} obj -> 요소
 * 천간에 이것에 대해서 해당하는 글자가 있는지 확인한다
 * 천간에 상신이 있는지 -> 상신에 대한 글자가 천간에 존재하는지 확인
 * 방식은 일단 요소를 보낸다음에, position에 sky가 포함되어있으면 Y 를 출력 아니면 N를 출력
 * @returns 
 */
exports.checkChunGan = function (obj) {
  let result = 'N';
  for (let i = 0; i < obj.position.length; i++) {
    if (obj.position[i].includes('sky')) {
      result = 'Y'
      break
    }
  }

  return result;
};

/**
 * 
 * @param {Object} obj 
 *  지지에 이것에 대해서 해당하는 글자가 있는지 확인한다
 * 지지에 상신이 있는지 -> 상신에 대한 글자가 지지에 존재하는지 확인
 * 방식은 일단 요소를 보낸다음에, position에 sky가 포함되어있으면 Y 를 출력 아니면 N를 출력
 * @returns 
 */
exports.checkJIJI = function (obj) {
  let result = 'N';
  for (let i = 0; i < obj.position.length; i++) {
    if (obj.position[i].includes('jangan3')) {
      result = 'Y'
      break
    }
  }

  return result;
};

/**
 * 
 * @param {*} obj -> 요소
* 지장간에 이것에 대해서 해당하는 글자가 있는지 확인한다
* 지장간에 상신이 있는지 -> 상신에 대한 글자가 지장간에 존재하는지 확인
* 방식은 일단 요소를 보낸다음에, position에 jangan이 포함되어있으면 Y 를 출력 아니면 N를 출력
* "이함수는 사용대기 포함 존재만 있으면 Y를 출력하고 아니면 N을 출력한다."
 * @returns 
 */
exports.checkGangGuan = function (obj) {
  let result = 'N';
  for (let i = 0; i < obj.position.length; i++) {
    if (obj.position[i].includes('jangan')) {
      result = 'Y'
      break
    }
  }

  return result;
};

/**
@param {*} obj -> 요소
* 지장간에 이것에 대해서 해당하는 글자가 있는지 확인한다
* 지장간에 상신이 있는지 -> 상신에 대한 글자가 지장간에 존재하는지 확인
* 방식은 일단 요소를 보낸다음에, position에 jangan이 포함되어있으면 Y 를 출력 아니면 N를 출력
* "이함수는 사용가능한것만 체크하면 사용가능한 글자이면 Y를 출력하고 아니면 N을 출력한다."
 * @returns 
 */
exports.checkGangGuanPossible = function (obj) {
  let result = 'N';
  for (let i = 0; i < obj.position.length; i++) {
    if (obj.position[i].includes('jangan')) {
      if(obj.use[i]==='y' ||obj.use[i]==='Y'  ){
        result = 'Y'
        break
      }
    }
  }
  return result;
};

/**
@param {Object} obj -> 요소
* 원국 전체에서 이것에 대해서 해당하는 글자가 있는지 확인한다
* 지장간에 상신이 있는지 -> 상신에 대한 글자가 지장간에 존재하는지 확인
* 방식은 일단 요소를 보낸다음에, position에 jangan이 포함되어있으면 Y 를 출력 아니면 N를 출력
* "이함수는 원국전체를 확인해서 이글자가 있기만 하면 Y를 출력하고 아니면 N을 출력한다."
 * @returns 
 */
exports.checkALL = function (obj) {
  let result = 'N';
  if(obj.exist==='Y') {
    result = 'Y'
  }
  return result;
};

/**
@param {Object} obj -> 요소
* 원국 전체에서 이것에 대해서 해당하는 글자가 있는지 확인한다
* 지장간에 상신이 있는지 -> 상신에 대한 글자가 지장간에 존재하는지 확인
* 방식은 일단 요소를 보낸다음에, position에 jangan이 포함되어있으면 Y 를 출력 아니면 N를 출력
* "이함수는 전체 팔자에서 사용가능한 글자면 체크하면 사용가능한 글자이면 Y를 출력하고 아니면 N을 출력한다."
 * @returns 
 */
exports.checkPossible = function (obj) {
  let result = 'N';
  for (let i = 0; i < obj.position.length; i++) {
    if (obj.position[i].includes('sky')) {
      result = 'Y'
      break
    }
    else if (obj.position[i].includes('jangan')) {
      if(obj.use[i]==='y' ||obj.use[i]==='Y'  ){
        result = 'Y'
        break
      }
    }
  }
  return result;
};