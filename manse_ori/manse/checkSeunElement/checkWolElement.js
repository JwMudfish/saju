var seunElement = {};
const yearPillar = require("../pillar/yearPillar/yearPillar");
const monthPillar = require("../pillar/monthPillar/monthPillar");
let yuksinFunc = require("../../manseUtil/yuksin/yuksin");
seunElement.seunElement = function (word, year, start, end) {
    let result = []
    const wolArray = getYearArray(year, start, end)
    for (let i = 0; i < wolArray.length; i++) {
        let temp = {
            month: '',
            word: '',
            YN: '',
        };
        temp.month = i;
        temp.word = wolArray[i]
        temp.YN = checkChunGan(wolArray[i][0], word)
        result.push(temp)
    }
    return result;
};

seunElement.seunElementJiJi = function (word, year, start, end) {
    let result = []
    const wolArray = getYearArray(year, start, end)
    for (let i = 0; i < wolArray.length; i++) {
        let temp = {
            month: '',
            word: '',
            YN: '',
            yuksin: [],
        };
        temp.month = i+1;
        temp.word = wolArray[i]
        temp.YN = checkChunGan(wolArray[i][1], word)
        temp.yuksin =[yuksinFunc.getYuksin(wolArray[i][0],1),yuksinFunc.getYuksin(wolArray[i][1],2)]
        result.push(temp)
    }
    return result;
};
const getYearArray = (yearNum, start, end) => {
    let result = [];
    // 1월생들때문
    let year = yearPillar.getYear(Number(yearNum - 1))
    for (let i = start; i <= end; i++) {
        if (i !== 1) {
            year = yearPillar.getYear(Number(yearNum))
        }
        let month = monthPillar.getMonth(Number(i), year[0])
        result.push(month)
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
