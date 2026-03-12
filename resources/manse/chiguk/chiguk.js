var chiguk = {};
const hapChug = require('../hapChug/hapChug');
const umYangFunc = require('../umYangOHang/umYang');
const oHangFunc = require('../umYangOHang/oHang');
const sssg = require('../yuksin/getSangSengSangGuk');
const yuksin = require('../yuksin/getYukSin');
const basicFunc = require('../basicFunc/basicFunc');
var moment = require('moment');
chiguk.chiguk = function () {
  let result;
  let gyouk;
  if (
    usePillar.m_land === '인' ||
    usePillar.m_land === '신' ||
    usePillar.m_land === '사' ||
    usePillar.m_land === '해'
  ) {
    gyouk = shangji_guk();
  } else if (
    usePillar.m_land === '자' ||
    usePillar.m_land === '오' ||
    usePillar.m_land === '묘' ||
    usePillar.m_land === '유'
  ) {
    gyouk = wangji_guk();
  } else if (
    usePillar.m_land === '진' ||
    usePillar.m_land === '술' ||
    usePillar.m_land === '축' ||
    usePillar.m_land === '미'
  ) {
    gyouk = bo_goji_guk();
  }
  if (gyouk === '비견') {
    result = '건록격';
  } else if (gyouk === '겁재') {
    result = '양인격';
  } else if (gyouk === '편인') {
    result = '편인격';
  } else if (gyouk === '정인') {
    result = '정인격';
  } else if (gyouk === '편재') {
    result = '편재격';
  } else if (gyouk === '정재') {
    result = '정재격';
  } else if (gyouk === '식신') {
    result = '식신격';
  } else if (gyouk === '상관') {
    result = '상관격';
  } else if (gyouk === '정관') {
    result = '정관격';
  } else if (gyouk === '편관') {
    result = '편관격';
  }
  return result;
};

function shangji_guk() {
  let result = '';
  if (useUmYangOHang.d_sky.umYang === '음') {
    useGyoukProperty.push('UM');
  }
  if (usejijangganUse.yong.m_land.m_jangan2 === 'm_youngsa') {
    useGyoukProperty.push('hap');
  }
  if (useRyeong.yongsin !== useRyeong.saryeong) {
    useGyoukProperty.push('sa_ryeong');
  }
  if (useBasicFunc.wal_togan.wal_togan2 === 'Y') {
    useGyoukProperty.push('togan');
  }

  result = useYuksin.m_jangan.m_jangan3;
  return result;
}

function wangji_guk() {
  let result = '';

  if (useBasicFunc.wal_togan.wal_togan4 === 1) {
    result = useYuksin.m_jangan.m_jangan3;
  } else if (useBasicFunc.wal_togan.wal_togan4 === 2) {
    if (
      useYuksin.m_jangan.m_jangan3 === '겁재' ||
      useYuksin.m_jangan.m_jangan3 === '비견'
    ) {
      result = useYuksin.m_jangan.m_jangan3;
    } else {
      result = useYuksin.m_jangan.m_jangan1;
    }

    useGyoukProperty.push('togan');
  } else if (useBasicFunc.wal_togan.wal_togan4 === 3) {
    if (useRyeong.saryeong === usejijanggan.m_jangan.m_jangan3) {
      result = useYuksin.m_jangan.m_jangan3;
      useGyoukProperty.push('honjap');
    } else {
      if (
        useYuksin.m_jangan.m_jangan3 === '겁재' ||
        useYuksin.m_jangan.m_jangan3 === '비견'
      ) {
        result = useYuksin.m_jangan.m_jangan3;
      } else {
        result = useYuksin.m_jangan.m_jangan1;
      }
      useGyoukProperty.push('honjap');
    }
  } else {
    result = useYuksin.m_jangan.m_jangan3;
  }
  return result;
}

function bo_goji_guk() {
  let result = '';
  if (
    hapChug.samhap(
      usePillar.m_land,
      usePillar.y_land,
      usePillar.d_land,
      usePillar.h_land,
      'm'
    ) !== ''
  ) {
    result = youngsa_goji();
  } else {
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
        .asHours() >= 288
    ) {
      useBasicFunc.wal_togan.wal_togan4 = basicFunc.walTogan4(3);
      result = after_goji();
    } else {
      useBasicFunc.wal_togan.wal_togan4 = basicFunc.walTogan4(1);
      result = before_goji();
      //useGyoukProperty.push("주왕");
    }
  }
  return result;
}

