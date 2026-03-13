var juljunggi = {};
var moment = require("moment");
const julgiFile = require('../../julgi/julgi.json')
juljunggi.juljunggi = function () {
  return new Promise((resolve) => {
    let julibMonth = Number(useDate.month);
    let julibYear = Number(useDate.year);
    let julibNextMonth = Number(useDate.month) + 1;
    let julibNextYear = Number(useDate.year);
    let julibBeforeMonth = Number(useDate.month) - 1;
    let julibBeforeYear = Number(useDate.year);
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

    useJulib.beforeJulib = getJulGi[0].tm_solar;
    useJulib.beforeJunggi = getJulGi[1].tm_solar;
    useJulib.beforeJulibGanji = getJulGi[0].ganji;
    useJulib.beforeJunggiGanji = getJulGi[1].ganji;
    useJulib.julib = getJulGi[2].tm_solar;
    useJulib.junggi = getJulGi[3].tm_solar;
    useJulib.julibGanji = getJulGi[2].ganji;
    useJulib.junggiGanji = getJulGi[3].ganji;
    useJulib.nextJulib = getJulGi[4].tm_solar;
    useJulib.nextJunggi = getJulGi[5].tm_solar;
    useJulib.nextJulibGanji = getJulGi[4].ganji;
    useJulib.nextJunggiGanji = getJulGi[5].ganji;
    resolve(juljunggi);
    /* Julgi.find()
      .sort({ tm_solar: 1 })
      .or([
        { tm_solar: { $regex: julibYear + "-" + julibMonth } },
        { tm_solar: { $regex: julibNextYear + "-" + julibNextMonth } },
        { tm_solar: { $regex: julibBeforeYear + "-" + julibBeforeMonth } },
      ])
      .then((users) => {
        useJulib.beforeJulib = users[0].tm_solar;
        useJulib.beforeJunggi = users[1].tm_solar;
        useJulib.beforeJulibGanji = users[0].ganji;
        useJulib.beforeJunggiGanji = users[1].ganji;
        useJulib.julib = users[2].tm_solar;
        useJulib.junggi = users[3].tm_solar;
        useJulib.julibGanji = users[2].ganji;
        useJulib.junggiGanji = users[3].ganji;
        useJulib.nextJulib = users[4].tm_solar;
        useJulib.nextJunggi = users[5].tm_solar;
        useJulib.nextJulibGanji = users[4].ganji;
        useJulib.nextJunggiGanji = users[5].ganji;
        resolve(juljunggi);
      })

      .catch((err) => {
        console.error(err);
        next(err);
      }); */
  }).catch((error) => {
    console.log(error);
    return error;
});
};
module.exports = juljunggi;
