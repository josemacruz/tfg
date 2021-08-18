const formatClassname = (color, type) => {
  const colorMode = type === 'COLOR';
  switch (color?.toUpperCase() ?? '#2B334A') {
    case '#577EE8':
      return colorMode ? 'color1' : 'text1';
    case '#ACD356':
      return colorMode ? 'color2' : 'text2';
    case '#E12C50':
      return colorMode ? 'color3' : 'text3';
    case '#2B334A':
      return colorMode ? 'color4' : 'text4';
    case '#FC381D':
      return colorMode ? 'color5' : 'text5';
    case '#F1AF00':
      return colorMode ? 'color6' : 'text6';
    case '#00D3A4':
      return colorMode ? 'color7' : 'text7';
    case '#7B144D':
      return colorMode ? 'color8' : 'text8';
    case '#C039D5':
      return colorMode ? 'color9' : 'text9';
    case '#0F51A5':
      return colorMode ? 'color10' : 'text10';
    case '#40DCFF':
      return colorMode ? 'color11' : 'text11';
    case '#0A2D53':
      return colorMode ? 'color12' : 'text12';
    case '#E8E8E8':
      return colorMode ? 'color14' : 'text14';
    default:
      return colorMode ? 'color13' : 'text13';
  }
};

export default formatClassname;
