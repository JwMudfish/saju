var test = {};

var title = 'salary_';
var num;
var totalTitle;
// num = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
let options;

const basicFunc = require('../manse/basicFunc/basicFunc');
const gil = require('../manse/gungShgj/gil');
const hung = require('../manse/gungShgj/hung');
const ryeong = require('../manse/ryeong/ryeong');
const hapChug = require('../manse/hapChug/hapChug');
const resultTest = require('../testResult/contents_salary');
test.randum = function () {
  let result = {
    income: '',
    growth: '',
    when: '',
  };
  result.income = getResult(self());
  result.growth = getResult(grow());
  result.when = getResult(untilWhenWork());
  return result;
};

//메인
const self = () => {
  let income;
  if (useRyeong.jisok.exist === 'Y') {
    if (useShgj.sangsin.exist === 'Y') {
      if (
        useShgj.sangsingisin.exist === 'Y' &&
        sangsinGusinCheckUseable() === 'possible'
      ) {
        income = title + 1;
      } else if (sangsinTongun() === true) {
        income = title + 2;
      } else if (chunGanGukgisin() === true) {
        income = title + 3;
      } else if (useShgj.gusin.exist === 'Y') {
        income = title + 4;
      } else {
        income = title + 5;
      }
    } else {
      if (guktogan() === true) {
        income = title + 6;
      } else if (useShgj.gusin.exist === 'Y') {
        income = title + 7;
      } else if (checkYido() === true) {
        if (useRyeong.heuisin.exist === 'Y') {
          income = title + 8;
        } else {
          income = title + 9;
        }
      } else {
        income = title + 10;
      }
    }
  } else {
    income = title + 11;
  }
  return income;
};

//상신기신 사용불가능 체크
function sangsinGusinCheckUseable() {
  let result;
  let use = useShgj.sangsingisin.use;
  for (let i = 0; i < use.length; i++) {
    if (use[i] === 'Y') {
      result = 'possible';
      break;
    } else {
      result = 'impossible';
    }
  }
  return result;
}

//성장성 체크
const grow = () => {
  let growth = 'growth_';
  if (checkJisok() === 'chun') {
    growth = growth + 1;
  } else if (checkJisok() === 'possible') {
    growth = growth + 2;
  } else if (checkJisok() === 'impossible') {
    growth = growth + 3;
  } else {
    growth = growth + 4;
  }
  return growth;
};

//언제까지버나
const untilWhenWork = () => {
  let when = 'when_';
  if (checkGusinPossible() === true) {
    when = when + 1;
  } else if (
    hapChug.samhap(
      usePillar.m_land,
      usePillar.y_land,
      usePillar.d_land,
      usePillar.h_land,
      'm'
    ) !== ''
  ) {
    when = when + 2;
  } else {
    when = when + 3;
  }
  return when;
};

//천간, 지장간에 사용가능한 구신
function checkGusinPossible() {
  let jijianggan = useShgj.gusin.use;
  let result = false;
  for (let i = 0; i < jijianggan.length; i++) {
    if (jijianggan === 'Y') {
      result = true;
      // break;
    }
  }
  return result;
}

