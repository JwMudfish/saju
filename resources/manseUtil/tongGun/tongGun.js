
/**
 * 천간 각각 요소 통근하는지.
 * @param {String} ohang 
 * @returns 
 */
const chunGanTongGun = (ohang) => {
    let result = [];

    const jijganguanOHang = [
        useUmYangOHang.y_jangan.y_jangan1.oHang,
        useUmYangOHang.y_jangan.y_jangan2.oHang,
        useUmYangOHang.y_jangan.y_jangan3.oHang,
        useUmYangOHang.d_jangan.d_jangan1.oHang,
        useUmYangOHang.d_jangan.d_jangan2.oHang,
        useUmYangOHang.d_jangan.d_jangan3.oHang,
        useUmYangOHang.h_jangan.h_jangan1.oHang,
        useUmYangOHang.h_jangan.h_jangan2.oHang,
        useUmYangOHang.h_jangan.h_jangan3.oHang
    ]
    
    const jangguanUse = [
        usejijangganUse.yong.y_land.y_jangan1,
        usejijangganUse.yong.y_land.y_jangan2,
        usejijangganUse.yong.y_land.y_jangan3,
        usejijangganUse.yong.d_land.d_jangan1,
        usejijangganUse.yong.d_land.d_jangan2,
        usejijangganUse.yong.d_land.d_jangan3,
        usejijangganUse.yong.h_land.h_jangan1,
        usejijangganUse.yong.h_land.h_jangan2,
        usejijangganUse.yong.h_land.h_jangan3
    ]

    for (let i =0 ; i <jijganguanOHang.length; i++){
        if (ohang === jijganguanOHang[i]) {
            if (jangguanUse[i] === 'bunhwa') {
              result.push( 'mu_root')
            } 
           else if (jangguanUse[i] === 'youngsa') {
              result.push('samhap_root')
            } else if (jangguanUse[i] === 'jangsang') {
                result.push('noonchi_root')
            } else if (jangguanUse[i].includes('yugi')||
            jangguanUse[i].includes('goji')||
            jangguanUse[i].includes('sihwa')) {
              if(jangguanUse[i] ==='yugi_young'){
                result.push('seson_root')
              }
              else if(jangguanUse[i].includes('sihwa')) {
                result.push( 'pure_root')
              }
              else {
                result.push( 'mu_root')
              }
            } else {
                result.push('pure_root')
            }
          }
          else if ((jijganguanOHang[i] !== undefined && String(jijganguanOHang[i]).trim() === '') || jijganguanOHang[i] === undefined) {
            result.push('')
          }
          else {
            result.push('mu_root')
          }
    }
 

  return result;
}

/**
 * 천간에 있는 글자중 하나가 통근하는지 아닌지.
 * @param {String} ohang 
 * @returns 
 */
exports.chunGanTongGunYN = (ohang) => {
    let result= 'N'
    let tongGunType = checkGunType(ohang)
    if (tongGunType === 'king_root' || tongGunType === 'pure_root') {
        result = 'Y'
    } else {
        result = 'N'
    }
    return result;
}
function checkGunType (ohang) {
    let result;
    let tongGunList = chunGanTongGun(ohang)
        let purenum = checkPure(tongGunList)
        if (purenum === 1) {
          result = 'pure_root';
        } else if (purenum >= 2) {
          result = 'king_root';
        } else if (purenum === 0) {
          if (checkRootNum(tongGunList) > 0) {
            result = 'week_root';
          } else {
            result = 'mu_root';
          }
        } else {
          result = 'mu_root';
        }

    return result;
}
function checkRootNum(root) {
    let result = 0;
    for (let i = 0; i < root.length; i++) {
      if (root[i] === 'mu_root' || root[i] === '') {
      }
      else {
        result = result + 1;
      }
    }
    return result;
  }
function checkPure(root) {
    let result = 0;
    for (let i = 0; i < root.length; i++) {
      if (root[i] === 'pure_root') {
        result = result + 1;
      }
    }
    return result;
  }