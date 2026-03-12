var year = {};

year.getYear = function (year) {
  const sky = require("./yearPillarSky");
  const land = require("./yearPillarLand");
  const yearPillarSky = sky.yearPillarSky(year);
  const yearPillarLand = land.yearPillarLand(year);
  const yearPillar = yearPillarSky + yearPillarLand;
  return yearPillar;
};

module.exports = year;
