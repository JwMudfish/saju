const ohangFunc  = require('../umYangOHang/oHang')
const yuksinFunc  = require('../yuksin/yuksin')

  /**
   * 용신투간
   * 계수용신이면 계수,임수 둘중에 하나만 투간되어있으면 된다.
   * @returns 
   */
exports.yongsinTogan = () => {
  const pillar = [
    usePillar.y_sky,
    usePillar.m_sky,
    usePillar.d_sky,
    usePillar.h_sky,
  ]
   let result='N';
   for(let i=0 ;i<pillar.length; i++){
       if(ohangFunc.oHang(useRyeong.yongsin)===ohangFunc.oHang(pillar[i])){
            result='Y'
       }
   }
    return result;
}

  /**
   * 격투간
   * 계수용신이면 계수,임수 둘중에 하나만 투간되어있으면 된다.
   * @returns 
   */
   exports.gyoukTogan = () => {
    const pillarYuksin = [
      useYuksin.y_sky,
      useYuksin.m_sky,
      useYuksin.h_sky,
    ]

    let result='N';
    if(useGyouk==='건록격'||useGyouk==='양인격'){
      result='Y'
    }
    else {
      for(let i=0 ;i<pillarYuksin.length; i++){
        if(yuksinFunc.checkYuksinKind(useGyouk)===yuksinFunc.checkYuksinKind(pillarYuksin[i])){
             result='Y'
        }
    }
    }

     return result;
 }
  /**
   * 월지지장간투간
   * @returns 
   */
 exports.wolTogan = () => {
    let result='N';
    if(useBasicFunc.wal_togan.wal_togan1==='Y'||
    useBasicFunc.wal_togan.wal_togan2==='Y'||
    useBasicFunc.wal_togan.wal_togan3==='Y'){
        result='Y'
    }
     return result;
 }
