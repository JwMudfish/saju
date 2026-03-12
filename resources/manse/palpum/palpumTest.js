var palpum = {};

palpum.palpum = function () {
  let result;
  if (
    usePillar.m_land === '해' ||
    usePillar.m_land === '자' ||
    usePillar.m_land === '축'
  ) {
    result = checkPalpum('신', '경', '무', '병', '갑', '인');
  } else if (
    usePillar.m_land === '인' ||
    usePillar.m_land === '묘' ||
    usePillar.m_land === '진'
  ) {
    result = checkPalpum('계', '임', '기', '병', '신', '유');
  } else if (
    usePillar.m_land === '사' ||
    usePillar.m_land === '오' ||
    usePillar.m_land === '미'
  ) {
    result = checkPalpum('갑', '을', '무', '인', '경', '신');
  } else if (
    usePillar.m_land === '신' ||
    usePillar.m_land === '유' ||
    usePillar.m_land === '술'
  ) {
    result = checkPalpum('무', '기', '기', '임', '을', '묘');
  }
  return result;
};

function checkPalpum(johwa1, johwa2, now, fucture, people, money) {
  let result = {
    johwa: [],
    now: [],
    fucture: [],
    people: [],
    money: [],
  };
  let pillarSky = [
    usePillar.y_sky,
    usePillar.m_sky,
    usePillar.d_sky,
    usePillar.h_sky,
  ];
  let pillarLand = [
    usePillar.y_land,
    usePillar.m_land,
    usePillar.d_land,
    usePillar.h_land,
  ];

  for (let i = 0; i < pillarSky.length; i++) {
    if (pillarSky[i] === johwa1) {
      result.johwa.push(pillarSky[i]);
    } else if (pillarSky[i] === johwa2) {
      result.johwa.push(pillarSky[i]);
    }
    if (pillarSky[i] === now) {
      result.now.push(pillarSky[i]);
    }
    if (pillarSky[i] === fucture) {
      result.fucture.push(pillarSky[i]);
    }
    if (pillarSky[i] === people) {
      result.people.push(pillarSky[i]);
    }
  }
  for (let i = 0; i < pillarLand.length; i++) {
    if (pillarLand[i] === money) {
      result.money.push(pillarLand[i]);
    }
  }

  return result;
}
module.exports = palpum;
