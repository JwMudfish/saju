/**
 * 희체크
 * @param {string} dsky 일간
 * @param {string} word 비교할글자
 * @returns {string} 희신 글자
 */
const noryeongShgj = require('../interface/noryeongShgj/no');
const gun = require('../../manseUtil/gun');
const hiyong = require('../../manseUtil/hiyong/hiyongUtil');
const hapChung = require('../../manseUtil/hapchung/samhapUtil');
exports.interface = () => {
    myManseInterF.pillar = myManse.pillar;
    myManseInterF.Gyouk = myManse.Gyouk;
    myManseInterF.palpum = usePalPum;
    myManseInterF.ryeong = checkRyeong();
    myManseInterF.shgj = checkShgj();
    myManseInterF.ilgan = ilganElement();
    myManseInterF.hapchung = hapChungElement();
}

const ilganElement = () => {
    let result = {
        gun: '',
        hiyong: {}
    };
    result.gun = gun.gun()
    result.hiyong.hi = hiyong.checkHiYN()
    result.hiyong.yong = hiyong.checkYongYN()
    return result
}
const hapChungElement = () => {
    let result = {
        m_land: usePillar.m_land,
        d_land: usePillar.d_land,
        samhap: {},
        banghap: {},
        chung: {},
        yukhap: {},
    };
    result.samhap.m_landYN = hapChung.checkSamhapWolYN()
    result.banghap.m_landYN = hapChung.checkbanghapWolYN()
    result.yukhap.d_landYN = hapChung.checkYukhapChoiceYN(usePillar.d_land, 'D')
    result.chung = {
        samhapChung: {
            m_landYN: hapChung.checkChungWolYN(),
            m_landPossible: checkHapChungPossile(
                hapChung.checkSamhapWolYN()
                , hapChung.checkChungWolYN()),
        },
        banghapChung: {
            m_landYN: hapChung.checkChungWolYN(),
            m_landPossible: checkHapChungPossile(
                hapChung.checkbanghapWolYN()
                , hapChung.checkChungWolYN()),
        },
        yukhapChung: {
            d_landYN: hapChung.checkChungChoiceYN(usePillar.d_land, 'D'),
            d_landPossible: checkHapChungPossile(
                hapChung.checkYukhapChoiceYN(usePillar.d_land, 'D')
                , hapChung.checkChungChoiceYN(usePillar.d_land, 'D')),
        },
    }
    return result
}

const checkHapChungPossile = (check, chung) => {
    let result = 'N'
    if (check === 'Y' && chung === 'Y') {
        result = 'Y'
    }
    return result;
}

const checkRyeong = () => {
    let result = {};
    result = useRyeong;
    /*result.heuisin.yuksin = yuksin(myManse.ryeong.heuisin, 'heuisin');
    result.junghwa.word = word(myManse.ryeong.junghwa, 'junghwa');
    result.junghwa.yuksin = yuksin(myManse.ryeong.junghwa, 'junghwa');
    result.junghwa_gisin.word = word(
        myManse.ryeong.junghwa_gisin,
        'junghwa_gisin'
    );
    result.junghwa_gisin.yuksin = yuksin(myManse.ryeong.junghwa_gisin);
    result.jisok.word = word(myManse.ryeong.jisok, 'jisok');
    result.jisok.yuksin = yuksin(myManse.ryeong.jisok, 'jisok');
    result.jisok_gisin.word = word(myManse.ryeong.jisok_gisin, 'jisok_gisin');
    result.jisok_gisin.yuksin = yuksin(myManse.ryeong.jisok_gisin, 'jisok_gisin');
    result.hwakjang.word = word(myManse.ryeong.hwakjang, 'hwakjang');
    result.hwakjang.yuksin = yuksin(myManse.ryeong.hwakjang, 'hwakjang');
    result.hwakjang_gisin.word = word(
        myManse.ryeong.hwakjang_gisin,
        'hwakjang_gisin'
    );
    result.hwakjang_gisin.yuksin = yuksin(
        myManse.ryeong.hwakjang_gisin,
        'hwakjang_gisin'
    );
    result.um_heuisin_gisin.word = word(
        myManse.ryeong.um_heuisin_gisin,
        'um_heuisin_gisin'
    );
    result.um_heuisin_gisin.yuksin = yuksin(
        myManse.ryeong.um_heuisin_gisin,
        'um_heuisin_gisin'
    );
    result.geuk_heuisin_gisin.word = word(
        myManse.ryeong.geuk_heuisin_gisin,
        'geuk_heuisin_gisin'
    );
    result.geuk_heuisin_gisin.yuksin = yuksin(
        myManse.ryeong.geuk_heuisin_gisin,
        'geuk_heuisin_gisin'
    );
    result.um_gisin.word = word(myManse.ryeong.um_gisin, 'um_gisin');
    result.um_gisin.yuksin = yuksin(myManse.ryeong.um_gisin, 'um_gisin');
    result.geuk_gisin.word = word(myManse.ryeong.geuk_gisin, 'geuk_gisin');
    result.geuk_gisin.yuksin = yuksin(myManse.ryeong.geuk_gisin, 'geuk_gisin');*/
    return result;
}

