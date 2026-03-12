var unse = {};
unse.contentsGap = function () {
  let result = [];
  if (checkJiJi('인') === true) {
    result.push('_case1');
  }

  return result;
};

unse.contentsEul = function () {
  let result = [];

  if (checkYuksin('식신') === true) {
    if (checkGun() === false) {
      result.push('_case1');
    }
    if (checkJiJi('인') === true && checkJiJi('묘') === true) {
      result.push('_case2');
    }
    if (checkChunGan('을') === true) {
      result.push('_case3');
    }
  }

  return result;
};

unse.contentsByeong = function () {
  let result = [];

  if (checkChunGan('을') === true && checkChunGan('임') === true) {
    result.push('_case1');
  }
  if (checkChunGan('갑') === true) {
    result.push('_case2');
  }

  return result;
};

unse.contentsJeong = function () {
  let result = [];

  if (checkOhang('금') === true && checkYuksin('식신') === true) {
    result.push('_case1');
  }
  if (checkYuksin('정인') === false && checkYuksin('편인') === false) {
    result.push('_case2');
  }

  return result;
};

unse.contentsMu = function () {
  let result = [];

  if (checkChunGan('기') === true) {
    result.push('_case1');
  }
  if (checkChunGan('병') === true) {
    result.push('_case2');
  }

  return result;
};

unse.contentsGi = function () {
  let result = [];

  if (checkOhang('목') === true) {
    result.push('_case1');
  }
  if (checkOhang('목') === false) {
    result.push('_case2');
  }

  return result;
};

unse.contentsGyeong = function () {
  let result = [];

  if (checkChunGan('신') === true && checkJiJi('유') === true) {
    result.push('_case1');
  }
  if (checkChunGan('병') === true && checkJiJi('사') === true) {
    result.push('_case2');
  }

  return result;
};

unse.contentsSin = function () {
  let result = [];

  if (checkChunGan('병') === true && checkJiJi('사') === true) {
    result.push('_case1');
  }
  if (checkJiJi('미') === true) {
    result.push('_case2');
  }

  return result;
};

unse.contentsLim = function () {
  let result = [];
  if (checkChunGan('무') === true) {
    result.push('_case1');
  }
  if (checkChunGan('기') === true) {
    result.push('_case2');
  }

  return result;
};

unse.contentsGye = function () {
  let result = [];

  if (checkJiJi('유') === true) {
    result.push('_case1');
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

function checkGun() {
  let result = false;
  let root = Object.values(useBasicFunc.rootTong)

  if (
    root.includes('seson_root') === true ||
    root.includes('noonchi_root') === true ||
    useBasicFunc.rootTong.totalRoot === 'pure_root' ||
    useBasicFunc.rootTong.totalRoot === 'king_root'
  ) {
    result = true;
  }
  return result;
}
module.exports = unse;
