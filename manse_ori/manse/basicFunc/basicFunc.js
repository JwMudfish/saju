var basicFunc = {};

//지장간사용판단함수
const jjganUse = require('../jijangganUse/jijangganFunc');
var moment = require('moment');
//계절을 뱉어내는 함수(월지랑 다른거랑 일치하는지 비교하는 함수)
basicFunc.season = function (month, other) {
  let result;
  if (seasonFunc(month) === seasonFunc(other)) {
    result = 'y';
  } else {
    result = 'n';
  }

  return result;
};

basicFunc.seasonMonth = function (month) {
  let result;
  result = seasonFunc(month);
  return result;
};

//생지왕지고지구분
basicFunc.swgGubun = function (jiji) {
  let result;
  result = swgGubunFunc(jiji);
  return result;
};

//월투간1(월지장간 3하고 비교하는것)
basicFunc.walTogan1 = function () {
  let result;
  result = walToganFunc(useUmYangOHang.m_jangan.m_jangan3.oHang);
  return result;
};

//월투간2(월지장간 2하고 비교하는것)
basicFunc.walTogan2 = function () {
  let result;
  if (swgGubunFunc(usePillar.m_land) === 'shang') {
    result = walToganFunc(useUmYangOHang.m_jangan.m_jangan2.oHang);
  } else {
    result = 'n';
  }
  return result;
};

//월투간3(월지장간 1하고 비교하는것)
basicFunc.walTogan3 = function () {
  let result;
  if (swgGubunFunc(usePillar.m_land) === 'go') {
    result = walToganFunc(useUmYangOHang.m_jangan.m_jangan1.oHang);
  } else {
    result = 'n';
  }
  return result;
};

//월투간4
basicFunc.walTogan4 = function (num) {
  let result;
  let dark = 0;
  let light = 0;
  if (walTogan4FuncOhang(useUmYangOHang.y_sky.oHang, num) === 'y') {
    let temp = walTogan4FuncUmYang(useUmYangOHang.y_sky.umYang);

    dark = dark + temp.dark;
    light = light + temp.light;
  }
  if (walTogan4FuncOhang(useUmYangOHang.m_sky.oHang, num) === 'y') {
    let temp = walTogan4FuncUmYang(useUmYangOHang.m_sky.umYang);

    dark = dark + temp.dark;
    light = light + temp.light;
  }
  if (walTogan4FuncOhang(useUmYangOHang.h_sky.oHang, num) === 'y') {
    let temp = walTogan4FuncUmYang(useUmYangOHang.h_sky.umYang);

    dark = dark + temp.dark;
    light = light + temp.light;
  }

  if (dark >= 1 && light === 0) {
    result = 1;
  } else if (light >= 1 && dark === 0) {
    result = 2;
  } else if (light >= 1 && dark >= 1) {
    result = 3;
  } else {
    result = 0;
  }
  return result;
};
//월투간4토
basicFunc.walTogan4To = function () {
  let result = '';
  if (usejijanggan.m_jangan.m_jangan3 === '무') {
    if (getMuGi('무') === true && getMuGi('기') === true) {
      result = '무';
    } else if (getMuGi('기') === true) {
      result = '기';
    } else {
      result = '무';
    }
  } else if (usejijanggan.m_jangan.m_jangan3 === '기') {
    if (getMuGi('무') === true && getMuGi('기') === true) {
      result = '기';
    } else if (getMuGi('무') === true) {
      result = '무';
    } else {
      result = '기';
    }
  }
  return result;
};

function getMuGi(word) {
  let result = false;
  if (
    usePillar.y_sky === word ||
    usePillar.m_sky === word ||
    usePillar.d_sky === word ||
    usePillar.h_sky === word
  ) {
    result = true;
  }
  return result;
}

//월투간4오행같은지 비교
function walTogan4FuncOhang(ohang, num) {
  let result;
  let janggan;
  if (
    usePillar.m_land === '진' ||
    usePillar.m_land === '술' ||
    usePillar.m_land === '축' ||
    usePillar.m_land === '미'
  ) {
    const myBirth = moment(
      useDate.year +
      '-' +
      useDate.month +
      '-' +
      useDate.day +
      ' ' +
      useDate.hour +
      ':' +
      useDate.minute +
      ':00',
      'YYYY-MM-DD HH:mm:ss '
    );
    if (
      moment
        .duration(
          moment(myBirth, 'YYYY-MM-DD HH:mm:ss ').diff(
            moment(myManse.julib, 'YYYY-MM-DD HH:mm:ss ')
          )
        )
        .asHours() <= 288
    ) {
      janggan = useUmYangOHang.m_jangan.m_jangan1;
    } else {
      janggan = useUmYangOHang.m_jangan.m_jangan3;
    }
  } else {
    janggan = useUmYangOHang.m_jangan.m_jangan3;
  }
  if (num === 3) {
    janggan = useUmYangOHang.m_jangan.m_jangan3;
  } else if (num === 1) {
    janggan = useUmYangOHang.m_jangan.m_jangan1;
  } else if (num === 2) {
    janggan = useUmYangOHang.m_jangan.m_jangan2;
  }

  if (janggan.oHang === ohang) {
    result = 'y';
  } else {
    result = 'n';
  }
  return result;
}
//월투간4음양공식 뱉어내기
function walTogan4FuncUmYang(umYang) {
  let result = {};
  //let temp = [umYang1, umYang2, umYang3];
  let dark = 0;
  let light = 0;
  /*for (let i = 0; i < temp.length; i++) {
    if (temp[i] === "음") {
      dark = dark + 1;
    } else if (temp[i] === "양") {
      light = light + 1;
    }
  }*/
  if (umYang === '음') {
    dark = dark + 1;
  } else if (umYang === '양') {
    light = light + 1;
  }
  result = {
    dark: dark,
    light: light,
  };

  return result;
}

