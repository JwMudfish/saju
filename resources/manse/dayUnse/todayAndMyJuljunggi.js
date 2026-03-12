var juljunggi = {};
const Julgi = require("../../schemas/julgi");
var moment = require("moment");
juljunggi.juljunggi = function () {
  return new Promise((resolve) => {
    let julibMonth = Number(useDate.month);
    let julibYear = Number(useDate.year);
    let julibNextMonth = Number(useDate.month) + 1;
    let julibNextYear = Number(useDate.year);
    let julibBeforeMonth = Number(useDate.month) - 1;
    let julibBeforeYear = Number(useDate.year);
    let todayJulibMonth = Number(moment().format("MM"));
    let todayJulibYear = Number(moment().format("YYYY"));
    let todayJulibNextMonth = Number(moment().format("MM")) + 1;
    let todayJulibNextYear = Number(moment().format("YYYY"));
    let todayJulibBeforeMonth = Number(moment().format("MM")) - 1;
    let todayJulibBeforeYear = Number(moment().format("YYYY"));
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
    if (todayJulibNextMonth === 13) {
      todayJulibNextMonth = 1;
      todayJulibNextYear = todayJulibNextYear + 1;
    }
    if (todayJulibBeforeMonth === 0) {
      todayJulibBeforeMonth = 12;
      todayJulibBeforeYear = todayJulibBeforeYear - 1;
    }
    if (todayJulibMonth < 10) {
      todayJulibMonth = "0" + String(todayJulibMonth);
    }
    if (todayJulibNextMonth < 10) {
      todayJulibNextMonth = "0" + String(todayJulibNextMonth);
    }
    if (todayJulibBeforeMonth < 10) {
      todayJulibBeforeMonth = "0" + String(todayJulibBeforeMonth);
    }

    Julgi.find()
      .sort({ tm_solar: 1 })
      .or([
        { tm_solar: { $regex: julibYear + "-" + julibMonth } },
        { tm_solar: { $regex: julibNextYear + "-" + julibNextMonth } },
        { tm_solar: { $regex: julibBeforeYear + "-" + julibBeforeMonth } },
        { tm_solar: { $regex: todayJulibYear + "-" + todayJulibMonth } },
        {
          tm_solar: { $regex: todayJulibNextYear + "-" + todayJulibNextMonth },
        },
        {
          tm_solar: {
            $regex: todayJulibBeforeYear + "-" + todayJulibBeforeMonth,
          },
        },
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
        useJulib.todayBeforeJulib = users[6].tm_solar;
        useJulib.todayBeforeJunggi = users[7].tm_solar;
        useJulib.todayBeforeJulibGanji = users[6].ganji;
        useJulib.todayBeforeJunggiGanji = users[7].ganji;
        useJulib.todayJulib = users[8].tm_solar;
        useJulib.todayJunggi = users[9].tm_solar;
        useJulib.todayJulibGanji = users[8].ganji;
        useJulib.todayJunggiGanji = users[9].ganji;
        useJulib.todayNextJulib = users[10].tm_solar;
        useJulib.todayNextJunggi = users[11].tm_solar;
        useJulib.todayNextJulibGanji = users[10].ganji;
        useJulib.todayNextJunggiGanji = users[11].ganji;
        resolve(juljunggi);
      })

      .catch((err) => {
        console.error(err);
        next(err);
      });
  });
};
module.exports = juljunggi;
