var Sangsin = {};
let defaultGilFile = '../testResult/contents_shgjGilHung/gil'
let defaultHungFile = '../testResult/contents_shgjGilHung/hung'
let useFolder;
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
  if(useShgj.gukgubun==='길격'){
    result=gilGyouk()
  }
  else {
    result=hungGyouk()
  }
  return result;
}
const gilGyouk = () => {
  let result ='';
  if(useGyouk==='정인격'){
    result=jungin()
  }
  else if(useGyouk==='정관격'){
    result =jungGuan()
  }
  else if(useGyouk==='정재격'){
    result =jungje()
  }
  else if(useGyouk==='편인격'){
    result =pyeonIn()
  }
  else if(useGyouk==='편재격'){
    result =pyeonje()
  }
  else if(useGyouk==='식신격'){
    result =siksin()
  }
  return result;
}

const hungGyouk = () => {
  let result ='';
  if(useGyouk==='상관격'){
    result=sangGuan()
  }
  else if(useGyouk==='편관격'){
    result =pyeonGuan()
  }
  else if(useGyouk==='건록격'){
    result =gunLok()
  }
  else if(useGyouk==='양인격'){
    result =yangin()
  }
  
  return result;
}

const yangin = () => {
  let result=''
  useFolder=require(defaultHungFile+'/contents_yangIn.json')
  const chunGan = [
    useYuksin.y_sky,
    useYuksin.m_sky,
    useYuksin.d_sky,
    useYuksin.h_sky
  ]
  if(useShgj.sangsin.exist.includes('Y')&&
  useShgj.sangsin.use.includes('Y')){
    result=getResult("sinBun").contents
  }
  if(chunGan.includes('비견')||
  chunGan.includes('겁재')){
    result=result+"\n\n"+getResult("bigubYes").contents
  }
  if(useShgj.sanghwa.exist.includes('Y')&&
  useShgj.sanghwa.use.includes('Y')){
    result=result+"\n\n"+getResult("sengHwa").contents
  }
  if(useShgj.sulhwa.exist.includes('Y')&&
  useShgj.sulhwa.use.includes('Y')){
    result=result+"\n\n"+getResult("sulHwa").contents
  }

  return result;
}

const gunLok = () => {
  let result=''
  useFolder=require(defaultHungFile+'/contents_gunLok.json')
  const chunGan = [
    useYuksin.y_sky,
    useYuksin.m_sky,
    useYuksin.d_sky,
    useYuksin.h_sky
  ]
  if(useShgj.sangsin.exist.includes('Y')&&
  useShgj.sangsin.use.includes('Y')){
    result=getResult("sinBun").contents
  }
  if(chunGan.includes('비견')||
  chunGan.includes('겁재')){
    result=result+"\n\n"+getResult("bigubYes").contents
  }
  if(useShgj.sanghwa.exist.includes('Y')&&
  useShgj.sanghwa.use.includes('Y')){
    result=result+"\n\n"+getResult("sengHwa").contents
  }
  if(useShgj.sulhwa.exist.includes('Y')&&
  useShgj.sulhwa.use.includes('Y')){
    result=result+"\n\n"+getResult("sulHwa").contents
  }

  return result;
}

const pyeonGuan = () => {
  let result=''
  useFolder=require(defaultHungFile+'/contents_pyeonGuan.json')
  if(useShgj.sangsin.exist.includes('Y')&&
  useShgj.sangsin.use.includes('Y')){
    result=getResult("sinBun").contents
  }

  if(useShgj.sanghwa.exist.includes('Y')&&
  useShgj.sanghwa.use.includes('Y')){
    result=result+"\n\n"+getResult("sengHwa").contents
  }
  if(useShgj.sulhwa.exist.includes('Y')&&
  useShgj.sulhwa.use.includes('Y')){
    result=result+"\n\n"+getResult("sulHwa").contents
  }

  if(useShgj.sangsin.exist.includes('Y')&&
  useShgj.sangsin.use.includes('Y')){
    if(useShgj.sulHwa_zeHwa.exist.includes('Y')&&
    useShgj.sulHwa_zeHwa.use.includes('Y')){
      result=result+"\n\n"+getResult("sulHwa_zeHwa").contents
    }
  }
 
  return result;
}



const sangGuan = () => {
  let result=''
  useFolder=require(defaultHungFile+'/contents_sangGuan.json')
  if(useShgj.sangsin.exist.includes('Y')&&
  useShgj.sangsin.use.includes('Y')){
    result=getResult("sinBun").contents
  }

  if(useShgj.sanghwa.exist.includes('Y')&&
  useShgj.sanghwa.use.includes('Y')){
    result=result+"\n\n"+getResult("sengHwa").contents
  }
  if(useShgj.sulhwa.exist.includes('Y')&&
  useShgj.sulhwa.use.includes('Y')){
    result=result+"\n\n"+getResult("sulHwa").contents
  }

  if(useShgj.sangsin.exist.includes('Y')&&
  useShgj.sangsin.use.includes('Y')){
    if(useShgj.sulHwa_zeHwa.exist.includes('Y')&&
    useShgj.sulHwa_zeHwa.use.includes('Y')){
      result=result+"\n\n"+getResult("sulHwa_zeHwa").contents
    }
  }

  return result;
}

