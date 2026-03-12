var jang_gubun = {};

const samHap = require("../../hapChug/hapChug");
const season = require("../../basicFunc/basicFunc");
const hapChugFunc = require("../../../manseUtil/hapchung/samhapUtil");
//지장간사용판단 생지
//tag를 받아서 사용성을 출력해주는 함수
//yong에서 월지라면 m_
//yong에서 월지가아닌 다른지지라면 빈칸
//YU 월지라면 M_YU_
//yu 다른 지지라면 YU_
jang_gubun.shang = function (tag, pillar, check) {
  let result;
  if (hapChugFunc.checkSamhapWolYN() === "Y") {
    result = {
      jijanggan1: tag + "bunhwa",
      jijanggan2: tag + "youngsa",
    };
  } else {
    result = {
      jijanggan1: tag + "bunhwa",
      jijanggan2: tag + "jangsang",
    };
  }
  return result;
};

//지장간사용판단 고지
//tag를 받아서 사용성을 출력해주는 함수
//yong에서 월지라면 m_
//yong에서 월지가아닌 다른지지라면 빈칸
//YU 월지라면 M_YU_
//yu 다른 지지라면 YU_
jang_gubun.go = function (pillar, tag, checkYMDH) {
  let result;
  let one;
  let two;
  let three;
  let samhap = "";
  let banghap = "";
  if (checkYMDH === "y") {
    samhap = samHap.samhap(
      usePillar.y_land,
      usePillar.m_land,
      usePillar.d_land,
      usePillar.h_land,
      "y"
    );
    banghap = samHap.samhap(
      usePillar.y_land,
      usePillar.m_land,
      usePillar.d_land,
      usePillar.h_land,
      "y"
    );
  } else if (checkYMDH === "m") {
    samhap = samHap.samhap(
      usePillar.m_land,
      usePillar.y_land,
      usePillar.d_land,
      usePillar.h_land,
      "m"
    );
    banghap = samHap.samhap(
      usePillar.m_land,
      usePillar.y_land,
      usePillar.d_land,
      usePillar.h_land,
      "m"
    );
  } else if (checkYMDH === "d") {
    samhap = samHap.samhap(
      usePillar.d_land,
      usePillar.m_land,
      usePillar.y_land,

      usePillar.h_land,
      "d"
    );
    banghap = samHap.samhap(
      usePillar.d_land,
      usePillar.m_land,
      usePillar.y_land,

      usePillar.h_land,
      "d"
    );
  } else if (checkYMDH === "h") {
    samhap = samHap.samhap(
      usePillar.h_land,
      usePillar.d_land,
      usePillar.m_land,
      usePillar.y_land,
      "h"
    );
    banghap = samHap.samhap(
      usePillar.h_land,
      usePillar.d_land,
      usePillar.m_land,
      usePillar.y_land,
      "h"
    );
  }
  if (season.season(usePillar.m_land, pillar) === "y") {
    three = tag + "sihwa_young";
  } else {
    three = tag + "sihwa";
  }
  if (samhap === "") {
    two = tag + "goji";
  } else {
    two = tag + "youngsa";
  }
  if (banghap === "") {
    one = tag + "yugi_young";
  } else {
    one = tag + "yugi";
  }

  result = {
    jijanggan1: one,
    jijanggan2: two,
    jijanggan3: three,
  };
  return result;
};

//지장간사용판단 고지(오늘용)
//tag를 받아서 사용성을 출력해주는 함수
//yong에서 월지라면 m_
//yong에서 월지가아닌 다른지지라면 빈칸
//YU 월지라면 M_YU_
//yu 다른 지지라면 YU_
jang_gubun.today_go = function (pillar, tag, checkYMDH) {
  let result;
  let one;
  let two;
  let samhap = "";
  if (checkYMDH === "y") {
    samhap = samHap.samhap(
      usePillar.y_land,
      usePillar.m_land,
      usePillar.d_land,
      usePillar.h_land,

      "ty",
      useTodayPillar.y_land
    );
  } else if (checkYMDH === "m") {
    samhap = samHap.samhap(
      usePillar.m_land,
      usePillar.y_land,
      usePillar.d_land,
      usePillar.h_land,
      "tm",
      useTodayPillar.m_land
    );
  } else if (checkYMDH === "d") {
    samhap = samHap.samhap(
      usePillar.d_land,
      usePillar.m_land,
      usePillar.y_land,

      usePillar.h_land,
      "td",
      useTodayPillar.d_land
    );
  } else if (checkYMDH === "h") {
    samhap = samHap.samhap(
      usePillar.h_land,
      usePillar.d_land,
      usePillar.m_land,
      usePillar.y_land,
      "th",
      useTodayPillar.h_land
    );
  }
  if (season.season(usePillar.m_land, pillar) === "y") {
    one = tag + "sihwa_young";
  } else {
    one = tag + "sihwa";
  }
  if (samhap === "") {
    two = tag + "goji";
  } else {
    two = tag + "youngsa";
  }

  result = {
    jijanggan1: one,
    jijanggan2: two,
  };
  return result;
};

jang_gubun.root_gubun = function (pillar) {
  let result;
  result = root_gubunFunc(pillar);
  return result;
};
//root_gubun
//어디에 사용하는지는 추후에 판단하고 함수 교체예정
function root_gubunFunc(pillar) {
  let result;
  if (pillar === "비견" || pillar === "겁재") {
    result = "y";
  } else {
    result = "n";
  }
  return result;
}
module.exports = jang_gubun;
