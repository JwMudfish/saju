var ryeongFunc = {};
//음양오행  객체에 담고 한번에 myManse에 넣어버리기
let ryeong = {};
const ryeongFunction = require("../../ryeong/ryeong");
ryeongFunc.ryeong = function () {
  return new Promise((resolve) => {
    let ryeong = ryeongFunction.ryeong();

    let heuisin = [
      ryeongFunction.heuisin(ryeong.dang_ryeong, useTodayPillar.y_sky),
      ryeongFunction.heuisin(ryeong.dang_ryeong, useTodayPillar.m_sky),
      ryeongFunction.heuisin(ryeong.dang_ryeong, useTodayPillar.d_sky),
    ];

    let junghwa = [
      ryeongFunction.junghwa(ryeong.dang_ryeong, useTodayPillar.y_sky),
      ryeongFunction.junghwa(ryeong.dang_ryeong, useTodayPillar.m_sky),
      ryeongFunction.junghwa(ryeong.dang_ryeong, useTodayPillar.d_sky),
    ];
    let junghwa_gisin = [
      ryeongFunction.junghwa_gisin(ryeong.dang_ryeong, useTodayPillar.y_sky),
      ryeongFunction.junghwa_gisin(ryeong.dang_ryeong, useTodayPillar.m_sky),
      ryeongFunction.junghwa_gisin(ryeong.dang_ryeong, useTodayPillar.d_sky),
    ];
    let jisok = [
      ryeongFunction.jisok(ryeong.dang_ryeong, useTodayPillar.y_sky),
      ryeongFunction.jisok(ryeong.dang_ryeong, useTodayPillar.m_sky),
      ryeongFunction.jisok(ryeong.dang_ryeong, useTodayPillar.d_sky),
    ];

    let jisok_gisin = [
      ryeongFunction.jisok_gisin(ryeong.dang_ryeong, useTodayPillar.y_sky),
      ryeongFunction.jisok_gisin(ryeong.dang_ryeong, useTodayPillar.m_sky),
      ryeongFunction.jisok_gisin(ryeong.dang_ryeong, useTodayPillar.d_sky),
    ];

    let hwakjang = [
      ryeongFunction.hwakjang(ryeong.dang_ryeong, useTodayPillar.y_sky),
      ryeongFunction.hwakjang(ryeong.dang_ryeong, useTodayPillar.m_sky),
      ryeongFunction.hwakjang(ryeong.dang_ryeong, useTodayPillar.d_sky),
    ];
    let hwakjang_gisin = [
      ryeongFunction.hwakjang_gisin(ryeong.dang_ryeong, useTodayPillar.y_sky),
      ryeongFunction.hwakjang_gisin(ryeong.dang_ryeong, useTodayPillar.m_sky),
      ryeongFunction.hwakjang_gisin(ryeong.dang_ryeong, useTodayPillar.d_sky),
    ];
    let um_heuisin_gisin = [
      ryeongFunction.um_heuisin_gisin(ryeong.dang_ryeong, useTodayPillar.y_sky),
      ryeongFunction.um_heuisin_gisin(ryeong.dang_ryeong, useTodayPillar.m_sky),
      ryeongFunction.um_heuisin_gisin(ryeong.dang_ryeong, useTodayPillar.d_sky),
    ];
    let geuk_heuisin_gisin = [
      ryeongFunction.geuk_heuisin_gisin(
        ryeong.dang_ryeong,
        useTodayPillar.y_sky
      ),
      ryeongFunction.geuk_heuisin_gisin(
        ryeong.dang_ryeong,
        useTodayPillar.m_sky
      ),
      ryeongFunction.geuk_heuisin_gisin(
        ryeong.dang_ryeong,
        useTodayPillar.d_sky
      ),
    ];
    let um_gisin = [
      ryeongFunction.um_gisin(ryeong.dang_ryeong, useTodayPillar.y_sky),
      ryeongFunction.um_gisin(ryeong.dang_ryeong, useTodayPillar.m_sky),
      ryeongFunction.um_gisin(ryeong.dang_ryeong, useTodayPillar.d_sky),
    ];
    let geuk_gisin = [
      ryeongFunction.geuk_gisin(ryeong.dang_ryeong, useTodayPillar.y_sky),
      ryeongFunction.geuk_gisin(ryeong.dang_ryeong, useTodayPillar.m_sky),
      ryeongFunction.geuk_gisin(ryeong.dang_ryeong, useTodayPillar.d_sky),
    ];
    useTodayRyeong = {
      heuisin: getYNP(heuisin),
      junghwa: getYNP(junghwa),
      junghwa_gisin: getYNP(junghwa_gisin),
      jisok: getYNP(jisok),
      jisok_gisin: getYNP(jisok_gisin),
      hwakjang: getYNP(hwakjang),
      hwakjang_gisin: getYNP(hwakjang_gisin),
      um_heuisin_gisin: getYNP(um_heuisin_gisin),
      geuk_heuisin_gisin: getYNP(geuk_heuisin_gisin),
      um_gisin: getYNP(um_gisin),
      geuk_gisin: getYNP(geuk_gisin),
    };

    /* myManse.ryeong = {
      yongsin: useRyeong.yongsin,
      saryeong: ryeong.sa_ryeong,
    };*/
    myManse.ryeong = useTodayRyeong;
    resolve(ryeong);
  }).catch((error) => {
    console.log(error);
    return error;
});
};
function getYNP(obj) {
  let result;
  let exist = [obj[0].exist, obj[1].exist, obj[2].exist];
  let name = ["y_sky", "m_sky", "d_sky"];
  let jjangproperty = [" ", " ", " "];
  let objUse = [obj[0].possible, obj[1].possible, obj[2].possible];
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
module.exports = ryeongFunc;
