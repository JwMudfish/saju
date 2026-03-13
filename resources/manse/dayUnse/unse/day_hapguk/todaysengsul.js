var unse = {};

const gil = require('../../../gungShgj/gil');
const hung = require('../../../gungShgj/hung');
const sangguk = require('../../../gungShgj/gungshgj');

unse.todayShgjFunc = function () {
  let shgj = {};
  shgj.sangguk = {
    y_sky: sangguk.sangguk(useTodayYuksin.y_sky),
    y_land: sangguk.sangguk(useTodayYuksin.y_land),
    m_sky: sangguk.sangguk(useTodayYuksin.m_sky),
    m_land: sangguk.sangguk(useTodayYuksin.m_land),
    d_sky: sangguk.sangguk(useTodayYuksin.d_sky),
    d_land: sangguk.sangguk(useTodayYuksin.d_land),
    h_sky: sangguk.sangguk(useTodayYuksin.h_sky),
    h_land: sangguk.sangguk(useTodayYuksin.h_land),
    y_jangan1: sangguk.sangguk(useTodayYuksin.y_jangan.y_jangan1),
    y_jangan2: sangguk.sangguk(useTodayYuksin.y_jangan.y_jangan2),
    y_jangan3: sangguk.sangguk(useTodayYuksin.y_jangan.y_jangan3),
    m_jangan1: sangguk.sangguk(useTodayYuksin.m_jangan.m_jangan1),
    m_jangan2: sangguk.sangguk(useTodayYuksin.m_jangan.m_jangan2),
    m_jangan3: sangguk.sangguk(useTodayYuksin.m_jangan.m_jangan3),
    d_jangan1: sangguk.sangguk(useTodayYuksin.d_jangan.d_jangan1),
    d_jangan2: sangguk.sangguk(useTodayYuksin.d_jangan.d_jangan2),
    d_jangan3: sangguk.sangguk(useTodayYuksin.d_jangan.d_jangan3),
    h_jangan1: sangguk.sangguk(useTodayYuksin.h_jangan.h_jangan1),
    h_jangan2: sangguk.sangguk(useTodayYuksin.h_jangan.h_jangan2),
    h_jangan3: sangguk.sangguk(useTodayYuksin.h_jangan.h_jangan3),
  };
  if (useShgj.gukgubun === '길격') {
    let sang_jae = [
      gil.sang_jae('  ', shgj.sangguk.y_sky, usePillar.y_sky, useYuksin.y_sky),
      //  gil.sangsin("  ", shgj.sangguk.y_land, usePillar.y_land),
      gil.sang_jae('  ', shgj.sangguk.m_sky, usePillar.m_sky, useYuksin.m_sky),
      //   gil.sangsin("  ", shgj.sangguk.m_land, usePillar.m_land),
      gil.sang_jae('  ', shgj.sangguk.d_sky, usePillar.d_sky, useYuksin.d_sky),
      //  gil.sangsin("  ", shgj.sangguk.d_land, usePillar.d_land),
      gil.sang_jae('  ', shgj.sangguk.h_sky, usePillar.h_sky, useYuksin.h_sky),
      //    gil.sangsin("  ", shgj.sangguk.h_land, usePillar.h_land),
      gil.sang_jae(
        usejijangganUse.yu.y_land.y_jangan1,
        shgj.sangguk.y_jangan1,
        usejijanggan.y_jangan.y_jangan1,
        usejijanggan.y_jangan.y_jangan1
      ),
      gil.sang_jae(
        usejijangganUse.yu.y_land.y_jangan2,
        shgj.sangguk.y_jangan2,
        usejijanggan.y_jangan.y_jangan2,
        usejijanggan.y_jangan.y_jangan2
      ),
      gil.sang_jae(
        usejijangganUse.yu.y_land.y_jangan3,
        shgj.sangguk.y_jangan3,
        usejijanggan.y_jangan.y_jangan3,
        usejijanggan.y_jangan.y_jangan3
      ),
      gil.sang_jae(
        usejijangganUse.yu.m_land.m_jangan1,
        shgj.sangguk.m_jangan1,
        usejijanggan.m_jangan.m_jangan1,
        usejijanggan.y_jangan.m_jangan1
      ),
      gil.sang_jae(
        usejijangganUse.yu.m_land.m_jangan2,
        shgj.sangguk.m_jangan2,
        usejijanggan.m_jangan.m_jangan2,
        usejijanggan.y_jangan.m_jangan2
      ),
      gil.sang_jae(
        usejijangganUse.yu.m_land.m_jangan3,
        shgj.sangguk.m_jangan3,
        usejijanggan.m_jangan.m_jangan3,
        usejijanggan.y_jangan.m_jangan3
      ),
      gil.sang_jae(
        usejijangganUse.yu.d_land.d_jangan1,
        shgj.sangguk.d_jangan1,
        usejijanggan.d_jangan.d_jangan1,
        usejijanggan.y_jangan.d_jangan1
      ),
      gil.sang_jae(
        usejijangganUse.yu.d_land.d_jangan2,
        shgj.sangguk.d_jangan2,
        usejijanggan.d_jangan.d_jangan2,
        usejijanggan.y_jangan.d_jangan2
      ),
      gil.sang_jae(
        usejijangganUse.yu.d_land.d_jangan3,
        shgj.sangguk.d_jangan3,
        usejijanggan.d_jangan.d_jangan3,
        usejijanggan.y_jangan.d_jangan3
      ),
      gil.sang_jae(
        usejijangganUse.yu.h_land.h_jangan1,
        shgj.sangguk.h_jangan1,
        usejijanggan.h_jangan.h_jangan1,
        usejijanggan.y_jangan.h_jangan1
      ),
      gil.sang_jae(
        usejijangganUse.yu.h_land.h_jangan2,
        shgj.sangguk.h_jangan2,
        usejijanggan.h_jangan.h_jangan2,
        usejijanggan.y_jangan.h_jangan2
      ),
      gil.sang_jae(
        usejijangganUse.yu.h_land.h_jangan3,
        shgj.sangguk.h_jangan3,
        usejijanggan.h_jangan.h_jangan3,
        usejijanggan.y_jangan.h_jangan3
      ),
    ];
    shgj.sang_jae = getYNP(sang_jae);

    let sul_jae = [
      gil.sul_jae('  ', shgj.sangguk.y_sky, usePillar.y_sky, useYuksin.y_sky),
      //  gil.sangsin("  ", shgj.sangguk.y_land, usePillar.y_land),
      gil.sul_jae('  ', shgj.sangguk.m_sky, usePillar.m_sky, useYuksin.m_sky),
      //   gil.sangsin("  ", shgj.sangguk.m_land, usePillar.m_land),
      gil.sul_jae('  ', shgj.sangguk.d_sky, usePillar.d_sky, useYuksin.d_sky),
      //  gil.sangsin("  ", shgj.sangguk.d_land, usePillar.d_land),
      gil.sul_jae('  ', shgj.sangguk.h_sky, usePillar.h_sky, useYuksin.h_sky),
      //    gil.sangsin("  ", shgj.sangguk.h_land, usePillar.h_land),
      gil.sul_jae(
        usejijangganUse.yu.y_land.y_jangan1,
        shgj.sangguk.y_jangan1,
        usejijanggan.y_jangan.y_jangan1,
        usejijanggan.y_jangan.y_jangan1
      ),
      gil.sul_jae(
        usejijangganUse.yu.y_land.y_jangan2,
        shgj.sangguk.y_jangan2,
        usejijanggan.y_jangan.y_jangan2,
        usejijanggan.y_jangan.y_jangan2
      ),
      gil.sul_jae(
        usejijangganUse.yu.y_land.y_jangan3,
        shgj.sangguk.y_jangan3,
        usejijanggan.y_jangan.y_jangan3,
        usejijanggan.y_jangan.y_jangan3
      ),
      gil.sul_jae(
        usejijangganUse.yu.m_land.m_jangan1,
        shgj.sangguk.m_jangan1,
        usejijanggan.m_jangan.m_jangan1,
        usejijanggan.y_jangan.m_jangan1
      ),
      gil.sul_jae(
        usejijangganUse.yu.m_land.m_jangan2,
        shgj.sangguk.m_jangan2,
        usejijanggan.m_jangan.m_jangan2,
        usejijanggan.y_jangan.m_jangan2
      ),
      gil.sul_jae(
        usejijangganUse.yu.m_land.m_jangan3,
        shgj.sangguk.m_jangan3,
        usejijanggan.m_jangan.m_jangan3,
        usejijanggan.y_jangan.m_jangan3
      ),
      gil.sul_jae(
        usejijangganUse.yu.d_land.d_jangan1,
        shgj.sangguk.d_jangan1,
        usejijanggan.d_jangan.d_jangan1,
        usejijanggan.y_jangan.d_jangan1
      ),
      gil.sul_jae(
        usejijangganUse.yu.d_land.d_jangan2,
        shgj.sangguk.d_jangan2,
        usejijanggan.d_jangan.d_jangan2,
        usejijanggan.y_jangan.d_jangan2
      ),
      gil.sul_jae(
        usejijangganUse.yu.d_land.d_jangan3,
        shgj.sangguk.d_jangan3,
        usejijanggan.d_jangan.d_jangan3,
        usejijanggan.y_jangan.d_jangan3
      ),
      gil.sul_jae(
        usejijangganUse.yu.h_land.h_jangan1,
        shgj.sangguk.h_jangan1,
        usejijanggan.h_jangan.h_jangan1,
        usejijanggan.y_jangan.h_jangan1
      ),
      gil.sul_jae(
        usejijangganUse.yu.h_land.h_jangan2,
        shgj.sangguk.h_jangan2,
        usejijanggan.h_jangan.h_jangan2,
        usejijanggan.y_jangan.h_jangan2
      ),
      gil.sul_jae(
        usejijangganUse.yu.h_land.h_jangan3,
        shgj.sangguk.h_jangan3,
        usejijanggan.h_jangan.h_jangan3,
        usejijanggan.y_jangan.h_jangan3
      ),
    ];
    shgj.sul_jae = getYNP(sul_jae);
  } else if (useShgj.gukgubun === '흉격') {
    let sul_jae = [
      hung.sul_jae('  ', useYuksin.y_sky, useTodayPillar.y_sky),
      hung.sul_jae('  ', useYuksin.y_land, useTodayPillar.y_land),
      hung.sul_jae('  ', useYuksin.m_sky, useTodayPillar.m_sky),
      hung.sul_jae('  ', useYuksin.m_land, useTodayPillar.m_land),
      hung.sul_jae('  ', useYuksin.d_sky, useTodayPillar.d_sky),
      hung.sul_jae('  ', useYuksin.d_land, useTodayPillar.d_land),
      hung.sul_jae('  ', useYuksin.h_sky, useTodayPillar.h_sky),
      hung.sul_jae('  ', useYuksin.h_land, useTodayPillar.h_land),
      hung.sul_jae(
        useTodayjijangganUse.yu.y_land.y_jangan1,
        useYuksin.y_jangan.y_jangan1,
        useTodayJanggan.y_jangan.y_jangan1
      ),
      hung.sul_jae(
        useTodayjijangganUse.yu.y_land.y_jangan2,
        useYuksin.y_jangan.y_jangan2,
        useTodayJanggan.y_jangan.y_jangan2
      ),
      hung.sul_jae(
        useTodayjijangganUse.yu.y_land.y_jangan3,
        useYuksin.y_jangan.y_jangan3,
        useTodayJanggan.y_jangan.y_jangan3
      ),
      hung.sul_jae(
        useTodayjijangganUse.yu.m_land.m_jangan1,
        useYuksin.m_jangan.m_jangan1,
        useTodayJanggan.m_jangan.m_jangan1
      ),
      hung.sul_jae(
        useTodayjijangganUse.yu.m_land.m_jangan2,
        useYuksin.m_jangan.m_jangan2,
        useTodayJanggan.m_jangan.m_jangan2
      ),
      hung.sul_jae(
        useTodayjijangganUse.yu.m_land.m_jangan3,
        useYuksin.m_jangan.m_jangan3,
        useTodayJanggan.m_jangan.m_jangan3
      ),
      hung.sul_jae(
        useTodayjijangganUse.yu.d_land.d_jangan1,
        useYuksin.d_jangan.d_jangan1,
        useTodayJanggan.d_jangan.d_jangan1
      ),
      hung.sul_jae(
        useTodayjijangganUse.yu.d_land.d_jangan2,
        useYuksin.d_jangan.d_jangan2,
        useTodayJanggan.d_jangan.d_jangan2
      ),
      hung.sul_jae(
        useTodayjijangganUse.yu.d_land.d_jangan3,
        useYuksin.d_jangan.d_jangan3,
        useTodayJanggan.d_jangan.d_jangan3
      ),
      hung.sul_jae(
        useTodayjijangganUse.yu.h_land.h_jangan1,
        useYuksin.h_jangan.h_jangan1,
        useTodayJanggan.h_jangan.h_jangan1
      ),
      hung.sul_jae(
        useTodayjijangganUse.yu.h_land.h_jangan2,
        useYuksin.h_jangan.h_jangan2,
        useTodayJanggan.h_jangan.h_jangan2
      ),
      hung.sul_jae(
        useTodayjijangganUse.yu.h_land.h_jangan3,
        useYuksin.h_jangan.h_jangan3,
        useTodayJanggan.h_jangan.h_jangan3
      ),
    ];
    shgj.sul_jae = getYNP(sul_jae);
  }

  return shgj;
};

