const sangGuankeyword = require('../../../../testResult/contents_pro_report/addition/03.yuksinShgjUn/sangGuanGyouk.json')
const pyeonGuankeyword = require('../../../../testResult/contents_pro_report/addition/03.yuksinShgjUn/pyeonGuanGyouk.json')
const gunlokYanginkeyword = require('../../../../testResult/contents_pro_report/addition/03.yuksinShgjUn/gunlokYangin.json')
const shgjFunc = require('../../../../manseUtil/gungShgj/gungshgjUtil')
const manseTool = require('../../../../manseUtil/chunJiji/checkWord')
const manseToolYuksin = require('../../../../manseUtil/chunJiji/checkYuksin')
const gun = require('../../../../manseUtil/gun')
exports.sangGuan = (unType) => {
    let result = {
        type:'',
        keyword:''
      };
    if (unType === '정인' ||
        unType == '편인') {
            result.type='인성운'
        result.keyword = onlySangsin('sangGuan_inSungUn_',sangGuankeyword)
    }
    else if (unType === '비견' ||
        unType == '겁재') {
            result.type='비겁운'
            result.keyword  = gunSangsin('sangGuan_bigubUn_',sangGuankeyword)
    } else if (unType === '식신' ||
        unType == '상관') {
            result.type='식상운'
            result.keyword  = onlySangsin('sangGuan_siksangUn_',sangGuankeyword)
    } else if (unType === '정재' ||
        unType == '편재') {
            result.type='재성운'
            result.keyword = getResult('sangGuan_jeSungUn',sangGuankeyword).contents
    } else if (unType === '정관' ||
        unType == '편관') {
            result.type='관성운'
            result.keyword = getResult('sangGuan_guanSungUn',sangGuankeyword).contents
    }

    return result;
}

exports.pyeonGuan = (unType) => {
    let result = {
        type:'',
        keyword:''
      };
    if (unType === '식신' ||
        unType == '상관') {
            result.type='식상운'
            result.keyword  = onlySangsin('pyeonGuan_siksangUn_',pyeonGuankeyword)
    }
    else if (unType === '정재' ||
        unType == '편재') {
            result.type='재성운'
            result.keyword  = gunSangsin('pyeonGuan_jeSungUn_',pyeonGuankeyword)
    } else if (unType === '정관' ||
        unType == '편관') {
            result.type='관성운'
            result.keyword  = onlySangsin('pyeonGuan_guanSungUn_',pyeonGuankeyword)
    } else if (unType === '정인' ||
        unType == '편인') {
            result.type='인성운'
            result.keyword = getResult('pyeonGuan_inSungUn',pyeonGuankeyword).contents
    } else if (unType === '비견' ||
        unType == '겁재') {
            result.type='비겁운'
            result.keyword = getResult('pyeonGuan_bigubUn',pyeonGuankeyword).contents
    }

    return result;
}

exports.gunlokYangIn = (unType) => {
    let result = {
        type:'',
        keyword:''
      };
    if (unType === '정관' ||
        unType == '편관') {
            result.type='관성운'
            result.keyword  = onlyBiGub('gunlokYangin_guanSungUn_',gunlokYanginkeyword)
    }
    else if (unType === '비견' ||
        unType == '겁재') {
            result.type='비겁운'
            result.keyword  = onlyBiGub('gunlokYangin_bigubUn_',gunlokYanginkeyword)
    } else if (unType === '정인' ||
        unType == '편인') {
            result.type='인성격'
            result.keyword  = onlyGun('gunlokYangin_inSungUn_',gunlokYanginkeyword)
    } else if (unType === '정재' ||
        unType == '편재') {
            result.type='재성운'
            result.keyword  = onlyBiGub('gunlokYangin_jeSungUn_',gunlokYanginkeyword)
    } else if (unType === '식신' ||
        unType == '상관') {
            result.type='식상운'
            result.keyword = getResult('gunlokYangin_siksangUn',gunlokYanginkeyword).contents
    }

    return result;
}

const onlyGun = (word,keyword) => {
    let result;
    if (gun.gun() === '근약') {
        result= getResult(word+'gunWak',keyword).contents
    }
    else if (gun.gun() === '근왕') {
        result= getResult(word+'gunWang',keyword).contents
    }
    return result;
}

const onlyBiGub = (word,keyword) => {
    let result;
    if (manseToolYuksin.checkChunGan('비견') === 'Y' ||
        manseToolYuksin.checkChunGan('겁재') === 'Y') {
            result= getResult(word+'bigubYes',keyword).contents
    }
    else {
        result= getResult(word+'bigubNo',keyword).contents
    }
    return result;
}

const gunSangsin = (word,keyword) => {
    let result = {}
    const shgj = shgjFunc.gungShgjCollection()
    if (manseTool.checkALL(shgj.sangsin) === 'Y' &&
        gun.gun() === '근약') {
            result= getResult(word+'sangsinYes_gunWak',keyword).contents
    }
    else if (manseTool.checkALL(shgj.sangsin) === 'Y' &&
        gun.gun() === '근왕') {
            result= getResult(word+'sangsinYes_gunWang',keyword).contents
    }
    else if (manseTool.checkALL(shgj.sangsin) === 'N' &&
        gun.gun() === '근약') {
            result= getResult(word+'sangsinNo_gunWak',keyword).contents
    }
    else if (manseTool.checkALL(shgj.sangsin) === 'N' &&
        gun.gun() === '근왕') {
            result= getResult(word+'sangsinNo_gunWang',keyword).contents
    }
    return result;
}

const onlySangsin = (word,keyword) => {
    let result = {}
    const shgj = shgjFunc.gungShgjCollection()
    if (manseTool.checkALL(shgj.sangsin) === 'Y') {
        result= getResult(word+'sangsinYes',keyword).contents
    }
    else {
        result= getResult(word+'sangsinNo',keyword).contents
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