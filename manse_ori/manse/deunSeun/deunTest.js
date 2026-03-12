var deun = {};

const deunFunc = require("./deun");
const yuksinFunc = require('../yuksin/getYukSin');
const umYangFunc = require('../umYangOHang/umYang');
const oHangFunc = require('../umYangOHang/oHang');
const sssg = require('../yuksin/getSangSengSangGuk');
deun.deun = function () {
  return new Promise((resolve) => {
    let bh = deunFunc.deunBanghyang();
    let dus = deunFunc.deunSu(bh);
    let deunArray = deunFunc.deun(bh);
    let deunYuksinArray = deunArray.map(item => [getYuksin(item[0], 1), getYuksin(item[1], 2)])
    let deunOhangArray = deunArray.map(item => [getOHang(item[0], 1), getOHang(item[1], 2)])
    let seun = deunFunc.seun(dus);

    useDeunSeun = {
      dus: dus,
      banghang: bh,
      deun: {
        one: deunArray[0],
        two: deunArray[1],
        three: deunArray[2],
        four: deunArray[3],
        five: deunArray[4],
        six: deunArray[5],
        seven: deunArray[6],
        eight: deunArray[7],
        nine: deunArray[8],
        ten: deunArray[9],
      },
      deunYuksin: {
        one: deunYuksinArray[0],
        two: deunYuksinArray[1],
        three: deunYuksinArray[2],
        four: deunYuksinArray[3],
        five: deunYuksinArray[4],
        six: deunYuksinArray[5],
        seven: deunYuksinArray[6],
        eight: deunYuksinArray[7],
        nine: deunYuksinArray[8],
        ten: deunYuksinArray[9],
      },
      deunOhang: {
        one: deunOhangArray[0],
        two: deunOhangArray[1],
        three: deunOhangArray[2],
        four: deunOhangArray[3],
        five: deunOhangArray[4],
        six: deunOhangArray[5],
        seven: deunOhangArray[6],
        eight: deunOhangArray[7],
        nine: deunOhangArray[8],
        ten: deunOhangArray[9],
      },
      seun: {
        one: seun[0],
        two: seun[1],
        three: seun[2],
        four: seun[3],
        five: seun[4],
        six: seun[5],
        seven: seun[6],
        eight: seun[7],
        nine: seun[8],
        ten: seun[9],
      },
    };
    resolve("");
  }).catch((error) => {
    console.log(error);
    return error;
});
};

const getYuksin = (word, num) => {
  let umYangOHang = {
    umYang: umYangFunc.umYang(word, num),
    oHang: oHangFunc.oHang(word),
  };

  let yuksin = yuksinFunc.yuksin(
    sssg.sssg(useUmYangOHang.d_sky.oHang, umYangOHang.oHang),
    umYangOHang.umYang
  );
  return yuksin;
}

const getOHang = (word, num) => {
  return oHangFunc.oHang(word);
}
module.exports = deun;
