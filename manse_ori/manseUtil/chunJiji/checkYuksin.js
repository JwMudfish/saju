// 단어가 실제로 있는지 없는지 확인하는것
const chunGan = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];


/**
 * @param {Object} obj -> 요소
 * 천간에 이것에 대해서 해당하는 글자가 있는지 확인한다
 * 천간에 상신이 있는지 -> 상신에 대한 글자가 천간에 존재하는지 확인
 * 방식은 일단 요소를 보낸다음에, position에 sky가 포함되어있으면 Y 를 출력 아니면 N를 출력
 * @returns 
 */
exports.checkChunGan = function (obj) {
  const yuksinArray = [
    useYuksin.h_sky,
    useYuksin.m_sky,
    useYuksin.y_sky
  ];
  let result = 'N';
  for (let i = 0; i < yuksinArray.length; i++) {
    if(yuksinArray[i]===obj){
      result='Y'
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
  const yuksinArray = [
    useYuksin.y_jangan.y_jangan3,
    useYuksin.m_jangan.m_jangan3,
    useYuksin.d_jangan.d_jangan3,
    useYuksin.h_jangan.h_jangan3,
  ];
  let result = 'N';
  for (let i = 0; i < yuksinArray.length; i++) {
    if(yuksinArray[i]===obj){
      result='Y'
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
  const yuksinArray = [
    useYuksin.y_jangan.y_jangan1,
    useYuksin.y_jangan.y_jangan2,
    useYuksin.y_jangan.y_jangan3,
    useYuksin.m_jangan.m_jangan1,
    useYuksin.m_jangan.m_jangan2,
    useYuksin.m_jangan.m_jangan3,
    useYuksin.d_jangan.d_jangan1,
    useYuksin.d_jangan.d_jangan2,
    useYuksin.d_jangan.d_jangan3,
    useYuksin.h_jangan.h_jangan1,
    useYuksin.h_jangan.h_jangan2,
    useYuksin.h_jangan.h_jangan3,
  ];
  let result = 'N';
  for (let i = 0; i < yuksinArray.length; i++) {
    if(yuksinArray[i]===obj){
      result='Y'
      break
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
  const yuksinArray = [    
    useYuksin.h_sky,
    useYuksin.m_sky,
    useYuksin.y_sky,
    myManse.yukSin.y_jangan.y_jangan1,
    myManse.yukSin.y_jangan.y_jangan2,
    myManse.yukSin.y_jangan.y_jangan3,
    myManse.yukSin.m_jangan.m_jangan1,
    myManse.yukSin.m_jangan.m_jangan2,
    myManse.yukSin.m_jangan.m_jangan3,
    myManse.yukSin.d_jangan.d_jangan1,
    myManse.yukSin.d_jangan.d_jangan2,
    myManse.yukSin.d_jangan.d_jangan3,
    myManse.yukSin.h_jangan.h_jangan1,
    myManse.yukSin.h_jangan.h_jangan2,
    myManse.yukSin.h_jangan.h_jangan3,
  ];
  let result = 'N';
  for (let i = 0; i < yuksinArray.length; i++) {
    if(yuksinArray[i]===obj){
      result='Y'
      break
    }
  }

  return result;
};

exports.checkJangguanPossible = (obj) => {

  const used = [
    usejijangganUse.yong.y_land.y_jangan1,
    usejijangganUse.yong.y_land.y_jangan2,
    usejijangganUse.yong.y_land.y_jangan3,
    usejijangganUse.yong.m_land.m_jangan1,
    usejijangganUse.yong.m_land.m_jangan2,
    usejijangganUse.yong.m_land.m_jangan3,
    usejijangganUse.yong.d_land.d_jangan1,
    usejijangganUse.yong.d_land.d_jangan2,
    usejijangganUse.yong.d_land.d_jangan3,
    usejijangganUse.yong.h_land.h_jangan1,
    usejijangganUse.yong.h_land.h_jangan2,
    usejijangganUse.yong.h_land.h_jangan3,
  ]
  let yuksin = [
    useYuksin.y_jangan.y_jangan1,
    useYuksin.y_jangan.y_jangan2,
    useYuksin.y_jangan.y_jangan3,
    useYuksin.m_jangan.m_jangan1,
    useYuksin.m_jangan.m_jangan2,
    useYuksin.m_jangan.m_jangan3,
    useYuksin.d_jangan.d_jangan1,
    useYuksin.d_jangan.d_jangan2,
    useYuksin.d_jangan.d_jangan3,
    useYuksin.h_jangan.h_jangan1,
    useYuksin.h_jangan.h_jangan2,
    useYuksin.h_jangan.h_jangan3,
  ];
  let result = 'N';
  for (let i = 0; i < yuksin.length; i++) {
    if (yuksin[i] === obj) {
      if (
        String(used[i]).includes('young') ||
        String(used[i]).trim() === '' ||
        used[i] === undefined
      ){
        result = 'Y';
      }
    }
  }
  return result;
}

exports.checkPossible = (obj) => {

  const used = [
    '',
    '',
    '',
    usejijangganUse.yong.y_land.y_jangan1,
    usejijangganUse.yong.y_land.y_jangan2,
    usejijangganUse.yong.y_land.y_jangan3,
    usejijangganUse.yong.m_land.m_jangan1,
    usejijangganUse.yong.m_land.m_jangan2,
    usejijangganUse.yong.m_land.m_jangan3,
    usejijangganUse.yong.d_land.d_jangan1,
    usejijangganUse.yong.d_land.d_jangan2,
    usejijangganUse.yong.d_land.d_jangan3,
    usejijangganUse.yong.h_land.h_jangan1,
    usejijangganUse.yong.h_land.h_jangan2,
    usejijangganUse.yong.h_land.h_jangan3,
  ]
  let yuksin = [
    useYuksin.h_sky,
    useYuksin.m_sky,
    useYuksin.y_sky,
    useYuksin.y_jangan.y_jangan1,
    useYuksin.y_jangan.y_jangan2,
    useYuksin.y_jangan.y_jangan3,
    useYuksin.m_jangan.m_jangan1,
    useYuksin.m_jangan.m_jangan2,
    useYuksin.m_jangan.m_jangan3,
    useYuksin.d_jangan.d_jangan1,
    useYuksin.d_jangan.d_jangan2,
    useYuksin.d_jangan.d_jangan3,
    useYuksin.h_jangan.h_jangan1,
    useYuksin.h_jangan.h_jangan2,
    useYuksin.h_jangan.h_jangan3,
  ];
  let result = 'N';
  for (let i = 0; i < yuksin.length; i++) {
    if (yuksin[i] === obj) {
      if (
        String(used[i]).includes('young') ||
        String(used[i]).trim() === '' ||
        used[i] === undefined
      ){
        result = 'Y';
      }
    }
  }
  return result;
}