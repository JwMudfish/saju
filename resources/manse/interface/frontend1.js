var interface = {};
//상생상극함수
const walNo = require('./seunWalNo/walNo');
const noryeongShgj = require('./noryeongShgj/no');
const counseling = require('./counseling');
const report = require('../report/report');
const lightReport = require('../report/lightReport');
const proReport = require('../report/proReport');
const selport = require('../report/selport');
const pdfPort = require('../report/pdf');
const myPage = require('../myPage/myPage');
const GyeokYongsinTitle = require('../../test/contents_myPage');
interface.interface = function (contents) {
  return new Promise((resolve) => {
    if (
      contents === 'all' ||
      contents === undefined ||
      String(contents).trim() === ''
    ) {
      // 월운 제거 함수
      // let walun = walNo.walNo();
      myManseInterF.info = myManse.info;
      myManseInterF.Solar = useSolar;
      myManseInterF.Lunar = useLunar;
      myManseInterF.julib = myManse.julib;
      myManseInterF.julibGanji = myManse.julibGanji;
      myManseInterF.junggi = myManse.junggi;
      myManseInterF.junggiGanji = myManse.junggiGanji;
      myManseInterF.pillar = myManse.pillar;
      myManseInterF.umYangOHang = myManse.umYangOHang;
      myManseInterF.hapChung = useHapChung;
      myManseInterF.yukSin = myManse.yukSin;
      myManseInterF.ryeong = {
        yongsin: myManse.ryeong.yongsin,
        saryeong: myManse.ryeong.saryeong,
      };
      myManseInterF.manseSSSG = useManseSSSG

      myManseInterF.Gyouk = myManse.Gyouk;
      myManseInterF.GyoukYongsinTitle = GyeokYongsinTitle.randum().title;
      myManseInterF.GyoukProperty = useGyoukProperty;
      // myManseInterF.seunElement = useSeunElement
      myManseInterF.deunseun = {
        deun: {
          dus: deunsu(),
          deun: useDeunSeun.deun,
          deunYuksin: useDeunSeun.deunYuksin,
          deunOhang: useDeunSeun.deunOhang,
        },
        // seun: walun,
        seun:  useDeunSeun.seun, 

      };
      // myManseInterF.deunseunV2 = useDeunSeunV2
      // myManseInterF.deunseun = useDeunSeun;
    } else if (contents === 'ryeongShgj') {
      /*myManseInterF.pillar = myManse.pillar;
      myManseInterF.Gyouk = myManse.Gyouk;
      myManseInterF.palpum = usePalPum;
      myManseInterF.ryeong = checkRyeong();
      myManseInterF.shgj = checkShgj(); */
      report.interface()

    } else if (contents === 'lightReport') {
      /*myManseInterF.pillar = myManse.pillar;
      myManseInterF.Gyouk = myManse.Gyouk;
      myManseInterF.palpum = usePalPum;
      myManseInterF.ryeong = checkRyeong();
      myManseInterF.shgj = checkShgj(); */
      lightReport.interface()

    } else if (contents === 'proReport') {
      /*myManseInterF.pillar = myManse.pillar;
      myManseInterF.Gyouk = myManse.Gyouk;
      myManseInterF.palpum = usePalPum;
      myManseInterF.ryeong = checkRyeong();
      myManseInterF.shgj = checkShgj(); */
      proReport.interface()

    } else if (contents === 'counseling') {
      counseling.interface(checkRyeong(), checkShgj())
    }
    else if (contents === 'selport') {
      selport.interface()
    }
    else if (contents === 'myPage') {
      myPage.interface()
    }
    else if (contents === 'pdfReport') {
      pdfPort.interface()
    }
    else if (contents === 'admin') {
      admin()
    }
    resolve('');
  }).catch((error) => {
    console.log(error);
    return error;
});
};

function admin () {
  myManseInterF.deunseun = {
    deun: {
      dus: deunsu(),
      deun: useDeunSeun.deun,
      deunYuksin: useDeunSeun.deunYuksin,
      deunOhang: useDeunSeun.deunOhang,
    },
    // seun: walun,
    seun:  useDeunSeun.seun, 
  }
}

