const ryeongUtil = require('../../../../manseUtil/ryeong/ryeongUtil')
const manseTool = require('../../../../manseUtil/chunJiji/checkWord')
const basicUse = require('../../../../manseUtil/basicUse/basicUse')
const yongsinUn = require('../../../../testResult/contents_pro_report/addition/01yongsinUn/yongsinUn.json')

/**
 * 01.용신운 함수에서 세운이 용신운일때, 사용하는 함수이다.
 * @returns 
 */
exports.yongsinUn = () =>{
    let result={
        type:'',
        keyword:''
    }
    // 빠른작업을 위해 useRyeong을 함수화 시킴
    // 객체들 리스트가 목록에 떠서 좀더 빠른작업 가능함
    const ryeong = ryeongUtil.ryeongCollection()
    if(manseTool.checkALL(ryeong.heuisin)==='Y'&& 
    basicUse.getBasicUse()==='basic'){
      // 희신O, 기초분야
      result.type='용신운'
      result.keyword=getResult('heuisinYesBasic',yongsinUn).contents
    }
    else if(manseTool.checkALL(ryeong.heuisin)==='Y'&& 
    basicUse.getBasicUse()==='uses'){
      // 희신O, 활용분야
      result.type='용신운'
      result.keyword=getResult('heuisinYesUses',yongsinUn).contents
    }
    else if(manseTool.checkALL(ryeong.heuisin)==='N'&& 
    basicUse.getBasicUse()==='basic'){
      // 희신X, 기초분야
      result.type='용신운'
      result.keyword=getResult('heuisinNoBasic',yongsinUn).contents
    }
    else if(manseTool.checkALL(ryeong.heuisin)==='N'&& 
    basicUse.getBasicUse()==='uses'){
      // 희신X, 활용분야
      result.type='용신운'
      result.keyword=getResult('heuisinNoUses',yongsinUn).contents
    }
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