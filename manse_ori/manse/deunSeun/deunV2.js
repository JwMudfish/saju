var deun = {};
var moment = require("moment");
let monthPillar = require("../pillar/monthPillar/monthPillar");
let yearPillar = require("../pillar/yearPillar/yearPillar");
const yuksinFunc = require('../yuksin/getYukSin');
const umYangFunc = require('../umYangOHang/umYang');
const oHangFunc = require('../umYangOHang/oHang');
const sssg = require('../yuksin/getSangSengSangGuk');
const korToKan = require('../../manseUtil/korToHan')
//대운방향
deun.deunBanghyang = function () {
  let result = "";
  if (myManse.info.gender === "M" && useUmYangOHang.y_sky.umYang === "양") {
    result = "순행";
  } else if (
    myManse.info.gender === "M" &&
    useUmYangOHang.y_sky.umYang === "음"
  ) {
    result = "역행";
  } else if (
    myManse.info.gender === "F" &&
    useUmYangOHang.y_sky.umYang === "양"
  ) {
    result = "역행";
  } else if (
    myManse.info.gender === "F" &&
    useUmYangOHang.y_sky.umYang === "음"
  ) {
    result = "순행";
  }

  return result;
};

//대운수
deun.deunSu = function (bh) {
  let result = "";
  const myBirth = moment(
    useDate.year +
    "-" +
    useDate.month +
    "-" +
    useDate.day +
    " " +
    useDate.hour +
    ":" +
    useDate.minute +
    ":00",
    "YYYY-MM-DD HH:mm:ss "
  );
  if (bh === "순행") {
    let deunTime = Math.round(
      moment
        .duration(
          moment(useNextJulib, "YYYY-MM-DD HH:mm:ss ").diff(
            moment(myBirth, "YYYY-MM-DD HH:mm:ss ")
          )
        )
        .asMinutes()
    );
    let temp = deunTime / 4320;
    if (1 > temp) {
      result = 1;
    } else {
      result = Math.round(temp);
    }
  } else if (bh === "역행") {
    let deunTime = Math.round(
      moment
        .duration(
          moment(myBirth, "YYYY-MM-DD HH:mm:ss ").diff(
            moment(myManse.julib, "YYYY-MM-DD HH:mm:ss ")
          )
        )
        .asMinutes()
    );
    let temp = deunTime / 4320;
    if (1 > temp) {
      result = 1;
    } else {
      result = Math.round(temp);
    }
  }

  return result;
};

//대운
deun.deun = function (bh) {
  let result = [];
  //  let initYear=usePillar.year+(deunSu-1);
  let initMonth = useDate.month;
  let initYear = useDate.year;
  let month = initMonth;
  let yearSky = usePillar.y_sky;
  const myBirth = moment(
    useDate.year +
    "-" +
    useDate.month +
    "-" +
    useDate.day +
    " " +
    useDate.hour +
    ":" +
    useDate.minute +
    ":00",
    "YYYY-MM-DD HH:mm:ss "
  );
  if (myBirth.diff(moment(useJulib.julib), "minutes") <= 0) {
    month = month - 1
    if (month === 0) {
      month = 12;
    }
  }

  if (bh === "순행") {
    if (initMonth === 1) {
      initYear = initYear - 1
    }
    else if (initMonth === 2 &&
      myBirth.diff(moment(useJulib.julib), "minutes") <= 0) {
      initYear = initYear - 1
    }
    for (let i = 0; i < 10; i++) {
      month = month + 1;
      if (month === 13) {
        month = 1;
      } else if (month === 2) {
        yearSky = yearPillar.getYear(Number(initYear + 1))[0];
      }
      result.push(monthPillar.getMonth(month, yearSky));
    }
  } else if (bh === "역행") {
    for (let i = 0; i < 10; i++) {
      month = month - 1;
      if (month === 1) {
        yearSky = yearPillar.getYear(Number(initYear - 1))[0];
      }
      if (month === 0) {
        month = 12;
      }
      result.push(monthPillar.getMonth(month, yearSky));

    }
  }

  return result;
};

