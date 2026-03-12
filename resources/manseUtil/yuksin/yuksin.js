const sssg = require('../../manse/yuksin/getSangSengSangGuk')
const umYang = require('../umYangOHang/umYang')
const ohang  = require('../umYangOHang/oHang')
const yuksinFunc  = require('../../manse/yuksin/getYukSin')


exports.changeGyoukYuksin = () =>{
    let result;
    if(useGyouk==='건록격'){
        result='비견'
    }
    else if(useGyouk==='양인격'){
        result='겁재'
    }
    else if(useGyouk==='정재격'){
        result='정재'
    }
    else if(useGyouk==='편재격'){
        result='편재'
    }
    else if(useGyouk==='식신격'){
        result='식신'
    }
    else if(useGyouk==='상관격'){
        result='상관'
    }
    else if(useGyouk==='정관격'){
        result='정관'
    }
    else if(useGyouk==='편관격'){
        result='편관'
    }    else if(useGyouk==='정인격'){
        result='정인'
    }
    else if(useGyouk==='편인격'){
        result='편인'
    }



    return result;
}
/**
 * 육신의 종류를 출력한다
 * 비견,겁재는 비겁이므로 비겁을 출력
 * 식신,상관은 식상이므로 식상을 출력
 * @param {String} yuksin 
 * @returns 
 */
exports.checkYuksinKind=(yuksin)=>{
    let result;
    if(yuksin.includes('비견')||yuksin.includes('겁재')){
        result='비겁'
    }
    else if(yuksin.includes('정재')||yuksin.includes('편재')){
        result='재성'
    }
    else if(yuksin.includes('식신')||yuksin.includes('상관')){
        result='식상'
    }
    else if(yuksin.includes('정인')||yuksin.includes('편인')){
        result='인성'
    }
    else if(yuksin.includes('정관')||yuksin.includes('편관')){
        result='관성'
    }
    return result;
}
/**
 * 해당하는 육신이 뭔지 구하는 함수
 * @param {String} word 
 * @param {Number} skyLand (천간은1 지지는2)
 * @returns 
 */
exports.getYuksin=(word,skyLand)=>{
    let result;
    result=yuksinFunc.yuksin(
        sssg.sssg(useUmYangOHang.d_sky.oHang, ohang.oHang(word)),
        umYang.umYang(word,skyLand)
      );
    return result;
}