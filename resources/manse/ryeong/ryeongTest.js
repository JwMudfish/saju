var ryeongFunc = {};
//음양오행  객체에 담고 한번에 myManse에 넣어버리기
let ryeong = {};
const ryeongFunction = require("./ryeong");
ryeongFunc.ryeong = function () {
  return new Promise((resolve) => {
    let ryeong = ryeongFunction.ryeong();

    let heuisin = [
      ryeongFunction.heuisin(ryeong.dang_ryeong, usePillar.y_sky),
      ryeongFunction.heuisin(ryeong.dang_ryeong, usePillar.m_sky),
      ryeongFunction.heuisin(ryeong.dang_ryeong, usePillar.d_sky),
      ryeongFunction.heuisin(ryeong.dang_ryeong, usePillar.h_sky),
      ryeongFunction.heuisin(
        ryeong.dang_ryeong,
        usejijanggan.y_jangan.y_jangan1,
        usejijangganUse.yong.y_land.y_jangan1
      ),
      ryeongFunction.heuisin(
        ryeong.dang_ryeong,
        usejijanggan.y_jangan.y_jangan2,
        usejijangganUse.yong.y_land.y_jangan2
      ),
      ryeongFunction.heuisin(
        ryeong.dang_ryeong,
        usejijanggan.y_jangan.y_jangan3,
        usejijangganUse.yong.y_land.y_jangan3
      ),
      ryeongFunction.heuisin(
        ryeong.dang_ryeong,
        usejijanggan.m_jangan.m_jangan1,
        usejijangganUse.yong.m_land.m_jangan1
      ),
      ryeongFunction.heuisin(
        ryeong.dang_ryeong,
        usejijanggan.m_jangan.m_jangan2,
        usejijangganUse.yong.m_land.m_jangan2
      ),
      ryeongFunction.heuisin(
        ryeong.dang_ryeong,
        usejijanggan.m_jangan.m_jangan3,
        usejijangganUse.yong.m_land.m_jangan3
      ),
      ryeongFunction.heuisin(
        ryeong.dang_ryeong,
        usejijanggan.d_jangan.d_jangan1,
        usejijangganUse.yong.d_land.d_jangan1
      ),
      ryeongFunction.heuisin(
        ryeong.dang_ryeong,
        usejijanggan.d_jangan.d_jangan2,
        usejijangganUse.yong.d_land.d_jangan2
      ),
      ryeongFunction.heuisin(
        ryeong.dang_ryeong,
        usejijanggan.d_jangan.d_jangan3,
        usejijangganUse.yong.d_land.d_jangan3
      ),
      ryeongFunction.heuisin(
        ryeong.dang_ryeong,
        usejijanggan.h_jangan.h_jangan1,
        usejijangganUse.yong.h_land.h_jangan1
      ),
      ryeongFunction.heuisin(
        ryeong.dang_ryeong,
        usejijanggan.h_jangan.h_jangan2,
        usejijangganUse.yong.h_land.h_jangan2
      ),
      ryeongFunction.heuisin(
        ryeong.dang_ryeong,
        usejijanggan.h_jangan.h_jangan3,
        usejijangganUse.yong.h_land.h_jangan3
      ),
    ];

    let junghwa = [
      ryeongFunction.junghwa(ryeong.dang_ryeong, usePillar.y_sky),
      ryeongFunction.junghwa(ryeong.dang_ryeong, usePillar.m_sky),
      ryeongFunction.junghwa(ryeong.dang_ryeong, usePillar.d_sky),
      ryeongFunction.junghwa(ryeong.dang_ryeong, usePillar.h_sky),
      ryeongFunction.junghwa(
        ryeong.dang_ryeong,
        usejijanggan.y_jangan.y_jangan1,
        usejijangganUse.yong.y_land.y_jangan1
      ),
      ryeongFunction.junghwa(
        ryeong.dang_ryeong,
        usejijanggan.y_jangan.y_jangan2,
        usejijangganUse.yong.y_land.y_jangan2
      ),
      ryeongFunction.junghwa(
        ryeong.dang_ryeong,
        usejijanggan.y_jangan.y_jangan3,
        usejijangganUse.yong.y_land.y_jangan3
      ),
      ryeongFunction.junghwa(
        ryeong.dang_ryeong,
        usejijanggan.m_jangan.m_jangan1,
        usejijangganUse.yong.m_land.m_jangan1
      ),
      ryeongFunction.junghwa(
        ryeong.dang_ryeong,
        usejijanggan.m_jangan.m_jangan2,
        usejijangganUse.yong.m_land.m_jangan2
      ),
      ryeongFunction.junghwa(
        ryeong.dang_ryeong,
        usejijanggan.m_jangan.m_jangan3,
        usejijangganUse.yong.m_land.m_jangan3
      ),
      ryeongFunction.junghwa(
        ryeong.dang_ryeong,
        usejijanggan.d_jangan.d_jangan1,
        usejijangganUse.yong.d_land.d_jangan1
      ),
      ryeongFunction.junghwa(
        ryeong.dang_ryeong,
        usejijanggan.d_jangan.d_jangan2,
        usejijangganUse.yong.d_land.d_jangan2
      ),
      ryeongFunction.junghwa(
        ryeong.dang_ryeong,
        usejijanggan.d_jangan.d_jangan3,
        usejijangganUse.yong.d_land.d_jangan3
      ),
      ryeongFunction.junghwa(
        ryeong.dang_ryeong,
        usejijanggan.h_jangan.h_jangan1,
        usejijangganUse.yong.h_land.h_jangan1
      ),
      ryeongFunction.junghwa(
        ryeong.dang_ryeong,
        usejijanggan.h_jangan.h_jangan2,
        usejijangganUse.yong.h_land.h_jangan2
      ),
      ryeongFunction.junghwa(
        ryeong.dang_ryeong,
        usejijanggan.h_jangan.h_jangan3,
        usejijangganUse.yong.h_land.h_jangan3
      ),
    ];
    let junghwa_gisin = [
      ryeongFunction.junghwa_gisin(ryeong.dang_ryeong, usePillar.y_sky),
      ryeongFunction.junghwa_gisin(ryeong.dang_ryeong, usePillar.m_sky),
      ryeongFunction.junghwa_gisin(ryeong.dang_ryeong, usePillar.d_sky),
      ryeongFunction.junghwa_gisin(ryeong.dang_ryeong, usePillar.h_sky),
      ryeongFunction.junghwa_gisin(
        ryeong.dang_ryeong,
        usejijanggan.y_jangan.y_jangan1,
        usejijangganUse.yong.y_land.y_jangan1
      ),
      ryeongFunction.junghwa_gisin(
        ryeong.dang_ryeong,
        usejijanggan.y_jangan.y_jangan2,
        usejijangganUse.yong.y_land.y_jangan2
      ),
      ryeongFunction.junghwa_gisin(
        ryeong.dang_ryeong,
        usejijanggan.y_jangan.y_jangan3,
        usejijangganUse.yong.y_land.y_jangan3
      ),
      ryeongFunction.junghwa_gisin(
        ryeong.dang_ryeong,
        usejijanggan.m_jangan.m_jangan1,
        usejijangganUse.yong.m_land.m_jangan1
      ),
      ryeongFunction.junghwa_gisin(
        ryeong.dang_ryeong,
        usejijanggan.m_jangan.m_jangan2,
        usejijangganUse.yong.m_land.m_jangan2
      ),
      ryeongFunction.junghwa_gisin(
        ryeong.dang_ryeong,
        usejijanggan.m_jangan.m_jangan3,
        usejijangganUse.yong.m_land.m_jangan3
      ),
      ryeongFunction.junghwa_gisin(
        ryeong.dang_ryeong,
        usejijanggan.d_jangan.d_jangan1,
        usejijangganUse.yong.d_land.d_jangan1
      ),
      ryeongFunction.junghwa_gisin(
        ryeong.dang_ryeong,
        usejijanggan.d_jangan.d_jangan2,
        usejijangganUse.yong.d_land.d_jangan2
      ),
      ryeongFunction.junghwa_gisin(
        ryeong.dang_ryeong,
        usejijanggan.d_jangan.d_jangan3,
        usejijangganUse.yong.d_land.d_jangan3
      ),
      ryeongFunction.junghwa_gisin(
        ryeong.dang_ryeong,
        usejijanggan.h_jangan.h_jangan1,
        usejijangganUse.yong.h_land.h_jangan1
      ),
      ryeongFunction.junghwa_gisin(
        ryeong.dang_ryeong,
        usejijanggan.h_jangan.h_jangan2,
        usejijangganUse.yong.h_land.h_jangan2
      ),
      ryeongFunction.junghwa_gisin(
        ryeong.dang_ryeong,
        usejijanggan.h_jangan.h_jangan3,
        usejijangganUse.yong.h_land.h_jangan3
      ),
    ];
    let jisok = [
      ryeongFunction.jisok(ryeong.dang_ryeong, usePillar.y_sky),
      ryeongFunction.jisok(ryeong.dang_ryeong, usePillar.m_sky),
      ryeongFunction.jisok(ryeong.dang_ryeong, usePillar.d_sky),
      ryeongFunction.jisok(ryeong.dang_ryeong, usePillar.h_sky),
      ryeongFunction.jisok(
        ryeong.dang_ryeong,
        usejijanggan.y_jangan.y_jangan1,
        usejijangganUse.yong.y_land.y_jangan1
      ),
      ryeongFunction.jisok(
        ryeong.dang_ryeong,
        usejijanggan.y_jangan.y_jangan2,
        usejijangganUse.yong.y_land.y_jangan2
      ),
      ryeongFunction.jisok(
        ryeong.dang_ryeong,
        usejijanggan.y_jangan.y_jangan3,
        usejijangganUse.yong.y_land.y_jangan3
      ),
      ryeongFunction.jisok(
        ryeong.dang_ryeong,
        usejijanggan.m_jangan.m_jangan1,
        usejijangganUse.yong.m_land.m_jangan1
      ),
      ryeongFunction.jisok(
        ryeong.dang_ryeong,
        usejijanggan.m_jangan.m_jangan2,
        usejijangganUse.yong.m_land.m_jangan2
      ),
      ryeongFunction.jisok(
        ryeong.dang_ryeong,
        usejijanggan.m_jangan.m_jangan3,
        usejijangganUse.yong.m_land.m_jangan3
      ),
      ryeongFunction.jisok(
        ryeong.dang_ryeong,
        usejijanggan.d_jangan.d_jangan1,
        usejijangganUse.yong.d_land.d_jangan1
      ),
      ryeongFunction.jisok(
        ryeong.dang_ryeong,
        usejijanggan.d_jangan.d_jangan2,
        usejijangganUse.yong.d_land.d_jangan2
      ),
      ryeongFunction.jisok(
        ryeong.dang_ryeong,
        usejijanggan.d_jangan.d_jangan3,
        usejijangganUse.yong.d_land.d_jangan3
      ),
      ryeongFunction.jisok(
        ryeong.dang_ryeong,
        usejijanggan.h_jangan.h_jangan1,
        usejijangganUse.yong.h_land.h_jangan1
      ),
      ryeongFunction.jisok(
        ryeong.dang_ryeong,
        usejijanggan.h_jangan.h_jangan2,
        usejijangganUse.yong.h_land.h_jangan2
      ),
      ryeongFunction.jisok(
        ryeong.dang_ryeong,
        usejijanggan.h_jangan.h_jangan3,
        usejijangganUse.yong.h_land.h_jangan3
      ),
    ];
    let hwakjang = [
      ryeongFunction.hwakjang(ryeong.dang_ryeong, usePillar.y_sky),
      ryeongFunction.hwakjang(ryeong.dang_ryeong, usePillar.m_sky),
      ryeongFunction.hwakjang(ryeong.dang_ryeong, usePillar.d_sky),
      ryeongFunction.hwakjang(ryeong.dang_ryeong, usePillar.h_sky),
      ryeongFunction.hwakjang(
        ryeong.dang_ryeong,
        usejijanggan.y_jangan.y_jangan1,
        usejijangganUse.yong.y_land.y_jangan1
      ),
      ryeongFunction.hwakjang(
        ryeong.dang_ryeong,
        usejijanggan.y_jangan.y_jangan2,
        usejijangganUse.yong.y_land.y_jangan2
      ),
      ryeongFunction.hwakjang(
        ryeong.dang_ryeong,
        usejijanggan.y_jangan.y_jangan3,
        usejijangganUse.yong.y_land.y_jangan3
      ),
      ryeongFunction.hwakjang(
        ryeong.dang_ryeong,
        usejijanggan.m_jangan.m_jangan1,
        usejijangganUse.yong.m_land.m_jangan1
      ),
      ryeongFunction.hwakjang(
        ryeong.dang_ryeong,
        usejijanggan.m_jangan.m_jangan2,
        usejijangganUse.yong.m_land.m_jangan2
      ),
      ryeongFunction.hwakjang(
        ryeong.dang_ryeong,
        usejijanggan.m_jangan.m_jangan3,
        usejijangganUse.yong.m_land.m_jangan3
      ),
      ryeongFunction.hwakjang(
        ryeong.dang_ryeong,
        usejijanggan.d_jangan.d_jangan1,
        usejijangganUse.yong.d_land.d_jangan1
      ),
      ryeongFunction.hwakjang(
        ryeong.dang_ryeong,
        usejijanggan.d_jangan.d_jangan2,
        usejijangganUse.yong.d_land.d_jangan2
      ),
      ryeongFunction.hwakjang(
        ryeong.dang_ryeong,
        usejijanggan.d_jangan.d_jangan3,
        usejijangganUse.yong.d_land.d_jangan3
      ),
      ryeongFunction.hwakjang(
        ryeong.dang_ryeong,
        usejijanggan.h_jangan.h_jangan1,
        usejijangganUse.yong.h_land.h_jangan1
      ),
      ryeongFunction.hwakjang(
        ryeong.dang_ryeong,
        usejijanggan.h_jangan.h_jangan2,
        usejijangganUse.yong.h_land.h_jangan2
      ),
      ryeongFunction.hwakjang(
        ryeong.dang_ryeong,
        usejijanggan.h_jangan.h_jangan3,
        usejijangganUse.yong.h_land.h_jangan3
      ),
    ];
    let hwakjang_gisin = [
      ryeongFunction.hwakjang_gisin(ryeong.dang_ryeong, usePillar.y_sky),
      ryeongFunction.hwakjang_gisin(ryeong.dang_ryeong, usePillar.m_sky),
      ryeongFunction.hwakjang_gisin(ryeong.dang_ryeong, usePillar.d_sky),
      ryeongFunction.hwakjang_gisin(ryeong.dang_ryeong, usePillar.h_sky),
      ryeongFunction.hwakjang_gisin(
        ryeong.dang_ryeong,
        usejijanggan.y_jangan.y_jangan1,
        usejijangganUse.yong.y_land.y_jangan1
      ),
      ryeongFunction.hwakjang_gisin(
        ryeong.dang_ryeong,
        usejijanggan.y_jangan.y_jangan2,
        usejijangganUse.yong.y_land.y_jangan2
      ),
      ryeongFunction.hwakjang_gisin(
        ryeong.dang_ryeong,
        usejijanggan.y_jangan.y_jangan3,
        usejijangganUse.yong.y_land.y_jangan3
      ),
      ryeongFunction.hwakjang_gisin(
        ryeong.dang_ryeong,
        usejijanggan.m_jangan.m_jangan1,
        usejijangganUse.yong.m_land.m_jangan1
      ),
      ryeongFunction.hwakjang_gisin(
        ryeong.dang_ryeong,
        usejijanggan.m_jangan.m_jangan2,
        usejijangganUse.yong.m_land.m_jangan2
      ),
      ryeongFunction.hwakjang_gisin(
        ryeong.dang_ryeong,
        usejijanggan.m_jangan.m_jangan3,
        usejijangganUse.yong.m_land.m_jangan3
      ),
      ryeongFunction.hwakjang_gisin(
        ryeong.dang_ryeong,
        usejijanggan.d_jangan.d_jangan1,
        usejijangganUse.yong.d_land.d_jangan1
      ),
      ryeongFunction.hwakjang_gisin(
        ryeong.dang_ryeong,
        usejijanggan.d_jangan.d_jangan2,
        usejijangganUse.yong.d_land.d_jangan2
      ),
      ryeongFunction.hwakjang_gisin(
        ryeong.dang_ryeong,
        usejijanggan.d_jangan.d_jangan3,
        usejijangganUse.yong.d_land.d_jangan3
      ),
      ryeongFunction.hwakjang_gisin(
        ryeong.dang_ryeong,
        usejijanggan.h_jangan.h_jangan1,
        usejijangganUse.yong.h_land.h_jangan1
      ),
      ryeongFunction.hwakjang_gisin(
        ryeong.dang_ryeong,
        usejijanggan.h_jangan.h_jangan2,
        usejijangganUse.yong.h_land.h_jangan2
      ),
      ryeongFunction.hwakjang_gisin(
        ryeong.dang_ryeong,
        usejijanggan.h_jangan.h_jangan3,
        usejijangganUse.yong.h_land.h_jangan3
      ),
    ];
    let um_heuisin_gisin = [
      ryeongFunction.um_heuisin_gisin(ryeong.dang_ryeong, usePillar.y_sky),
      ryeongFunction.um_heuisin_gisin(ryeong.dang_ryeong, usePillar.m_sky),
      ryeongFunction.um_heuisin_gisin(ryeong.dang_ryeong, usePillar.d_sky),
      ryeongFunction.um_heuisin_gisin(ryeong.dang_ryeong, usePillar.h_sky),
      ryeongFunction.um_heuisin_gisin(
        ryeong.dang_ryeong,
        usejijanggan.y_jangan.y_jangan1,
        usejijangganUse.yong.y_land.y_jangan1
      ),
      ryeongFunction.um_heuisin_gisin(
        ryeong.dang_ryeong,
        usejijanggan.y_jangan.y_jangan2,
        usejijangganUse.yong.y_land.y_jangan2
      ),
      ryeongFunction.um_heuisin_gisin(
        ryeong.dang_ryeong,
        usejijanggan.y_jangan.y_jangan3,
        usejijangganUse.yong.y_land.y_jangan3
      ),
      ryeongFunction.um_heuisin_gisin(
        ryeong.dang_ryeong,
        usejijanggan.m_jangan.m_jangan1,
        usejijangganUse.yong.m_land.m_jangan1
      ),
      ryeongFunction.um_heuisin_gisin(
        ryeong.dang_ryeong,
        usejijanggan.m_jangan.m_jangan2,
        usejijangganUse.yong.m_land.m_jangan2
      ),
      ryeongFunction.um_heuisin_gisin(
        ryeong.dang_ryeong,
        usejijanggan.m_jangan.m_jangan3,
        usejijangganUse.yong.m_land.m_jangan3
      ),
      ryeongFunction.um_heuisin_gisin(
        ryeong.dang_ryeong,
        usejijanggan.d_jangan.d_jangan1,
        usejijangganUse.yong.d_land.d_jangan1
      ),
      ryeongFunction.um_heuisin_gisin(
        ryeong.dang_ryeong,
        usejijanggan.d_jangan.d_jangan2,
        usejijangganUse.yong.d_land.d_jangan2
      ),
      ryeongFunction.um_heuisin_gisin(
        ryeong.dang_ryeong,
        usejijanggan.d_jangan.d_jangan3,
        usejijangganUse.yong.d_land.d_jangan3
      ),
      ryeongFunction.um_heuisin_gisin(
        ryeong.dang_ryeong,
        usejijanggan.h_jangan.h_jangan1,
        usejijangganUse.yong.h_land.h_jangan1
      ),
      ryeongFunction.um_heuisin_gisin(
        ryeong.dang_ryeong,
        usejijanggan.h_jangan.h_jangan2,
        usejijangganUse.yong.h_land.h_jangan2
      ),
      ryeongFunction.um_heuisin_gisin(
        ryeong.dang_ryeong,
        usejijanggan.h_jangan.h_jangan3,
        usejijangganUse.yong.h_land.h_jangan3
      ),
    ];
    let geuk_heuisin_gisin = [
      ryeongFunction.geuk_heuisin_gisin(ryeong.dang_ryeong, usePillar.y_sky),
      ryeongFunction.geuk_heuisin_gisin(ryeong.dang_ryeong, usePillar.m_sky),
      ryeongFunction.geuk_heuisin_gisin(ryeong.dang_ryeong, usePillar.d_sky),
      ryeongFunction.geuk_heuisin_gisin(ryeong.dang_ryeong, usePillar.h_sky),
      ryeongFunction.geuk_heuisin_gisin(
        ryeong.dang_ryeong,
        usejijanggan.y_jangan.y_jangan1,
        usejijangganUse.yong.y_land.y_jangan1
      ),
      ryeongFunction.geuk_heuisin_gisin(
        ryeong.dang_ryeong,
        usejijanggan.y_jangan.y_jangan2,
        usejijangganUse.yong.y_land.y_jangan2
      ),
      ryeongFunction.geuk_heuisin_gisin(
        ryeong.dang_ryeong,
        usejijanggan.y_jangan.y_jangan3,
        usejijangganUse.yong.y_land.y_jangan3
      ),
      ryeongFunction.geuk_heuisin_gisin(
        ryeong.dang_ryeong,
        usejijanggan.m_jangan.m_jangan1,
        usejijangganUse.yong.m_land.m_jangan1
      ),
      ryeongFunction.geuk_heuisin_gisin(
        ryeong.dang_ryeong,
        usejijanggan.m_jangan.m_jangan2,
        usejijangganUse.yong.m_land.m_jangan2
      ),
      ryeongFunction.geuk_heuisin_gisin(
        ryeong.dang_ryeong,
        usejijanggan.m_jangan.m_jangan3,
        usejijangganUse.yong.m_land.m_jangan3
      ),
      ryeongFunction.geuk_heuisin_gisin(
        ryeong.dang_ryeong,
        usejijanggan.d_jangan.d_jangan1,
        usejijangganUse.yong.d_land.d_jangan1
      ),
      ryeongFunction.geuk_heuisin_gisin(
        ryeong.dang_ryeong,
        usejijanggan.d_jangan.d_jangan2,
        usejijangganUse.yong.d_land.d_jangan2
      ),
      ryeongFunction.geuk_heuisin_gisin(
        ryeong.dang_ryeong,
        usejijanggan.d_jangan.d_jangan3,
        usejijangganUse.yong.d_land.d_jangan3
      ),
      ryeongFunction.geuk_heuisin_gisin(
        ryeong.dang_ryeong,
        usejijanggan.h_jangan.h_jangan1,
        usejijangganUse.yong.h_land.h_jangan1
      ),
      ryeongFunction.geuk_heuisin_gisin(
        ryeong.dang_ryeong,
        usejijanggan.h_jangan.h_jangan2,
        usejijangganUse.yong.h_land.h_jangan2
      ),
      ryeongFunction.geuk_heuisin_gisin(
        ryeong.dang_ryeong,
        usejijanggan.h_jangan.h_jangan3,
        usejijangganUse.yong.h_land.h_jangan3
      ),
    ];
    let um_gisin = [
      ryeongFunction.um_gisin(ryeong.dang_ryeong, usePillar.y_sky),
      ryeongFunction.um_gisin(ryeong.dang_ryeong, usePillar.m_sky),
      ryeongFunction.um_gisin(ryeong.dang_ryeong, usePillar.d_sky),
      ryeongFunction.um_gisin(ryeong.dang_ryeong, usePillar.h_sky),
      ryeongFunction.um_gisin(
        ryeong.dang_ryeong,
        usejijanggan.y_jangan.y_jangan1,
        usejijangganUse.yong.y_land.y_jangan1
      ),
      ryeongFunction.um_gisin(
        ryeong.dang_ryeong,
        usejijanggan.y_jangan.y_jangan2,
        usejijangganUse.yong.y_land.y_jangan2
      ),
      ryeongFunction.um_gisin(
        ryeong.dang_ryeong,
        usejijanggan.y_jangan.y_jangan3,
        usejijangganUse.yong.y_land.y_jangan3
      ),
      ryeongFunction.um_gisin(
        ryeong.dang_ryeong,
        usejijanggan.m_jangan.m_jangan1,
        usejijangganUse.yong.m_land.m_jangan1
      ),
      ryeongFunction.um_gisin(
        ryeong.dang_ryeong,
        usejijanggan.m_jangan.m_jangan2,
        usejijangganUse.yong.m_land.m_jangan2
      ),
      ryeongFunction.um_gisin(
        ryeong.dang_ryeong,
        usejijanggan.m_jangan.m_jangan3,
        usejijangganUse.yong.m_land.m_jangan3
      ),
      ryeongFunction.um_gisin(
        ryeong.dang_ryeong,
        usejijanggan.d_jangan.d_jangan1,
        usejijangganUse.yong.d_land.d_jangan1
      ),
      ryeongFunction.um_gisin(
        ryeong.dang_ryeong,
        usejijanggan.d_jangan.d_jangan2,
        usejijangganUse.yong.d_land.d_jangan2
      ),
      ryeongFunction.um_gisin(
        ryeong.dang_ryeong,
        usejijanggan.d_jangan.d_jangan3,
        usejijangganUse.yong.d_land.d_jangan3
      ),
      ryeongFunction.um_gisin(
        ryeong.dang_ryeong,
        usejijanggan.h_jangan.h_jangan1,
        usejijangganUse.yong.h_land.h_jangan1
      ),
      ryeongFunction.um_gisin(
        ryeong.dang_ryeong,
        usejijanggan.h_jangan.h_jangan2,
        usejijangganUse.yong.h_land.h_jangan2
      ),
      ryeongFunction.um_gisin(
        ryeong.dang_ryeong,
        usejijanggan.h_jangan.h_jangan3,
        usejijangganUse.yong.h_land.h_jangan3
      ),
    ];
    let geuk_gisin = [
      ryeongFunction.geuk_gisin(ryeong.dang_ryeong, usePillar.y_sky),
      ryeongFunction.geuk_gisin(ryeong.dang_ryeong, usePillar.m_sky),
      ryeongFunction.geuk_gisin(ryeong.dang_ryeong, usePillar.d_sky),
      ryeongFunction.geuk_gisin(ryeong.dang_ryeong, usePillar.h_sky),
      ryeongFunction.geuk_gisin(
        ryeong.dang_ryeong,
        usejijanggan.y_jangan.y_jangan1,
        usejijangganUse.yong.y_land.y_jangan1
      ),
      ryeongFunction.geuk_gisin(
        ryeong.dang_ryeong,
        usejijanggan.y_jangan.y_jangan2,
        usejijangganUse.yong.y_land.y_jangan2
      ),
      ryeongFunction.geuk_gisin(
        ryeong.dang_ryeong,
        usejijanggan.y_jangan.y_jangan3,
        usejijangganUse.yong.y_land.y_jangan3
      ),
      ryeongFunction.geuk_gisin(
        ryeong.dang_ryeong,
        usejijanggan.m_jangan.m_jangan1,
        usejijangganUse.yong.m_land.m_jangan1
      ),
      ryeongFunction.geuk_gisin(
        ryeong.dang_ryeong,
        usejijanggan.m_jangan.m_jangan2,
        usejijangganUse.yong.m_land.m_jangan2
      ),
      ryeongFunction.geuk_gisin(
        ryeong.dang_ryeong,
        usejijanggan.m_jangan.m_jangan3,
        usejijangganUse.yong.m_land.m_jangan3
      ),
      ryeongFunction.geuk_gisin(
        ryeong.dang_ryeong,
        usejijanggan.d_jangan.d_jangan1,
        usejijangganUse.yong.d_land.d_jangan1
      ),
      ryeongFunction.geuk_gisin(
        ryeong.dang_ryeong,
        usejijanggan.d_jangan.d_jangan2,
        usejijangganUse.yong.d_land.d_jangan2
      ),
      ryeongFunction.geuk_gisin(
        ryeong.dang_ryeong,
        usejijanggan.d_jangan.d_jangan3,
        usejijangganUse.yong.d_land.d_jangan3
      ),
      ryeongFunction.geuk_gisin(
        ryeong.dang_ryeong,
        usejijanggan.h_jangan.h_jangan1,
        usejijangganUse.yong.h_land.h_jangan1
      ),
      ryeongFunction.geuk_gisin(
        ryeong.dang_ryeong,
        usejijanggan.h_jangan.h_jangan2,
        usejijangganUse.yong.h_land.h_jangan2
      ),
      ryeongFunction.geuk_gisin(
        ryeong.dang_ryeong,
        usejijanggan.h_jangan.h_jangan3,
        usejijangganUse.yong.h_land.h_jangan3
      ),
    ];
    useRyeong = {
      ryeong: {
        dang_ryeong: ryeong.dang_ryeong,
        sa_ryeong: ryeong.sa_ryeong,
      },
      heuisin: {
        y_sky: heuisin[0],
        m_sky: heuisin[1],
        d_sky: heuisin[2],
        h_sky: heuisin[3],
        y_jangan1: heuisin[4],
        y_jangan2: heuisin[5],
        y_jangan3: heuisin[6],
        m_jangan1: heuisin[7],
        m_jangan2: heuisin[8],
        m_jangan3: heuisin[9],
        d_jangan1: heuisin[10],
        d_jangan2: heuisin[11],
        d_jangan3: heuisin[12],
        h_jangan1: heuisin[13],
        h_jangan2: heuisin[14],
        h_jangan3: heuisin[15],
      },
      junghwa: {
        y_sky: junghwa[0],
        m_sky: junghwa[1],
        d_sky: junghwa[2],
        h_sky: junghwa[3],
        y_jangan1: junghwa[4],
        y_jangan2: junghwa[5],
        y_jangan3: junghwa[6],
        m_jangan1: junghwa[7],
        m_jangan2: junghwa[8],
        m_jangan3: junghwa[9],
        d_jangan1: junghwa[10],
        d_jangan2: junghwa[11],
        d_jangan3: junghwa[12],
        h_jangan1: junghwa[13],
        h_jangan2: junghwa[14],
        h_jangan3: junghwa[15],
      },
      junghwa_gisin: {
        y_sky: junghwa_gisin[0],
        m_sky: junghwa_gisin[1],
        d_sky: junghwa_gisin[2],
        h_sky: junghwa_gisin[3],
        y_jangan1: junghwa_gisin[4],
        y_jangan2: junghwa_gisin[5],
        y_jangan3: junghwa_gisin[6],
        m_jangan1: junghwa_gisin[7],
        m_jangan2: junghwa_gisin[8],
        m_jangan3: junghwa_gisin[9],
        d_jangan1: junghwa_gisin[10],
        d_jangan2: junghwa_gisin[11],
        d_jangan3: junghwa_gisin[12],
        h_jangan1: junghwa_gisin[13],
        h_jangan2: junghwa_gisin[14],
        h_jangan3: junghwa_gisin[15],
      },
      jisok: {
        y_sky: jisok[0],
        m_sky: jisok[1],
        d_sky: jisok[2],
        h_sky: jisok[3],
        y_jangan1: jisok[4],
        y_jangan2: jisok[5],
        y_jangan3: jisok[6],
        m_jangan1: jisok[7],
        m_jangan2: jisok[8],
        m_jangan3: jisok[9],
        d_jangan1: jisok[10],
        d_jangan2: jisok[11],
        d_jangan3: jisok[12],
        h_jangan1: jisok[13],
        h_jangan2: jisok[14],
        h_jangan3: jisok[15],
      },
      hwakjang: {
        y_sky: hwakjang[0],
        m_sky: hwakjang[1],
        d_sky: hwakjang[2],
        h_sky: hwakjang[3],
        y_jangan1: hwakjang[4],
        y_jangan2: hwakjang[5],
        y_jangan3: hwakjang[6],
        m_jangan1: hwakjang[7],
        m_jangan2: hwakjang[8],
        m_jangan3: hwakjang[9],
        d_jangan1: hwakjang[10],
        d_jangan2: hwakjang[11],
        d_jangan3: hwakjang[12],
        h_jangan1: hwakjang[13],
        h_jangan2: hwakjang[14],
        h_jangan3: hwakjang[15],
      },
      hwakjang_gisin: {
        y_sky: hwakjang_gisin[0],
        m_sky: hwakjang_gisin[1],
        d_sky: hwakjang_gisin[2],
        h_sky: hwakjang_gisin[3],
        y_jangan1: hwakjang_gisin[4],
        y_jangan2: hwakjang_gisin[5],
        y_jangan3: hwakjang_gisin[6],
        m_jangan1: hwakjang_gisin[7],
        m_jangan2: hwakjang_gisin[8],
        m_jangan3: hwakjang_gisin[9],
        d_jangan1: hwakjang_gisin[10],
        d_jangan2: hwakjang_gisin[11],
        d_jangan3: hwakjang_gisin[12],
        h_jangan1: hwakjang_gisin[13],
        h_jangan2: hwakjang_gisin[14],
        h_jangan3: hwakjang_gisin[15],
      },
      um_heuisin_gisin: {
        y_sky: um_heuisin_gisin[0],
        m_sky: um_heuisin_gisin[1],
        d_sky: um_heuisin_gisin[2],
        h_sky: um_heuisin_gisin[3],
        y_jangan1: um_heuisin_gisin[4],
        y_jangan2: um_heuisin_gisin[5],
        y_jangan3: um_heuisin_gisin[6],
        m_jangan1: um_heuisin_gisin[7],
        m_jangan2: um_heuisin_gisin[8],
        m_jangan3: um_heuisin_gisin[9],
        d_jangan1: um_heuisin_gisin[10],
        d_jangan2: um_heuisin_gisin[11],
        d_jangan3: um_heuisin_gisin[12],
        h_jangan1: um_heuisin_gisin[13],
        h_jangan2: um_heuisin_gisin[14],
        h_jangan3: um_heuisin_gisin[15],
      },
      geuk_heuisin_gisin: {
        y_sky: geuk_heuisin_gisin[0],
        m_sky: geuk_heuisin_gisin[1],
        d_sky: geuk_heuisin_gisin[2],
        h_sky: geuk_heuisin_gisin[3],
        y_jangan1: geuk_heuisin_gisin[4],
        y_jangan2: geuk_heuisin_gisin[5],
        y_jangan3: geuk_heuisin_gisin[6],
        m_jangan1: geuk_heuisin_gisin[7],
        m_jangan2: geuk_heuisin_gisin[8],
        m_jangan3: geuk_heuisin_gisin[9],
        d_jangan1: geuk_heuisin_gisin[10],
        d_jangan2: geuk_heuisin_gisin[11],
        d_jangan3: geuk_heuisin_gisin[12],
        h_jangan1: geuk_heuisin_gisin[13],
        h_jangan2: geuk_heuisin_gisin[14],
        h_jangan3: geuk_heuisin_gisin[15],
      },
      um_gisin: {
        y_sky: um_gisin[0],
        m_sky: um_gisin[1],
        d_sky: um_gisin[2],
        h_sky: um_gisin[3],
        y_jangan1: um_gisin[4],
        y_jangan2: um_gisin[5],
        y_jangan3: um_gisin[6],
        m_jangan1: um_gisin[7],
        m_jangan2: um_gisin[8],
        m_jangan3: um_gisin[9],
        d_jangan1: um_gisin[10],
        d_jangan2: um_gisin[11],
        d_jangan3: um_gisin[12],
        h_jangan1: um_gisin[13],
        h_jangan2: um_gisin[14],
        h_jangan3: um_gisin[15],
      },
      geuk_gisin: {
        y_sky: geuk_gisin[0],
        m_sky: geuk_gisin[1],
        d_sky: geuk_gisin[2],
        h_sky: geuk_gisin[3],
        y_jangan1: geuk_gisin[4],
        y_jangan2: geuk_gisin[5],
        y_jangan3: geuk_gisin[6],
        m_jangan1: geuk_gisin[7],
        m_jangan2: geuk_gisin[8],
        m_jangan3: geuk_gisin[9],
        d_jangan1: geuk_gisin[10],
        d_jangan2: geuk_gisin[11],
        d_jangan3: geuk_gisin[12],
        h_jangan1: geuk_gisin[13],
        h_jangan2: geuk_gisin[14],
        h_jangan3: geuk_gisin[15],
      },
    };
    resolve(ryeong);
  }).catch((error) => {
    console.log(error);
    return error;
});
};
module.exports = ryeongFunc;
