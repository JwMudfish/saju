var Sangsin = {};
const contents_hisin_good_bad = require('../../testResult/contents_pro_report/13.hisinGoodBad/contents_Hisin_goodBad.json')
/**
 * level은 높,보,낮을 의미하는거고
 * contents는 키워드를 의미하는것이다
 * @returns 
 */
Sangsin.randum = function () {
  let result = self();
  return result;
};

const self = () => {
  let result = {
    hisinYN:useRyeong.heuisin.exist,
    good:'',
    bad:''
}
if (useRyeong.heuisin.exist === 'N') {
    result.good=getResult("Hisin_No_Good",contents_hisin_good_bad).contents
    result.bad=getResult("Hisin_No_Bad",contents_hisin_good_bad).contents
}
else {
    result.good=getResult("Hisin_Yes_Good",contents_hisin_good_bad).contents
    result.bad=getResult("Hisin_Yes_Bad",contents_hisin_good_bad).contents
}
return result;
};

function getResult(title, word) {
  let result;
  for (let i = 0; i < word.contentsList.length; i++) {
    if (title === word.contentsList[i].title) {
      result = word.contentsList[i];
      break;
    }
  }
  return result;
}
module.exports = Sangsin;
