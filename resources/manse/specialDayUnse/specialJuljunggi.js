var juljunggi = {};
const Julgi = require("../../schemas/julgi");
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

    Julgi.find()
      .sort({ tm_solar: 1 })
      .or([
        { tm_solar: { $regex: julibYear + "-" + julibMonth } },
        { tm_solar: { $regex: julibNextYear + "-" + julibNextMonth } },
        { tm_solar: { $regex: julibBeforeYear + "-" + julibBeforeMonth } },
      ])
      .then((users) => {
        useJulib.todayBeforeJulib = users[0].tm_solar;
        useJulib.todayBeforeJunggi = users[1].tm_solar;
        useJulib.todayBeforeJulibGanji = users[0].ganji;
        useJulib.todayBeforeJunggiGanji = users[1].ganji;
        useJulib.todayJulib = users[2].tm_solar;
        useJulib.todayJunggi = users[3].tm_solar;
        useJulib.todayJulibGanji = users[2].ganji;
        useJulib.todayJunggiGanji = users[3].ganji;
        useJulib.todayNextJulib = users[4].tm_solar;
        useJulib.todayNextJunggi = users[5].tm_solar;
        useJulib.todayNextJulibGanji = users[4].ganji;
        useJulib.todayNextJunggiGanji = users[5].ganji;
        resolve(juljunggi);
      })

      .catch((err) => {
        console.error(err);
        next(err);
      });
  });
};
module.exports = juljunggi;
