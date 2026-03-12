
 const hiyongUtil = require('../../manseUtil/hiyong/hiyongUtil')
 const hapChung = require('../../manseUtil/hapchung/samhapUtil')
 const ryeongText = require('../../test/contents_hisin10')
 const gungText = require('../../test/contents_gungGilHung')
 const shgjText = require('../../test/contents_shgjGilHung')
 const gyeokText = require('../../test/contents_gyoukSimple')
 const hiyongGunWangYak = require('../../test/contents_hiYongGun')
 const hapChungSentence = require('../../test/contents_hapChung')
 const lightFunc = require('./ReportFunc/lightReportFunc')
 const getPillar = require('./ReportFunc/getPillar')
 const getDeunSeun = require('./ReportFunc/getDeunSeun')
 const korToKan = require('../../manseUtil/korToHan')
 const queston1 = require('../../test/contents_light_question/contents_question_1')
 const queston2 = require('../../test/contents_light_question/contents_question_2')
 const queston3 = require('../../test/contents_light_question/contents_question_3')
 const queston4 = require('../../test/contents_light_question/contents_question_4')
 const queston5 = require('../../test/contents_light_question/contents_question_5')
 const queston6 = require('../../test/contents_light_question/contents_question_6')
 const queston7 = require('../../test/contents_light_question/contents_question_7')
 const queston8 = require('../../test/contents_light_question/contents_question_8')
 const queston9= require('../../test/contents_light_question/contents_question_9')
 const queston10= require('../../test/contents_light_question/contents_question_10')
 exports.interface = () => {
    let tempHour = lightFunc.hapChungYN(usePillar.h_land)
    let tempDay = lightFunc.hapChungIlJiYN(usePillar.d_land)
    let tempMonth = lightFunc.hapChungWolJiYN(usePillar.m_land)
    let tempYear = lightFunc.hapChungYN(usePillar.y_land)
    let date = korToKan.changeJIJITime(useSolar,useLunar)

    myManseInterF.kan={
        manse : getPillar.getPillarKan(),
        report : {// 생일
            report_sajuinfo_birth_solar : date.solar,
            report_sajuinfo_birth_lunar : date.lunar,
            // 절입중기정보
            report_sajuinfo_seasonal_1 : myManse.julib,
            report_sajuinfo_seasonal_1_word : myManse.julibGanji,
            report_sajuinfo_seasonal_2 : myManse.junggi,
            report_sajuinfo_seasonal_2_word : myManse.junggiGanji,
            //월령 당령 사령
            report_sajuinfo_wolryeong :korToKan.changeJIJI( lightFunc.getWolRyeong()[0])+korToKan.changeJIJI( lightFunc.getWolRyeong()[1]),
            report_sajuinfo_dangryeong : korToKan.changeChunGan(myManse.ryeong.yongsin),
            report_sajuinfo_saryeong :  korToKan.changeChunGan(myManse.ryeong.saryeong),
            //격국
            report_sajuinfo_gyouk : myManse.Gyouk,
            //조화
            report_sajuinfo_johwa : usePalPum.johwa,
            //복덕
          report_sajuinfo_bok : lightFunc.checkBokDuk(),
          report_sago_yangYN : lightFunc.checkYang(),
          report_sago_yinYN : lightFunc.checkUm(),
          report_note_taewangYN : lightFunc.checkSinTaeWang(),
          report_note_sinyakYN : lightFunc.checkGukSinYak(),
          report_woljiWord : korToKan.changeJIJI(usePillar.m_land),
          report_yongWord : korToKan.changeChunGan(useRyeong.yongsin),
          report_gyoukWord : myManse.Gyouk,
          report_yong :  korToKan.changeChunGan(useRyeong.yongsin),
          report_yong_gisinWord_1 :korToKan.changeChunGan( useRyeong.geuk_gisin.word),
          report_yong_gisinYN_1 : lightFunc.checkYND(useRyeong.geuk_gisin),
          report_yong_gisinWord_2 : korToKan.changeChunGan(useRyeong.um_gisin.word),
          report_yong_gisinYN_2 : lightFunc.checkYND(useRyeong.um_gisin),
          report_hisinWord : korToKan.changeChunGan(useRyeong.heuisin.word),
          report_hisinYN : lightFunc.checkYND(useRyeong.heuisin),
          report_hisin_gisinWord_1 : korToKan.changeChunGan(useRyeong.geuk_heuisin_gisin.word),
          report_hisin_gisinYN_1 : lightFunc.checkYND(useRyeong.geuk_heuisin_gisin),
          report_hisin_gisinWord_2 : korToKan.changeChunGan(useRyeong.um_heuisin_gisin.word),
          report_hisin_gisinYN_2 : lightFunc.checkYND(useRyeong.um_heuisin_gisin),
          report_yong_methodWord_1 :korToKan.changeChunGan( useRyeong.junghwa.word),
          report_yong_methodYN_1 : lightFunc.checkYND(useRyeong.junghwa),
          report_yong_methodWord_2 : korToKan.changeChunGan(useRyeong.junghwa_gisin.word),
          report_yong_methodYN_2 : lightFunc.checkYND(useRyeong.junghwa_gisin),
          report_yong_jisokWord : korToKan.changeChunGan(useRyeong.jisok.word),
          report_yong_jisokYN : lightFunc.checkYND(useRyeong.jisok),
          report_yong_hwakjangWord :korToKan.changeChunGan( useRyeong.hwakjang.word),
          report_yong_hwakjangYN : lightFunc.checkYND(useRyeong.hwakjang),
          report_yong_cont_title : ryeongText.randum().title,
          report_yong_cont : ryeongText.randum().contents,
          report_gyoukWord : myManse.Gyouk,
          report_gyoukYN : lightFunc.checkSungPa(),
          report_sangsinWord : useShgj.sangsin.yuksin,
          report_sangsinYN : lightFunc.checkYND(useShgj.sangsin),
          report_gusinWord : useShgj.gusin.yuksin,
          report_gusinYN : lightFunc.checkYND(useShgj.gusin),
          report_sangsingisinWord : useShgj.sangsingisin.yuksin,
          report_sangsingisinYN : lightFunc.checkYND(useShgj.sangsingisin),
          report_gusingisinWord : lightFunc.checkUndefined(useShgj.gusingisin),
          report_gusingisinYN : lightFunc.checkYND(useShgj.gusingisin),
          report_gyoukgisinWord : lightFunc.checkUndefined(useShgj.gukgisin),
          report_gyoukgisinYN : lightFunc.checkYND(useShgj.gukgisin),
          report_gyouk_cont_title : gyeokText.randum().title,
          report_gyouk_cont :gyeokText.randum().contents +'\n\n'+gungText.randum().contents,
          report_saeng_gyoukWord : myManse.Gyouk,
          report_saeng_jaesal : lightFunc.checkSiksinJeSal().yn,
          report_saeng_jaesalExist : lightFunc.checkSiksinJeSalExist(),
          report_saeng_jaesalWord : lightFunc.checkSiksinJeSal().word,
          //생화
          report_gyouk_saengWord : lightFunc.changeSengHwa(useShgj.sanghwa),
          report_gyouk_saengYN : lightFunc.checkYND(useShgj.sanghwa),
          //설화
          report_gyouk_sulWord : lightFunc.changeSulHwa(useShgj.sulhwa),
          report_gyouk_sulYN : lightFunc.checkYND(useShgj.sulhwa),
          // 생화제화
          report_gyouk_saeng_jaeWord : lightFunc.changeSengHwa_zeHwa(useShgj.sengHwa_zeHwa),
          report_gyouk_saeng_jaeYN : lightFunc.checkYND(useShgj.sengHwa_zeHwa),
          //생화합화
          report_gyouk_saeng_hapWord : lightFunc.checkUndefined(useShgj.sengHwa_hapHwa),
          report_gyouk_saeng_hapYN : lightFunc.checkYND(useShgj.sengHwa_hapHwa),
          //설화제화
          report_gyouk_sul_jaeWord : lightFunc.changeSulHwa_zeHwa(useShgj.sulHwa_zeHwa),
          report_gyouk_sul_jaeYN : lightFunc.checkYND(useShgj.sulHwa_zeHwa),
          //설화합화
          report_gyouk_sul_hapWord : lightFunc.checkUndefined(useShgj.sulHwa_hapHwa),
          report_gyouk_sul_hapYN : lightFunc.checkYND(useShgj.sulHwa_hapHwa),
          report_shgj_cont_title : '타이틀없음',
          report_shgj_cont :shgjText.randum().contents,
          report_ilgan_hiyongWord_1 : korToKan.changeChunGan(lightFunc.checkHiYongWord(usePillar.h_sky).word),
          report_ilgan_hiyongYN_1 : lightFunc.checkHiYongWord(usePillar.h_sky).yn,
          report_ilgan_hiyongWhat_1 : lightFunc.checkHiYongWord(usePillar.h_sky).hiyong,
          report_ilgan_hiyongWord_2 :korToKan.changeChunGan( usePillar.d_sky),
          report_ilgan_hiyongYN_2 : 'Y',
          report_ilgan_hiyongWhat_2 : '일간',
          report_ilgan_hiyongWord_3 : korToKan.changeChunGan(lightFunc.checkHiYongWord(usePillar.m_sky).word),
          report_ilgan_hiyongYN_3 : lightFunc.checkHiYongWord(usePillar.m_sky).yn,
          report_ilgan_hiyongWhat_3 : lightFunc.checkHiYongWord(usePillar.m_sky).hiyong,
          report_ilgan_hiyongWord_4 : korToKan.changeChunGan(lightFunc.checkHiYongWord(usePillar.y_sky).word),
          report_ilgan_hiyongYN_4 : lightFunc.checkHiYongWord(usePillar.y_sky).yn,
          report_ilgan_hiyongWhat_4 : lightFunc.checkHiYongWord(usePillar.y_sky).hiyong,
          report_ilgan_geunWord_1 : korToKan.changeJIJI(lightFunc.checkGun(usePillar.h_land, 'h').word),
          report_ilgan_geunYN_1 : lightFunc.checkGun(usePillar.h_land, 'h').yn,
          report_ilgan_geunWhat_1 : lightFunc.checkGun(usePillar.h_land, 'h').gun,
          report_ilgan_geunWord_2 : korToKan.changeJIJI(lightFunc.checkGun(usePillar.d_land, 'd').word),
          report_ilgan_geunYN_2 : lightFunc.checkGun(usePillar.d_land, 'd').yn,
          report_ilgan_geunWhat_2 : lightFunc.checkGun(usePillar.d_land, 'd').gun,
          report_ilgan_geunWord_3 :korToKan.changeJIJI( usePillar.m_land),
          report_ilgan_geunYN_3 : 'N',
          report_ilgan_geunWhat_3 : '월지',
          report_ilgan_geunWord_4 : korToKan.changeJIJI(lightFunc.checkGun(usePillar.y_land, 'y').word),
          report_ilgan_geunYN_4 : lightFunc.checkGun(usePillar.y_land, 'y').yn,
          report_ilgan_geunWhat_4 : lightFunc.checkGun(usePillar.y_land, 'y').gun,
          report_ilgan_hiWord : korToKan.changeChunGan(hiyongUtil.hiCheck()),
          report_ilgan_hiYN : hiyongUtil.checkHiYN(),
          report_ilgan_yongWord : korToKan.changeChunGan(hiyongUtil.yongCheck()),
          report_ilgan_yongYN : hiyongUtil.checkYongYN(),
          report_ilgan_geunwang : lightFunc.checkGunWangYak('근왕'),
          report_ilgan_geunyak : lightFunc.checkGunWangYak('근약'),
          report_ilgan_hiyong_cont_title : hiyongGunWangYak.randum().title,
          report_ilgan_hiyong_cont : hiyongGunWangYak.randum().contents,
          // myManseInterF.report_ilgan_hiyong_cont_title : '글필요'
          // myManseInterF.report_ilgan_hiyong_cont : '글필요'
          report_hapchung_hourYN :tempHour.yn,
          report_hapchung_hourWord :korToKan.changeJIJI(tempHour.word),
          report_hapchung_hourWhat :tempHour.what,
          report_hapchung_hourSamhap :tempHour.samhap,
          report_hapchung_hourBanghap :tempHour.banghap,
          report_hapchung_hourYukhap :tempHour.yukhap,
          report_hapchung_hourChung :tempHour.chung,
          report_hapchung_hourSangChung :tempHour.sangChung,
          
          report_hapchung_dayWord :korToKan.changeJIJI(tempDay.word),
          report_hapchung_dayYN :tempDay.yn,
          report_hapchung_dayWhat :tempDay.what,
          report_hapchung_daySamhap :tempDay.samhap,
          report_hapchung_dayBanghap :tempDay.banghap,
          report_hapchung_dayYukhap :tempDay.yukhap,
          report_hapchung_dayChung :tempDay.chung,
          report_hapchung_daySangChung :tempDay.sangChung,
          
          report_hapchung_monWord : korToKan.changeJIJI(tempMonth.word),
          report_hapchung_monYN : tempMonth.yn,
          report_hapchung_monWhat : tempMonth.what,
          report_hapchung_monSamhap :tempMonth.samhap,
          report_hapchung_monBanghap :tempMonth.banghap,
          report_hapchung_monYukhap :tempMonth.yukhap,
          report_hapchung_monChung :tempMonth.chung,
          report_hapchung_monSangChung :tempMonth.sangChung,
          
          report_hapchung_yearWord :korToKan.changeJIJI( tempYear.word),
          report_hapchung_yearYN :  tempYear.yn,
          report_hapchung_yearWhat :  tempYear.what,
          report_hapchung_yearSamhap :tempYear.samhap,
          report_hapchung_yearBanghap :tempYear.banghap,
          report_hapchung_yearYukhap :tempYear.yukhap,
          report_hapchung_yearChung :tempYear.chung,
          report_hapchung_yearSangChung :tempYear.sangChung,
          report_hapchung_mon : lightFunc.checkWolJiHapCheck(),
          report_hapchung_mon_word : korToKan.changeJIJI(usePillar.m_land),
          report_hapchung_mon_samhapYN : hapChung.checkSamhapWolYN(),
          report_hapchung_mon_chungYN : (hapChung.checkSamhapWolYN() === 'Y' &&
              hapChung.checkChungWolYN() === 'Y')
              ? "Y" : "N",
          report_hapchung_mon_banghapYN : hapChung.checkbanghapWolYN(),
          report_hapchung_mon_banghap_chungYN : (hapChung.checkbanghapWolYN() === 'Y' &&
              hapChung.checkChungWolYN() === 'Y')
              ? "Y" : "N",
          report_hapchung_day : hapChung.checkYukhapilJiYN(),
          report_hapchung_day_word : korToKan.changeJIJI(usePillar.d_land),
          report_hapchung_day_yukhapYN : hapChung.checkYukhapChoiceYN(usePillar.d_land, 'D'),
          report_hapchung_day_chungYN : (hapChung.checkYukhapChoiceYN(usePillar.d_land, 'D') === 'Y' &&
              hapChung.checkChungChoiceYN(usePillar.d_land, 'D') === 'Y')
              ? "Y" : "N",
          report_hapchung_cont_title : hapChungSentence.randum().title,
          report_hapchung_cont :hapChungSentence.randum().contents,
          testHTML :lightFunc.testHTML(),
          queston1_title :'',
          // queston1_content :queston1.randum(),
          queston1_content :'글준비중이예요!',
          queston2_title :'',
          queston2_content :queston2.randum(),
          queston3_title :'',
          queston3_content :queston3.randum(),
          queston4_title :'',
          queston4_content :queston4.randum().contents,
          queston5_title :queston5.randum().title,
          queston5_content :queston5.randum().contents,
          queston6_title : gyeokText.randum().title,
          queston6_content :queston6.randum().contents,
          queston7_title :'',
          queston7_content :queston7.randum().contents,
          queston8_title :'',
          queston8_content :queston8.randum().contents,
          queston9_title :'',
          queston9_content :queston9.randum().contents,
          queston10_title :'',
          queston10_content :queston10.randum().contents,
        }
  
    }
    myManseInterF.kor={
        manse : getPillar.getPillarKor(),
        report : {
            // 생일
        report_sajuinfo_birth_solar : useSolar,
        report_sajuinfo_birth_lunar : useLunar,
        // 절입중기정보
        report_sajuinfo_seasonal_1 : myManse.julib,
        report_sajuinfo_seasonal_1_word : myManse.julibGanji,
        report_sajuinfo_seasonal_2 : myManse.junggi,
        report_sajuinfo_seasonal_2_word : myManse.junggiGanji,
        //월령 당령 사령
        report_sajuinfo_wolryeong : lightFunc.getWolRyeong(),
        report_sajuinfo_dangryeong : myManse.ryeong.yongsin,
        report_sajuinfo_saryeong : myManse.ryeong.saryeong,
        //격국
        report_sajuinfo_gyouk : myManse.Gyouk,
        //조화
        report_sajuinfo_johwa : usePalPum.johwa,
        //복덕
      report_sajuinfo_bok : lightFunc.checkBokDuk(),
      report_sago_yangYN : lightFunc.checkYang(),
      report_sago_yinYN : lightFunc.checkUm(),
      report_note_taewangYN : lightFunc.checkSinTaeWang(),
      report_note_sinyakYN : lightFunc.checkGukSinYak(),
      report_woljiWord : usePillar.m_land,
      report_yongWord : useRyeong.yongsin,
      report_gyoukWord : myManse.Gyouk,
      report_yong : useRyeong.yongsin,
      report_yong_gisinWord_1 : useRyeong.geuk_gisin.word,
      report_yong_gisinYN_1 : lightFunc.checkYND(useRyeong.geuk_gisin),
      report_yong_gisinWord_2 : useRyeong.um_gisin.word,
      report_yong_gisinYN_2 : lightFunc.checkYND(useRyeong.um_gisin),
      report_hisinWord : useRyeong.heuisin.word,
      report_hisinYN : lightFunc.checkYND(useRyeong.heuisin),
      report_hisin_gisinWord_1 : useRyeong.geuk_heuisin_gisin.word,
      report_hisin_gisinYN_1 : lightFunc.checkYND(useRyeong.geuk_heuisin_gisin),
      report_hisin_gisinWord_2 : useRyeong.um_heuisin_gisin.word,
      report_hisin_gisinYN_2 : lightFunc.checkYND(useRyeong.um_heuisin_gisin),
      report_yong_methodWord_1 : useRyeong.junghwa.word,
      report_yong_methodYN_1 : lightFunc.checkYND(useRyeong.junghwa),
      report_yong_methodWord_2 : useRyeong.junghwa_gisin.word,
      report_yong_methodYN_2 : lightFunc.checkYND(useRyeong.junghwa_gisin),
      report_yong_jisokWord : useRyeong.jisok.word,
      report_yong_jisokYN : lightFunc.checkYND(useRyeong.jisok),
      report_yong_hwakjangWord : useRyeong.hwakjang.word,
      report_yong_hwakjangYN : lightFunc.checkYND(useRyeong.hwakjang),
      report_yong_cont_title : ryeongText.randum().title,
      report_yong_cont : ryeongText.randum().contents,
      report_gyoukWord : myManse.Gyouk,
      report_gyoukYN : lightFunc.checkSungPa(),
      report_sangsinWord : useShgj.sangsin.yuksin,
      report_sangsinYN : lightFunc.checkYND(useShgj.sangsin),
      report_gusinWord : useShgj.gusin.yuksin,
      report_gusinYN : lightFunc.checkYND(useShgj.gusin),
      report_sangsingisinWord : useShgj.sangsingisin.yuksin,
      report_sangsingisinYN : lightFunc.checkYND(useShgj.sangsingisin),
      report_gusingisinWord : lightFunc.checkUndefined(useShgj.gusingisin),
      report_gusingisinYN : lightFunc.checkYND(useShgj.gusingisin),
      report_gyoukgisinWord : lightFunc.checkUndefined(useShgj.gukgisin),
      report_gyoukgisinYN : lightFunc.checkYND(useShgj.gukgisin),
      report_gyouk_cont_title : gyeokText.randum().title,
      report_gyouk_cont :gyeokText.randum().contents +'\n\n'+gungText.randum().contents,
      report_saeng_gyoukWord : myManse.Gyouk,
      report_saeng_jaesal : lightFunc.checkSiksinJeSal().yn,
      report_saeng_jaesalExist : lightFunc.checkSiksinJeSalExist(),
      report_saeng_jaesalWord : lightFunc.checkSiksinJeSal().word,
      //생화
      report_gyouk_saengWord : lightFunc.changeSengHwa(useShgj.sanghwa),
      report_gyouk_saengYN : lightFunc.checkYND(useShgj.sanghwa),
      //설화
      report_gyouk_sulWord : lightFunc.changeSulHwa(useShgj.sulhwa),
      report_gyouk_sulYN : lightFunc.checkYND(useShgj.sulhwa),
      // 생화제화
      report_gyouk_saeng_jaeWord : lightFunc.changeSengHwa_zeHwa(useShgj.sengHwa_zeHwa),
      report_gyouk_saeng_jaeYN : lightFunc.checkYND(useShgj.sengHwa_zeHwa),
      //생화합화
      report_gyouk_saeng_hapWord : lightFunc.checkUndefined(useShgj.sengHwa_hapHwa),
      report_gyouk_saeng_hapYN : lightFunc.checkYND(useShgj.sengHwa_hapHwa),
      //설화제화
      report_gyouk_sul_jaeWord : lightFunc.changeSulHwa_zeHwa(useShgj.sulHwa_zeHwa),
      report_gyouk_sul_jaeYN : lightFunc.checkYND(useShgj.sulHwa_zeHwa),
      //설화합화
      report_gyouk_sul_hapWord : lightFunc.checkUndefined(useShgj.sulHwa_hapHwa),
      report_gyouk_sul_hapYN : lightFunc.checkYND(useShgj.sulHwa_hapHwa),
      report_shgj_cont_title : '타이틀없음',
      report_shgj_cont :shgjText.randum().contents,
      report_ilgan_hiyongWord_1 : lightFunc.checkHiYongWord(usePillar.h_sky).word,
      report_ilgan_hiyongYN_1 : lightFunc.checkHiYongWord(usePillar.h_sky).yn,
      report_ilgan_hiyongWhat_1 : lightFunc.checkHiYongWord(usePillar.h_sky).hiyong,
      report_ilgan_hiyongWord_2 : usePillar.d_sky,
      report_ilgan_hiyongYN_2 : 'Y',
      report_ilgan_hiyongWhat_2 : '일간',
      report_ilgan_hiyongWord_3 : lightFunc.checkHiYongWord(usePillar.m_sky).word,
      report_ilgan_hiyongYN_3 : lightFunc.checkHiYongWord(usePillar.m_sky).yn,
      report_ilgan_hiyongWhat_3 : lightFunc.checkHiYongWord(usePillar.m_sky).hiyong,
      report_ilgan_hiyongWord_4 : lightFunc.checkHiYongWord(usePillar.y_sky).word,
      report_ilgan_hiyongYN_4 : lightFunc.checkHiYongWord(usePillar.y_sky).yn,
      report_ilgan_hiyongWhat_4 : lightFunc.checkHiYongWord(usePillar.y_sky).hiyong,
      report_ilgan_geunWord_1 : lightFunc.checkGun(usePillar.h_land, 'h').word,
      report_ilgan_geunYN_1 : lightFunc.checkGun(usePillar.h_land, 'h').yn,
      report_ilgan_geunWhat_1 : lightFunc.checkGun(usePillar.h_land, 'h').gun,
      report_ilgan_geunWord_2 : lightFunc.checkGun(usePillar.d_land, 'd').word,
      report_ilgan_geunYN_2 : lightFunc.checkGun(usePillar.d_land, 'd').yn,
      report_ilgan_geunWhat_2 : lightFunc.checkGun(usePillar.d_land, 'd').gun,
      report_ilgan_geunWord_3 : usePillar.m_land,
      report_ilgan_geunYN_3 : 'N',
      report_ilgan_geunWhat_3 : '월지',
      report_ilgan_geunWord_4 : lightFunc.checkGun(usePillar.y_land, 'y').word,
      report_ilgan_geunYN_4 : lightFunc.checkGun(usePillar.y_land, 'y').yn,
      report_ilgan_geunWhat_4 : lightFunc.checkGun(usePillar.y_land, 'y').gun,
      report_ilgan_hiWord : hiyongUtil.hiCheck(),
      report_ilgan_hiYN : hiyongUtil.checkHiYN(),
      report_ilgan_yongWord : hiyongUtil.yongCheck(),
      report_ilgan_yongYN : hiyongUtil.checkYongYN(),
      report_ilgan_geunwang : lightFunc.checkGunWangYak('근왕'),
      report_ilgan_geunyak : lightFunc.checkGunWangYak('근약'),
      report_ilgan_hiyong_cont_title : hiyongGunWangYak.randum().title,
      report_ilgan_hiyong_cont : hiyongGunWangYak.randum().contents,
      // myManseInterF.report_ilgan_hiyong_cont_title : '글필요'
      // myManseInterF.report_ilgan_hiyong_cont : '글필요'
      report_hapchung_hourYN :tempHour.yn,
      report_hapchung_hourWord :tempHour.word,
      report_hapchung_hourWhat :tempHour.what,
      report_hapchung_hourSamhap :tempHour.samhap,
      report_hapchung_hourBanghap :tempHour.banghap,
      report_hapchung_hourYukhap :tempHour.yukhap,
      report_hapchung_hourChung :tempHour.chung,
      report_hapchung_hourSangChung :tempHour.sangChung,
      
      report_hapchung_dayWord :tempDay.word,
      report_hapchung_dayYN :tempDay.yn,
      report_hapchung_dayWhat :tempDay.what,
      report_hapchung_daySamhap :tempDay.samhap,
      report_hapchung_dayBanghap :tempDay.banghap,
      report_hapchung_dayYukhap :tempDay.yukhap,
      report_hapchung_dayChung :tempDay.chung,
      report_hapchung_daySangChung :tempDay.sangChung,
      
      report_hapchung_monWord : tempMonth.word,
      report_hapchung_monYN : tempMonth.yn,
      report_hapchung_monWhat : tempMonth.what,
      report_hapchung_monSamhap :tempMonth.samhap,
      report_hapchung_monBanghap :tempMonth.banghap,
      report_hapchung_monYukhap :tempMonth.yukhap,
      report_hapchung_monChung :tempMonth.chung,
      report_hapchung_monSangChung :tempMonth.sangChung,
      
      report_hapchung_yearWord : tempYear.word,
      report_hapchung_yearYN :  tempYear.yn,
      report_hapchung_yearWhat :  tempYear.what,
      report_hapchung_yearSamhap :tempYear.samhap,
      report_hapchung_yearBanghap :tempYear.banghap,
      report_hapchung_yearYukhap :tempYear.yukhap,
      report_hapchung_yearChung :tempYear.chung,
      report_hapchung_yearSangChung :tempYear.sangChung,
      report_hapchung_mon : lightFunc.checkWolJiHapCheck(),
      report_hapchung_mon_word : usePillar.m_land,
      report_hapchung_mon_samhapYN : hapChung.checkSamhapWolYN(),
      report_hapchung_mon_chungYN : (hapChung.checkSamhapWolYN() === 'Y' &&
          hapChung.checkChungWolYN() === 'Y')
          ? "Y" : "N",
      report_hapchung_mon_banghapYN : hapChung.checkbanghapWolYN(),
      report_hapchung_mon_banghap_chungYN : (hapChung.checkbanghapWolYN() === 'Y' &&
          hapChung.checkChungWolYN() === 'Y')
          ? "Y" : "N",
      report_hapchung_day : hapChung.checkYukhapilJiYN(),
      report_hapchung_day_word : usePillar.d_land,
      report_hapchung_day_yukhapYN : hapChung.checkYukhapChoiceYN(usePillar.d_land, 'D'),
      report_hapchung_day_chungYN : (hapChung.checkYukhapChoiceYN(usePillar.d_land, 'D') === 'Y' &&
          hapChung.checkChungChoiceYN(usePillar.d_land, 'D') === 'Y')
          ? "Y" : "N",
      report_hapchung_cont_title : hapChungSentence.randum().title,
      report_hapchung_cont :hapChungSentence.randum().contents,
      testHTML :lightFunc.testHTML(),
      queston1_title :'',
      // queston1_content :queston1.randum(),
      queston1_content :'글준비중이예요!',
      queston2_title :'',
      queston2_content :queston2.randum(),
      queston3_title :'',
      queston3_content :queston3.randum(),
      queston4_title :'',
      queston4_content :queston4.randum().contents,
      queston5_title :queston5.randum().title,
      queston5_content :queston5.randum().contents,
      queston6_title : gyeokText.randum().title,
      queston6_content :queston6.randum().contents,
      queston7_title :'',
      queston7_content :queston7.randum().contents,
      queston8_title :'',
      queston8_content :queston8.randum().contents,
      queston9_title :'',
      queston9_content :queston9.randum().contents,
      queston10_title :'',
      queston10_content :queston10.randum().contents,
        }
        
          }
     myManseInterF.deunseun = getDeunSeun.getPillarKan()
     myManseInterF.deunseunV2 = useDeunSeunV2
 }