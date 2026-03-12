var yukSinFunc = {};
//상생상극함수
const sssg = require("./getSangSengSangGuk");
const yuksin = require("./getYukSin");
yukSinFunc.yukSin = function () {
  return new Promise((resolve) => {
    //일간기준으로 상생상극을 뽑는것이므로
    //일간제외 모든것을 돌림(지장간포함)
    //보내주는 순서는 일간,각자에맞는 천간지지지장간
    let yPillarSky = yuksin.yuksin(
      sssg.sssg(useUmYangOHang.d_sky.oHang, useTodayUmYangOHang.y_sky.oHang),
      useTodayUmYangOHang.y_sky.umYang
    );
    let yPillarLand = yuksin.yuksin(
      sssg.sssg(useUmYangOHang.d_sky.oHang, useTodayUmYangOHang.y_land.oHang),
      useTodayUmYangOHang.y_land.umYang
    );
    let mPillarSky = yuksin.yuksin(
      sssg.sssg(useUmYangOHang.d_sky.oHang, useTodayUmYangOHang.m_sky.oHang),
      useTodayUmYangOHang.m_sky.umYang
    );
    let mPillarLand = yuksin.yuksin(
      sssg.sssg(useUmYangOHang.d_sky.oHang, useTodayUmYangOHang.m_land.oHang),
      useTodayUmYangOHang.m_land.umYang
    );

    let dPillarLand = yuksin.yuksin(
      sssg.sssg(useUmYangOHang.d_sky.oHang, useTodayUmYangOHang.d_land.oHang),
      useTodayUmYangOHang.d_land.umYang
    );

    let hPillarSky = yuksin.yuksin(
      sssg.sssg(useUmYangOHang.d_sky.oHang, useTodayUmYangOHang.h_sky.oHang),
      useTodayUmYangOHang.h_sky.umYang
    );

    let hPillarLand = yuksin.yuksin(
      sssg.sssg(useUmYangOHang.d_sky.oHang, useTodayUmYangOHang.h_land.oHang),
      useTodayUmYangOHang.h_land.umYang
    );

    //지장간
    /*let y_jang = useTodayUmYangOHang.y_jangan.split(",");
    let m_jang = useTodayUmYangOHang.m_jangan.split(",");
    let d_jang = useTodayUmYangOHang.d_jangan.split(",");
    let h_jang = useTodayUmYangOHang.h_jangan.split(",");
    let jijanggan = {
      y_jangan:
        sssg.sssg(useTodayUmYangOHang.d_sky.oHang, y_jang[0]) +
        "," +
        sssg.sssg(useTodayUmYangOHang.d_sky.oHang, y_jang[1]) +
        "," +
        sssg.sssg(useTodayUmYangOHang.d_sky.oHang, y_jang[2]),
      m_jangan:
        sssg.sssg(useTodayUmYangOHang.d_sky.oHang, m_jang[0]) +
        "," +
        sssg.sssg(useTodayUmYangOHang.d_sky.oHang, m_jang[1]) +
        "," +
        sssg.sssg(useTodayUmYangOHang.d_sky.oHang, m_jang[2]),
      d_jangan:
        sssg.sssg(useTodayUmYangOHang.d_sky.oHang, d_jang[0]) +
        "," +
        sssg.sssg(useTodayUmYangOHang.d_sky.oHang, d_jang[1]) +
        "," +
        sssg.sssg(useTodayUmYangOHang.d_sky.oHang, d_jang[2]),
      h_jangan:
        sssg.sssg(useTodayUmYangOHang.d_sky.oHang, h_jang[0]) +
        "," +
        sssg.sssg(useTodayUmYangOHang.d_sky.oHang, h_jang[1]) +
        "," +
        sssg.sssg(useTodayUmYangOHang.d_sky.oHang, h_jang[2]),
    };*/
    useTodayYuksin = {
      y_sky: yPillarSky,
      y_land: yPillarLand,
      m_sky: mPillarSky,
      m_land: mPillarLand,
      d_land: dPillarLand,
      h_sky: hPillarSky,
      h_land: hPillarLand,
      y_jangan: {
        y_jangan1: yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useTodayUmYangOHang.y_jangan.y_jangan1.oHang
          ),
          useTodayUmYangOHang.y_jangan.y_jangan1.umYang
        ),
        y_jangan2: yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useTodayUmYangOHang.y_jangan.y_jangan2.oHang
          ),
          useTodayUmYangOHang.y_jangan.y_jangan2.umYang
        ),
        y_jangan3: yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useTodayUmYangOHang.y_jangan.y_jangan3.oHang
          ),
          useTodayUmYangOHang.y_jangan.y_jangan3.umYang
        ),
      },
      m_jangan: {
        m_jangan1: yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useTodayUmYangOHang.m_jangan.m_jangan1.oHang
          ),
          useTodayUmYangOHang.m_jangan.m_jangan1.umYang
        ),
        m_jangan2: yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useTodayUmYangOHang.m_jangan.m_jangan2.oHang
          ),
          useTodayUmYangOHang.m_jangan.m_jangan2.umYang
        ),
        m_jangan3: yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useTodayUmYangOHang.m_jangan.m_jangan3.oHang
          ),
          useTodayUmYangOHang.m_jangan.m_jangan3.umYang
        ),
      },
      d_jangan: {
        d_jangan1: yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useTodayUmYangOHang.d_jangan.d_jangan1.oHang
          ),
          useTodayUmYangOHang.d_jangan.d_jangan1.umYang
        ),
        d_jangan2: yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useTodayUmYangOHang.d_jangan.d_jangan2.oHang
          ),
          useTodayUmYangOHang.d_jangan.d_jangan2.umYang
        ),
        d_jangan3: yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useTodayUmYangOHang.d_jangan.d_jangan3.oHang
          ),
          useTodayUmYangOHang.d_jangan.d_jangan3.umYang
        ),
      },
      h_jangan: {
        h_jangan1: yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useTodayUmYangOHang.h_jangan.h_jangan1.oHang
          ),
          useTodayUmYangOHang.h_jangan.h_jangan1.umYang
        ),
        h_jangan2: yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useTodayUmYangOHang.h_jangan.h_jangan2.oHang
          ),
          useTodayUmYangOHang.h_jangan.h_jangan2.umYang
        ),
        h_jangan3: yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useTodayUmYangOHang.h_jangan.h_jangan3.oHang
          ),
          useTodayUmYangOHang.h_jangan.h_jangan3.umYang
        ),
      },
    };
    //  myManse.yukSin = useTodayYuksin;
    resolve(useYuksin);
  }).catch((error) => {
    console.log(error);
    return error;
});
};
module.exports = yukSinFunc;
