var interface = {};
//상생상극함수

const normal = require('../dayUnse/unse/normalUnse');
const hapguk = require('../dayUnse/unse/day_hapguk/day_hapguk');
const propose = require('../dayUnse/unse/kickcouple/propose');
const goback = require('../dayUnse/unse/kickcouple/goback');
const ticketing = require('../dayUnse/unse/ticketing/assa');
const ttiYear = require('../dayUnse/unse/year/tti_year');
const ttiMonth = require('../dayUnse/unse/month/tti_month');
const ilganYear = require('../dayUnse/unse/year/ilgan_year');
const ilganMonth = require('../dayUnse/unse/month/ilgan_month');
const dangYear = require('../dayUnse/unse/year/dang_year');
const dangMonth = require('../dayUnse/unse/month/dang_month');
var moment = require("moment");
interface.interface = function (contents) {
  return new Promise((resolve) => {
    if (contents === 'daliyManse') {
      daliyManse();
    } else if (contents === 'normal') {
      myManseInterF = daliyUnse();
    } else if (contents === 'hapguk') {
      myManseInterF = hapguk.hapguk();
    } else if (contents === 'propose') {
      myManseInterF = propose.propose();
    } else if (contents === 'goback') {
      myManseInterF = goback.goback();
    } else if (contents === 'ttiYearUnse') {
      myManseInterF = ttiYear.ttiYear();
    } else if (contents === 'ilganYearUnse') {
      myManseInterF = ilganYear.ilganYear();
    } else if (contents.includes('ttiMonth')) {
      let month = contents.split('ttiMonth');
      myManseInterF = ttiMonth.ttiMonth(month[1]);
    } else if (contents.includes('ilganMonth')) {
      let month = contents.split('ilganMonth');
      myManseInterF = ilganMonth.ilganMonth(month[1]);
    } else if (contents.includes('dangYearUnse')) {
      myManseInterF = dangYear.dangYear();
    } else if (contents.includes('dangMonth')) {
      let month = contents.split('dangMonth');
      myManseInterF = dangMonth.dangMonth(month[1]);
    } else if (contents === 'daliyAll') {
      myManseInterF = {
        normal: daliyUnse(),
        hapguk: hapguk.hapguk(),
        propose: propose.propose(),
        goback: goback.goback(),
        ticketing: ticketing.assa(),
      };
    }
    else if (contents === 'dailyTomorrow') {
      myManseInterF = {
        normal: daliyUnseTomorrow(),
        hapguk: hapguk.hapguk(),
        propose: propose.propose(),
        goback: goback.goback(),
        ticketing: ticketing.assa(),
      };
    }
    /*else if (contents === 'normal_mint') {
      myManseInterF = daliyUnseMint();
    }*/
    else if (contents === 'normal_unse_m') {
      myManseInterF = daliyUnseMint();
    }
    else if (contents === 'today_unse') {
      myManseInterF = daliyUnse()
    }
    else if (contents === 'tomorrow_unse') {
      
      myManseInterF =daliyUnseTomorrow()
    }
    else if (contents === 'yesterday_unse') {
      
      myManseInterF =daliyUnseYesterday()
    }
    resolve('');
  }).catch((error) => {
    console.log(error);
    return error;
});
};

function daliyUnse() {
  let temp = normal.unse();
  let result;
  let d = new Date();
  const date = moment(d).add(90, 'minutes').format("YYYY년 MM월 DD일");
  result = {
    date: date,
    day: temp.day,
    gabja: temp.gabja,
    weather: temp.weather,
    comment: temp.comment,
    contents: temp.contents,
  };
  return result;
}
function daliyUnseTomorrow() {
  let temp = normal.unse();
  let result;
  let d = new Date();
  const date = moment(d).add(90, 'minutes');
  const tomorrowDate= moment(date).add(1, 'day').format("YYYY년 MM월 DD일")
  result = {
    date: tomorrowDate,
    day: temp.day,
    gabja: temp.gabja,
    weather: temp.weather,
    comment: temp.comment,
    contents: temp.contents,
  };
  return result;
}
function daliyUnseYesterday() {
  let temp = normal.unse();
  let result;
  let d = new Date();
  const date = moment(d).add(90, 'minutes');
  const yesterdayDate= moment(date).add(-1, 'day').format("YYYY년 MM월 DD일")
  result = {
    date: yesterdayDate,
    day: temp.day,
    gabja: temp.gabja,
    weather: temp.weather,
    comment: temp.comment,
    contents: temp.contents,
  };
  return result;
}
  function daliyUnseMint() {
    let temp = normal.unse();
    let result;
    let d = new Date();
    const date = moment(d).add(90, 'minutes').format("YYYY년 MM월 DD일");
    result = {
      date: date,
      day: temp.day,
      gabja: temp.gabja,
      weather: temp.weather,
      comment: temp.comment,
      contents: temp.contents,
    };

  return result;
}

function daliyManse() {
  myManseInterF.pillar = myManse.pillar;
  myManseInterF.todayPillar = useTodayPillar;
  myManseInterF.Gyouk = myManse.Gyouk;
  myManseInterF.useTodayRyeong = ryeong();
  myManseInterF.useTodayShgj = shgj();
}

function ryeong() {
  let exist = [
    useTodayRyeong.heuisin.exist,
    useTodayRyeong.junghwa.exist,
    useTodayRyeong.junghwa_gisin.exist,
    useTodayRyeong.jisok.exist,
    useTodayRyeong.jisok_gisin.exist,
    useTodayRyeong.hwakjang.exist,
    useTodayRyeong.hwakjang_gisin.exist,
    useTodayRyeong.um_heuisin_gisin.exist,
    useTodayRyeong.geuk_heuisin_gisin.exist,
    useTodayRyeong.um_gisin.exist,
    useTodayRyeong.geuk_gisin.exist,
  ];

  let name = [
    'heuisin',
    'junghwa',
    'junghwa_gisin',
    'jisok',
    'jisok_gisin',
    'hwakjang',
    'hwakjang_gisin',
    'um_heuisin_gisin',
    'geuk_heuisin_gisin',
    'um_gisin',
    'geuk_gisin',
  ];
  let result = [];

  for (let i = 0; i < exist.length; i++) {
    if (exist[i] === 'Y') {
      result.push(name[i]);
    }
  }

  return result;
}

function shgj() {
  let exist = [
    useTodayShgj.sangsin,
    useTodayShgj.sangsingisin,
    useTodayShgj.gusin,
    useTodayShgj.gusingisin,
    useTodayShgj.sanghwa,
    useTodayShgj.sulhwa,
    useTodayShgj.sul_jae,
    useTodayShgj.yido,
    useTodayShgj.gukgisin,
    useTodayShgj.sang_hap,
    useTodayShgj.sul_hap,
  ];

  let name = [
    'sangsin',
    'sangsingisin',
    'gusin',
    'gusingisin',
    'sanghwa',
    'sul_jae',
    'yido',
    'gukgisin',
    'geuk_heuisin_gisin',
    'sang_hap',
    'sul_hap',
  ];
  let result = [];

  for (let i = 0; i < exist.length; i++) {
    if (exist[i] !== undefined && exist[i].exist === 'Y') {
      result.push(name[i]);
    }
  }

  return result;
}
module.exports = interface;
