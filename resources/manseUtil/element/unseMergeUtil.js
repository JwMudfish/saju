exports.ryeongKind = (kind) => {
    let result;
    if(kind==='yongsin'||kind==='um_gisin'){
        result='용신운'
    }
    else if(kind==='heuisin'||kind==='um_heuisin_gisin'){
        result='희신운'
    }
    else if(kind==='junghwa'||kind==='junghwa_gisin'){
        result='중화운'
    }
    else if(kind==='jisok'||kind==='jisok_gisin'){
        result='지속운'
    }
    else if(kind==='hwakjang'||kind==='hwakjang_gisin'){
        result='확장운'
    }
    return result
}

exports.yuksinKind = (kind) => {
    let result;
    if(kind==='비견'||kind==='겁재'){
        result='비겁운'
    }
    else if(kind==='식신'||kind==='상관'){
        result='식상운'
    }
    else if(kind==='정인'||kind==='편인'){
        result='인성운'
    }
    else if(kind==='정관'||kind==='편관'){
        result='관성운'
    }
    else if(kind==='정재'||kind==='편재'){
        result='재성운'
    }
    return result
}

exports.gungShgjKind = (kind) => {
    let result;
    if(kind==='sanghwa'){
        result='생화운'
    }
    else if(kind==='sengHwa_zeHwa'){
        result='생화제화운'
    }
    else if(kind==='sulhwa'){
        result='설화운'
    }
    else if(kind==='sulHwa_zeHwa'){
        result='설화제화운'
    }
    else if(kind==='gyouk'){
        result='격운'
    }
    return result
}

exports.gungKind = (kind) => {
    let result;
    if(kind==='sangsin'){
        result='상신운'
    }
    else if(kind==='sangsingisin'){
        result='상신기신운'
    }
    else if(kind==='gusin'){
        result='구신운'
    }
    else if(kind==='gusingisin'){
        result='구신기신운'
    }
    else if(kind==='gukgisin'){
        result='격기신운'
    }   
    else if(kind==='gyouk'){
        result='격운'
    }
    return result
}