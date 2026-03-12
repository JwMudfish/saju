const keyword = require('../../../../testResult/contents_pro_report/addition/03.yuksinShgjUn/gil.json')
const shgjFunc = require('../../../../manseUtil/gungShgj/gungshgjUtil')
const manseTool = require('../../../../manseUtil/chunJiji/checkWord')
exports.gil = (unTypeWord) => {
    let result=''
    const shgj = shgjFunc.gungShgjCollection()
    if (manseTool.checkALL(shgj.sanghwa) === 'Y' &&
        manseTool.checkALL(shgj.sengHwa_zeHwa) === 'Y') {
            result=getResult(unTypeWord+'sengHwaYes_sengHwaZehwaYes',keyword).contents
    }
    else if (manseTool.checkALL(shgj.sanghwa) === 'Y' &&
        manseTool.checkALL(shgj.sengHwa_zeHwa) === 'N') {
            result=getResult(unTypeWord+'sengHwaYes_sengHwaZehwaNo',keyword).contents
    }
    else if (manseTool.checkALL(shgj.sanghwa) === 'N' &&
        manseTool.checkALL(shgj.sengHwa_zeHwa) === 'Y') {
            result=getResult(unTypeWord+'sengHwanNo_sengHwaZehwaYes',keyword).contents
    }
    else if (manseTool.checkALL(shgj.sanghwa) === 'N' &&
        manseTool.checkALL(shgj.sengHwa_zeHwa) === 'N') {
            result=getResult(unTypeWord+'sengHwanNo_sengHwaZehwaNo',keyword).contents
    }

    return result;
}

exports.gilGyouk = (unTypeWord) => {
    let result;
    const shgj = shgjFunc.gungShgjCollection()
    if (manseTool.checkALL(shgj.sulhwa) === 'Y') {
        result=getResult(unTypeWord+'sulHwaYes',keyword).contents
    }
    else if (manseTool.checkALL(shgj.sulhwa) === 'N') {
        result=getResult(unTypeWord+'sulHwaNo',keyword).contents
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