var interface = {};
//상생상극함수

const walNo = require('./seunWalNo/walNo');
interface.interface = function (contents) {
  return new Promise((resolve) => {
    if (
      contents === 'all' ||
      contents === undefined ||
      String(contents).trim() === ''
    ) {
      all();
    } else if (contents === 'deunseun') {
      deunseun();
    } else if (contents === 'deun') {
      deun();
    } else if (contents === 'seunWalYes') {
      seunWalYes();
    } else if (contents === 'seunWalNo') {
      seunWalNo();
    } else if (contents === 'manseall') {
      manseAll();
    } else if (contents === 'gys') {
      gys();
    } else if (contents === 'pillar') {
      pillar();
    } else if (contents === 'yongsin') {
      yongsin();
    } else if (contents === 'saryeong') {
      saryeong();
    } else if (contents === 'heuisin') {
      heuisin();
    } else if (contents === 'junghwa') {
      junghwa();
    } else if (contents === 'junghwa_gisin') {
      junghwa_gisin();
    } else if (contents === 'jisok') {
      jisok();
    } else if (contents === 'jisok_gisin') {
      jisok_gisin();
    } else if (contents === 'hwakjang') {
      hwakjang();
    } else if (contents === 'hwakjang_gisin') {
      hwakjang_gisin();
    } else if (contents === 'um_heuisin_gisin') {
      um_heuisin_gisin();
    } else if (contents === 'geuk_heuisin_gisin') {
      geuk_heuisin_gisin();
    } else if (contents === 'um_gisin') {
      um_gisin();
    } else if (contents === 'geuk_gisin') {
      geuk_gisin();
    } else if (contents === 'gukgubun') {
      gukgubun();
    } else if (contents === 'sangsin') {
      sangsin();
    } else if (contents === 'sangsingisin') {
      sangsingisin();
    } else if (contents === 'gusin') {
      gusin();
    } else if (contents === 'gusingisin') {
      gusingisin();
    } else if (contents === 'sanghwa') {
      sanghwa();
    } else if (contents === 'sulhwa') {
      sulhwa();
    } else if (contents === 'sul_jae') {
      sul_jae();
    } else if (contents === 'yido') {
      yido();
    } else if (contents === 'gukgisin') {
      gukgisin();
    } else if (contents === 'sang_hap') {
      sang_hap();
    } else if (contents === 'sul_hap') {
      sul_hap();
    } else if (contents === 'ryeongAll') {
      ryeongAll();
    } else if (contents === 'shgjAll') {
      shgjAll();
    } else if (contents === 'sang_jae') {
      sang_jae();
    }
    resolve('');
  }).catch((error) => {
    console.log(error);
    return error;
});
};
//전부
function all() {
  myManseInterF.info = myManse.info;
  myManseInterF.julib = myManse.julib;
  myManseInterF.julibGanji = myManse.julibGanji;

  myManseInterF.junggi = myManse.junggi;
  myManseInterF.junggiGanji = myManse.junggiGanji;
  myManseInterF.pillar = myManse.pillar;
  myManseInterF.umYangOHang = myManse.umYangOHang;
  myManseInterF.hapChung = useHapChung;
  myManseInterF.jijangganUse = usejijangganUse;
  myManseInterF.yukSin = myManse.yukSin;
  myManseInterF.ryeong = myManse.ryeong;
  myManseInterF.basicFunc = useBasicFunc;
  myManseInterF.Gyouk = {
    Gyouk: myManse.Gyouk,
    GyoukProperty: useGyoukProperty,
  };
  myManseInterF.palpum = usePalPum;
  myManseInterF.shgj = useShgj;
  myManseInterF.deunseun = useDeunSeun;
}

//대운세운대운수
function deunseun() {
  myManseInterF.deunseun = useDeunSeun;
}
//대운수,대운
function deun() {
  myManseInterF.deun = {
    dus: useDeunSeun.dus,
    dus: useDeunSeun.deun,
  };
}
//세운(월운포함)
function seunWalYes() {
  myManseInterF.seun = useDeunSeun.seun;
}

//만세력에 필요한 모든정보
function manseAll() {
  myManseInterF.info = myManse.info;
  myManseInterF.julib = myManse.julib;
  myManseInterF.julibGanji = myManse.julibGanji;
  myManseInterF.junggi = myManse.junggi;
  myManseInterF.junggiGanji = myManse.junggiGanji;
  myManseInterF.pillar = myManse.pillar;
  myManseInterF.yukSin = myManse.yukSin;
  myManseInterF.umYangOHang = myManse.umYangOHang;
  myManseInterF.ryeong = {
    yongsin: myManse.ryeong.yongsin,
    saryeong: myManse.ryeong.saryeong,
  };
  myManseInterF.Gyouk = myManse.Gyouk;

  myManseInterF.deunseun = useDeunSeun;
}

