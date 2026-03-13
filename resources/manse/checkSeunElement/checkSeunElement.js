/**
 * 세운별 요소 샘플코드
 * 추후에 코드를 수정할일 있으면, 이것을 수정하지 말고 이코드를 복사해서 붙여넣는 방식으로 작업하면됨
 */

var seunElement = {};
let yearPillar = require("../pillar/yearPillar/yearPillar");
let yuksinFunc = require("../../manseUtil/yuksin/yuksin");
const jjjUse = require("../jijangganUse/jijangganFunc");
const basicFunc = require("../basicFunc/basicFunc");
const guanGaunFunc = require("../jiJanggan/getjijanggan");
const ohangFunc = require("../../manseUtil/umYangOHang/oHang");
seunElement.seunElement = function (word, start, end) {
    let result = []
    const seunArray = getYearArray(start, end)
    let year = Number(start)
    for (let i = 0; i < seunArray.length; i++) {
        let temp = {
            year: '',
            word: '',
            YN: '',
            yuksin: ''
        };
        temp.year = year;
        temp.word = seunArray[i]
        temp.YN = checkWord(seunArray[i][0], word)
        temp.yuksin = yuksinFunc.getYuksin(seunArray[i][0],1)
        year = year + 1;
        result.push(temp)
    }
    return result;
};

seunElement.seunElementYuksin = function (word, start, end) {
    let result = []
    const seunArray = getYearArrayYuksin(start, end)
    let year = Number(start)
    for (let i = 0; i < seunArray.length; i++) {
        let temp = {
            year: '',
            YN: '',
            yuksin: ''
        };
        temp.year = year;
        temp.YN = checkWord(seunArray[i][0], word)
        temp.yuksin = word
        year = year + 1;
        result.push(temp)
    }
    return result;
};
seunElement.seunElementJiJi = function (word, start, end) {
    let result = []
    const seunArray = getYearArray(start, end)
    let year = Number(start)
    for (let i = 0; i < seunArray.length; i++) {
        let temp = {
            year: '',
            word: '',
            YN: '',
            yuksin: '',
        };
        temp.year = year;
        temp.word = seunArray[i]
        temp.yuksin = yuksinFunc.getYuksin(seunArray[i][1],2)
        temp.YN = checkWord(seunArray[i][1], word)
        temp.gun = getGun(seunArray[i][1])
        year = year + 1;
        result.push(temp)
    }
    return result;
};


const getGun = (word) => {
    let result;
    let wordUse = getUse(word, "", "Y")
    let wordJangguan = guanGaunFunc.jijganggan(word)

    let temp =String(wordJangguan).split(",");

    let root = [
        basicFunc.root_day(wordUse.jijanggan1,ohangFunc.oHang(temp[0])),
        basicFunc.root_day(wordUse.jijanggan2,ohangFunc.oHang(temp[1])),
        basicFunc.root_day(wordUse.jijanggan3,ohangFunc.oHang(temp[2]))
    ]
     if(root.includes('pure_root')){
        result='근왕'
    }
    else {
        result='근약'
    }
    return result
}

function getUse(pillar, tag, check) {
    let result = {};
  
    if (basicFunc.swgGubun(pillar) === "shang") {
      result = jjjUse.shang(tag, pillar, check);
    } else if (basicFunc.swgGubun(pillar) === "go") {
      result = jjjUse.go(pillar, tag, check);
    } else {
      result = {
        jijanggan1: "  ",
        jijanggan2: "  ",
        jijanggan3: "  ",
      };
    }
    return result;
  }

const getYearArray = (start, end) => {
    let result = [];
    for (let i = start; i < end; i++) {
        result.push(yearPillar.getYear(Number(i)))
    }
    return result;
}

const getYearArrayYuksin = (start, end) => {
    let result = [];
    for (let i = start; i < end; i++) {
        result.push([yuksinFunc.getYuksin(yearPillar.getYear(Number(i))[0],1),yuksinFunc.getYuksin(yearPillar.getYear(Number(i))[1]),2])
    }
    return result;
}

const checkWord = (one, word) => {
    let result = 'N';
    if (one === word) {
        result = "Y"
    }
    return result;
}
module.exports = seunElement;
