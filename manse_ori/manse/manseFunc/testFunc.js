var resultFunc = {};

//실제로 진행하는 함수
const pillar = require('../pillar/pillar');
const juljungi = require('../julgiJunggi/juljunggi');
const juljunggiNew = require('../julgiJunggi/juljunggiNew');
const unYangOHang = require('../umYangOHang/umYangOHang');
const jijanggan = require('../jiJanggan/jijanggan');
const yuksin = require('../yuksin/yuksin');
const hapChung = require('../hapChug/hapChungTest');
const jjganUse = require('../jijangganUse/jijangganUse');
const basicFunc = require('../basicFunc/basicTest');
const ryeong = require('../ryeong/ryeongTest');
const chiguk = require('../chiguk/chigukTest');
const ryeongIF = require('../ryeong/ryoungIF');
const shgj = require('../gungShgj/gungshgjTest');
const shgjIF = require('../gungShgj/gungshgjIF');
const deun = require('../deunSeun/deunTest');
const palpum = require('../palpum/palpum');

//오류체크함수
const checkBirth = require('./checkBirthday');
const changeYangUm = require('./changeYangUm');
const checkSummerSeoul = require('./checkSummerSeoul');

let errorMessage;
resultFunc.resultFunc = async function (res, testName, contents) {
  if (checkError() === true) {
    //인터페이스
    const interF = require('../interface/testResult');
    // await juljungi.juljunggi();
    await juljunggiNew.juljunggi();
    await pillar.pillar();
    await jijanggan.jijanggan();
    await unYangOHang.umYangOHang();
    await yuksin.yukSin();
    await hapChung.hapChug();
    await jjganUse.jjjanUseFunc();
    await basicFunc.basicFunc();
    await ryeongIF.ryeong();
    // await ryeong.ryeong();
    await chiguk.chiguk();
    await shgjIF.gungShgj();
    await deun.deun();
    await palpum.palpum();
    await interF.interface(testName, contents).then(function () {
      res.set({ 'access-control-allow-origin': '*' });
      if (myManseInterF.errorCode !== undefined) {
        res.status(501).send(myManseInterF);
      } else {
        res.send(myManseInterF);
      }
      myManseInterF = {};
    });
  } else {
    res.set({ 'access-control-allow-origin': '*' });
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
        message: 'Error 생년월일시가 잘못넘어왔습니다',
        errorCode: 'WrongBirthDay',
      };
      result = false;
    }
  } else {
    errorMessage = {
      message: 'Error 윤달이 아니거나 음력날짜를 잘못입력하셨습니다',
      errorCode: 'WrongYunUm',
    };
    result = false;
  }

  return result;
}

module.exports = resultFunc;
