const seunElementRange = require('../seunElememtRange')
const ryeongWord = require('../../../ryeong/getRyeongWord')
const shgjWord = require('../../../gungShgj/gungShgWord')
const yuksinFunc = require('../../../yuksin/yuksin')
const ohangFunc = require('../../../umYangOHang/oHang')
let yearPillar = require("../../../../manse/pillar/yearPillar/yearPillar");
exports.checkYearOhang = (year) =>{

    let result =ohangFunc.oHang(yearPillar.getYear(year)[0]) 

    return result
}
 exports.getRyeongTenYear = (year) => {
    let seun = {
      yongsin:{},
      um_gisin:{},
      heuisin:{},
      um_heuisin_gisin:{},
      junghwa:{},
      junghwa_gisin:{},
      jisok:{},
      jisok_gisin:{},
      hwakjang:{},
      hwakjang_gisin:{},
    }
    // 시작년도
    let start = Number(year)
    // 끝년도
    let end = Number(year)+10
    // 령 글자 모음집
    const ryeong= ryeongWord.ryeongWordCollection()
    //용신
    seun.yongsin = seunElementRange.elementRange(useRyeong.yongsin,start,end)
    //용신 음양기신 (용신의 음양만 다른 버전)
    seun.um_gisin = seunElementRange.elementRange(ryeong.um_gisin,start,end)
    //희신
    seun.heuisin =seunElementRange.elementRange(ryeong.heuisin,start,end)
    // 음양희신기신 (용신의 음양만 다른 버전)
    seun.um_heuisin_gisin = seunElementRange.elementRange(ryeong.um_heuisin_gisin,start,end)
      // 중화
    seun.junghwa = seunElementRange.elementRange(ryeong.junghwa,start,end)
    // 중화기신 (중화의 음양 다른버전)
    seun.junghwa_gisin = seunElementRange.elementRange(ryeong.junghwa_gisin,start,end)
    // 지속성
    seun.jisok = seunElementRange.elementRange(ryeong.jisok,start,end)
    // 지속기신 (지속성의 음양 다른버전)
    seun.jisok_gisin = seunElementRange.elementRange(ryeong.jisok_gisin,start,end)
    // 확장성
    seun.hwakjang = seunElementRange.elementRange(ryeong.hwakjang,start,end)
    // 확장기신 (확장성의 음양다른버전)
    seun.hwakjang_gisin = seunElementRange.elementRange(ryeong.hwakjang_gisin,start,end)
  
    return seun
  }

  exports.getGungTenYear = (year) => {
    let seun = {
        sangsin:'',
        sangsingisin:'',
        gusin:'',
        gusingisin:'',
        gukgisin:'',
        gyouk:''
    }
    // 시작년도
    let start = Number(year)
    // 끝년도
    let end = Number(year)+10
    // 생화극제 글자 모음집
    const shgj= shgjWord.shgjWordCollection()
    const gyouk = yuksinFunc.changeGyoukYuksin()
    // 상신
    seun.sangsin=seunElementRange.elementRange(shgj.sangsin,start,end)
    // 상신기신
    seun.sangsingisin=seunElementRange.elementRange(shgj.sangsingisin,start,end)
    // 구신
    seun.gusin=seunElementRange.elementRange(shgj.gusin,start,end)
    // 구신기신
    seun.gusingisin=seunElementRange.elementRange(shgj.gusingisin,start,end)
    // 격기신
    seun.gukgisin=seunElementRange.elementRange(shgj.gukgisin,start,end)
    //격국
    seun.gyouk=seunElementRange.elementRangeYuksin(gyouk,start,end)
    return seun
  }

  exports.getShgjTenYear = (year) => {
    let seun = {
        sanghwa:'',
        sengHwa_zeHwa:'',
        sulhwa:'',
        sulHwa_zeHwa:'',
        gyouk:''
    }
    // 시작년도
    let start = Number(year)
    // 끝년도
    let end = Number(year)+10
    // 생화극제 글자 모음집
    const shgj= shgjWord.shgjWordCollection()
    const gyouk = yuksinFunc.changeGyoukYuksin()
    // 생화
    seun.sanghwa=seunElementRange.elementRange(shgj.sanghwa,start,end)
    // 생화제화
    seun.sengHwa_zeHwa=seunElementRange.elementRange(shgj.sengHwa_zeHwa,start,end)
    // 설화
    seun.sulhwa=seunElementRange.elementRange(shgj.sulhwa,start,end)
    // 설화제화
    seun.sulHwa_zeHwa=seunElementRange.elementRange(shgj.sulHwa_zeHwa,start,end)
    //격국
    seun.gyouk=seunElementRange.elementRangeYuksin(gyouk,start,end)
    return seun
  }


  exports.getYuksinTwelveYear = (year) =>{
    let result=[]
    let jiji =['자','축','인','묘','진','사','오','미','신','유','술','해']
      // 시작년도
      let start = Number(year)
      // 끝년도
      let end = Number(year)+12
    for(let i=0;i<jiji.length;i++){
      result.push(seunElementRange.elementRangeJiJi(jiji[i],start,end))
    }
    return result;
  }

  exports.getYuksinTenYear= (year) =>{
    let result=[]
    let chunGan =['갑','을','병','정','무','기','경','신','임','계']
      // 시작년도
      let start = Number(year)
      // 끝년도
      let end = Number(year)+10
    for(let i=0;i<chunGan.length;i++){
      result.push(seunElementRange.elementRange(chunGan[i],start,end))
    }
    return result;
  }