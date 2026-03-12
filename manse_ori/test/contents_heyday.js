var gusin = {};

var title = 'gusin_';
var num;
var totalTitle;
const resultTest = require('../testResult/contents_gusin.json');
const deunElement = require("../manse/checkSeunElement/checkDeunElementIF")
const umYang = require("../manse/umYangOHang/umYang")
let testArray = {}
gusin.randum = function () {
  self();
  let result = getResult(totalTitle);
  result.use = checkUse(useShgj.gusin.use);
  return result;
};
const self = () => {
  testArray = Object.values(useDeunSeun.deun).map(deun => {
    let a = {
      word: deun,
      element: '',
      yangum: '',
      deunsu: ''
    }
    return a
  })
  deunElement.seunElementIF()
  sangsinHeyday()
  checkDeunBH()
};

function sangsinHeyday() {
  // 상신 있는경우
  if (useShgj.sangsin.exist === 'Y' &&
    useShgj.sangsin.use.includes('Y')) {
    for (let i = 0; i < testArray.length; i++) {
      if (testArray[i].word === useDeunElement.shgj.sangsin.word) {
        testArray[i].element = '상신'
        testArray[i].deunsu = useDeunElement.shgj.sangsin.deunsu
      }
      if (testArray[i].word === useDeunElement.shgj.gusin.word) {
        testArray[i].element = '구신'
        testArray[i].deunsu = useDeunElement.shgj.gusin.deunsu
      }
      if (testArray[i].word === useDeunElement.shgj.sangsingisin.word) {
        testArray[i].element = '상신기신'
        testArray[i].deunsu = useDeunElement.shgj.sangsingisin.deunsu
      }
    }
    totalTitle = title + 2;
  }
  // 구신은 있고 상신은 없는경우
  else if (useShgj.gusin.exist === 'Y' &&
    useShgj.gusin.use.includes('Y')) {
    let gusingisingukgin = {
      word: '',
      deunsu: '',
      element: ''
    }
    // 구신기신 격기신 구분
    if (useDeunElement.shgj.gusingisin !== undefined) {
      gusingisingukgin.word = useDeunElement.shgj.gusingisin.word
      gusingisingukgin.deunsu = useDeunElement.shgj.gusingisin.deunsu
      gusingisingukgin.element = '구신기신'
    }
    else {
      gusingisingukgin.word = useDeunElement.shgj.gukgisin.word
      gusingisingukgin.deunsu = useDeunElement.shgj.gukgisin.deunsu
      gusingisingukgin.element = '격기신'
    }

    for (let i = 0; i < testArray.length; i++) {
      if (testArray[i].word === useDeunElement.shgj.sangsin.word) {
        testArray[i].element = '상신'
        testArray[i].deunsu = useDeunElement.shgj.sangsin.deunsu
      }
      if (testArray[i].word === useDeunElement.shgj.gusin.word) {
        testArray[i].element = '구신'
        testArray[i].deunsu = useDeunElement.shgj.gusin.deunsu
      }
      if (testArray[i].word === gusingisingukgin.word) {
        testArray[i].element = gusingisingukgin.element
        testArray[i].deunsu = gusingisingukgin.deunsu
      }
    }
    totalTitle = title + 1;
  }
  // 둘다없는경우
  else {
    hisinHeyday()
  }
}

function hisinHeyday() {
  // 희신 있는경우

  if (useRyeong.heuisin.exist === 'Y' &&
    useRyeong.heuisin.use.includes('Y')) {
    for (let i = 0; i < testArray.length; i++) {
      if (testArray[i].word === useDeunElement.ryeong.jisok.word) {
        testArray[i].element = '지속'
        testArray[i].deunsu = useDeunElement.ryeong.jisok.deunsu
      }
      if (testArray[i].word === useDeunElement.ryeong.hwakjang.word) {
        testArray[i].element = '확장'
        testArray[i].deunsu = useDeunElement.ryeong.hwakjang.deunsu
      }
    }
    totalTitle = title + 2;
  }
  // 일간의 희용 (대운쪽 코딩해야함)
  else {
    for (let i = 0; i < testArray.length; i++) {
      if (testArray[i].word === useDeunElement.hiyong.hi.word) {
        testArray[i].element = '희'
        testArray[i].deunsu = useDeunElement.hiyong.hi.deunsu
      }
      if (testArray[i].word === useDeunElement.hiyong.yong.word) {
        testArray[i].element = '용'
        testArray[i].deunsu = useDeunElement.hiyong.yong.deunsu
      }
    }
    totalTitle = title + 1;
  }
}

function checkDeunBH() {
  if (useDeunSeun.banghang === '순행') {
    console.log('양간;준비')
    console.log('음간:분출')
    for (let i = 0; i < testArray.length; i++) {
      if (testArray[i].element !== '') {
        if (umYang.umYang(testArray[i].word[0], 1) === '양') {
          testArray[i].yangum = '준비'
          if (i + 1 !== testArray.length) {
            testArray[i + 1].yangum = '분출'
          }
        } else {
          testArray[i].yangum = '분출'
          if (i - 1 !== -1) {
            testArray[i - 1].yangum = '준비'
          }
        }
      }
    }
  }
  else {
    console.log('양간;시도')
    console.log('음간:보강')
    for (let i = 0; i < testArray.length; i++) {
      if (testArray[i].element !== '') {
        if (umYang.umYang(testArray[i].word[0], 1) === '양') {
          testArray[i].yangum = '시도'
          if (i - 1 !== -1) {
            testArray[i - 1].yangum = '보강'
          }

        } else {
          testArray[i].yangum = '보강'
          if (i + 1 !== testArray.length) {
            testArray[i + 1].yangum = '시도'
          }
        }
      }
    }
  }
}
function checkUse(use) {
  let result = 'N';
  if (use.includes('Y')) {
    result = 'Y';
  }
  return result;
}
function getResult(title) {
  let result;
  for (let i = 0; i < resultTest.contentsList.length; i++) {
    if (title === resultTest.contentsList[i].title) {
      result = resultTest.contentsList[i];
      break;
    }
  }
  return result;
}
module.exports = gusin;
