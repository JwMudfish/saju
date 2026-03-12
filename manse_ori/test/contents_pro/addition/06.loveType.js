var ironwall = {};

var totalTitle;
const resultTest = require('../../../testResult/contents_pro_report/addition/06.loveType/loveType.json');
let options;
ironwall.randum = function () {
  let result = self();
  return result;
};
const self = () => {
  let result={}
  const god10List = [
    useYuksin.h_sky,
    useYuksin.m_sky,
    useYuksin.y_sky,
    useYuksin.y_jangan.y_jangan1,
    useYuksin.y_jangan.y_jangan2,
    useYuksin.y_jangan.y_jangan3,
    useYuksin.m_jangan.m_jangan1,
    useYuksin.m_jangan.m_jangan2,
    useYuksin.m_jangan.m_jangan3,
    useYuksin.d_jangan.d_jangan1,
    useYuksin.d_jangan.d_jangan2,
    useYuksin.d_jangan.d_jangan3,
    useYuksin.h_jangan.h_jangan1,
    useYuksin.h_jangan.h_jangan2,
    useYuksin.h_jangan.h_jangan3,
  ];

  const pilarSky = [
    usePillar.y_sky,
    usePillar.m_sky,
    usePillar.d_sky,
    usePillar.h_sky,
  ];

  if (buthuy(checkGun(), god10List)) {

    totalTitle = 'type1';
    result.title='차가운 도시남녀'
    result.keyword=getResult(totalTitle).contents
  } else if (moderation(checkGun(), god10List)) {
    totalTitle = "type2";
    result.title='알 수 없는 속마음'
    result.keyword=getResult(totalTitle).contents
  } else if (trauma(useGyouk, god10List)) {
    totalTitle ="type4";
    result.title='배신 트라우마'
    result.keyword=getResult(totalTitle).contents
  } else if (pet(god10List)) {
    totalTitle = "type3";
    result.title='사랑은 열린문'
    result.keyword=getResult(totalTitle).contents
  } else if (pure(pilarSky)) {
    totalTitle ="type5";
    result.title='결혼까지 생각했어'
    result.keyword=getResult(totalTitle).contents
  } else {
    totalTitle = "type6";
    result.title='사라진 연애세포'
    result.keyword=getResult(totalTitle).contents
  }

  return result;
};
function getResult(title) {
  let result;
  for (let i = 0; i < resultTest.contentsList.length; i++) {
    if (title === resultTest.contentsList[i].title) {
      result = resultTest.contentsList[i];
      break;
    }
  }
  return result;
}
//근체크
function checkGun() {
  let result = 'mu_root';
  if (useBasicFunc.rootTong.totalRoot === 'king_root') {
    result = 'king_root'
  }
  else if (useBasicFunc.rootTong.totalRoot === 'pure_root') {
    result = 'pure_root'
  }
  return result;
}

/*1. 부처형
일간 근 and 인성(천간,지장간 모두) 2개 이상*/
const buthuy = (gun, god10) => {
  let resultValue = false;
  let insongCount = 0;
  if (gun === 'pure_root') {
    for (var i = 0; i < god10.length; i++) {
      if (god10[i] === '정인' || god10[i] === '편인') {
        insongCount = insongCount + 1;
      }
    }

    if (insongCount >= 2) {
      resultValue = true;
    }
  }
  return resultValue;
};

/*2. 절제형
  일간 근 and 식상(천간,지장간 모두) 2개 이상*/
const moderation = (gun, god10) => {
  let resultValue = false;
  let insongCount = 0;
  if (gun === '근') {
    for (var i = 0; i < god10.length; i++) {
      if (god10[i] === '식신' || god10[i] === '상관') {
        insongCount = insongCount + 1;
      }
    }

    if (insongCount >= 2) {
      resultValue = true;
    }
  }
  return resultValue;
};

/*3. 애완견형
  비견 + 정관 OR 겁재 + 편관. OR 식신 + 정관 OR 상관 + 편관(천간,지장간 모두)*/
