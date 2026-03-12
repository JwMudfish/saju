var jjjanUseFunc = {};

const jjjUse = require("./jijangganFunc");
const basicFunc = require("../../basicFunc/basicFunc");
jjjanUseFunc.jjjanUseFunc = function () {
  return new Promise((resolve) => {
    let yLandYong = getUse(
      useTodayPillar.y_land,
      "",
      useTodayYuksin.y_land,
      "y"
    );
    let mLandYong = getUse(
      useTodayPillar.m_land,
      "m_",
      useTodayYuksin.m_land,
      "m"
    );
    let dLandYong = getUse(
      useTodayPillar.d_land,
      "",
      useTodayYuksin.d_land,
      "d"
    );
    let hLandYong = getUse(
      useTodayPillar.h_land,
      "",
      useTodayYuksin.h_land,
      "h"
    );
    let yLandYu = getUse(
      useTodayPillar.y_land,
      "yu_",
      useTodayYuksin.y_land,
      "y"
    );
    let mLandYu = getUse(
      useTodayPillar.m_land,
      "m_yu_",
      useTodayYuksin.m_land,
      "m"
    );
    let dLandYu = getUse(
      useTodayPillar.d_land,
      "yu_",
      useTodayYuksin.d_land,
      "d"
    );
    let hLandYu = getUse(
      useTodayPillar.h_land,
      "yu_",
      useTodayYuksin.h_land,
      "h"
    );

    let useJJJUse = {
      yong: {
        y_land: {
          y_jangan1: yLandYong.jijanggan1,
          y_jangan2: yLandYong.jijanggan2,
        },
        m_land: {
          m_jangan1: mLandYong.jijanggan1,
          m_jangan2: mLandYong.jijanggan2,
        },
        d_land: {
          d_jangan1: dLandYong.jijanggan1,
          d_jangan2: dLandYong.jijanggan2,
        },
        h_land: {
          h_jangan1: hLandYong.jijanggan1,
          h_jangan2: hLandYong.jijanggan2,
        },
      },
      yu: {
        y_land: {
          y_jangan1: yLandYu.jijanggan1,
          y_jangan2: yLandYu.jijanggan2,
        },
        m_land: {
          m_jangan1: mLandYu.jijanggan1,
          m_jangan2: mLandYu.jijanggan2,
        },
        d_land: {
          d_jangan1: dLandYu.jijanggan1,
          d_jangan2: dLandYu.jijanggan2,
        },
        h_land: {
          h_jangan1: hLandYu.jijanggan1,
          h_jangan2: hLandYu.jijanggan2,
        },
      },
    };
    useTodayjijangganUse = useJJJUse;

    resolve(useJJJUse);
  }).catch((error) => {
    console.log(error);
    return error;
});
};
function getUse(pillar, tag, yuksin, check) {
  let result = {};
  if (jjjUse.root_gubun(yuksin) === "n") {
    if (basicFunc.swgGubun(pillar) === "shang") {
      result = jjjUse.shang(tag, pillar);
    } else if (basicFunc.swgGubun(pillar) === "go") {
      result = jjjUse.today_go(pillar, tag, check);
    } else {
      result = {
        jijanggan1: "  ",
        jijanggan2: "  ",
      };
    }
  } else {
    result = {
      jijanggan1: "  ",
      jijanggan2: "  ",
    };
  }
  return result;
}
module.exports = jjjanUseFunc;
