var palpum = {};

palpumFunc = require('./palpumTest');
palpum.palpum = function () {
  return new Promise((resolve) => {
    let temp = palpumFunc.palpum();
    usePalPum = checkYN(temp);
    resolve(usePalPum);
  }).catch((error) => {
    console.log(error);
    return error;
});
};

function checkYN(temp) {
  let result = {
    johwa: '',
    now: '',
    fucture: '',
    people: '',
    money: '',
  };
  if (temp.johwa.length === 0) {
    result.johwa = 'N';
  } else {
    result.johwa = 'Y';
  }
  if (temp.now.length === 0) {
    result.now = 'N';
  } else {
    result.now = 'Y';
  }
  if (temp.fucture.length === 0) {
    result.fucture = 'N';
  } else {
    result.fucture = 'Y';
  }
  if (temp.people.length === 0) {
    result.people = 'N';
  } else {
    result.people = 'Y';
  }
  if (temp.money.length === 0) {
    result.money = 'N';
  } else {
    result.money = 'Y';
  }

  return result;
}

module.exports = palpum;
