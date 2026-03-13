var Hygiene = {};
var title = "Hygiene_";
var num;
var totalTitle;
// num = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
let options;
Hygiene.randum = function (test) {
  self(test);
  return totalTitle;
};
const self = (test) => {
  const sky = [
    usePillar.y_sky,
    usePillar.m_sky,
    usePillar.d_sky,
    usePillar.h_sky,
  ];
  const land = [
    usePillar.y_land,
    usePillar.m_land,
    usePillar.d_land,
    usePillar.h_land,
  ];
  const landGod10 = [
    useYuksin.y_land,
    useYuksin.m_land,
    useYuksin.d_land,
    useYuksin.h_land,
  ];
  const skyGod10 = [useYuksin.y_sky, useYuksin.m_sky, useYuksin.h_sky];
  if (hygienelake(sky, land)) {
    //console.log("먼지가많아");
    totalTitle = title + 1;
  } else if (weaknessbody1(skyGod10, landGod10)) {
    console.log("#전염병은_나의_친구 #운이_없음");
    totalTitle = title + 2;
  } else if (weaknessbody2(skyGod10, landGod10)) {
    console.log("#숙주 #빈틈이_많아요");
    totalTitle = title + 3;
  } else if (sanitary1(skyGod10, landGod10, test.ILGAN_GEUN)) {
    console.log("#이미_준비완료 #틈이_없는_위생");
    totalTitle = title + 4;
  } else if (sanitary2(skyGod10, landGod10, test.ILGAN_GEUN)) {
    console.log("#면역의_황태자 #바이러스_넘사벽");
    totalTitle = title + 5;
  } else if (sanitary3(sky, test.WOL_RYOUNG)) {
    console.log("#정리정돈_신 #혹시_결백증");
    totalTitle = title + 6;
  } else if (sanitary4(sky, test.WOL_RYOUNG)) {
    console.log("#매너있는 #질서있는_사람");
    totalTitle = title + 7;
  } else {
    console.log("이거아님");
    totalTitle = title + 8;
  }
};

//위생관념 더러운거
/*
1. 위생관리가 부족해요!

평소 위생관리에 크게 신경쓰지 않는 당신?!
이 시국에 누구보다 전염병 감염에 취약해요. 지금이라도 늦지 않았어요!

--
공식 : 천간 계수 and (지지 축 or 지지 진)
공식 : 천간 정화 and (지지 미 or 지지 술)

#먼지가_많아  #소독이_필요해
지금 자신의 방을 돌아보세요. 혹시 방이 지저분하지 않은가요?
평소 자신이 생활하는 공간을 잘 정리하지 않거나 위생관리를 철저히하지 않아요.
이불 속 진드기, 창틀에 낀 미세 먼지 등 집안에 우리의 건강을 해치는 요소가 많아요. 오늘은 이러한 요소를 꼭 청소하시길 바래요.
*/
const hygienelake = (sky, land) => {
  let checkSky1 = false;
  let checkSky2 = false;
  let result = false;
  for (var i = 0; i < sky.length; i++) {
    if (sky[i] === "정") {
      checkSky1 = true;
    } else if (sky[i] === "계") {
      checkSky2 = true;
    }
  }
  if (checkSky1 || checkSky2) {
    for (var i = 0; i < land.length; i++) {
      if (land[i] === "축" && checkSky2) {
        result = true;
        break;
      } else if (land[i] === "진" && checkSky2) {
        result = true;
        break;
      } else if (land[i] === "미" && checkSky1) {
        result = true;
        break;
      } else if (land[i] === "술" && checkSky1) {
        result = true;
        break;
      }
    }
  }

  return result;
};
/*
  공식 : 지지에 편관 and 무비겁 감염에 취약
  
  #전염병은_나의_친구 #운이_없음
  이건 뭐... 전염병에 태생적으로 취약해요. 혹시 간절기에 감기가 자주 걸리나요?
  전염병이 유행할때면 제일 먼저 걸릴 위험이 있어요. 면역체계가 약해서 그러니 비타민과 영양제는 필수!
  내 몸을 지키는 건 나밖에 없으니 개인위생에 많이 신경쓰세요.
  */
const weaknessbody1 = (sky, land) => {
  let landResult = false;
  let noBigubResult = true;
  let result = false;
  for (var i = 0; i < land.length; i++) {
    if (land[i] === "편관") {
      landResult = true;
    } else if (land[i] === "비견" || land[i] === "겁재") {
      noBigubResult = false;
    }
  }

  if (landResult === true && noBigubResult === true) {
    for (var i = 0; i < sky.length; i++) {
      if (sky[i] === "비견" || sky[i] === "겁재") {
        noBigubResult = false;
      }
    }
    if (!noBigubResult) {
    } else {
      result = true;
    }
  }
  return result;
};
/*
  공식 :  천간에 식신 and 무비겁
  
  #숙주 #빈틈이_많아요
  주변에 크게 신경쓰지 않는 당신?! 위생관리에 소홀해요.
  병이 유행하던 말던 평소와 똑같이 생활하고 있어요. 그거 아세요?!
  이 시국에 개인 위생에 소홀하면 바이러스 전파자가 될 수 있어요.
  
  
  */
