var resultFunc = {};

resultFunc.checkBirthday = function () {
  let result;
  if (
    checkYear() === true &&
    checkMonth() === true &&
    checkDay() === true &&
    checkHour() === true &&
    checkMinute() === true
  ) {
    result = true;
  } else {
    result = false;
  }

  return result;
};

function checkYear() {
  let range;
  if (useSpecialDate.year >= 1910 && useSpecialDate.year <= 2050) {
    range = true;
  } else {
    range = false;
  }

  return range;
}

function checkMonth() {
  let range;
  if (Number(useSpecialDate.month) >= 1 && Number(useSpecialDate.month) <= 12) {
    range = true;
  } else {
    range = false;
  }
  return range;
}

function checkDay() {
  let range;
  if (
    Number(useSpecialDate.month) === 1 ||
    Number(useSpecialDate.month) === 3 ||
    Number(useSpecialDate.month) === 5 ||
    Number(useSpecialDate.month) === 7 ||
    Number(useSpecialDate.month) === 8 ||
    Number(useSpecialDate.month) === 10 ||
    Number(useSpecialDate.month) === 12
  ) {
    if (Number(useSpecialDate.day) <= 31 && Number(useSpecialDate.day) >= 1) {
      range = true;
    } else {
      range = false;
    }
  } else if (
    Number(useSpecialDate.month) === 4 ||
    Number(useSpecialDate.month) === 6 ||
    Number(useSpecialDate.month) === 9 ||
    Number(useSpecialDate.month) === 11
  ) {
    if (Number(useSpecialDate.day) <= 30 && Number(useSpecialDate.day) >= 1) {
      range = true;
    } else {
      range = false;
    }
  } else if (Number(useSpecialDate.month) === 2) {
    if (checkYun() === true) {
      if (Number(useSpecialDate.day) <= 29 && Number(useSpecialDate.day) >= 1) {
        range = true;
      } else {
        range = false;
      }
    } else {
      if (Number(useSpecialDate.day) <= 28 && Number(useSpecialDate.day) >= 1) {
        range = true;
      } else {
        range = false;
      }
    }
  }
  return range;
}

function checkHour() {
  let range;
  if (Number(useSpecialDate.gubun_time) === 1) {
    range = true;
  } else {
    if (useSpecialDate.hour === "") {
      range = false;
    } else if (
      Number(useSpecialDate.hour) >= 0 &&
      Number(useSpecialDate.hour) < 24
    ) {
      range = true;
    } else {
      range = false;
    }
  }
  return range;
}

function checkMinute() {
  let range;
  if (Number(useSpecialDate.gubun_time) === 1) {
    range = true;
  } else {
    if (useSpecialDate.minute === "") {
      range = false;
    } else if (
      Number(useSpecialDate.minute) >= 0 &&
      Number(useSpecialDate.minute) < 60
    ) {
      range = true;
    } else {
      range = false;
    }
  }
  return range;
}

function checkYun() {
  let range = false;
  if (Number(useSpecialDate.year) % 4 === 0) {
    range = true;
    if (Number(useSpecialDate.year) % 100 === 0) {
      range = false;
      if (Number(useSpecialDate.year) % 400 === 0) {
        range = true;
      }
    } else {
      range = true;
    }
  }
  return range;
}
module.exports = resultFunc;
