import { BASIC_COLORS, BASIC_BG_COLORS, FONT_STYLES } from '../constants/enums';

export type BasicColor = typeof BASIC_COLORS[number];
export type BasicBgColor = typeof BASIC_BG_COLORS[number];
export type FontStyle = typeof FONT_STYLES[number];
export type FontSettingsString = BasicColor | BasicBgColor | FontStyle;
export interface RgbColor {
  red: number;
  green: number;
  blue: number;
}

export interface FontOptions {
  reset?: boolean;
}

export interface FontSettingsObject {
  color?: BasicColor | RgbColor;
  backgroundColor?: BasicColor | RgbColor;
  fontStyle?: FontStyle | FontStyle[] | Partial<Record<FontStyle, boolean>>;
  options?: FontOptions;
}

export type FontSettingsElement = FontSettingsString | FontSettingsObject;
export type FontSettings = FontSettingsElement | FontSettingsElement[];

export type FontSetter = (originalString: string) => string;

export type InteralFontSettings = {
  color: BasicColor | RgbColor | null;
  backgroundColor: BasicColor | RgbColor | null;
  fontStyle: Set<FontStyle>;
  options: FontOptions;
};

export interface IFont {
  set(...settingsList: FontSettings[]): IFont;

  black(): IFont;
  red(): IFont;
  green(): IFont;
  yellow(): IFont;
  blue(): IFont;
  magenta(): IFont;
  cyan(): IFont;
  white(): IFont;
  default(): IFont;

  bgBlack(): IFont;
  bgRed(): IFont;
  bgGreen(): IFont;
  bgYellow(): IFont;
  bgBlue(): IFont;
  bgMagenta(): IFont;
  bgCyan(): IFont;
  bgWhite(): IFont;
  bgDefault(): IFont;

  regular(): IFont;
  bold(): IFont;
  faint(): IFont;
  italic(): IFont;
  underline(): IFont;
  blink(): IFont;
  strike(): IFont;

  apply: FontSetter;
}

export type FontConstructor = {
  (): IFont;
  rgb: (red: number, green: number, blue: number) => RgbColor;
};
