var jijganggan = {};

jijganggan.jijganggan = function (year) {
  let result;
  if (year === "자") {
    result = "임,  ,계";
  } else if (year === "축") {
    result = "계,신,기";
  } else if (year === "인") {
    result = "무,병,갑";
  } else if (year === "묘") {
    result = "갑,  ,을";
  } else if (year === "진") {
    result = "을,계,무";
  } else if (year === "사") {
    result = "무,경,병";
  } else if (year === "오") {
    result = "병,기,정";
  } else if (year === "미") {
    result = "정,을,기";
  } else if (year === "신") {
    result = "무,임,경";
  } else if (year === "유") {
    result = "경,  ,신";
  } else if (year === "술") {
    result = "신,정,무";
  } else if (year === "술") {
    result = "신,정,무";
  } else if (year === "해") {
    result = "무,갑,임";
  }
  return result;
};

module.exports = jijganggan;
