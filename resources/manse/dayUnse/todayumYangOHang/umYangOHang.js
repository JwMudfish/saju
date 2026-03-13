var umYangOHangFunc = {};
//음양오행  객체에 담고 한번에 myManse에 넣어버리기
let umYangOHang = {};
const umYangFunc = require("./umYang");
const oHangFunc = require("./oHang");
umYangOHangFunc.umYangOHang = function () {
  return new Promise((resolve) => {
    //umYangFunc.umYang(useTodayPillar.y_sky,1) ->1이면 천간 2면 지지
    //천간신금인지 지지신금인지 구분하기위한 용도!
    //천간
    let ySky = {
      umYang: umYangFunc.umYang(useTodayPillar.y_sky, 1),
      oHang: oHangFunc.oHang(useTodayPillar.y_sky),
    };
    let mSky = {
      umYang: umYangFunc.umYang(useTodayPillar.m_sky, 1),
      oHang: oHangFunc.oHang(useTodayPillar.m_sky),
    };
    let dSky = {
      umYang: umYangFunc.umYang(useTodayPillar.d_sky, 1),
      oHang: oHangFunc.oHang(useTodayPillar.d_sky),
    };
    let hSky = {
      umYang: umYangFunc.umYang(useTodayPillar.h_sky, 1),
      oHang: oHangFunc.oHang(useTodayPillar.h_sky),
    };
    //지지
    let yLand = {
      umYang: umYangFunc.umYang(useTodayPillar.y_land, 2),
      oHang: oHangFunc.oHang(useTodayPillar.y_land),
    };
    let mLand = {
      umYang: umYangFunc.umYang(useTodayPillar.m_land, 2),
      oHang: oHangFunc.oHang(useTodayPillar.m_land),
    };
    let dLand = {
      umYang: umYangFunc.umYang(useTodayPillar.d_land, 2),
      oHang: oHangFunc.oHang(useTodayPillar.d_land),
    };
    let hLand = {
      umYang: umYangFunc.umYang(useTodayPillar.h_land, 2),
      oHang: oHangFunc.oHang(useTodayPillar.h_land),
    };
    let y_jang = useTodayJanggan.y_jangan;
    let m_jang = useTodayJanggan.m_jangan;
    let d_jang = useTodayJanggan.d_jangan;
    let h_jang = useTodayJanggan.h_jangan;

    let yearjijanggan = {
      y_jangan1: {
        umYang: umYangFunc.umYang(y_jang.y_jangan1, 1),
        oHang: oHangFunc.oHang(y_jang.y_jangan1, 1),
      },
      y_jangan2: {
        umYang: umYangFunc.umYang(y_jang.y_jangan2, 1),
        oHang: oHangFunc.oHang(y_jang.y_jangan2, 1),
      },
      y_jangan3: {
        umYang: umYangFunc.umYang(y_jang.y_jangan3, 1),
        oHang: oHangFunc.oHang(y_jang.y_jangan3, 1),
      },
    };
    let monthjijanggan = {
      m_jangan1: {
        umYang: umYangFunc.umYang(m_jang.m_jangan1, 1),
        oHang: oHangFunc.oHang(m_jang.m_jangan1, 1),
      },
      m_jangan2: {
        umYang: umYangFunc.umYang(m_jang.m_jangan2, 1),
        oHang: oHangFunc.oHang(m_jang.m_jangan2, 1),
      },
      m_jangan3: {
        umYang: umYangFunc.umYang(m_jang.m_jangan3, 1),
        oHang: oHangFunc.oHang(m_jang.m_jangan3, 1),
      },
    };
    let dayjijanggan = {
      d_jangan1: {
        umYang: umYangFunc.umYang(d_jang.d_jangan1, 1),
        oHang: oHangFunc.oHang(d_jang.d_jangan1, 1),
      },
      d_jangan2: {
        umYang: umYangFunc.umYang(d_jang.d_jangan2, 1),
        oHang: oHangFunc.oHang(d_jang.d_jangan2, 1),
      },
      d_jangan3: {
        umYang: umYangFunc.umYang(d_jang.d_jangan3, 1),
        oHang: oHangFunc.oHang(d_jang.d_jangan3, 1),
      },
    };
    let hourjijanggan = {
      h_jangan1: {
        umYang: umYangFunc.umYang(h_jang.h_jangan1, 1),
        oHang: oHangFunc.oHang(h_jang.h_jangan1, 1),
      },
      h_jangan2: {
        umYang: umYangFunc.umYang(h_jang.h_jangan2, 1),
        oHang: oHangFunc.oHang(h_jang.h_jangan2, 1),
      },
      h_jangan3: {
        umYang: umYangFunc.umYang(h_jang.h_jangan3, 1),
        oHang: oHangFunc.oHang(h_jang.h_jangan3, 1),
      },
    };

    useTodayUmYangOHang = {
      y_sky: ySky,
      y_land: yLand,
      m_sky: mSky,
      m_land: mLand,
      d_sky: dSky,
      d_land: dLand,
      h_sky: hSky,
      h_land: hLand,
      y_jangan: yearjijanggan,
      m_jangan: monthjijanggan,
      d_jangan: dayjijanggan,
      h_jangan: hourjijanggan,
    };
    useTodayUmYangOHang = useTodayUmYangOHang;

    resolve(umYangOHang);
  }).catch((error) => {
    console.log(error);
    return error;
});
};
module.exports = umYangOHangFunc;
