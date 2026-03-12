var interface = {};
//상생상극함수

//아직 아무데도 안쓰임
const walNo = require('./seunWalNo/walNo');
interface.interface = function () {
  return new Promise((resolve) => {
    let walun = walNo.walNo();
    myManseInterF.info = myManse.info;
    myManseInterF.Solar = useSolar;
    myManseInterF.Lunar = useLunar;
    myManseInterF.julib = myManse.julib;
    myManseInterF.julibGanji = myManse.julibGanji;
    myManseInterF.junggi = myManse.junggi;
    myManseInterF.junggiGanji = myManse.junggiGanji;
    myManseInterF.pillar = myManse.pillar;
    myManseInterF.umYangOHang = myManse.umYangOHang;
    myManseInterF.yukSin = myManse.yukSin;
    myManseInterF.ryeong = {
      yongsin: myManse.ryeong.yongsin,
      saryeong: myManse.ryeong.saryeong,
    };
    myManseInterF.Gyouk = myManse.Gyouk;
    myManseInterF.deunseun = {
      deun: {
        dus: deunsu(),
        deun: useDeunSeun.deun,
      },
      seun: walun,
    };
    resolve('');
  }).catch((error) => {
    console.log(error);
    return error;
});
};

function deunsu() {
  let result;
  result = {
    one: 0 + Number(useDeunSeun.dus),
    two: 10 + Number(useDeunSeun.dus),
    three: 20 + Number(useDeunSeun.dus),
    four: 30 + Number(useDeunSeun.dus),
    five: 40 + Number(useDeunSeun.dus),
    six: 50 + Number(useDeunSeun.dus),
    seven: 60 + Number(useDeunSeun.dus),
    eight: 70 + Number(useDeunSeun.dus),
    nine: 80 + Number(useDeunSeun.dus),
    ten: 90 + Number(useDeunSeun.dus),
  };
  return result;
}
module.exports = interface;
