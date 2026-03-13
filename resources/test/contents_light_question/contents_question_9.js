var Sangsin = {};
let defaultFile = "../../testResult/contents_light_question/q8"
let useFolder;
Sangsin.randum = function () {
  let result = {
    title: '',
    contents: '',
  };
  result.title ='Q7 힘든 건 사랑이 아니다.',
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
    // result=hungGyouk()
    result='흉격은 준비중'
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
  let result = ''
  let sangSeng = getSangSengContents('jungIn')
  let sangGuk = getSangGukContents('jungIn',sangSeng.status)
  result= sangSeng.contents+sangGuk.contents
  return result;
}


const jungGuan = () => {
  let result = ''
  let sangSeng = getSangSengContents('jungGuan')
  let sangGuk = getSangGukContents('jungGuan',sangSeng.status)
  result= sangSeng.contents+sangGuk.contents
  return result;
}

const jungje = () => {
  let result = ''
  let sangSeng = getSangSengContents('jungJe')
  let sangGuk = getSangGukContents('jungJe',sangSeng.status)
  result= sangSeng.contents+sangGuk.contents
  return result;
}

const pyeonIn= () => {
  let result = ''
  let sangSeng = getSangSengContents('pyeonIn')
  let sangGuk = getSangGukContents('pyeonIn',sangSeng.status)
  result= sangSeng.contents+sangGuk.contents
  return result;
}

const pyeonje= () => {
  let result = ''
  let sangSeng = getSangSengContents('pyeonje')
  let sangGuk = getSangGukContents('pyeonje',sangSeng.status)
  result= sangSeng.contents+sangGuk.contents
  return result;
}

const siksin= () => {
  let result = ''
  let sangSeng = getSangSengContents('siksin')
  let sangGuk = getSangGukContents('siksin',sangSeng.status)
  result= sangSeng.contents+sangGuk.contents
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
/**
 * 상생글 가져오기
 */
const getSangSengContents = (gyoukName) => {
  let result={
    status:'',
    contents:''
  }
  useFolder=require(defaultFile+'/'+gyoukName+'/sangSeng.json')
  if(getSangSengCheck(useShgj.sanghwa)===true && 
  getSangSengCheck(useShgj.sulhwa) === true ){
    result.contents=getResult("sengYes_sulYes").contents
    result.status="sengYes_sulYes"
  }
 else if(getSangSengCheck(useShgj.sanghwa)===true && 
  getSangSengCheck(useShgj.sulhwa) === false){
    result.contents= getResult("sengYes_sulNo").contents
    result.status="sengYes_sulNo"
  }
  else if(getSangSengCheck(useShgj.sanghwa)===false && 
  getSangSengCheck(useShgj.sulhwa) === true){
    result.contents=getResult("sengNo_sulYes").contents
    result.status="sengNo_sulYes"
  }
   else {
    result.contents=getResult("sengNo_sulNo").contents
    result.status="sengNo_sulNo"
   }
  return result;
}
/**
 * 상극컨텐츠
 */
const getSangGukContents =(gyoukName,status) => {
  let result={};
  result.contents=getSengHwaHapZe(gyoukName,status,useShgj.sengHwa_zeHwa,useShgj.sengHwa_hapHwa).contents+
  getSulHwaHapZe (gyoukName,status,useShgj.sengHwa_zeHwa,useShgj.sengHwa_hapHwa).contents
  return result;
}

/**
 * 생화 합화 제화 글 가지고오기
 * @param {*} gyoukName 
 * @param {*} status 
 * @param {*} zeHwa 
 * @param {*} hapHwa 
 * @returns 
 */
const getSengHwaHapZe = (gyoukName,status,zeHwa,hapHwa) => {
  let result= {}
  useFolder=require(defaultFile+'/'+gyoukName+'/'+status+'/sangGuk.json')
  if(getSangSengCheck(hapHwa)===true && 
  getSangSengCheck(zeHwa) === true ){
    result.contents='\n\n'+getResult("sengHwaZeHwa").contents
  }
  else   if(getSangSengCheck(hapHwa)===true ){
    result.contents='\n\n'+getResult("sengHwaHapHwa").contents
  }
  else   if(getSangSengCheck(zeHwa)===true ){
    result.contents='\n\n'+getResult("sengHwaZeHwa").contents
  }
  else {
    result.contents=''
  }
  return result;
}
/**
 * 설화 합화제화 글 가져오기
 * @param {*} gyoukName 
 * @param {*} status 
 * @param {*} zeHwa 
 * @param {*} hapHwa 
 * @returns 
 */
const getSulHwaHapZe = (gyoukName,status,zeHwa,hapHwa) => {
  let result= {}
  useFolder=require(defaultFile+'/'+gyoukName+'/'+status+'/sangGuk.json')
  if(getSangSengCheck(hapHwa)===true && 
  getSangSengCheck(zeHwa) === true ){
    result.contents='\n\n'+getResult("sulHwaZeHwa").contents
  }
  else   if(getSangSengCheck(hapHwa)===true ){
    result.contents='\n\n'+getResult("sulHwaHapHwa").contents
  }
  else if(getSangSengCheck(zeHwa)===true ){
    result.contents='\n\n'+getResult("sulHwaZeHwa").contents
  }
  else {
    result.contents=''
  }
  return result;
}
/**
 * 사용가능 불가능 체크(사용대기는 사용불가능)
 */
const getSangSengCheck =  (word) =>{
  let result = false
  
  if(word.exist.includes('Y') && 
  word.use.includes('Y')){
    result = true
  }
  return result;

}

module.exports = Sangsin;
