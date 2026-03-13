var day = {};
var moment = require("moment");

day.getDay = function (day, myYear, myMonth, myHour, myMinute,summerTime, seoulTime) {
  //공식은 https://sajuplus.tistory.com/661?category=382593
  //이링크 참고하는게 좋음
  //1900년(갑술일)기준으로 만듬
  const afterStandard = myYear - 1900;
  const yunCount = Math.floor(afterStandard / 4);
  //이전월의 날짜 총합
  const monthSum = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  //일주고유번호 계산 day-1은 초하루때문이라는데 무슨말인진 모르겠음..ㅠㅠ
  let totalNumber =
    Number(afterStandard) * 5 +
    Number(yunCount) +
    Number(monthSum[myMonth - 1]) +
    Number(day - 1);
  const sky = require("./dayPillarSky");
  const land = require("./dayPillarLand");
  //시간비교하기위한것. 년월일은 임시의 값이 들어가있음
  //임시의 값이 들어가있는 이유는 시간만 비교하면 되기때문!
  //그리고 기본적으로 탑재되어야할 상식!!
  //23:30부터 날이바뀐다!!!!!!!(동경시기준)
  //그래서 23:30이후부터는 날짜가 증가

  //23:30이후일시 날짜가 바뀌는 코드
  //본인시간
  const myTime = moment(
    "2019-09-03" + myHour + ":" + myMinute + ":00",
    "YYYY-MM-DD HH:mm:ss "
  );
  //summerTime이 있으면
  myTime.add(-summerTime, "hour");
  //서울표준시를 사용한 시대라면
  myTime.add(seoulTime, "minute");

  //서머타임 자시보정
if( myTime.diff(
    moment("2019-09-02 23:00:00", "YYYY-MM-DD HH:mm:ss "),
    "minutes"
  ) >= 0 && myTime.diff(
    moment("2019-09-03 00:00:00", "YYYY-MM-DD HH:mm:ss "),
    "minutes"
  ) < 0){
    myTime.add(+1, "day");
    totalNumber = totalNumber - 1;
  }

    //한국표준시 자시보정(UTC+08:30)
    //우리나라는 현재 동경시를 쓰고있어서 코딩이 다 동경시를 기준으로 맞추어져있음
    //23시부터 하루가 넘어가는 구조이므로 날짜 ++
if( myTime.diff(
  moment("2019-09-04 00:00:00", "YYYY-MM-DD HH:mm:ss "),
  "minutes"
) >= 0 && myTime.diff(
  moment("2019-09-04 00:30:00", "YYYY-MM-DD HH:mm:ss "),
  "minutes"
) < 0){
  myTime.add(-1, "day");
 totalNumber = totalNumber + 1;
}
//자시보정
  if (
    myTime.diff(
      moment("2019-09-03 23:30:00", "YYYY-MM-DD HH:mm:ss "),
      "minutes"
    ) >= 0
  ) {
    totalNumber = totalNumber + 1;
  }
  const dayPillarSky = sky.dayPillarSky(totalNumber);
  const dayPillarLand = land.dayPillarLand(totalNumber);
  const dayPillar = dayPillarSky + dayPillarLand;
  return dayPillar;
};

module.exports = day;
