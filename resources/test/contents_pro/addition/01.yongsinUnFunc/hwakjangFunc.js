const ryeongUtil = require('../../../../manseUtil/ryeong/ryeongUtil')
const manseTool = require('../../../../manseUtil/chunJiji/checkWord')
const basicUse = require('../../../../manseUtil/basicUse/basicUse')
const hwakjangUn = require('../../../../testResult/contents_pro_report/addition/01yongsinUn/hwakjangUn.json')

/**
 * 01.용신운 함수에서 세운이 확장운일때, 사용하는 함수이다.
 * @returns 
 */
  exports.hwakjangUn = () =>{
    let result={}

    if( basicUse.getBasicUse()==='basic'){
      // 기초분야
      result=hwakjangResult('basic')
    }
    else {
      // 활용분야
      result=hwakjangResult('uses')
    }
    return result;
  }
  function hwakjangResult (bu) {
    let result;
    // 빠른작업을 위해 useRyeong을 함수화 시킴
    // 객체들 리스트가 목록에 떠서 좀더 빠른작업 가능함
    const ryeong = ryeongUtil.ryeongCollection()
    if(manseTool.checkALL(ryeong.heuisin)){
      // 희신있음
      result=jisokHakjangCheck(bu,'HeuisinYes')
    }
    else {
      // 희신없음
      result=jisokHakjangCheck(bu,'HeuisinNo')
    }

    return result;
  }

  function jisokHakjangCheck (bu,hyn) {
    let result=
    {
      type:'',
      keyword:''
    };
    // 빠른작업을 위해 useRyeong을 함수화 시킴
    // 객체들 리스트가 목록에 떠서 좀더 빠른작업 가능함
    const ryeong = ryeongUtil.ryeongCollection()
    if(manseTool.checkALL(ryeong.jisok) &&
    manseTool.checkALL(ryeong.hwakjang)){
      // 지속도 있고 확장도 있다
      result.type='확장운'
      result.keyword=getResult(bu+hyn+'JisokHwakjang',hwakjangUn).contents
    }
    else if(manseTool.checkALL(ryeong.jisok) &&
    manseTool.checkALL(ryeong.hwakjang)){
      // 지속만 있다
      result.type='확장운'
      result.keyword=getResult(bu+hyn+'Jisok',hwakjangUn).contents
    }
    else if(manseTool.checkALL(ryeong.jisok) &&
    manseTool.checkALL(ryeong.hwakjang)){
      // 확장만 있다
      result.type='확장운'
      result.keyword=getResult(bu+hyn+'Hwakjang',hwakjangUn).contents
    }
    else {
      // 둘다없다
      result.type='확장운'
      result.keyword=getResult(bu+hyn+'NoJisokHwakjang',hwakjangUn).contents
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
