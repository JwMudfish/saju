const chungan = [
    {
        code: '갑',
        value: '甲'
    },
    {
        code: '을',
        value: '乙'
    },
    {
        code: '병',
        value: '丙'
    },
    {
        code: '정',
        value: '丁'
    },
    {
        code: '무',
        value: '戊'
    },
    {
        code: '기',
        value: '己'
    },
    {
        code: '경',
        value: '庚'
    },
    {
        code: '신',
        value: '辛'
    },
    {
        code: '임',
        value: '壬'
    },
    {
        code: '계',
        value: '癸'
    }
]

const jiji = [
    {
        code: '자',
        value: '子'
    },
    {
        code: '축',
        value: '丑'
    },
    {
        code: '인',
        value: '寅'
    },
    {
        code: '묘',
        value: '卯'
    },
    {
        code: '진',
        value: '辰'
    },
    {
        code: '사',
        value: '巳'
    },
    {
        code: '오',
        value: '午'
    },
    {
        code: '미',
        value: '未'
    },
    {
        code: '신',
        value: '申'
    },
    {
        code: '유',
        value: '酉'
    },
    {
        code: '술',
        value: '戌'
    },
    {
        code: '해',
        value: '亥'
    }
]

const ohang = [
    {
        code: '화',
        value: 'fire circle'
    },
    {
        code: '금',
        value: 'gray circle'
    },
    {
        code: '목',
        value: 'blue circle'
    },
    {
        code: '수',
        value: 'dark_gray circle'
    },
    {
        code: '토',
        value: 'gold circle'
    }
]

class ManseUtils {
    // Mapping 테이블 생성
    static mapCreate(value) {
        const MapTable = new Map()
        for (let item of value) {
            MapTable.set(item.code, item.value)
        }
        return MapTable
    }
}

exports.changeChunGan = (word) => {
    let result;
    let chunganWord = ManseUtils.mapCreate(chungan)
    if( word===undefined) {
        result = ''
    }
    else if(String(word.trim())===''){
        result = ''
    }
    else {
        result = chunganWord.get(word)
    }

    return result
}
exports.changeJIJI = (word) => {
    let result;
    let jijiWord = ManseUtils.mapCreate(jiji)
    if( word===undefined) {
        result = ''
    }
    else if(String(word.trim())===''){
        result = ''
    }
    else {
        result = jijiWord.get(word)
    }

    return result
}
exports.changeJIJITime = (solar,lunar) => {
    let result={};
    if(solar.includes('자')){
        result.solar = solar.replace(/자/gi, '子')
        result.lunar = lunar.replace(/자/gi, '子')
    }
    else if(solar.includes('축')){
        result.solar = solar.replace(/축/gi, '丑')
        result.lunar = lunar.replace(/축/gi, '丑')
    }
    else if(solar.includes('인')){
        result.solar = solar.replace(/인/gi, '寅')
        result.lunar = lunar.replace(/인/gi, '寅')
    }
    else if(solar.includes('묘')){
        result.solar = solar.replace(/묘/gi, '卯')
        result.lunar = lunar.replace(/묘/gi, '卯')
    }
    else if(solar.includes('진')){
        result.solar = solar.replace(/진/gi, '辰')
        result.lunar = lunar.replace(/진/gi, '辰')
    }
    else if(solar.includes('사')){
        result.solar = solar.replace(/사/gi, '巳')
        result.lunar = lunar.replace(/사/gi, '巳')
    }
    else if(solar.includes('오')){
        result.solar = solar.replace(/오/gi, '午')
        result.lunar = lunar.replace(/오/gi, '午')
    }
    else if(solar.includes('미')){
        result.solar = solar.replace(/미/gi, '未')
        result.lunar = lunar.replace(/미/gi, '未')
    }
    else if(solar.includes('신')){
        result.solar = solar.replace(/신/gi, '申')
        result.lunar = lunar.replace(/신/gi, '申')
    }
    else if(solar.includes('유')){
        result.solar = solar.replace(/유/gi, '酉')
        result.lunar = lunar.replace(/유/gi, '酉')
    }
    else if(solar.includes('술')){
        result.solar = solar.replace(/술/gi, '戌')
        result.lunar = lunar.replace(/술/gi, '戌')
    }
    else if(solar.includes('해')){
        result.solar = solar.replace(/해/gi, '亥')
        result.lunar = lunar.replace(/해/gi, '亥')
    }
    else {
        result.solar = solar
        result.lunar = lunar
    }

    return result
}
exports.changeOhang = (word) => {
    let result;
    let ohangWord = ManseUtils.mapCreate(ohang)
    result = ohangWord.get(word)
    return result
}