import { BasicColor, FontStyle } from '../typings';

export const ESC = '\x1b' as const;
export const CSI = '\x1b[' as const;
export const SGRT = 'm';

export const RESET = 0 as const;
export const RGB_SETTER = 2 as const;
export const COLOR_SETTER = 38 as const;
export const BG_COLOR_SETTER = 48 as const;

export const BASIC_COLORS_CODE: Record<BasicColor, number> = {
  black: 30,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  magenta: 35,
  cyan: 36,
  white: 37,
  default: 39,
} as const;

export const BASIC_BG_COLORS_CODE: Record<BasicColor, number> = {
  black: 40,
  red: 41,
  green: 42,
  yellow: 43,
  blue: 44,
  magenta: 45,
  cyan: 46,
  white: 47,
  default: 49,
} as const;

export const FONT_STYLES_CODE: Record<FontStyle, number> = {
  regular: -1,
  bold: 1,
  faint: 2,
  italic: 3,
  underline: 4,
  blink: 5,
  strike: 9,
};
