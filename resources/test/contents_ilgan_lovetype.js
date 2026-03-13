var ilgan = {};
var title = 'ilgan_lovetype_';
var num;
var totalTitle;
// num = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
const resultTest = require('../testResult/contents_ilgan_love.json');
ilgan.randum = function () {
  return self();
};
const self = () => {
  let result;
  if (usePillar.d_sky === '갑') {
    result = checkMyLove("계", "기", "경")
  } else if (usePillar.d_sky === '을') {
    result = checkMyLove("병", "무", "경")
  } else if (usePillar.d_sky === '병') {
    result = checkMyLove("을", "무", "신")
  } else if (usePillar.d_sky === '정') {
    result = checkMyLove("경", "기", "갑")
  } else if (usePillar.d_sky === '무') {
    result = checkMyLove("을", "임", "계")
  } else if (usePillar.d_sky === '기') {
    result = checkMyLove("계", "갑", "임")
  } else if (usePillar.d_sky === '경') {
    result = checkMyLove("정", "계", "병")
  } else if (usePillar.d_sky === '신') {
    result = checkMyLove("임", "무", "병")
  } else if (usePillar.d_sky === '임') {
    result = checkMyLove("신", "갑", "정")
  } else if (usePillar.d_sky === '계') {
    result = checkMyLove("갑", "경", "무")
  }
  let temp = {
    subtitle: "",
    contents: "",

  };
  if (result.length === 1) {
    temp.title = getResult(result[0]).title;
    temp.subtitle = getResult(result[0]).subtitle;
    temp.contents = getResult(result[0]).contents;
  }
  else {
    for (let i = 0; i < result.length; i++) {
      temp.title = temp.title + getResult(result[i]).title + "/";
      temp.subtitle = temp.subtitle + getResult(result[i]).subtitle + "\\n";
      temp.contents = temp.contents + getResult(result[i]).contents + "\\n";
    }
  }

  return temp;
};

function checkMyLove(mind, long, body) {
  let pillar = [
    usePillar.y_sky,
    usePillar.m_sky,
    usePillar.h_sky
  ]

  let result = [];

  let count = 0;

  for (let i = 0; i < pillar.length; i++) {
    if (pillar[i] === mind) {
      result.push("ilgan_love");
      count = count + 1;
    }
    else if (pillar[i] === long) {
      result.push("ilgan_long");
      count = count + 1;
    }
    else if (pillar[i] === body) {
      result.push("ilgan_body");
      count = count + 1;
    }
  }
  if (count === 3) {
    result.length = 0;
    result.push("ilgan_all");
  }
  else if (count === 0) {
    result.push("ilgan_zero");
  }

  return result;
}

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

module.exports = ilgan;