const checkShgj = () => {
    let result = {};
    result = useShgj;
    /*result.gukgubun = useShgj.gukgubun;
    result.sangsin = useShgj.sangsin;
    result.sangsin.word = word(useShgj.sangsin, 'sangsin', 'shgj');
    result.sangsin.yuksin = yuksin(useShgj.sangsin, 'sangsin', 'shgj');
    result.sangsingisin = useShgj.sangsingisin;
    result.sangsingisin.word = word(useShgj.sangsingisin, 'sangsingisin', 'shgj');
    result.sangsingisin.yuksin = yuksin(
        useShgj.sangsingisin,
        'sangsingisin',
        'shgj'
    );
    result.gusin = useShgj.gusin;
    result.gusin.word = word(useShgj.gusin, 'gusin', 'shgj');
    result.gusin.yuksin = yuksin(useShgj.gusin, 'gusin', 'shgj');
    if (useShgj.gusingisin === undefined) {
    } else {
        result.gusingisin = useShgj.gusingisin;
        result.gusingisin.word = word(useShgj.gusingisin, 'gusingisin', 'shgj');
        result.gusingisin.yuksin = yuksin(useShgj.gusingisin, 'gusingisin', 'shgj');
    }
    if (useShgj.gukgisin === undefined) {
    } else {
        result.gukgisin = useShgj.gukgisin;
        result.gukgisin.word = word(useShgj.gukgisin, 'gukgisin', 'shgj');
        result.gukgisin.yuksin = yuksin(useShgj.gukgisin, 'gukgisin', 'shgj');
    }
    result.sanghwa = useShgj.sanghwa;
    result.sanghwa.word = word(useShgj.sanghwa, 'sanghwa', 'shgj');
    result.sanghwa.yuksin = yuksin(useShgj.sanghwa, 'sanghwa', 'shgj');
    result.sulhwa = useShgj.sulhwa;
    result.sulhwa.word = word(useShgj.sulhwa, 'sulhwa', 'shgj');
    result.sulhwa.yuksin = yuksin(useShgj.sulhwa, 'sulhwa', 'shgj');
    if (useShgj.sang_jae === undefined) {
    } else {
        result.sang_jae = useShgj.sang_jae;
        result.sang_jae.word = word(useShgj.sang_jae, 'sang_jae', 'shgj');
        result.sang_jae.yuksin = yuksin(useShgj.sang_jae, 'sang_jae', 'shgj');
    }
    if (useShgj.sul_jae === undefined) {
    } else {
        result.sul_jae = useShgj.sul_jae;
        result.sul_jae.word = word(useShgj.sul_jae, 'sul_jae', 'shgj');
        result.sul_jae.yuksin = yuksin(useShgj.sul_jae, 'sul_jae', 'shgj');
    }
    if (useShgj.yido === undefined) {
    } else {
        result.yido = useShgj.yido;
        result.yido.word = word(useShgj.yido);
        result.yido.yuksin = yuksin(useShgj.yido);
    }
    if (useShgj.sang_hap === undefined) {
    } else {
        result.sang_hap = useShgj.sang_hap;
        result.sang_hap.word = word(useShgj.sang_hap, 'sang_hap', 'shgj');
        result.sang_hap.yuksin = yuksin(useShgj.sang_hap, 'sang_hap', 'shgj');
    }
    if (useShgj.sul_hap === undefined) {
    } else {
        result.sul_hap = useShgj.sul_hap;
        result.sul_hap.word = word(useShgj.sul_hap, 'sul_hap', 'shgj');
        result.sul_hap.yuksin = yuksin(useShgj.sul_hap, 'sul_hap', 'shgj');
    }
    if (useShgj.sengHwa_zeHwa === undefined) {
    } else {
        result.sengHwa_zeHwa = useShgj.sengHwa_zeHwa;
        result.sengHwa_zeHwa.word = word(
            useShgj.sengHwa_zeHwa,
            'sengHwa_zeHwa',
            'shgj'
        );
        result.sengHwa_zeHwa.yuksin = yuksin(
            useShgj.sengHwa_zeHwa,
            'sengHwa_zeHwa',
            'shgj'
        );
    }
    if (useShgj.sulHwa_zeHwa === undefined) {
    } else {
        result.sulHwa_zeHwa = useShgj.sulHwa_zeHwa;
        result.sulHwa_zeHwa.word = word(
            useShgj.sulHwa_zeHwa,
            'sulHwa_zeHwa',
            'shgj'
        );
        result.sulHwa_zeHwa.yuksin = yuksin(
            useShgj.sulHwa_zeHwa,
            'sulHwa_zeHwa',
            'shgj'
        );
    }
    if (useShgj.sengHwa_hapHwa === undefined) {
    } else {
        result.sengHwa_hapHwa = useShgj.sengHwa_hapHwa;
        result.sengHwa_hapHwa.word = word(
            useShgj.sengHwa_hapHwa,
            'sengHwa_hapHwa',
            'shgj'
        );
        result.sengHwa_hapHwa.yuksin = yuksin(
            useShgj.sengHwa_hapHwa,
            'sengHwa_hapHwa',
            'shgj'
        );
    }
    if (useShgj.sulHwa_hapHwa === undefined) {
    } else {
        result.sulHwa_hapHwa = useShgj.sulHwa_hapHwa;
        result.sulHwa_hapHwa.word = word(
            useShgj.sulHwa_hapHwa,
            'sulHwa_hapHwa',
            'shgj'
        );
        result.sulHwa_hapHwa.yuksin = yuksin(
            useShgj.sulHwa_hapHwa,
            'sulHwa_hapHwa',
            'shgj'
        );
    } */

    return result;
}

const word = (obj, nameObj, check) => {
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

const yuksin = (obj, nameObj, check) => {
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
                result = yuksin[i];
                break;
            }
        }
    } else {
        result = noryeongShgj.checkYuksin(nameObj, useShgj.gukgubun);
    }
    return result;
}