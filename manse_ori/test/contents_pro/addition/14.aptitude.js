var Sangsin = {};
const contents_attitude = require('../../../testResult/contents_pro_report/addition/14.aptitude/contents_aptitude.json')

/**
 * wangYak ===Y 면 근왕 아니면 아니면 근약
 * keyword는  키워드를 의미하는것이다
 * @returns 
 */
Sangsin.randum = function () {
  let result = self();
  return result;
};

const self = () => {
  let result={
    title:'',
    titleContents:'',
    subtitle:'',
    subtitleContents:''
  }
  
  let yongsinTitle = new Map()
  yongsinTitle.set("계", "gyesu")
  yongsinTitle.set("갑", "gapmok")
  yongsinTitle.set("을", "ulmok")
  yongsinTitle.set("병", "byeonghwa")
  yongsinTitle.set("정", "jeonghwa")
  yongsinTitle.set("경", "gyounggum")
  yongsinTitle.set("신", "singum")
  yongsinTitle.set("임", "limsu")
  
  let sub = new Map()
  sub.set("계", "humanBasic")
  sub.set("갑", "humanBasic")
  sub.set("을", "humanUse")
  sub.set("병", "humanUse")
  sub.set("정", "industryBasic")
  sub.set("경", "industryBasic")
  sub.set("신", "industryUses")
  sub.set("임", "industryUses")
  
  let title = yongsinTitle.get(useRyeong.yongsin)
  let subtitle = sub.get(useRyeong.yongsin)
  result.title = getResult(title,contents_attitude).subtitle
  result.titleContents = getResult(title,contents_attitude).contents
  result.subtitle = getResult(subtitle,contents_attitude).subtitle
  result.subtitleContents = getResult(subtitle,contents_attitude).contents
  return result;
};

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
module.exports = Sangsin;
