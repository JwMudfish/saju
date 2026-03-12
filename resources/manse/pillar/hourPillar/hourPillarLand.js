var hour = {};
var moment = require("moment");
hour.hourPillarLand = function (hour, minute, summerTime, seoulTime) {
  let result;
  //시간비교하기위한것. 년월일은 임시의 값이 들어가있음
  //임시의 값이 들어가있는 이유는 지지는 어떤값이든 상관없이 고정되어있기때문
  //그리고 기본적으로 탑재되어야할 상식!!
  //23:30부터 날이바뀐다!!!

  //써머타임은 여기에다가 +60

  //본인시간
  let myTime;
  if (hour === "") {
    //시간을 모르는경우 해시로 맞춤 그대신 보이는건 아무것도 안보이게.
    myTime = moment("2019-09-03 22:59:00", "YYYY-MM-DD HH:mm:ss ");
  } else {
    myTime = moment(
      "2019-09-03 " + hour + ":" + minute + ":00",
      "YYYY-MM-DD HH:mm:ss "
    );
  }
  //summerTime이 있으면
  myTime.add(-summerTime, "hour");
  //서울표준시를 사용한 시대라면
  myTime.add(seoulTime, "minute");

  //임시날짜가 다음날로 넘어가버릴경우
  /*if (myTime.diff(moment("2019-09-03", "YYYY-MM-DD"), "days") > 0) {
    myTime.add(-1, "day");
  }
  else if(myTime.diff(moment("2019-09-03", "YYYY-MM-DD"), "days") < 0){
    myTime.add(+1, "day");
  }*/
  if (
    myTime.diff(
      moment("2019-09-02 23:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) >= 0 &&
    myTime.diff(
      moment("2019-09-03 00:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) < 0
  ) {
    myTime.add(+1, "day");
  }

  if (
    myTime.diff(
      moment("2019-09-04 00:00:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) >= 0 &&
    myTime.diff(
      moment("2019-09-04 00:30:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) < 0
  ) {
    myTime.add(-1, "day");
    //  totalNumber = totalNumber - 1;
  }

  //자시
  const mouseStart = moment("2019-09-03 23:30:00", "YYYY-MM-DD HH:mm:ss ");
  const mouseEnd = moment("2019-09-03 01:30:00", "YYYY-MM-DD HH:mm:ss ");

  //축시
  const cowStart = moment("2019-09-03 01:30:00", "YYYY-MM-DD HH:mm:ss ");
  const cowEnd = moment("2019-09-03 03:30:00", "YYYY-MM-DD HH:mm:ss ");

  //인시
  const tigerStart = moment("2019-09-03 03:30:00", "YYYY-MM-DD HH:mm:ss ");
  const tigerEnd = moment("2019-09-03 05:30:00", "YYYY-MM-DD HH:mm:ss ");
  //묘시
  const rabbitStart = moment("2019-09-03 05:30:00", "YYYY-MM-DD HH:mm:ss ");
  const rabbitEnd = moment("2019-09-03 07:30:00", "YYYY-MM-DD HH:mm:ss ");
  //진시
  const dragonStart = moment("2019-09-03 07:30:00", "YYYY-MM-DD HH:mm:ss ");
  const dragonEnd = moment("2019-09-03 09:30:00", "YYYY-MM-DD HH:mm:ss ");

  //사시
  const snackStart = moment("2019-09-03 09:30:00", "YYYY-MM-DD HH:mm:ss ");
  const snackEnd = moment("2019-09-03 11:30:00", "YYYY-MM-DD HH:mm:ss ");
  //오시
  const horseStart = moment("2019-09-03 11:30:00", "YYYY-MM-DD HH:mm:ss ");
  const horseEnd = moment("2019-09-03 13:30:00", "YYYY-MM-DD HH:mm:ss ");
  //미시
  const sheepStart = moment("2019-09-03 13:30:00", "YYYY-MM-DD HH:mm:ss ");
  const sheepEnd = moment("2019-09-03 15:30:00", "YYYY-MM-DD HH:mm:ss ");
  //신시
  const monkeyStart = moment("2019-09-03 15:30:00", "YYYY-MM-DD HH:mm:ss ");
  const monkeyEnd = moment("2019-09-03 17:30:00", "YYYY-MM-DD HH:mm:ss ");
  //유시
  const chickenStart = moment("2019-09-03 17:30:00", "YYYY-MM-DD HH:mm:ss ");
  const chickenEnd = moment("2019-09-03 19:30:00", "YYYY-MM-DD HH:mm:ss ");
  //술시
  const dogStart = moment("2019-09-03 19:30:00", "YYYY-MM-DD HH:mm:ss ");
  const dogEnd = moment("2019-09-03 21:30:00", "YYYY-MM-DD HH:mm:ss ");
  //해시
  const pigStart = moment("2019-09-03 21:30:00", "YYYY-MM-DD HH:mm:ss ");
  const pigEnd = moment("2019-09-03 23:30:00", "YYYY-MM-DD HH:mm:ss ");

  //이밑부터 시간비교
  if (hour === "") {
    result = "";
  } else if (
    myTime.diff(moment(mouseStart), "minutes") >= 0 ||
    myTime.diff(moment(mouseEnd), "minutes") < 0
  ) {
    result = "자";
  } else if (
    myTime.diff(moment(cowStart), "minutes") >= 0 &&
    myTime.diff(moment(cowEnd), "minutes") < 0
  ) {
    result = "축";
  } else if (
    myTime.diff(moment(tigerStart), "minutes") >= 0 &&
    myTime.diff(moment(tigerEnd), "minutes") < 0
  ) {
    result = "인";
  } else if (
    myTime.diff(moment(rabbitStart), "minutes") >= 0 &&
    myTime.diff(moment(rabbitEnd), "minutes") < 0
  ) {
    result = "묘";
  } else if (
    myTime.diff(moment(dragonStart), "minutes") >= 0 &&
    myTime.diff(moment(dragonEnd), "minutes") < 0
  ) {
    result = "진";
  } else if (
    myTime.diff(moment(snackStart), "minutes") >= 0 &&
    myTime.diff(moment(snackEnd), "minutes") < 0
  ) {
    result = "사";
  } else if (
    myTime.diff(moment(horseStart), "minutes") >= 0 &&
    myTime.diff(moment(horseEnd), "minutes") < 0
  ) {
    result = "오";
  } else if (
    myTime.diff(moment(sheepStart), "minutes") >= 0 &&
    myTime.diff(moment(sheepEnd), "minutes") < 0
  ) {
    result = "미";
  } else if (
    myTime.diff(moment(monkeyStart), "minutes") >= 0 &&
    myTime.diff(moment(monkeyEnd), "minutes") < 0
  ) {
    result = "신";
  } else if (
    myTime.diff(moment(chickenStart), "minutes") >= 0 &&
    myTime.diff(moment(chickenEnd), "minutes") < 0
  ) {
    result = "유";
  } else if (
    myTime.diff(moment(dogStart), "minutes") >= 0 &&
    myTime.diff(moment(dogEnd), "minutes") < 0
  ) {
    result = "술";
  } else if (
    myTime.diff(moment(pigStart), "minutes") >= 0 &&
    myTime.diff(moment(pigEnd), "minutes") < 0
  ) {
    result = "해";
  } else {
    result = "";
  }
  return result;
};

module.exports = hour;
