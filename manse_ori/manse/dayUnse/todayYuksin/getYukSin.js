var yuksin = {};

//상생상극 뱉어내는 함수
yuksin.yuksin = function (sssg, yangum) {
  let result = "";
  if (
    usePillar.d_sky === "갑" ||
    usePillar.d_sky === "병" ||
    usePillar.d_sky === "무" ||
    usePillar.d_sky === "경" ||
    usePillar.d_sky === "임"
  ) {
    result = yang(sssg, yangum);
  } else if (
    usePillar.d_sky === "을" ||
    usePillar.d_sky === "정" ||
    usePillar.d_sky === "기" ||
    usePillar.d_sky === "신" ||
    usePillar.d_sky === "계"
  ) {
    result = um(sssg, yangum);
  }
  return result;
};

function yang(sssg, yangum) {
  let result;
  if (sssg === "me" && yangum === "양") {
    result = "비견";
  } else if (sssg === "me" && yangum === "음") {
    result = "겁재";
  } else if (sssg === "shang_come" && yangum === "양") {
    result = "편인";
  } else if (sssg === "shang_come" && yangum === "음") {
    result = "정인";
  } else if (sssg === "shang_go" && yangum === "양") {
    result = "식신";
  } else if (sssg === "shang_go" && yangum === "음") {
    result = "상관";
  } else if (sssg === "geuk_go" && yangum === "양") {
    result = "편재";
  } else if (sssg === "geuk_go" && yangum === "음") {
    result = "정재";
  } else if (sssg === "geuk_come" && yangum === "양") {
    result = "편관";
  } else if (sssg === "geuk_come" && yangum === "음") {
    result = "정관";
  } else {
    result = "  ";
  }
  return result;
}
function um(sssg, yangum) {
  let result;
  if (sssg === "me" && yangum === "양") {
    result = "겁재";
  } else if (sssg === "me" && yangum === "음") {
    result = "비견";
  } else if (sssg === "shang_come" && yangum === "양") {
    result = "정인";
  } else if (sssg === "shang_come" && yangum === "음") {
    result = "편인";
  } else if (sssg === "shang_go" && yangum === "양") {
    result = "상관";
  } else if (sssg === "shang_go" && yangum === "음") {
    result = "식신";
  } else if (sssg === "geuk_go" && yangum === "양") {
    result = "정재";
  } else if (sssg === "geuk_go" && yangum === "음") {
    result = "편재";
  } else if (sssg === "geuk_come" && yangum === "양") {
    result = "정관";
  } else if (sssg === "geuk_come" && yangum === "음") {
    result = "편관";
  } else {
    result = "  ";
  }
  return result;
}

module.exports = yuksin;
