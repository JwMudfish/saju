var pillarFunc = {};
const Julgi = require("../../../schemas/julgi");
var moment = require("moment");
//pillar  객체에 담고 한번에 myManse에 넣어버리기
let pillar = {};
pillarFunc.pillar = function () {
  return new Promise((resolve) => {
    let resultMonth = Number(useSpecialDate.month);
    let resultTime = Number(useSpecialDate.hour);
    let resultMinute = Number(useSpecialDate.month);
    let julibMonth = Number(useSpecialDate.month);
    let julibYear = Number(useSpecialDate.year);
    let julibNextMonth = Number(useSpecialDate.month) + 1;
    let julibNextYear = Number(useSpecialDate.year);
    if (Number(useDate.gubun_time) === 1) {
      resultTime = "";
      resultMinute = "";
    }
    const myBirth = moment(
      Number(useSpecialDate.year) +
        "-" +
        Number(useSpecialDate.month) +
        "-" +
        Number(useSpecialDate.day) +
        " " +
        Number(useSpecialDate.hour) +
        ":" +
        Number(useSpecialDate.month) +
        ":00",
      "YYYY-MM-DD HH:mm:ss "
    );

    let compareJulibTrueFalse;
    let compareJulib;

    let resultYear = Number(useDate.year);
    let julgi;
    let ganji;
    let junggi;
    if (julibNextMonth === 13) {
      julibNextMonth = 1;
      julibNextYear = julibNextYear + 1;
    }
    if (julibMonth < 10) {
      julibMonth = "0" + String(julibMonth);
    }
    if (julibNextMonth < 10) {
      julibNextMonth = "0" + String(julibNextMonth);
    }
    if (resultMonth < 10) {
      resultMonth = "0" + String(resultMonth);
    }
    if (resultTime === "") {
    } else if (Number(resultTime) < 10) {
      resultTime = "0" + String(resultTime);
    }
    if (resultMinute === "") {
    }
    if (Number(resultMinute) < 10) {
      resultMinute = "0" + String(resultMinute);
    }

    //달은 넘어갔는데 절입은 안넘어갔을경우를 비교해야할경우는 true
    //아님 false로 넘겨서 아예비교를 안하게함
    if (myBirth.diff(moment(useJulib.todayJulib), "minutes") <= 0) {
      //달넘어감 절입을 안넘겼을경우
      compareJulibTrueFalse = true;
      //이건 건들ㄴㄴ
      compareJulib = moment(useJulib.todayJulib, "YYYY-MM-DD HH:mm:ss ");
      //myManse(최종본)에다가 담는다.
      myManse.julib = useJulib.todayBeforeJulib;
      myManse.ganji = useJulib.todayBeforeJunggiGanji;
      myManse.junggi = useJulib.todayBeforeJunggi;
      useNextJulib = useJulib.todayJulib;
    } else {
      //그외경우
      //이건 건들ㄴㄴ
      compareJulib = moment(useJulib.nextJulib, "YYYY-MM-DD HH:mm:ss ");
      //중기보다 작으면
      if (myBirth.diff(moment(useJulib.todayJunggi), "minutes") <= 0) {
        //myManse(최종본)에다가 담는다.
        myManse.julib = useJulib.todayJulib;
        myManse.ganji = useJulib.todayJulibGanji;
        myManse.junggi = useJulib.todayJunggi;
        useNextJulib = useJulib.todayNextJulib;
      } else {
        //myManse(최종본)에다가 담는다.
        myManse.julib = useJulib.todayJulib;
        myManse.ganji = useJulib.todayJunggiGanji;
        myManse.junggi = useJulib.todayJunggi;
        useNextJulib = useJulib.todayNextJulib;
      }
    }

    //함수들 호출
    const year = require("./yearPillar/yearPillar");
    const month = require("./monthPillar/monthPillar");
    const day = require("./dayPillar/daypillar");
    const hour = require("./hourPillar/hourPillar");

    //년주체크
    //1월과 2월의 입춘전은 year -1
    let yearPillar;
    if (
      Number(useSpecialDate.month) === 1 ||
      (compareJulibTrueFalse === true &&
        Number(useSpecialDate.month) === 2 &&
        myBirth.diff(moment(compareJulib), "minutes") < 0)
    ) {
      yearPillar = year.getYear(Number(useSpecialDate.year) - 1);
    } else {
      yearPillar = year.getYear(Number(useSpecialDate.year));
    }

    //월주체크
    // 다음달로 넘어갔는데 다음절입보다 빠르면 month-1
    let monthPillar;
    if (compareJulibTrueFalse === true) {
      if (myBirth.diff(moment(compareJulib), "minutes") < 0) {
        if (Number(resultMonth) === 1) {
          resultMonth = 13;
        }
        monthPillar = month.getMonth(resultMonth - 1, yearPillar[0]);
      }
    } else {
      monthPillar = month.getMonth(resultMonth, yearPillar[0]);
    }
    //일주체크
    const dayPillar = day.getDay(
      Number(useSpecialDate.day),
      Number(useSpecialDate.year),
      Number(useSpecialDate.month),
      resultTime,
      resultMinute,
      //  useDate.summer_time,
      //    useDate.seoul_time
      0,
      0
    );
    //시주체크
    const hourPillar = hour.getHour(
      resultTime,
      resultMinute,
      dayPillar[0],
      // useDate.summer_time,
      //     useDate.seoul_time
      0,
      0
    );

    //myManse에 넣기
    // pillar.yearPillar = yearPillar;
    pillar.y_sky = yearPillar[0];
    pillar.y_land = yearPillar[1];
    // pillar.monthPillar = monthPillar;
    pillar.m_sky = monthPillar[0];
    pillar.m_land = monthPillar[1];
    //pillar.dayPillar = dayPillar;
    pillar.d_sky = dayPillar[0];
    pillar.d_land = dayPillar[1];
    if (hourPillar === "") {
      //pillar.hourPillar = hourPillar;
      pillar.h_sky = "";
      pillar.h_land = "";
    } else {
      //pillar.hourPillar = hourPillar;
      pillar.h_sky = hourPillar[0];
      pillar.h_land = hourPillar[1];
    }

    useTodayPillar = pillar;
    resolve(pillar);
  }).catch((error) => {
    console.log(error);
    return error;
});
};
module.exports = pillarFunc;
