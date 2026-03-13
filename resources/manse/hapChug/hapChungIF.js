var hapChugFunc = {};

const hapChug = require("./hapChug");
hapChugFunc.hapChug = function () {
  return new Promise((resolve) => {
    let samhap = {
      year: hapChug.samhap(
        usePillar.y_land,
        'Y'
      ),
      month: hapChug.samhap(
        usePillar.m_land,
        'M'
      ),
      day: hapChug.samhap(
        usePillar.d_land,
        'D'
      ),
      hour: hapChug.samhap(
        usePillar.h_land,
        'H'
      ),
    }
    samhap.yn = checkYN(samhap)
    samhap.word = hapChug.whatSamhap(samhap)

    let banghap = {
      year: hapChug.banghap(
        usePillar.y_land,
        'Y'
      ),
      month: hapChug.banghap(
        usePillar.m_land,
        'M'
      ),
      day: hapChug.banghap(
        usePillar.d_land,
        'D'
      ),
      hour: hapChug.banghap(
        usePillar.h_land,
        'H'
      ),
    }
    banghap.yn = checkYN(banghap)
    banghap.word = hapChug.whatBanghap(banghap)
    let chung = {
      year: hapChug.chung(
        usePillar.y_land,
        'Y'
      ),
      month: hapChug.chung(
        usePillar.m_land,
        'M'
      ),
      day: hapChug.chung(
        usePillar.d_land,
        'D'
      ),
      hour: hapChug.chung(
        usePillar.h_land,
        'H'
      ),
    }
    chung.yn = checkYN(chung)
    chung.word = hapChug.whatChung(chung)
    let yukhap = {
      year: hapChug.yukhap(
        usePillar.y_land,
        'Y'
      ),
      month: hapChug.yukhap(
        usePillar.m_land,
        'M'
      ),
      day: hapChug.yukhap(
        usePillar.d_land,
        'D'
      ),
      hour: hapChug.yukhap(
        usePillar.h_land,
        'H'
      ),
    }
    yukhap.yn = checkYN(yukhap)
    yukhap.word = hapChug.whatYukhap(yukhap)
    useHapChung = {
      samhap: samhap,
      banghap: banghap,
      chung: chung,
      yukhap: yukhap
    }
    resolve(useHapChung);
  }).catch((error) => {
    console.log(error);
    return error;
});
};

function checkYN(check) {
  let result = "Y";
  if (check.year === '' && check.month === '' && check.day === '' && check.hour === '') {
    result = "N"
  }

  return result
}
module.exports = hapChugFunc;
