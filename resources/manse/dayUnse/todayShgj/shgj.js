var gungShgjFunc = {};

const gungShgjFunction = require("../../gungShgj/gungshgj");
const gil = require("../../gungShgj/gil");
const hung = require("../../gungShgj/hung");
gungShgjFunc.gungShgj = function () {
  return new Promise((resolve) => {
    let gukgubun = gungShgjFunction.gukgubun();


    let shgj = {};

    shgj = {
      gukgubun: gukgubun,
      sangguk: {
        y_sky: gungShgjFunction.sangguk(useTodayYuksin.y_sky),
        m_sky: gungShgjFunction.sangguk(useTodayYuksin.m_sky),
        d_sky: gungShgjFunction.sangguk(useTodayYuksin.d_sky),
        h_sky: gungShgjFunction.sangguk(useTodayYuksin.h_sky),
      },
    };

    if (gukgubun === "길격") {
      let sangsin = [
        gil.sangsin(
          "  ",
          shgj.sangguk.y_sky,
          useTodayPillar.y_sky,
          useTodayYuksin.y_sky
        ),
        gil.sangsin(
          "  ",
          shgj.sangguk.m_sky,
          useTodayPillar.m_sky,
          useTodayYuksin.m_sky
        ),
        gil.sangsin(
          "  ",
          shgj.sangguk.d_sky,
          useTodayPillar.d_sky,
          useTodayYuksin.d_sky
        ),
        gil.sangsin(
          "  ",
          shgj.sangguk.h_sky,
          useTodayPillar.h_sky,
          useTodayYuksin.h_sky
        ),
      ];

      shgj.sangsin = getYNP(sangsin);

      let sangsingisin = [
        gil.sangsingisin(
          "  ",
          shgj.sangguk.y_sky,
          useTodayPillar.y_sky,
          useTodayYuksin.y_sky
        ),
        gil.sangsingisin(
          "  ",
          shgj.sangguk.m_sky,
          useTodayPillar.m_sky,
          useTodayYuksin.m_sky
        ),
        gil.sangsingisin(
          "  ",
          shgj.sangguk.d_sky,
          useTodayPillar.d_sky,
          useTodayYuksin.d_sky
        ),
        gil.sangsingisin(
          "  ",
          shgj.sangguk.h_sky,
          useTodayPillar.h_sky,
          useTodayYuksin.h_sky
        ),
      ];
      shgj.sangsingisin = getYNP(sangsingisin);
      let gusin = [
        gil.gusin(
          "  ",
          shgj.sangguk.y_sky,
          useTodayPillar.y_sky,
          useTodayYuksin.y_sky
        ),
        gil.gusin(
          "  ",
          shgj.sangguk.m_sky,
          useTodayPillar.m_sky,
          useTodayYuksin.m_sky
        ),
        gil.gusin(
          "  ",
          shgj.sangguk.d_sky,
          useTodayPillar.d_sky,
          useTodayYuksin.d_sky
        ),
        gil.gusin(
          "  ",
          shgj.sangguk.h_sky,
          useTodayPillar.h_sky,
          useTodayYuksin.h_sky
        ),

        ,
      ];
      shgj.gusin = getYNP(gusin);
      let gukgisin = [
        gil.gukgisin(
          "  ",
          shgj.sangguk.y_sky,
          useTodayPillar.y_sky,
          useTodayYuksin.y_sky
        ),
        gil.gukgisin(
          "  ",
          shgj.sangguk.m_sky,
          useTodayPillar.m_sky,
          useTodayYuksin.m_sky
        ),
        gil.gukgisin(
          "  ",
          shgj.sangguk.d_sky,
          useTodayPillar.d_sky,
          useTodayYuksin.d_sky
        ),
        gil.gukgisin(
          "  ",
          shgj.sangguk.h_sky,
          useTodayPillar.h_sky,
          useTodayYuksin.h_sky
        ),
      ];
      shgj.gukgisin = getYNP(gukgisin);
      let sanghwa = [
        gil.sanghwa(
          "  ",
          shgj.sangguk.y_sky,
          useTodayPillar.y_sky,
          useTodayYuksin.y_sky
        ),
        gil.sanghwa(
          "  ",
          shgj.sangguk.m_sky,
          useTodayPillar.m_sky,
          useTodayYuksin.m_sky
        ),
        gil.sanghwa(
          "  ",
          shgj.sangguk.d_sky,
          useTodayPillar.d_sky,
          useTodayYuksin.d_sky
        ),
        gil.sanghwa(
          "  ",
          shgj.sangguk.h_sky,
          useTodayPillar.h_sky,
          useTodayYuksin.h_sky
        ),
      ];
      shgj.sanghwa = getYNP(sanghwa);
      let sang_jae = [
        gil.sang_jae(
          "  ",
          shgj.sangguk.y_sky,
          useTodayPillar.y_sky,
          useTodayYuksin.y_sky
        ),

        gil.sang_jae(
          "  ",
          shgj.sangguk.m_sky,
          useTodayPillar.m_sky,
          useTodayYuksin.m_sky
        ),

        gil.sang_jae(
          "  ",
          shgj.sangguk.d_sky,
          useTodayPillar.d_sky,
          useTodayYuksin.d_sky
        ),

        gil.sang_jae(
          "  ",
          shgj.sangguk.h_sky,
          useTodayPillar.h_sky,
          useTodayYuksin.h_sky
        ),
      ];
      shgj.sang_jae = getYNP(sang_jae);

      let sulhwa = [
        gil.sulhwa(
          "  ",
          shgj.sangguk.y_sky,
          useTodayPillar.y_sky,
          useTodayYuksin.y_sky
        ),
        gil.sulhwa(
          "  ",
          shgj.sangguk.m_sky,
          useTodayPillar.m_sky,
          useTodayYuksin.m_sky
        ),
        gil.sulhwa(
          "  ",
          shgj.sangguk.d_sky,
          useTodayPillar.d_sky,
          useTodayYuksin.d_sky
        ),
        gil.sulhwa(
          "  ",
          shgj.sangguk.h_sky,
          useTodayPillar.h_sky,
          useTodayYuksin.h_sky
        ),
      ];
      shgj.sulhwa = getYNP(sulhwa);

      let sul_jae = [
        gil.sul_jae(
          "  ",
          shgj.sangguk.y_sky,
          useTodayPillar.y_sky,
          useTodayYuksin.y_sky
        ),

        gil.sul_jae(
          "  ",
          shgj.sangguk.m_sky,
          useTodayPillar.m_sky,
          useTodayYuksin.m_sky
        ),

        gil.sul_jae(
          "  ",
          shgj.sangguk.d_sky,
          useTodayPillar.d_sky,
          useTodayYuksin.d_sky
        ),

        gil.sul_jae(
          "  ",
          shgj.sangguk.h_sky,
          useTodayPillar.h_sky,
          useTodayYuksin.h_sky
        ),
      ];
      shgj.sul_jae = getYNP(sul_jae);

      let sang_hap = [
        gil.sang_hap(
          "  ",
          shgj.sangguk.y_sky,
          useTodayPillar.y_sky,
          useTodayYuksin.y_sky
        ),

        gil.sang_hap(
          "  ",
          shgj.sangguk.m_sky,
          useTodayPillar.m_sky,
          useTodayYuksin.m_sky
        ),

        gil.sang_hap(
          "  ",
          shgj.sangguk.d_sky,
          useTodayPillar.d_sky,
          useTodayYuksin.d_sky
        ),

        gil.sang_hap(
          "  ",
          shgj.sangguk.h_sky,
          useTodayPillar.h_sky,
          useTodayYuksin.h_sky
        ),
      ];
      shgj.sang_hap = getYNP(sang_hap);
      let sul_hap = [
        gil.sul_hap(
          "  ",
          shgj.sangguk.y_sky,
          useTodayPillar.y_sky,
          useTodayYuksin.y_sky
        ),

        gil.sul_hap(
          "  ",
          shgj.sangguk.m_sky,
          useTodayPillar.m_sky,
          useTodayYuksin.m_sky
        ),

        gil.sul_hap(
          "  ",
          shgj.sangguk.d_sky,
          useTodayPillar.d_sky,
          useTodayYuksin.d_sky
        ),

        gil.sul_hap(
          "  ",
          shgj.sangguk.h_sky,
          useTodayPillar.h_sky,
          useTodayYuksin.h_sky
        ),
      ];
      shgj.sul_hap = getYNP(sul_hap);
    } else if (gukgubun === "흉격") {
      let sangsin = [
        hung.sangsin(
          "  ",
          shgj.sangguk.y_sky,
          useTodayPillar.y_sky,
          useTodayYuksin.y_sky
        ),

        hung.sangsin(
          "  ",
          shgj.sangguk.m_sky,
          useTodayPillar.m_sky,
          useTodayYuksin.m_sky
        ),

        hung.sangsin(
          "  ",
          shgj.sangguk.d_sky,
          useTodayPillar.d_sky,
          useTodayYuksin.d_sky
        ),

        hung.sangsin(
          "  ",
          shgj.sangguk.h_sky,
          useTodayPillar.h_sky,
          useTodayYuksin.h_sky
        ),
      ];
      shgj.sangsin = getYNP(sangsin);
      let sangsingisin = [
        hung.sangsingisin(
          "  ",
          shgj.sangguk.y_sky,
          useTodayPillar.y_sky,
          useTodayYuksin.y_sky
        ),

        hung.sangsingisin(
          "  ",
          shgj.sangguk.m_sky,
          useTodayPillar.m_sky,
          useTodayYuksin.m_sky
        ),

        hung.sangsingisin(
          "  ",
          shgj.sangguk.d_sky,
          useTodayPillar.d_sky,
          useTodayYuksin.d_sky
        ),

        hung.sangsingisin(
          "  ",
          shgj.sangguk.h_sky,
          useTodayPillar.h_sky,
          useTodayYuksin.h_sky
        ),
      ];
      shgj.sangsingisin = getYNP(sangsingisin);
      let gusin = [
        hung.gusin(
          "  ",
          shgj.sangguk.y_sky,
          useTodayPillar.y_sky,
          useTodayYuksin.y_sky
        ),

        hung.gusin(
          "  ",
          shgj.sangguk.m_sky,
          useTodayPillar.m_sky,
          useTodayYuksin.m_sky
        ),

        hung.gusin(
          "  ",
          shgj.sangguk.d_sky,
          useTodayPillar.d_sky,
          useTodayYuksin.d_sky
        ),

        hung.gusin(
          "  ",
          shgj.sangguk.h_sky,
          useTodayPillar.h_sky,
          useTodayYuksin.h_sky
        ),
      ];
      shgj.gusin = getYNP(gusin);

      let gusingisin = [
        hung.gusingisin(
          "  ",
          shgj.sangguk.y_sky,
          useTodayPillar.y_sky,
          useTodayYuksin.y_sky
        ),

        hung.gusingisin(
          "  ",
          shgj.sangguk.m_sky,
          useTodayPillar.m_sky,
          useTodayYuksin.m_sky
        ),

        hung.gusingisin(
          "  ",
          shgj.sangguk.d_sky,
          useTodayPillar.d_sky,
          useTodayYuksin.d_sky
        ),

        hung.gusingisin(
          "  ",
          shgj.sangguk.h_sky,
          useTodayPillar.h_sky,
          useTodayYuksin.h_sky
        ),
      ];
      shgj.gusingisin = getYNP(gusingisin);

      let sanghwa = [
        hung.sanghwa("  ", useTodayYuksin.y_sky, useTodayPillar.y_sky),

        hung.sanghwa("  ", useTodayYuksin.m_sky, useTodayPillar.m_sky),

        hung.sanghwa("  ", useTodayYuksin.d_sky, useTodayPillar.d_sky),

        hung.sanghwa("  ", useTodayYuksin.h_sky, useTodayPillar.h_sky),
      ];
      shgj.sanghwa = getYNP(sanghwa);

      let sulhwa = [
        hung.sulhwa("  ", useTodayYuksin.y_sky, useTodayPillar.y_sky),

        hung.sulhwa("  ", useTodayYuksin.m_sky, useTodayPillar.m_sky),

        hung.sulhwa("  ", useTodayYuksin.d_sky, useTodayPillar.d_sky),

        hung.sulhwa("  ", useTodayYuksin.h_sky, useTodayPillar.h_sky),
      ];
      shgj.sulhwa = getYNP(sulhwa);
      let sul_jae = [
        hung.sul_jae("  ", useTodayYuksin.y_sky, useTodayPillar.y_sky),

        hung.sul_jae("  ", useTodayYuksin.m_sky, useTodayPillar.m_sky),

        hung.sul_jae("  ", useTodayYuksin.d_sky, useTodayPillar.d_sky),

        hung.sul_jae("  ", useTodayYuksin.h_sky, useTodayPillar.h_sky),
      ];
      shgj.sul_jae = getYNP(sul_jae);

      if (useGyouk === "상관격" || useGyouk === "편관격") {
        let sul_hap = [
          hung.sul_hap("  ", useTodayYuksin.y_sky, useTodayPillar.y_sky),

          hung.sul_hap("  ", useTodayYuksin.m_sky, useTodayPillar.m_sky),

          hung.sul_hap("  ", useTodayYuksin.d_sky, useTodayPillar.d_sky),

          hung.sul_hap("  ", useTodayYuksin.h_sky, useTodayPillar.h_sky),
        ];
        shgj.sul_hap = getYNP(sul_hap);
      }

      let yido = [
        hung.yido(
          "  ",
          useTodayPillar.y_sky,
          useTodayPillar.m_sky,
          useTodayPillar.d_sky,
          useTodayPillar.h_sky,
          "  ",
          useTodayPillar.y_sky,
          useTodayYuksin.y_sky
        ),

        hung.yido(
          "  ",
          useTodayPillar.y_sky,
          useTodayPillar.m_sky,
          useTodayPillar.d_sky,
          useTodayPillar.h_sky,
          "  ",
          useTodayPillar.m_sky,
          useTodayYuksin.m_sky
        ),

        hung.yido(
          "  ",
          useTodayPillar.y_sky,
          useTodayPillar.m_sky,
          useTodayPillar.d_sky,
          useTodayPillar.h_sky,
          "  ",
          useTodayPillar.d_sky,
          useTodayYuksin.d_sky
        ),

        hung.yido(
          "  ",
          useTodayPillar.y_sky,
          useTodayPillar.m_sky,
          useTodayPillar.d_sky,
          useTodayPillar.h_sky,
          "  ",
          useTodayPillar.h_sky,
          useTodayYuksin.h_sky
        ),
      ];
      shgj.yido = getYNP(yido);
    }

    useTodayShgj = shgj;

    resolve("");
  }).catch((error) => {
    console.log(error);
    return error;
});
};

function getYNP(obj) {
  let result;

  let exist = [obj[0].exist, obj[1].exist, obj[2].exist, obj[3].exist];

  let name = ["y_sky", "m_sky", "d_sky", "h_sky"];
  let jjangproperty = [" ", " ", " ", " "];
  let objUse = [
    obj[0].possible,
    obj[1].possible,
    obj[2].possible,
    obj[3].possible,
  ];
  let yn = "N";
  let position = [];
  let property = [];
  let use = [];
  for (let i = 0; i < exist.length; i++) {
    if (exist[i] === "y" || exist[i] === "Y") {
      yn = "Y";
      position.push(name[i]);
      if (jjangproperty[i] === undefined) {
        property.push("  ");
      } else {
        property.push(jjangproperty[i]);
      }

      use.push(objUse[i]);
    }
  }
  result = {
    exist: yn,
    position: position,
    property: property,
    use: use,
  };

  return result;
}
module.exports = gungShgjFunc;
