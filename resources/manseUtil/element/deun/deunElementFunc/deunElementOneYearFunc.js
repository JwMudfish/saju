const deunElememtRange = require('../deunElememtRange')
const ryeongWord = require('../../../ryeong/getRyeongWord')
const shgjWord = require('../../../gungShgj/gungShgWord')
const yuksinFunc = require('../../../yuksin/yuksin')
const ohangFunc = require('../../../umYangOHang/oHang')
let yearPillar = require("../../../../manse/pillar/yearPillar/yearPillar");
exports.checkYearOhang = (word) =>{

    let result =ohangFunc.oHang(word) 

    return result
}
 exports.getRyeongTenYear = () => {
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
    // 령 글자 모음집
    const ryeong= ryeongWord.ryeongWordCollection()
    //용신
    seun.yongsin = deunElememtRange.elementRange(useRyeong.yongsin)
    //용신 음양기신 (용신의 음양만 다른 버전)
    seun.um_gisin = deunElememtRange.elementRange(ryeong.um_gisin)
    //희신
    seun.heuisin =deunElememtRange.elementRange(ryeong.heuisin)
    // 음양희신기신 (용신의 음양만 다른 버전)
    seun.um_heuisin_gisin = deunElememtRange.elementRange(ryeong.um_heuisin_gisin)
      // 중화
    seun.junghwa = deunElememtRange.elementRange(ryeong.junghwa)
    // 중화기신 (중화의 음양 다른버전)
    seun.junghwa_gisin = deunElememtRange.elementRange(ryeong.junghwa_gisin)
    // 지속성
    seun.jisok = deunElememtRange.elementRange(ryeong.jisok)
    // 지속기신 (지속성의 음양 다른버전)
    seun.jisok_gisin = deunElememtRange.elementRange(ryeong.jisok_gisin)
    // 확장성
    seun.hwakjang = deunElememtRange.elementRange(ryeong.hwakjang)
    // 확장기신 (확장성의 음양다른버전)
    seun.hwakjang_gisin = deunElememtRange.elementRange(ryeong.hwakjang_gisin)
  
    return seun
  }

  exports.getGungTenYear = () => {
    let seun = {
        sangsin:'',
        sangsingisin:'',
        gusin:'',
        gusingisin:'',
        gukgisin:'',
        gyouk:''
    }
    // 생화극제 글자 모음집
    const shgj= shgjWord.shgjWordCollection()
    const gyouk = yuksinFunc.changeGyoukYuksin()
    // 상신
    seun.sangsin=deunElememtRange.elementRange(shgj.sangsin)
    // 상신기신
    seun.sangsingisin=deunElememtRange.elementRange(shgj.sangsingisin)
    // 구신
    seun.gusin=deunElememtRange.elementRange(shgj.gusin)
    // 구신기신
    seun.gusingisin=deunElememtRange.elementRange(shgj.gusingisin)
    // 격기신
    seun.gukgisin=deunElememtRange.elementRange(shgj.gukgisin)
    //격국
    seun.gyouk=deunElememtRange.elementRangeYuksin(gyouk)
    return seun
  }

  exports.getShgjTenYear = () => {
    let seun = {
        sanghwa:'',
        sengHwa_zeHwa:'',
        sulhwa:'',
        sulHwa_zeHwa:'',
        gyouk:''
    }
    // 생화극제 글자 모음집
    const shgj= shgjWord.shgjWordCollection()
    const gyouk = yuksinFunc.changeGyoukYuksin()
    // 생화
    seun.sanghwa=deunElememtRange.elementRange(shgj.sanghwa)
    // 생화제화
    seun.sengHwa_zeHwa=deunElememtRange.elementRange(shgj.sengHwa_zeHwa)
    // 설화
    seun.sulhwa=deunElememtRange.elementRange(shgj.sulhwa)
    // 설화제화
    seun.sulHwa_zeHwa=deunElememtRange.elementRange(shgj.sulHwa_zeHwa)
    //격국
    seun.gyouk=deunElememtRange.elementRangeYuksin(gyouk)
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
      result.push(deunElememtRange.elementRangeJiJi(jiji[i]))
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
      result.push(deunElememtRange.elementRange(chunGan[i]))
    }
    return result;
  }