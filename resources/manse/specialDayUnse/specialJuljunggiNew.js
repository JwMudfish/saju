var juljunggi = {};
const julgiFile = require('../../julgi/julgi.json')
var moment = require("moment");
juljunggi.juljunggi = function () {
  return new Promise((resolve) => {
    let julibMonth = Number(useSpecialDate.month);
    let julibYear = Number(useSpecialDate.year);
    let julibNextMonth = Number(useSpecialDate.month) + 1;
    let julibNextYear = Number(useSpecialDate.year);
    let julibBeforeMonth = Number(useSpecialDate.month) - 1;
    let julibBeforeYear = Number(useSpecialDate.year);

    if (julibNextMonth === 13) {
      julibNextMonth = 1;
      julibNextYear = julibNextYear + 1;
    }
    if (julibBeforeMonth === 0) {
      julibBeforeMonth = 12;
      julibBeforeYear = julibBeforeYear - 1;
    }
    if (julibMonth < 10) {
      julibMonth = "0" + String(julibMonth);
    }
    if (julibNextMonth < 10) {
      julibNextMonth = "0" + String(julibNextMonth);
    }
    if (julibBeforeMonth < 10) {
      julibBeforeMonth = "0" + String(julibBeforeMonth);
    }
    const getJulGi = julgiFile.julgi.filter(obj => {
      let result = false
      if (String(obj.tm_solar).includes(julibYear + "-" + julibMonth) === true) {
        result = true
      }
      else if (String(obj.tm_solar).includes(julibNextYear + "-" + julibNextMonth) === true) {
        result = true
      }
      else if (String(obj.tm_solar).includes(julibBeforeYear + "-" + julibBeforeMonth) === true) {
        result = true
      }

      return result;
    });
    getJulGi.sort((function (a, b) {
      return moment(a.tm_solar)
        .isBefore(b.tm_solar) ? -1 : 1;
    }))

    useJulib.todayBeforeJulib = getJulGi[0].tm_solar;
    useJulib.todayBeforeJunggi = getJulGi[1].tm_solar;
    useJulib.todayBeforeJulibGanji = getJulGi[0].ganji;
    useJulib.todayBeforeJunggiGanji = getJulGi[1].ganji;
    useJulib.todayJulib = getJulGi[2].tm_solar;
    useJulib.todayJunggi = getJulGi[3].tm_solar;
    useJulib.todayJulibGanji = getJulGi[2].ganji;
    useJulib.todayNextJulib = getJulGi[3].ganji;
    useJulib.todayNextJulib = getJulGi[4].tm_solar;
    useJulib.todayNextJunggi = getJulGi[5].tm_solar;
    useJulib.todayNextJulibGanji = getJulGi[4].ganji;
    useJulib.todayNextJunggiGanji = getJulGi[5].ganji;
    resolve(juljunggi);
  }).catch((error) => {
    console.log(error);
    return error;
});
};
module.exports = juljunggi;