const jungin = () => {
  let result=''
  useFolder=require(defaultGilFile+'/contents_jungIn.json')
  if(useShgj.sanghwa.exist.includes('Y')&&
  useShgj.sanghwa.use.includes('Y')){
    result=getResult("sengHwa").contents
  }
  if(useShgj.sengHwa_zeHwa.exist.includes('Y')&&
  useShgj.sengHwa_zeHwa.use.includes('Y')){
    result=result+"\n\n"+getResult("sengHwa_zeHwa").contents
  }
  if(useShgj.sulhwa.exist.includes('Y')&&
  useShgj.sulhwa.use.includes('Y')){
    result=result+"\n\n"+getResult("sulHwa").contents
  }
  if(useShgj.sulHwa_zeHwa.exist.includes('Y')&&
  useShgj.sulHwa_zeHwa.use.includes('Y')){
    result=result+"\n\n"+getResult("sulHwa_zeHwa").contents
  }
  return result;
}

const jungGuan = () => {
  let result=''
  useFolder=require(defaultGilFile+'/contents_jungGuan.json')
  if(useShgj.sanghwa.exist.includes('Y')&&
  useShgj.sanghwa.use.includes('Y')){
    result=getResult("sengHwa").contents
  }
  if(useShgj.sengHwa_zeHwa.exist.includes('Y')&&
  useShgj.sengHwa_zeHwa.use.includes('Y')){
    result=result+"\n\n"+getResult("sengHwa_zeHwa").contents
  }
  if(useShgj.sulhwa.exist.includes('Y')&&
  useShgj.sulhwa.use.includes('Y')){
    result=result+"\n\n"+getResult("sulHwa").contents
  }
  if(useShgj.sulHwa_zeHwa.exist.includes('Y')&&
  useShgj.sulHwa_zeHwa.use.includes('Y')){
    result=result+"\n\n"+getResult("sulHwa_zeHwa").contents
  }
  return result;
}

const jungje = () => {
  let result=''
  useFolder=require(defaultGilFile+'/contents_jungje.json')
  if(useShgj.sanghwa.exist.includes('Y')&&
  useShgj.sanghwa.use.includes('Y')){
    result=getResult("sengHwa").contents
  }
  if(useShgj.sengHwa_zeHwa.exist.includes('Y')&&
  useShgj.sengHwa_zeHwa.use.includes('Y')){
    result=result+"\n\n"+getResult("sengHwa_zeHwa").contents
  }
  if(useShgj.sulhwa.exist.includes('Y')&&
  useShgj.sulhwa.use.includes('Y')){
    result=result+"\n\n"+getResult("sulHwa").contents
  }
  if(useShgj.sulHwa_zeHwa.exist.includes('Y')&&
  useShgj.sulHwa_zeHwa.use.includes('Y')){
    result=result+"\n\n"+getResult("sulHwa_zeHwa").contents
  }
  return result;
}

const pyeonIn= () => {
  let result=''
  useFolder=require(defaultGilFile+'/contents_pyeonIn.json')
  if(useShgj.sanghwa.exist.includes('Y')&&
  useShgj.sanghwa.use.includes('Y')){
    result=getResult("sengHwa").contents
  }
  if(useShgj.sengHwa_zeHwa.exist.includes('Y')&&
  useShgj.sengHwa_zeHwa.use.includes('Y')){
    result=result+"\n\n"+getResult("sengHwa_zeHwa").contents
  }
  if(useShgj.sulhwa.exist.includes('Y')&&
  useShgj.sulhwa.use.includes('Y')){
    result=result+"\n\n"+getResult("sulHwa").contents
  }
  if(useShgj.sulHwa_zeHwa.exist.includes('Y')&&
  useShgj.sulHwa_zeHwa.use.includes('Y')){
    result=result+"\n\n"+getResult("sulHwa_zeHwa").contents
  }
  return result;
}

const pyeonje= () => {
  let result=''
  useFolder=require(defaultGilFile+'/contents_pyeonje.json')
  if(useShgj.sanghwa.exist.includes('Y')&&
  useShgj.sanghwa.use.includes('Y')){
    result=getResult("sengHwa").contents
  }
  if(useShgj.sengHwa_zeHwa.exist.includes('Y')&&
  useShgj.sengHwa_zeHwa.use.includes('Y')){
    result=result+"\n\n"+getResult("sengHwa_zeHwa").contents
  }
  if(useShgj.sulhwa.exist.includes('Y')&&
  useShgj.sulhwa.use.includes('Y')){
    result=result+"\n\n"+getResult("sulHwa").contents
  }
  if(useShgj.sulHwa_zeHwa.exist.includes('Y')&&
  useShgj.sulHwa_zeHwa.use.includes('Y')){
    result=result+"\n\n"+getResult("sulHwa_zeHwa").contents
  }
  return result;
}

const siksin= () => {
  let result=''
  useFolder=require(defaultGilFile+'/contents_siksin.json')
  if(useShgj.sanghwa.exist.includes('Y')&&
  useShgj.sanghwa.use.includes('Y')){
    result=getResult("sengHwa").contents
  }
  if(useShgj.sengHwa_zeHwa.exist.includes('Y')&&
  useShgj.sengHwa_zeHwa.use.includes('Y')){
    result=result+"\n\n"+getResult("sengHwa_zeHwa").contents
  }
  if(useShgj.sulhwa.exist.includes('Y')&&
  useShgj.sulhwa.use.includes('Y')){
    result=result+"\n\n"+getResult("sulHwa").contents
  }
  if(useShgj.sulHwa_zeHwa.exist.includes('Y')&&
  useShgj.sulHwa_zeHwa.use.includes('Y')){
    result=result+"\n\n"+getResult("sulHwa_zeHwa").contents
  }
  return result;
}
function getResult(title) {
  let result;
  for (let i = 0; i < useFolder.contentsList.length; i++) {
    if (title === useFolder.contentsList[i].title) {
      result = useFolder.contentsList[i];
      break;
    }
  }
  return result;
}

module.exports = Sangsin;
