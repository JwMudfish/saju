var basicFunc = {};
//pillar  객체에 담고 한번에 myManse에 넣어버리기
let basicObj = {};
const basic = require('./basicFunc.js');
basicFunc.basicFunc = function () {
  return new Promise((resolve) => {
    let seasonYear = basic.season(usePillar.m_land, usePillar.y_land);
    let seasonDay = basic.season(usePillar.m_land, usePillar.d_land);
    let seasonHour = basic.season(usePillar.m_land, usePillar.h_land);
    let seasonMonth = basic.seasonMonth(usePillar.m_land);
    //계절
    let season = {
      y_land: seasonYear,
      m_land: seasonMonth,
      d_land: seasonDay,
      h_land: seasonHour,
    };
    let swgYear = basic.swgGubun(usePillar.y_land);
    let swgDay = basic.swgGubun(usePillar.d_land);
    let swgHour = basic.swgGubun(usePillar.h_land);
    let swgMonth = basic.swgGubun(usePillar.m_land);
    //생지왕지고지구분
    let swgGubun = {
      y_land: swgYear,
      m_land: swgMonth,
      d_land: swgDay,
      h_land: swgHour,
    };

    let wol_togan_1 = basic.walTogan1();
    let wol_togan_2 = basic.walTogan2();
    let wol_togan_3 = basic.walTogan3();
    let wol_togan_4 = basic.walTogan4();

    //통근
    let wal_togan = {
      wal_togan1: wol_togan_1,
      wal_togan2: wol_togan_2,
      wal_togan3: wol_togan_3,
      wal_togan4: wol_togan_4,
    };

    // let rootTongYear = basic.root_tong(useUmYangOHang.y_sky.oHang);
    // let rootTongDay = basic.root_tong(useUmYangOHang.d_sky.oHang);
    // let rootTongHour = basic.root_tong(useUmYangOHang.h_sky.oHang);

    //루트통(정확한 명칭은 나중에 물어보기)
    let rootTong = {
      y_jangan1: basic.root_day(usejijangganUse.yong.y_land.y_jangan1, useUmYangOHang.y_jangan.y_jangan1.oHang),
      y_jangan2: basic.root_day(usejijangganUse.yong.y_land.y_jangan2, useUmYangOHang.y_jangan.y_jangan2.oHang),
      y_jangan3: basic.root_day(usejijangganUse.yong.y_land.y_jangan3, useUmYangOHang.y_jangan.y_jangan3.oHang),
      d_jangan1: basic.root_day(usejijangganUse.yong.d_land.d_jangan1, useUmYangOHang.d_jangan.d_jangan1.oHang),
      d_jangan2: basic.root_day(usejijangganUse.yong.d_land.d_jangan2, useUmYangOHang.d_jangan.d_jangan2.oHang),
      d_jangan3: basic.root_day(usejijangganUse.yong.d_land.d_jangan3, useUmYangOHang.d_jangan.d_jangan3.oHang),
      h_jangan1: basic.root_day(usejijangganUse.yong.h_land.h_jangan1, useUmYangOHang.h_jangan.h_jangan1.oHang),
      h_jangan2: basic.root_day(usejijangganUse.yong.h_land.h_jangan2, useUmYangOHang.h_jangan.h_jangan2.oHang),
      h_jangan3: basic.root_day(usejijangganUse.yong.h_land.h_jangan3, useUmYangOHang.h_jangan.h_jangan3.oHang),
      totalRoot: basic.root_dayTotal()
    }


    let rootDayJiral = basic.root_jiral()

    let basicObj = {
      season: season,
      swgGubun: swgGubun,
      wal_togan: wal_togan,
      rootTong: rootTong,
      rootDayJiral: rootDayJiral,
    };
    useBasicFunc = basicObj;

    resolve(basicObj);
  }).catch((error) => {
    console.log(error);
    return error;
});
};
module.exports = basicFunc;
