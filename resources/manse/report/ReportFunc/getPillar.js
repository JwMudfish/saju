const korToKan = require('../../../manseUtil/korToHan')
const GyeokYongsinTitle = require('../../../test/contents_myPage');

exports.getPillarKor = () => {
  let result;
  const hapchung = JSON.parse(JSON.stringify(useHapChung));
  const key1_1 = ["samhap", "banghap"];
  const key2_1 = ["monthExist", "monthArray"];
  const key2_2 = ["exist", "array"];
  const key3_1 = ["one", "two", "three"];

  let hapchungResult = {
    samhap: {
      monthExist: {},
      monthArray: {},
      exist: {},
      array: {},
    },
    banghap: {
      monthExist: {},
      monthArray: {},
      exist: {},
      array: {},
    },
    yukhap: {
      one: {},
      two: {},
    },
    chung: {
      one: {},
      two: {},
    },
  };
  // 음양오행
  const umYangOHang = JSON.parse(JSON.stringify(myManse.umYangOHang));
  for (let key in umYangOHang) {
    for (let key2 in umYangOHang[key]) {
      if (key2 === 'oHang') {
        umYangOHang[key][key2] = korToKan.changeOhang(umYangOHang[key][key2])
      }
      if (key2.includes('_jangan')) {
        for (let key3 in umYangOHang[key][key2]) {
          if (key3 === 'oHang') {
            umYangOHang[key][key2][key3] = korToKan.changeOhang(umYangOHang[key][key2][key3])
          }
        }
      }
    }
  }
// 합충
  for (i in key1_1) {
    if (hapchung[key1_1[i]].word[key2_1[0]].length !== 0) {
      for (j in key2_1) {
        for (k in key3_1) {

            hapchungResult[key1_1[i]][key2_1[j]][key3_1[k]] = hapchung[key1_1[i]].word[key2_1[j]][k]

        }
      }

    }
    else {
      hapchungResult[key1_1[i]][key2_1[0]] = '-'
    }
    if (hapchung[key1_1[i]].word[key2_2[0]].length !== 0) {
      for (j in key2_2) {
        for (k in key3_1) {
          hapchungResult[key1_1[i]][key2_2[j]][key3_1[k]] =hapchung[key1_1[i]].word[key2_2[j]][k]
        }
      }

    }
    else {
      hapchungResult[key1_1[i]][key2_2[0]] = '-'
    }
  }

  if (hapchung.yukhap.yn === 'N') {
    hapchungResult.yukhap.one = '-'
    hapchungResult.yukhap.two = '-'
  } else if (hapchung.yukhap.word.word.length === 1) {
    hapchungResult.yukhap.one.one = hapchung.yukhap.word.one[0]
    hapchungResult.yukhap.one.two = hapchung.yukhap.word.one[1]
    hapchungResult.yukhap.two = '-'
  } else {
    hapchungResult.yukhap.one.one = hapchung.yukhap.word.one[0]
    hapchungResult.yukhap.one.two = hapchung.yukhap.word.one[1]
    hapchungResult.yukhap.two.one = hapchung.yukhap.word.two[0]
    hapchungResult.yukhap.two.two = hapchung.yukhap.word.two[1]
  }
  if (hapchung.chung.word.word.length === 1 && hapchung.chung.word.one === '-') {
    hapchungResult.chung.one = '-'
    hapchungResult.chung.two = '-'
  } else if (hapchung.chung.word.word.length === 1) {
    hapchungResult.chung.one.one = hapchung.chung.word.one[0]
    hapchungResult.chung.one.two = hapchung.chung.word.one[1]
    hapchungResult.chung.two = '-'
  } else {
    hapchungResult.chung.one.one = hapchung.chung.word.one[0]
    hapchungResult.chung.one.two = hapchung.chung.word.one[1]
    hapchungResult.chung.two.one = hapchung.chung.word.two[0]
    hapchungResult.chung.two.two = hapchung.chung.word.two[1]
  }
  result = {
    info: myManse.info,
    Solar: useSolar,
    Lunar: useLunar,
    julib: myManse.julib,
    julibGanji: myManse.julibGanji,
    junggi: myManse.junggi,
    junggiGanji: myManse.junggiGanji,
    pillar: myManse.pillar,
    umYangOHang: umYangOHang,
    hapChung: hapchungResult,
    yukSin: myManse.yukSin,
    ryeong: {
      yongsin: myManse.ryeong.yongsin,
      saryeong: myManse.ryeong.saryeong,
    },
    manseSSSG: useManseSSSG,

    Gyouk: myManse.Gyouk,
    GyoukYongsinTitle: GyeokYongsinTitle.randum().title,
    GyoukProperty: useGyoukProperty,
  }
  return result
}

