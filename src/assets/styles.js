import glamorous from 'glamorous-native';

const flexCenterView = glamorous.view({
  justifyContent: 'center',
  alignItems: 'center',
});

const colors = {
  lightBlue: '#3498db',
  blue: '#0366d6',
  black: '#000000',
  primaryDark: '#262626',
  grey: '#bbb',
  greyDarkest: '#808080',
  greyBlue: '#6a737d',
  greyDark: '#999',
  greyMid: '#d1d5da',
  greyLight: '#f1f1f1',
  greyMidLight: '#f6f8fa',
  greyVeryLight: '#fbfbfb',
  lightGreen: '#00FF00',
  green: '#2cbe4e',
  darkGreen: '#27ae60',
  red: '#ee0701',
  darkRed: '#e74c3c',
  white: '#ffffff',
  transparent: 'transparent',
  codeChunkBlue: '#f8f8ff',
  codeChunkLineNumberBlue: '#f3f3ff',
  addCodeGreen: '#eaffea',
  addCodeLineNumberGreen: '#DBFFD6',
  delCodeRed: '#ffecec',
  delCodeLineNumberRed: '#ffdddd',
  lightPurple: '#bf54eb',
  purple: '#8e44ad',
  orange: '#e67e22',
};

export default { flexCenterView, colors };
