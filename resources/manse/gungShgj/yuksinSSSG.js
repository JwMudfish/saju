var sssgFunc = {};
sssgFunc.sssg = function (gyouk, yuksin) {
  let result = "   ";
  if (gyouk === "비겁") {
    result = bigub(yuksin);
  } else if (gyouk === "식상") {
    result = siksang(yuksin);
  } else if (gyouk === "재성") {
    result = zeasung(yuksin);
  } else if (gyouk === "관성") {
    result = guansung(yuksin);
  } else if (gyouk === "인성") {
    result = insung(yuksin);
  }
  return result;
};

function bigub(yuksin) {
  let result = "";
  if (yuksin === "비겁") {
    result = "me";
  } else if (yuksin === "식상") {
    result = "shang_go";
  } else if (yuksin === "재성") {
    result = "geuk_go";
  } else if (yuksin === "관성") {
    result = "geuk_come";
  } else if (yuksin === "인성") {
    result = "shang_come";
  }
  return result;
}

function siksang(yuksin) {
  let result = "";
  if (yuksin === "비겁") {
    result = "shang_come";
  } else if (yuksin === "식상") {
    result = "me";
  } else if (yuksin === "재성") {
    result = "shang_go";
  } else if (yuksin === "관성") {
    result = "geuk_go";
  } else if (yuksin === "인성") {
    result = "geuk_come";
  }
  return result;
}

function zeasung(yuksin) {
  let result = "";
  if (yuksin === "비겁") {
    result = "geuk_come";
  } else if (yuksin === "식상") {
    result = "shang_come";
  } else if (yuksin === "재성") {
    result = "me";
  } else if (yuksin === "관성") {
    result = "shang_go";
  } else if (yuksin === "인성") {
    result = "geuk_go";
  }
  return result;
}
function guansung(yuksin) {
  let result = "";
  if (yuksin === "비겁") {
    result = "geuk_go";
  } else if (yuksin === "식상") {
    result = "geuk_come";
  } else if (yuksin === "재성") {
    result = "shang_come";
  } else if (yuksin === "관성") {
    result = "me";
  } else if (yuksin === "인성") {
    result = "shang_go";
  }
  return result;
}

function insung(yuksin) {
  let result = "";
  if (yuksin === "비겁") {
    result = "shang_go";
  } else if (yuksin === "식상") {
    result = "geuk_go";
  } else if (yuksin === "재성") {
    result = "geuk_come";
  } else if (yuksin === "관성") {
    result = "shang_come";
  } else if (yuksin === "인성") {
    result = "me";
  }
  return result;
}

module.exports = sssgFunc;