function getYNP(obj) {
  let result;

  let exist = [
    obj[0].exist,
    obj[1].exist,

    obj[2].exist,
    obj[3].exist,

    obj[4].exist,
    obj[5].exist,

    obj[6].exist,
    obj[7].exist,

    obj[8].exist,
    obj[9].exist,
    obj[10].exist,

    obj[11].exist,
    obj[12].exist,
    obj[13].exist,

    obj[14].exist,
    obj[15].exist,
  ];

  let name = [
    'y_sky',

    'm_sky',

    'd_sky',

    'h_sky',

    'y_jangan1',
    'y_jangan2',
    'y_jangan3',
    'm_jangan1',
    'm_jangan2',
    'm_jangan3',
    'd_jangan1',
    'd_jangan2',
    'd_jangan3',
    'h_jangan1',
    'h_jangan2',
    'h_jangan3',
  ];
  let jjangproperty = [
    ' ',
    ' ',
    ' ',
    ' ',
    useTodayjijangganUse.yong.y_land.y_jangan1,
    useTodayjijangganUse.yong.y_land.y_jangan2,
    ' ',
    useTodayjijangganUse.yong.m_land.m_jangan1,
    useTodayjijangganUse.yong.m_land.m_jangan2,
    ' ',
    useTodayjijangganUse.yong.d_land.d_jangan1,
    useTodayjijangganUse.yong.d_land.d_jangan2,
    ' ',
    useTodayjijangganUse.yong.h_land.h_jangan1,
    useTodayjijangganUse.yong.h_land.h_jangan2,
    ' ',
  ];
  let objUse = [
    obj[0].possible,
    obj[1].possible,
    obj[2].possible,
    obj[3].possible,
    obj[4].possible,
    obj[5].possible,
    obj[6].possible,
    obj[7].possible,
    obj[8].possible,
    obj[9].possible,
    obj[10].possible,
    obj[11].possible,
    obj[12].possible,
    obj[13].possible,
    obj[14].possible,
    obj[15].possible,
  ];
  let yn = 'N';
  let position = [];
  let property = [];
  let use = [];
  for (let i = 0; i < exist.length; i++) {
    if (i === 19) {

    }
    if (exist[i] === 'y' || exist[i] === 'Y') {
      yn = 'Y';
      position.push(name[i]);
      if (jjangproperty[i] === undefined) {
        property.push('  ');
      } else {
        property.push(jjangproperty[i]);
      }

      use.push(objUse[i]);
    }
  }
  result = {
    exist: yn,
    position: position,
    property: property,
    use: use,
  };
  return result;
}

module.exports = unse;
