var month = {};

month.getMonth = function (month, yearSky) {
  const sky = require("./monthPillarSky");
  const land = require("./monthPillarLand");
  const monthPillarSky = sky.monthPillarSky(month, yearSky);
  const monthPillarLand = land.monthPillarLand(month);
  const monthPillar = monthPillarSky + monthPillarLand;
  return monthPillar;
};

module.exports = month;
