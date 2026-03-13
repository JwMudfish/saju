
/**
 * useShgj을 함수로 패킹해서 매번 useShgj에 뭐가들어있는지 확인 안하기 위해 만든 함수
 * @returns useShgj을 그대로 출력
 */
 exports.gungShgjCollection = () =>{
  let result={
    sangsin:useShgj.sangsin,
    sangsingisin:useShgj.sangsingisin,
    gusin:useShgj.gusin,
    gukgisin:useShgj.gukgisin,
    gusingisin:useShgj.gusingisin,
    sanghwa:useShgj.sanghwa,
    sulhwa:useShgj.sulhwa,
    sang_jae:useShgj.sang_jae,
    sul_jae:useShgj.sul_jae,
    sang_hap:useShgj.sang_hap,
    sul_hap:useShgj.sul_hap,
    sengHwa_zeHwa:useShgj.sengHwa_zeHwa,
    sulHwa_zeHwa:useShgj.sulHwa_zeHwa,
    sengHwa_hapHwa:useShgj.sengHwa_hapHwa,
    sulHwa_hapHwa:useShgj.sulHwa_hapHwa,
  };
  return result;
}

/**
 * 배열만들기
 * @param {function} func 사용할 요소함수
 * @param {string} word 요소에 해당하는 글자
 * @returns {string} 희신 글자
 */
exports.makeElementArray = (func, shgj,word,yuksin) => {
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
    usejijangganUse.yu.y_land.y_jangan1,
    usejijangganUse.yu.y_land.y_jangan2,
    usejijangganUse.yu.y_land.y_jangan3,
    usejijangganUse.yu.m_land.m_jangan1,
    usejijangganUse.yu.m_land.m_jangan2,
    usejijangganUse.yu.m_land.m_jangan3,
    usejijangganUse.yu.d_land.d_jangan1,
    usejijangganUse.yu.d_land.d_jangan2,
    usejijangganUse.yu.d_land.d_jangan3,
    usejijangganUse.yu.h_land.h_jangan1,
    usejijangganUse.yu.h_land.h_jangan2,
    usejijangganUse.yu.h_land.h_jangan3,
  ]

  const gun = [
    '',
    '',
    '',
    '',
    useBasicFunc.rootTong.y_jangan1,
    useBasicFunc.rootTong.y_jangan2,
    useBasicFunc.rootTong.y_jangan3,
    useBasicFunc.rootTong.m_jangan1,
    useBasicFunc.rootTong.m_jangan2,
    useBasicFunc.rootTong.m_jangan3,
    useBasicFunc.rootTong.d_jangan1,
    useBasicFunc.rootTong.d_jangan2,
    useBasicFunc.rootTong.d_jangan3,
    useBasicFunc.rootTong.h_jangan1,
    useBasicFunc.rootTong.h_jangan2,
    useBasicFunc.rootTong.h_jangan3,
  ]
  let sangguk = []
  let yuksinCheck =[]
  if (shgj !== '') {
    sangguk = [
      shgj.sangguk.y_sky,
      shgj.sangguk.m_sky,
      shgj.sangguk.d_sky,
      shgj.sangguk.h_sky,
      shgj.sangguk.y_jangan1,
      shgj.sangguk.y_jangan2,
      shgj.sangguk.y_jangan3,
      shgj.sangguk.m_jangan1,
      shgj.sangguk.m_jangan2,
      shgj.sangguk.m_jangan3,
      shgj.sangguk.d_jangan1,
      shgj.sangguk.d_jangan2,
      shgj.sangguk.d_jangan3,
      shgj.sangguk.h_jangan1,
      shgj.sangguk.h_jangan2,
      shgj.sangguk.h_jangan3,
    ]
  }
  else {
    yuksinCheck = [
      useYuksin.y_sky,
      useYuksin.m_sky,
      useYuksin.d_sky,
      useYuksin.h_sky,
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
  }
  let result = [];
  for (let i = 0; i < pillar.length; i++) {
    if (shgj !== '') {
      result.push(func(used[i], sangguk[i], word, yuksin,gun[i]))
    }
    else {
      result.push(func(used[i], word, yuksin ,yuksinCheck[i]))
    }

  }

  return result;
}

/**
 * 배열만들기(이도전용)
 * @param {function} func 사용할 요소함수
 * @returns {string} 희신 글자
 */
exports.makeElementArrayYido = (func) => {
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

  const root = [
    '',
    '',
    '',
    '',
    useBasicFunc.rootTong.y_jangan1,
    useBasicFunc.rootTong.y_jangan2,
    useBasicFunc.rootTong.y_jangan3,
    '  ',
    '  ',
    '  ',
    useBasicFunc.rootTong.d_jangan1,
    useBasicFunc.rootTong.d_jangan2,
    useBasicFunc.rootTong.d_jangan3,

    useBasicFunc.rootTong.h_jangan1,
    useBasicFunc.rootTong.h_jangan2,
    useBasicFunc.rootTong.h_jangan3,
  ]
  let result = [];
  for (let i = 0; i < pillar.length; i++) {
    result.push(func('  ', useYuksin.y_sky,
      useYuksin.m_sky,
      useYuksin.d_sky,
      useYuksin.h_sky, root, pillar[i]))
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
  };
  return result;
}