function checkShgj() {
  let result = {};
  result.gukgubun = useShgj.gukgubun;
  result.sangsin = useShgj.sangsin;
  result.sangsin.word = word(useShgj.sangsin, 'sangsin', 'shgj');
  result.sangsin.yuksin = yuksin(useShgj.sangsin, 'sangsin', 'shgj');
  result.sangsingisin = useShgj.sangsingisin;
  result.sangsingisin.word = word(useShgj.sangsingisin, 'sangsingisin', 'shgj');
  result.sangsingisin.yuksin = yuksin(
    useShgj.sangsingisin,
    'sangsingisin',
    'shgj'
  );
  result.gusin = useShgj.gusin;
  result.gusin.word = word(useShgj.gusin, 'gusin', 'shgj');
  result.gusin.yuksin = yuksin(useShgj.gusin, 'gusin', 'shgj');
  if (useShgj.gusingisin === undefined) {
  } else {
    result.gusingisin = useShgj.gusingisin;
    result.gusingisin.word = word(useShgj.gusingisin, 'gusingisin', 'shgj');
    result.gusingisin.yuksin = yuksin(useShgj.gusingisin, 'gusingisin', 'shgj');
  }
  if (useShgj.gukgisin === undefined) {
  } else {
    result.gukgisin = useShgj.gukgisin;
    result.gukgisin.word = word(useShgj.gukgisin, 'gukgisin', 'shgj');
    result.gukgisin.yuksin = yuksin(useShgj.gukgisin, 'gukgisin', 'shgj');
  }
  result.sanghwa = useShgj.sanghwa;
  result.sanghwa.word = word(useShgj.sanghwa, 'sanghwa', 'shgj');
  result.sanghwa.yuksin = yuksin(useShgj.sanghwa, 'sanghwa', 'shgj');
  result.sulhwa = useShgj.sulhwa;
  result.sulhwa.word = word(useShgj.sulhwa, 'sulhwa', 'shgj');
  result.sulhwa.yuksin = yuksin(useShgj.sulhwa, 'sulhwa', 'shgj');
  if (useShgj.sang_jae === undefined) {
  } else {
    result.sang_jae = useShgj.sang_jae;
    result.sang_jae.word = word(useShgj.sang_jae, 'sang_jae', 'shgj');
    result.sang_jae.yuksin = yuksin(useShgj.sang_jae, 'sang_jae', 'shgj');
  }
  if (useShgj.sul_jae === undefined) {
  } else {
    result.sul_jae = useShgj.sul_jae;
    result.sul_jae.word = word(useShgj.sul_jae, 'sul_jae', 'shgj');
    result.sul_jae.yuksin = yuksin(useShgj.sul_jae, 'sul_jae', 'shgj');
  }
  if (useShgj.yido === undefined) {
  } else {
    result.yido = useShgj.yido;
    result.yido.word = word(useShgj.yido);
    result.yido.yuksin = yuksin(useShgj.yido);
  }
  if (useShgj.sang_hap === undefined) {
  } else {
    result.sang_hap = useShgj.sang_hap;
    result.sang_hap.word = word(useShgj.sang_hap, 'sang_hap', 'shgj');
    result.sang_hap.yuksin = yuksin(useShgj.sang_hap, 'sang_hap', 'shgj');
  }
  if (useShgj.sul_hap === undefined) {
  } else {
    result.sul_hap = useShgj.sul_hap;
    result.sul_hap.word = word(useShgj.sul_hap, 'sul_hap', 'shgj');
    result.sul_hap.yuksin = yuksin(useShgj.sul_hap, 'sul_hap', 'shgj');
  }
  if (useShgj.sengHwa_zeHwa === undefined) {
  } else {
    result.sengHwa_zeHwa = useShgj.sengHwa_zeHwa;
    result.sengHwa_zeHwa.word = word(
      useShgj.sengHwa_zeHwa,
      'sengHwa_zeHwa',
      'shgj'
    );
    result.sengHwa_zeHwa.yuksin = yuksin(
      useShgj.sengHwa_zeHwa,
      'sengHwa_zeHwa',
      'shgj'
    );
  }
  if (useShgj.sulHwa_zeHwa === undefined) {
  } else {
    result.sulHwa_zeHwa = useShgj.sulHwa_zeHwa;
    result.sulHwa_zeHwa.word = word(
      useShgj.sulHwa_zeHwa,
      'sulHwa_zeHwa',
      'shgj'
    );
    result.sulHwa_zeHwa.yuksin = yuksin(
      useShgj.sulHwa_zeHwa,
      'sulHwa_zeHwa',
      'shgj'
    );
  }
  if (useShgj.sengHwa_hapHwa === undefined) {
  } else {
    result.sengHwa_hapHwa = useShgj.sengHwa_hapHwa;
    result.sengHwa_hapHwa.word = word(
      useShgj.sengHwa_hapHwa,
      'sengHwa_hapHwa',
      'shgj'
    );
    result.sengHwa_hapHwa.yuksin = yuksin(
      useShgj.sengHwa_hapHwa,
      'sengHwa_hapHwa',
      'shgj'
    );
  }
  if (useShgj.sulHwa_hapHwa === undefined) {
  } else {
    result.sulHwa_hapHwa = useShgj.sulHwa_hapHwa;
    result.sulHwa_hapHwa.word = word(
      useShgj.sulHwa_hapHwa,
      'sulHwa_hapHwa',
      'shgj'
    );
    result.sulHwa_hapHwa.yuksin = yuksin(
      useShgj.sulHwa_hapHwa,
      'sulHwa_hapHwa',
      'shgj'
    );
  }

  return result;
}

