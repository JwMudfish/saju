/**
 * 희체크
 * @param {string} dsky 일간
 * @param {string} word 비교할글자
 * @returns {string} 희신 글자
 */
const noryeongShgj = require('../interface/noryeongShgj/no');
const gun = require('../../manseUtil/gun');
const hiyong = require('../../manseUtil/hiyong/hiyongWord');
const hiyongUtil = require('../../manseUtil/hiyong/hiyongUtil');
const gunFunction = require('../../manseUtil/gun');
const hapChung = require('../../manseUtil/hapchung/samhapUtil');
const umYangFunc = require('../../manseUtil/umYangOHang/umYang');
const ryeongText = require('../../test/contents_hisin10');
const gungText = require('../../test/contents_gungGilHung');
const shgjText = require('../../test/contents_shgjGilHung');
const gyeokText = require('../../test/contents_gyoukSimple');
const hiyongGunWangYak = require('../../test/contents_hiYongGun');
const hapChungSentence = require('../../test/contents_hapChung');
exports.interface = () => {
    // 생일
    myManseInterF.report_sajuinfo_birth_solar = useSolar;
    myManseInterF.report_sajuinfo_birth_lunar = useLunar;
    // 절입중기정보
    myManseInterF.report_sajuinfo_seasonal_1 = myManse.julib;
    myManseInterF.report_sajuinfo_seasonal_1_word = myManse.julibGanji;
    myManseInterF.report_sajuinfo_seasonal_2 = myManse.junggi;
    myManseInterF.report_sajuinfo_seasonal_2_word = myManse.junggiGanji;
    //월령 당령 사령
    myManseInterF.report_sajuinfo_wolryeong = getWolRyeong();
    myManseInterF.report_sajuinfo_dangryeong = myManse.ryeong.yongsin;
    myManseInterF.report_sajuinfo_saryeong = myManse.ryeong.saryeong;
    //격국
    myManseInterF.report_sajuinfo_gyouk = myManse.Gyouk;
    //조화
    myManseInterF.report_sajuinfo_johwa = usePalPum.johwa;
    //복덕
    myManseInterF.report_sajuinfo_bok = checkBokDuk();
    myManseInterF.report_sago_yangYN = checkYang();
    myManseInterF.report_sago_yinYN = checkUm();
    myManseInterF.report_note_taewangYN = checkSinTaeWang();
    myManseInterF.report_note_sinyakYN = checkGukSinYak();
    myManseInterF.report_woljiWord = usePillar.m_land
    myManseInterF.report_yongWord = useRyeong.yongsin;
    myManseInterF.report_gyoukWord = myManse.Gyouk;
    myManseInterF.report_yong = useRyeong.yongsin;
    myManseInterF.report_yong_gisinWord_1 = useRyeong.geuk_gisin.word;
    myManseInterF.report_yong_gisinYN_1 = checkYND(useRyeong.geuk_gisin);
    myManseInterF.report_yong_gisinWord_2 = useRyeong.um_gisin.word;
    myManseInterF.report_yong_gisinYN_2 = checkYND(useRyeong.um_gisin);
    myManseInterF.report_hisinWord = useRyeong.heuisin.word;
    myManseInterF.report_hisinYN = checkYND(useRyeong.heuisin);
    myManseInterF.report_hisin_gisinWord_1 = useRyeong.geuk_heuisin_gisin.word;
    myManseInterF.report_hisin_gisinYN_1 = checkYND(useRyeong.geuk_heuisin_gisin);
    myManseInterF.report_hisin_gisinWord_2 = useRyeong.um_heuisin_gisin.word;
    myManseInterF.report_hisin_gisinYN_2 = checkYND(useRyeong.um_heuisin_gisin);
    myManseInterF.report_yong_methodWord_1 = useRyeong.junghwa.word;
    myManseInterF.report_yong_methodYN_1 = checkYND(useRyeong.junghwa);
    myManseInterF.report_yong_methodWord_2 = useRyeong.junghwa_gisin.word;
    myManseInterF.report_yong_methodYN_2 = checkYND(useRyeong.junghwa_gisin);
    myManseInterF.report_yong_jisokWord = useRyeong.jisok.word;
    myManseInterF.report_yong_jisokYN = checkYND(useRyeong.jisok);
    myManseInterF.report_yong_hwakjangWord = useRyeong.hwakjang.word;
    myManseInterF.report_yong_hwakjangYN = checkYND(useRyeong.hwakjang);
    myManseInterF.report_yong_cont_title = ryeongText.randum().title
    myManseInterF.report_yong_cont = ryeongText.randum().contents
    myManseInterF.report_gyoukWord = myManse.Gyouk
    myManseInterF.report_gyoukYN = checkSungPa()
    myManseInterF.report_sangsinWord = useShgj.sangsin.yuksin
    myManseInterF.report_sangsinYN = checkYND(useShgj.sangsin);
    myManseInterF.report_gusinWord = useShgj.gusin.yuksin
    myManseInterF.report_gusinYN = checkYND(useShgj.gusin);
    myManseInterF.report_sangsingisinWord = useShgj.sangsingisin.yuksin
    myManseInterF.report_sangsingisinYN = checkYND(useShgj.sangsingisin);
    myManseInterF.report_gusingisinWord = checkUndefined(useShgj.gusingisin)
    myManseInterF.report_gusingisinYN = checkYND(useShgj.gusingisin);
    myManseInterF.report_gyoukgisinWord = checkUndefined(useShgj.gukgisin)
    myManseInterF.report_gyoukgisinYN = checkYND(useShgj.gukgisin);
    myManseInterF.report_gyouk_cont_title = gyeokText.randum().title
    myManseInterF.report_gyouk_cont =gyeokText.randum().contents +'\n\n'+gungText.randum().contents
    myManseInterF.report_saeng_gyoukWord = myManse.Gyouk;
    myManseInterF.report_saeng_jaesal = checkSiksinJeSal().yn;
    myManseInterF.report_saeng_jaesalExist = checkSiksinJeSalExist();
    myManseInterF.report_saeng_jaesalWord = checkSiksinJeSal().word;
    //생화
    myManseInterF.report_gyouk_saengWord = changeSengHwa(useShgj.sanghwa)
    myManseInterF.report_gyouk_saengYN = checkYND(useShgj.sanghwa);
    //설화
    myManseInterF.report_gyouk_sulWord = changeSulHwa(useShgj.sulhwa)
    myManseInterF.report_gyouk_sulYN = checkYND(useShgj.sulhwa);
    // 생화제화
    myManseInterF.report_gyouk_saeng_jaeWord = changeSengHwa_zeHwa(useShgj.sengHwa_zeHwa)
    myManseInterF.report_gyouk_saeng_jaeYN = checkYND(useShgj.sengHwa_zeHwa);
    //생화합화
    myManseInterF.report_gyouk_saeng_hapWord = checkUndefined(useShgj.sengHwa_hapHwa)
    myManseInterF.report_gyouk_saeng_hapYN = checkYND(useShgj.sengHwa_hapHwa);
    //설화제화
    myManseInterF.report_gyouk_sul_jaeWord = changeSulHwa_zeHwa(useShgj.sulHwa_zeHwa)
    myManseInterF.report_gyouk_sul_jaeYN = checkYND(useShgj.sulHwa_zeHwa);
    //설화합화
    myManseInterF.report_gyouk_sul_hapWord = checkUndefined(useShgj.sulHwa_hapHwa)
    myManseInterF.report_gyouk_sul_hapYN = checkYND(useShgj.sulHwa_hapHwa);
    myManseInterF.report_shgj_cont_title = '타이틀없음'
    myManseInterF.report_shgj_cont =shgjText.randum().contents
    myManseInterF.report_ilgan_hiyongWord_1 = checkHiYongWord(usePillar.h_sky).word;
    myManseInterF.report_ilgan_hiyongYN_1 = checkHiYongWord(usePillar.h_sky).yn;
    myManseInterF.report_ilgan_hiyongWhat_1 = checkHiYongWord(usePillar.h_sky).hiyong;
    myManseInterF.report_ilgan_hiyongWord_2 = usePillar.d_sky;
    myManseInterF.report_ilgan_hiyongYN_2 = 'Y';
    myManseInterF.report_ilgan_hiyongWhat_2 = '일간';
    myManseInterF.report_ilgan_hiyongWord_3 = checkHiYongWord(usePillar.m_sky).word;
    myManseInterF.report_ilgan_hiyongYN_3 = checkHiYongWord(usePillar.m_sky).yn;
    myManseInterF.report_ilgan_hiyongWhat_3 = checkHiYongWord(usePillar.m_sky).hiyong;
    myManseInterF.report_ilgan_hiyongWord_4 = checkHiYongWord(usePillar.y_sky).word;
    myManseInterF.report_ilgan_hiyongYN_4 = checkHiYongWord(usePillar.y_sky).yn;
    myManseInterF.report_ilgan_hiyongWhat_4 = checkHiYongWord(usePillar.y_sky).hiyong;
    myManseInterF.report_ilgan_geunWord_1 = checkGun(usePillar.h_land, 'h').word;
    myManseInterF.report_ilgan_geunYN_1 = checkGun(usePillar.h_land, 'h').yn;
    myManseInterF.report_ilgan_geunWhat_1 = checkGun(usePillar.h_land, 'h').gun;
    myManseInterF.report_ilgan_geunWord_2 = checkGun(usePillar.d_land, 'd').word;
    myManseInterF.report_ilgan_geunYN_2 = checkGun(usePillar.d_land, 'd').yn;
    myManseInterF.report_ilgan_geunWhat_2 = checkGun(usePillar.d_land, 'd').gun;
    myManseInterF.report_ilgan_geunWord_3 = usePillar.m_land;
    myManseInterF.report_ilgan_geunYN_3 = 'N';
    myManseInterF.report_ilgan_geunWhat_3 = '월지';
    myManseInterF.report_ilgan_geunWord_4 = checkGun(usePillar.y_land, 'y').word;
    myManseInterF.report_ilgan_geunYN_4 = checkGun(usePillar.y_land, 'y').yn;
    myManseInterF.report_ilgan_geunWhat_4 = checkGun(usePillar.y_land, 'y').gun;
    myManseInterF.report_ilgan_hiWord = hiyongUtil.hiCheck()
    myManseInterF.report_ilgan_hiYN = hiyongUtil.checkHiYN()
    myManseInterF.report_ilgan_yongWord = hiyongUtil.yongCheck()
    myManseInterF.report_ilgan_yongYN = hiyongUtil.checkYongYN()
    myManseInterF.report_ilgan_geunwang = checkGunWangYak('근왕')
    myManseInterF.report_ilgan_geunyak = checkGunWangYak('근약')
    myManseInterF.report_ilgan_hiyong_cont_title = hiyongGunWangYak.randum().title
    myManseInterF.report_ilgan_hiyong_cont = hiyongGunWangYak.randum().contents
    // myManseInterF.report_ilgan_hiyong_cont_title = '글필요'
    // myManseInterF.report_ilgan_hiyong_cont = '글필요'
    let tempHour = hapChungYN(usePillar.h_land)
    myManseInterF.report_hapchung_hourWord =tempHour.word
    myManseInterF.report_hapchung_hourYN =tempHour.yn
    myManseInterF.report_hapchung_hourWhat =tempHour.what
    myManseInterF.report_hapchung_hourSamhap =tempHour.samhap
    myManseInterF.report_hapchung_hourBanghap =tempHour.banghap
    myManseInterF.report_hapchung_hourYukhap =tempHour.yukhap
    myManseInterF.report_hapchung_hourChung =tempHour.chung
    myManseInterF.report_hapchung_hourSangChung =tempHour.sangChung
    let tempDay = hapChungIlJiYN(usePillar.d_land)
    myManseInterF.report_hapchung_dayWord =tempDay.word
    myManseInterF.report_hapchung_dayYN =tempDay.yn
    myManseInterF.report_hapchung_dayWhat =tempDay.what
    myManseInterF.report_hapchung_daySamhap =tempDay.samhap
    myManseInterF.report_hapchung_dayBanghap =tempDay.banghap
    myManseInterF.report_hapchung_dayYukhap =tempDay.yukhap
    myManseInterF.report_hapchung_dayChung =tempDay.chung
    myManseInterF.report_hapchung_daySangChung =tempDay.sangChung
    let tempMonth = hapChungWolJiYN(usePillar.m_land)
    myManseInterF.report_hapchung_monWord = tempMonth.word
    myManseInterF.report_hapchung_monYN = tempMonth.yn
    myManseInterF.report_hapchung_monWhat = tempMonth.what
    myManseInterF.report_hapchung_monSamhap =tempMonth.samhap
    myManseInterF.report_hapchung_monBanghap =tempMonth.banghap
    myManseInterF.report_hapchung_monYukhap =tempMonth.yukhap
    myManseInterF.report_hapchung_monChung =tempMonth.chung
    myManseInterF.report_hapchung_monSangChung =tempMonth.sangChung
    let tempYear = hapChungYN(usePillar.y_land)
    myManseInterF.report_hapchung_yearWord = tempYear.word
    myManseInterF.report_hapchung_yearYN =  tempYear.yn
    myManseInterF.report_hapchung_yearWhat =  tempYear.what
    myManseInterF.report_hapchung_yearSamhap =tempYear.samhap
    myManseInterF.report_hapchung_yearBanghap =tempYear.banghap
    myManseInterF.report_hapchung_yearYukhap =tempYear.yukhap
    myManseInterF.report_hapchung_yearChung =tempYear.chung
    myManseInterF.report_hapchung_yearSangChung =tempYear.sangChung
    myManseInterF.report_hapchung_mon = checkWolJiHapCheck()
    myManseInterF.report_hapchung_mon_word = usePillar.m_land
    myManseInterF.report_hapchung_mon_samhapYN = hapChung.checkSamhapWolYN();
    myManseInterF.report_hapchung_mon_chungYN = (hapChung.checkSamhapWolYN() === 'Y' &&
        hapChung.checkChungWolYN() === 'Y')
        ? "Y" : "N";
    myManseInterF.report_hapchung_mon_banghapYN = hapChung.checkbanghapWolYN();
    myManseInterF.report_hapchung_mon_banghap_chungYN = (hapChung.checkbanghapWolYN() === 'Y' &&
        hapChung.checkChungWolYN() === 'Y')
        ? "Y" : "N";
    myManseInterF.report_hapchung_day = hapChung.checkYukhapilJiYN()
    myManseInterF.report_hapchung_day_word = usePillar.d_land
    myManseInterF.report_hapchung_day_yukhapYN = hapChung.checkYukhapChoiceYN(usePillar.d_land, 'D');
    myManseInterF.report_hapchung_day_chungYN = (hapChung.checkYukhapChoiceYN(usePillar.d_land, 'D') === 'Y' &&
        hapChung.checkChungChoiceYN(usePillar.d_land, 'D') === 'Y')
        ? "Y" : "N";
    myManseInterF.report_hapchung_cont_title = hapChungSentence.randum().title
    myManseInterF.report_hapchung_cont =hapChungSentence.randum().contents
    myManseInterF.testHTML =testHTML()
}

