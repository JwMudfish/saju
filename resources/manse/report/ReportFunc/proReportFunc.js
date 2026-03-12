
const hiyong = require('../../../manseUtil/hiyong/hiyongWord');
const gunFunction = require('../../../manseUtil/gun');
const hapChung = require('../../../manseUtil/hapchung/samhapUtil');
const umYangFunc = require('../../../manseUtil/umYangOHang/umYang');

exports.getWolRyeong = () => {
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
exports.checkWolJiHapCheck = () => {
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

exports.hapChungYN =(pillar) =>{
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
exports.hapChungIlJiYN =(pillar) =>{
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
exports.hapChungWolJiYN =(pillar) =>{
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

exports.checkGunWangYak = (word) => {
    let result = 'N';
    if (gunFunction.gun() === word) {
        result = 'Y';
    }
    return result;
}
exports.checkGun = (word, check) => {
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
exports.checkHiYongWord = (word) => {
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

exports.checkSiksinJeSal = () => {
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
exports.checkSiksinJeSalExist = () => {
    let result = 'N';
    if (useShgj.gukgubun === "흉격") {
        result = 'Y'
    }
    return result
}
exports.checkUndefined = (word) => {
    let result;
    if (word === undefined) {
        result = ''
    }
    else {
        result = word.yuksin
    }

    return result
}

exports.changeSengHwa = (word) => {
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

exports.changeSulHwa = (word) => {
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

exports.changeSengHwa_zeHwa = (word) => {
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

exports.changeSulHwa_zeHwa = (word) => {
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
exports.checkSungPa = () => {
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
exports.checkYND = (word) => {
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
exports.checkBokDuk = () => {
    let result = 'N'
    if (usePalPum.people === 'Y' || usePalPum.money === 'Y') {
        result = 'Y'
    }
    return result;
}
exports.checkYang = () => {
    let result = "N";
    if (umYangFunc.umYang(usePillar.d_sky, 1) === "양") {
        result = "Y"
    }

    return result;
}

exports.checkUm = () => {
    let result = "N";
    if (umYangFunc.umYang(usePillar.d_sky, 1) === "음") {
        result = "Y"
    }

    return result;
}
exports.checkSinTaeWang = () => {
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
exports.checkGukSinYak = () => {
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