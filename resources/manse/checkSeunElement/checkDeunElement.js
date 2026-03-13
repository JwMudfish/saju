var seunElement = {};
const yearPillar = require("../pillar/yearPillar/yearPillar");
const monthPillar = require("../pillar/monthPillar/monthPillar");
let yuksinFunc = require("../../manseUtil/yuksin/yuksin");
seunElement.seunElement = function (word) {
    let result = []
    const deunArray = Object.values(useDeunSeun.deun)
    const deunsuArray = []
    for (let i = 0; i < 10; i++) {
        deunsuArray.push(useDeunSeun.dus + (i * 10))
    }
    for (let i = 0; i < deunArray.length; i++) {
        let temp = {
            word: '',
            YN: '',
        };
        temp.word = deunArray[i]
        temp.deunsu = deunsuArray[i]
        temp.YN = checkChunGan(deunArray[i][0], word)
        result.push(temp)
    }
    return result;
};
seunElement.seunElementYuksin = function (word, start, end) {
    let result = []
    const deunArrayYuksin = getYearArrayYuksin()
    const deunArray = Object.values(useDeunSeun.deun)
    const deunsuArray = []
    for (let i = 0; i < 10; i++) {
        deunsuArray.push(useDeunSeun.dus + (i * 10))
    }
    for (let i = 0; i < deunArray.length; i++) {
        let temp = {
            word: '',
            YN: '',
        };
        temp.word = deunArray[i]
        temp.deunsu = deunsuArray[i]
        temp.yuksin = deunArrayYuksin[i][0]
        temp.YN = checkChunGan(deunArrayYuksin[i][0], word)
        result.push(temp)
    }
    return result;
};
const getYearArrayYuksin = () => {
    let temp = Object.values(useDeunSeun.deun)
    let result = []
   for (let i = 0; i < temp.length; i++) {
    result.push([yuksinFunc.getYuksin(temp[i][0],1),yuksinFunc.getYuksin(temp[i][1],2)])
    }
    return result;
}
const checkChunGan = (chungan, word) => {
    let result = 'N';
    if (chungan === word) {
        result = "Y"
    }
    return result;
}
module.exports = seunElement;