function word(obj, nameObj, check) {
  let result = '';
  let word = [
    usePillar.y_sky,
    usePillar.m_sky,
    usePillar.d_sky,
    usePillar.h_sky,
    usejijanggan.y_jangan.y_jangan1,
    usejijanggan.y_jangan.y_jangan2,
    usejijanggan.y_jangan.y_jangan3,
    usejijanggan.m_jangan.m_jangan1,
    usejijanggan.m_jangan.m_jangan2,
    usejijanggan.m_jangan.m_jangan3,
    usejijanggan.d_jangan.d_jangan1,
    usejijanggan.d_jangan.d_jangan2,
    usejijanggan.d_jangan.d_jangan3,
    usejijanggan.h_jangan.h_jangan1,
    usejijanggan.h_jangan.h_jangan2,
    usejijanggan.h_jangan.h_jangan3,
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
  if (obj.exist === 'Y') {
    for (let i = 0; i < name.length; i++) {
      if (name[i].includes(obj.position[0]) === true) {
        result = word[i];
        break;
      }
    }
  } else {
    result = noryeongShgj.checkWord(nameObj, useShgj.gukgubun);
  }
  return result;
}

function yuksin(obj, nameObj, check) {
  let result = '';
  let yuksin = [
    myManse.yukSin.y_sky,
    myManse.yukSin.m_sky,
    myManse.yukSin.d_sky,
    myManse.yukSin.h_sky,
    myManse.yukSin.y_jangan.y_jangan1,
    myManse.yukSin.y_jangan.y_jangan2,
    myManse.yukSin.y_jangan.y_jangan3,
    myManse.yukSin.m_jangan.m_jangan1,
    myManse.yukSin.m_jangan.m_jangan2,
    myManse.yukSin.m_jangan.m_jangan3,
    myManse.yukSin.d_jangan.d_jangan1,
    myManse.yukSin.d_jangan.d_jangan2,
    myManse.yukSin.d_jangan.d_jangan3,
    myManse.yukSin.h_jangan.h_jangan1,
    myManse.yukSin.h_jangan.h_jangan2,
    myManse.yukSin.h_jangan.h_jangan3,
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
  if (obj.exist === 'Y') {
    for (let i = 0; i < name.length; i++) {
      if (name[i].includes(obj.position[0]) === true) {
        result = yuksin[i];
        break;
      }
    }
  } else {
    result = noryeongShgj.checkYuksin(nameObj, useShgj.gukgubun);
  }
  return result;
}

function deunsu() {
  let result;
  result = {
    one: 0 + Number(useDeunSeun.dus),
    two: 10 + Number(useDeunSeun.dus),
    three: 20 + Number(useDeunSeun.dus),
    four: 30 + Number(useDeunSeun.dus),
    five: 40 + Number(useDeunSeun.dus),
    six: 50 + Number(useDeunSeun.dus),
    seven: 60 + Number(useDeunSeun.dus),
    eight: 70 + Number(useDeunSeun.dus),
    nine: 80 + Number(useDeunSeun.dus),
    ten: 90 + Number(useDeunSeun.dus),
  };
  return result;
}
module.exports = interface;
