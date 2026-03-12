var summerSeoul = {};
var moment = require("moment");
summerSeoul.summerSeoul = function () {
  let result;
  let summerTF = checkSummerTime();
  let seoulTF = checkSeoulTime();
  if (Number(useDate.summer_time) === 1 && Number(useDate.seoul_time) === 30) {
    if (summerTF === false && seoulTF === false) {
      result = {
        errorMessage: {
          message: "Error SummerTime, 한국표준시를 쓰던 시대가 아닙니다.",
          errorCode: "NoSummerNoSeoulTime",
        },
        error: true,
      };
    } else if (summerTF === false && seoulTF === true) {
      result = {
        errorMessage: {
          message: "Error SummerTime을 쓰던 시대가 아닙니다.",
          errorCode: "NoSummer1",
        },
        error: true,
      };
    } else if (summerTF === true && seoulTF === false) {
      result = {
        errorMessage: {
          message: "Error 한국표준시를 쓰던 시대가 아닙니다.",
          errorCode: "NoSeoulTime1",
        },
        error: true,
      };
    } else {
      result = { error: false };
    }
  } else if (
    Number(useDate.summer_time) === 1 &&
    Number(useDate.seoul_time) === 0
  ) {
    if (summerTF === false) {
      result = {
        errorMessage: {
          message: "Error SummerTime을 쓰던 시대가 아닙니다.",
          errorCode: "NoSummer2",
        },
        error: true,
      };
    } else {
      result = { error: false };
    }
  } else if (
    Number(useDate.summer_time) === 0 &&
    Number(useDate.seoul_time) === 30
  ) {
    if (seoulTF === false) {
      result = {
        errorMessage: {
          message: "Error 한국표준시를 쓰던 시대가 아닙니다.",
          errorCode: "NoSeoul2",
        },
        error: true,
      };
    } else {
      result = { error: false };
    }
  } else if (
    Number(useDate.summer_time) === 0 &&
    Number(useDate.seoul_time) === 0
  ) {
    result = { error: false };
  } else {
    result = {
      errorMessage: {
        message: "Error 잘못된값이 넘어왔습니다",
        errorCode: "WrongValueSummerOrSeoul",
      },
      error: true,
    };
  }

  return result;
};

function checkSeoulTime() {
  let seoulTime;
  let myBirth = moment(
    useDate.year +
      "-" +
      useDate.month +
      "-" +
      useDate.day +
      " " +
      useDate.hour +
      ":" +
      useDate.minute +
      ":00",
    "YYYY-MM-DD HH:mm:ss "
  );
  if (
    myBirth.diff(
      moment("1908-04-01  00:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) >= 0 &&
    myBirth.diff(
      moment("1912-01-01  00:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) < 0
  ) {
    seoulTime = true;
  } else if (
    myBirth.diff(
      moment("1954-03-21  00:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) >= 0 &&
    myBirth.diff(
      moment("1961-08-10  00:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) < 0
  ) {
    seoulTime = true;
  } else {
    seoulTime = false;
  }

  return seoulTime;
}

function checkSummerTime() {
  let summerTime;
  let myBirth = moment(
    useDate.year +
      "-" +
      useDate.month +
      "-" +
      useDate.day +
      " " +
      useDate.hour +
      ":" +
      useDate.minute +
      ":00",
    "YYYY-MM-DD HH:mm:ss "
  );
  if (
    myBirth.diff(
      moment("1948-06-01  00:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) >= 0 &&
    myBirth.diff(
      moment("1948-09-13  00:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) < 0
  ) {
    summerTime = true;
  } else if (
    myBirth.diff(
      moment("1949-04-03  00:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) >= 0 &&
    myBirth.diff(
      moment("1949-09-11  00:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) < 0
  ) {
    summerTime = true;
  } else if (
    myBirth.diff(
      moment("1950-04-01  00:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) >= 0 &&
    myBirth.diff(
      moment("1950-09-10  00:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) < 0
  ) {
    summerTime = true;
  } else if (
    myBirth.diff(
      moment("1951-05-06  00:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) >= 0 &&
    myBirth.diff(
      moment("1951-09-09  00:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) < 0
  ) {
    summerTime = true;
  } else if (
    myBirth.diff(
      moment("1955-05-05  00:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) >= 0 &&
    myBirth.diff(
      moment("1955-09-09  00:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) < 0
  ) {
    summerTime = true;
  } else if (
    myBirth.diff(
      moment("1956-05-20  00:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) >= 0 &&
    myBirth.diff(
      moment("1956-09-30  00:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) < 0
  ) {
    summerTime = true;
  } else if (
    myBirth.diff(
      moment("1957-05-05  00:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) >= 0 &&
    myBirth.diff(
      moment("1957-09-22  00:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) < 0
  ) {
    summerTime = true;
  } else if (
    myBirth.diff(
      moment("1958-05-04  00:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) >= 0 &&
    myBirth.diff(
      moment("1958-09-21  00:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) < 0
  ) {
    summerTime = true;
  } else if (
    myBirth.diff(
      moment("1959-05-03  00:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) >= 0 &&
    myBirth.diff(
      moment("1959-09-20  00:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) < 0
  ) {
    summerTime = true;
  } else if (
    myBirth.diff(
      moment("1960-05-01  00:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) >= 0 &&
    myBirth.diff(
      moment("1960-09-18  00:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) < 0
  ) {
    summerTime = true;
  } else if (
    myBirth.diff(
      moment("1960-05-01  00:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) >= 0 &&
    myBirth.diff(
      moment("1960-09-18  00:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) < 0
  ) {
    summerTime = true;
  } else if (
    myBirth.diff(
      moment("1987-05-10  02:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) >= 0 &&
    myBirth.diff(
      moment("1987-10-11  03:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) < 0
  ) {
    summerTime = true;
  } else if (
    myBirth.diff(
      moment("1988-05-08  02:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) >= 0 &&
    myBirth.diff(
      moment("1988-10-09  03:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) < 0
  ) {
    summerTime = true;
  } else {
    summerTime = false;
  }

  return summerTime;
}
module.exports = summerSeoul;