function youngsa_goji() {
  let result = '';
  useBasicFunc.wal_togan.wal_togan4 = basicFunc.walTogan4(2);
  if (useBasicFunc.wal_togan.wal_togan4 === 1) {
    result = useYuksin.m_jangan.m_jangan2;
  } else if (useBasicFunc.wal_togan.wal_togan4 === 2) {
    let changeJungPyun;
    if (useUmYangOHang.m_jangan.m_jangan2.umYang === '음') {
      changeJungPyun = '양';
    } else {
      changeJungPyun = '음';
    }
    let resultYuksin = yuksin.yuksin(
      sssg.sssg(
        useUmYangOHang.d_sky.oHang,
        useUmYangOHang.m_jangan.m_jangan2.oHang
      ),
      changeJungPyun
    );
    useGyoukProperty.push(useYuksin.m_jangan.m_jangan2);
    // result = chiguk(resultYuksin);

    result = resultYuksin;
  } else if (useBasicFunc.wal_togan.wal_togan4 === 3) {
    let changeJungPyun;
    if (useUmYangOHang.m_jangan.m_jangan2.umYang === '음') {
      changeJungPyun = '양';
    } else {
      changeJungPyun = '음';
    }
    let resultYuksin = yuksin.yuksin(
      sssg.sssg(
        useUmYangOHang.d_sky.oHang,
        useUmYangOHang.m_jangan.m_jangan2.oHang
      ),
      changeJungPyun
    );
    useGyoukProperty.push(resultYuksin);
    //result = chiguk(useYuksin.m_jangan.m_jangan1);
    result = useYuksin.m_jangan.m_jangan2;
  } else {
    result = useYuksin.m_jangan.m_jangan2;
  }

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
  if (result === '비견' || result === '겁재') {
    if (
      moment
        .duration(
          moment(myBirth, 'YYYY-MM-DD HH:mm:ss ').diff(
            moment(myManse.julib, 'YYYY-MM-DD HH:mm:ss ')
          )
        )
        .asHours() >= 288
    ) {
      useBasicFunc.wal_togan.wal_togan4 = basicFunc.walTogan4(3);
      result = after_goji();
      useGyoukProperty.push('주왕');
    } else {
      useBasicFunc.wal_togan.wal_togan4 = basicFunc.walTogan4(1);
      result = before_goji();
      useGyoukProperty.push('주왕');
    }
  }
  return result;
}
function after_goji() {
  let result;
  let word = basicFunc.walTogan4To();
  let unoh = {
    umYang: umYangFunc.umYang(word, 1),
    oHang: oHangFunc.oHang(word),
  };
  result = yuksin.yuksin(
    sssg.sssg(useUmYangOHang.d_sky.oHang, unoh.oHang),
    unoh.umYang
  );

  if (useBasicFunc.wal_togan.wal_togan4 === 2) {
    useGyoukProperty.push('주왕');
  } else if (useBasicFunc.wal_togan.wal_togan4 === 3) {
    useGyoukProperty.push(word);
  }
  if (result === '비견' || result === '겁재') {
    useGyoukProperty.push('주왕');
    useBasicFunc.wal_togan.wal_togan4 = basicFunc.walTogan4(1);
    result = before_goji();
  }

  return result;
}

function before_goji() {
  let result = '';
  if (useBasicFunc.wal_togan.wal_togan4 === 1) {
    result = useYuksin.m_jangan.m_jangan1;
  } else if (useBasicFunc.wal_togan.wal_togan4 === 2) {
    let changeJungPyun;
    if (useUmYangOHang.m_jangan.m_jangan1.umYang === '음') {
      changeJungPyun = '양';
    } else {
      changeJungPyun = '음';
    }
    let resultYuksin = yuksin.yuksin(
      sssg.sssg(
        useUmYangOHang.d_sky.oHang,
        useUmYangOHang.m_jangan.m_jangan1.oHang
      ),
      changeJungPyun
    );
    useGyoukProperty.push(useYuksin.m_jangan.m_jangan1);
    // result = chiguk(resultYuksin);
    result = resultYuksin;

  } else if (useBasicFunc.wal_togan.wal_togan4 === 3) {
    let changeJungPyun;
    if (useUmYangOHang.m_jangan.m_jangan1.umYang === '음') {
      changeJungPyun = '양';
    } else {
      changeJungPyun = '음';
    }
    let resultYuksin = yuksin.yuksin(
      sssg.sssg(
        useUmYangOHang.d_sky.oHang,
        useUmYangOHang.m_jangan.m_jangan1.oHang
      ),
      changeJungPyun
    );
    useGyoukProperty.push(resultYuksin);
    //result = chiguk(useYuksin.m_jangan.m_jangan1);
    result = useYuksin.m_jangan.m_jangan1;
  } else {
    result = useYuksin.m_jangan.m_jangan1;
  }
  if (result === '비견' || result === '겁재') {
    useGyoukProperty.push('주왕');
    useBasicFunc.wal_togan.wal_togan4 = basicFunc.walTogan4(3);
    result = after_goji();
  }
  return result;
}

module.exports = chiguk;