const pet = (god10) => {
  let resultValue = false;
  let bigeun = 0;
  let junggan = 0;
  let gubje = 0;
  let pyounguan = 0;
  let siksin = 0;
  let sangguan = 0;
  for (var i = 0; i < god10.length; i++) {
    if (god10[i] === '식신') {
      siksin = siksin + 1;
    } else if (god10[i] === '상관') {
      sangguan = sangguan + 1;
    } else if (god10[i] === '비견') {
      bigeun = bigeun + 1;
    } else if (god10[i] === '겁재') {
      gubje = gubje + 1;
    } else if (god10[i] === '정관') {
      junggan = junggan + 1;
    } else if (god10[i] === '편관') {
      pyounguan = pyounguan + 1;
    }
  }

  if (junggan > 0) {
    if (bigeun > 0 || siksin > 0) {
      resultValue = true;
    }
  } else if (pyounguan > 0) {
    if (gubje > 0 || sangguan > 0) {
      resultValue = true;
    }
  }
  return resultValue;
};

/*4. 트라우마형
비견 + 정관 + 상관 OR 겁재 + 편관 + 식신 OR 식신 + 정관 + 정인 OR 상관 + 편관 + 편인(천간,지장간 모두)
양인격 + 정관 + 상관 OR 건록격 + 편관 + 식신 OR 식신격 + 정관 + 정인 OR 상관격 + 편관 + 편인(천간,지장간 모두)
으로 변경*/
const trauma = (gyouk, god10) => {
  let resultValue = false;
  let junggan = 0;
  let pyounguan = 0;
  let jungin = 0;
  let pyoungin = 0;
  let siksin = 0;
  let sangguan = 0;
  // let bigeun = 0;
  // let gubje = 0;

  if (
    gyouk === '주왕 양인격' ||
    gyouk === '주왕 건록격' ||
    gyouk === '양인격' ||
    gyouk === '건록격' ||
    gyouk === '식신격' ||
    gyouk === '상관격'
  ) {
    for (var i = 0; i < god10.length; i++) {
      /* if (god10[i] === "비견") {
        bigeun = bigeun + 1;
      } else if (god10[i] === "겁재") {
        gubje = gubje + 1;
      } */
      if (god10[i] === '식신') {
        siksin = siksin + 1;
      } else if (god10[i] === '상관') {
        sangguan = sangguan + 1;
      } else if (god10[i] === '정관') {
        junggan = junggan + 1;
      } else if (god10[i] === '편관') {
        pyounguan = pyounguan + 1;
      } else if (god10[i] === '정인') {
        jungin = jungin + 1;
      } else if (god10[i] === '편인') {
        pyoungin = pyoungin + 1;
      }
    }

    if (gyouk === '주왕 양인격' || gyouk === ' 양인격') {
      if (junggan > 0 && sangguan > 0) {
        resultValue = true;
      }
    } else if (gyouk === '주왕 건록격' || gyouk === '건록격') {
      if (pyounguan > 0 && siksin > 0) {
        resultValue = true;
      }
    } else if (gyouk === '식신격') {
      if (junggan > 0 && jungin > 0) {
        resultValue = true;
      }
    } else if (gyouk === '상관격') {
      if (pyounguan > 0 && pyoungin > 0) {
        resultValue = true;
      }
    }
  }

  /*if (junggan > 0 && (siksin > 0 || sangguan > 0)) {
    if ((bigeun > 0 && sangguan > 0) || (siksin > 0 && jungin > 0)) {
      resultValue = true;
    }
  } else if (pyounguan > 0 && (siksin > 0 || sangguan > 0)) {
    if ((gubje > 0 && siksin > 0) || (sangguan > 0 && pyoungin > 0)) {
      resultValue = true;
    }
  }*/
  return resultValue;
};

/*5. 순정형
  (천간 계수 OR 천간 정화) and 천간 기토*/
const pure = (pilar) => {
  let resultValue = false;
  let geasu = 0;
  let junghwa = 0;
  let gito = 0;
  for (var i = 0; i < pilar.length; i++) {
    if (pilar[i] === '계') {
      geasu = geasu + 1;
    } else if (pilar[i] === '정') {
      junghwa = junghwa + 1;
    } else if (pilar[i] === '기') {
      gito = gito + 1;
    }
  }

  if (gito > 0) {
    if (geasu > 0 || junghwa > 0) {
      resultValue = true;
    }
  }
  return resultValue;
};

module.exports = ironwall;