//지속성체크
function checkJisok() {
  let result = 'no';
  let pillar = [];
  pillar.push(ryeong.jisok(useRyeong.yongsin, usePillar.y_sky, '').word);
  pillar.push(ryeong.jisok(useRyeong.yongsin, usePillar.m_sky, '').word);
  pillar.push(ryeong.jisok(useRyeong.yongsin, usePillar.d_sky, '').word);
  pillar.push(ryeong.jisok(useRyeong.yongsin, usePillar.h_sky, '').word);
  pillar.push(
    ryeong.jisok(
      useRyeong.yongsin,
      usejijanggan.y_jangan.y_jangan1,
      usejijangganUse.yong.y_land.y_jangan1
    ).word
  );
  pillar.push(
    ryeong.jisok(
      useRyeong.yongsin,
      usejijanggan.y_jangan.y_jangan2,
      usejijangganUse.yong.y_land.y_jangan2
    ).word
  );
  pillar.push(
    ryeong.jisok(useRyeong.yongsin, usejijanggan.y_jangan.y_jangan3, '').word
  );
  pillar.push(
    ryeong.jisok(
      useRyeong.yongsin,
      usejijanggan.m_jangan.m_jangan1,
      usejijangganUse.yong.m_land.m_jangan1
    ).word
  );
  pillar.push(
    ryeong.jisok(
      useRyeong.yongsin,
      usejijanggan.m_jangan.m_jangan2,
      usejijangganUse.yong.m_land.m_jangan2
    ).word
  );
  pillar.push(
    ryeong.jisok(useRyeong.yongsin, usejijanggan.m_jangan.m_jangan3, '').word
  );
  pillar.push(
    ryeong.jisok(
      useRyeong.yongsin,
      usejijanggan.d_jangan.d_jangan1,
      usejijangganUse.yong.d_land.d_jangan1
    ).word
  );
  pillar.push(
    ryeong.jisok(
      useRyeong.yongsin,
      usejijanggan.d_jangan.d_jangan2,
      usejijangganUse.yong.d_land.d_jangan2
    ).word
  );
  pillar.push(
    ryeong.jisok(useRyeong.yongsin, usejijanggan.d_jangan.d_jangan3, '').word
  );
  pillar.push(
    ryeong.jisok(
      useRyeong.yongsin,
      usejijanggan.h_jangan.h_jangan1,
      usejijangganUse.yong.h_land.h_jangan1
    ).word
  );
  pillar.push(
    ryeong.jisok(
      useRyeong.yongsin,
      usejijanggan.h_jangan.h_jangan2,
      usejijangganUse.yong.h_land.h_jangan2
    ).word
  );
  pillar.push(
    ryeong.jisok(useRyeong.yongsin, usejijanggan.h_jangan.h_jangan3, '').word
  );

  let jjangproperty = [
    ' ',
    ' ',
    ' ',
    ' ',
    usejijangganUse.yong.y_land.y_jangan1,
    usejijangganUse.yong.y_land.y_jangan2,
    ' ',
    usejijangganUse.yong.m_land.m_jangan1,
    usejijangganUse.yong.m_land.m_jangan2,
    ' ',
    usejijangganUse.yong.d_land.d_jangan1,
    usejijangganUse.yong.d_land.d_jangan2,
    ' ',
    usejijangganUse.yong.h_land.h_jangan1,
    usejijangganUse.yong.h_land.h_jangan2,
    ' ',
  ];
  for (let i = 0; i < pillar.length; i++) {
    if (i < 4) {
      if (String(pillar[i]).trim() !== '') {
        result = 'chun';
        break;
      }
    } else {
      if (String(pillar[i]).trim() !== '') {
        if (
          jjangproperty[i] === 'm_yu_sihwa_young' ||
          jjangproperty[i] === 'm_yu_sihwa' ||
          jjangproperty[i] === 'yu_sihwa_young' ||
          String(jjangproperty[i]).trim() === '' ||
          jjangproperty[i] === undefined
        ) {
          result = 'possible';
        } else {
          result = 'impossible';
        }
      }
    }
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

function checkYido() {
  let result = false;
  if (useShgj.gukgubun === '흉격') {
    if (useShgj.yido.exist) {
      result = true;
    }
  }
  return result;
}

function guktogan() {
  let result = false;
  let pillar = [
    usePillar.y_sky,
    usePillar.m_sky,
    usePillar.d_sky,
    usePillar.h_sky,
  ];

  for (let i = 0; i < pillar.length; i++) {
    if (useGyouk.includes(pillar[i]) === true) {
      result = true;
    }
  }

  return result;
}

function chunGanGukgisin() {
  let result = false;
  let pillar = [];
  if (useShgj.gukgubun === '길격') {
    pillar.push(
      gil.gukgisin(
        '  ',
        useShgj.sangguk.y_sky,
        usePillar.y_sky,
        useYuksin.y_sky
      ).word
    );
    pillar.push(
      gil.gukgisin(
        '  ',
        useShgj.sangguk.m_sky,
        usePillar.m_sky,
        useYuksin.m_sky
      ).word
    );
    pillar.push(
      gil.gukgisin(
        '  ',
        useShgj.sangguk.d_sky,
        usePillar.d_sky,
        useYuksin.d_sky
      ).word
    );
    pillar.push(
      gil.gukgisin(
        '  ',
        useShgj.sangguk.h_sky,
        usePillar.h_sky,
        useYuksin.h_sky
      ).word
    );
  } else if (useShgj.gukgubun === '흉격') {
    pillar.push(
      hung.gusingisin(
        '  ',
        useShgj.sangguk.y_sky,
        usePillar.y_sky,
        useYuksin.y_sky
      ).word
    );
    pillar.push(
      hung.gusingisin(
        '  ',
        useShgj.sangguk.m_sky,
        usePillar.m_sky,
        useYuksin.m_sky
      ).word
    );
    pillar.push(
      hung.gusingisin(
        '  ',
        useShgj.sangguk.d_sky,
        usePillar.d_sky,
        useYuksin.d_sky
      ).word
    );
    pillar.push(
      hung.gusingisin(
        '  ',
        useShgj.sangguk.h_sky,
        usePillar.h_sky,
        useYuksin.h_sky
      ).word
    );
  }

  for (let i = 0; i < pillar.length; i++) {
    if (String(pillar[i]).trim() !== '') {
      result = true;
      break;
    }
  }

  return result;
}

function sangsinTongun() {
  let result = false;
  let pillar = [];

  if (useShgj.gukgubun === '길격') {
    pillar.push(
      gil.sangsin('  ', useShgj.sangguk.y_sky, usePillar.y_sky, useYuksin.y_sky)
        .word
    );
    pillar.push(
      gil.sangsin('  ', useShgj.sangguk.m_sky, usePillar.m_sky, useYuksin.m_sky)
        .word
    );
    pillar.push(
      gil.sangsin('  ', useShgj.sangguk.d_sky, usePillar.d_sky, useYuksin.d_sky)
        .word
    );
    pillar.push(
      gil.sangsin('  ', useShgj.sangguk.h_sky, usePillar.h_sky, useYuksin.h_sky)
        .word
    );
  } else if (useShgj.gukgubun === '흉격') {
    pillar.push(
      hung.sangsin(
        '  ',
        useShgj.sangguk.y_sky,
        usePillar.y_sky,
        useYuksin.y_sky
      ).word
    );
    pillar.push(
      hung.sangsin(
        '  ',
        useShgj.sangguk.m_sky,
        usePillar.m_sky,
        useYuksin.m_sky
      ).word
    );
    pillar.push(
      hung.sangsin(
        '  ',
        useShgj.sangguk.d_sky,
        usePillar.d_sky,
        useYuksin.d_sky
      ).word
    );
    pillar.push(
      hung.sangsin(
        '  ',
        useShgj.sangguk.h_sky,
        usePillar.h_sky,
        useYuksin.h_sky
      ).word
    );
  }

  for (let i = 0; i < pillar.length; i++) {
    if (String(pillar[i]).trim() !== '') {
      if (
        basicFunc.root_tong(useUmYangOHang.y_sky.oHang) ||
        basicFunc.root_tong(useUmYangOHang.d_sky.oHang) ||
        basicFunc.root_tong(useUmYangOHang.h_sky.oHang)
      ) {
        result = true;
        break;
      }
    }
  }

  return result;
}

module.exports = test;
