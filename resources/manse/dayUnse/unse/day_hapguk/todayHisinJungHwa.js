var unse = {};
const ryeongFunction = require("../../../ryeong/ryeong");
unse.junghwaHeusin = function () {
  let result;
  let heuisin = [
    ryeongFunction.heuisin(useRyeong.dang_ryeong, usePillar.y_sky),
    ryeongFunction.heuisin(useRyeong.dang_ryeong, usePillar.m_sky),
    ryeongFunction.heuisin(useRyeong.dang_ryeong, usePillar.d_sky),
    ryeongFunction.heuisin(useRyeong.dang_ryeong, usePillar.h_sky),
    ryeongFunction.heuisin(
      useRyeong.dang_ryeong,
      usejijanggan.y_jangan.y_jangan1,
      usejijangganUse.yong.y_land.y_jangan1
    ),
    ryeongFunction.heuisin(
      useRyeong.dang_ryeong,
      usejijanggan.y_jangan.y_jangan2,
      usejijangganUse.yong.y_land.y_jangan2
    ),
    ryeongFunction.heuisin(
      useRyeong.dang_ryeong,
      usejijanggan.y_jangan.y_jangan3,
      usejijangganUse.yong.y_land.y_jangan3
    ),
    ryeongFunction.heuisin(
      useRyeong.dang_ryeong,
      usejijanggan.m_jangan.m_jangan1,
      usejijangganUse.yong.m_land.m_jangan1
    ),
    ryeongFunction.heuisin(
      useRyeong.dang_ryeong,
      usejijanggan.m_jangan.m_jangan2,
      usejijangganUse.yong.m_land.m_jangan2
    ),
    ryeongFunction.heuisin(
      useRyeong.dang_ryeong,
      usejijanggan.m_jangan.m_jangan3,
      usejijangganUse.yong.m_land.m_jangan3
    ),
    ryeongFunction.heuisin(
      useRyeong.dang_ryeong,
      usejijanggan.d_jangan.d_jangan1,
      usejijangganUse.yong.d_land.d_jangan1
    ),
    ryeongFunction.heuisin(
      useRyeong.dang_ryeong,
      usejijanggan.d_jangan.d_jangan2,
      usejijangganUse.yong.d_land.d_jangan2
    ),
    ryeongFunction.heuisin(
      useRyeong.dang_ryeong,
      usejijanggan.d_jangan.d_jangan3,
      usejijangganUse.yong.d_land.d_jangan3
    ),
    ryeongFunction.heuisin(
      useRyeong.dang_ryeong,
      usejijanggan.h_jangan.h_jangan1,
      usejijangganUse.yong.h_land.h_jangan1
    ),
    ryeongFunction.heuisin(
      useRyeong.dang_ryeong,
      usejijanggan.h_jangan.h_jangan2,
      usejijangganUse.yong.h_land.h_jangan2
    ),
    ryeongFunction.heuisin(
      useRyeong.dang_ryeong,
      usejijanggan.h_jangan.h_jangan3,
      usejijangganUse.yong.h_land.h_jangan3
    ),
  ];

  let junghwa = [
    ryeongFunction.junghwa(useRyeong.dang_ryeong, usePillar.y_sky),
    ryeongFunction.junghwa(useRyeong.dang_ryeong, usePillar.m_sky),
    ryeongFunction.junghwa(useRyeong.dang_ryeong, usePillar.d_sky),
    ryeongFunction.junghwa(useRyeong.dang_ryeong, usePillar.h_sky),
    ryeongFunction.junghwa(
      useRyeong.dang_ryeong,
      usejijanggan.y_jangan.y_jangan1,
      usejijangganUse.yong.y_land.y_jangan1
    ),
    ryeongFunction.junghwa(
      useRyeong.dang_ryeong,
      usejijanggan.y_jangan.y_jangan2,
      usejijangganUse.yong.y_land.y_jangan2
    ),
    ryeongFunction.junghwa(
      useRyeong.dang_ryeong,
      usejijanggan.y_jangan.y_jangan3,
      usejijangganUse.yong.y_land.y_jangan3
    ),
    ryeongFunction.junghwa(
      useRyeong.dang_ryeong,
      usejijanggan.m_jangan.m_jangan1,
      usejijangganUse.yong.m_land.m_jangan1
    ),
    ryeongFunction.junghwa(
      useRyeong.dang_ryeong,
      usejijanggan.m_jangan.m_jangan2,
      usejijangganUse.yong.m_land.m_jangan2
    ),
    ryeongFunction.junghwa(
      useRyeong.dang_ryeong,
      usejijanggan.m_jangan.m_jangan3,
      usejijangganUse.yong.m_land.m_jangan3
    ),
    ryeongFunction.junghwa(
      useRyeong.dang_ryeong,
      usejijanggan.d_jangan.d_jangan1,
      usejijangganUse.yong.d_land.d_jangan1
    ),
    ryeongFunction.junghwa(
      useRyeong.dang_ryeong,
      usejijanggan.d_jangan.d_jangan2,
      usejijangganUse.yong.d_land.d_jangan2
    ),
    ryeongFunction.junghwa(
      useRyeong.dang_ryeong,
      usejijanggan.d_jangan.d_jangan3,
      usejijangganUse.yong.d_land.d_jangan3
    ),
    ryeongFunction.junghwa(
      useRyeong.dang_ryeong,
      usejijanggan.h_jangan.h_jangan1,
      usejijangganUse.yong.h_land.h_jangan1
    ),
    ryeongFunction.junghwa(
      useRyeong.dang_ryeong,
      usejijanggan.h_jangan.h_jangan2,
      usejijangganUse.yong.h_land.h_jangan2
    ),
    ryeongFunction.junghwa(
      useRyeong.dang_ryeong,
      usejijanggan.h_jangan.h_jangan3,
      usejijangganUse.yong.h_land.h_jangan3
    ),
  ];

  result = {
    heuisin: getJHYNP(heuisin),
    junghwa: getJHYNP(junghwa),
  };

  return result;
};
function getJHYNP(obj) {
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
    "y_sky",
    "m_sky",
    "d_sky",
    "h_sky",
    "y_jangan1",
    "y_jangan2",
    "y_jangan3",
    "m_jangan1",
    "m_jangan2",
    "m_jangan3",
    "d_jangan1",
    "d_jangan2",
    "d_jangan3",
    "h_jangan1",
    "h_jangan2",
    "h_jangan3",
  ];
  let jjangproperty = [
    " ",
    " ",
    " ",
    " ",
    usejijangganUse.yong.y_land.y_jangan1,
    usejijangganUse.yong.y_land.y_jangan2,
    " ",
    usejijangganUse.yong.m_land.m_jangan1,
    usejijangganUse.yong.m_land.m_jangan2,
    " ",
    usejijangganUse.yong.d_land.d_jangan1,
    usejijangganUse.yong.d_land.d_jangan2,
    " ",
    usejijangganUse.yong.h_land.h_jangan1,
    usejijangganUse.yong.h_land.h_jangan2,
    " ",
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
  let yn = "N";
  let position = [];
  let property = [];
  let use = [];
  for (let i = 0; i < exist.length; i++) {
    if (exist[i] === "y" || exist[i] === "Y") {
      yn = "Y";
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

module.exports = unse;
