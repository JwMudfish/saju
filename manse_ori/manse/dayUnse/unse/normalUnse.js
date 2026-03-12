var unse = {};

unse.unse = function () {
  let result;
  let resultTest = require('../../../dayUnseResult/normalDay.json');
  let dayPillar = [];
  for (let i = 0; i < resultTest.data.length; i++) {
    if (
      resultTest.data[i].day ===
      useTodayPillar.d_sky + useTodayPillar.d_land
    ) {
      dayPillar.push(resultTest.data[i]);
    }
  }
  for (let i = 0; i < dayPillar.length; i++) {
    if (dayPillar[i].gabja === usePillar.d_sky) {
      result = dayPillar[i];
    }
  }
  return result;
};
module.exports = unse;
