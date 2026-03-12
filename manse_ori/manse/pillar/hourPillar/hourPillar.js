var hour = {};

hour.getHour = function (hour, minute, dayGanji, summerTime, seoulTime) {
  const sky = require("./hourPillarSky");
  const land = require("./hourPillarLand");
  const hourPillarSky = sky.hourPillarSky(
    hour,
    minute,
    dayGanji,
    summerTime,
    seoulTime
  );
  const hourPillarLand = land.hourPillarLand(
    hour,
    minute,
    summerTime,
    seoulTime
  );
  const hourPillar = hourPillarSky + hourPillarLand;
  return hourPillar;
};

module.exports = hour;
