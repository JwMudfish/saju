
const myPage = require('../../test/contents_myPage');
const korToKan = require('../../manseUtil/korToHan')
exports.interface = () => {
    let myPageFunc = myPage.randum()
    let skillTitle = getSkillTitle()
    myManseInterF.kan = {
        //칭호
        my_title: myPageFunc.title,
        //이름
        my_name: myManse.info.name,
        //생년월일
        my_birthDate: useSolar,
        //격국(프로필이미지)
        my_gyouk: useGyouk,
        //시주 천간 텍스트(시간육신)
        my_h_sky_text: myManse.yukSin.h_sky,
        //시주 천간 한자(시간글자)
        my_h_sky: korToKan.changeChunGan(myManse.pillar.h_sky),
        //시주 천간 색상(시간오행)
        my_h_sky_oHang: ohangColor(useUmYangOHang.h_sky.oHang),
        //일주 천간 텍스트 (일간육신)
        my_d_sky_text: myManse.yukSin.d_sky,
        //일주 천간 한자 (일간글자)
        my_d_sky: korToKan.changeChunGan(myManse.pillar.d_sky),
        //일주 천간 색상 (일간오행)
        my_d_sky_oHang: ohangColor(useUmYangOHang.d_sky.oHang),
        //월주 천간 텍스트 (월간육신)
        my_m_sky_text: myManse.yukSin.m_sky,
        //월주 천간 한자 (월간글자)
        my_m_sky: korToKan.changeChunGan(myManse.pillar.m_sky),
        //월주 천간 색상 (월간오행)
        my_m_sky_oHang: ohangColor(useUmYangOHang.m_sky.oHang),
        //년주 천간 텍스트 (년간육신)
        my_y_sky_text: myManse.yukSin.y_sky,
        //년주 천간 한자 (년간글자)
        my_y_sky: korToKan.changeChunGan(myManse.pillar.y_sky),
        //년주 천간 색상 (년간오행)
        my_y_sky_oHang: ohangColor(useUmYangOHang.y_sky.oHang),


        //시주 지장간 텍스트(시지육신)
        my_h_land_text: myManse.yukSin.h_land,
        //시주 지장간  한자(시지글자)
        my_h_land: korToKan.changeJIJI(myManse.pillar.h_land),
        //시주 지장간  색상(시지오행)
        my_h_land_oHang: ohangColor(useUmYangOHang.h_land.oHang),
        //일주 지장간  텍스트 (일지육신)
        my_d_land_text: myManse.yukSin.d_land,
        //일주 지장간  한자 (일지글자)
        my_d_land: korToKan.changeJIJI(myManse.pillar.d_land),
        //일주 지장간  색상 (일지오행)
        my_d_land_oHang: ohangColor(useUmYangOHang.d_land.oHang),
        //월주 지장간  텍스트 (월지육신)
        my_m_land_text: myManse.yukSin.m_land,
        //월주 지장간  한자 (월지글자)
        my_m_land: korToKan.changeJIJI(myManse.pillar.m_land),
        //월주 지장간  색상 (월지오행)
        my_m_land_oHang: ohangColor(useUmYangOHang.m_land.oHang),
        //년주 지장간  텍스트 (년지육신)
        my_y_land_text: myManse.yukSin.y_land,
        //년주 지장간  한자 (년지글자)
        my_y_land: korToKan.changeJIJI(myManse.pillar.y_land),
        //년주 지장간  색상 (년지오행)
        my_y_land_oHang: ohangColor(useUmYangOHang.y_land.oHang),

        //월령 당령 사령
        my_yongsin: korToKan.changeChunGan(useRyeong.yongsin),
        my_saryeong: korToKan.changeChunGan(myManse.ryeong.saryeong),
        //일간
        my_ilgan: korToKan.changeChunGan(myManse.pillar.d_sky),
        //격국
        my_gyouk: myManse.Gyouk,
        //적성활용도
        my_yongsin_bar: myPageFunc.jukSung,
        //포텐셜
        my_ryeong_bar: myPageFunc.potention,
        //체력
        my_ilgan_bar: myPageFunc.power,
        //처세술
        my_gyouk_bar: myPageFunc.treatment,
        //주요능력
        my_main_skill: useRyeong.yongsin,
        // 주요능력_스킬이름
        my_main_skill_name: skillTitle.main,
        //직업속성
        my_job_skill: myManse.Gyouk,
        //직업속성_스킬이름
        my_job_skill_name: skillTitle.job,
        //보조능력1
        my_sub_skill_1: useRyeong.yongsin + "_" + hisinYN(),
        //보조능력1_스킬이름
        my_sub_skill_1_name: skillTitle.sub
    },
        myManseInterF.kor = {
            //칭호
            my_title: myPageFunc.title,
            //이름
            my_name: myManse.info.name,
            //생년월일
            my_birthDate: useSolar,
            //격국(프로필이미지)
            my_gyouk: useGyouk,
            //시주 천간 텍스트(시간육신)
            my_h_sky_text: myManse.yukSin.h_sky,
            //시주 천간 한자(시간글자)
            my_h_sky: myManse.pillar.h_sky,
            //시주 천간 색상(시간오행)
            my_h_sky_oHang: ohangColor(useUmYangOHang.h_sky.oHang),
            //일주 천간 텍스트 (일간육신)
            my_d_sky_text: myManse.yukSin.d_sky,
            //일주 천간 한자 (일간글자)
            my_d_sky: myManse.pillar.d_sky,
            //일주 천간 색상 (일간오행)
            my_d_sky_oHang: ohangColor(useUmYangOHang.d_sky.oHang),
            //월주 천간 텍스트 (월간육신)
            my_m_sky_text: myManse.yukSin.m_sky,
            //월주 천간 한자 (월간글자)
            my_m_sky: myManse.pillar.m_sky,
            //월주 천간 색상 (월간오행)
            my_m_sky_oHang: ohangColor(useUmYangOHang.m_sky.oHang),
            //년주 천간 텍스트 (년간육신)
            my_y_sky_text: myManse.yukSin.y_sky,
            //년주 천간 한자 (년간글자)
            my_y_sky: myManse.pillar.y_sky,
            //년주 천간 색상 (년간오행)
            my_y_sky_oHang: ohangColor(useUmYangOHang.y_sky.oHang),


            //시주 지장간 텍스트(시지육신)
            my_h_land_text: myManse.yukSin.h_land,
            //시주 지장간  한자(시지글자)
            my_h_land: myManse.pillar.h_land,
            //시주 지장간  색상(시지오행)
            my_h_land_oHang: ohangColor(useUmYangOHang.h_land.oHang),
            //일주 지장간  텍스트 (일지육신)
            my_d_land_text: myManse.yukSin.d_land,
            //일주 지장간  한자 (일지글자)
            my_d_land: myManse.pillar.d_land,
            //일주 지장간  색상 (일지오행)
            my_d_land_oHang: ohangColor(useUmYangOHang.d_land.oHang),
            //월주 지장간  텍스트 (월지육신)
            my_m_land_text: myManse.yukSin.m_land,
            //월주 지장간  한자 (월지글자)
            my_m_land: myManse.pillar.m_land,
            //월주 지장간  색상 (월지오행)
            my_m_land_oHang: ohangColor(useUmYangOHang.m_land.oHang),
            //년주 지장간  텍스트 (년지육신)
            my_y_land_text: myManse.yukSin.y_land,
            //년주 지장간  한자 (년지글자)
            my_y_land: myManse.pillar.y_land,
            //년주 지장간  색상 (년지오행)
            my_y_land_oHang: ohangColor(useUmYangOHang.y_land.oHang),

            //월령 당령 사령
            my_yongsin: useRyeong.yongsin,
            my_saryeong: myManse.ryeong.saryeong,
            //일간
            my_ilgan: myManse.pillar.d_sky,
            //격국
            my_gyouk: myManse.Gyouk,
            //적성활용도
            my_yongsin_bar: myPageFunc.jukSung,
            //포텐셜
            my_ryeong_bar: myPageFunc.potention,
            //체력
            my_ilgan_bar: myPageFunc.power,
            //처세술
            my_gyouk_bar: myPageFunc.treatment,
            //주요능력
            my_main_skill: useRyeong.yongsin,
            // 주요능력_스킬이름
            my_main_skill_name: skillTitle.main,
            //직업속성
            my_job_skill: myManse.Gyouk,
            //직업속성_스킬이름
            my_job_skill_name: skillTitle.job,
            //보조능력1
            my_sub_skill_1: useRyeong.yongsin + "_" + hisinYN(),
            //보조능력1_스킬이름
            my_sub_skill_1_name: skillTitle.sub
        }

}

