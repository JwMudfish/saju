
 const proFunc = require('./ReportFunc/proReportFunc')
 const getDeunSeun = require('./ReportFunc/getDeunSeun')
 const korToKan = require('../../manseUtil/korToHan')
 const contents_yongsinGyouk = require('../../test/contents_pro/01.yongsinGyouk')
 const contents_gunWangWak = require('../../test/contents_pro/02gunWangWak')
 const contents_sinTaeWangGukSinWak= require('../../test/contents_pro/03sinTaeWangGukSinWak')
 const contents_competion = require('../../test/contents_pro/04competion')
 const contents_praticeMind = require('../../test/contents_pro/05practiceMind')
 const contents_endurableMind = require('../../test/contents_pro/06endurableMind')
 const contents_concentration = require('../../test/contents_pro/07concentration')
 const contents_relationProbelm = require('../../test/contents_pro/08relationshipProblem')
 const contents_gainMomentum = require('../../test/contents_pro/09gainMomentum')
 const contents_resultAblity= require('../../test/contents_pro/10ResultAblity')
 const contents_groundlessConfidence= require('../../test/contents_pro/11groundlessConfidence')
 const contents_growthPotential= require('../../test/contents_pro/12growthPotential')
 const contents_hisinGoodBad= require('../../test/contents_pro/13.hisinGoodBad')
 const contents_realization= require('../../test/contents_pro/14.realization')
 const contents_thisYearYongsinUn= require('../../test/contents_pro/addition/01.yongsinUn')
 const contents_thisYearYuksinUn= require('../../test/contents_pro/addition/02.yuksinUn')
 const contents_thisYearYuksinShgjUn= require('../../test/contents_pro/addition/03.yuksinShgjUn')
 const contents_thisYearLoveDay= require('../../test/contents_pro/addition/04.loveDay')
 const contents_thisYearMarryYear= require('../../test/contents_pro/addition/05.marryYear')
 const contents_thisYearLoveType= require('../../test/contents_pro/addition/06.loveType')
 const contents_thisPassUn= require('../../test/contents_pro/addition/07.passUn')
 const contents_thisBusinessUn= require('../../test/contents_pro/addition/08.businessUn')
 const contents_thisJobType= require('../../test/contents_pro/addition/09.jobType')
 const contents_thisJobTypeNew= require('../../test/contents_pro/addition/09.jobTypeNew')
 const contents_thisCopyRight= require('../../test/contents_pro/addition/10.copyRight')
 const contents_thisCopyRightNew= require('../../test/contents_pro/addition/10.copyRightNew')
 const contents_thisMoveUn= require('../../test/contents_pro/addition/11.moveUn')
 const contents_thisInvestment= require('../../test/contents_pro/addition/12.investment')
 const contents_thisChangeJob= require('../../test/contents_pro/addition/13.changingJobs')
 const contents_thisAptitude= require('../../test/contents_pro/addition/14.aptitude')
 const contents_thisEfficiency= require('../../test/contents_pro/addition/15.efficiency')
 const contents_thisHumanResources= require('../../test/contents_pro/addition/16.humanResources')
 exports.interface = () => {
     // 근왕,근약
     const yongsinGyouk = contents_yongsinGyouk.randum()
     // 근왕,근약
     const gunWangWak = contents_gunWangWak.randum()
     // 신태왕,극신약
     const taeWangSinWak = contents_sinTaeWangGukSinWak.randum()
     // 경쟁 참여의지 결과
     const competion = contents_competion.randum()
     // 개선의지 (실행하는 마음)
     const praticeMind = contents_praticeMind.randum()
     // 개선의지 (견디는 마음)
     const endurableMind = contents_endurableMind.randum()
     // 집중력
     const concentration = contents_concentration.randum()
     // 관계문제
     const relationProbelm = contents_relationProbelm.randum()
     //행동 추진력
     const gainMomentum = contents_gainMomentum.randum()
     //결과도출능력
     const resultAblity = contents_resultAblity.randum()
     // 근거없는 자신감
     const groundlessConfidence = contents_groundlessConfidence.randum()
     // 성장가능성
     const growthPotential = contents_growthPotential.randum()
     // 희신의 장단점
     const hisinGoodBad = contents_hisinGoodBad.randum()
     // 현실구현력
     const realization = contents_realization.randum()
    //년도별 총운 용신으로 보는운세(추가요소 1번)
     const yongsinUn = contents_thisYearYongsinUn.randum()
    //년도별 총운 지지육신으로 보는운세(추가요소 2번)
    const yuksinUn = contents_thisYearYuksinUn.randum()
    //년도별 총운 길격은 천간생화극제 흉격은 천간 육신으로 보는 운세(추가요소 3번)
    const yuksinShgjUn = contents_thisYearYuksinShgjUn.randum()
    //년도별 연애운: 연애시기(추가요소 4번)
    const loveDay = contents_thisYearLoveDay.randum()
    // 결혼운 (추가요소 5번)
    const marryYear = contents_thisYearMarryYear.randum()
    // 연애타입 (추가요소 6번)
    const loveType = contents_thisYearLoveType.randum()
    // 합격운 (추가요소 7번)
    const passUn = contents_thisPassUn.randum()
    // 비즈니스운 (추가요소 8번)
    const businessUn = contents_thisBusinessUn.randum()
    // 직업의 형태 (추가요소 9번)
    const jobType = contents_thisJobType.randum()
    // 직업의 형태 리뉴얼(추가요소 9번)
    const jobTypeNew = contents_thisJobTypeNew.randum()
    // 수익창출 (추가요소 10번)
    const copyRight = contents_thisCopyRight.randum()
    // 수익창출 (추가요소 10번)
    const copyRightNew = contents_thisCopyRightNew.randum()
    // 이동수 (추가요소 11번)
    const moveUn = contents_thisMoveUn.randum()
    // 투자 (추가요소 12번)
    const investment = contents_thisInvestment.randum()
    // 이직운 (추가요소 13번)
    const changeJob = contents_thisChangeJob.randum()
    // 적성분야 (추가요소 14번)
    const aptitude = contents_thisAptitude.randum()
    // 나의 능률 (추가요소 15번)
    const efficiency = contents_thisEfficiency.randum()
    // 나의 인재유형 (추가요소 16번)
    const humanResources = contents_thisHumanResources.randum()
    const checkPilYongsin= () => {
        let result = {
            yongWord :'',
            yongKeyword :'',
        }
        result.yongWord=yongsinGyouk.yongsinWord
        result.yongKeyword=yongsinGyouk.yongsinKeyword
        return result
    }
    const checkPilGyouk= () => {
        let result = {
            gyoukWord :'',
            gyoukKeyword :'',
        }
        result.gyoukWord=yongsinGyouk.gyoukWord
        result.gyoukKeyword=yongsinGyouk.gyoukKeyword
        return result
    }
    myManseInterF.kan={
        // 용신
        pro_yong:korToKan.changeChunGan(useRyeong.yongsin),
        //격국
        pro_gyouk : myManse.Gyouk,
        // 신태왕이다
        pro_taewang_Y:'Y',
        // 신태왕이아니다 
        pro_taewang_N:'Y',
        // 극신약이다
        pro_sinyak_Y:'Y',
        // 극신약이아니다
        pro_sinyak_N:'Y',
        // 신태왕,극신약 키워드
        pro_taeWangSinWak:'Y',
        // 근왕/근약 Y (근왕) N (근약)
        pro_geunwang:'Y',
        // 근왕/근약 키워드
        pro_geunwang_keyword:'Y',
        // 경쟁참여의지
        pro_compete_percent: '30%',
        pro_compete_value:'높',
        pro_improvement:'Y',
        pro_hold:'Y',
        pro_focus:'Y',
        pro_relation:'Y',
        pro_act_percent:'50%',
        pro_act_value:'ll',
        // 결과도출능력
        pro_result_ability:'ll',
        pro_result_ability_keyword:'ll',
        // 근거없는 자신감
        pro_initiative:'ll',
        pro_initiative_keyword:'ll',
        // 성장가능성
        pro_growth_percent:'60%',
        pro_growth_value:'ll',
        pro_growth_keyword:'ll',

        //////////////////// 여기까지 과거의 키워드 //////////////////////
        // 용신글자
        yongWord:checkPilYongsin().yongWord,
        // 용신키워드
        yongKeyword:checkPilYongsin().yongKeyword,
        // 격국글자
        gyoukWord:checkPilGyouk().gyoukWord,
        // 격국키워드 
        gyoukKeyword:checkPilGyouk().gyoukKeyword,
        // 근왕/근약 Y (근왕) N (근약)
        geunwang:gunWangWak.wangYak,
        // 근왕/근약 키워드
        geunwangKeyword:gunWangWak.keyword,
        // 신태왕/극신약 구분
        taewang:(taeWangSinWak.taeWangSinYak),
        // 신태왕,극신약 키워드
        taewangKeyword:taeWangSinWak.keyWord,
       // 경쟁참여의지
       compete:competion.level,
       competeKeyword:competion.contents,
        // 개선의지 (실행하는 마음)
        improvement:praticeMind.hi,
        improvementKeyword:praticeMind.keyword,
        // 개선의지(견디는 마음)
        endure:endurableMind.yong,
        endureKeyword:endurableMind.keyword,
        // 집중력
        focus:concentration.type,
        focusKeyword:concentration.keyword,
        // 관계문제
        relation:relationProbelm.type,
        relationKeyword:relationProbelm.keyword,
        // 행동추진력
        act:gainMomentum.yn,
        actKeyword:gainMomentum.keyword,
        // 결과도출능력
        resultAblility:resultAblity.type,
        resultAblilityKeyword:resultAblity.keyword,
        // 근거없는 자신감
        proud:groundlessConfidence.type,
        proudKeyword:groundlessConfidence.keyword,
        // 근거없는 자신감
        proud:groundlessConfidence.type,
        proudKeyword:groundlessConfidence.keyword,
        // 성장가능성
        growth:growthPotential.type,
        growthScore:growthPotential.score,
        growthKeyowrd:growthPotential.keyword,

        //희신장단점
        hisinYN:hisinGoodBad.hisinYN,
        hisinGood:hisinGoodBad.good,
        hisinBad:hisinGoodBad.bad,

        //현실구현력
        realizationPercent:realization.percent,
        realizationKeyword:realization.keyword,
        realizationTitle:realization.title,
        realizationTitleContents:realization.titleContents,

        //년도별 총운 용신으로 보는운세(추가요소 1번)
        unseYong:yongsinUn.type,
        unseKeyword:yongsinUn.keyword,
        //년도별 총운 지지육신으로 보는운세(추가요소 2번)
        unseilgan:yuksinUn.type,
        unseilganCard_tit:yuksinUn.card,
        unseilganKeyword:yuksinUn.keyword,
        //년도별 총운 길격은 천간생화극제 흉격은 천간 육신으로 보는 운세(추가요소 3번)
        yuksinSHGJ:yuksinShgjUn.type,
        yuksinSHGJKeyword:yuksinShgjUn.keyword,
        //년도별 연애운: 연애시기(추가요소 4번)
        datingTime:loveDay.month,
        datingTimeKeyword:loveDay.keyword,
        //결혼운 (추가요소 5번)
        marriageAge_gender:myManse.info.gender,
        marriageAge_time:marryYear.pass,
        marriageAge_keyword_tit:marryYear.title,
        marriageAge_keyword_year:marryYear.future,
        marriageAge_keyword:[marryYear.passKeyword,marryYear.futureKeyword],
        //연애타입 (추가요소 6번)
        datingStyle:loveType.title,
        datingStyleKeyword:loveType.keyword,
        //합격운 (추가요소 7번)
        passYear:[passUn.pass.year,passUn.future.year,passUn.future2.year],
        passKeyword:[passUn.pass.keyword,passUn.future.keyword,passUn.future2.keyword],
        //사업운 (추가요소 8번)
        bsYear:businessUn.year,
        bsKeyword:businessUn.keyword,
        //직업의형태 (추가요소 9번)
        jobType:jobType.type,
        jobKeyword:jobType.keyword,
         jobGun:jobTypeNew.gun,
        job:jobTypeNew.job,
        jobNJob:jobTypeNew.njob,
        //수익창출 (추가요소 10번)
        profit:copyRight.type,
        profitKeyword:copyRight.keyword,
        profitNew:copyRightNew.type,
        profitNewKeyword:copyRightNew.keyword,
        //이동운 (추가요소 11번)
        moving:moveUn[1].word,
        movingYear:moveUn[1].year+'년'+moveUn[1].month+'월',
        movingArrayYear:[moveUn[0].year+'년'+moveUn[0].month+'월',
        moveUn[1].year+'년'+moveUn[1].month+'월',
        moveUn[2].year+'년'+moveUn[2].month+'월',],
        movingKeyword:moveUn[1].keyword,
        movingArrayKeyword:[moveUn[0].keyword,moveUn[1].keyword,moveUn[2].keyword],
        movingArray:[moveUn[0].word,moveUn[1].word,moveUn[2].word],
        //투자 (추가요소 12번)
        invest:investment.type,
        investKeyword:investment.keyword,
        // 이직운 (추가요소 13번)
        changeJobTitle:changeJob.title,
        changeJobKeyword:changeJob.keyword,

        // 나의 적성분야(추가요소 14번)
        aptitudeTitle:aptitude.title,
        aptitudeTitleContents:aptitude.titleContents,
        aptitudeSubtitleTitle:aptitude.subtitle,
        aptitudeSubtitleTitleContents:aptitude.subtitleContents,

        // 나의 능률 (추가요소 15번)
        efficiencyTitle:efficiency.title,
        efficiencyTitleContents:efficiency.total,
        efficiencyJisokYN:efficiency.jisokYN,
        efficiencyJisokContents:efficiency.jisok,
        efficiencyHwakjangYN:efficiency.hwakjangYN,
        efficiencyHwakjangContents:efficiency.hwakjang,

        // 인재유형
        humanResourcesTitle:humanResources.title,
        humanResourcesSubTitle:humanResources.type,
        humanResourcesContents:humanResources.keyword
    }


     // myManseInterF.deunseun = getDeunSeun.getPillarKan()
 }