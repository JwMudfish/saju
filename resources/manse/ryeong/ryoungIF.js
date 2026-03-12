var ryeongFunc = {};
//음양오행  객체에 담고 한번에 myManse에 넣어버리기
let ryeong = {};
const ryeongFunction = require('./ryeong');
const ryeongWord = require('../../manseUtil/ryeong/ryeongWord');
const ryeongYuksin = require('../../manseUtil/ryeong/getRyeongYuksin');
const ryeongUtil = require('../../manseUtil/ryeong/ryeongUtil');
ryeongFunc.ryeong = function () {
  return new Promise((resolve) => {
    let ryeong = ryeongFunction.ryeong();
    let heuisin = {}
    heuisin = ryeongUtil.makeElementArray(ryeongFunction.heuisin, ryeongWord.hisinCheck(ryeong.dang_ryeong), ryeongYuksin.heuisin(ryeong.dang_ryeong))
    junghwa = ryeongUtil.makeElementArray(ryeongFunction.junghwa, ryeongWord.junghwaCheck(ryeong.dang_ryeong), ryeongYuksin.junghwa(ryeong.dang_ryeong))
    junghwa_gisin = ryeongUtil.makeElementArray(ryeongFunction.junghwa_gisin, ryeongWord.junghwaGisinCheck(ryeong.dang_ryeong), ryeongYuksin.junghwa_gisin(ryeong.dang_ryeong))
    jisok = ryeongUtil.makeElementArray(ryeongFunction.jisok, ryeongWord.jisokCheck(ryeong.dang_ryeong), ryeongYuksin.jisok(ryeong.dang_ryeong))
    jisok_gisin = ryeongUtil.makeElementArray(ryeongFunction.jisok_gisin, ryeongWord.jisok_gisinCheck(ryeong.dang_ryeong), ryeongYuksin.jisok_gisin(ryeong.dang_ryeong))
    hwakjang = ryeongUtil.makeElementArray(ryeongFunction.hwakjang, ryeongWord.hwakjangCheck(ryeong.dang_ryeong), ryeongYuksin.hwakjang(ryeong.dang_ryeong))
    hwakjang_gisin = ryeongUtil.makeElementArray(ryeongFunction.hwakjang_gisin, ryeongWord.hwakjang_gisinCheck(ryeong.dang_ryeong), ryeongYuksin.hwakjang_gisin(ryeong.dang_ryeong))
    um_heuisin_gisin = ryeongUtil.makeElementArray(ryeongFunction.um_heuisin_gisin, ryeongWord.um_heuisin_gisinCheck(ryeong.dang_ryeong), ryeongYuksin.um_heuisin_gisin(ryeong.dang_ryeong))
    geuk_heuisin_gisin = ryeongUtil.makeElementArray(ryeongFunction.geuk_heuisin_gisin, ryeongWord.geuk_heuisin_gisinCheck(ryeong.dang_ryeong), ryeongYuksin.geuk_heuisin_gisin(ryeong.dang_ryeong))
    um_gisin = ryeongUtil.makeElementArray(ryeongFunction.um_gisin, ryeongWord.um_gisinCheck(ryeong.dang_ryeong), ryeongYuksin.um_gisin(ryeong.dang_ryeong))
    geuk_gisin = ryeongUtil.makeElementArray(ryeongFunction.geuk_gisin, ryeongWord.geuk_gisinCheck(ryeong.dang_ryeong), ryeongYuksin.geuk_gisin(ryeong.dang_ryeong))

    useRyeong = {
      yongsin: ryeong.dang_ryeong,
      saryeong: ryeong.sa_ryeong,
      heuisin: ryeongUtil.getYNP(heuisin),
      junghwa: ryeongUtil.getYNP(junghwa),
      junghwa_gisin: ryeongUtil.getYNP(junghwa_gisin),
      jisok: ryeongUtil.getYNP(jisok),
      jisok_gisin: ryeongUtil.getYNP(jisok_gisin),
      hwakjang: ryeongUtil.getYNP(hwakjang),
      hwakjang_gisin: ryeongUtil.getYNP(hwakjang_gisin),
      um_heuisin_gisin: ryeongUtil.getYNP(um_heuisin_gisin),
      geuk_heuisin_gisin: ryeongUtil.getYNP(geuk_heuisin_gisin),
      um_gisin: ryeongUtil.getYNP(um_gisin),
      geuk_gisin: ryeongUtil.getYNP(geuk_gisin),
    };

    myManse.ryeong = useRyeong;
    resolve(ryeong);
  }).catch((error) => {
    console.log(error);
    return error;
});
};
module.exports = ryeongFunc;
