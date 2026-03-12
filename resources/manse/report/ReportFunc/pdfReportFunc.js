
const contents_hisin = require('../../../testResult/content_pdf/contents_Hisin.json')
const contents_talent = require('../../../testResult/content_pdf/contents_talent.json')
const contents_hisin_good_bad = require('../../../testResult/content_pdf/contents_Hisin_goodBad.json')
const contents_test_title = require('../../../testResult/contents_myPage/contents_myTitle.json');
const contents_concentration = require('../../../testResult/contents_pro_report/07concentration/concentration.json');
const manseTool = require('../../../manseUtil/chunJiji/checkWord')
const contents_junghwa = require('../../../test/contents_pdf/realization')
const contents_jisok = require('../../../test/contents_jisok')
const contents_hwakjang = require('../../../test/contents_hwakjang')
const contents_attitude = require('../../../test/contents_attitude')
const contents_competion = require('../../../test/contents_pro/04competion')
const contents_growthPotential = require('../../../test/contents_pro/12growthPotential')
const contents_resultAblity= require('../../../test/contents_pro/10ResultAblity')
const contents_thisJobTypeNew= require('../../../test/contents_pro/addition/09.jobTypeNew')
const contents_yongsinTitle = require('../../../testResult/content_pdf/contents_yongsinTitle.json')
const contents_gyoukKeyword= require('../../../testResult/content_pdf/contents_gyoukSimple.json')
const contents_interest = require('../../../test/contents_pdf/interest')
const contents_humanResources = require('../../../test/contents_pdf/humanResources')
const contents_efficiency = require('../../../test/contents_pdf/efficiency')
const contents_aptitude = require('../../../test/contents_pdf/aptitude')

exports.aptitude = () => {

  let result = {
    yongsinExplan:contents_aptitude.randum().yongsin,
    myYongsin:contents_aptitude.randum().myYongsin,
    inverseYongsin:contents_aptitude.randum().inverseYongsin
  }

  return result;

}

exports. talent = () => {
  let result = {
    main:'',
  hisin:''}
  let yongsinTitle = new Map()
  yongsinTitle.set("계", "gyesu")
  yongsinTitle.set("갑", "gapmok")
  yongsinTitle.set("을", "ulmok")
  yongsinTitle.set("병", "byeonghwa")
  yongsinTitle.set("정", "jeonghwa")
  yongsinTitle.set("경", "gyounggum")
  yongsinTitle.set("신", "singum")
  yongsinTitle.set("임", "limsu")
  let title = yongsinTitle.get(useRyeong.yongsin)
  result.main=getResult(title,contents_talent).contents
  if (useRyeong.heuisin.exist === "Y") {
    result.hisin=getResult(title+'_hisin_Y',contents_talent).contents
}
else {
  result.hisin=getResult(title+'_hisin_N',contents_talent).contents
}
    return result;
}

exports. aptitudeField = () => {
  let result = ''
  let yongsinTitle = new Map()
  yongsinTitle.set("계", "기초_인문")
  yongsinTitle.set("갑", "기초_인문")
  yongsinTitle.set("을", "활용_인문")
  yongsinTitle.set("병", "활용_인문")
  yongsinTitle.set("정", "기초_산업")
  yongsinTitle.set("경", "기초_산업")
  yongsinTitle.set("신", "활용_산업")
  yongsinTitle.set("임", "활용_산업")
  result= yongsinTitle.get(useRyeong.yongsin)
    return result;
}
exports. efficiency = () => {
  const efficiency= contents_efficiency.randum()
 return efficiency
}
 exports. humanResources = () => {
   const humanResources= contents_humanResources.randum()
  return humanResources
}
 exports.interest = () => {
   const interest= contents_interest.randum()
  return interest
}
exports.checkYND = (word) => {
  let result = 'N'
  if (word === undefined) {

  }
  else if (word.exist === 'Y') {
      if (word.use.includes('y') || word.use.includes('Y')) {
          result = 'Y'
      }
      else {
          result = 'D'
      }
  }

  return result;
}
exports.getHisinWord = () => {
    let result = {
        yes:'',
        no:''
    }
    result.yes=getResult("Hisin_1",contents_hisin).contents
    result.no=getResult("Hisin_2",contents_hisin).contents
    return result;
}

