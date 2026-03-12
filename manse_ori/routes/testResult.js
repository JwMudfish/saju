var express = require("express");
var router = express.Router();
var cors = require("cors");
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const jwt = require("jsonwebtoken");

const user = require("../list/user.json");
const testList = require("../list/testList.json");
const publicKey = require("../list/publicKey.json");

const setInfo = require("../manse/manseFunc/setInfo");
const resultFunc = require("../manse/manseFunc/testFunc");

router.post("/:contents", cors(), function (req, res, next) {
  var contents = req.body.contents;
  var primarySecretKey = req.body.secretKey;
  const token = req.body.token;
  let temp = false;
  let userNum = 0;

  for (let i = 0; i < user.length; i++) {
    if (user[i].primaryKey === primarySecretKey) {
      temp = true;
      userNum = i;
      break;
    }
  }

  if (contents === "all") {
    if (testList.all.includes(req.params.contents)) {
    } else {
      temp = false;
    }
  } else if (contents === "selfTest") {
    if (testList.self.includes(req.params.contents)) {
    } else {
      temp = false;
    }
  } else if (contents === "normalTest") {
  } else {
    temp = false;
  }
  if (temp === false) {
    let errorMessage = {
      message: "Error 접근권한이 없습니다",
      errorCode: "NoAuth",
    };
    res.status(403).send(errorMessage);
  } else {
    var secretKey = publicKey.publicKey + primarySecretKey;
    jwt.verify(token, secretKey, function (err, decoded) {
      if (err) {
        let errorMessage = {
          message: "Error 토큰이 유효하지 않습니다",
          errorCode: "NoToken",
        };
        res.status(403).send(errorMessage);
        console.log(err); // 유효하지 않은 토큰
      } else {
        var secretKey = publicKey.publicKey + primarySecretKey;
        jwt.verify(token, secretKey, function (err, decoded) {
          if (err) {
            let errorMessage = {
              message: "Error 토큰이 유효하지 않습니다",
              errorCode: "NoToken",
            };
            res.status(403).send(errorMessage);
            console.log(err); // 유효하지 않은 토큰
          } else {
            if (user[userNum].auth.includes(contents)) {
              setInfo.setInfo(req.body);
              resultFunc.resultFunc(
                res,
                req.params.contents,
                req.body.partnerGyouk
              );
            } else {
              let errorMessage = {
                message: "Error 접근권한이 없습니다",
                errorCode: "NoAuth",
              };
              res.status(403).send(errorMessage);
            }
          }
        });
      }
    });
  }
});

module.exports = router;
