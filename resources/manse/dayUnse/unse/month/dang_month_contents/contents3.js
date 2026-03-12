var unse = {};
unse.contentsGap = function () {
  let result = '';

  return result;
};

unse.contentsEul = function () {
  let result = '';

  return result;
};

unse.contentsByeong = function () {
  let result = '';

  return result;
};

unse.contentsJeong = function () {
  let result = '';
  if (
    checkChunGan('경') === false &&
    checkChunGan('임') === false &&
    ((checkChunGan('갑') === false && checkChunGan('을') === false) ||
      (checkChunGan('정') === false && checkChunGan('병') === false))
  ) {
    result = '_case2';
  } else {
    result = '_case1';
  }
  return result;
};

unse.contentsGyeong = function () {
  let result = '';
  if (checkChunGan('정') === true) {
    result = '_case1';
  } else {
    result = '_case2';
  }
  return result;
};

unse.contentsSin = function () {
  let result = '';
  if (checkOhangChun('수') === false && checkOhangChun('화') === false) {
    result = '_case2';
  } else {
    result = '_case1';
  }
  return result;
};

unse.contentsLim = function () {
  let result = '';
  return result;
};

unse.contentsGye = function () {
  let result = '';
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
  if (checkChunGan('을') === true) {
    result.push('sky_eul');
  }

  return result;
};

function checkOhangChun(temp) {
  let result = false;
  let ohang = [
    useUmYangOHang.y_sky.oHang,
    useUmYangOHang.m_sky.oHang,
    useUmYangOHang.d_sky.oHang,
    useUmYangOHang.h_sky.oHang,
  ];
  for (let i = 0; i < ohang.length; i++) {
    if (ohang[i] === temp) {
      result = true;
    }
  }
  return result;
}

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
