var gungShgjFunc = {};

const gungShgjFunction = require('./gungshgj');
const gil = require('./gil');
const hung = require('./hung');
const gungshgjUtil = require('../../manseUtil/gungShgj/gungshgjUtil');
const gungshgjWord= require('../../manseUtil/gungShgj/gungShgWord');
const gungshgjYuksin= require('../../manseUtil/gungShgj/gungShgjYuksin');
gungShgjFunc.gungShgj = function () {
  return new Promise((resolve) => {
    let gukgubun = gungShgjFunction.gukgubun();
    let shgj = {};
    shgj = {
      gukgubun: gukgubun,
      sangguk: {
        y_sky: gungShgjFunction.sangguk(useYuksin.y_sky),
        y_land: gungShgjFunction.sangguk(useYuksin.y_land),
        m_sky: gungShgjFunction.sangguk(useYuksin.m_sky),
        m_land: gungShgjFunction.sangguk(useYuksin.m_land),
        d_sky: gungShgjFunction.sangguk(useYuksin.d_sky),
        d_land: gungShgjFunction.sangguk(useYuksin.d_land),
        h_sky: gungShgjFunction.sangguk(useYuksin.h_sky),
        h_land: gungShgjFunction.sangguk(useYuksin.h_land),
        y_jangan1: gungShgjFunction.sangguk(useYuksin.y_jangan.y_jangan1),
        y_jangan2: gungShgjFunction.sangguk(useYuksin.y_jangan.y_jangan2),
        y_jangan3: gungShgjFunction.sangguk(useYuksin.y_jangan.y_jangan3),
        m_jangan1: gungShgjFunction.sangguk(useYuksin.m_jangan.m_jangan1),
        m_jangan2: gungShgjFunction.sangguk(useYuksin.m_jangan.m_jangan2),
        m_jangan3: gungShgjFunction.sangguk(useYuksin.m_jangan.m_jangan3),
        d_jangan1: gungShgjFunction.sangguk(useYuksin.d_jangan.d_jangan1),
        d_jangan2: gungShgjFunction.sangguk(useYuksin.d_jangan.d_jangan2),
        d_jangan3: gungShgjFunction.sangguk(useYuksin.d_jangan.d_jangan3),
        h_jangan1: gungShgjFunction.sangguk(useYuksin.h_jangan.h_jangan1),
        h_jangan2: gungShgjFunction.sangguk(useYuksin.h_jangan.h_jangan2),
        h_jangan3: gungShgjFunction.sangguk(useYuksin.h_jangan.h_jangan3),
      },
    };
    if (gukgubun === '길격') {
      let sangsin = gungshgjUtil.makeElementArray(gil.sangsin, shgj,gungshgjWord.sangsin(shgj.gukgubun),gungshgjYuksin.sangsin(shgj.gukgubun))
      shgj.sangsin = getYNP(sangsin);
      let sangsingisin = gungshgjUtil.makeElementArray(gil.sangsingisin, shgj,gungshgjWord.sangsingisin(shgj.gukgubun),gungshgjYuksin.sangsingisin(shgj.gukgubun))
      shgj.sangsingisin = getYNP(sangsingisin);
      let gusin = gungshgjUtil.makeElementArray(gil.gusin, shgj,gungshgjWord.gusin(shgj.gukgubun),gungshgjYuksin.gusin(shgj.gukgubun))
      shgj.gusin = getYNP(gusin);
      let gukgisin = gungshgjUtil.makeElementArray(gil.gukgisin, shgj,gungshgjWord.gukgisinGusingisin(shgj.gukgubun),gungshgjYuksin.gukgisinGusingisin(shgj.gukgubun))
      shgj.gukgisin = getYNP(gukgisin);
      let sanghwa = gungshgjUtil.makeElementArray(gil.sanghwa, shgj,gungshgjWord.sanghwa(shgj.gukgubun),gungshgjYuksin.sanghwa(shgj.gukgubun))
      shgj.sanghwa = getYNP(sanghwa);
      let sang_jae = gungshgjUtil.makeElementArray(gil.sang_jae, shgj,gungshgjWord.sang_jae(shgj.gukgubun),gungshgjYuksin.sang_jae(shgj.gukgubun))
      shgj.sang_jae = getYNP(sang_jae);
      let sulhwa = gungshgjUtil.makeElementArray(gil.sulhwa, shgj,gungshgjWord.sulhwa(shgj.gukgubun),gungshgjYuksin.sulhwa(shgj.gukgubun))
      shgj.sulhwa = getYNP(sulhwa);
      let sul_jae = gungshgjUtil.makeElementArray(gil.sul_jae, shgj,gungshgjWord.sul_jae(shgj.gukgubun),gungshgjYuksin.sul_jae(shgj.gukgubun))
      shgj.sul_jae = getYNP(sul_jae);
      let sang_hap = gungshgjUtil.makeElementArray(gil.sang_hap, shgj,gungshgjWord.sang_hap(shgj.gukgubun),gungshgjYuksin.sang_hap(shgj.gukgubun))
      shgj.sang_hap = getYNP(sang_hap);
      let sul_hap = gungshgjUtil.makeElementArray(gil.sul_hap, shgj,gungshgjWord.sul_hap(shgj.gukgubun),gungshgjYuksin.sul_hap(shgj.gukgubun))
      shgj.sul_hap = getYNP(sul_hap);
      let sengHwa_zeHwa = gungshgjUtil.makeElementArray(gil.sengHwa_zeHwa, shgj,gungshgjWord.sengHwa_zeHwa(shgj.gukgubun),gungshgjYuksin.sengHwa_zeHwa(shgj.gukgubun))
      shgj.sengHwa_zeHwa = getYNP(sengHwa_zeHwa);
      let sulHwa_zeHwa = gungshgjUtil.makeElementArray(gil.sulHwa_zeHwa, shgj,gungshgjWord.sulHwa_zeHwa(shgj.gukgubun),gungshgjYuksin.sulHwa_zeHwa(shgj.gukgubun))
      shgj.sulHwa_zeHwa = getYNP(sulHwa_zeHwa);
      let sengHwa_hapHwa = gungshgjUtil.makeElementArray(gil.sengHwa_hapHwa, shgj,gungshgjWord.sengHwa_hapHwa(shgj.gukgubun),gungshgjYuksin.sengHwa_hapHwa(shgj.gukgubun))
      shgj.sengHwa_hapHwa = getYNP(sengHwa_hapHwa);
      let sulHwa_hapHwa = gungshgjUtil.makeElementArray(gil.sulHwa_hapHwa, shgj,gungshgjWord.sulHwa_hapHwa(shgj.gukgubun),gungshgjYuksin.sulHwa_hapHwa(shgj.gukgubun))
      shgj.sulHwa_hapHwa = getYNP(sulHwa_hapHwa);
    } else if (gukgubun === '흉격') {
      let sangsin = gungshgjUtil.makeElementArray(hung.sangsin, shgj,gungshgjWord.sangsin(shgj.gukgubun),gungshgjYuksin.sangsin(shgj.gukgubun))
      shgj.sangsin = getYNP(sangsin);
      let sangsingisin = gungshgjUtil.makeElementArray(hung.sangsingisin, shgj,gungshgjWord.sangsingisin(shgj.gukgubun),gungshgjYuksin.sangsingisin(shgj.gukgubun))
      shgj.sangsingisin = getYNP(sangsingisin);
      let gusin = gungshgjUtil.makeElementArray(hung.gusin, shgj,gungshgjWord.gusin(shgj.gukgubun),gungshgjYuksin.gusin(shgj.gukgubun))
      shgj.gusin = getYNP(gusin);
      let gusingisin = gungshgjUtil.makeElementArray(hung.gusingisin, shgj,gungshgjWord.gukgisinGusingisin(shgj.gukgubun),gungshgjYuksin.gukgisinGusingisin(shgj.gukgubun))
      shgj.gusingisin = getYNP(gusingisin);
      let sanghwa = gungshgjUtil.makeElementArray(hung.sanghwa,'',gungshgjWord.sanghwa(shgj.gukgubun),gungshgjYuksin.sanghwa(shgj.gukgubun))
      shgj.sanghwa = getYNP(sanghwa);
      let sulhwa = gungshgjUtil.makeElementArray(hung.sulhwa,'',gungshgjWord.sulhwa(shgj.gukgubun),gungshgjYuksin.sulhwa(shgj.gukgubun))
      shgj.sulhwa = getYNP(sulhwa);
      let sul_jae = gungshgjUtil.makeElementArray(hung.sul_jae,'',gungshgjWord.sul_jae(shgj.gukgubun),gungshgjYuksin.sul_jae(shgj.gukgubun))
      shgj.sul_jae = getYNP(sul_jae);

      if (useGyouk === '상관격' || useGyouk === '편관격') {
        let sul_hap = gungshgjUtil.makeElementArray(hung.sul_hap,'',gungshgjWord.sul_hap(shgj.gukgubun),gungshgjYuksin.sul_hap(shgj.gukgubun))
        shgj.sul_hap = getYNP(sul_hap);
        let sulHwa_zeHwa = gungshgjUtil.makeElementArray(hung.sulHwa_zeHwa,'',gungshgjWord.sulHwa_zeHwa(shgj.gukgubun),gungshgjYuksin.sulHwa_zeHwa(shgj.gukgubun))
        shgj.sulHwa_zeHwa = getYNP(sulHwa_zeHwa);
        let sengHwa_hapHwa = gungshgjUtil.makeElementArray(hung.sengHwa_hapHwa, shgj,gungshgjWord.sengHwa_hapHwa(shgj.gukgubun),gungshgjYuksin.sengHwa_hapHwa(shgj.gukgubun))
        shgj.sengHwa_hapHwa = getYNP(sengHwa_hapHwa);
        let sulHwa_hapHwa = gungshgjUtil.makeElementArray(hung.sulHwa_hapHwa, shgj,gungshgjWord.sulHwa_hapHwa(shgj.gukgubun),gungshgjYuksin.sulHwa_hapHwa(shgj.gukgubun))
        shgj.sulHwa_hapHwa = getYNP(sulHwa_hapHwa);
      }
      let yido = gungshgjUtil.makeElementArrayYido(hung.yido)
      shgj.yido = getYNP(yido);
    }
    useShgj = shgj;

    resolve('');
  }).catch((error) => {
    console.log(error);
    return error;
});
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
    //    "y_land",
    'm_sky',
    //   "m_land",
    'd_sky',
    //   "d_land",
    'h_sky',
    //   "h_land",
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
    word: obj[0].word,
    yuksin: obj[0].yuksin,
  };
  return result;
}
module.exports = gungShgjFunc;