exports.getPillarKan = () => {
  let result;
  const pillar = JSON.parse(JSON.stringify(usePillar));
  const hapchung = JSON.parse(JSON.stringify(useHapChung));
  const key1_1 = ["samhap", "banghap"];
  const key2_1 = ["monthExist", "monthArray"];
  const key2_2 = ["exist", "array"];
  const key3_1 = ["one", "two", "three"];
  let date = korToKan.changeJIJITime(useSolar,useLunar)
  let hapchungResult = {
    samhap: {
      monthExist: {},
      monthArray: {},
      exist: {},
      array: {},
    },
    banghap: {
      monthExist: {},
      monthArray: {},
      exist: {},
      array: {},
    },
    yukhap: {
      one: {},
      two: {},
    },
    chung: {
      one: {},
      two: {},
    },
  };
  // 음양오행
  const umYangOHang = JSON.parse(JSON.stringify(myManse.umYangOHang));
  for (let key in umYangOHang) {
    for (let key2 in umYangOHang[key]) {
      if (key2 === 'oHang') {
        umYangOHang[key][key2] = korToKan.changeOhang(umYangOHang[key][key2])
      }
      if (key2.includes('_jangan')) {
        for (let key3 in umYangOHang[key][key2]) {
          if (key3 === 'oHang') {
            umYangOHang[key][key2][key3] = korToKan.changeOhang(umYangOHang[key][key2][key3])
          }
        }
      }
    }
  }
  // 명식
  for (let key in pillar) {
    if (key.includes('land')) {
      pillar[key] = korToKan.changeJIJI(pillar[key])
    } else if (key.includes('sky')) {
      pillar[key] = korToKan.changeChunGan(pillar[key])
    } else {
      for (let key2 in pillar[key]) {
        pillar[key][key2] = korToKan.changeChunGan(pillar[key][key2])
      }
    }
  }

  // 합충
  for (i in key1_1) {
    if (hapchung[key1_1[i]].word[key2_1[0]].length !== 0) {
      for (j in key2_1) {
        for (k in key3_1) {
          hapchungResult[key1_1[i]][key2_1[j]][key3_1[k]] = korToKan.changeJIJI(hapchung[key1_1[i]].word[key2_1[j]][k])
        }
      }

    }
    else {
      hapchungResult[key1_1[i]][key2_1[0]] = '-'
    }
    if (hapchung[key1_1[i]].word[key2_2[0]].length !== 0) {
      for (j in key2_2) {
        for (k in key3_1) {
          hapchungResult[key1_1[i]][key2_2[j]][key3_1[k]] = korToKan.changeJIJI(hapchung[key1_1[i]].word[key2_2[j]][k])
        }
      }

    }
    else {
      hapchungResult[key1_1[i]][key2_2[0]] = '-'
    }
  }

  if (hapchung.yukhap.yn === 'N') {
    hapchungResult.yukhap.one = '-'
    hapchungResult.yukhap.two = '-'
  } else if (hapchung.yukhap.word.word.length === 1) {
    hapchungResult.yukhap.one.one = korToKan.changeJIJI(hapchung.yukhap.word.one[0])
    hapchungResult.yukhap.one.two = korToKan.changeJIJI(hapchung.yukhap.word.one[1])
    hapchungResult.yukhap.two = '-'
  } else {
    hapchungResult.yukhap.one.one = korToKan.changeJIJI(hapchung.yukhap.word.one[0])
    hapchungResult.yukhap.one.two = korToKan.changeJIJI(hapchung.yukhap.word.one[1])
    hapchungResult.yukhap.two.one = korToKan.changeJIJI(hapchung.yukhap.word.two[0])
    hapchungResult.yukhap.two.two = korToKan.changeJIJI(hapchung.yukhap.word.two[1])
  }
  if (hapchung.chung.word.word.length === 1 && hapchung.chung.word.one === '-') {
    hapchungResult.chung.one = '-'
    hapchungResult.chung.two = '-'
  } else if (hapchung.chung.word.word.length === 1) {
    hapchungResult.chung.one.one = korToKan.changeJIJI(hapchung.chung.word.one[0])
    hapchungResult.chung.one.two = korToKan.changeJIJI(hapchung.chung.word.one[1])
    hapchungResult.chung.two = '-'
  } else {
    hapchungResult.chung.one.one = korToKan.changeJIJI(hapchung.chung.word.one[0])
    hapchungResult.chung.one.two = korToKan.changeJIJI(hapchung.chung.word.one[1])
    hapchungResult.chung.two.one = korToKan.changeJIJI(hapchung.chung.word.two[0])
    hapchungResult.chung.two.two = korToKan.changeJIJI(hapchung.chung.word.two[1])
  }

  /*for (let key in hapchung) {
    if (key.includes('land')) {
      pillar[key] = korToKan.changeJIJI(pillar[key])
    } else if (key.includes('sky')) {
      pillar[key] = korToKan.changeChunGan(pillar[key])
    } else {
      for (let key2 in pillar[key]) {
        pillar[key][key2] =  korToKan.changeChunGan(pillar[key][key2])
      }
    }*/

  result = {
    info: myManse.info,
    Solar: date.solar,
    Lunar: date.lunar,
    julib: myManse.julib,
    julibGanji: myManse.julibGanji,
    junggi: myManse.junggi,
    junggiGanji: myManse.junggiGanji,
    pillar: pillar,
    umYangOHang: umYangOHang,
    hapChung: hapchungResult,
    yukSin: myManse.yukSin,
    ryeong: {
      yongsin: korToKan.changeChunGan(myManse.ryeong.yongsin),
      saryeong: korToKan.changeChunGan(myManse.ryeong.saryeong),
    },
    manseSSSG: useManseSSSG,

    Gyouk: myManse.Gyouk,
    GyoukYongsinTitle: GyeokYongsinTitle.randum().title,
    GyoukProperty: useGyoukProperty,
  }
  return result;
}