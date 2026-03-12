const chungan = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계']


class ManseUtils {
    constructor(array) {
        this.array = array;
    }
    /**
     * 배열값을 받고 그 배열값에 단어가 있는지 확인한다
     * @param {string} word 체크할 단어
     * @returns {boolean} 성공 여부
     */
    static findSangsinWord(word) {
        let result = false;
        for (let i = 0; i < this.array.length; i++) {
            if (word === this.array[i]) {
                result = true;
                break
            }
        }
        return result
    }
}