var yukSinFunc = {};
//상생상극함수
const sssg = require('./getSangSengSangGuk');
const yuksin = require('./getYukSin');
yukSinFunc.yukSin = function () {
  return new Promise((resolve) => {
    //일간기준으로 상생상극을 뽑는것이므로
    //일간제외 모든것을 돌림(지장간포함)
    //보내주는 순서는 일간,각자에맞는 천간지지지장간
    let yPillarSky = yuksin.yuksin(
      sssg.sssg(useUmYangOHang.d_sky.oHang, useUmYangOHang.y_sky.oHang),
      useUmYangOHang.y_sky.umYang
    );
    let yPillarLand = yuksin.yuksin(
      sssg.sssg(useUmYangOHang.d_sky.oHang, useUmYangOHang.y_land.oHang),
      useUmYangOHang.y_land.umYang
    );
    let mPillarSky = yuksin.yuksin(
      sssg.sssg(useUmYangOHang.d_sky.oHang, useUmYangOHang.m_sky.oHang),
      useUmYangOHang.m_sky.umYang
    );
    let mPillarLand = yuksin.yuksin(
      sssg.sssg(useUmYangOHang.d_sky.oHang, useUmYangOHang.m_land.oHang),
      useUmYangOHang.m_land.umYang
    );

    let dPillarLand = yuksin.yuksin(
      sssg.sssg(useUmYangOHang.d_sky.oHang, useUmYangOHang.d_land.oHang),
      useUmYangOHang.d_land.umYang
    );

    let hPillarSky = yuksin.yuksin(
      sssg.sssg(useUmYangOHang.d_sky.oHang, useUmYangOHang.h_sky.oHang),
      useUmYangOHang.h_sky.umYang
    );

    let hPillarLand = yuksin.yuksin(
      sssg.sssg(useUmYangOHang.d_sky.oHang, useUmYangOHang.h_land.oHang),
      useUmYangOHang.h_land.umYang
    );

    //지장간
    /*let y_jang = useUmYangOHang.y_jangan.split(",");
    let m_jang = useUmYangOHang.m_jangan.split(",");
    let d_jang = useUmYangOHang.d_jangan.split(",");
    let h_jang = useUmYangOHang.h_jangan.split(",");
    let jijanggan = {
      y_jangan:
        sssg.sssg(useUmYangOHang.d_sky.oHang, y_jang[0]) +
        "," +
        sssg.sssg(useUmYangOHang.d_sky.oHang, y_jang[1]) +
        "," +
        sssg.sssg(useUmYangOHang.d_sky.oHang, y_jang[2]),
      m_jangan:
        sssg.sssg(useUmYangOHang.d_sky.oHang, m_jang[0]) +
        "," +
        sssg.sssg(useUmYangOHang.d_sky.oHang, m_jang[1]) +
        "," +
        sssg.sssg(useUmYangOHang.d_sky.oHang, m_jang[2]),
      d_jangan:
        sssg.sssg(useUmYangOHang.d_sky.oHang, d_jang[0]) +
        "," +
        sssg.sssg(useUmYangOHang.d_sky.oHang, d_jang[1]) +
        "," +
        sssg.sssg(useUmYangOHang.d_sky.oHang, d_jang[2]),
      h_jangan:
        sssg.sssg(useUmYangOHang.d_sky.oHang, h_jang[0]) +
        "," +
        sssg.sssg(useUmYangOHang.d_sky.oHang, h_jang[1]) +
        "," +
        sssg.sssg(useUmYangOHang.d_sky.oHang, h_jang[2]),
    };*/
    let useYuksinn = {
      y_sky: yPillarSky,
      y_land: yPillarLand,
      m_sky: mPillarSky,
      m_land: mPillarLand,
      d_land: dPillarLand,
      h_sky: hPillarSky,
      h_land: hPillarLand,
      y_jangan: {
        y_jangan1: checkYuksin(yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useUmYangOHang.y_jangan.y_jangan1.oHang
          ),
          useUmYangOHang.y_jangan.y_jangan1.umYang
        )),
        y_jangan2: checkYuksin(yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useUmYangOHang.y_jangan.y_jangan2.oHang
          ),
          useUmYangOHang.y_jangan.y_jangan2.umYang
        )),
        y_jangan3: checkYuksin(yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useUmYangOHang.y_jangan.y_jangan3.oHang
          ),
          useUmYangOHang.y_jangan.y_jangan3.umYang
        )),
      },
      m_jangan: {
        m_jangan1: yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useUmYangOHang.m_jangan.m_jangan1.oHang
          ),
          useUmYangOHang.m_jangan.m_jangan1.umYang
        ),
        m_jangan2: yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useUmYangOHang.m_jangan.m_jangan2.oHang
          ),
          useUmYangOHang.m_jangan.m_jangan2.umYang
        ),
        m_jangan3: yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useUmYangOHang.m_jangan.m_jangan3.oHang
          ),
          useUmYangOHang.m_jangan.m_jangan3.umYang
        ),
      },
      d_jangan: {
        d_jangan1: checkYuksin(yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useUmYangOHang.d_jangan.d_jangan1.oHang
          ),
          useUmYangOHang.d_jangan.d_jangan1.umYang
        )),
        d_jangan2: checkYuksin(yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useUmYangOHang.d_jangan.d_jangan2.oHang
          ),
          useUmYangOHang.d_jangan.d_jangan2.umYang
        )),
        d_jangan3: checkYuksin(yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useUmYangOHang.d_jangan.d_jangan3.oHang
          ),
          useUmYangOHang.d_jangan.d_jangan3.umYang
        )),
      },
      h_jangan: {
        h_jangan1: checkYuksin(yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useUmYangOHang.h_jangan.h_jangan1.oHang
          ),
          useUmYangOHang.h_jangan.h_jangan1.umYang
        )),
        h_jangan2: checkYuksin(yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useUmYangOHang.h_jangan.h_jangan2.oHang
          ),
          useUmYangOHang.h_jangan.h_jangan2.umYang
        )),
        h_jangan3: checkYuksin(yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useUmYangOHang.h_jangan.h_jangan3.oHang
          ),
          useUmYangOHang.h_jangan.h_jangan3.umYang
        )),
      },
    };

    myManse.yukSin = {
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
            useUmYangOHang.y_jangan.y_jangan1.oHang
          ),
          useUmYangOHang.y_jangan.y_jangan1.umYang
        ),
        y_jangan2: yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useUmYangOHang.y_jangan.y_jangan2.oHang
          ),
          useUmYangOHang.y_jangan.y_jangan2.umYang
        ),
        y_jangan3: yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useUmYangOHang.y_jangan.y_jangan3.oHang
          ),
          useUmYangOHang.y_jangan.y_jangan3.umYang
        ),
      },
      m_jangan: {
        m_jangan1: yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useUmYangOHang.m_jangan.m_jangan1.oHang
          ),
          useUmYangOHang.m_jangan.m_jangan1.umYang
        ),
        m_jangan2: yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useUmYangOHang.m_jangan.m_jangan2.oHang
          ),
          useUmYangOHang.m_jangan.m_jangan2.umYang
        ),
        m_jangan3: yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useUmYangOHang.m_jangan.m_jangan3.oHang
          ),
          useUmYangOHang.m_jangan.m_jangan3.umYang
        ),
      },
      d_jangan: {
        d_jangan1: yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useUmYangOHang.d_jangan.d_jangan1.oHang
          ),
          useUmYangOHang.d_jangan.d_jangan1.umYang
        ),
        d_jangan2: yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useUmYangOHang.d_jangan.d_jangan2.oHang
          ),
          useUmYangOHang.d_jangan.d_jangan2.umYang
        ),
        d_jangan3: yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useUmYangOHang.d_jangan.d_jangan3.oHang
          ),
          useUmYangOHang.d_jangan.d_jangan3.umYang
        ),
      },
      h_jangan: {
        h_jangan1: yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useUmYangOHang.h_jangan.h_jangan1.oHang
          ),
          useUmYangOHang.h_jangan.h_jangan1.umYang
        ),
        h_jangan2: yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useUmYangOHang.h_jangan.h_jangan2.oHang
          ),
          useUmYangOHang.h_jangan.h_jangan2.umYang
        ),
        h_jangan3: yuksin.yuksin(
          sssg.sssg(
            useUmYangOHang.d_sky.oHang,
            useUmYangOHang.h_jangan.h_jangan3.oHang
          ),
          useUmYangOHang.h_jangan.h_jangan3.umYang
        ),
      },
    };
    useYuksin = useYuksinn;
    resolve('useYuksin');
  }).catch((error) => {
    console.log(error);
    return error;
});
};

//비견 겁재 체크하는것
function checkYuksin(yuksin){
  let result=yuksin;
  if(yuksin==="비견"|| yuksin==="겁재"){
    result=""
  }
  return result;
}
module.exports = yukSinFunc;
