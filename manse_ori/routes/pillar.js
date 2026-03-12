var express = require("express");
var router = express.Router();
var cors = require("cors");
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const pillar = require("../manse/pillar/pillar");
const setInfo = require("../manse/manseFunc/setInfo");
router.get("/pillar", cors(corsOptions), function (req, res, next) {
  setInfo.setInfo(req.query);
  resultPillarFunc(res);
});
router.get("/pillar/yearPillar", cors(corsOptions), function (req, res, next) {
  setInfo.setInfo(req.query);
  resultYearPillarFunc(res);
});
router.get("/pillar/monthPillar", cors(corsOptions), function (req, res, next) {
  setInfo.setInfo(req.query);
  resultMonthPillarFunc(res);
});
router.get("/pillar/dayPillar", cors(corsOptions), function (req, res, next) {
  setInfo.setInfo(req.query);
  resultDayPillarFunc(res);
});
router.get("/pillar/hourPillar", cors(corsOptions), function (req, res, next) {
  setInfo.setInfo(req.query);
  resultHourPillarFunc(res);
});

function resultPillarFunc(res) {
  var a = pillar.pillar();
  a.then(function () {
    res.send(myManse.pillar);
  });
}

function resultYearPillarFunc(res) {
  var a = pillar.pillar();
  a.then(function () {
    res.send({
      yearPillar: myManse.pillar.yearPillar,
      yearPillarSky: myManse.pillar.yearPillarSky,
      yearPillarLand: myManse.pillar.yearPillarLand,
    });
  });
}
function resultMonthPillarFunc(res) {
  var a = pillar.pillar();
  a.then(function () {
    res.send({
      monthPillar: myManse.pillar.monthPillar,
      monthPillarSky: myManse.pillar.monthPillarSky,
      monthPillarLand: myManse.pillar.monthPillarLand,
    });
  });
}
function resultDayPillarFunc(res) {
  var a = pillar.pillar();
  a.then(function () {
    res.send({
      dayPillar: myManse.pillar.dayPillar,
      dayPillarSky: myManse.pillar.dayPillarSky,
      dayPillarLand: myManse.pillar.dayPillarLand,
    });
  });
}

function resultHourPillarFunc(res) {
  var a = pillar.pillar();
  a.then(function () {
    res.send({
      hourPillar: myManse.pillar.hourPillar,
      hourPillarSky: myManse.pillar.hourPillarSky,
      hourPillarLand: myManse.pillar.hourPillarLand,
    });
  });
}
module.exports = router;
