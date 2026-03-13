var deun = {};
var moment = require("moment");
let monthPillar = require("../pillar/monthPillar/monthPillar");
let yearPillar = require("../pillar/yearPillar/yearPillar");
const yuksinFunc = require('../yuksin/getYukSin');
const umYangFunc = require('../umYangOHang/umYang');
const oHangFunc = require('../umYangOHang/oHang');
const sssg = require('../yuksin/getSangSengSangGuk');
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
  let result = [];
  let year = useDate.year;
  /*let compareJulibTrueFalse = false;
  let compareJulib;
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
  //달은 넘어갔는데 절입은 안넘어갔을경우를 비교해야할경우는 true
  //아님 false로 넘겨서 아예비교를 안하게함
  if (myBirth.diff(moment(useJulib.julib), "minutes") <= 0) {
    //달넘어감 절입을 안넘겼을경우
    compareJulibTrueFalse = true;
    compareJulib = moment(useJulib.julib, "YYYY-MM-DD HH:mm:ss ");
  } else {
    compareJulib = moment(useJulib.nextJulib, "YYYY-MM-DD HH:mm:ss ");
  }
  if (
    Number(useDate.month) === 1 ||
    (compareJulibTrueFalse === true &&
      Number(useDate.month) === 2 &&
      myBirth.diff(moment(compareJulib), "minutes") < 0)
  ) {
    year = year - 1;
  }*/
  if (useDate.month === 1) {
    year = year - 1
  }
  for (let i = 0; i < 10; i++) {
    let count = i * 10;

    let a = {
      one: {
        word: yearPillar.getYear(Number(year + deunsu - 1 + count + 0)),
        year: Number(year) + Number(deunsu - 1) + Number(count + 0),
        age: Number(year) + Number(deunsu - 1) + Number(count + 0)-useDate.year+1,
        walUn: walUnFunc(
          yearPillar.getYear(Number(year + deunsu - 1 + count + 0)),
          year + deunsu - 1 + count + 0
        ),
      },
      two: {
        word: yearPillar.getYear(Number(year + deunsu - 1 + count + 1)),
        year: Number(year) + Number(deunsu - 1) + Number(count + 1),
        age: Number(year) + Number(deunsu - 1) + Number(count + 1)-useDate.year+1,
        walUn: walUnFunc(
          yearPillar.getYear(Number(year + deunsu - 1 + count + 1)),
          year + deunsu - 1 + count + 1
        ),
      },
      three: {
        word: yearPillar.getYear(Number(year + deunsu - 1 + count + 2)),
        year: Number(year) + Number(deunsu - 1) + Number(count + 2),
        age: Number(year) + Number(deunsu - 1) + Number(count + 2)-useDate.year+1,
        walUn: walUnFunc(
          yearPillar.getYear(Number(year + deunsu - 1 + count + 2)),
          year + deunsu - 1 + count + 2
        ),
      },
      four: {
        word: yearPillar.getYear(Number(year + deunsu - 1 + count + 3)),
        year: Number(year) + Number(deunsu - 1) + Number(count + 3),
        age: Number(year) + Number(deunsu - 1) + Number(count + 3)-useDate.year+1,
        walUn: walUnFunc(
          yearPillar.getYear(Number(year + deunsu - 1 + count + 3)),
          year + deunsu - 1 + count + 3
        ),
      },
      five: {
        word: yearPillar.getYear(Number(year + deunsu - 1 + count + 4)),
        year: Number(year) + Number(deunsu - 1) + Number(count + 4),
        age: Number(year) + Number(deunsu - 1) + Number(count + 4)-useDate.year+1,
        walUn: walUnFunc(
          yearPillar.getYear(Number(year + deunsu - 1 + count + 4)),
          year + deunsu - 1 + count + 4
        ),
      },
      six: {
        word: yearPillar.getYear(Number(year + deunsu - 1 + count + 5)),
        year: Number(year) + Number(deunsu - 1) + Number(count + 5),
        age: Number(year) + Number(deunsu - 1) + Number(count + 5)-useDate.year+1,
        walUn: walUnFunc(
          yearPillar.getYear(Number(year + deunsu - 1 + count + 5)),
          year + deunsu - 1 + count + 5
        ),
      },
      seven: {
        word: yearPillar.getYear(Number(year + deunsu - 1 + count + 6)),
        year: Number(year) + Number(deunsu - 1) + Number(count + 6),
        age: Number(year) + Number(deunsu - 1) + Number(count + 6)-useDate.year+1,
        walUn: walUnFunc(
          yearPillar.getYear(Number(year + deunsu - 1 + count + 6)),
          year + deunsu - 1 + count + 6
        ),
      },
      eight: {
        word: yearPillar.getYear(Number(year + deunsu - 1 + count + 7)),
        year: Number(year) + Number(deunsu - 1) + Number(count + 7),
        age: Number(year) + Number(deunsu - 1) + Number(count + 7)-useDate.year+1,
        walUn: walUnFunc(
          yearPillar.getYear(Number(year + deunsu - 1 + count + 7)),
          year + deunsu - 1 + count + 7
        ),
      },
      nine: {
        word: yearPillar.getYear(Number(year + deunsu - 1 + count + 8)),
        year: Number(year) + Number(deunsu - 1) + Number(count + 8),
        age: Number(year) + Number(deunsu - 1) + Number(count + 8)-useDate.year+1,
        walUn: walUnFunc(
          yearPillar.getYear(Number(year + deunsu - 1 + count + 8)),
          year + deunsu - 1 + count + 8
        ),
      },
      ten: {
        word: yearPillar.getYear(Number(year + deunsu - 1 + count + 9)),
        year: Number(year) + Number(deunsu - 1) + Number(count + 9),
        age: Number(year) + Number(deunsu - 1) + Number(count + 9)-useDate.year+1,
        walUn: walUnFunc(
          yearPillar.getYear(Number(year + deunsu - 1 + count + 9)),
          year + deunsu - 1 + count + 9
        ),
      },
    };

    a.one.yuksin = [getYuksin(a.one.word[0], 1), getYuksin(a.one.word[1], 2)]
    a.two.yuksin = [getYuksin(a.two.word[0], 1), getYuksin(a.two.word[1], 2)]
    a.three.yuksin = [getYuksin(a.three.word[0], 1), getYuksin(a.three.word[1], 2)]
    a.four.yuksin = [getYuksin(a.four.word[0], 1), getYuksin(a.four.word[1], 2)]
    a.five.yuksin = [getYuksin(a.five.word[0], 1), getYuksin(a.five.word[1], 2)]
    a.six.yuksin = [getYuksin(a.six.word[0], 1), getYuksin(a.six.word[1], 2)]
    a.seven.yuksin = [getYuksin(a.seven.word[0], 1), getYuksin(a.seven.word[1], 2)]
    a.eight.yuksin = [getYuksin(a.eight.word[0], 1), getYuksin(a.eight.word[1], 2)]
    a.nine.yuksin = [getYuksin(a.nine.word[0], 1), getYuksin(a.nine.word[1], 2)]
    a.ten.yuksin = [getYuksin(a.ten.word[0], 1), getYuksin(a.ten.word[1], 2)]
    a.one.ohang = [getOHang(a.one.word[0], 1), getOHang(a.one.word[1], 2)]
    a.two.ohang = [getOHang(a.two.word[0], 1), getOHang(a.two.word[1], 2)]
    a.three.ohang = [getOHang(a.three.word[0], 1), getOHang(a.three.word[1], 2)]
    a.four.ohang = [getOHang(a.four.word[0], 1), getOHang(a.four.word[1], 2)]
    a.five.ohang = [getOHang(a.five.word[0], 1), getOHang(a.five.word[1], 2)]
    a.six.ohang = [getOHang(a.six.word[0], 1), getOHang(a.six.word[1], 2)]
    a.seven.ohang = [getOHang(a.seven.word[0], 1), getOHang(a.seven.word[1], 2)]
    a.eight.ohang = [getOHang(a.eight.word[0], 1), getOHang(a.eight.word[1], 2)]
    a.nine.ohang = [getOHang(a.nine.word[0], 1), getOHang(a.nine.word[1], 2)]
    a.ten.ohang = [getOHang(a.ten.word[0], 1), getOHang(a.ten.word[1], 2)]
    result.push(a);
  }
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
