
/**
 * 조화 유무
 * @returns Y/N
 */
exports.johwaYN = () => {
    let pillarSky = [
        usePillar.y_sky,
        usePillar.m_sky,
        usePillar.d_sky,
        usePillar.h_sky,
      ];
      let johwa1='';
      let johwa2='';
      if (
        usePillar.m_land === '해' ||
        usePillar.m_land === '자' ||
        usePillar.m_land === '축'
      ) {
        johwa1='신'
        johwa2='경'
      } else if (
        usePillar.m_land === '인' ||
        usePillar.m_land === '묘' ||
        usePillar.m_land === '진'
      ) {
        johwa1='계'
        johwa2='임'
      } else if (
        usePillar.m_land === '사' ||
        usePillar.m_land === '오' ||
        usePillar.m_land === '미'
      ) {
        johwa1='갑'
        johwa2='을'
      } else if (
        usePillar.m_land === '신' ||
        usePillar.m_land === '유' ||
        usePillar.m_land === '술'
      ) {
        johwa1='무'
        johwa2='기'
      }
      let result = 'N'
      for (let i = 0 ; i<pillarSky.length ; i++){
          if(johwa1===pillarSky[i]||johwa2===pillarSky[i]){
            result="Y"
          }
      }
      return result;
  }

  /**
   * 현재 유무
   * @returns Y/N
   */
  exports.nowYN = () => {
    let pillarSky = [
        usePillar.y_sky,
        usePillar.m_sky,
        usePillar.d_sky,
        usePillar.h_sky,
      ];
      let now='';
      if (
        usePillar.m_land === '해' ||
        usePillar.m_land === '자' ||
        usePillar.m_land === '축'
      ) {
        now='무'
      } else if (
        usePillar.m_land === '인' ||
        usePillar.m_land === '묘' ||
        usePillar.m_land === '진'
      ) {
        now='기'
      } else if (
        usePillar.m_land === '사' ||
        usePillar.m_land === '오' ||
        usePillar.m_land === '미'
      ) {
        now='무'
      } else if (
        usePillar.m_land === '신' ||
        usePillar.m_land === '유' ||
        usePillar.m_land === '술'
      ) {
        now='기'
      }
      let result = 'N'
      for (let i = 0 ; i<pillarSky.length ; i++){
          if(now===pillarSky[i]){
            result="Y"
          }
      }
      return result;
  }

  /**
   * 미래 유무
   * @returns Y/N
   */
   exports.fuctureYN = () => {
    let pillarSky = [
        usePillar.y_sky,
        usePillar.m_sky,
        usePillar.d_sky,
        usePillar.h_sky,
      ];
      let future='';
      if (
        usePillar.m_land === '해' ||
        usePillar.m_land === '자' ||
        usePillar.m_land === '축'
      ) {
        future='병'
      } else if (
        usePillar.m_land === '인' ||
        usePillar.m_land === '묘' ||
        usePillar.m_land === '진'
      ) {
        future='병'
      } else if (
        usePillar.m_land === '사' ||
        usePillar.m_land === '오' ||
        usePillar.m_land === '미'
      ) {
        future='인'
      } else if (
        usePillar.m_land === '신' ||
        usePillar.m_land === '유' ||
        usePillar.m_land === '술'
      ) {
        future='임'
      }
      let result = 'N'
      for (let i = 0 ; i<pillarSky.length ; i++){
          if(future===pillarSky[i]){
            result="Y"
          }
      }
      return result;
  }

    /**
   * 인복 유무
   * @returns Y/N
   */
     exports.peopleYN = () => {
        let pillarSky = [
            usePillar.y_sky,
            usePillar.m_sky,
            usePillar.d_sky,
            usePillar.h_sky,
          ];
          let future='';
          if (
            usePillar.m_land === '해' ||
            usePillar.m_land === '자' ||
            usePillar.m_land === '축'
          ) {
            future='병'
          } else if (
            usePillar.m_land === '인' ||
            usePillar.m_land === '묘' ||
            usePillar.m_land === '진'
          ) {
            future='병'
          } else if (
            usePillar.m_land === '사' ||
            usePillar.m_land === '오' ||
            usePillar.m_land === '미'
          ) {
            future='인'
          } else if (
            usePillar.m_land === '신' ||
            usePillar.m_land === '유' ||
            usePillar.m_land === '술'
          ) {
            future='임'
          }
          let result = 'N'
          for (let i = 0 ; i<pillarSky.length ; i++){
              if(future===pillarSky[i]){
                result="Y"
              }
          }
          return result;
      }

          /**
   * 돈복 유무
   * @returns Y/N
   */
     exports.peopleYN = () => {
        let pillarSky = [
            usePillar.y_sky,
            usePillar.m_sky,
            usePillar.d_sky,
            usePillar.h_sky,
          ];
          let money='';
          if (
            usePillar.m_land === '해' ||
            usePillar.m_land === '자' ||
            usePillar.m_land === '축'
          ) {
            money='인'
          } else if (
            usePillar.m_land === '인' ||
            usePillar.m_land === '묘' ||
            usePillar.m_land === '진'
          ) {
            money='유'
          } else if (
            usePillar.m_land === '사' ||
            usePillar.m_land === '오' ||
            usePillar.m_land === '미'
          ) {
            money='신'
          } else if (
            usePillar.m_land === '신' ||
            usePillar.m_land === '유' ||
            usePillar.m_land === '술'
          ) {
            money='묘'
          }
          let result = 'N'
          for (let i = 0 ; i<pillarSky.length ; i++){
              if(money===pillarSky[i]){
                result="Y"
              }
          }
          return result;
      }