const hisinYN = () => {
    let result = "N";

    if (useRyeong.heuisin.exist === "Y" &&
        useRyeong.heuisin.use.includes('y')) {
        result = "Y"
    }
    return result
}

const getSkillTitle = () => {
    let result = {
        main: '',
        job: '',
        sub: ''
    };
    if (useRyeong.yongsin === '계') {
        result.main = '사고력'
        result.sub = '표현력'
    }
    else if (useRyeong.yongsin === '갑') {
        result.main = '학습력'
        result.sub = '계획'
    }
    else if (useRyeong.yongsin === '을') {
        result.main = '설득력'
        result.sub = '조직'
    }
    else if (useRyeong.yongsin === '병') {
        result.main = '소통력'
        result.sub = '인프라'
    }
    else if (useRyeong.yongsin === '정') {
        result.main = '탐구력'
        result.sub = '생산성'
    }
    else if (useRyeong.yongsin === '경') {
        result.main = '숙달력'
        result.sub = '기술'
    }
    else if (useRyeong.yongsin === '신') {
        result.main = '검증력'
        result.sub = '상품성'
    }
    else if (useRyeong.yongsin === '임') {
        result.main = '판매력'
        result.sub = '품질'
    }

    if (myManse.Gyouk === '정관격') {
        result.job = '원칙'
    }
    else if (myManse.Gyouk === '편관격') {
        result.job = '관리'
    }
    else if (myManse.Gyouk === '정재격') {
        result.job = '안정'
    }
    else if (myManse.Gyouk === '편재격') {
        result.job = '투자'
    }
    else if (myManse.Gyouk === '상관격') {
        result.job = '혁신'
    }
    else if (myManse.Gyouk === '식신격') {
        result.job = '준비'
    }
    else if (myManse.Gyouk === '정인격') {
        result.job = '지식'
    }
    else if (myManse.Gyouk === '편인격') {
        result.job = '창의'
    }
    else if (myManse.Gyouk === '건록격') {
        result.job = '대의'
    }
    else if (myManse.Gyouk === '양인격') {
        result.job = '수호'
    }
    return result;
}

const ohangColor = (ohang) => {
    let result = "";
    if (ohang === '토') {
        result = 'gold'
    }
    else if (ohang === '화') {
        result = 'fire'
    }
    else if (ohang === '수') {
        result = 'dark_gray'
    }
    else if (ohang === '금') {
        result = 'gray'
    }
    else if (ohang === '목') {
        result = 'blue'
    }
    return result
}


