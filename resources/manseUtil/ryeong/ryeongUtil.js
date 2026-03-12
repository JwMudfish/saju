/**
 * useRyeong을 함수로 패킹해서 매번 useRyeong에 뭐가들어있는지 확인 안하기 위해 만든 함수
 * @returns useRyeong을 그대로 출력
 */
exports.ryeongCollection = () =>{
  let result={
    yongsin:useRyeong.yongsin,
    saryeong:useRyeong.saryeong,
    heuisin:useRyeong.heuisin,
    junghwa:useRyeong.junghwa,
    junghwa_gisin:useRyeong.junghwa_gisin,
    jisok:useRyeong.jisok,
    jisok_gisin:useRyeong.jisok_gisin,
    hwakjang:useRyeong.hwakjang,
    hwakjang_gisin:useRyeong.hwakjang_gisin,
    um_heuisin_gisin:useRyeong.um_heuisin_gisin,
    um_gisin:useRyeong.um_gisin,
    geuk_heuisin_gisin:useRyeong.geuk_heuisin_gisin,
    geuk_gisin:useRyeong.geuk_gisin
  };
  return result;
}

/**
 * 배열만들기
 * @param {function} func 사용할 요소함수
 * @param {string} word 요소에 해당하는 글자
 * @returns {string} 희신 글자
 */
exports.makeElementArray = (func, word, yuksin) => {
  const pillar = [
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

  ]

  const used = [
    '',
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
  const land = [
    '',
    '',
    '',
    '',
    usePillar.y_land,
    usePillar.y_land,
    usePillar.y_land,
    usePillar.m_land,
    usePillar.m_land,
    usePillar.m_land,
    usePillar.d_land,
    usePillar.d_land,
    usePillar.d_land,
    usePillar.h_land,
    usePillar.h_land,
    usePillar.h_land,
  ]
  const check = [
    '',
    '',
    '',
    '',
    'y',
    'y',
    'y',
    'm',
    'm',
    'm',
    'd',
    'd',
    'd',
    'h',
    'h',
    'h',
  ]
  let result = [];
  for (let i = 0; i < pillar.length; i++) {
    result.push(func(pillar[i], word, yuksin, used[i], land[i], check[i]))
  }
  return result;
}

/**
 * 중화체크
 * @param {string} dr 당령
 * @returns {string} 중화 글자
 */
exports.getYNP = (obj) => {
  let result;
  let exist = [
    obj[0].exist,
    obj[1].exist,
    obj[2].exist,
    obj[3].exist,
    obj[4].exist,
    obj[5].exist,
    obj[6].exist,
    obj[7].exist,
    obj[8].exist,
    obj[9].exist,
    obj[10].exist,
    obj[11].exist,
    obj[12].exist,
    obj[13].exist,
    obj[14].exist,
    obj[15].exist,
  ];
  let name = [
    'y_sky',
    'm_sky',
    'd_sky',
    'h_sky',
    'y_jangan1',
    'y_jangan2',
    'y_jangan3',
    'm_jangan1',
    'm_jangan2',
    'm_jangan3',
    'd_jangan1',
    'd_jangan2',
    'd_jangan3',
    'h_jangan1',
    'h_jangan2',
    'h_jangan3',
  ];
  let jjangproperty = [
    ' ',
    ' ',
    ' ',
    ' ',
    usejijangganUse.yong.y_land.y_jangan1,
    usejijangganUse.yong.y_land.y_jangan2,
    ' ',
    usejijangganUse.yong.m_land.m_jangan1,
    usejijangganUse.yong.m_land.m_jangan2,
    ' ',
    usejijangganUse.yong.d_land.d_jangan1,
    usejijangganUse.yong.d_land.d_jangan2,
    ' ',
    usejijangganUse.yong.h_land.h_jangan1,
    usejijangganUse.yong.h_land.h_jangan2,
    ' ',
  ];
  let objUse = [
    obj[0].possible,
    obj[1].possible,
    obj[2].possible,
    obj[3].possible,
    obj[4].possible,
    obj[5].possible,
    obj[6].possible,
    obj[7].possible,
    obj[8].possible,
    obj[9].possible,
    obj[10].possible,
    obj[11].possible,
    obj[12].possible,
    obj[13].possible,
    obj[14].possible,
    obj[15].possible,
  ];
  let yn = 'N';
  let position = [];
  let property = [];
  let use = [];
  for (let i = 0; i < exist.length; i++) {
    //대소문자 구분없애는 함수 사용해야할듯
    if (exist[i] === 'y' || exist[i] === 'Y') {
      yn = 'Y';
      position.push(name[i]);
      property.push(jjangproperty[i]);
      use.push(objUse[i]);
    }
  }
  result = {
    exist: yn,
    position: position,
    property: property,
    use: use,
    word: obj[0].word,
    yuksin: obj[0].yuksin,
  };
  return result;
}