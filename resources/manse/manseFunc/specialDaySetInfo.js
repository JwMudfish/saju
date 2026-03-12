var setInfo = {};

setInfo.setInfo = function (body) {
  let name = body.name;
  let gender = body.gender;
  let gubun_calender = body.gubun_calender;
  let year = body.year;
  let month = body.month;
  let day = body.day;
  let hour = body.hour;
  let minute = body.minute;
  let gubun_time = body.gubun_time;
  let seoul_time = body.seoul_time;
  let summer_time = body.summer_time;
  let specialDayGubun_calender = body.specialDayGubun_calender;
  let specialDayYear = body.specialDayYear;
  let specialDayMonth = body.specialDayMonth;
  let specialDayDay = body.specialDayDay;
  let specialDayHour = body.specialDayHour;
  let specialDayMinute = body.specialDayMinute;
  let specialDayGubun_time = body.specialDayGubun_time;
  let specialDaySeoul_time = body.specialDaySeoul_time;
  let specialDaySummer_time = body.specialDaySummer_time;

  myManse = {
    info: {
      name: name,
      gender: gender,
      gubun_calender: gubun_calender,
      year: year,
      month: month,
      day: day,
      hour: hour,
      minute: minute,
      gubun_time: gubun_time,
      seoul_time: seoul_time,
      summer_time: summer_time,
      specialDayGubun_calender: specialDayGubun_calender,
      specialDayYear: specialDayYear,
      specialDayMonth: specialDayMonth,
      specialDayDay: specialDayDay,
      specialDayHour: specialDayHour,
      specialDayMinute: specialDayMinute,
      specialDayGubun_time: specialDayGubun_time,
      specialDaySeoul_time: specialDaySeoul_time,
      specialDaySummer_time: specialDaySummer_time,
    },
  };

  //양음력 비교하려면 info객체를 따로빼야하는데,
  //pillar파일과 checkBirthday파일을 수정해야함!
  //info객체를 만든후에
  //  myManse.info검색후 수정.
};

module.exports = setInfo;
