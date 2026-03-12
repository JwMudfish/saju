var Indon = {};

var title = "partner_mind_";
var num;
var totalTitle;
// num = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
let options;
Indon.randum = function (test) {
  self(test);
  return totalTitle;
};
const self = (test) => {
  if (test.PALPUM.MENTO !== "" && test.PALPUM.JAGEUM !== "") {
    totalTitle = title + 1;
  } else if (test.PALPUM.MENTO !== "" && test.PALPUM.JAGEUM === "") {
    totalTitle = title + 2;
  } else if (test.PALPUM.MENTO === "" && test.PALPUM.JAGEUM !== "") {
    totalTitle = title + 3;
  } else if (test.PALPUM.MENTO === "" && test.PALPUM.JAGEUM === "") {
    totalTitle = title + 4;
  }
};

module.exports = Indon;
