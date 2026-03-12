var Sangsin = {};

let defaultFile = '../testResult/contents_hapChung'
let useFolder;
let options;
const hapChung = require('../manseUtil/hapchung/samhapUtil');
Sangsin.randum = function () {
  let result = {
    title: '',
    contents: '',
  };
  result.title ='타이틀 준비중',
    result.contents = self()
  return result;
};

const self = () => {
  let result = '';

  result =sentence() 

  return result;
};

const sentence = () =>{
  let result = ''
  if(hapChung.checkSamhapWolYN()==='Y' ||
  hapChung.checkbanghapWolYN() ==='Y' ||
  hapChung.checkYukhapChoiceYN(usePillar.d_land, 'D')==='Y' ) {
    result= samhap()+banghap()+yukhap()
  }
  else if (hapChung.checkChungWolYN() === 'Y'){
 // hapChung.checkChungChoiceYN(usePillar.d_land, 'D') === 'Y'){
    result=onlyChung()
  }
  else {
    result=no()
  }

  return result;
}

const samhap = () => {
  let result =''
  let folder =require (defaultFile+'/samhapYes/contents_samhap.json')
  if(hapChung.checkSamhapWolYN()==='Y') {
    result=getResult("samhapYes",folder).contents
    if(hapChung.checkChungWolYN() === 'Y'){
      result=result+'\n\n'+getResult("chungYes",folder).contents
    }
    else {
      result=result+'\n\n'+getResult("chungNo",folder).contents
    }
  }


  return result;
}

const banghap = () => {
  let result =''
  let folder =require (defaultFile+'/banghapYes/contents_banghap.json')
  if(hapChung.checkbanghapWolYN()==='Y') {
    result=getResult("banghapYes",folder).contents
    if(hapChung.checkChungWolYN() === 'Y'){
      result=result+'\n\n'+getResult("chungYes",folder).contents
    }
    else {
      result=result+'\n\n'+getResult("chungNo",folder).contents
    }
  }
  return result;
}

const yukhap = () => {
  let result =''
 // let folder = defaultFile+'/banghapYes/contents_banghap.json'
  if(hapChung.checkYukhapChoiceYN(usePillar.d_land, 'D')==='Y' ) {
    //result=getResult("banghapYes",folder).contents
    result='육합글은 준비중입니다'
    if(hapChung.checkChungChoiceYN(usePillar.d_land, 'D') === 'Y'){
   //   result=result+'\n\n'+getResult("chungYes",folder).contents
    }
    else {
    //  result=result+'\n\n'+getResult("chungNo",folder).contents
    }
  }
  return result;
}

const onlyChung = () => {
  let result =''
  let folder =require( defaultFile+'/onlyChung/contents_onlyChung.json')
  result=getResult("onlyChung",folder).contents
  return result;
}
const no = () => {
  let result =''
  let folder =require (defaultFile+'/no/contents_no.json')
  result=getResult("no",folder).contents
  return result;
}

function getResult(title,folder) {
  let result;
  for (let i = 0; i < folder.contentsList.length; i++) {
    if (title === folder.contentsList[i].title) {
      result = folder.contentsList[i];
      break;
    }
  }
  return result;
}

module.exports = Sangsin;
