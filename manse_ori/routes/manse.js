var express = require('express');
var router = express.Router();
var cors = require('cors');
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const jwt = require('jsonwebtoken');

const user = require('../list/user.json');
const publicKey = require('../list/publicKey.json');

const setInfo = require('../manse/manseFunc/setInfo');
const resultFunc = require('../manse/manseFunc/resultFunc');

router.post('/', cors(), function (req, res, next) {
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
  if (temp === false) {
    let errorMessage = {
      message: 'Error 접근권한이 없습니다',
      errorCode: 'NoAuth',
    };
    res.status(403).send(errorMessage);
  } else {
    var secretKey = publicKey.publicKey + primarySecretKey;
    jwt.verify(token, secretKey, function (err, decoded) {
      if (err) {
        let errorMessage = {
          message: 'Error 토큰이 유효하지 않습니다',
          errorCode: 'NoToken',
        };
        res.status(403).send(errorMessage);
        console.log(err); // 유효하지 않은 토큰
      } else {
        if (contents === 'all') {
          if (decoded.auth.includes('all')) {
            if (user[userNum].auth.includes('all')) {
              setInfo.setInfo(req.body);
              resultFunc.resultFunc(res, user[userNum].id);
            } else {
              let errorMessage = {
                message: 'Error 접근권한이 없습니다',
                errorCode: 'NoAuth',
              };
              res.status(403).send(errorMessage);
            }
          } else {
            let errorMessage = {
              message: 'Error 접근권한이 없습니다',
              errorCode: 'NoAuth',
            };
            res.status(403).send(errorMessage);
          }
        } else if (contents !== 'all') {
          if (user[userNum].auth.includes(contents)) {
            setInfo.setInfo(req.body);
            resultFunc.resultFunc(res, user[userNum].id, contents);
          } else {
            let errorMessage = {
              message: 'Error 접근권한이 없습니다',
              errorCode: 'NoAuth',
            };
            res.status(403).send(errorMessage);
          }
        } else {
          let errorMessage = {
            message: 'Error 접근컨텐츠를 잘못 입력하셨습니다',
            errorCode: 'NoContents',
          };
          res.status(403).send(errorMessage);
        }
      }
    });
  }
});

router.post('/:contents', cors(), function (req, res, next) {
  var primarySecretKey = req.body.secretKey;
  var contents = req.body.contents;
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

  if (req.params.contents === 'manse') {
    if (
      contents === 'manseall' ||
      contents === 'pillar' ||
      contents === 'deunseun' ||
      contents === 'deun' ||
      contents === 'seunWalYes' ||
      contents === 'seunWalNo' ||
      contents === 'gys'
    ) {
    } else {
      temp = false;
    }
  } else if (req.params.contents === 'ryeong') {
    if (
      contents === 'yongsin' ||
      contents === 'saryeong' ||
      contents === 'heuisin' ||
      contents === 'junghwa' ||
      contents === 'junghwa_gisin' ||
      contents === 'jisok' ||
      contents === 'jisok_gisin' ||
      contents === 'hwakjang' ||
      contents === 'hwakjang_gisin' ||
      contents === 'um_heuisin_gisin' ||
      contents === 'geuk_heuisin_gisin' ||
      contents === 'um_gisin' ||
      contents === 'geuk_gisin' ||
      contents === 'ryeongAll'
    ) {
    } else {
      temp = false;
    }
  } else if (req.params.contents === 'shgj') {
    if (
      contents === 'gukgubun' ||
      contents === 'sangsin' ||
      contents === 'sangsingisin' ||
      contents === 'gusin' ||
      contents === 'gusingisin' ||
      contents === 'sanghwa' ||
      contents === 'sulhwa' ||
      contents === 'sul_jae' ||
      contents === 'yido' ||
      contents === 'gukgisin' ||
      contents === 'sang_hap' ||
      contents === 'sul_hap' ||
      contents === 'sang_jae' ||
      contents === 'shgjAll'
    ) {
    } else {
      temp = false;
    }
  }
  if (temp === false) {
    let errorMessage = {
      message: 'Error 접근권한이 없습니다',
      errorCode: 'NoAuth',
    };
    res.status(403).send(errorMessage);
  } else {
    var secretKey = publicKey.publicKey + primarySecretKey;
    jwt.verify(token, secretKey, function (err, decoded) {
      if (err) {
        let errorMessage = {
          message: 'Error 토큰이 유효하지 않습니다',
          errorCode: 'NoToken',
        };
        res.status(403).send(errorMessage);
        console.log(err); // 유효하지 않은 토큰
      } else {
        if (user[userNum].auth.includes(contents)) {
          setInfo.setInfo(req.body);
          resultFunc.resultFunc(res, user[userNum].id, contents);
        } else {
          let errorMessage = {
            message: 'Error 접근권한이 없습니다',
            errorCode: 'NoAuth',
          };
          res.status(403).send(errorMessage);
        }
      }
    });
  }
});

module.exports = router;