//지장간 사용판단한후 만들기
//실행시켜야하는 함수
basicFunc.root_dayTotal = function () {
  let result;
  let root = [
    basicFunc.root_day(usejijangganUse.yong.y_land.y_jangan1, useUmYangOHang.y_jangan.y_jangan1.oHang),
    basicFunc.root_day(usejijangganUse.yong.y_land.y_jangan2, useUmYangOHang.y_jangan.y_jangan2.oHang),
    basicFunc.root_day(usejijangganUse.yong.y_land.y_jangan3, useUmYangOHang.y_jangan.y_jangan3.oHang),
    basicFunc.root_day(usejijangganUse.yong.d_land.d_jangan1, useUmYangOHang.d_jangan.d_jangan1.oHang),
    basicFunc.root_day(usejijangganUse.yong.d_land.d_jangan2, useUmYangOHang.d_jangan.d_jangan2.oHang),
    basicFunc.root_day(usejijangganUse.yong.d_land.d_jangan3, useUmYangOHang.d_jangan.d_jangan3.oHang),
    basicFunc.root_day(usejijangganUse.yong.h_land.h_jangan1, useUmYangOHang.h_jangan.h_jangan1.oHang),
    basicFunc.root_day(usejijangganUse.yong.h_land.h_jangan2, useUmYangOHang.h_jangan.h_jangan2.oHang),
    basicFunc.root_day(usejijangganUse.yong.h_land.h_jangan3, useUmYangOHang.h_jangan.h_jangan3.oHang),
  ]
  let purenum = checkPure(root)
  if (purenum === 1) {
    result = 'pure_root';
  } else if (purenum >= 2) {
    result = 'king_root';
  } else if (purenum === 0) {
    if (checkRootNum(root) > 0) {
      result = 'week_root';
    } else {
      result = 'mu_root';
    }
  } else {
    result = 'mu_root';
  }
  return result;
};
function checkRootNum(root) {
  let result = 0;
  for (let i = 0; i < root.length; i++) {
    if (root[i] === 'mu_root' || root[i] === '') {
    }
    else {
      result = result + 1;
    }
  }
  return result;
}
function checkPure(root) {
  let result = 0;
  for (let i = 0; i < root.length; i++) {
    if (root[i] === 'pure_root') {
      result = result + 1;
    }
  }
  return result;
}
basicFunc.root_day = function (use, ohang) {
  let result = '';


  if (useUmYangOHang.d_sky.oHang === ohang) {
    if (use === 'bunhwa') {
      result =  'mu_root';
    } 
   else if (use === 'youngsa') {
      result = 'samhap_root';
    } else if (use === 'jangsang') {
      result = 'noonchi_root';
    } else if (use.includes('yugi')||
    use.includes('goji')||
    use.includes('sihwa')) {
      if(use==='yugi_young'){
        result = 'seson_root';
      }
      else if(  use.includes('sihwa')) {
        result = 'pure_root';
      }
      else {
        result = 'mu_root';
      }
    } else {
      result = 'pure_root';
    }
  }
  else if ((ohang !== undefined && String(ohang).trim() === '') || ohang === undefined) {
    result = '';
  }
  else {
    result = 'mu_root';
  }

  return result;
}


basicFunc.root_tong = function (ohang) {
  let result;

  if (
    ohang === useUmYangOHang.y_jangan.y_jangan3.oHang ||
    ohang === useUmYangOHang.d_jangan.d_jangan3.oHang ||
    ohang === useUmYangOHang.h_jangan.h_jangan3.oHang
  ) {
    result = 'y';
  } else {
    result = 'n';
  }
  return result;
};

//지장간 사용판단한후 만들기
basicFunc.root_jiral = function () {
  let result;
  if (
    (usePillar.d_sky === '임' && usePillar.d_land === '자') ||
    (usePillar.d_sky === '병' && usePillar.d_land === '오')
  ) {
    result = 'king_root_jiral';
  } else if (useUmYangOHang.d_sky === useUmYangOHang.d_land) {
    result = 'root_jiral';
  } else {
    result = 'no_jiral';
  }
  return result;
};

//season을 가져오는 함수
function seasonFunc(pillar) {
  let result;
  if (pillar === '해' || pillar === '자' || pillar === '축') {
    result = 'winter';
  } else if (pillar === '인' || pillar === '묘' || pillar === '진') {
    result = 'spring';
  } else if (pillar === '사' || pillar === '오' || pillar === '미') {
    result = 'summer';
  } else if (pillar === '신' || pillar === '유' || pillar === '술') {
    result = 'fall';
  }
  return result;
}

//생지왕지고지 뱉어내는함수
function swgGubunFunc(jiji) {
  let result;
  if (jiji === '인' || jiji === '신' || jiji === '사' || jiji === '해') {
    result = 'shang';
  } else if (jiji === '자' || jiji === '오' || jiji === '묘' || jiji === '유') {
    result = 'wang';
  } else if (jiji === '진' || jiji === '술' || jiji === '축' || jiji === '미') {
    result = 'go';
  }
  return result;
}

//월투간함수
function walToganFunc(jijang) {
  let result;
  if (
    jijang === useUmYangOHang.y_sky.oHang ||
    jijang === useUmYangOHang.m_sky.oHang ||
    jijang === useUmYangOHang.d_sky.oHang ||
    jijang === useUmYangOHang.h_sky.oHang
  ) {
    result = 'y';
  } else {
    result = 'n';
  }
  return result;
}

module.exports = basicFunc;
