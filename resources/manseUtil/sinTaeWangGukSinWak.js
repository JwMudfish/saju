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