//격국용신사령
function gys() {
  myManseInterF.yongsin = myManse.ryeong.yongsin;
  myManseInterF.saryeong = myManse.ryeong.saryeong;
  myManseInterF.Gyouk = myManse.Gyouk;
}

//원국
function pillar() {
  myManseInterF.pillar = myManse.pillar;
  myManseInterF.yukSin = myManse.yukSin;
  myManseInterF.umYangOHang = myManse.umYangOHang;
}

//세운(월운미포함)
function seunWalNo() {
  myManseInterF.seun = walNo.walNo();
}

//령과 관련된 모든정보
function ryeongAll() {
  myManseInterF.ryeong = myManse.ryeong;
}
//용신
function yongsin() {
  myManseInterF.yongsin = myManse.ryeong.yongsin;
}
//사령
function saryeong() {
  myManseInterF.saryeong = myManse.ryeong.saryeong;
}

//희신
function heuisin() {
  myManseInterF.heuisin = myManse.ryeong.heuisin;
}
//중화
function junghwa() {
  myManseInterF.junghwa = myManse.ryeong.junghwa;
}
//중화기신
function junghwa_gisin() {
  myManseInterF.junghwa_gisin = myManse.ryeong.junghwa_gisin;
}

//지속
function jisok() {
  myManseInterF.jisok = myManse.ryeong.jisok;
}
//지속기신
function jisok_gisin() {
  myManseInterF.jisok_gisin = myManse.ryeong.jisok_gisin;
}

//확장
function hwakjang() {
  myManseInterF.hwakjang = myManse.ryeong.hwakjang;
}

//확장기신
function hwakjang_gisin() {
  myManseInterF.hwakjang_gisin = myManse.ryeong.hwakjang_gisin;
}

//um_heuisin_gisin
function um_heuisin_gisin() {
  myManseInterF.um_heuisin_gisin = myManse.ryeong.um_heuisin_gisin;
}

//geuk_heuisin_gisin
function geuk_heuisin_gisin() {
  myManseInterF.geuk_heuisin_gisin = myManse.ryeong.geuk_heuisin_gisin;
}

//um_gisin
function um_gisin() {
  myManseInterF.um_gisin = myManse.ryeong.um_gisin;
}

//geuk_gisin
function geuk_gisin() {
  myManseInterF.geuk_gisin = myManse.ryeong.geuk_gisin;
}

//전부
function shgjAll() {
  myManseInterF.shgj = useShgj;
}
//격구분
function gukgubun() {
  myManseInterF.gukgubun = useShgj.gukgubun;
}
//상신
function sangsin() {
  myManseInterF.sangsin = useShgj.sangsin;
}

//상신기신
function sangsingisin() {
  myManseInterF.sangsingisin = useShgj.sangsingisin;
}

//구신
function gusin() {
  myManseInterF.gusin = useShgj.gusin;
}
//구신기신
function gusingisin() {
  if (useShgj.gusingisin === {}) {
    myManseInterF = {
      message: 'Error 구신기신을 지원하지 않습니다',
      errorCode: 'NoGusingisin',
    };
  } else {
    myManseInterF.gusingisin = useShgj.gusingisin;
  }
}
//생화
function sanghwa() {
  myManseInterF.sanghwa = useShgj.sanghwa;
}
//설화
function sulhwa() {
  myManseInterF.sulhwa = useShgj.sulhwa;
}

//생재
function sang_jae() {
  if (useShgj.sang_jae === undefined) {
    myManseInterF = {
      message: 'Error 생재를 지원하지 않습니다',
      errorCode: 'NoSangJae',
    };
  } else {
    myManseInterF.sang_jae = useShgj.sang_jae;
  }
}
//설재
function sul_jae() {
  myManseInterF.sul_jae = useShgj.sul_jae;
}
//이도
function yido() {
  if (useShgj.yido === undefined) {
    myManseInterF = {
      message: 'Error 이도를 지원하지 않습니다',
      errorCode: 'NoYido',
    };
  } else {
    myManseInterF.yido = useShgj.yido;
  }
}
//격기신
function gukgisin() {
  if (useShgj.gukgisin === undefined) {
    myManseInterF = {
      message: 'Error 격기신을 지원하지 않습니다',
      errorCode: 'NoGukgisin',
    };
  } else {
    myManseInterF.gukgisin = useShgj.gukgisin;
  }
}
//생합
function sang_hap() {
  if (useShgj.sang_hap === undefined) {
    myManseInterF = {
      message: 'Error 생합을 지원하지 않습니다',
      errorCode: 'NoSanghap',
    };
  } else {
    myManseInterF.sang_hap = useShgj.sang_hap;
  }
}
//설합
function sul_hap() {
  if (useShgj.sul_hap === undefined) {
    myManseInterF = {
      message: 'Error 설합을 지원하지 않습니다',
      errorCode: 'NoSulhap',
    };
  } else {
    myManseInterF.sul_hap = useShgj.sul_hap;
  }
}

module.exports = interface;
