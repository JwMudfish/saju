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
  if (useDate.year >= 1910 && useDate.year <= 2050) {
    range = true;
  } else {
    range = false;
  }

  return range;
}

function checkMonth() {
  let range;
  if (Number(useDate.month) >= 1 && Number(useDate.month) <= 12) {
    range = true;
  } else {
    range = false;
  }
  return range;
}

function checkDay() {
  let range;
  if (
    Number(useDate.month) === 1 ||
    Number(useDate.month) === 3 ||
    Number(useDate.month) === 5 ||
    Number(useDate.month) === 7 ||
    Number(useDate.month) === 8 ||
    Number(useDate.month) === 10 ||
    Number(useDate.month) === 12
  ) {
    if (Number(useDate.day) <= 31 && Number(useDate.day) >= 1) {
      range = true;
    } else {
      range = false;
    }
  } else if (
    Number(useDate.month) === 4 ||
    Number(useDate.month) === 6 ||
    Number(useDate.month) === 9 ||
    Number(useDate.month) === 11
  ) {
    if (Number(useDate.day) <= 30 && Number(useDate.day) >= 1) {
      range = true;
    } else {
      range = false;
    }
  } else if (Number(useDate.month) === 2) {
    if (checkYun() === true) {
      if (Number(useDate.day) <= 29 && Number(useDate.day) >= 1) {
        range = true;
      } else {
        range = false;
      }
    } else {
      if (Number(useDate.day) <= 28 && Number(useDate.day) >= 1) {
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
  if (Number(useDate.gubun_time) === 1) {
    range = true;
  } else {
    if (useDate.hour === "") {
      range = false;
    } else if (Number(useDate.hour) >= 0 && Number(useDate.hour) < 24) {
      range = true;
    } else {
      range = false;
    }
  }
  return range;
}

function checkMinute() {
  let range;
  if (Number(useDate.gubun_time) === 1) {
    range = true;
  } else {
    if (useDate.minute === "") {
      range = false;
    } else if (Number(useDate.minute) >= 0 && Number(useDate.minute) < 60) {
      range = true;
    } else {
      range = false;
    }
  }
  return range;
}

function checkYun() {
  let range = false;
  if (Number(useDate.year) % 4 === 0) {
    range = true;
    if (Number(useDate.year) % 100 === 0) {
      range = false;
      if (Number(useDate.year) % 400 === 0) {
        range = true;
      }
    } else {
      range = true;
    }
  }
  return range;
}
module.exports = resultFunc;
