var deun = {};

const deunFunc = require("./deunV2");
const yuksinFunc = require('../yuksin/getYukSin');
const umYangFunc = require('../umYangOHang/umYang');
const oHangFunc = require('../umYangOHang/oHang');
const sssg = require('../yuksin/getSangSengSangGuk');
const korToKan = require('../../manseUtil/korToHan')
deun.deun = function () {
  return new Promise((resolve) => {
    let bh = deunFunc.deunBanghyang();
    let dus = deunFunc.deunSu(bh);
    let deunArray = deunFunc.deun(bh);
    let deunYuksinArray = deunArray.map(item => [getYuksin(item[0], 1), getYuksin(item[1], 2)])
    let seun = deunFunc.seun(dus);
    useDeunSeunV2 = {
      dus: dus,
      deun: {
        one: korToKan.changeChunGan(deunArray[0][0])+korToKan.changeJIJI(deunArray[0][1]),
        two:  korToKan.changeChunGan(deunArray[1][0])+korToKan.changeJIJI(deunArray[1][1]),
        three:  korToKan.changeChunGan(deunArray[2][0])+korToKan.changeJIJI(deunArray[2][1]),
        four:  korToKan.changeChunGan(deunArray[3][0])+korToKan.changeJIJI(deunArray[3][1]),
        five:  korToKan.changeChunGan(deunArray[4][0])+korToKan.changeJIJI(deunArray[4][1]),
        six:  korToKan.changeChunGan(deunArray[5][0])+korToKan.changeJIJI(deunArray[5][1]),
        seven:  korToKan.changeChunGan(deunArray[6][0])+korToKan.changeJIJI(deunArray[6][1]),
        eight:  korToKan.changeChunGan(deunArray[7][0])+korToKan.changeJIJI(deunArray[7][1]),
        nine:  korToKan.changeChunGan(deunArray[8][0])+korToKan.changeJIJI(deunArray[8][1]),
        ten:  korToKan.changeChunGan(deunArray[9][0])+korToKan.changeJIJI(deunArray[9][1]),
      },
      /* deunYuksin: {
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
      }, */
      yuksinList:  [
        {
            code: '甲',
            value: getYuksin('갑',1)
        },
        {
            code: '乙',
            value: getYuksin('을',1)
        },
        {
          code: '寅',
          value: getYuksin('인',2)
      },
      {
        code: '卯',
        value: getYuksin('묘',2)
    },
        {
            code: '丙',
            value: getYuksin('병',1)
        },
        {
            code: '丁',
            value: getYuksin('정',1)
        },
        {
            code: '巳',
            value: getYuksin('사',2)
        },
        {
            code: '午',
            value: getYuksin('오',2)
        },
        {
            code: '戊',
            value: getYuksin('무',1)
        },
        {
            code: '己',
            value: getYuksin('기',1)
        },
        {
            code: '丑',
            value: getYuksin('축',2)
        },
        {
            code: '辰',
            value: getYuksin('진',2)
        },
        {
            code: '未',
            value: getYuksin('미',2)
        },
        {
            code: '戌',
            value: getYuksin('술',2)
        },
        {
            code: '庚',
            value: getYuksin('경',1)
        },
        {
            code: '辛',
            value: getYuksin('신',1)
        },
        {
            code: '申',
            value: getYuksin('신',2)
        },
        {
            code: '酉',
            value: getYuksin('유',2)
        },
        {
            code: '壬',
            value: getYuksin('임',1)
        },
        {
            code: '癸',
            value: getYuksin('계',1)
        },
        {
            code: '亥',
            value: getYuksin('해',2)
        },
        {
            code: '子',
            value: getYuksin('자',2)
        },
    ],
      seun: seun
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