const testHTML = () =>{
    let result =""
    result="<H3>HTMLTEST</H3> <br/> TestTestTest "
    return result;
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
const checkWolJiHapCheck = () => {
    let result = 'N'

    if (hapChung.checkSamhapWolYN()==='Y'||
    hapChung.checkbanghapWolYN()==='Y'
    ) {
        result = 'Y'
    }
    return result
}


/*const checkHapChungInPalZa = (num, word) => {
    let result = {
        word: '',
        yn: 'N',
        what: ''
    }
    const samhap = [useHapChung.samhap.hour,
    useHapChung.samhap.day,
    useHapChung.samhap.month,
    useHapChung.samhap.year]
    const banghap = [useHapChung.banghap.hour,
    useHapChung.banghap.day,
    useHapChung.banghap.month,
    useHapChung.banghap.year]
    const yukhap = [useHapChung.yukhap.hour,
    useHapChung.yukhap.day,
    useHapChung.yukhap.month,
    useHapChung.yukhap.year]
    const chung = [useHapChung.chung.hour,
    useHapChung.chung.day,
    useHapChung.chung.month,
    useHapChung.chung.year]

    if (samhap[num] !== '' || banghap[num] !== '' || yukhap[num] !== '') {
        if (chung[num] !== '') {
            result.word = word
            result.yn = 'Y'
            result.what = '합충'
        }
        else {
            result.word = word
            result.yn = 'Y'
            result.what = '합'
        }
    }
    else if (chung[num] !== '') {
        result.word = word
        result.yn = 'Y'
        result.what = '충'
    }
    return result
}*/

const hapChungYN =(pillar) =>{
    let result = {
        word: '',
        yn: 'N',
        what: '',
        samhap:'N',
        banghap:'N',
        yukhap:'N',
        chung:'N',
        sangChung:'N',
    }

    //삼합방합육합 이있으면 합
    if(hapChung.checkSamhapWolSpecificJiJiYN(pillar)==='Y'||
    hapChung.checkBanghapWolSpecificJiJiYN(pillar)==='Y'||
    hapChung.checkYukhapIlJiSpecificJiJiYN(pillar)==='Y'
    ){
        result.word=pillar
        result.yn='Y'
        result.what='합'
        //삼합 방합인데 월지충이면 합충
        if((hapChung.checkSamhapWolSpecificJiJiYN(pillar)==='Y'||
        hapChung.checkBanghapWolSpecificJiJiYN(pillar)==='Y' )&&
        hapChung.checkChungWolJiSpecificJiJiYN(pillar)==='Y') {
            result.what='합충'
            result.sangChung='Y'
        }
       //육합인데 일지충이면 합충
        else if(hapChung.checkYukhapIlJiSpecificJiJiYN(pillar)==='Y' &&
        hapChung.checkChungIlJiSpecificJiJiYN(pillar)==='Y'){
            result.what='합충'
            result.sangChung='Y'
        }
       if(hapChung.checkSamhapWolSpecificJiJiYN(pillar)==='Y'){
        result.samhap='Y'
        }

        if(hapChung.checkBanghapWolSpecificJiJiYN(pillar)==='Y'){
            result.banghap='Y'
        }
        if(hapChung.checkYukhapIlJiSpecificJiJiYN(pillar)==='Y'){
            result.yukhap='Y'
        }
    }
    //월지 일지에 충만 있을경우
    else if(hapChung.checkChungWolJiSpecificJiJiYN(pillar)==='Y'||
    hapChung.checkChungIlJiSpecificJiJiYN(pillar)==='Y') {
        result.word=pillar
        result.yn='Y'
        result.what='충'
        result.chung='Y'
    }
    return result;
}

// 합충 일지전용
const hapChungIlJiYN =(pillar) =>{
    let result = {
        word: '',
        yn: 'N',
        what: '',
        samhap:'N',
        banghap:'N',
        yukhap:'N',
        chung:'N',
        sangChung:'N',
    }
    //삼합방합육합 이있으면 합
    if(hapChung.checkSamhapWolSpecificJiJiYN(pillar)==='Y'||
    hapChung.checkBanghapWolSpecificJiJiYN(pillar)==='Y'||
    hapChung.checkYukhapilJiYN()==='Y'
    ){
        result.word=pillar
        result.yn='Y'
        result.what='합'
        //삼합 방합인데 일지에 이미 충이있다면
        if((hapChung.checkSamhapWolSpecificJiJiYN(pillar)==='Y'||
        hapChung.checkBanghapWolSpecificJiJiYN(pillar)==='Y' )&&
        hapChung.checkChungilJiYN()==='Y') {
            result.what='합충'
            result.sangChung='Y'
        }
        // 일지 육합인데 충이면 합충
        if(  hapChung.checkYukhapilJiYN()==='Y'&&
        hapChung.checkChungilJiYN()==='Y') {
            result.what='합충'
            result.sangChung='Y'
        }
        // 삼합만 있을때
        if(hapChung.checkSamhapWolSpecificJiJiYN(pillar)==='Y'){
            result.samhap='Y'
        }
        // 방합만 있을때 
        if(hapChung.checkBanghapWolSpecificJiJiYN(pillar)==='Y'){
            result.banghap='Y'
        }
        // 육합만 있을때 
        if(hapChung.checkYukhapilJiYN()==='Y'){
            result.yukhap='Y'
        }
    }
    //일지에 충만 있을경우
    else if(  hapChung.checkChungilJiYN()==='Y') {
        result.word=pillar
        result.yn='Y'
        result.what='충'
        result.chung='Y'
    }
    return result;
}

// 합충 월지전용
const hapChungWolJiYN =(pillar) =>{
    let result = {
        word: '',
        yn: 'N',
        what: '',
        samhap:'N',
        banghap:'N',
        yukhap:'N',
        chung:'N',
        sangChung:'N',
    }
    //삼합방합육합 이있으면 합
    if(hapChung.checkSamhapWolYN()==='Y'||
    hapChung.checkbanghapWolYN()==='Y'||
    hapChung.checkYukhapIlJiSpecificJiJiYN(pillar)==='Y'
    ){
        result.word=pillar
        result.yn='Y'
        result.what='합'

        //육합인데 충이면 합충
         if(hapChung.checkYukhapIlJiSpecificJiJiYN(pillar)==='Y' &&
        hapChung.checkChungWolYN()==='Y'){
            result.what='합충'
            result.sangChung='Y'
        }
        // 방합이나 삼합이있는데 충도있으면 상충
        if((hapChung.checkSamhapWolYN()==='Y'||
         hapChung.checkbanghapWolYN()==='Y')&&
        hapChung.checkChungWolYN()==='Y'){
            result.what='합충'
            result.sangChung='Y'
        }
                // 삼합만 있을때
        if(hapChung.checkSamhapWolYN()==='Y'){
            result.samhap='Y'
        }
        // 방합만 있을때 
       if(hapChung.checkbanghapWolYN()==='Y'){
        result.banghap='Y'
        }
        // 육합만 있을때 
        if(hapChung.checkYukhapIlJiSpecificJiJiYN(pillar)==='Y'){
            result.yukhap='Y'
        }
    }

    //월지 충만 있을경우
    else if(hapChung.checkChungWolYN() === 'Y') {
        result.word=pillar
        result.yn='Y'
        result.what='충'
        result.chung='Y'
    }
    return result;
}

const checkGunWangYak = (word) => {
    let result = 'N';
    if (gunFunction.gun() === word) {
        result = 'Y';
    }
    return result;
}
const checkGun = (word, check) => {
    let result = {
        word: '',
        gun: '',
        yn: 'N'
    }
    let gunArray = []
    if (check === 'y') {
        gunArray = [
            useBasicFunc.rootTong.y_jangan1,
            useBasicFunc.rootTong.y_jangan2,
            useBasicFunc.rootTong.y_jangan3
        ]
    }
    else if (check === 'd') {
        gunArray = [
            useBasicFunc.rootTong.d_jangan1,
            useBasicFunc.rootTong.d_jangan2,
            useBasicFunc.rootTong.d_jangan3
        ]
    }
    else if (check === 'h') {
        gunArray = [
            useBasicFunc.rootTong.h_jangan1,
            useBasicFunc.rootTong.h_jangan2,
            useBasicFunc.rootTong.h_jangan3
        ]
    }

    if (gunArray.includes('pure_root')) {
        result = {
            word: word,
            gun: '근',
            yn: 'Y'
        }
    }
    else if(gunArray.includes('samhap_root')){
        result = {
            word: word,
            gun: '삼합근',
            yn: 'N'
        }
    }
    else if(gunArray.includes('noonchi_root')){
        result = {
            word: word,
            gun: '눈치근',
            yn: 'N'
        }
    }
    else if(gunArray.includes('seson_root')){
        result = {
            word: word,
            gun: '계절근',
            yn: 'N'
        }
    }
    return result;
}
const checkHiYongWord = (word) => {
    let result = {
        word: '',
        hiyong: '',
        yn: 'N'
    };
    if (hiyong.checkHi(usePillar.d_sky, word) === true) {
        result.word = word
        result.hiyong = '희'
        result.yn = 'Y'
    }
    else if (hiyong.checkYong(usePillar.d_sky, word) === true) {
        result.word = word
        result.hiyong = '용'
        result.yn = 'Y'
    }
    return result;
}

const checkSiksinJeSal = () => {
    let yuksin = [
        useYuksin.y_sky,
        useYuksin.m_sky,
        useYuksin.d_sky,
        useYuksin.h_sky,
        useYuksin.y_jangan.y_jangan1,
        useYuksin.y_jangan.y_jangan2,
        useYuksin.y_jangan.y_jangan3,
        useYuksin.m_jangan.m_jangan1,
        useYuksin.m_jangan.m_jangan2,
        useYuksin.m_jangan.m_jangan3,
        useYuksin.d_jangan.d_jangan1,
        useYuksin.d_jangan.d_jangan2,
        useYuksin.d_jangan.d_jangan3,
        useYuksin.h_jangan.h_jangan1,
        useYuksin.h_jangan.h_jangan2,
        useYuksin.h_jangan.h_jangan3,
    ];
    const use = [
        '  ',
        '  ',
        '  ',
        '  ',
        usejijangganUse.yong.y_land.y_jangan1,
        usejijangganUse.yong.y_land.y_jangan2,
        usejijangganUse.yong.y_land.y_jangan3,
        usejijangganUse.yong.m_land.m_jangan1,
        usejijangganUse.yong.m_land.m_jangan2,
        usejijangganUse.yong.m_land.m_jangan3,
        usejijangganUse.yong.d_land.d_jangan1,
        usejijangganUse.yong.d_land.d_jangan2,
        usejijangganUse.yong.d_land.d_jangan3,
        usejijangganUse.yong.h_land.h_jangan1,
        usejijangganUse.yong.h_land.h_jangan2,
        usejijangganUse.yong.h_land.h_jangan3,
    ];
    let result ={
        yn:'N',
        word:'',
    };
    const possibleUse = new Map()
    possibleUse.set('pyeongGuan', 'N')
    possibleUse.set('jungGuan', 'N')
    possibleUse.set('jungIn', 'N')
    possibleUse.set('siksin', 'N')

    for (let i = 0; i < yuksin.length; i++) {
        if (String(use[i]).includes('young') ||
            String(use[i]).trim() === '' ||
            use[i] === undefined) {
            if (yuksin[i] === '식신') {
                possibleUse.set('siksin', 'Y')
            }
            else if (yuksin[i] === '편관') {
                possibleUse.set('pyeongGuan', 'Y')
            }
            else if (yuksin[i] === '정인') {
                possibleUse.set('jungIn', 'Y')
            }
            else if (yuksin[i] === '정관') {
                possibleUse.set('jungGuan', 'Y')
            }
        }

    }
    if (useGyouk==='양인격') {
        result.word='편관'
    }
    else  if (useGyouk==='건록격') {
        result.word='정관'
    }
    else  if (useGyouk==='편관격') {
        result.word='제살'
    }
    else  if (useGyouk==='상관격') {
        result.word='패인'
    }
    if (useShgj.sangsin.use.includes('Y' )&&
    useShgj.sangsin.exist==='Y') {
        result.yn='Y'
    }

    return result
}
const checkSiksinJeSalExist = () => {
    let result = 'N';
    if (useShgj.gukgubun === "흉격") {
        result = 'Y'
    }
    return result
}
const checkUndefined = (word) => {
    let result;
    if (word === undefined) {
        result = ''
    }
    else {
        result = word.yuksin
    }

    return result
}

const changeSengHwa = (word) => {
    let result =""

    if (word === undefined) {
        result = ''
    }
    else if (useGyouk==='정인격') {
        result='관인상생'
    }
    else if (useGyouk==='편인격') {
        result='살인상생'
    }
    else if (useGyouk==='식신격') {
        result='비식'
    }
    else if (useGyouk==='정관격') {
        result='재생관'
    }
    else if (useGyouk==='정재격') {
        result='상관생재'
    }
    else if (useGyouk==='편재격') {
        result='식신생재'
    }
    else if (useGyouk==='상관격') {
        result='관인상생'
    }
    else if (useGyouk==='편관격') {
        result='비식'
    }
    else if (useGyouk==='건록격') {
        result='재생관'
    }
    else if (useGyouk==='양인격') {
        result='재생살'
    }
    else  {
        result=word.yuksin
    }
    return result
}

const changeSulHwa = (word) => {
    let result =""

    if (word === undefined) {
        result = ''
    }
    else if (useGyouk==='정인격') {
        result='인겁'
    }
    else if (useGyouk==='편인격') {
        result='인비'
    }
    else if (useGyouk==='식신격') {
        result='식신생재'
    }
    else if (useGyouk==='정관격') {
        result='관인상생'
    }
    else if (useGyouk==='정재격') {
        result='재생관'
    }
    else if (useGyouk==='편재격') {
        result='재생살'
    }
    else if (useGyouk==='상관격') {
        result='인겁'
    }
    else if (useGyouk==='편관격') {
        result='재생살'
    }
    else if (useGyouk==='건록격') {
        result='관인'
    }
    else if (useGyouk==='양인격') {
        result='살인'
    }
    else  {
        result=word.yuksin
    }
    return result
}

const changeSengHwa_zeHwa = (word) => {
    let result =""

    if (word === undefined) {
        result = ''
    }
    else if (useGyouk==='정인격') {
        result='상관패인'
    }
    else if (useGyouk==='편인격') {
        result='탈식'
    }
    else if (useGyouk==='식신격') {
        result='식신제살'
    }
    else if (useGyouk==='정관격') {
        result='제겁'
    }
    else if (useGyouk==='정재격') {
        result='재극인'
    }
    else if (useGyouk==='편재격') {
        result='재극인'
    }
    else  {
        result=word.yuksin
    }
    return result
}

const changeSulHwa_zeHwa = (word) => {
    let result =""

    if (word === undefined) {
        result = ''
    }
    else if (useGyouk==='정인격') {
        result='재극인'
    }
    else if (useGyouk==='편인격') {
        result='재극인'
    }
    else if (useGyouk==='식신격') {
        result='재극인'
    }
    else if (useGyouk==='정관격') {
        result='상관패인'
    }
    else if (useGyouk==='정재격') {
        result='제겁'
    }
    else if (useGyouk==='편재격') {
        result='제비'
    }
    else if (useGyouk==='상관격') {
        result='재극인'
    }
    else if (useGyouk==='편관격') {
        result='재극인'
    }
    else  {
        result=word.yuksin
    }
    return result
}
const checkSungPa = () => {
    let result = 'N'
    if (useShgj.gukgubun === "길격") {
        if ((useShgj.sangsin.exist === 'Y' && useShgj.sangsin.use.includes('Y'))
            ||
            (useShgj.gusin.exist === 'Y' && useShgj.gusin.use.includes('Y'))) {
            result = 'Y'
        }
    }
    else {
        if ((useShgj.sangsin.exist === 'Y' && useShgj.sangsin.use.includes('Y'))) {
            result = 'Y'
        }
    }
    return result;
}
const checkYND = (word) => {
    let result = 'N'
    if (word === undefined) {

    }
    else if (word.exist === 'Y') {
        if (word.use.includes('y') || word.use.includes('Y')) {
            result = 'Y'
        }
        else {
            result = 'D'
        }
    }

    return result;
}
const checkBokDuk = () => {
    let result = 'N'
    if (usePalPum.people === 'Y' || usePalPum.money === 'Y') {
        result = 'Y'
    }
    return result;
}
const checkYang = () => {
    let result = "N";
    if (umYangFunc.umYang(usePillar.d_sky, 1) === "양") {
        result = "Y"
    }

    return result;
}

const checkUm = () => {
    let result = "N";
    if (umYangFunc.umYang(usePillar.d_sky, 1) === "음") {
        result = "Y"
    }

    return result;
}
const checkSinTaeWang = () => {
    let result = "N";
    const skyPillar = [
        useYuksin.y_sky,
        useYuksin.m_sky,
        useYuksin.h_sky
    ]
    let yuksin = [
        useYuksin.y_sky,
        useYuksin.m_sky,
        useYuksin.d_sky,
        useYuksin.h_sky,
        useYuksin.y_jangan.y_jangan1,
        useYuksin.y_jangan.y_jangan2,
        useYuksin.y_jangan.y_jangan3,
        useYuksin.m_jangan.m_jangan1,
        useYuksin.m_jangan.m_jangan2,
        useYuksin.m_jangan.m_jangan3,
        useYuksin.d_jangan.d_jangan1,
        useYuksin.d_jangan.d_jangan2,
        useYuksin.d_jangan.d_jangan3,
        useYuksin.h_jangan.h_jangan1,
        useYuksin.h_jangan.h_jangan2,
        useYuksin.h_jangan.h_jangan3,
    ];
    const use = [
        '  ',
        '  ',
        '  ',
        '  ',
        usejijangganUse.yong.y_land.y_jangan1,
        usejijangganUse.yong.y_land.y_jangan2,
        usejijangganUse.yong.y_land.y_jangan3,
        usejijangganUse.yong.m_land.m_jangan1,
        usejijangganUse.yong.m_land.m_jangan2,
        usejijangganUse.yong.m_land.m_jangan3,
        usejijangganUse.yong.d_land.d_jangan1,
        usejijangganUse.yong.d_land.d_jangan2,
        usejijangganUse.yong.d_land.d_jangan3,
        usejijangganUse.yong.h_land.h_jangan1,
        usejijangganUse.yong.h_land.h_jangan2,
        usejijangganUse.yong.h_land.h_jangan3,
    ];

    const possibleUse = new Map()
    possibleUse.set('gun', 'N')

    if (useBasicFunc.rootTong.totalRoot !== 'mu_root') {
        possibleUse.set('gun', 'Y')
    }
    possibleUse.set('bugub', 'N')
    if (skyPillar.includes('비견') || skyPillar.includes('겁재')) {
        possibleUse.set('bugub', 'Y')
    }
    possibleUse.set('inSung', 'N')
    possibleUse.set('jaeSung', 'N')

    for (let i = 0; i < yuksin.length; i++) {
        if (String(use[i]).includes('young') ||
            String(use[i]).trim() === '' ||
            use[i] === undefined) {
            if (yuksin[i] === '정인' || yuksin[i] === '편인') {
                possibleUse.set('inSung', 'Y')
            }
            if (yuksin[i] === '정재' || yuksin[i] === '편재') {
                possibleUse.set('jaeSung', 'Y')
            }
        }

    }

    if (possibleUse.get('gun') === 'Y' &&
        (possibleUse.get('bugub') === 'Y' || possibleUse.get('inSung') === 'Y') &&
        possibleUse.get('jaeSung') === 'Y') {
        result = 'Y'
    }
    return result;
}
const checkGukSinYak = () => {
    let result = "N";
    let yuksin = [
        useYuksin.y_sky,
        useYuksin.m_sky,
        useYuksin.d_sky,
        useYuksin.h_sky,
        useYuksin.y_jangan.y_jangan1,
        useYuksin.y_jangan.y_jangan2,
        useYuksin.y_jangan.y_jangan3,
        useYuksin.m_jangan.m_jangan1,
        useYuksin.m_jangan.m_jangan2,
        useYuksin.m_jangan.m_jangan3,
        useYuksin.d_jangan.d_jangan1,
        useYuksin.d_jangan.d_jangan2,
        useYuksin.d_jangan.d_jangan3,
        useYuksin.h_jangan.h_jangan1,
        useYuksin.h_jangan.h_jangan2,
        useYuksin.h_jangan.h_jangan3,
    ];
    const use = [
        '  ',
        '  ',
        '  ',
        '  ',
        usejijangganUse.yong.y_land.y_jangan1,
        usejijangganUse.yong.y_land.y_jangan2,
        usejijangganUse.yong.y_land.y_jangan3,
        usejijangganUse.yong.m_land.m_jangan1,
        usejijangganUse.yong.m_land.m_jangan2,
        usejijangganUse.yong.m_land.m_jangan3,
        usejijangganUse.yong.d_land.d_jangan1,
        usejijangganUse.yong.d_land.d_jangan2,
        usejijangganUse.yong.d_land.d_jangan3,
        usejijangganUse.yong.h_land.h_jangan1,
        usejijangganUse.yong.h_land.h_jangan2,
        usejijangganUse.yong.h_land.h_jangan3,
    ];
    const possibleUse = new Map()
    possibleUse.set('gun', 'N')

    if (useBasicFunc.rootTong.totalRoot === 'mu_root') {
        possibleUse.set('gun', 'Y')
    }
    possibleUse.set('inSung', 'N')
    possibleUse.set('guanSung', 'N')

    for (let i = 0; i < yuksin.length; i++) {
        if (String(use[i]).includes('young') ||
            String(use[i]).trim() === '' ||
            use[i] === undefined) {
            if (yuksin[i] === '정인' || yuksin[i] === '편인') {
                possibleUse.set('inSung', 'Y')
            }
            if (yuksin[i] === '정관' || yuksin[i] === '편관') {
                possibleUse.set('guanSung', 'Y')
            }
        }

    }

    if (possibleUse.get('gun') === 'Y' &&
        possibleUse.get('inSung') === 'N' &&
        possibleUse.get('jaeSung') === 'Y') {
        result = "Y"
    }
    return result;
}




