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
const resultFunc = require('../manse/manseFunc/dailyFunc');

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
    if (contents === 'daliyManse') {
    } else {
      temp = false;
    }
  } else if (req.params.contents === 'unse') {
    if (contents === 'normal') {
    } else if (contents === 'hapguk') {
    } else if (contents === 'propose') {
    } else if (contents === 'goback') {
    } else if (contents === 'ttiYearUnse') {
    } else if (contents === 'ilganYearUnse') {
    } else if (contents === 'dangYearUnse') {
    } else if (contents === 'daliyAll') {
    } else if (contents === 'dailyTomorrow') {
    }  else if (contents.includes('ttiMonth') === true) {
    } else if (contents.includes('ilganMonth') === true) {
    } else if (contents.includes('dangMonth') === true) {
   }  /* else if (contents==='normal_mint') {
    }*/else if (contents==='normal_unse_m') {
    }else if (contents==='today_unse') {
    }else if (contents==='tomorrow_unse') {
    }else if (contents==='yesterday_unse') {
    }else {
      temp = false;
    }
  } else {
    temp = false;
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
          resultFunc.resultFunc(res, 'daily', contents);
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
