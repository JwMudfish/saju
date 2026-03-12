var unse = {};
unse.contentsGap = function () {
  let result = [];
  if (usePillar.m_land === '인'
  ) {
    result.push('_case1');
  }
  else if (usePillar.m_land === '묘') {
    result.push('_case2');
  }

  return result;
};

unse.contentsEul = function () {
  let result = [];

  if (checkChunGan('병') === true) {
    result.push('_case1');
  }
  if (checkChunGan('병') === false) {
    result.push('_case2');
  }
  if (usePillar.m_land === '묘') {
    result.push('_case3');
  }

  return result;
};

unse.contentsByeong = function () {
  let result = [];

  if (usePillar.m_land === '사'
  ) {
    result.push('_case1');
  }
  else if (usePillar.m_land === '오') {
    result.push('_case2');
  }

  return result;
};

unse.contentsJeong = function () {
  let result = [];

  if (checkChunGan('임') === true) {
    result.push('_case1');
  }
  if (checkJiJi('해') === true) {
    result.push('_case2');
  }
  if (usePillar.m_land === '오') {
    result.push('_case3');
  }
  if (usePillar.m_land === '미') {
    result.push('_case4');
  }

  return result;
};

unse.contentsGyeong = function () {
  let result = [];

  if (usePillar.m_land === '신') {
    result.push('_case1');
  }
  if (usePillar.m_land === '신' && checkJiJi('자') === true) {
    result.push('_case2');
  }
  if (usePillar.m_land === '유') {
    result.push('_case3');
  }

  return result;
};

unse.contentsSin = function () {
  let result = [];

  if (checkChunGan('병') === true) {
    result.push('_case1');
  }
  if (checkChunGan('병') === false) {
    result.push('_case2');
  }
  if (usePillar.m_land === '유') {
    result.push('_case3');
  }
  if (usePillar.m_land === '술') {
    result.push('_case4');
  }

  return result;
};

unse.contentsLim = function () {
  let result = [];
  if (checkJiJi('사') === true) {
    result.push('_case1');
  }
  return result;
};

unse.contentsGye = function () {
  let result = [];

  if (usePillar.m_land === '자' &&
    (checkJiJi('해') === true ||
      checkJiJi('축') === true) ||
    usePillar.m_land === '축' &&
    (checkJiJi('자') === true ||
      checkJiJi('해') === true)) {
    result.push('_case1');
  }
  else if (usePillar.m_land === '자' &&
    (checkJiJi('오') === true) ||
    usePillar.m_land === '축' &&
    (checkJiJi('미') === true)) {
    result.push('_case2');
  }

  return result;
};
unse.contentsTotal = function () {
  let result = [];

  if (checkChunGan('임') === true) {
    result.push('sky_lim');
  }
  if (checkChunGan('계') === true) {
    result.push('sky_gye');
  }
  if (checkChunGan('병') === true) {
    result.push('sky_byeong');
  }
  if (checkChunGan('정') === true) {
    result.push('sky_jeong');
  }
  if (checkChunGan('경') === true) {
    result.push('sky_gyeong');
  }
  if (checkJiJi('유') === true) {
    result.push('land_yu');
  }
  if (checkJiJi('사') === true) {
    result.push('land_sa');
  }
  if (usePillar.y_land === "미") {
    result.push('land_mi_case1');
  }
  if (usePillar.m_land === "미") {
    result.push('land_mi_case2');
  }
  if (usePillar.d_land === "미") {
    result.push('land_mi_case3');
  }
  if (usePillar.h_land === "미") {
    result.push('land_mi_case4');
  }

  return result;
};

function checkOhang(temp) {
  let result = false;
  let ohang = [
    useUmYangOHang.y_sky.oHang,
    useUmYangOHang.m_sky.oHang,
    useUmYangOHang.d_sky.oHang,
    useUmYangOHang.h_sky.oHang,
    useUmYangOHang.y_jangan.y_jangan1.oHang,
    useUmYangOHang.y_jangan.y_jangan2.oHang,
    useUmYangOHang.y_jangan.y_jangan3.oHang,
    useUmYangOHang.m_jangan.m_jangan1.oHang,
    useUmYangOHang.m_jangan.m_jangan2.oHang,
    useUmYangOHang.m_jangan.m_jangan3.oHang,
    useUmYangOHang.d_jangan.d_jangan1.oHang,
    useUmYangOHang.d_jangan.d_jangan2.oHang,
    useUmYangOHang.d_jangan.d_jangan3.oHang,
    useUmYangOHang.h_jangan.h_jangan1.oHang,
    useUmYangOHang.h_jangan.h_jangan2.oHang,
    useUmYangOHang.h_jangan.h_jangan3.oHang,
  ];
  for (let i = 0; i < ohang.length; i++) {
    if (ohang[i] === temp) {
      result = true;
    }
  }
  return result;
}

function checkChunGan(temp) {
  let result = false;
  let chunGan = [
    usePillar.y_sky,
    usePillar.m_sky,
    usePillar.d_sky,
    usePillar.h_sky,
  ];
  for (let i = 0; i < chunGan.length; i++) {
    if (chunGan[i] === temp) {
      result = true;
    }
  }
  return result;
}

function checkYuksin(temp) {
  let result = false;
  let yuksin = [
    useYuksin.y_sky,
    useYuksin.m_sky,
    useYuksin.d_sky,
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
  for (let i = 0; i < yuksin.length; i++) {
    if (yuksin[i] === temp) {
      result = true;
    }
  }
  return result;
}

function checkJiJi(temp) {
  let result = false;
  let jiji = [
    usePillar.y_land,
    usePillar.m_land,
    usePillar.d_land,
    usePillar.h_land,
  ];
  for (let i = 0; i < jiji.length; i++) {
    if (jiji[i] === temp) {
      result = true;
    }
  }
  return result;
}

module.exports = unse;
