var unse = {};
const resultTest = require("../../../../yearUnse/tti_unse.json");
unse.ttiYear = function () {
  let result;
  let all = getResult(usePillar.y_land, "all");

  let myYear = getResult(
    usePillar.y_land,
    String(useDate.year).substr(String(useDate.year).length - 2, 2)
  );
  result = {
    all: all,
    myYear: myYear,
  };
  return result;
};

function getResult(word, year) {
  let result;
  for (let i = 0; i < resultTest.data.length; i++) {
    if (resultTest.data[i].title === "tti_" + change(word) + "_" + year) {
      result = resultTest.data[i];
      break;
    }
  }
  return result;
}

function change(word) {
  let result;

  if (word === "자") {
    result = "rat";
  } else if (word === "축") {
    result = "cow";
  } else if (word === "인") {
    result = "tiger";
  } else if (word === "묘") {
    result = "rabbit";
  } else if (word === "진") {
    result = "dragon";
  } else if (word === "사") {
    result = "snake";
  } else if (word === "오") {
    result = "horse";
  } else if (word === "미") {
    result = "sheep";
  } else if (word === "신") {
    result = "monkey";
  } else if (word === "유") {
    result = "chicken";
  } else if (word === "술") {
    result = "dog";
  } else if (word === "해") {
    result = "pig";
  }

  return result;
}
module.exports = unse;
