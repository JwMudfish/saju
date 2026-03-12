var unse = {};
let proposeResult = require("../../../../dayUnseResult/propose.json");
//연애운
unse.propose = function () {
  let result = getResult("NONO");
  if (checkJanggan("정재", "편재") === true && result.title === "NONO") {
    if (chunGan("정관", "편관") === true) {
      result = getResult("프로포즈 좋은 날");
    }
  }
  if (checkJanggan("정관", "편관") === true && result.title === "NONO") {
    if (chunGan("정재", "편재") === true) {
      result = getResult("프로포즈 좋은 날");
    }
  }
  if (checkJanggan("정재", "편재") === true && result.title === "NONO") {
    if (chunGan("정관", "편관") === false) {
      result = getResult("생각좀...");
    }
  }
  if (checkJanggan("정관", "편관") === true && result.title === "NONO") {
    if (chunGan("정재", "편재") === false) {
      result = getResult("생각좀...");
    }
  }
  if (
    checkJanggan("정재", "편재") === false &&
    checkJanggan("정관", "편관") === false &&
    result.title === "NONO"
  ) {
    if (chunGan("정관", "편관") === true || chunGan("정재", "편재") === true) {
      result = getResult("받는운");
    }
  }

  return result;
};

function chunGan(yuksin1, yuksin2) {
  let result = false;

  let yuksin = [
    useTodayYuksin.y_sky,
    useTodayYuksin.m_sky,
    useTodayYuksin.d_sky,
    useTodayYuksin.h_sky,
  ];

  for (let i = 0; i < yuksin.length; i++) {
    if (yuksin[i] === yuksin1 || yuksin[i] === yuksin2) {
      result = true;
      break;
    }
  }
  return result;
}

function checkJanggan(yuksin1, yuksin2) {
  let result = false;
  let possible = [
    getPossible(" "),
    getPossible(" "),
    getPossible(" "),
    getPossible(" "),
    getPossible(useTodayjijangganUse.yong.y_land.y_jangan1),
    getPossible(useTodayjijangganUse.yong.y_land.y_jangan2),
    getPossible(useTodayjijangganUse.yong.y_land.y_jangan3),
    getPossible(useTodayjijangganUse.yong.m_land.m_jangan1),
    getPossible(useTodayjijangganUse.yong.m_land.m_jangan2),
    getPossible(useTodayjijangganUse.yong.m_land.m_jangan3),
    getPossible(useTodayjijangganUse.yong.d_land.d_jangan1),
    getPossible(useTodayjijangganUse.yong.d_land.d_jangan2),
    getPossible(useTodayjijangganUse.yong.d_land.d_jangan3),
    getPossible(useTodayjijangganUse.yong.h_land.h_jangan1),
    getPossible(useTodayjijangganUse.yong.h_land.h_jangan2),
    getPossible(useTodayjijangganUse.yong.h_land.h_jangan3),
  ];

  let yuksin = [
    useTodayYuksin.y_sky,
    useTodayYuksin.m_sky,
    useTodayYuksin.d_sky,
    useTodayYuksin.h_sky,
    useTodayYuksin.y_jangan.y_jangan1,
    useTodayYuksin.y_jangan.y_jangan2,
    useTodayYuksin.y_jangan.y_jangan3,
    useTodayYuksin.m_jangan.m_jangan1,
    useTodayYuksin.m_jangan.m_jangan2,
    useTodayYuksin.m_jangan.m_jangan3,
    useTodayYuksin.d_jangan.d_jangan1,
    useTodayYuksin.d_jangan.d_jangan2,
    useTodayYuksin.d_jangan.d_jangan3,
    useTodayYuksin.h_jangan.h_jangan1,
    useTodayYuksin.h_jangan.h_jangan2,
    useTodayYuksin.h_jangan.h_jangan3,
  ];

  for (let i = 0; i < possible.length; i++) {
    if (possible[i] === true) {
      if (yuksin[i] === yuksin1 || yuksin[i] === yuksin2) {
        result = true;
        break;
      }
    }
  }
  return result;
}
function getPossible(use) {
  let result = false;
  if (String(use).includes("young") || String(use).trim() === "") {
    result = true;
  }
  return result;
}

function getResult(word) {
  let result;
  for (let i = 0; i < proposeResult.data.length; i++) {
    if (proposeResult.data[i].title === word) {
      result = proposeResult.data[i];
      break;
    }
  }

  function todayMonthDay(yuksin1, yuksin2, title) {
    let result = getResult("NONO");
    if (
      (useTodayYuksin.m_sky === yuksin1 || useTodayYuksin.m_sky === yuksin2) &&
      (useTodayYuksin.d_sky === yuksin1 || useTodayYuksin.d_sky === yuksin2)
    ) {
      result = getResult(title);
    }
    return result;
  }
  return result;
}

function todayOnlyDay(yuksin1, yuksin2, title) {
  let result = getResult("NONO");
  if (
    useTodayYuksin.m_sky !== yuksin1 &&
    useTodayYuksin.m_sky !== yuksin2 &&
    useTodayYuksin.y_sky !== yuksin1 &&
    useTodayYuksin.y_sky !== yuksin2 &&
    useTodayYuksin.h_sky !== yuksin1 &&
    useTodayYuksin.h_sky !== yuksin2 &&
    (useTodayYuksin.d_sky === yuksin1 || useTodayYuksin.d_sky === yuksin2)
  ) {
    result = getResult(title);
  }
  return result;
}

module.exports = unse;
