var interface = {};
const korToKan = require('../../manseUtil/korToHan')
interface.interface = function (contents) {
  return new Promise((resolve) => {
    if (contents === 'profile') {
      myManseInterF.kan = {
        gyouk : myManse.Gyouk,
        yongsin : korToKan.changeChunGan(myManse.ryeong.yongsin),
        ilgan : korToKan.changeChunGan(usePillar.d_sky),
      }
      myManseInterF.kor = {
        gyouk : myManse.Gyouk,
        yongsin : myManse.ryeong.yongsin,
        ilgan : usePillar.d_sky
      }
    }
    else if  (contents === 'manse') {
      myManseInterF.pillar = manseFunc();
      myManseInterF.Solar = useSolar;
      myManseInterF.Lunar = useLunar;
      myManseInterF.gender = myManse.info.gender;
      myManseInterF.age = myManse.info.age;
      myManseInterF.julib = myManse.julib;
      myManseInterF.julibGanji = myManse.julibGanji;
      myManseInterF.junggi = myManse.junggi;
      myManseInterF.junggiGanji = myManse.junggiGanji;
      myManseInterF.jijanguan = jijianggunFunc();
      myManseInterF.wolRyeong = korToKan.changeJIJI( getWolRyeong()[0])+korToKan.changeJIJI( getWolRyeong()[1]),
      myManseInterF.dangryeong = korToKan.changeChunGan(myManse.ryeong.yongsin),
      myManseInterF.saryeong =korToKan.changeChunGan(myManse.ryeong.saryeong),
      myManseInterF.ilgan = korToKan.changeChunGan(usePillar.d_sky),
      myManseInterF.deunseunV2 = useDeunSeunV2
    }
    resolve('');
  }).catch((error) => {
    console.log(error);
    return error;
});
};

function jijianggunFunc () {
  let jijanguan = {
    h_land : {
      jangan1:
      {
        word: korToKan.changeChunGan(usejijanggan.h_jangan.h_jangan1),
        yuksin:  myManse.yukSin.h_jangan.h_jangan1
      },
     
      jangan2:  {
        word: korToKan.changeChunGan(usejijanggan.h_jangan.h_jangan2),
        yuksin:  myManse.yukSin.h_jangan.h_jangan2
      },
      jangan3:{
        word: korToKan.changeChunGan(usejijanggan.h_jangan.h_jangan3),
        yuksin:  myManse.yukSin.h_jangan.h_jangan3
      },
    },
    d_land : {

      jangan1:      {
        word: korToKan.changeChunGan(usejijanggan.d_jangan.d_jangan1),
        yuksin:  myManse.yukSin.d_jangan.d_jangan1
      },
      jangan2:      {
        word: korToKan.changeChunGan(usejijanggan.d_jangan.d_jangan2),
        yuksin:  myManse.yukSin.d_jangan.d_jangan2
      },
      jangan3: {
        word: korToKan.changeChunGan(usejijanggan.d_jangan.d_jangan3),
        yuksin:  myManse.yukSin.d_jangan.d_jangan3
      },
    },
    m_land : {
      jangan1:{
        word: korToKan.changeChunGan(usejijanggan.m_jangan.m_jangan1),
        yuksin:  myManse.yukSin.m_jangan.m_jangan1
      },
      jangan2:{
        word: korToKan.changeChunGan(usejijanggan.m_jangan.m_jangan2),
        yuksin:  myManse.yukSin.m_jangan.m_jangan2
      },
      jangan3:{
        word: korToKan.changeChunGan(usejijanggan.m_jangan.m_jangan3),
        yuksin:  myManse.yukSin.m_jangan.m_jangan3
      },
    },
    y_land : {
      jangan1:{
        word: korToKan.changeChunGan(usejijanggan.y_jangan.y_jangan1),
        yuksin:  myManse.yukSin.y_jangan.y_jangan1
      },
      jangan2:{
        word: korToKan.changeChunGan(usejijanggan.y_jangan.y_jangan2),
        yuksin:  myManse.yukSin.y_jangan.y_jangan2
      },
      jangan3:{
        word: korToKan.changeChunGan(usejijanggan.y_jangan.y_jangan3),
        yuksin:  myManse.yukSin.y_jangan.y_jangan3
      },
    },
  }

  return jijanguan
}

function manseFunc () {
  let manse= {
    y_sky:{
      word:korToKan.changeChunGan(myManse.pillar.y_sky),
      ohang:ohangColor(useUmYangOHang.y_sky.oHang),
      yuksin: myManse.yukSin.y_sky
    },
    m_sky:{
      word:korToKan.changeChunGan(myManse.pillar.m_sky),
      ohang:ohangColor(useUmYangOHang.m_sky.oHang),
      yuksin: myManse.yukSin.m_sky
    },
    d_sky:{
      word:korToKan.changeChunGan(myManse.pillar.d_sky),
      ohang:ohangColor(useUmYangOHang.d_sky.oHang),
    },
    h_sky:{
      word:korToKan.changeChunGan(myManse.pillar.h_sky),
      ohang:ohangColor(useUmYangOHang.h_sky.oHang),
      yuksin: myManse.yukSin.h_sky
    },
     y_land:{
      word:korToKan.changeJIJI(myManse.pillar.y_land),
      ohang:ohangColor(useUmYangOHang.y_land.oHang),
      yuksin: myManse.yukSin.y_sky
    },
    m_land:{
      word:korToKan.changeJIJI(myManse.pillar.m_land),
      ohang:ohangColor(useUmYangOHang.m_land.oHang),
      yuksin: myManse.yukSin.m_sky
    },
    d_land:{
      word:korToKan.changeJIJI(myManse.pillar.d_land),
      ohang:ohangColor(useUmYangOHang.d_land.oHang),
      yuksin: myManse.yukSin.d_land
    },
    h_land:{
      word:korToKan.changeJIJI(myManse.pillar.h_land),
      ohang:ohangColor(useUmYangOHang.h_land.oHang),
      yuksin: myManse.yukSin.h_land
    },
  }
  return manse
}

const getWolRyeong = () => {
  let result = '';
  if (useRyeong.yongsin === '계') {
      result = '자축'
  }
  else if (useRyeong.yongsin === '갑') {
      result = '인묘'
  }
  else if (useRyeong.yongsin === '을') {
      result = '묘진'
  }
  else if (useRyeong.yongsin === '병') {
      result = '사오'
  }
  else if (useRyeong.yongsin === '정') {
      result = '오미'
  }
  else if (useRyeong.yongsin === '경') {
      result = '신유'
  }
  else if (useRyeong.yongsin === '신') {
      result = '유술'
  }
  else if (useRyeong.yongsin === '임') {
      result = '해자'
  }
  return result;
}
const ohangColor = (ohang) => {
  let result = "";
  if (ohang === '토') {
      result = 'gold'
  }
  else if (ohang === '화') {
      result = 'fire'
  }
  else if (ohang === '수') {
      result = 'dark_gray'
  }
  else if (ohang === '금') {
      result = 'gray'
  }
  else if (ohang === '목') {
      result = 'blue'
  }
  return result
}
module.exports = interface;
