exports.gun = () => {
    let result;
    if (useBasicFunc.rootTong.totalRoot === 'king_root' || useBasicFunc.rootTong.totalRoot === 'pure_root') {
        result = '근왕'
    } else {
        result = '근약'
    }
    return result;
}