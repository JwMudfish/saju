
/**
 * 기초인지 활용인지 알려주는 함수이다.
 * @returns 기초면 basic, 활용이면 uses
 */
exports.getBasicUse = () => {
    let result = ""
    if (useRyeong.yongsin === "계" ||
      useRyeong.yongsin === "갑" ||
      useRyeong.yongsin === "정" ||
      useRyeong.yongsin === "경") {
      result = "basic"
    }
    else if (useRyeong.yongsin === "을" ||
      useRyeong.yongsin === "병" ||
      useRyeong.yongsin === "신" ||
      useRyeong.yongsin === "임") {
      result = "uses"
    }
    return result;
  }
  