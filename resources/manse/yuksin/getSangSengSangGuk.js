var sssg = {};

//오행 상생상극 뱉어내는 함수
sssg.sssg = function (my, other) {
  let result;
  if (my === "목") {
    result = mok(other);
  } else if (my === "화") {
    result = hwa(other);
  } else if (my === "수") {
    result = su(other);
  } else if (my === "금") {
    result = gum(other);
  } else if (my === "토") {
    result = toe(other);
  } else {
    result = "  ";
  }

  return result;
};
function mok(my) {
  let result;
  if (my === "수") {
    result = "shang_come";
  } else if (my === "화") {
    result = "shang_go";
  } else if (my === "토") {
    result = "geuk_go";
  } else if (my === "금") {
    result = "geuk_come";
  } else if (my === "목") {
    result = "me";
  } else {
    result = "  ";
  }

  return result;
}
function su(my) {
  let result;
  if (my === "금") {
    result = "shang_come";
  } else if (my === "목") {
    result = "shang_go";
  } else if (my === "화") {
    result = "geuk_go";
  } else if (my === "토") {
    result = "geuk_come";
  } else if (my === "수") {
    result = "me";
  } else {
    result = "  ";
  }

  return result;
}
function hwa(my) {
  let result;
  if (my === "목") {
    result = "shang_come";
  } else if (my === "토") {
    result = "shang_go";
  } else if (my === "금") {
    result = "geuk_go";
  } else if (my === "수") {
    result = "geuk_come";
  } else if (my === "화") {
    result = "me";
  } else {
    result = "  ";
  }

  return result;
}
function toe(my) {
  let result;
  if (my === "화") {
    result = "shang_come";
  } else if (my === "금") {
    result = "shang_go";
  } else if (my === "수") {
    result = "geuk_go";
  } else if (my === "목") {
    result = "geuk_come";
  } else if (my === "토") {
    result = "me";
  } else {
    result = "  ";
  }

  return result;
}
function gum(my) {
  let result;
  if (my === "토") {
    result = "shang_come";
  } else if (my === "수") {
    result = "shang_go";
  } else if (my === "목") {
    result = "geuk_go";
  } else if (my === "화") {
    result = "geuk_come";
  } else if (my === "금") {
    result = "me";
  } else {
    result = "  ";
  }

  return result;
}

module.exports = sssg;
