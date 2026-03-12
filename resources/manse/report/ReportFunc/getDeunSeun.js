const korToKan = require('../../../manseUtil/korToHan')

exports.getPillarKan = () => {
    let dsun = {
        deun: {
            dus: deunsu(),
            deun: useDeunSeun.deun,
            deunYuksin: useDeunSeun.deunYuksin,
            deunOhang: useDeunSeun.deunOhang,
        },
        // seun: walun,
        seun:  useDeunSeun.seun, 
    };
    let front = ''
    let back = ''
    for (let key in dsun.deun.deun) {
        front = dsun.deun.deun[key].substring(0, 1)
        back = dsun.deun.deun[key].substring(1, 2)
        dsun.deun.deun[key] = korToKan.changeChunGan(front) + korToKan.changeJIJI(back)
        // 대운 음양오행
        let splitOne = korToKan.changeOhang(dsun.deun.deunOhang[key][0]).split(' ')
        let splitTwo = korToKan.changeOhang(dsun.deun.deunOhang[key][1]).split(' ')
        dsun.deun.deunOhang[key][0] = splitOne[0]
        dsun.deun.deunOhang[key][1] = splitTwo[0]
    }
    for (let key in dsun.seun) {
        for (let key2 in dsun.seun[key]) {
            for (let key3 in dsun.seun[key][key2]) {
                if (key3 === 'word') {
                    front = dsun.seun[key][key2][key3].substring(0, 1)
                    back = dsun.seun[key][key2][key3].substring(1, 2)
                    dsun.seun[key][key2][key3] = korToKan.changeChunGan(front) + korToKan.changeJIJI(back)
                } else if (key3 === 'ohang') {
                    // 세운 오행 수정
                    for (let key4 in dsun.seun[key][key2][key3]) {
                        let splitClass = korToKan.changeOhang(dsun.seun[key][key2][key3][key4]).split(' ')
                        dsun.seun[key][key2][key3][key4] = splitClass[0]
                    }
                } else if (key3 === 'walUn') {
                    // 월운 설정
                    for (let key4 in dsun.seun[key][key2][key3]) {
                        for (let key5 in dsun.seun[key][key2][key3][key4]) {
                            if (key5 === 'word') {
                                // 월운 한자->한글 변경
                                front = dsun.seun[key][key2][key3][key4][key5].substring(0, 1)
                                back = dsun.seun[key][key2][key3][key4][key5].substring(1, 2)
                                dsun.seun[key][key2][key3][key4][key5] = korToKan.changeChunGan(front) + korToKan.changeJIJI(back)
                            } else if (key5 === 'ohang') {
                                // 월운 한자->한글 변경
                                for (let key6 in dsun.seun[key][key2][key3][key4][key5]) {
                                    // 월운 오행 수정
                                    let splitClassWol = korToKan.changeOhang(dsun.seun[key][key2][key3][key4][key5][key6]).split(' ')
                                    dsun.seun[key][key2][key3][key4][key5][key6] = splitClassWol[0]
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return dsun
}

function deunsu() {
    let result;
    result = {
      one: 0 + Number(useDeunSeun.dus),
      two: 10 + Number(useDeunSeun.dus),
      three: 20 + Number(useDeunSeun.dus),
      four: 30 + Number(useDeunSeun.dus),
      five: 40 + Number(useDeunSeun.dus),
      six: 50 + Number(useDeunSeun.dus),
      seven: 60 + Number(useDeunSeun.dus),
      eight: 70 + Number(useDeunSeun.dus),
      nine: 80 + Number(useDeunSeun.dus),
      ten: 90 + Number(useDeunSeun.dus),
    };
    return result;
  }
