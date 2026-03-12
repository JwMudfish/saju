var resultFunc = {};

//실제로 진행하는 함수
const pillar = require("../pillar/pillar");
const todayPillar = require("../dayUnse/todaypillar/pillar");
const juljungi = require("../dayUnse/todayAndMyJuljunggi");
const juljungiNew = require('../dayUnse/todayAndMyJuljunggiNew');
const umYangOHang = require("../umYangOHang/umYangOHang");
const todayUmYangOHang = require("../dayUnse/todayumYangOHang/umYangOHang");
const jijanggan = require("../jiJanggan/jijanggan");
const todayJanggan = require("../dayUnse/todayJanggan/jijanggan");
const yuksin = require("../yuksin/yuksin");
const todayYuksin = require("../dayUnse/todayYuksin/yuksin");
const hapChung = require("../hapChug/hapChungTest");
const jjganUse = require("../jijangganUse/jijangganUse");
const todayjjganUse = require("../dayUnse/jijangganUse/jijangganUse");
const basicFunc = require("../basicFunc/basicTest");
const ryeong = require("../ryeong/ryeongTest");
const chiguk = require("../chiguk/chigukTest");
const ryeongIF = require("../ryeong/ryoungIF");
const ryeongToday = require("../dayUnse/todayRyrong/ryeong");
const shgj = require("../gungShgj/gungshgjIF");
const todayShgj = require("../dayUnse/todayShgj/shgj");
const deun = require("../deunSeun/deunTest");
//오류체크함수
const checkBirth = require("./checkBirthday");
const changeYangUm = require("./changeYangUm");
const checkSummerSeoul = require("./checkSummerSeoul");

let errorMessage;
resultFunc.resultFunc = async function (res, name, contents) {
  if (checkError() === true) {
    //인터페이스
    const interF = require("../interface/" + name);
    // await juljungi.juljunggi();
    await juljungiNew.juljunggi();
    await pillar.pillar();
    await todayPillar.pillar(contents);
    await jijanggan.jijanggan();
    await todayJanggan.jijanggan();
    await umYangOHang.umYangOHang();
    await todayUmYangOHang.umYangOHang();
    await yuksin.yukSin();
    await todayYuksin.yukSin();
    await hapChung.hapChug();
    await jjganUse.jjjanUseFunc();
    await todayjjganUse.jjjanUseFunc();
    await basicFunc.basicFunc();
    await ryeongIF.ryeong();
    await ryeongToday.ryeong();
    // await ryeong.ryeong();
    await chiguk.chiguk();
    await shgj.gungShgj();
    await todayShgj.gungShgj();
    // await deun.deun();
    await interF.interface(contents).then(function () {
      res.set({ "access-control-allow-origin": "*" });
      res.send(myManseInterF);
      myManseInterF = {};
    });
  } else {
    res.set({ "access-control-allow-origin": "*" });
    res.send(errorMessage);
  }
};

function checkError() {
  let result = true;
  if (changeYangUm.changeYangUm() === true) {
    if (checkBirth.checkBirthday() === true) {
      const checkS2 = checkSummerSeoul.summerSeoul();
      if (checkS2.error === true) {
        errorMessage = checkS2.errorMessage;
        result = false;
      }
    } else {
      errorMessage = {
        message: "Error 생년월일시가 잘못넘어왔습니다",
        errorCode: "WrongBirthDay",
      };
      result = false;
    }
  } else {
    errorMessage = {
      message: "Error 윤달이 아니거나 음력날짜를 잘못입력하셨습니다",
      errorCode: "WrongYunUm",
    };
    result = false;
  }

  return result;
}

module.exports = resultFunc;