//세운
deun.seun = function (deunsu) {
  let result = {};
  let year = useDate.year;
  if (useDate.month === 1) {
    year = year - 1
  }
  result.sky= [
    yearPillar.getYear(Number(year + deunsu - 1  + 0))[0],
    yearPillar.getYear(Number(year + deunsu - 1  + 1))[0],
    yearPillar.getYear(Number(year + deunsu - 1  + 2))[0],
    yearPillar.getYear(Number(year + deunsu - 1  + 3))[0],
    yearPillar.getYear(Number(year + deunsu - 1  + 4))[0],
    yearPillar.getYear(Number(year + deunsu - 1  + 5))[0],
    yearPillar.getYear(Number(year + deunsu - 1  + 6))[0],
    yearPillar.getYear(Number(year + deunsu - 1  + 7))[0],
    yearPillar.getYear(Number(year + deunsu - 1  + 8))[0],
    yearPillar.getYear(Number(year + deunsu - 1  + 9))[0]]
    result.land= [
    yearPillar.getYear(Number(year + deunsu - 1  + 0))[1],
    yearPillar.getYear(Number(year + deunsu - 1  + 1))[1],
    yearPillar.getYear(Number(year + deunsu - 1  + 2))[1],
    yearPillar.getYear(Number(year + deunsu - 1  + 3))[1],
    yearPillar.getYear(Number(year + deunsu - 1  + 4))[1],
    yearPillar.getYear(Number(year + deunsu - 1  + 5))[1],
    yearPillar.getYear(Number(year + deunsu - 1  + 6))[1],
    yearPillar.getYear(Number(year + deunsu - 1  + 7))[1],
    yearPillar.getYear(Number(year + deunsu - 1  + 8))[1],
    yearPillar.getYear(Number(year + deunsu - 1  + 9))[1],
    yearPillar.getYear(Number(year + deunsu - 1  + 10))[1],
    yearPillar.getYear(Number(year + deunsu - 1  + 11))[1]]
    result.skyYuksin= [
    getYuksin(result.sky[0], 1),
    getYuksin(result.sky[1], 1),
    getYuksin(result.sky[2], 1),
    getYuksin(result.sky[3], 1),
    getYuksin(result.sky[4], 1),
    getYuksin(result.sky[5], 1),
    getYuksin(result.sky[6], 1),
    getYuksin(result.sky[7], 1),
    getYuksin(result.sky[8], 1),
    getYuksin(result.sky[9], 1),
  ]
  result.landYuksin= [
  getYuksin(result.land[0], 2),
  getYuksin(result.land[1], 2),
  getYuksin(result.land[2], 2),
  getYuksin(result.land[3], 2),
  getYuksin(result.land[4], 2),
  getYuksin(result.land[5], 2),
  getYuksin(result.land[6], 2),
  getYuksin(result.land[7], 2),
  getYuksin(result.land[8], 2),
  getYuksin(result.land[9], 2),
  getYuksin(result.land[10], 2),
  getYuksin(result.land[11], 2),
]

result.year= [
  Number(year + deunsu - 1  + 0),
  Number(year + deunsu - 1  + 1),
  Number(year + deunsu - 1  + 2),
  Number(year + deunsu - 1  + 3),
  Number(year + deunsu - 1  + 4),
  Number(year + deunsu - 1  + 5),
  Number(year + deunsu - 1  + 6),
  Number(year + deunsu - 1  + 7),
  Number(year + deunsu - 1  + 8),
  Number(year + deunsu - 1  + 9),
]

let skyTemp = []
for (let i=0; i< result.sky.length; i++){
  skyTemp.push(korToKan.changeChunGan(result.sky[i]))
}
let landTemp = []
for (let i=0; i< result.land.length; i++){
  landTemp.push(korToKan.changeJIJI(result.land[i]))
}
result.sky=skyTemp
result.land=landTemp
  return result;
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

//월운
function walUnFunc(yearP, year) {
  let y = yearP;
  let jan = yearPillar.getYear(Number(year - 1));

  let result = {
    jan: {
      word: monthPillar.getMonth(1, jan[0])
    },
    feb: { word: monthPillar.getMonth(2, y[0]) },
    mar: { word: monthPillar.getMonth(3, y[0]) },
    apr: { word: monthPillar.getMonth(4, y[0]) },
    may: { word: monthPillar.getMonth(5, y[0]) },
    jun: { word: monthPillar.getMonth(6, y[0]) },
    jul: { word: monthPillar.getMonth(7, y[0]) },
    aug: { word: monthPillar.getMonth(8, y[0]) },
    sep: { word: monthPillar.getMonth(9, y[0]) },
    oct: { word: monthPillar.getMonth(10, y[0]) },
    nov: { word: monthPillar.getMonth(11, y[0]) },
    dec: { word: monthPillar.getMonth(12, y[0]) },
    nextJan: { word: monthPillar.getMonth(1, y[0]) },
  };
  result.jan.yuksin = [getYuksin(result.jan.word[0], 1), getYuksin(result.jan.word[1], 2)]
  result.feb.yuksin = [getYuksin(result.feb.word[0], 1), getYuksin(result.feb.word[1], 2)]
  result.mar.yuksin = [getYuksin(result.mar.word[0], 1), getYuksin(result.mar.word[1], 2)]
  result.apr.yuksin = [getYuksin(result.apr.word[0], 1), getYuksin(result.apr.word[1], 2)]
  result.may.yuksin = [getYuksin(result.may.word[0], 1), getYuksin(result.may.word[1], 2)]
  result.jun.yuksin = [getYuksin(result.jun.word[0], 1), getYuksin(result.jun.word[1], 2)]
  result.jul.yuksin = [getYuksin(result.jul.word[0], 1), getYuksin(result.jul.word[1], 2)]
  result.aug.yuksin = [getYuksin(result.aug.word[0], 1), getYuksin(result.aug.word[1], 2)]
  result.sep.yuksin = [getYuksin(result.sep.word[0], 1), getYuksin(result.sep.word[1], 2)]
  result.oct.yuksin = [getYuksin(result.oct.word[0], 1), getYuksin(result.oct.word[1], 2)]
  result.nov.yuksin = [getYuksin(result.nov.word[0], 1), getYuksin(result.nov.word[1], 2)]
  result.dec.yuksin = [getYuksin(result.dec.word[0], 1), getYuksin(result.dec.word[1], 2)]
  result.nextJan.yuksin = [getYuksin(result.nextJan.word[0], 1), getYuksin(result.nextJan.word[1], 2)]
  result.jan.ohang = [getOHang(result.jan.word[0], 1), getOHang(result.jan.word[1], 2)]
  result.feb.ohang = [getOHang(result.feb.word[0], 1), getOHang(result.feb.word[1], 2)]
  result.mar.ohang = [getOHang(result.mar.word[0], 1), getOHang(result.mar.word[1], 2)]
  result.apr.ohang = [getOHang(result.apr.word[0], 1), getOHang(result.apr.word[1], 2)]
  result.may.ohang = [getOHang(result.may.word[0], 1), getOHang(result.may.word[1], 2)]
  result.jun.ohang = [getOHang(result.jun.word[0], 1), getOHang(result.jun.word[1], 2)]
  result.jul.ohang = [getOHang(result.jul.word[0], 1), getOHang(result.jul.word[1], 2)]
  result.aug.ohang = [getOHang(result.aug.word[0], 1), getOHang(result.aug.word[1], 2)]
  result.sep.ohang = [getOHang(result.sep.word[0], 1), getOHang(result.sep.word[1], 2)]
  result.oct.ohang = [getOHang(result.oct.word[0], 1), getOHang(result.oct.word[1], 2)]
  result.nov.ohang = [getOHang(result.nov.word[0], 1), getOHang(result.nov.word[1], 2)]
  result.dec.ohang = [getOHang(result.dec.word[0], 1), getOHang(result.dec.word[1], 2)]
  result.nextJan.ohang = [getOHang(result.nextJan.word[0], 1), getOHang(result.nextJan.word[1], 2)]
  return result;
}

//월운
deun.walUn = function (yearP, year) {
  let y = yearP;
  let jan = yearPillar.getYear(Number(year - 1));

  let result = {
    jan: monthPillar.getMonth(1, jan[0]),
    feb: monthPillar.getMonth(2, y[0]),
    mar: monthPillar.getMonth(3, y[0]),
    apr: monthPillar.getMonth(4, y[0]),
    may: monthPillar.getMonth(5, y[0]),
    jun: monthPillar.getMonth(6, y[0]),
    jul: monthPillar.getMonth(7, y[0]),
    aug: monthPillar.getMonth(8, y[0]),
    sep: monthPillar.getMonth(9, y[0]),
    oct: monthPillar.getMonth(10, y[0]),
    nov: monthPillar.getMonth(11, y[0]),
    dec: monthPillar.getMonth(12, y[0]),
    nextJan: monthPillar.getMonth(1, y[0]),
  };

  return result;
};

module.exports = deun;