exports.getTitleYongsinGyouk = () =>{
    let result=getGyeokTitle() + " " + getYongsinTitle()
    return result;
}
exports.getYongsinTitle = () =>{
  let result = ''
  let yongsinTitle = new Map()
  yongsinTitle.set("계", "yongsin_GyeSu")
  yongsinTitle.set("갑", "yongsin_GapMok")
  yongsinTitle.set("을", "yongsin_UlMok")
  yongsinTitle.set("병", "yongsin_ByeongHwa")
  yongsinTitle.set("정", "yongsin_JungHwa")
  yongsinTitle.set("경", "yongsin_GyeongGum")
  yongsinTitle.set("신", "yongsin_SinGum")
  yongsinTitle.set("임", "yongsin_Limsu")
  let title = yongsinTitle.get(useRyeong.yongsin)
  result=getResult(title,contents_yongsinTitle).contents
    return result;
}
exports.getGyoukKeyword = () =>{
  let result = ''
  let yongsinTitle = new Map()
  yongsinTitle.set("건록격", "gunlok")
  yongsinTitle.set("양인격", "yangin")
  yongsinTitle.set("상관격", "sangGuan")
  yongsinTitle.set("식신격", "siksin")
  yongsinTitle.set("정인격", "jungIn")
  yongsinTitle.set("편인격", "pyeonIn")
  yongsinTitle.set("정재격", "jungJe")
  yongsinTitle.set("편재격", "pyeonje")
  yongsinTitle.set("정관격", "jungGuan")
  yongsinTitle.set("편관격", "pyeonGuan")
  let title = yongsinTitle.get(useGyouk)
  result=getResult(title,contents_gyoukKeyword).contents
    return result;
}

exports.aptitude_title = () =>{
  let result = ''
  let yongsinTitle = new Map()
  yongsinTitle.set("계", "yongsin_1")
  yongsinTitle.set("갑", "yongsin_2")
  yongsinTitle.set("을", "yongsin_3")
  yongsinTitle.set("병", "yongsin_4")
  yongsinTitle.set("정", "yongsin_5")
  yongsinTitle.set("경", "yongsin_6")
  yongsinTitle.set("신", "yongsin_7")
  yongsinTitle.set("임", "yongsin_8")
  result= yongsinTitle.get(useRyeong.yongsin)
    return result;
}

exports.getSkillTitle = () =>{
  let result=getSkillTitle()
  return result;
}
exports.getSkillTitleGisin = (word) =>{
  let result=getSkillTitleGisin(word)
  return result;
}
exports.getSkillImageName = (word) =>{
  let result=getSkillImageName(word)
  return result;
}
exports.getSkillImageNameGisin = (word) =>{
  let result=getSkillImageNameGisin(word)
  return result;
}

exports.getHisinGoodBad = () =>{
    let result = {
        good:'',
        bad:''
    }
    if (useRyeong.heuisin.exist === 'N') {
        result.good=getResult("Hisin_No_Good",contents_hisin_good_bad).contents
        result.bad=getResult("Hisin_No_Bad",contents_hisin_good_bad).contents
    }
    else {
        result.good=getResult("Hisin_Yes_Good",contents_hisin_good_bad).contents
        result.bad=getResult("Hisin_Yes_Bad",contents_hisin_good_bad).contents
    }
    return result;
}
exports.getAttitude = () => {
    let result = {}
        result=contents_attitude.randum()
    return result;
}

exports.page11 = () => {
    let result = {
      concept:{},
      growthPotential:{},
      resultAblity:{}
    }
    result.concept=contents_competion.randum()
    result.growthPotential=contents_growthPotential.randum()
    result.resultAblity=contents_resultAblity.randum()
    return result;
}

exports.page12 = () => {
  let result = {
    jobtype:{},
    growthPotential:{},
    resultAblity:{}
  }
  result.jobtype=contents_thisJobTypeNew.randum()
  result.growthPotential=contents_growthPotential.randum()
  result.resultAblity=contents_resultAblity.randum()
  return result;
}
exports.concentration  = () =>{
    let result={
        type:'분산',
        keyword:''
      };
      if(countHisinGisin()===2 && manseTool.checkALL(useRyeong.heuisin)==='Y' ){
        result.type='멀티태스킹'
        result.keyword=getResult('Multi-tasking1',contents_concentration).contents
      }
      else if(countHisinGisin()===1 && manseTool.checkALL(useRyeong.heuisin)==='N' ){
        result.type='멀티태스킹'
        result.keyword=getResult('Multi-tasking2',contents_concentration).contents
      }
      else if(countHisinGisin()<=1 && manseTool.checkALL(useRyeong.heuisin)==='Y' ){
        result.type='집중력'
        result.keyword=getResult('concentraiton1',contents_concentration).contents
      }
      else if(countHisinGisin()===0 && manseTool.checkALL(useRyeong.heuisin)==='N' ){
        result.type='분산'
        result.keyword=getResult('noconcentration1',contents_concentration).contents
      }
      else {
        result.type='분산'
        result.keyword=getResult('noconcentration2',contents_concentration).contents
      }
      return result;
}
/*exports.efficiency = () =>{
    let result = {
        junghwa:{},
        jisok:{},
        hwakjang:{}
    }
    result.junghwa=contents_junghwa.randum()
    result.jisok.contents=contents_jisok.randum().contents
    result.jisok.yn=checkYND(useRyeong.jisok)
    result.hwakjang.contents=contents_hwakjang.randum().contents
    result.hwakjang.yn=checkYND(useRyeong.hwakjang)

    return result;
}*/
exports.realization = () =>{
  let result = contents_junghwa.randum()
  return result;
}

