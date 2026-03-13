const ryeongUtil = require('../../../../manseUtil/ryeong/ryeongUtil')
const manseTool = require('../../../../manseUtil/chunJiji/checkWord')
const basicUse = require('../../../../manseUtil/basicUse/basicUse')
const heuisinUn = require('../../../../testResult/contents_pro_report/addition/01yongsinUn/heuisinUn.json')
const junghwaUn = require('../../../../testResult/contents_pro_report/addition/01yongsinUn/junghwaUn.json')


/**
 * 01.용신운 함수에서 세운이 중화운일때, 사용하는 함수이다.
 * @returns 
 */
exports.junghwaUn = () =>{
    let result={}
    // 빠른작업을 위해 useRyeong을 함수화 시킴
    // 객체들 리스트가 목록에 떠서 좀더 빠른작업 가능함
    const ryeong = ryeongUtil.ryeongCollection()
    if(manseTool.checkALL(ryeong.heuisin)==='Y'){
        // 희신이 있음
        result=junghwaUnYongsin('heuisinYes')
    }
    else {
        // 희신이 없음
        result=junghwaUnYongsin('heuisinNo')
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

const junghwaUnYongsin = (yn) =>{
    let result={
        type:'',
        keyword:''
    }
    if(useRyeong.yongsin==='경'){
        //경금용신
        result.type='중화운'
        result.keyword=getResult(yn+'Gyeong',junghwaUn).contents
    }
    else if(useRyeong.yongsin==='정'){
        // 정화용신
        result.type='중화운'
        result.keyword=getResult(yn+'Jung',junghwaUn).contents
    }
    else if(useRyeong.yongsin==='계'||
    useRyeong.yongsin==='갑'){
        // 계갑용신
        result.type='중화운'
        result.keyword=getResult(yn+'GyeGap',junghwaUn).contents
    }
    else if(useRyeong.yongsin==='을'||
    useRyeong.yongsin==='병'){
        // 을병용신
        result.type='중화운'
        result.keyword=getResult(yn+'UlByeong',junghwaUn).contents
    }
    else if(useRyeong.yongsin==='신'||
    useRyeong.yongsin==='임'){
        // 신임용신
        result.type='중화운'
        result.keyword=getResult(yn+'SinLi',junghwaUn).contents
    }
    return result
}