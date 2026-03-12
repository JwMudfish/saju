var jang_gubun = {};

const samHap = require("../hapChug/hapChug");
const season = require("../basicFunc/basicFunc");
const hapChugFunc = require("../../manseUtil/hapchung/samhapUtil");
//지장간사용판단 생지
//tag를 받아서 사용성을 출력해주는 함수
//yong에서 월지라면 m_
//yong에서 월지가아닌 다른지지라면 빈칸
//YU 월지라면 M_YU_
//yu 다른 지지라면 YU_
jang_gubun.shang = function (tag, pillar, check) {
  let result;
  let temp;
  if (check === 'M') {
    temp = hapChugFunc.checkSamhapWolYN()
  }
  else {
    temp = hapChugFunc.checkSamhapWolSpecificJiJiYN(pillar)
  }
  if (temp === "Y") {
    result = {
      jijanggan1: tag + "bunhwa",
      jijanggan2: tag + "youngsa",
      jijanggan3: "",
    };
  } else {
    result = {
      jijanggan1: tag + "bunhwa",
      jijanggan2: tag + "jangsang",
      jijanggan3: "",
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
  let one = "  ";
  let two = "  ";
  let three = "  ";
  let samhap = "";
  let banghap = "";

  samhap = hapChugFunc.checkSamhapChoiceYN(
    pillar,
    checkYMDH
  );
  banghap = hapChugFunc.checkBanghapChoiceYN(
    pillar,
    checkYMDH
  );
  if (season.season(usePillar.m_land, pillar) === "y") {
    three = tag + "sihwa_young";
  } else {
    three = tag + "sihwa";
  }
  if (samhap === 'N') {
    two = tag + "goji";
  } else {
    two = tag + "youngsa";
  }
  if (banghap !== 'N') {
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
    result = "  ";
  } else {
    result = pillar;
  }
  return result;
}
module.exports = jang_gubun;
