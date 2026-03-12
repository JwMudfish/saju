var jjjanUseFunc = {};

const jjjUse = require("./jijangganFunc");
const basicFunc = require("../basicFunc/basicFunc");
jjjanUseFunc.jjjanUseFunc = function () {
  return new Promise((resolve) => {


    let yLandYong = getUse(usePillar.y_land, "", "Y");
    let mLandYong = getUse(usePillar.m_land, "m_", "M");
    let dLandYong = getUse(usePillar.d_land, "", "D");
    let hLandYong = getUse(usePillar.h_land, "", "H");
    let yLandYu = getUse(usePillar.y_land, "yu_", "Y");
    let mLandYu = getUse(usePillar.m_land, "m_yu_", "M");
    let dLandYu = getUse(usePillar.d_land, "yu_", "D");
    let hLandYu = getUse(usePillar.h_land, "yu_", "H");

    let useJJJUse = {
      yong: {
        y_land: {
          y_jangan1: yLandYong.jijanggan1,
          y_jangan2: yLandYong.jijanggan2,
          y_jangan3: yLandYong.jijanggan3,
        },
        m_land: {
          m_jangan1: mLandYong.jijanggan1,
          m_jangan2: mLandYong.jijanggan2,
          m_jangan3: mLandYong.jijanggan3,
        },
        d_land: {
          d_jangan1: dLandYong.jijanggan1,
          d_jangan2: dLandYong.jijanggan2,
          d_jangan3: dLandYong.jijanggan3,
        },
        h_land: {
          h_jangan1: hLandYong.jijanggan1,
          h_jangan2: hLandYong.jijanggan2,
          h_jangan3: hLandYong.jijanggan3,
        },
      },
      yu: {
        y_land: {
          y_jangan1: yLandYu.jijanggan1,
          y_jangan2: yLandYu.jijanggan2,
          y_jangan3: yLandYu.jijanggan3,
        },
        m_land: {
          m_jangan1: mLandYu.jijanggan1,
          m_jangan2: mLandYu.jijanggan2,
          m_jangan3: mLandYu.jijanggan3,
        },
        d_land: {
          d_jangan1: dLandYu.jijanggan1,
          d_jangan2: dLandYu.jijanggan2,
          d_jangan3: dLandYu.jijanggan3,
        },
        h_land: {
          h_jangan1: hLandYu.jijanggan1,
          h_jangan2: hLandYu.jijanggan2,
          h_jangan3: hLandYu.jijanggan3,
        },
      },
    };

    changeYuksin();
    usejijangganUse = useJJJUse;
    resolve(useJJJUse);
  }).catch((error) => {
    console.log(error);
    return error;
});
};

function changeYuksin() {
  useYuksin.y_jangan.y_jangan1 = jjjUse.root_gubun(
    useYuksin.y_jangan.y_jangan1
  );
  useYuksin.y_jangan.y_jangan2 = jjjUse.root_gubun(
    useYuksin.y_jangan.y_jangan2
  );
  useYuksin.y_jangan.y_jangan3 = jjjUse.root_gubun(
    useYuksin.y_jangan.y_jangan3
  );
  useYuksin.d_jangan.d_jangan1 = jjjUse.root_gubun(
    useYuksin.d_jangan.d_jangan1
  );
  useYuksin.d_jangan.d_jangan2 = jjjUse.root_gubun(
    useYuksin.d_jangan.d_jangan2
  );
  useYuksin.d_jangan.d_jangan3 = jjjUse.root_gubun(
    useYuksin.d_jangan.d_jangan3
  );
  useYuksin.h_jangan.h_jangan1 = jjjUse.root_gubun(
    useYuksin.h_jangan.h_jangan1
  );
  useYuksin.h_jangan.h_jangan2 = jjjUse.root_gubun(
    useYuksin.h_jangan.h_jangan2
  );
  useYuksin.h_jangan.h_jangan3 = jjjUse.root_gubun(
    useYuksin.h_jangan.h_jangan3
  );
}

function getUse(pillar, tag, check) {
  let result = {};

  if (basicFunc.swgGubun(pillar) === "shang") {
    result = jjjUse.shang(tag, pillar, check);
  } else if (basicFunc.swgGubun(pillar) === "go") {
    result = jjjUse.go(pillar, tag, check);
  } else {
    result = {
      jijanggan1: "  ",
      jijanggan2: "  ",
      jijanggan3: "  ",
    };
  }
  return result;
}
module.exports = jjjanUseFunc;
