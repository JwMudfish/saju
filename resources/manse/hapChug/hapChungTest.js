var hapChugFunc = {};

const hapChug = require("./hapChug");
hapChugFunc.hapChug = function () {
  return new Promise((resolve) => {
    let a = hapChug.samhap(
      usePillar.m_land,
      usePillar.y_land,
      usePillar.d_land,
      usePillar.h_land,
      "m"
    );
    let b = hapChug.banghap(
      usePillar.m_land,
      usePillar.y_land,
      usePillar.d_land,
      usePillar.h_land,
      "m"
    );
    let c = hapChug.chung(
      usePillar.d_land,
      usePillar.y_land,
      usePillar.m_land,
      usePillar.h_land,
      "m"
    );
    let d = hapChug.yukhap(
      usePillar.m_land,
      usePillar.y_land,
      usePillar.d_land,
      usePillar.h_land,
      "m"
    );
    resolve(useYuksin);
  }).catch((error) => {
    console.log(error);
    return error;
});
};
module.exports = hapChugFunc;
