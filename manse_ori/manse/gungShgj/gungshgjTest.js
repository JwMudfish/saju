var gungShgjFunc = {};

const gungShgjFunction = require("./gungshgj");
const gil = require("./gil");
const hung = require("./hung");
gungShgjFunc.gungShgj = function () {
  return new Promise((resolve) => {
    let gukgubun = gungShgjFunction.gukgubun();


    let shgj = {};

    shgj = {
      gukgubun: gukgubun,
      sangguk: {
        y_sky: gungShgjFunction.sangguk(useYuksin.y_sky),
        //y_land: gungShgjFunction.sangguk(useYuksin.y_land),
        m_sky: gungShgjFunction.sangguk(useYuksin.m_sky),
        //m_land: gungShgjFunction.sangguk(useYuksin.m_land),
        d_sky: gungShgjFunction.sangguk(useYuksin.d_sky),
        // d_land: gungShgjFunction.sangguk(useYuksin.d_land),
        h_sky: gungShgjFunction.sangguk(useYuksin.h_sky),
        //  h_land: gungShgjFunction.sangguk(useYuksin.h_land),
        y_jangan1: gungShgjFunction.sangguk(useYuksin.y_jangan.y_jangan1),
        y_jangan2: gungShgjFunction.sangguk(useYuksin.y_jangan.y_jangan2),
        y_jangan3: gungShgjFunction.sangguk(useYuksin.y_jangan.y_jangan3),
        m_jangan1: gungShgjFunction.sangguk(useYuksin.m_jangan.m_jangan1),
        m_jangan2: gungShgjFunction.sangguk(useYuksin.m_jangan.m_jangan2),
        m_jangan3: gungShgjFunction.sangguk(useYuksin.m_jangan.m_jangan3),
        d_jangan1: gungShgjFunction.sangguk(useYuksin.d_jangan.d_jangan1),
        d_jangan2: gungShgjFunction.sangguk(useYuksin.d_jangan.d_jangan2),
        d_jangan3: gungShgjFunction.sangguk(useYuksin.d_jangan.d_jangan3),
        h_jangan1: gungShgjFunction.sangguk(useYuksin.h_jangan.h_jangan1),
        h_jangan2: gungShgjFunction.sangguk(useYuksin.h_jangan.h_jangan2),
        h_jangan3: gungShgjFunction.sangguk(useYuksin.h_jangan.h_jangan3),
      },
      /*    y_jangan: {
            y_jangan1: gungShgjFunction.sangguk(useYuksin.y_jangan.y_jangan1),
            y_jangan2: gungShgjFunction.sangguk(useYuksin.y_jangan.y_jangan2),
            y_jangan3: gungShgjFunction.sangguk(useYuksin.y_jangan.y_jangan3),
          },
          m_jangan: {
            m_jangan1: gungShgjFunction.sangguk(useYuksin.m_jangan.m_jangan1),
            m_jangan2: gungShgjFunction.sangguk(useYuksin.m_jangan.m_jangan2),
            m_jangan3: gungShgjFunction.sangguk(useYuksin.m_jangan.m_jangan3),
          },
          d_jangan: {
            d_jangan1: gungShgjFunction.sangguk(useYuksin.d_jangan.d_jangan1),
            d_jangan2: gungShgjFunction.sangguk(useYuksin.d_jangan.d_jangan2),
            d_jangan3: gungShgjFunction.sangguk(useYuksin.d_jangan.d_jangan3),
          },
          h_jangan: {
            h_jangan1: gungShgjFunction.sangguk(useYuksin.h_jangan.h_jangan1),
            h_jangan2: gungShgjFunction.sangguk(useYuksin.h_jangan.h_jangan2),
            h_jangan3: gungShgjFunction.sangguk(useYuksin.h_jangan.h_jangan3),
          },*/
    };

    if (gukgubun === "길격") {
      shgj.sangsin = {
        y_sky: gil.sangsin("  ", shgj.sangguk.y_sky, usePillar.y_sky),
        //y_land: gil.sangsin("  ", shgj.sangguk.y_land, usePillar.y_land),
        m_sky: gil.sangsin("  ", shgj.sangguk.m_sky, usePillar.m_sky),
        //m_land: gil.sangsin("  ", shgj.sangguk.m_land, usePillar.m_land),
        d_sky: gil.sangsin("  ", shgj.sangguk.d_sky, usePillar.d_sky),
        //d_land: gil.sangsin("  ", shgj.sangguk.d_land, usePillar.d_land),
        h_sky: gil.sangsin("  ", shgj.sangguk.h_sky, usePillar.h_sky),
        // h_land: gil.sangsin("  ", shgj.sangguk.h_land, usePillar.h_land),
        y_jangan1: gil.sangsin(
          usejijangganUse.yu.y_land.y_jangan1,
          shgj.sangguk.y_jangan1,
          usejijanggan.y_jangan.y_jangan1
        ),
        y_jangan2: gil.sangsin(
          usejijangganUse.yu.y_land.y_jangan2,
          shgj.sangguk.y_jangan2,
          usejijanggan.y_jangan.y_jangan2
        ),
        y_jangan3: gil.sangsin(
          usejijangganUse.yu.y_land.y_jangan3,
          shgj.sangguk.y_jangan3,
          usejijanggan.y_jangan.y_jangan3
        ),
        m_jangan1: gil.sangsin(
          usejijangganUse.yu.m_land.m_jangan1,
          shgj.sangguk.m_jangan1,
          usejijanggan.m_jangan.m_jangan1
        ),
        m_jangan2: gil.sangsin(
          usejijangganUse.yu.m_land.m_jangan2,
          shgj.sangguk.m_jangan2,
          usejijanggan.m_jangan.m_jangan2
        ),
        m_jangan3: gil.sangsin(
          usejijangganUse.yu.m_land.m_jangan3,
          shgj.sangguk.m_jangan3,
          usejijanggan.m_jangan.m_jangan3
        ),
        d_jangan1: gil.sangsin(
          usejijangganUse.yu.d_land.d_jangan1,
          shgj.sangguk.d_jangan1,
          usejijanggan.d_jangan.d_jangan1
        ),
        d_jangan2: gil.sangsin(
          usejijangganUse.yu.d_land.d_jangan2,
          shgj.sangguk.d_jangan2,
          usejijanggan.d_jangan.d_jangan2
        ),
        d_jangan3: gil.sangsin(
          usejijangganUse.yu.d_land.d_jangan3,
          shgj.sangguk.d_jangan3,
          usejijanggan.d_jangan.d_jangan3
        ),
        h_jangan1: gil.sangsin(
          usejijangganUse.yu.h_land.h_jangan1,
          shgj.sangguk.h_jangan1,
          usejijanggan.h_jangan.h_jangan1
        ),
        h_jangan2: gil.sangsin(
          usejijangganUse.yu.h_land.h_jangan2,
          shgj.sangguk.h_jangan2,
          usejijanggan.h_jangan.h_jangan2
        ),
        h_jangan3: gil.sangsin(
          usejijangganUse.yu.h_land.h_jangan3,
          shgj.sangguk.h_jangan3,
          usejijanggan.h_jangan.h_jangan3
        ),
      };
      shgj.sangsingisin = {
        y_sky: gil.sangsingisin("  ", shgj.sangguk.y_sky, usePillar.y_sky),
        // y_land: gil.sangsingisin("  ", shgj.sangguk.y_land, usePillar.y_land),
        m_sky: gil.sangsingisin("  ", shgj.sangguk.m_sky, usePillar.m_sky),
        //  m_land: gil.sangsingisin("  ", shgj.sangguk.m_land, usePillar.m_land),
        d_sky: gil.sangsingisin("  ", shgj.sangguk.d_sky, usePillar.d_sky),
        //d_land: gil.sangsingisin("  ", shgj.sangguk.d_land, usePillar.d_land),
        h_sky: gil.sangsingisin("  ", shgj.sangguk.h_sky, usePillar.h_sky),
        //   h_land: gil.sangsingisin("  ", shgj.sangguk.h_land, usePillar.h_land),
        y_jangan1: gil.sangsingisin(
          usejijangganUse.yu.y_land.y_jangan1,
          shgj.sangguk.y_jangan1,
          usejijanggan.y_jangan.y_jangan1
        ),
        y_jangan2: gil.sangsingisin(
          usejijangganUse.yu.y_land.y_jangan2,
          shgj.sangguk.y_jangan2,
          usejijanggan.y_jangan.y_jangan2
        ),
        y_jangan3: gil.sangsingisin(
          usejijangganUse.yu.y_land.y_jangan3,
          shgj.sangguk.y_jangan3,
          usejijanggan.y_jangan.y_jangan3
        ),
        m_jangan1: gil.sangsingisin(
          usejijangganUse.yu.m_land.m_jangan1,
          shgj.sangguk.m_jangan1,
          usejijanggan.m_jangan.m_jangan1
        ),
        m_jangan2: gil.sangsingisin(
          usejijangganUse.yu.m_land.m_jangan2,
          shgj.sangguk.m_jangan2,
          usejijanggan.m_jangan.m_jangan2
        ),
        m_jangan3: gil.sangsingisin(
          usejijangganUse.yu.m_land.m_jangan3,
          shgj.sangguk.m_jangan3,
          usejijanggan.m_jangan.m_jangan3
        ),
        d_jangan1: gil.sangsingisin(
          usejijangganUse.yu.d_land.d_jangan1,
          shgj.sangguk.d_jangan1,
          usejijanggan.d_jangan.d_jangan1
        ),
        d_jangan2: gil.sangsingisin(
          usejijangganUse.yu.d_land.d_jangan2,
          shgj.sangguk.d_jangan2,
          usejijanggan.d_jangan.d_jangan2
        ),
        d_jangan3: gil.sangsingisin(
          usejijangganUse.yu.d_land.d_jangan3,
          shgj.sangguk.d_jangan3,
          usejijanggan.d_jangan.d_jangan3
        ),
        h_jangan1: gil.sangsingisin(
          usejijangganUse.yu.h_land.h_jangan1,
          shgj.sangguk.h_jangan1,
          usejijanggan.h_jangan.h_jangan1
        ),
        h_jangan2: gil.sangsingisin(
          usejijangganUse.yu.h_land.h_jangan2,
          shgj.sangguk.h_jangan2,
          usejijanggan.h_jangan.h_jangan2
        ),
        h_jangan3: gil.sangsingisin(
          usejijangganUse.yu.h_land.h_jangan3,
          shgj.sangguk.h_jangan3,
          usejijanggan.h_jangan.h_jangan3
        ),
      };
      shgj.gusin = {
        y_sky: gil.gusin("  ", shgj.sangguk.y_sky, usePillar.y_sky),
        // y_land: gil.gusin("  ", shgj.sangguk.y_land, usePillar.y_land),
        m_sky: gil.gusin("  ", shgj.sangguk.m_sky, usePillar.m_sky),
        //   m_land: gil.gusin("  ", shgj.sangguk.m_land, usePillar.m_land),
        d_sky: gil.gusin("  ", shgj.sangguk.d_sky, usePillar.d_sky),
        //d_land: gil.gusin("  ", shgj.sangguk.d_land, usePillar.d_land),
        h_sky: gil.gusin("  ", shgj.sangguk.h_sky, usePillar.h_sky),
        //  h_land: gil.gusin("  ", shgj.sangguk.h_land, usePillar.h_land),
        y_jangan1: gil.gusin(
          usejijangganUse.yu.y_land.y_jangan1,
          shgj.sangguk.y_jangan1,
          usejijanggan.y_jangan.y_jangan1
        ),
        y_jangan2: gil.gusin(
          usejijangganUse.yu.y_land.y_jangan2,
          shgj.sangguk.y_jangan2,
          usejijanggan.y_jangan.y_jangan2
        ),
        y_jangan3: gil.gusin(
          usejijangganUse.yu.y_land.y_jangan3,
          shgj.sangguk.y_jangan3,
          usejijanggan.y_jangan.y_jangan3
        ),
        m_jangan1: gil.gusin(
          usejijangganUse.yu.m_land.m_jangan1,
          shgj.sangguk.m_jangan1,
          usejijanggan.m_jangan.m_jangan1
        ),
        m_jangan2: gil.gusin(
          usejijangganUse.yu.m_land.m_jangan2,
          shgj.sangguk.m_jangan2,
          usejijanggan.m_jangan.m_jangan2
        ),
        m_jangan3: gil.gusin(
          usejijangganUse.yu.m_land.m_jangan3,
          shgj.sangguk.m_jangan3,
          usejijanggan.m_jangan.m_jangan3
        ),
        d_jangan1: gil.gusin(
          usejijangganUse.yu.d_land.d_jangan1,
          shgj.sangguk.d_jangan1,
          usejijanggan.d_jangan.d_jangan1
        ),
        d_jangan2: gil.gusin(
          usejijangganUse.yu.d_land.d_jangan2,
          shgj.sangguk.d_jangan2,
          usejijanggan.d_jangan.d_jangan2
        ),
        d_jangan3: gil.gusin(
          usejijangganUse.yu.d_land.d_jangan3,
          shgj.sangguk.d_jangan3,
          usejijanggan.d_jangan.d_jangan3
        ),
        h_jangan1: gil.gusin(
          usejijangganUse.yu.h_land.h_jangan1,
          shgj.sangguk.h_jangan1,
          usejijanggan.h_jangan.h_jangan1
        ),
        h_jangan2: gil.gusin(
          usejijangganUse.yu.h_land.h_jangan2,
          shgj.sangguk.h_jangan2,
          usejijanggan.h_jangan.h_jangan2
        ),
        h_jangan3: gil.gusin(
          usejijangganUse.yu.h_land.h_jangan3,
          shgj.sangguk.h_jangan3,
          usejijanggan.h_jangan.h_jangan3
        ),
      };
      shgj.gukgisin = {
        y_sky: gil.gukgisin("  ", shgj.sangguk.y_sky, usePillar.y_sky),
        //   y_land: gil.gukgisin("  ", shgj.sangguk.y_land, usePillar.y_land),
        m_sky: gil.gukgisin("  ", shgj.sangguk.m_sky, usePillar.m_sky),
        //   m_land: gil.gukgisin("  ", shgj.sangguk.m_land, usePillar.m_land),
        d_sky: gil.gukgisin("  ", shgj.sangguk.d_sky, usePillar.d_sky),
        //   d_land: gil.gukgisin("  ", shgj.sangguk.d_land, usePillar.d_land),
        h_sky: gil.gukgisin("  ", shgj.sangguk.h_sky, usePillar.h_sky),
        //  h_land: gil.gukgisin("  ", shgj.sangguk.h_land, usePillar.h_land),
        y_jangan1: gil.gukgisin(
          usejijangganUse.yu.y_land.y_jangan1,
          shgj.sangguk.y_jangan1,
          usejijanggan.y_jangan.y_jangan1
        ),
        y_jangan2: gil.gukgisin(
          usejijangganUse.yu.y_land.y_jangan2,
          shgj.sangguk.y_jangan2,
          usejijanggan.y_jangan.y_jangan2
        ),
        y_jangan3: gil.gukgisin(
          usejijangganUse.yu.y_land.y_jangan3,
          shgj.sangguk.y_jangan3,
          usejijanggan.y_jangan.y_jangan3
        ),
        m_jangan1: gil.gukgisin(
          usejijangganUse.yu.m_land.m_jangan1,
          shgj.sangguk.m_jangan1,
          usejijanggan.m_jangan.m_jangan1
        ),
        m_jangan2: gil.gukgisin(
          usejijangganUse.yu.m_land.m_jangan2,
          shgj.sangguk.m_jangan2,
          usejijanggan.m_jangan.m_jangan2
        ),
        m_jangan3: gil.gukgisin(
          usejijangganUse.yu.m_land.m_jangan3,
          shgj.sangguk.m_jangan3,
          usejijanggan.m_jangan.m_jangan3
        ),
        d_jangan1: gil.gukgisin(
          usejijangganUse.yu.d_land.d_jangan1,
          shgj.sangguk.d_jangan1,
          usejijanggan.d_jangan.d_jangan1
        ),
        d_jangan2: gil.gukgisin(
          usejijangganUse.yu.d_land.d_jangan2,
          shgj.sangguk.d_jangan2,
          usejijanggan.d_jangan.d_jangan2
        ),
        d_jangan3: gil.gukgisin(
          usejijangganUse.yu.d_land.d_jangan3,
          shgj.sangguk.d_jangan3,
          usejijanggan.d_jangan.d_jangan3
        ),
        h_jangan1: gil.gukgisin(
          usejijangganUse.yu.h_land.h_jangan1,
          shgj.sangguk.h_jangan1,
          usejijanggan.h_jangan.h_jangan1
        ),
        h_jangan2: gil.gukgisin(
          usejijangganUse.yu.h_land.h_jangan2,
          shgj.sangguk.h_jangan2,
          usejijanggan.h_jangan.h_jangan2
        ),
        h_jangan3: gil.gukgisin(
          usejijangganUse.yu.h_land.h_jangan3,
          shgj.sangguk.h_jangan3,
          usejijanggan.h_jangan.h_jangan3
        ),
      };
      shgj.sanghwa = {
        y_sky: gil.sanghwa("  ", shgj.sangguk.y_sky, usePillar.y_sky),
        // y_land: gil.sanghwa("  ", shgj.sangguk.y_land, usePillar.y_land),
        m_sky: gil.sanghwa("  ", shgj.sangguk.m_sky, usePillar.m_sky),
        // m_land: gil.sanghwa("  ", shgj.sangguk.m_land, usePillar.m_land),
        d_sky: gil.sanghwa("  ", shgj.sangguk.d_sky, usePillar.d_sky),
        //   d_land: gil.sanghwa("  ", shgj.sangguk.d_land, usePillar.d_land),
        h_sky: gil.sanghwa("  ", shgj.sangguk.h_sky, usePillar.h_sky),
        //   h_land: gil.sanghwa("  ", shgj.sangguk.h_land, usePillar.h_land),
        y_jangan1: gil.sanghwa(
          usejijangganUse.yu.y_land.y_jangan1,
          shgj.sangguk.y_jangan1,
          usejijanggan.y_jangan.y_jangan1
        ),
        y_jangan2: gil.sanghwa(
          usejijangganUse.yu.y_land.y_jangan2,
          shgj.sangguk.y_jangan2,
          usejijanggan.y_jangan.y_jangan2
        ),
        y_jangan3: gil.sanghwa(
          usejijangganUse.yu.y_land.y_jangan3,
          shgj.sangguk.y_jangan3,
          usejijanggan.y_jangan.y_jangan3
        ),
        m_jangan1: gil.sanghwa(
          usejijangganUse.yu.m_land.m_jangan1,
          shgj.sangguk.m_jangan1,
          usejijanggan.m_jangan.m_jangan1
        ),
        m_jangan2: gil.sanghwa(
          usejijangganUse.yu.m_land.m_jangan2,
          shgj.sangguk.m_jangan2,
          usejijanggan.m_jangan.m_jangan2
        ),
        m_jangan3: gil.sanghwa(
          usejijangganUse.yu.m_land.m_jangan3,
          shgj.sangguk.m_jangan3,
          usejijanggan.m_jangan.m_jangan3
        ),
        d_jangan1: gil.sanghwa(
          usejijangganUse.yu.d_land.d_jangan1,
          shgj.sangguk.d_jangan1,
          usejijanggan.d_jangan.d_jangan1
        ),
        d_jangan2: gil.sanghwa(
          usejijangganUse.yu.d_land.d_jangan2,
          shgj.sangguk.d_jangan2,
          usejijanggan.d_jangan.d_jangan2
        ),
        d_jangan3: gil.sanghwa(
          usejijangganUse.yu.d_land.d_jangan3,
          shgj.sangguk.d_jangan3,
          usejijanggan.d_jangan.d_jangan3
        ),
        h_jangan1: gil.sanghwa(
          usejijangganUse.yu.h_land.h_jangan1,
          shgj.sangguk.h_jangan1,
          usejijanggan.h_jangan.h_jangan1
        ),
        h_jangan2: gil.sanghwa(
          usejijangganUse.yu.h_land.h_jangan2,
          shgj.sangguk.h_jangan2,
          usejijanggan.h_jangan.h_jangan2
        ),
        h_jangan3: gil.sanghwa(
          usejijangganUse.yu.h_land.h_jangan3,
          shgj.sangguk.h_jangan3,
          usejijanggan.h_jangan.h_jangan3
        ),
      };
      shgj.sang_jae = {
        y_sky: gil.sang_jae("  ", shgj.sangguk.y_sky, usePillar.y_sky),
        // y_land: gil.sang_jae("  ", shgj.sangguk.y_land, usePillar.y_land),
        m_sky: gil.sang_jae("  ", shgj.sangguk.m_sky, usePillar.m_sky),
        //m_land: gil.sang_jae("  ", shgj.sangguk.m_land, usePillar.m_land),
        d_sky: gil.sang_jae("  ", shgj.sangguk.d_sky, usePillar.d_sky),
        //d_land: gil.sang_jae("  ", shgj.sangguk.d_land, usePillar.d_land),
        h_sky: gil.sang_jae("  ", shgj.sangguk.h_sky, usePillar.h_sky),
        // h_land: gil.sang_jae("  ", shgj.sangguk.h_land, usePillar.h_land),
        y_jangan1: gil.sang_jae(
          usejijangganUse.yu.y_land.y_jangan1,
          shgj.sangguk.y_jangan1,
          usejijanggan.y_jangan.y_jangan1
        ),
        y_jangan2: gil.sang_jae(
          usejijangganUse.yu.y_land.y_jangan2,
          shgj.sangguk.y_jangan2,
          usejijanggan.y_jangan.y_jangan2
        ),
        y_jangan3: gil.sang_jae(
          usejijangganUse.yu.y_land.y_jangan3,
          shgj.sangguk.y_jangan3,
          usejijanggan.y_jangan.y_jangan3
        ),
        m_jangan1: gil.sang_jae(
          usejijangganUse.yu.m_land.m_jangan1,
          shgj.sangguk.m_jangan1,
          usejijanggan.m_jangan.m_jangan1
        ),
        m_jangan2: gil.sang_jae(
          usejijangganUse.yu.m_land.m_jangan2,
          shgj.sangguk.m_jangan2,
          usejijanggan.m_jangan.m_jangan2
        ),
        m_jangan3: gil.sang_jae(
          usejijangganUse.yu.m_land.m_jangan3,
          shgj.sangguk.m_jangan3,
          usejijanggan.m_jangan.m_jangan3
        ),
        d_jangan1: gil.sang_jae(
          usejijangganUse.yu.d_land.d_jangan1,
          shgj.sangguk.d_jangan1,
          usejijanggan.d_jangan.d_jangan1
        ),
        d_jangan2: gil.sang_jae(
          usejijangganUse.yu.d_land.d_jangan2,
          shgj.sangguk.d_jangan2,
          usejijanggan.d_jangan.d_jangan2
        ),
        d_jangan3: gil.sang_jae(
          usejijangganUse.yu.d_land.d_jangan3,
          shgj.sangguk.d_jangan3,
          usejijanggan.d_jangan.d_jangan3
        ),
        h_jangan1: gil.sang_jae(
          usejijangganUse.yu.h_land.h_jangan1,
          shgj.sangguk.h_jangan1,
          usejijanggan.h_jangan.h_jangan1
        ),
        h_jangan2: gil.sang_jae(
          usejijangganUse.yu.h_land.h_jangan2,
          shgj.sangguk.h_jangan2,
          usejijanggan.h_jangan.h_jangan2
        ),
        h_jangan3: gil.sang_jae(
          usejijangganUse.yu.h_land.h_jangan3,
          shgj.sangguk.h_jangan3,
          usejijanggan.h_jangan.h_jangan3
        ),
      };
      shgj.sulhwa = {
        y_sky: gil.sulhwa("  ", shgj.sangguk.y_sky, usePillar.y_sky),
        //y_land: gil.sulhwa("  ", shgj.sangguk.y_land, usePillar.y_land),
        m_sky: gil.sulhwa("  ", shgj.sangguk.m_sky, usePillar.m_sky),
        // m_land: gil.sulhwa("  ", shgj.sangguk.m_land, usePillar.m_land),
        d_sky: gil.sulhwa("  ", shgj.sangguk.d_sky, usePillar.d_sky),
        //d_land: gil.sulhwa("  ", shgj.sangguk.d_land, usePillar.d_land),
        h_sky: gil.sulhwa("  ", shgj.sangguk.h_sky, usePillar.h_sky),
        // h_land: gil.sulhwa("  ", shgj.sangguk.h_land, usePillar.h_land),
        y_jangan1: gil.sulhwa(
          usejijangganUse.yu.y_land.y_jangan1,
          shgj.sangguk.y_jangan1,
          usejijanggan.y_jangan.y_jangan1
        ),
        y_jangan2: gil.sulhwa(
          usejijangganUse.yu.y_land.y_jangan2,
          shgj.sangguk.y_jangan2,
          usejijanggan.y_jangan.y_jangan2
        ),
        y_jangan3: gil.sulhwa(
          usejijangganUse.yu.y_land.y_jangan3,
          shgj.sangguk.y_jangan3,
          usejijanggan.y_jangan.y_jangan3
        ),
        m_jangan1: gil.sulhwa(
          usejijangganUse.yu.m_land.m_jangan1,
          shgj.sangguk.m_jangan1,
          usejijanggan.m_jangan.m_jangan1
        ),
        m_jangan2: gil.sulhwa(
          usejijangganUse.yu.m_land.m_jangan2,
          shgj.sangguk.m_jangan2,
          usejijanggan.m_jangan.m_jangan2
        ),
        m_jangan3: gil.sulhwa(
          usejijangganUse.yu.m_land.m_jangan3,
          shgj.sangguk.m_jangan3,
          usejijanggan.m_jangan.m_jangan3
        ),
        d_jangan1: gil.sulhwa(
          usejijangganUse.yu.d_land.d_jangan1,
          shgj.sangguk.d_jangan1,
          usejijanggan.d_jangan.d_jangan1
        ),
        d_jangan2: gil.sulhwa(
          usejijangganUse.yu.d_land.d_jangan2,
          shgj.sangguk.d_jangan2,
          usejijanggan.d_jangan.d_jangan2
        ),
        d_jangan3: gil.sulhwa(
          usejijangganUse.yu.d_land.d_jangan3,
          shgj.sangguk.d_jangan3,
          usejijanggan.d_jangan.d_jangan3
        ),
        h_jangan1: gil.sulhwa(
          usejijangganUse.yu.h_land.h_jangan1,
          shgj.sangguk.h_jangan1,
          usejijanggan.h_jangan.h_jangan1
        ),
        h_jangan2: gil.sulhwa(
          usejijangganUse.yu.h_land.h_jangan2,
          shgj.sangguk.h_jangan2,
          usejijanggan.h_jangan.h_jangan2
        ),
        h_jangan3: gil.sulhwa(
          usejijangganUse.yu.h_land.h_jangan3,
          shgj.sangguk.h_jangan3,
          usejijanggan.h_jangan.h_jangan3
        ),
      };
      shgj.sul_jae = {
        y_sky: gil.sul_jae("  ", shgj.sangguk.y_sky, usePillar.y_sky),
        //y_land: gil.sul_jae("  ", shgj.sangguk.y_land, usePillar.y_land),
        m_sky: gil.sul_jae("  ", shgj.sangguk.m_sky, usePillar.m_sky),
        // m_land: gil.sul_jae("  ", shgj.sangguk.m_land, usePillar.m_land),
        d_sky: gil.sul_jae("  ", shgj.sangguk.d_sky, usePillar.d_sky),
        //d_land: gil.sul_jae("  ", shgj.sangguk.d_land, usePillar.d_land),
        h_sky: gil.sul_jae("  ", shgj.sangguk.h_sky, usePillar.h_sky),
        // h_land: gil.sul_jae("  ", shgj.sangguk.h_land, usePillar.h_land),
        y_jangan1: gil.sul_jae(
          usejijangganUse.yu.y_land.y_jangan1,
          shgj.sangguk.y_jangan1,
          usejijanggan.y_jangan.y_jangan1
        ),
        y_jangan2: gil.sul_jae(
          usejijangganUse.yu.y_land.y_jangan2,
          shgj.sangguk.y_jangan2,
          usejijanggan.y_jangan.y_jangan2
        ),
        y_jangan3: gil.sul_jae(
          usejijangganUse.yu.y_land.y_jangan3,
          shgj.sangguk.y_jangan3,
          usejijanggan.y_jangan.y_jangan3
        ),
        m_jangan1: gil.sul_jae(
          usejijangganUse.yu.m_land.m_jangan1,
          shgj.sangguk.m_jangan1,
          usejijanggan.m_jangan.m_jangan1
        ),
        m_jangan2: gil.sul_jae(
          usejijangganUse.yu.m_land.m_jangan2,
          shgj.sangguk.m_jangan2,
          usejijanggan.m_jangan.m_jangan2
        ),
        m_jangan3: gil.sul_jae(
          usejijangganUse.yu.m_land.m_jangan3,
          shgj.sangguk.m_jangan3,
          usejijanggan.m_jangan.m_jangan3
        ),
        d_jangan1: gil.sul_jae(
          usejijangganUse.yu.d_land.d_jangan1,
          shgj.sangguk.d_jangan1,
          usejijanggan.d_jangan.d_jangan1
        ),
        d_jangan2: gil.sul_jae(
          usejijangganUse.yu.d_land.d_jangan2,
          shgj.sangguk.d_jangan2,
          usejijanggan.d_jangan.d_jangan2
        ),
        d_jangan3: gil.sul_jae(
          usejijangganUse.yu.d_land.d_jangan3,
          shgj.sangguk.d_jangan3,
          usejijanggan.d_jangan.d_jangan3
        ),
        h_jangan1: gil.sul_jae(
          usejijangganUse.yu.h_land.h_jangan1,
          shgj.sangguk.h_jangan1,
          usejijanggan.h_jangan.h_jangan1
        ),
        h_jangan2: gil.sul_jae(
          usejijangganUse.yu.h_land.h_jangan2,
          shgj.sangguk.h_jangan2,
          usejijanggan.h_jangan.h_jangan2
        ),
        h_jangan3: gil.sul_jae(
          usejijangganUse.yu.h_land.h_jangan3,
          shgj.sangguk.h_jangan3,
          usejijanggan.h_jangan.h_jangan3
        ),
      };
      shgj.sang_hap = {
        y_sky: gil.sang_hap("  ", shgj.sangguk.y_sky, usePillar.y_sky),
        // y_land: gil.sang_hap("  ", shgj.sangguk.y_land, usePillar.y_land),
        m_sky: gil.sang_hap("  ", shgj.sangguk.m_sky, usePillar.m_sky),
        //  m_land: gil.sang_hap("  ", shgj.sangguk.m_land, usePillar.m_land),
        d_sky: gil.sang_hap("  ", shgj.sangguk.d_sky, usePillar.d_sky),
        //  d_land: gil.sang_hap("  ", shgj.sangguk.d_land, usePillar.d_land),
        h_sky: gil.sang_hap("  ", shgj.sangguk.h_sky, usePillar.h_sky),
        //  h_land: gil.sang_hap("  ", shgj.sangguk.h_land, usePillar.h_land),
        y_jangan1: gil.sang_hap(
          usejijangganUse.yu.y_land.y_jangan1,
          shgj.sangguk.y_jangan1,
          usejijanggan.y_jangan.y_jangan1
        ),
        y_jangan2: gil.sang_hap(
          usejijangganUse.yu.y_land.y_jangan2,
          shgj.sangguk.y_jangan2,
          usejijanggan.y_jangan.y_jangan2
        ),
        y_jangan3: gil.sang_hap(
          usejijangganUse.yu.y_land.y_jangan3,
          shgj.sangguk.y_jangan3,
          usejijanggan.y_jangan.y_jangan3
        ),
        m_jangan1: gil.sang_hap(
          usejijangganUse.yu.m_land.m_jangan1,
          shgj.sangguk.m_jangan1,
          usejijanggan.m_jangan.m_jangan1
        ),
        m_jangan2: gil.sang_hap(
          usejijangganUse.yu.m_land.m_jangan2,
          shgj.sangguk.m_jangan2,
          usejijanggan.m_jangan.m_jangan2
        ),
        m_jangan3: gil.sang_hap(
          usejijangganUse.yu.m_land.m_jangan3,
          shgj.sangguk.m_jangan3,
          usejijanggan.m_jangan.m_jangan3
        ),
        d_jangan1: gil.sang_hap(
          usejijangganUse.yu.d_land.d_jangan1,
          shgj.sangguk.d_jangan1,
          usejijanggan.d_jangan.d_jangan1
        ),
        d_jangan2: gil.sang_hap(
          usejijangganUse.yu.d_land.d_jangan2,
          shgj.sangguk.d_jangan2,
          usejijanggan.d_jangan.d_jangan2
        ),
        d_jangan3: gil.sang_hap(
          usejijangganUse.yu.d_land.d_jangan3,
          shgj.sangguk.d_jangan3,
          usejijanggan.d_jangan.d_jangan3
        ),
        h_jangan1: gil.sang_hap(
          usejijangganUse.yu.h_land.h_jangan1,
          shgj.sangguk.h_jangan1,
          usejijanggan.h_jangan.h_jangan1
        ),
        h_jangan2: gil.sang_hap(
          usejijangganUse.yu.h_land.h_jangan2,
          shgj.sangguk.h_jangan2,
          usejijanggan.h_jangan.h_jangan2
        ),
        h_jangan3: gil.sang_hap(
          usejijangganUse.yu.h_land.h_jangan3,
          shgj.sangguk.h_jangan3,
          usejijanggan.h_jangan.h_jangan3
        ),
      };
    } else if (gukgubun === "흉격") {
      shgj.sangsin = {
        y_sky: hung.sangsin("  ", shgj.sangguk.y_sky, usePillar.y_sky),
        // y_land: hung.sangsin("  ", shgj.sangguk.y_land, usePillar.y_land),
        m_sky: hung.sangsin("  ", shgj.sangguk.m_sky, usePillar.m_sky),
        //m_land: hung.sangsin("  ", shgj.sangguk.m_land, usePillar.m_land),
        d_sky: hung.sangsin("  ", shgj.sangguk.d_sky, usePillar.d_sky),
        //d_land: hung.sangsin("  ", shgj.sangguk.d_land, usePillar.d_land),
        h_sky: hung.sangsin("  ", shgj.sangguk.h_sky, usePillar.h_sky),
        // h_land: hung.sangsin("  ", shgj.sangguk.h_land, usePillar.h_land),
        y_jangan1: hung.sangsin(
          usejijangganUse.yu.y_land.y_jangan1,
          shgj.sangguk.y_jangan1,
          usejijanggan.y_jangan.y_jangan1
        ),
        y_jangan2: hung.sangsin(
          usejijangganUse.yu.y_land.y_jangan2,
          shgj.sangguk.y_jangan2,
          usejijanggan.y_jangan.y_jangan2
        ),
        y_jangan3: hung.sangsin(
          usejijangganUse.yu.y_land.y_jangan3,
          shgj.sangguk.y_jangan3,
          usejijanggan.y_jangan.y_jangan3
        ),
        m_jangan1: hung.sangsin(
          usejijangganUse.yu.m_land.m_jangan1,
          shgj.sangguk.m_jangan1,
          usejijanggan.m_jangan.m_jangan1
        ),
        m_jangan2: hung.sangsin(
          usejijangganUse.yu.m_land.m_jangan2,
          shgj.sangguk.m_jangan2,
          usejijanggan.m_jangan.m_jangan2
        ),
        m_jangan3: hung.sangsin(
          usejijangganUse.yu.m_land.m_jangan3,
          shgj.sangguk.m_jangan3,
          usejijanggan.m_jangan.m_jangan3
        ),
        d_jangan1: hung.sangsin(
          usejijangganUse.yu.d_land.d_jangan1,
          shgj.sangguk.d_jangan1,
          usejijanggan.d_jangan.d_jangan1
        ),
        d_jangan2: hung.sangsin(
          usejijangganUse.yu.d_land.d_jangan2,
          shgj.sangguk.d_jangan2,
          usejijanggan.d_jangan.d_jangan2
        ),
        d_jangan3: hung.sangsin(
          usejijangganUse.yu.d_land.d_jangan3,
          shgj.sangguk.d_jangan3,
          usejijanggan.d_jangan.d_jangan3
        ),
        h_jangan1: hung.sangsin(
          usejijangganUse.yu.h_land.h_jangan1,
          shgj.sangguk.h_jangan1,
          usejijanggan.h_jangan.h_jangan1
        ),
        h_jangan2: hung.sangsin(
          usejijangganUse.yu.h_land.h_jangan2,
          shgj.sangguk.h_jangan2,
          usejijanggan.h_jangan.h_jangan2
        ),
        h_jangan3: hung.sangsin(
          usejijangganUse.yu.h_land.h_jangan3,
          shgj.sangguk.h_jangan3,
          usejijanggan.h_jangan.h_jangan3
        ),
      };

      shgj.sangsingisin = {
        y_sky: hung.sangsingisin("  ", shgj.sangguk.y_sky, usePillar.y_sky),
        // y_land: hung.sangsingisin("  ", shgj.sangguk.y_land, usePillar.y_land),
        m_sky: hung.sangsingisin("  ", shgj.sangguk.m_sky, usePillar.m_sky),
        // m_land: hung.sangsingisin("  ", shgj.sangguk.m_land, usePillar.m_land),
        d_sky: hung.sangsingisin("  ", shgj.sangguk.d_sky, usePillar.d_sky),
        // d_land: hung.sangsingisin("  ", shgj.sangguk.d_land, usePillar.d_land),
        h_sky: hung.sangsingisin("  ", shgj.sangguk.h_sky, usePillar.h_sky),
        //h_land: hung.sangsingisin("  ", shgj.sangguk.h_land, usePillar.h_land),
        y_jangan1: hung.sangsingisin(
          usejijangganUse.yu.y_land.y_jangan1,
          shgj.sangguk.y_jangan1,
          usejijanggan.y_jangan.y_jangan1
        ),
        y_jangan2: hung.sangsingisin(
          usejijangganUse.yu.y_land.y_jangan2,
          shgj.sangguk.y_jangan2,
          usejijanggan.y_jangan.y_jangan2
        ),
        y_jangan3: hung.sangsingisin(
          usejijangganUse.yu.y_land.y_jangan3,
          shgj.sangguk.y_jangan3,
          usejijanggan.y_jangan.y_jangan3
        ),
        m_jangan1: hung.sangsingisin(
          usejijangganUse.yu.m_land.m_jangan1,
          shgj.sangguk.m_jangan1,
          usejijanggan.m_jangan.m_jangan1
        ),
        m_jangan2: hung.sangsingisin(
          usejijangganUse.yu.m_land.m_jangan2,
          shgj.sangguk.m_jangan2,
          usejijanggan.m_jangan.m_jangan2
        ),
        m_jangan3: hung.sangsingisin(
          usejijangganUse.yu.m_land.m_jangan3,
          shgj.sangguk.m_jangan3,
          usejijanggan.m_jangan.m_jangan3
        ),
        d_jangan1: hung.sangsingisin(
          usejijangganUse.yu.d_land.d_jangan1,
          shgj.sangguk.d_jangan1,
          usejijanggan.d_jangan.d_jangan1
        ),
        d_jangan2: hung.sangsingisin(
          usejijangganUse.yu.d_land.d_jangan2,
          shgj.sangguk.d_jangan2,
          usejijanggan.d_jangan.d_jangan2
        ),
        d_jangan3: hung.sangsingisin(
          usejijangganUse.yu.d_land.d_jangan3,
          shgj.sangguk.d_jangan3,
          usejijanggan.d_jangan.d_jangan3
        ),
        h_jangan1: hung.sangsingisin(
          usejijangganUse.yu.h_land.h_jangan1,
          shgj.sangguk.h_jangan1,
          usejijanggan.h_jangan.h_jangan1
        ),
        h_jangan2: hung.sangsingisin(
          usejijangganUse.yu.h_land.h_jangan2,
          shgj.sangguk.h_jangan2,
          usejijanggan.h_jangan.h_jangan2
        ),
        h_jangan3: hung.sangsingisin(
          usejijangganUse.yu.h_land.h_jangan3,
          shgj.sangguk.h_jangan3,
          usejijanggan.h_jangan.h_jangan3
        ),
      };
      shgj.gusin = {
        y_sky: hung.gusin("  ", shgj.sangguk.y_sky, usePillar.y_sky),
        //y_land: hung.gusin("  ", shgj.sangguk.y_land, usePillar.y_land),
        m_sky: hung.gusin("  ", shgj.sangguk.m_sky, usePillar.m_sky),
        // m_land: hung.gusin("  ", shgj.sangguk.m_land, usePillar.m_land),
        d_sky: hung.gusin("  ", shgj.sangguk.d_sky, usePillar.d_sky),
        // d_land: hung.gusin("  ", shgj.sangguk.d_land, usePillar.d_land),
        h_sky: hung.gusin("  ", shgj.sangguk.h_sky, usePillar.h_sky),
        //  h_land: hung.gusin("  ", shgj.sangguk.h_land, usePillar.h_land),
        y_jangan1: hung.gusin(
          usejijangganUse.yu.y_land.y_jangan1,
          shgj.sangguk.y_jangan1,
          usejijanggan.y_jangan.y_jangan1
        ),
        y_jangan2: hung.gusin(
          usejijangganUse.yu.y_land.y_jangan2,
          shgj.sangguk.y_jangan2,
          usejijanggan.y_jangan.y_jangan2
        ),
        y_jangan3: hung.gusin(
          usejijangganUse.yu.y_land.y_jangan3,
          shgj.sangguk.y_jangan3,
          usejijanggan.y_jangan.y_jangan3
        ),
        m_jangan1: hung.gusin(
          usejijangganUse.yu.m_land.m_jangan1,
          shgj.sangguk.m_jangan1,
          usejijanggan.m_jangan.m_jangan1
        ),
        m_jangan2: hung.gusin(
          usejijangganUse.yu.m_land.m_jangan2,
          shgj.sangguk.m_jangan2,
          usejijanggan.m_jangan.m_jangan2
        ),
        m_jangan3: hung.gusin(
          usejijangganUse.yu.m_land.m_jangan3,
          shgj.sangguk.m_jangan3,
          usejijanggan.m_jangan.m_jangan3
        ),
        d_jangan1: hung.gusin(
          usejijangganUse.yu.d_land.d_jangan1,
          shgj.sangguk.d_jangan1,
          usejijanggan.d_jangan.d_jangan1
        ),
        d_jangan2: hung.gusin(
          usejijangganUse.yu.d_land.d_jangan2,
          shgj.sangguk.d_jangan2,
          usejijanggan.d_jangan.d_jangan2
        ),
        d_jangan3: hung.gusin(
          usejijangganUse.yu.d_land.d_jangan3,
          shgj.sangguk.d_jangan3,
          usejijanggan.d_jangan.d_jangan3
        ),
        h_jangan1: hung.gusin(
          usejijangganUse.yu.h_land.h_jangan1,
          shgj.sangguk.h_jangan1,
          usejijanggan.h_jangan.h_jangan1
        ),
        h_jangan2: hung.gusin(
          usejijangganUse.yu.h_land.h_jangan2,
          shgj.sangguk.h_jangan2,
          usejijanggan.h_jangan.h_jangan2
        ),
        h_jangan3: hung.gusin(
          usejijangganUse.yu.h_land.h_jangan3,
          shgj.sangguk.h_jangan3,
          usejijanggan.h_jangan.h_jangan3
        ),
      };
      shgj.gusingisin = {
        y_sky: hung.gusingisin("  ", shgj.sangguk.y_sky, usePillar.y_sky),
        // y_land: hung.gusingisin("  ", shgj.sangguk.y_land, usePillar.y_land),
        m_sky: hung.gusingisin("  ", shgj.sangguk.m_sky, usePillar.m_sky),
        // m_land: hung.gusingisin("  ", shgj.sangguk.m_land, usePillar.m_land),
        d_sky: hung.gusingisin("  ", shgj.sangguk.d_sky, usePillar.d_sky),
        //  d_land: hung.gusingisin("  ", shgj.sangguk.d_land, usePillar.d_land),
        h_sky: hung.gusingisin("  ", shgj.sangguk.h_sky, usePillar.h_sky),
        //   h_land: hung.gusingisin("  ", shgj.sangguk.h_land, usePillar.h_land),
        y_jangan1: hung.gusingisin(
          usejijangganUse.yu.y_land.y_jangan1,
          shgj.sangguk.y_jangan1,
          usejijanggan.y_jangan.y_jangan1
        ),
        y_jangan2: hung.gusingisin(
          usejijangganUse.yu.y_land.y_jangan2,
          shgj.sangguk.y_jangan2,
          usejijanggan.y_jangan.y_jangan2
        ),
        y_jangan3: hung.gusingisin(
          usejijangganUse.yu.y_land.y_jangan3,
          shgj.sangguk.y_jangan3,
          usejijanggan.y_jangan.y_jangan3
        ),
        m_jangan1: hung.gusingisin(
          usejijangganUse.yu.m_land.m_jangan1,
          shgj.sangguk.m_jangan1,
          usejijanggan.m_jangan.m_jangan1
        ),
        m_jangan2: hung.gusingisin(
          usejijangganUse.yu.m_land.m_jangan2,
          shgj.sangguk.m_jangan2,
          usejijanggan.m_jangan.m_jangan2
        ),
        m_jangan3: hung.gusingisin(
          usejijangganUse.yu.m_land.m_jangan3,
          shgj.sangguk.m_jangan3,
          usejijanggan.m_jangan.m_jangan3
        ),
        d_jangan1: hung.gusingisin(
          usejijangganUse.yu.d_land.d_jangan1,
          shgj.sangguk.d_jangan1,
          usejijanggan.d_jangan.d_jangan1
        ),
        d_jangan2: hung.gusingisin(
          usejijangganUse.yu.d_land.d_jangan2,
          shgj.sangguk.d_jangan2,
          usejijanggan.d_jangan.d_jangan2
        ),
        d_jangan3: hung.gusingisin(
          usejijangganUse.yu.d_land.d_jangan3,
          shgj.sangguk.d_jangan3,
          usejijanggan.d_jangan.d_jangan3
        ),
        h_jangan1: hung.gusingisin(
          usejijangganUse.yu.h_land.h_jangan1,
          shgj.sangguk.h_jangan1,
          usejijanggan.h_jangan.h_jangan1
        ),
        h_jangan2: hung.gusingisin(
          usejijangganUse.yu.h_land.h_jangan2,
          shgj.sangguk.h_jangan2,
          usejijanggan.h_jangan.h_jangan2
        ),
        h_jangan3: hung.gusingisin(
          usejijangganUse.yu.h_land.h_jangan3,
          shgj.sangguk.h_jangan3,
          usejijanggan.h_jangan.h_jangan3
        ),
      };
      shgj.sanghwa = {
        y_sky: hung.sanghwa("  ", useYuksin.y_sky, usePillar.y_sky),
        //y_land: hung.sanghwa("  ", useYuksin.y_land, usePillar.y_land),
        m_sky: hung.sanghwa("  ", useYuksin.m_sky, usePillar.m_sky),
        //m_land: hung.sanghwa("  ", useYuksin.m_land, usePillar.m_land),
        d_sky: hung.sanghwa("  ", useYuksin.d_sky, usePillar.d_sky),
        // d_land: hung.sanghwa("  ", useYuksin.d_land, usePillar.d_land),
        h_sky: hung.sanghwa("  ", useYuksin.h_sky, usePillar.h_sky),
        // h_land: hung.sanghwa("  ", useYuksin.h_land, usePillar.h_land),
        y_jangan1: hung.sanghwa(
          usejijangganUse.yu.y_land.y_jangan1,
          useYuksin.y_jangan.y_jangan1,
          usejijanggan.y_jangan.y_jangan1
        ),
        y_jangan2: hung.sanghwa(
          usejijangganUse.yu.y_land.y_jangan2,
          useYuksin.y_jangan.y_jangan2,
          usejijanggan.y_jangan.y_jangan2
        ),
        y_jangan3: hung.sanghwa(
          usejijangganUse.yu.y_land.y_jangan3,
          useYuksin.y_jangan.y_jangan3,
          usejijanggan.y_jangan.y_jangan3
        ),
        m_jangan1: hung.sanghwa(
          usejijangganUse.yu.m_land.m_jangan1,
          useYuksin.m_jangan.m_jangan1,
          usejijanggan.m_jangan.m_jangan1
        ),
        m_jangan2: hung.sanghwa(
          usejijangganUse.yu.m_land.m_jangan2,
          useYuksin.m_jangan.m_jangan2,
          usejijanggan.m_jangan.m_jangan2
        ),
        m_jangan3: hung.sanghwa(
          usejijangganUse.yu.m_land.m_jangan3,
          useYuksin.m_jangan.m_jangan3,
          usejijanggan.m_jangan.m_jangan3
        ),
        d_jangan1: hung.sanghwa(
          usejijangganUse.yu.d_land.d_jangan1,
          useYuksin.d_jangan.d_jangan1,
          usejijanggan.d_jangan.d_jangan1
        ),
        d_jangan2: hung.sanghwa(
          usejijangganUse.yu.d_land.d_jangan2,
          useYuksin.d_jangan.d_jangan2,
          usejijanggan.d_jangan.d_jangan2
        ),
        d_jangan3: hung.sanghwa(
          usejijangganUse.yu.d_land.d_jangan3,
          useYuksin.d_jangan.d_jangan3,
          usejijanggan.d_jangan.d_jangan3
        ),
        h_jangan1: hung.sanghwa(
          usejijangganUse.yu.h_land.h_jangan1,
          useYuksin.h_jangan.h_jangan1,
          usejijanggan.h_jangan.h_jangan1
        ),
        h_jangan2: hung.sanghwa(
          usejijangganUse.yu.h_land.h_jangan2,
          useYuksin.h_jangan.h_jangan2,
          usejijanggan.h_jangan.h_jangan2
        ),
        h_jangan3: hung.sanghwa(
          usejijangganUse.yu.h_land.h_jangan3,
          useYuksin.h_jangan.h_jangan3,
          usejijanggan.h_jangan.h_jangan3
        ),
      };
      shgj.sulhwa = {
        y_sky: hung.sulhwa("  ", useYuksin.y_sky, usePillar.y_sky),
        // y_land: hung.sulhwa("  ", useYuksin.y_land, usePillar.y_land),
        m_sky: hung.sulhwa("  ", useYuksin.m_sky, usePillar.m_sky),
        //  m_land: hung.sulhwa("  ", useYuksin.m_land, usePillar.m_land),
        d_sky: hung.sulhwa("  ", useYuksin.d_sky, usePillar.d_sky),
        // d_land: hung.sulhwa("  ", useYuksin.d_land, usePillar.d_land),
        h_sky: hung.sulhwa("  ", useYuksin.h_sky, usePillar.h_sky),
        //  h_land: hung.sulhwa("  ", useYuksin.h_land, usePillar.h_land),
        y_jangan1: hung.sulhwa(
          usejijangganUse.yu.y_land.y_jangan1,
          useYuksin.y_jangan.y_jangan1,
          usejijanggan.y_jangan.y_jangan1
        ),
        y_jangan2: hung.sulhwa(
          usejijangganUse.yu.y_land.y_jangan2,
          useYuksin.y_jangan.y_jangan2,
          usejijanggan.y_jangan.y_jangan2
        ),
        y_jangan3: hung.sulhwa(
          usejijangganUse.yu.y_land.y_jangan3,
          useYuksin.y_jangan.y_jangan3,
          usejijanggan.y_jangan.y_jangan3
        ),
        m_jangan1: hung.sulhwa(
          usejijangganUse.yu.m_land.m_jangan1,
          useYuksin.m_jangan.m_jangan1,
          usejijanggan.m_jangan.m_jangan1
        ),
        m_jangan2: hung.sulhwa(
          usejijangganUse.yu.m_land.m_jangan2,
          useYuksin.m_jangan.m_jangan2,
          usejijanggan.m_jangan.m_jangan2
        ),
        m_jangan3: hung.sulhwa(
          usejijangganUse.yu.m_land.m_jangan3,
          useYuksin.m_jangan.m_jangan3,
          usejijanggan.m_jangan.m_jangan3
        ),
        d_jangan1: hung.sulhwa(
          usejijangganUse.yu.d_land.d_jangan1,
          useYuksin.d_jangan.d_jangan1,
          usejijanggan.d_jangan.d_jangan1
        ),
        d_jangan2: hung.sulhwa(
          usejijangganUse.yu.d_land.d_jangan2,
          useYuksin.d_jangan.d_jangan2,
          usejijanggan.d_jangan.d_jangan2
        ),
        d_jangan3: hung.sulhwa(
          usejijangganUse.yu.d_land.d_jangan3,
          useYuksin.d_jangan.d_jangan3,
          usejijanggan.d_jangan.d_jangan3
        ),
        h_jangan1: hung.sulhwa(
          usejijangganUse.yu.h_land.h_jangan1,
          useYuksin.h_jangan.h_jangan1,
          usejijanggan.h_jangan.h_jangan1
        ),
        h_jangan2: hung.sulhwa(
          usejijangganUse.yu.h_land.h_jangan2,
          useYuksin.h_jangan.h_jangan2,
          usejijanggan.h_jangan.h_jangan2
        ),
        h_jangan3: hung.sulhwa(
          usejijangganUse.yu.h_land.h_jangan3,
          useYuksin.h_jangan.h_jangan3,
          usejijanggan.h_jangan.h_jangan3
        ),
      };
      shgj.sul_jae = {
        y_sky: hung.sul_jae("  ", useYuksin.y_sky, usePillar.y_sky),
        //  y_land: hung.sul_jae("  ", useYuksin.y_land, usePillar.y_land),
        m_sky: hung.sul_jae("  ", useYuksin.m_sky, usePillar.m_sky),
        //   m_land: hung.sul_jae("  ", useYuksin.m_land, usePillar.m_land),
        d_sky: hung.sul_jae("  ", useYuksin.d_sky, usePillar.d_sky),
        //  d_land: hung.sul_jae("  ", useYuksin.d_land, usePillar.d_land),
        h_sky: hung.sul_jae("  ", useYuksin.h_sky, usePillar.h_sky),
        //  h_land: hung.sul_jae("  ", useYuksin.h_land, usePillar.h_land),
        y_jangan1: hung.sul_jae(
          usejijangganUse.yu.y_land.y_jangan1,
          useYuksin.y_jangan.y_jangan1,
          usejijanggan.y_jangan.y_jangan1
        ),
        y_jangan2: hung.sul_jae(
          usejijangganUse.yu.y_land.y_jangan2,
          useYuksin.y_jangan.y_jangan2,
          usejijanggan.y_jangan.y_jangan2
        ),
        y_jangan3: hung.sul_jae(
          usejijangganUse.yu.y_land.y_jangan3,
          useYuksin.y_jangan.y_jangan3,
          usejijanggan.y_jangan.y_jangan3
        ),
        m_jangan1: hung.sul_jae(
          usejijangganUse.yu.m_land.m_jangan1,
          useYuksin.m_jangan.m_jangan1,
          usejijanggan.m_jangan.m_jangan1
        ),
        m_jangan2: hung.sul_jae(
          usejijangganUse.yu.m_land.m_jangan2,
          useYuksin.m_jangan.m_jangan2,
          usejijanggan.m_jangan.m_jangan2
        ),
        m_jangan3: hung.sul_jae(
          usejijangganUse.yu.m_land.m_jangan3,
          useYuksin.m_jangan.m_jangan3
        ),
        d_jangan1: hung.sul_jae(
          usejijangganUse.yu.d_land.d_jangan1,
          useYuksin.d_jangan.d_jangan1,
          usejijanggan.d_jangan.d_jangan1
        ),
        d_jangan2: hung.sul_jae(
          usejijangganUse.yu.d_land.d_jangan2,
          useYuksin.d_jangan.d_jangan2,
          usejijanggan.d_jangan.d_jangan2
        ),
        d_jangan3: hung.sul_jae(
          usejijangganUse.yu.d_land.d_jangan3,
          useYuksin.d_jangan.d_jangan3,
          usejijanggan.d_jangan.d_jangan3
        ),
        h_jangan1: hung.sul_jae(
          usejijangganUse.yu.h_land.h_jangan1,
          useYuksin.h_jangan.h_jangan1,
          usejijanggan.h_jangan.h_jangan1
        ),
        h_jangan2: hung.sul_jae(
          usejijangganUse.yu.h_land.h_jangan2,
          useYuksin.h_jangan.h_jangan2,
          usejijanggan.h_jangan.h_jangan2
        ),
        h_jangan3: hung.sul_jae(
          usejijangganUse.yu.h_land.h_jangan3,
          useYuksin.h_jangan.h_jangan3,
          usejijanggan.h_jangan.h_jangan3
        ),
      };
      if (useGyouk === "상관격" || useGyouk === "편관격") {
        shgj.sul_hap = {
          y_sky: hung.sul_hap("  ", useYuksin.y_sky, usePillar.y_sky),
          // y_land: hung.sul_hap("  ", useYuksin.y_land, usePillar.y_land),
          m_sky: hung.sul_hap("  ", useYuksin.m_sky, usePillar.m_sky),
          //   m_land: hung.sul_hap("  ", useYuksin.m_land, usePillar.m_land),
          d_sky: hung.sul_hap("  ", useYuksin.d_sky, usePillar.d_sky),
          // d_land: hung.sul_hap("  ", useYuksin.d_land, usePillar.d_land),
          h_sky: hung.sul_hap("  ", useYuksin.h_sky, usePillar.h_sky),
          // h_land: hung.sul_hap("  ", useYuksin.h_land, usePillar.h_land),
          y_jangan1: hung.sul_hap(
            usejijangganUse.yu.y_land.y_jangan1,
            useYuksin.y_jangan.y_jangan1,
            usejijanggan.y_jangan.y_jangan1
          ),
          y_jangan2: hung.sul_hap(
            usejijangganUse.yu.y_land.y_jangan2,
            useYuksin.y_jangan.y_jangan2,
            usejijanggan.y_jangan.y_jangan2
          ),
          y_jangan3: hung.sul_hap(
            usejijangganUse.yu.y_land.y_jangan3,
            useYuksin.y_jangan.y_jangan3,
            usejijanggan.y_jangan.y_jangan3
          ),
          m_jangan1: hung.sul_hap(
            usejijangganUse.yu.m_land.m_jangan1,
            useYuksin.m_jangan.m_jangan1,
            usejijanggan.m_jangan.m_jangan1
          ),
          m_jangan2: hung.sul_hap(
            usejijangganUse.yu.m_land.m_jangan2,
            useYuksin.m_jangan.m_jangan2,
            usejijanggan.m_jangan.m_jangan2
          ),
          m_jangan3: hung.sul_hap(
            usejijangganUse.yu.m_land.m_jangan3,
            useYuksin.m_jangan.m_jangan3,
            usejijanggan.m_jangan.m_jangan3
          ),
          d_jangan1: hung.sul_hap(
            usejijangganUse.yu.d_land.d_jangan1,
            useYuksin.d_jangan.d_jangan1,
            usejijanggan.d_jangan.d_jangan1
          ),
          d_jangan2: hung.sul_hap(
            usejijangganUse.yu.d_land.d_jangan2,
            useYuksin.d_jangan.d_jangan2,
            usejijanggan.d_jangan.d_jangan2
          ),
          d_jangan3: hung.sul_hap(
            usejijangganUse.yu.d_land.d_jangan3,
            useYuksin.d_jangan.d_jangan3,
            usejijanggan.d_jangan.d_jangan3
          ),
          h_jangan1: hung.sul_hap(
            usejijangganUse.yu.h_land.h_jangan1,
            useYuksin.h_jangan.h_jangan1,
            usejijanggan.h_jangan.h_jangan1
          ),
          h_jangan2: hung.sul_hap(
            usejijangganUse.yu.h_land.h_jangan2,
            useYuksin.h_jangan.h_jangan2,
            usejijanggan.h_jangan.h_jangan2
          ),
          h_jangan3: hung.sul_hap(
            usejijangganUse.yu.h_land.h_jangan3,
            useYuksin.h_jangan.h_jangan3,
            usejijanggan.h_jangan.h_jangan3
          ),
        };
      }
      shgj.yido = {
        y_sky: hung.yido(
          "  ",
          usePillar.y_sky,
          usePillar.m_sky,
          usePillar.d_sky,
          usePillar.h_sky,
          "  ",
          usePillar.y_sky
        ),
        /* y_land: hung.yido(
          "  ",
          usePillar.y_sky,
          usePillar.m_sky,
          usePillar.d_sky,
          usePillar.h_sky,
          "  ",
          usePillar.y_land
        ),*/
        m_sky: hung.yido(
          "  ",
          usePillar.y_sky,
          usePillar.m_sky,
          usePillar.d_sky,
          usePillar.h_sky,
          "  ",
          usePillar.m_sky
        ),
        /* m_land: hung.yido(
          "  ",
          usePillar.y_sky,
          usePillar.m_sky,
          usePillar.d_sky,
          usePillar.h_sky,
          "  ",
          usePillar.m_land
        ),*/
        d_sky: hung.yido(
          "  ",
          usePillar.y_sky,
          usePillar.m_sky,
          usePillar.d_sky,
          usePillar.h_sky,
          "  ",
          usePillar.d_sky
        ),
        /* d_land: hung.yido(
          "  ",
          usePillar.y_sky,
          usePillar.m_sky,
          usePillar.d_sky,
          usePillar.h_sky,
          "  ",
          usePillar.d_land
        ),*/
        h_sky: hung.yido(
          "  ",
          usePillar.y_sky,
          usePillar.m_sky,
          usePillar.d_sky,
          usePillar.h_sky,
          "  ",
          usePillar.h_sky
        ),
        /*h_land: hung.yido(
          "  ",
          usePillar.y_sky,
          usePillar.m_sky,
          usePillar.d_sky,
          usePillar.h_sky,
          "  ",
          usePillar.h_land
        ),*/
        y_jangan1: hung.yido(
          "  ",
          usePillar.y_sky,
          usePillar.m_sky,
          usePillar.d_sky,
          usePillar.h_sky,
          useBasicFunc.rootDayJiral.y_land.y_jangan1,
          usejijanggan.y_jangan.y_jangan1
        ),
        y_jangan2: hung.yido(
          "  ",
          usePillar.y_sky,
          usePillar.m_sky,
          usePillar.d_sky,
          usePillar.h_sky,
          useBasicFunc.rootDayJiral.y_land.y_jangan2,
          usejijanggan.y_jangan.y_jangan2
        ),
        y_jangan3: hung.yido(
          "  ",
          usePillar.y_sky,
          usePillar.m_sky,
          usePillar.d_sky,
          usePillar.h_sky,
          "  ",
          usejijanggan.y_jangan.y_jangan3
        ),
        m_jangan1: hung.yido(
          "  ",
          usePillar.y_sky,
          usePillar.m_sky,
          usePillar.d_sky,
          usePillar.h_sky,
          useBasicFunc.rootDayJiral.m_land.m_jangan1,
          usejijanggan.m_jangan.m_jangan1
        ),
        m_jangan2: hung.yido(
          "  ",
          usePillar.y_sky,
          usePillar.m_sky,
          usePillar.d_sky,
          usePillar.h_sky,
          useBasicFunc.rootDayJiral.m_land.m_jangan2,
          usejijanggan.m_jangan.m_jangan2
        ),
        m_jangan3: hung.yido(
          "  ",
          usePillar.y_sky,
          usePillar.m_sky,
          usePillar.d_sky,
          usePillar.h_sky,
          "  ",
          usejijanggan.m_jangan.m_jangan3
        ),
        d_jangan1: hung.yido(
          "  ",
          usePillar.y_sky,
          usePillar.m_sky,
          usePillar.d_sky,
          usePillar.h_sky,
          useBasicFunc.rootDayJiral.d_land.d_jangan1,
          usejijanggan.d_jangan.d_jangan1
        ),
        d_jangan2: hung.yido(
          "  ",
          usePillar.y_sky,
          usePillar.m_sky,
          usePillar.d_sky,
          usePillar.h_sky,
          useBasicFunc.rootDayJiral.d_land.d_jangan2,
          usejijanggan.d_jangan.d_jangan2
        ),
        d_jangan3: hung.yido(
          "  ",
          usePillar.y_sky,
          usePillar.m_sky,
          usePillar.d_sky,
          usePillar.h_sky,
          "  ",
          usejijanggan.d_jangan.d_jangan3
        ),
        h_jangan1: hung.yido(
          "  ",
          usePillar.y_sky,
          usePillar.m_sky,
          usePillar.d_sky,
          usePillar.h_sky,
          useBasicFunc.rootDayJiral.h_land.h_jangan1
        ),
        h_jangan2: hung.yido(
          "  ",
          usePillar.y_sky,
          usePillar.m_sky,
          usePillar.d_sky,
          usePillar.h_sky,
          useBasicFunc.rootDayJiral.h_land.h_jangan2,
          usejijanggan.h_jangan.h_jangan2
        ),
        h_jangan3: hung.yido(
          "  ",
          usePillar.y_sky,
          usePillar.m_sky,
          usePillar.d_sky,
          usePillar.h_sky,
          "  ",
          usejijanggan.h_jangan.h_jangan3
        ),
      };
    }
    useShgj = shgj;

    resolve("");
  }).catch((error) => {
    console.log(error);
    return error;
});
};
module.exports = gungShgjFunc;
