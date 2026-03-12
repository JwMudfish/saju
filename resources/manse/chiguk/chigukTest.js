var chigukFunc = {};
//음양오행  객체에 담고 한번에 myManse에 넣어버리기
let chiguk = {};
const chigukFunction = require('./chiguk');
chigukFunc.chiguk = function () {
  return new Promise((resolve) => {
    useGyoukProperty = [];
    let gyouk = chigukFunction.chiguk();
    useGyouk = gyouk;
    myManse.Gyouk = useGyouk;
    resolve(chiguk);
  }).catch((error) => {
    console.log(error);
    return error;
});
};
module.exports = chigukFunc;
