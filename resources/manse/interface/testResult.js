var interface = {};
const testList = require('../../list/testList.json');
//상생상극함수
interface.interface = function (name, contents) {
  return new Promise((resolve) => {
    // let test = require('../../test/' + name);
    let test;
    if(name.includes('contents_question_')){
      test= require('../../test/contents_light_question_test/' + name);
    }
    else {
      test= require('../../test/' + name);
    }

    let resultTest = test.randum(contents);
    myManseInterF = resultTest;
    resolve('');
  }).catch((error) => {
    console.log(error);
    return error;
});
};

module.exports = interface;
