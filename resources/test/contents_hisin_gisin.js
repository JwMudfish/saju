var hisin_gisin = {};

var title = 'hisin_gisin_';
var totalTitle;
const resultTest = require('../testResult/contents_hisin_gisin.json');
hisin_gisin.randum = function () {
  self();
  let result = getResult(totalTitle);
  result.use = checkUse(
    useRyeong.um_heuisin_gisin.use,
    useRyeong.geuk_heuisin_gisin.use
  );
  result.exist = checkExist(
    useRyeong.um_heuisin_gisin.exist,
    useRyeong.geuk_heuisin_gisin.exist
  );
  return result;
};
const self = () => {
  if (useRyeong.heuisin.exist === 'Y') {
    if (
      useRyeong.um_heuisin_gisin.exist === 'Y' &&
      useRyeong.geuk_heuisin_gisin.exist === 'Y'
    ) {
      totalTitle = title + 1;
    } else if (
      useRyeong.um_heuisin_gisin.exist === 'Y' &&
      useRyeong.geuk_heuisin_gisin.exist === 'N'
    ) {
      totalTitle = title + 2;
    } else if (
      useRyeong.um_heuisin_gisin.exist === 'N' &&
      useRyeong.geuk_heuisin_gisin.exist === 'Y'
    ) {
      totalTitle = title + 3;
    } else if (
      useRyeong.um_heuisin_gisin.exist === 'N' &&
      useRyeong.geuk_heuisin_gisin.exist === 'N'
    ) {
      totalTitle = title + 4;
    }
  } else {
    if (
      useRyeong.um_heuisin_gisin.exist === 'Y' &&
      useRyeong.geuk_heuisin_gisin.exist === 'Y'
    ) {
      totalTitle = title + 5;
    } else if (
      useRyeong.um_heuisin_gisin.exist === 'Y' &&
      useRyeong.geuk_heuisin_gisin.exist === 'N'
    ) {
      totalTitle = title + 6;
    } else if (
      useRyeong.um_heuisin_gisin.exist === 'N' &&
      useRyeong.geuk_heuisin_gisin.exist === 'Y'
    ) {
      totalTitle = title + 7;
    } else if (
      useRyeong.um_heuisin_gisin.exist === 'N' &&
      useRyeong.geuk_heuisin_gisin.exist === 'N'
    ) {
      totalTitle = title + 8;
    }
  }
};
function checkUse(um, geuk) {
  let result = {
    um: 'N',
    geuk: 'N',
  };
  if (um.includes('Y') || um.includes('y')) {
    result.um = 'Y';
  }
  if (geuk.includes('Y') || geuk.includes('y')) {
    result.geuk = 'Y';
  }
  return result;
}
function checkExist(um, geuk) {
  let result = {
    um: 'N',
    geuk: 'N',
  };
  if (um.includes('Y') || um.includes('y')) {
    result.um = 'Y';
  }
  if (geuk.includes('Y') || geuk.includes('y')) {
    result.geuk = 'Y';
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
module.exports = hisin_gisin;