const getSkillTitleGisin = (word) => {
  let result = ''; 
   let main = new Map()

  main.set("계", "사고력")
  main.set("갑", "학습력")
  main.set("을", "설득력")
  main.set("병", "소통력")
  main.set("정", "탐구력")
  main.set("경", "숙달력")
  main.set("신", "검증력")
  main.set("임", "전달력")
  result= main.get(word)

  return result;
}


const getSkillTitle = () => {
  let result = {
      main: '',
      job: '',
      sub: ''
  }; 
   let main = new Map()

  main.set("계", "사고력")
  main.set("갑", "학습력")
  main.set("을", "설득력")
  main.set("병", "소통력")
  main.set("정", "탐구력")
  main.set("경", "숙달력")
  main.set("신", "검증력")
  main.set("임", "전달력")
  result.main= main.get(useRyeong.yongsin)
  
  let sub = new Map()
  sub.set("계", "표현력")
  sub.set("갑", "계획")
  sub.set("을", "조직")
  sub.set("병", "인프라")
  sub.set("정", "생산성")
  sub.set("경", "기술")
  sub.set("신", "상품성")
  sub.set("임", "품질")
  result.sub= sub.get(useRyeong.yongsin)

  let job = new Map()
  job.set("건록격", "대의")
  job.set("양인격", "수호")
  job.set("상관격", "혁신")
  job.set("식신격", "준비")
  job.set("정인격", "지식")
  job.set("편인격", "창의")
  job.set("정재격", "안정")
  job.set("편재격", "투자")
  job.set("정관격", "원칙")
  job.set("편관격", "관리")
  result.job= job.get(myManse.Gyouk)
  return result;
}

const getSkillImageNameGisin = (word) => {
  let result = ''
  let sub = new Map()
  sub.set("계", "gye")
  sub.set("갑", "gap")
  sub.set("을", "eul")
  sub.set("병", "byeong")
  sub.set("정", "jeong")
  sub.set("경", "gyoung")
  sub.set("신", "shin")
  sub.set("임", "im")
  result= sub.get(word.word)
  if(!word.use.includes('y')){
    result=result+'_N'
  }

  return result
}

const getSkillImageName = (word) => {
  let result = ''
  if (word.includes('계')) {
    result = 'gye'
  } else if (word.includes('갑')) {
    result = 'gap'
  } else if (word.includes('을')) {
    result = 'eul'
  } else if (word.includes('병')) {
    result = 'byeong'
  } else if (word.includes('정')) {
    result = 'jeong'
  } else if (word.includes('경')) {
    result = 'gyoung'
  } else if (word.includes('신')) {
    result = 'shin'
  } else if (word.includes('임')) {
    result = 'im'
  }
  if(word.includes('Y')){
    result=result+'Y'
  }
  if(word.includes('N')){
    result=result+'N'
  }

  return result
}
const checkYND = (word) => {
    let result = 'N'
    if (word === undefined) {

    }
    else if (word.exist === 'Y') {
        if (word.use.includes('y') || word.use.includes('Y')) {
            result = 'Y'
        }
        else {
            result = 'D'
        }
    }

    return result;
}
const countHisinGisin = () => {
    let result=0;
  
    if(manseTool.checkChunGan(useRyeong.um_heuisin_gisin)==='Y') {
      result=result+1
    }
    if(manseTool.checkChunGan(useRyeong.geuk_heuisin_gisin)==='Y') {
      result=result+1
    }
  
    return result;
  
  }
const getGyeokTitle = () => {
    let result = ''
    let changeGyouk = new Map()
    changeGyouk.set("정관격", "jungGuan")
    changeGyouk.set("정재격", "jungJe")
    changeGyouk.set("정인격", "jungIn")
    changeGyouk.set("식신격", "siksin")
    changeGyouk.set("편재격", "pyeonJe")
    changeGyouk.set("편인격", "pyeonIn")
    changeGyouk.set("편관격", "pyeonGuan")
    changeGyouk.set("상관격", "sangGuan")
    changeGyouk.set("양인격", "yangIn")
    changeGyouk.set("건록격", "gunLok")
    let title = changeGyouk.get(useGyouk)
    result = getResult(title,contents_test_title).contents
    return result;
  }

  const getYongsinTitle = () => {
    let result = ''
    let changeGyouk = new Map()
    changeGyouk.set("계", "gyeSu")
    changeGyouk.set("갑", "gabMok")
    changeGyouk.set("을", "ulMok")
    changeGyouk.set("병", "bungHwa")
    changeGyouk.set("정", "jungHwa")
    changeGyouk.set("경", "gyeongGum")
    changeGyouk.set("신", "sinGum")
    changeGyouk.set("임", "limSu")
    let title = changeGyouk.get(useRyeong.yongsin)
    result = getResult(title,contents_test_title).contents
    return result;
  }
function getResult(title,word) {
    let result;
    for (let i = 0; i < word.contentsList.length; i++) {
      if (title === word.contentsList[i].title) {
        result = word.contentsList[i];
        break;
      }
    }
    return result;
  }