const weaknessbody2 = (sky, land) => {
  let skyResult = false;
  let noBigubResult = true;
  let result = false;
  for (var i = 0; i < sky.length; i++) {
    if (sky[i] === "식신") {
      skyResult = true;
    } else if (sky[i] === "비견" || sky[i] === "겁재") {
      noBigubResult = false;
    }
  }

  if (skyResult === true && noBigubResult === true) {
    for (var i = 0; i < land.length; i++) {
      if (land[i] === "비견" || land[i] === "겁재") {
        noBigubResult = false;
      }
    }
    if (!noBigubResult) {
    } else {
      result = true;
    }
  }
  return result;
};
/*
  공식 : 식신이 있는 사주가 인성이 2개이상 or 근왕  or  천간 비겁 두개이상
  
  #이미_준비완료 #틈이_없는_위생
  신중한 성격의 소유자인 그대는 앞으로 생길일을 미리미리 대비하는 습관이 있어요.
  행여나 전염병에 걸릴까봐 개인 위생을 철저히 하는 모습이 보여요. 다소 빡빡한 위생관리로 주변사람이 불편해할 수 있어요. */
const sanitary1 = (sky, land, gun) => {
  let siksinResult = false;
  let bigubCount = 0;
  let inSungCount = 0;
  let result = false;
  for (var i = 0; i < sky.length; i++) {
    if (sky[i] === "식신") {
      siksinResult = true;
    } else if (sky[i] === "비견" || sky[i] === "겁재") {
      bigubCount = bigubCount + 1;
    } else if (sky[i] === "정인" || sky[i] === "편인") {
      inSungCount = inSungCount + 1;
    }
  }

  if (
    siksinResult === true &&
    (bigubCount >= 2 || inSungCount >= 2 || gun === "근")
  ) {
    result = true;
  } else {
    for (var i = 0; i < land.length; i++) {
      if (land[i] === "식신") {
        siksinResult = true;
      } else if (land[i] === "정인" || land[i] === "편인") {
        inSungCount = inSungCount + 1;
      }
    }
    if (
      siksinResult === true &&
      (bigubCount >= 2 || inSungCount >= 2 || gun === "근")
    ) {
      result = true;
    }
  }
  return result;
};

/*
  공식 : 편관이 있는 사주가 인성이 2개이상 or 근왕  or  천간 비겁 두개이상
  
  #면역의_황태자 #바이러스_넘사벽
  그냥 태생적으로 타고났습니다. 면역력이 타고나길 강해 전염병에 대한 감염확률이 적어요.
  그래도 조심하세요. 내가 안 걸리더라고 주변 사람에게 병을 옮길 수 있으니 꼭 위생 철저!*/
const sanitary2 = (sky, land, gun) => {
  let siksinResult = false;
  let bigubCount = 0;
  let inSungCount = 0;
  let result = false;
  for (var i = 0; i < sky.length; i++) {
    if (sky[i] === "편관") {
      siksinResult = true;
    } else if (sky[i] === "비견" || sky[i] === "겁재") {
      bigubCount = bigubCount + 1;
    } else if (sky[i] === "정인" || sky[i] === "편인") {
      inSungCount = inSungCount + 1;
    }
  }

  if (
    siksinResult === true &&
    (bigubCount >= 2 || inSungCount >= 2 || gun === "근")
  ) {
    result = true;
  } else {
    for (var i = 0; i < land.length; i++) {
      if (land[i] === "편관") {
        siksinResult = true;
      } else if (land[i] === "정인" || land[i] === "편인") {
        inSungCount = inSungCount + 1;
      }
    }
    if (
      siksinResult === true &&
      (bigubCount >= 2 || inSungCount >= 2 || gun === "근")
    ) {
      result = true;
    }
  }
  return result;
};

/*
  (천간 임수 or 용신 임수) and (천간 경금 or 천간 신금)
  
  #정리정돈_신 #혹시_결백증
  주변 정리정돈하는 습관이 잘되어 있어요. 위생관념도 철처하여 전염병에 대한 방어력도 우수하고요.
  이정도의 생활습관이면 어떤 바이러스가 와도 걱정이 없습니다.*/
const sanitary3 = (sky, yongsin) => {
  let imsu = false;
  let gyongumSingun = false;
  let result = false;
  for (var i = 0; i < sky.length; i++) {
    if (sky[i] === "임") {
      imsu = true;
    } else if (sky[i] === "경" || sky[i] === "신") {
      gyongumSingun = true;
    }
  }
  if ((imsu === true || yongsin === "임") && gyongumSingun === true) {
    result = true;
  }

  return result;
};

/*
  (천간 병화 or 용신 병화) and (천간 갑목 or 천간 을목)
  
  #매너있는 #질서있는_사람
  평소 단정한 인간관계와 질서있는 생활을 하고 있어요. 철저한 자기관리 및 위생관념의 소유자기도 해요.
  이정도의 생활습관이면 어떤 바이러스가 와도 걱정이 없습니다.*/
const sanitary4 = (sky, yongsin) => {
  let byongha = false;
  let gabmokumok = false;
  let result = false;
  for (var i = 0; i < sky.length; i++) {
    if (sky[i] === "병") {
      byongha = true;
    } else if (sky[i] === "갑" || sky[i] === "을") {
      gabmokumok = true;
    }
  }
  if ((byongha === true || yongsin === "병") && gabmokumok === true) {
    result = true;
  }

  return result;
};

module.exports = Hygiene;
