var manseSSSG = {};
const noryeongShgj = require('./noryeongShgj/no');
const oHangFunc = require("../umYangOHang/oHang");
const sssgFunc = require("./getSangSengSangGuk");
manseSSSG.manseSSSG = function () {
    return new Promise((resolve) => {
        let ryeong = checkRyeong()
        let heuisin = sssgYN(ryeong.heuisin)
        let junghwa = sssgYN(ryeong.junghwa)
        let jisok = sssgYN(ryeong.jisok)
        let hwakjang = sssgYN(ryeong.hwakjang)
        /*useManseSSSG.heuisin = heuisin
        useManseSSSG.junghwa = junghwa
        useManseSSSG.jisok = jisok
        useManseSSSG.hwakjang = hwakjang*/
        let array = [heuisin, junghwa, jisok, hwakjang];
        for (let i = 0; i < array.length; i++) {
            if (array[i].sssg === 'shang_come') {
                useManseSSSG.shang_come = array[i]
            }
            else if (array[i].sssg === 'shang_go') {
                useManseSSSG.shang_go = array[i]
            }
            else if (array[i].sssg === 'geuk_go') {
                useManseSSSG.geuk_go = array[i]
            }
            else if (array[i].sssg === 'geuk_come') {
                useManseSSSG.geuk_come = array[i]
            }
        }
        useManseSSSG.dangryeong = ryeong.dangryeong
        resolve('');
    }).catch((error) => {
        console.log(error);
        return error;
    });
};

const sssgYN = ryeong => {
    let result = {};
    if (ryeong.exist === 'N') {
        result.use = 'N'
    }
    else if (ryeong.exist === 'Y' && ryeong.use.includes('y') === false) {
        result.use = 'N'
    }
    else {
        result.use = 'Y'
    }
    result.ohang = ryeong.ohang
    result.sssg = ryeong.sssg
    return result
}

function checkRyeong() {
    let result = {
        heuisin: {},
        junghwa: {},
        jisok: {},
        hwakjang: {},
        dangryeong: {}
    };
    result.heuisin = useRyeong.heuisin
    result.junghwa = useRyeong.junghwa
    result.jisok = useRyeong.jisok
    result.hwakjang = useRyeong.hwakjang
    result.dangryeong.word = useRyeong.yongsin
    result.dangryeong.ohang = oHangFunc.oHang(useRyeong.yongsin);
    // 희신
    result.heuisin.word = word(useRyeong.heuisin, 'heuisin');
    result.heuisin.ohang = oHangFunc.oHang(result.heuisin.word);
    result.heuisin.sssg = sssgFunc.sssg(result.dangryeong.ohang, result.heuisin.ohang);
    // 중화
    result.junghwa.word = word(useRyeong.junghwa, 'junghwa');
    result.junghwa.ohang = oHangFunc.oHang(result.junghwa.word);
    result.junghwa.sssg = sssgFunc.sssg(result.dangryeong.ohang, result.junghwa.ohang);
    // 지속
    result.jisok.word = word(useRyeong.jisok, 'jisok');
    result.jisok.ohang = oHangFunc.oHang(result.jisok.word);
    result.jisok.sssg = sssgFunc.sssg(result.dangryeong.ohang, result.jisok.ohang);
    // 확장
    result.hwakjang.word = word(useRyeong.hwakjang, 'hwakjang');
    result.hwakjang.ohang = oHangFunc.oHang(result.hwakjang.word);
    result.hwakjang.sssg = sssgFunc.sssg(result.dangryeong.ohang, result.hwakjang.ohang);
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
                if (name[i] === 'd_sky') {
                    result = '비견';
                }
                else {
                    result = yuksin[i];
                }

                break;
            }
        }
    } else {
        result = noryeongShgj.checkYuksin(nameObj, useShgj.gukgubun);
    }
    return result;
}
module.exports = manseSSSG;
