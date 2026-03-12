const korToKan = require('../../manseUtil/korToHan')
const pdfFunc = require('./ReportFunc/pdfReportFunc')
var moment = require("moment");
/**
 * cover: 표지
 * cover: 상단위에 있는 정의방어형 전략가 이거 키워드
 * myPalJa: 나의 사주팔자
 * knowSajubaju: 사주바주로 알 수 있는거
 * lifeSaju: 생활속 사주풀이
 * myKeyword: 나만의 키워드
 * aptitude: 나의 재능클래스
 * aptitudeField: 나의 적성분야
 * findYongsin: 나의 용신찾기
 * talent: 나의 선천적인 재능
 * interest: 나의 관심사
 * realization: 나의 현실 구현력
 * efficiency: 나의 능률
 * humanResources: 인재유형
 * howToUse: 나 사용 설명서
 * myCard: 나의 명함
 * mySuccessPossible: 나의 성공 가능성
 * jobCopyRight: 나의 직업과 소득형태
 * moneyLuck: 나의 금전운
 * myAttitude: 나의 태도
 * myRomantic: 나의 연애운
 * 
 */
exports.interface = () => {
  const interest= pdfFunc.interest()
  const humanResources= pdfFunc.humanResources()
  const efficiency= pdfFunc.efficiency()
  const realization= pdfFunc.realization()
  const aptitude= pdfFunc.aptitude()
  const talent= pdfFunc.talent()
    myManseInterF={
        cover_birthday: myManse.info.year+'.'+myManse.info.month+'.'+myManse.info.day+' '+checkHour(),
        cover_gender: changeGender(),
        cover_analysis_date:  moment().format("YYYY.MM.DD"),
        myTitle:pdfFunc.getTitleYongsinGyouk(),
        myPalJa_pillar:changePillar(),
        myPalJa_startWord:'본 레포트는 사주 명리학을 기반으로 분석되었습니다. 사주 명리학은 자신의 타고남과 살아가면서 마주치는 기회와 위기를 어떻게 활용하는지 연구한 학문입니다. 레포트를 통해 자신에게 다가올 운명을 미리 준비하세요.\n레포트에 사용된 명리학 분석 알고리즘은 이 시대 최고의 명리학자로 불리우는 창광 김성태의 30년 이론과 노하우가 집약된 프로그램입니다. 구시대적인 표현과 풍습을 현시대에 맞게 재해석하고 현대 산업과 사회상을 대입하여, 누구나 자신의 직업, 대인관계 등에 활용 가능하도록 재해석했습니다.',
        knowSajubaju_standard:'사주 명리학에서 가장 중요한 기준은 [태어난 월]입니다. 태어난 월에는 태어난 당시의 온도와 습도 그리고 그런 환경 속에서 적응하고 생존해가는 인간의 모습이 담겨져 있습니다. 추운 날씨에 태어나 먹을 것이 부족하여 부지런해지는 것처럼 환경의 영향에 따라 인간은 성향과 재능이 정해집니다. 본 레포트에서는 자신을 이해하고 앞으로 생길 기회와 위기를 활용하기 위해 자신의 타고남을 알아갑니다.',
        knowSajubaju_yongsin:'인간이 가진 여러 재능 중 가장 쓸모 있는 재능을 의미합니다. 내가 태어난 환경 (온도, 습도, 사회)에 적응하며 생겨난 자연스러운 재능입니다. 누구나 1개 이상의 재능이 있으며, 용신을 직업으로 삼는 경우 남들보다 좋은 성과를 내기도 합니다. 머리가 좋고 나쁨, 실제로 일처리를 잘하는지, 급여가 높아 질 수 있는지를 결정하는 요소입니다.',
        knowSajubaju_gyouk:'자신에게 주어진 역할입니다. 사람은 누구나 타고난 역할이 있습니다. 가정에서는 부모, 자식의 역할이 있고 직장에서는 팀장 등 다양한 역할이 주어집니다. 격국은 이러한 역할 중 자신에게 제일 잘 어울리고 자연스럽게 적응되어진 역할을 의미합니다. 또한 자신의 성장 가능성과 말투, 행동을 결정하는 중요한 요소입니다.',
        knowSajubaju_ilgan:'내가 무엇을 선택할지 알기 위해 필요한 요소입니다. 일간에는 내가 단체생활을 좋아하는지, 개인 생활을 좋아하는지 나타나있습니다. 또한 운세가 왔을 때 운명을 수용할지, 거부할지 역시 일간에 의해 선택됩니다. 용신과 격국의 분석으로 나를 이해했다면, 일간을 통해 내가 나아갈 방향을 찾아야 합니다. ',
        knowSajubaju_circumstances:'가장 우선 환경을 살펴봅니다. 사주 명리학에서 환경이란, 내가 성장하고 살아온 환경을 의미합니다. 주로 [태어난 년]과 [태어난 월]을 통해 알 수 있습니다. 사람은 환경에 영향을 받고 적응해가며 살아갑니다. 사주 명리학에서는 모든 사람이 환경에 따라 능력, 사회생활, 성향이 영향을 받아 정해지는 것으로 봅니다.  ',
        lifeSaju_standard:'사주 명리학은 과거시험에 급제하여 성공하고 싶은 사람들에 의해 개발된 학문입니다. 나를 알고 앞으로 다가올 운명을 활용하기 위함이죠. 나의 장,단점을 알았다면 운세를 통해 성장 계획을 설정하고 기회일 때는 공격적인 투자를 진행하고 위기 때는 피해가면 됩니다.',
        lifeSaju_destiny:'사람은 혼자서 모든 것을 할 수 없습니다. 사회 속에서 자신의 일을 수행하고 서로 부족한 점을 채우며 상부상조합니다. 사주 속 자신의 단점을 찾았다면, 이것을 채워줄 인연을 찾아 서로 채워주면 됩니다. 남녀 관계 역시 서로 다른 사람이 만나 하나의 커플, 가족을 이루 듯 서로 끌리는 사람이 있습니다.',
        lifeSaju_job:'타고난 능력인 용신과 역할인 격국을 통해 자신의 직업을 찾습니다. 용신의 재능으로 적은 노력으로 남들보다 뛰어날 수 있는 능력을 중심으로 분야를 정하고 격국의 역할에서 어떻게 일해야 하는지 방법과 성공 가능성을 유추합니다. 일간으로는 조직, 개인적으로 활동할지와 인내심 있게 직업 능력을 키울지에 대해서 분석합니다.',
        lifeSaju_riches:'사주팔자 속 재물은 직업과 연관이 많습니다. 노동으로 수익을 만드는지, 사업, 투자 등 재물을 습득하는 방법을 알아보고 경쟁에서 이길 수 있는 가능성을 보고 재물의 규모를 추측합니다. 이렇게 추측된 재물의 규모는 운세에 따라 성장, 손실, 유지 등으로 실체화 되어갑니다.',
        lifeSaju_unse:'사람은 누구나 운세를 공평하게 받습니다. 공평하게 주어진 운세를 내것으로 만들어 활용할지, 아니면 다른 것에 신경 쓰다 운세를 놓칠지는 개인의 선택에 따라 달라집니다. 레포트에서는 운세가 들어오는 시점과 계획을 짜기 쉽게 도표를 제공해드립니다. 운세를 직접 설계하고 활용하여 기회를 놓치지 마세요.',
        myKeyword_circumstancesKeyword:'환경키워드',
        myKeyword_gyoukKeyword:'격키워드',
        myKeyword_ilganKeyword:'일간키워드',
        myKeyword_yongsinKeyword:'용신키워드',
        myKeyword_circumstances:'나의 키워드중 환경에관한 글을 쓸꺼예요 글이들어가요',
        myKeyword_gyouk:'나의 키워드중 격에관한 글을 쓸꺼예요 글이들어가요',
        myKeyword_ilgan:'나의 키워드중 일간에관한 글을 쓸꺼예요 글이들어가요',
        myKeyword_yongsin:'나의 키워드중 용신에관한 글을 쓸꺼예요 글이들어가요',
        aptitude_imageName:pdfFunc.aptitude_title(),
        aptitude_title: pdfFunc.getYongsinTitle(),
        aptitude_myYongsin:aptitude.myYongsin,
        aptitude_converseYongsin:aptitude.inverseYongsin,
        aptitude_yongsinExplan:aptitude.yongsinExplan,
        // 나의 적성분야 타입
        aptitudeField_type:pdfFunc.aptitudeField(),
        // 나의 적성분야 용신
        aptitudeField_yongsin:useRyeong.yongsin,
        // 나의 적성분야 인문글
        aptitudeField_humanities:'무형의 가치와 언어를 구사하는 능력이 뛰어납니다. 특히 사람과 사람의 관계, 문화에 대한 관심이 높습니다. 사람을 대상으로 서비스를 하거나 이끄는 것에 특화되어 있습니다.',
        // 나의 적성분야 인문기초
        aptitudeField_humanities_basic:'자신의 생각을 글과 언어로 표현하는 재능이 뛰어납니다. 활용보다는 근원에 관심을 가집니다.',
        // 나의 적성분야 인문활용
        aptitudeField_humanities_uses:'사람들과 잘 어울리며, 상대가 필요한 것을 쉽게 파악합니다. 쓰임이 없는 행동을 좋아하지 않습니다.',
        // 나의 적성분야 산업글
        aptitudeField_industry:'유형의 가치와 상품의 가치를 높이는 능력이 뛰어납니다. 특히 아이디어를 구현하는 능력 높고 말보다는 행동으로 보여줍니다. 실용적이고 불필요한 것을 좋아하지 않습니다.',
        // 나의 적성분야 산업기초
        aptitudeField_industry_basic:'아이디어를 구현하는 재능이 뛰어납니다. 자신이 관심 있는 분야에 대해서는 쉽게 포기하지 않고 꾸준하게 배웁니다. ',
        // 나의 적성분야 산업활용
        aptitudeField_industry_uses:'가치가 있는 것을 알아보는 재능이 있습니다. 사소한 불편함이라도 해결해, 실용적으로 만들어 냅니다.',
       // 나의 용신찾기 용신
       findYongsin_yongsin:useRyeong.yongsin,
       // 나의 용신찾기 계수글
       findYongsin_gyesu:'인문 기초 분야에서 사상과 아이디어를 이끌어 냅니다. 이 단계에서는 아직 구체적인 것은 없습니다. 필요한 것이 무엇인지, 어떻게 해야 할지 고민하는 시기입니다. 기획을 통해 앞으로 할 일을 계획합니다',
       // 나의 용신찾기 갑목글
       findYongsin_gapmok:'인문 기초 분야에서 고민을 정리하고 표현합니다. 추상적인 고민을 글과 설계도로 표현하며, 다른 사람에게 공유합니다. 모르는 사람이 있으면 알려주고 계획을 만들어 주기도 합니다. 일단 행동해야 합니다',
       // 나의 용신찾기 을목글
       findYongsin_ulmok:'인문 활용 분야에서 단점을 찾고 수정 보완합니다. 아직은 추상적이고 계획만 무성했던 것들이 실체로 들어나고 부족한 점이 드러납니다. 단점을 보완하고 체계를 잡아 사회에 필요한 제도, 법, 시스템을 구축합니다.',
       // 나의 용신찾기 병화글
       findYongsin_byeonghwa:'인문 활용 분야에서 사회가 잘 움직이도록 돕는 일을 합니다. 정해진 규칙과 인프라를 활용하여 사람들이 편하게 살아가도록 도와줍니다. 여러 사람을 다루는 운영자와 같고 항상 사람들과 같이 일해야 하는 어려움이 있습니다.  ',
       // 나의 용신찾기 정화글
       findYongsin_junghwa:'산업 기초 분야에서 산업에 필요한 경제성, 기술력을 확보합니다. 기술이 좋다고 돈이 되는 것이 아니기에 경제성까지 검토합니다. 관심 있는 분야에만 집중하는 것이 아닌 세상에 필요하고 수익이 나오는 분야에 집중하는 것이 좋습니다.',
       // 나의 용신찾기 경금글
       findYongsin_gyeonggum:'산업 기초 분야에서 군더더기를 빼고 실용성만 남겨 완성도를 높이는 일을 합니다. 불필요한 요소는 단호하게 내치고 필요한 부분은 선택과 집중하여 가치를 높입니다. 누구보다도 완벽한 능력을 가지기 위해서는 반복만이 답입니다.  ',
       // 나의 용신찾기 신금글
       findYongsin_singum:'산업 활용 분야에서 기존의 제품에 가치를 더 하는 일을 합니다. 제품의 장, 단점을 찾아 단점을 보완하고 장점을 더욱 높여줍니다. 이 과정을 거쳐야 사람들이 찾는 상품으로 거듭납니다.',
       // 나의 용신찾기 임수글
       findYongsin_limsu:'산업 활용 분야에서 가치 있는 상품을 필요로 하는 고객을 찾는 일을 합니다. 아무리 가치가 있어도 필요로 하는 사람을 만나지 못하면, 가치가 살아나지 않습니다. 누가 무엇을 필요로하는지 찾아내고 상품을 전달해줍니다.',
        //주요능력
        talent_mainSkill: pdfFunc.getSkillImageName(useRyeong.yongsin),
        // 주요능력_스킬이름
        talent_mainSkillName: pdfFunc.getSkillTitle().main,
        //보조능력1
        talent_subSkill:pdfFunc.getSkillImageName(useRyeong.yongsin + "_" + hisinYN()),
        //보조능력1_스킬이름
        talent_subSkillName: pdfFunc.getSkillTitle().sub,
        // 재능에 포커싱
        // talent_yongsinExplan: "인간의 본질에 대한 탐구로 도덕, 기초 철학, 윤리에 관심이 많습니다. 이런 성향이 직업으로 발전되어 유치원, 초등부 교사가 되기도 하며, 현대에는 실버 사업인 요양보호사로 진출하기도 합니다. 물음표 살인마처럼 끊임없이 질문을 던지는 성행으로 연구, 기획도 적합 합니다. 중요한 것은 자신의 생각, 계획을 끄집어내 아이디어로 만드는 재능이 탁월합니다. 고민의 시간이 길어 질수록 더 좋은 아이디어가 나오고 생각이 정리됩니다.",
        talent_yongsinExplan: talent.main,
        // 희신유무 해설
        // talent_hisinExplan: "그러나 팔자 내에 희신인 갑목(甲木)이 없으므로, 아이디어는 있지만 이것을 표현하고 설명하는 재능이 부족합니다. 셀 수 없는 생각은 머릿속에 맴돌고 있지만, 정리가 되지 않아 자신의 생각을 쫒아가기도 바쁩니다. 가끔 생각에 빠져 현실과 분리되지 않을 때가 많습니다. 이럴 때는 혼자 모든 것을 다하기보다 역할 분담을 통해 같이 일하는 것이 좋습니다.",
        talent_hisinExplan: talent.hisin,
        // 희신이 있을때 장단점
        // talent_hisinYes: "혼자 다 할 필요가 없다\n분야가 정해지지 않아 여러 가지를 할 수 있다\n다양성 있다\n주변에 능력자가 있다\n행복을 추구하려 한다\n사회적으로 정해진 진로보다 자신이 하고 싶은걸 한다",
        talent_hisinYes: pdfFunc.getHisinGoodBad().good,
        // 희신이 있을때 장단점
        // talent_hisinNo: "부모의 말을 안 듣는다\n진로에 대한 방황이 있다\n특출난 재능이 생기지 않는다\n집중도가 낮다\n얕고 넓은 바다의 재능\n주변 사람을 챙겨야 한다",
        talent_hisinNo: pdfFunc.getHisinGoodBad().bad,
        // 용신
        interest_yongsin:pdfFunc.getSkillImageName(useRyeong.yongsin),
        // 용신 이름
        interest_yongsinName: pdfFunc.getSkillTitle().main,
        // 희신
        interest_hisin: pdfFunc.getSkillImageName(useRyeong.yongsin + "_" + hisinYN()),
        // 희신 이름
        interest_hisinName: pdfFunc.getSkillTitle().sub,
         // 음양희신기신
         interest_um_heuisin_gisin:pdfFunc.getSkillImageNameGisin(useRyeong.um_heuisin_gisin),
         // 음양희신기신 이름
         interest_um_heuisin_gisinName: pdfFunc.getSkillTitleGisin(useRyeong.um_heuisin_gisin.word),
         // 음양희신기신 설명
         // interest_um_heuisin_gisinSentence: '자신의 부족함을 채우기 위해 공부나 훈련이 아닌 기존의 것을 가지고 활용, 응용하는 것을 추구합니다. 어찌보면 깊이가 얕고 사람들이 혹할만한 것을 잘 다룹니다. 개그맨처럼 정통 연기보다 사람들이 많이 찾는 유머를 더하는 것과 같습니다. ',
         interest_um_heuisin_gisinSentence: interest.um_heuisin_gisin,
         // 상극희신기신
         interest_geuk_heuisin_gisin:pdfFunc.getSkillImageNameGisin(useRyeong.geuk_heuisin_gisin),
         // 상극희신기신 이름
         interest_geuk_heuisin_gisinName: pdfFunc.getSkillTitleGisin(useRyeong.geuk_heuisin_gisin.word),
         // 상극희신기신 설명
         // interest_geuk_heuisin_gisinSentence: '열심히 땀 흘려 일하는 사람에게 휴식을 제공하는 역할에 적합니다. 독서실에서 열심히 공부한 학생을 위해 당구장, PC방을 운영합니다. 생각이 정리가 안 되는 사람을 위해 심리 상담 같이 상대의 생각에 공감하고 치유하는 일에도 적합 합니다.',
         interest_geuk_heuisin_gisinSentence: interest.geuk_heuisin_gisin,
         // 음양기신
         interest_um_gisin:pdfFunc.getSkillImageNameGisin(useRyeong.um_gisin),
         // 음양기신 이름
         interest_um_gisinName: pdfFunc.getSkillTitleGisin(useRyeong.um_gisin.word),
         // 음양기신 설명
         // interest_um_gisinSentence:  '창의적인 생각보다 이미 검증된 기성세대의 아이디어나 안정적인 것을 가져다 씁니다. 책상에 앉아 고민하기보다 견문을 넓혀 세상을 바라보는 것이 많은 도움이 됩니다. 경험을 통해 머릿속의 추상적인 생각을 실용적이고 쓸모 있게 만드는 역할을 합니다.',
         interest_um_gisinSentence: interest.um_gisin,
         // 상극기신
         interest_geuk_gisin:pdfFunc.getSkillImageNameGisin(useRyeong.geuk_gisin),
         // 상극기신 이름
         interest_geuk_gisinName: pdfFunc.getSkillTitleGisin(useRyeong.geuk_gisin.word),
         // 상극기신 설명
         // interest_geuk_gisinSentence: '생각과 예술적인 감각을 말이나 글보다 행동으로 표현합니다. 그림, 음악, 행위 예술로 표현하는 예술가가 이에 해당합니다. 아니면 자신의 생각을 수학적, 도식화하여 표현하기도 합니다. 문과 이과의 모든 성향을 가진 통섭형 인물입니다.',
        interest_geuk_gisinSentence: interest.geuk_gisin,
         // 전문성 점수
        interest_professional: interest.professional,
         // 융합성 점수
         interest_fusion:  interest.fusion,
         // 중화 퍼센트
         realization_percent:realization.percent,
         // 중화 구현력 타이틀(현장경험인지 자기개발인지)
         realization_title:realization.contentsTitle,
         // 지속성 글자
         efficiency_jisok:korToKan.changeChunGan(useRyeong.jisok.word),
         // 지속성 사용여부
         efficiency_jisokYND:pdfFunc.checkYND(useRyeong.jisok),
         // 확장성 글자
         efficiency_hwakjang:korToKan.changeChunGan(useRyeong.hwakjang.word),
         // 확장성 사용여부
         efficiency_hwakjangYND:pdfFunc.checkYND(useRyeong.hwakjang),
         // 중화글
        realization_JunghwaSentence:realization.total,
        // realization_JunghwaSentence:'꾸준하게 한 가지를 지속하지 못합니다. 꾸준함은 남들보다 뛰어난 능력을 가지는 조건이며, 자신의 원천 소스를 갖추는 과정입니다. 그래서 전문가로 활동하기 어렵습니다. 남들보다 몸값이 높지 않고 경쟁력이 뛰어나다는 것을 보여주기 힘듭니다.',
         // 중화글 키워드
         realization_JunghwaKeyword:realization.keyword,
         // 지속성 확장성 타이틀
         efficiency_title : efficiency.title,
         // 지속성글
         efficiency_JisokSentence:efficiency.jisok,
         // efficiency_JisokSentence:'꾸준하게 한 가지를 지속하지 못합니다. 꾸준함은 남들보다 뛰어난 능력을 가지는 조건이며, 자신의 원천 소스를 갖추는 과정입니다. 그래서 전문가로 활동하기 어렵습니다. 남들보다 몸값이 높지 않고 경쟁력이 뛰어나다는 것을 보여주기 힘듭니다.',
         // 확장성글
         efficiency_hwakJangSentence:efficiency.hwakjang,
         // efficiency_hwakJangSentence:'남들 보기 부끄러워 끊임없는 발전을 꿈꿉니다. 우물 안 개구리가 아닌, 더 큰 세상에 나아가 많은 사람들과 교류하고 생각을 들어보는 것이 좋습니다. 나 자신만을 위한 것이 아닌 사회적인, 대중적인 요소를 갖추어야 자신의 재능을 인정받습니다.',
         // 종합 솔루션
         efficiency_totalSentence:efficiency.total,
         //efficiency_totalSentence:'능력의 발전성이 높습니다. 아무리 뛰어난 능력을 가지고 있어도 많은 사람들이 필요로 하지 않으면 묻히기 마련이지만 사람들의 요구를 쉽게 찾아내 자신을 성장시킵니다. 자신을 필요로 하는 사람이 누군지 정확하게 분석하고 목표를 가지고 자신의 성장 스케줄을 잡는 것이 좋습니다. 타겟이 분명할수록 효과가 큽니다.\n다만, 꾸준함이 부족하여 몸값이 높아지기 어려워 일거리가 단발성이거나 전국구로 퍼져나가기가 어렵습니다. 다른 사람보다 뛰어난 능력을 키우는데 집중하지 않고, 더 많은 경험과 고객을 연구하여 필요한 사람으로 성장하는 것이 좋습니다.',
         // 인재유형
         humanResources_my:humanResources.keyword,
         // 인재유형 ㅣ
        humanResources_l:'자신의 분야가 명확한 인재입니다. 집중도가 높고 여러 분야로 확장하기보다는 가장 관심 있고 잘하는 분야에 집중하고 싶어 합니다. 흔히 전문가라고 불리는 사람들이 가장 많이 속해 있는 분야로 자신의 분야에서 최고의 능력을 갖추는 인재상입니다. 몸값은 높지만 일을 직접해야 소득이 생기기 때문에 창업이나 경영자보다는 장인이나 전문가로 활동하는 것이 좋습니다.',
         // 인재유형 -
         humanResources_uu:'다양한 분야에 관심이 많아 할 줄 아는 것이 많은 인재입니다. 척하면 척! 모르는 것이 없습니다. 다만, 너무 많은 것을 알고 있다 보니 집중도가 떨어지고 전문성이 부족해 보일 수 있습니다. 한 가지 분야에 집중하여 능력을 키우기보다 다양한 경험을 통해 더 많은 기회를 접해보는 것이 좋습니다. ㅡ자형 인재는 세상의 견문을 넓히는 것에 집중하고 전문적인 일을 ㅣ자형 인재에게 시키면 됩니다.',
         // 인재유형 ㅜ
         humanResources_T:'전문성에 다양성이 더해진 인재입니다. 남들보다 뛰어난 전문 능력에 다른 분야까지 섭렵한 응용력이 뛰어납니다. 예를 들어 수술을 잘하는 의사가 있는데, 글 쓰는 재능도 뛰어나 의학 서적을 누구나 보기 쉽게 책으로 써내듯이, 자신의 활용도가 높습니다. 다만, 너무 재능이 뛰어나다 보니 혼자서 모든 일을 다 해야 될 수 있습니다. 우선 자신의 전문성을 키우고 후에 다양성을 키우는 것이 좋습니다.',
         // 인재유형 ㅠ
         humanResources_TT:'전문 분야가 여러 개인 인재 유형입니다. 의사가 의술뿐만 아니라 컴퓨터 프로그래밍에도 뛰어나 낮에는 의사로 밤에는 프로그래머로 활동하듯, 다양한 직업을 가질 수 있습니다. 두 개 이상의 재능을 가져서 집중도가 떨어질 것 같지만, 오히려 두 개의 재능을 얻기 위해 쉬지 않고 배우고 익힙니다. 남들 보다 더 많은 시간을 자기 계발에 투자해야 자신의 재능을 펼칩니다. 많은 ㅠ자형 인재가 버티지 못하고 ㅡ자형 인재로 변질 됩니다.',
         // 내가보는나
         /* howToUse_ISee:'내가보는나 일간별 키워드',
         // 내가보는나의 글
          howToUse_ISeeKeyword:'내가보는나에 관련된 글',
         // 남이보는 나
         howToUse_YouSee:pdfFunc.getGyoukKeyword(),
         // 남이보는나의 글
         howToUse_ISeeKeyword:'남이보는 나에 관련된 글',
         // 나의카드 이미지이름
         myCard_imageName:useGyouk,
         // 나의카드 격이름
         myCard_gyouk:useGyouk,
         // 나의카드 좋은키워드(소스는 있지만 일단 임시로 추가)
         myCard_goodKeyword:'#난너밖에없어 #나심비',
         // 나의카드 안좋은키워드(소스는 있지만 일단 임시로 추가)
         myCard_badKeyword:'#이기적이네 #이생망 #하이리스크',
         // 나의카드 개인키워드
         myCard_myAttitude:'나의카드 개인키워드 나의카드 개인키워드 나의카드 개인키워드 나의카드 개인키워드 나의카드 개인키워드',
         // 나의카드 동기부여
         myCard_motivation:'나의카드 동기부여 나의카드 동기부여 나의카드 동기부여 나의카드 동기부여 나의카드 동기부여 나의카드 동기부여',
         // 나의카드 동기부여
         myCard_motivation:'나의카드 동기부여 나의카드 동기부여 나의카드 동기부여 나의카드 동기부여 나의카드 동기부여 나의카드 동기부여',
         // 나의성공가능성
         mySuccessPossible_motivation:'나의카드 동기부여 나의카드 동기부여 나의카드 동기부여 나의카드 동기부여 나의카드 동기부여 나의카드 동기부여',
         // 조직/개인
         jobCopyRight_PG:'조직',
         // 직업
         jobCopyRight_job:['나중에 배열로 들어갈예정 '],
         // nJob
         jobCopyRight_njob:'Y',
         // 소득타입
         jobCopyRight_copyRightType:'근로소득',
         // 소득타입 키워드
         jobCopyRight_copyRightKeyword:'키워드 키워드 키워드 키워드 키워드',

         // 나의 소비습관
         moneyLuck_spendMind:'나의 소비습관 나의소비습관 나의소비습관',
         // 나의 연봉
         moneyLuck_salary:'나의 연봉 나의 연봉 나의 연봉 나의 연봉',
         // 나의 건물주
         moneyLuck_landlord:'나의 건물주 나의 건물주 나의 건물주 나의 건물주',
         // 나의 투자
         moneyLuck_investment:'나의 투자 나의 투자 나의 투자 나의 투자',
         // 나의 태도 신태왕/극신약
         myAttitude_taewang_sinyak:'극신약',
         // 나의 태도 조화
         myAttitude_johwa:'N',
         // 나의 태도 근왕/근약
         myAttitude_johwa:'없음',
         // 나의 태도 희용
         myAttitude_hiyong:'희',
         // 나의 철벽포인트
         myRomantic_ironwall : '나의 철벽 포인트 나의 철벽 포인트 나의 철벽 포인트 나의 철벽 포인트 ',
         // 나의 연애이상형(contents_ilgan_love)
         myRomantic_lovetype : '나의 연애이상형 나의 연애이상형 나의 연애이상형 나의 연애이상형',
         // 나의 이상형(contents_opponent_hearing)
         myRomantic_type : '나의 이상형 나의 이상형 나의 이상형 나의 이상형 나의 이상형',
         // 나의 차이는 이유(contents_broken)
         myRomantic_broken : '나의 차이는 이유 나의 차이는 이유 나의 차이는 이유 나의 차이는 이유 나의 차이는 이유',*/
        /* page_8_jisok:pdfFunc.jungHwaJisokHwakJang().jisok,
        page_8_hwakjang:pdfFunc.jungHwaJisokHwakJang().hwakjang,
        page_10_attitude:pdfFunc.getAttitude(),
        page_11_concept:pdfFunc.page11().concept,
        page_11_growthPotential:pdfFunc.page11().growthPotential,
        page_11_resultAblity:pdfFunc.page11().resultAblity,
        page_12_resultAblity:pdfFunc.page11(),
        page_12_resultAblity:pdfFunc.page11() */
    }
}
const changePillar = () => {
  let result;
  // 음양오행
  const umYangOHang = JSON.parse(JSON.stringify(myManse.umYangOHang));
  for (let key in umYangOHang) {
    for (let key2 in umYangOHang[key]) {
      if (key2 === 'oHang') {
        umYangOHang[key][key2] = korToKan.changeOhang(umYangOHang[key][key2])
      }
      if (key2.includes('_jangan')) {
        for (let key3 in umYangOHang[key][key2]) {
          if (key3 === 'oHang') {
            umYangOHang[key][key2][key3] = korToKan.changeOhang(umYangOHang[key][key2][key3])
          }
        }
      }
    }
  }
  const pillar = JSON.parse(JSON.stringify(usePillar));
  // 명식
  for (let key in pillar) {
    if (key.includes('land')) {
      pillar[key] = korToKan.changeJIJI(pillar[key])
    } else if (key.includes('sky')) {
      pillar[key] = korToKan.changeChunGan(pillar[key])
    } else {
      for (let key2 in pillar[key]) {
        pillar[key][key2] = korToKan.changeChunGan(pillar[key][key2])
      }
    }
  }
  result ={
      pillar:pillar,
      umYangOHang:umYangOHang,
      yukSin: myManse.yukSin,
  }
  return result
}
const checkHour = () => {
    let result=''
    if(usePillar.h_land===undefined || usePillar.h_land===''){

    }
    else {
      result=usePillar.h_land+'시'
    }

    return result;
}
const hisinYN = () => {
  let result = "N";

  if (useRyeong.heuisin.exist === "Y" &&
      useRyeong.heuisin.use.includes('y')) {
      result = "Y"
  }
  return result
}

const changeGender= () => {
  let result = '여'
  if(myManse.info.gender==='M'){
    result='남'
  }
  return result;
}



