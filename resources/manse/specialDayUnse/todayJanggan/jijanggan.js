var jijangganFunc = {};
//pillar  객체에 담고 한번에 myManse에 넣어버리기
let jijanggan = {};
const getjijanggan = require("./getjijanggan");
jijangganFunc.jijanggan = function () {
  return new Promise((resolve) => {
    let year_jijanggan = getjijanggan.jijganggan(useTodayPillar.y_land);
    let month_jijanggan = getjijanggan.jijganggan(useTodayPillar.m_land);
    let day_jijanggan = getjijanggan.jijganggan(useTodayPillar.d_land);
    let hour_jijanggan = getjijanggan.jijganggan(useTodayPillar.h_land);

    let y = String(year_jijanggan).split(",");
    let m = String(month_jijanggan).split(",");
    let d = String(day_jijanggan).split(",");
    let h;
    if (usePillar.h_sky === "" && usePillar.h_land === "") {
      h = ["  ", "  ", "  "];
    } else {
      h = String(hour_jijanggan).split(",");
    }
    let y_jangan = {
      y_jangan1: y[0],
      y_jangan2: y[1],
      y_jangan3: y[2],
    };
    let m_jangan = {
      m_jangan1: m[0],
      m_jangan2: m[1],
      m_jangan3: m[2],
    };
    let d_jangan = {
      d_jangan1: d[0],
      d_jangan2: d[1],
      d_jangan3: d[2],
    };
    let h_jangan = {
      h_jangan1: h[0],
      h_jangan2: h[1],
      h_jangan3: h[2],
    };
    jangan = {
      y_jangan: {
        y_jangan1: y[0],
        y_jangan2: y[1],
        y_jangan3: y[2],
      },
      m_jangan: {
        m_jangan1: m[0],
        m_jangan2: m[1],
        m_jangan3: m[2],
      },
      d_jangan: {
        d_jangan1: d[0],
        d_jangan2: d[1],
        d_jangan3: d[2],
      },
      h_jangan: {
        h_jangan1: h[0],
        h_jangan2: h[1],
        h_jangan3: h[2],
      },
    };
    //  myManse.pillar.jijanggan = jangan;
    /*  myManse.pillar.y_jangan = y_jangan;
    myManse.pillar.m_jangan = m_jangan;
    myManse.pillar.d_jangan = d_jangan;
    myManse.pillar.h_jangan = h_jangan;*/

    useTodayJanggan = jangan;
    useTodayPillar.jijanggan = jangan;
    resolve(jijanggan);
  }).catch((error) => {
    console.log(error);
    return error;
});
};
module.exports = jijangganFunc;
