var interface = {};
//상생상극함수
const normal = require('../dayUnse/unse/normalUnse');
const hapguk = require('../dayUnse/unse/day_hapguk/day_hapguk');
const propose = require('../dayUnse/unse/kickcouple/propose');
const goback = require('../dayUnse/unse/kickcouple/goback');
const ticketing = require('../dayUnse/unse/ticketing/assa');
interface.interface = function (contents) {
  return new Promise((resolve) => {
    if (contents === 'dailyManse') {
      dailyManse()
    } else if (contents === 'normal') {
      myManseInterF = daliyUnse();
    } else if (contents === 'daliyAll') {
      myManseInterF = {
        normal: daliyUnse(),
        hapguk: hapguk.hapguk(),
        propose: propose.propose(),
        goback: goback.goback(),
        ticketing: ticketing.assa(),
      };
    }
    resolve('');
  }).catch((error) => {
    console.log(error);
    return error;
});
};

const dailyManse = () => {
  myManseInterF.pillar = myManse.pillar;
  myManseInterF.todayPillar = useTodayPillar;
}

const daliyUnse = () => {
  let temp = normal.unse();
  let result;
  result = {
    day: temp.day,
    gabja: temp.gabja,
    weather: temp.weather,
    comment: temp.comment,
    contents: temp.contents,
  };

  return result;
}


module.exports = interface;
