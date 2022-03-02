import {
  BasicColor,
  RgbColor,
  FontStyle,
  IFont,
  FontSettingsElement,
  FontSettings,
  FontConstructor,
  InteralFontSettings,
} from './typings';

import { BASIC_COLORS, BASIC_BG_COLORS, FONT_STYLES } from './constants/enums';
import {
  CSI,
  SGRT,
  RESET,
  RGB_SETTER,
  COLOR_SETTER,
  BG_COLOR_SETTER,
  FONT_STYLES_CODE,
  BASIC_COLORS_CODE,
  BASIC_BG_COLORS_CODE,
} from './constants/csis';

import {
  InvalidColorStringException,
  InvalidFontSettingsStringException,
  InvalidRgbColorException,
  InvalidFontStyleStringException,
} from './exceptions';

import { generalize } from './utils';

export class Font implements IFont {
  private fontSettings: InteralFontSettings;

  constructor() {
    this.fontSettings = {
      color: null,
      backgroundColor: null,
      fontStyle: new Set(),
      options: {
        reset: true,
      },
    };
  }

  private getFontSettingsStringType(fontSettingsString: string) {
    return generalize(BASIC_COLORS).includes(fontSettingsString)
      ? 'basic'
      : generalize(BASIC_BG_COLORS).includes(fontSettingsString)
      ? 'bg'
      : generalize(FONT_STYLES).includes(fontSettingsString)
      ? 'style'
      : 'invalid';
  }

  private getColorType(color: string | RgbColor) {
    if (typeof color === 'string') {
      return this.getFontSettingsStringType(color) === 'basic'
        ? 'basic'
        : 'invalid-string';
    } else {
      const valid = (x: number) => x >= 0 && x <= 255 && x % 1 === 0;
      return valid(color.blue) && valid(color.green) && valid(color.red)
        ? 'rgb'
        : 'invalid-rgb';
    }
  }

  private updateStyleViaStyleString(style: string) {
    this.getFontSettingsStringType(style) !== 'style'
      ? (() => {
          throw new InvalidFontStyleStringException(style);
        })()
      : style === 'regular'
      ? this.fontSettings.fontStyle.clear()
      : this.fontSettings.fontStyle.add(style as FontStyle);
  }

  private updateViaFontSettingsString(settings: string) {
    const settingsType = this.getFontSettingsStringType(settings);
    settingsType === 'basic'
      ? (this.fontSettings.color = settings as BasicColor)
      : settingsType === 'bg'
      ? (this.fontSettings.backgroundColor = settings.slice(3) as BasicColor)
      : settingsType === 'style'
      ? this.updateStyleViaStyleString(settings as FontStyle)
      : (() => {
          throw new InvalidFontSettingsStringException(settings);
        })();
  }

  private updateColor(
    target: 'color' | 'backgroundColor',
    color: string | RgbColor
  ) {
    const colorType = this.getColorType(color);
    colorType === 'invalid-rgb'
      ? (() => {
          throw new InvalidRgbColorException(color as RgbColor);
        })()
      : colorType === 'invalid-string'
      ? (() => {
          throw new InvalidColorStringException(color as string);
        })()
      : (this.fontSettings[target] = color as BasicColor);
  }

  private updateStyle(
    style: FontStyle | FontStyle[] | Partial<Record<FontStyle, boolean>>
  ) {
    if (typeof style === 'string') this.updateStyleViaStyleString(style);
    else if (style instanceof Array) {
      for (const subStyle of style) this.updateStyleViaStyleString(subStyle);
    } else {
      for (const substyle of FONT_STYLES)
        style[substyle] === true && this.updateStyleViaStyleString(substyle);
    }
  }

  private setSingly(settings: FontSettingsElement) {
    if (typeof settings === 'string') {
      this.updateViaFontSettingsString(settings);
    } else {
      settings.color && this.updateColor('color', settings.color);
      settings.backgroundColor &&
        this.updateColor('backgroundColor', settings.backgroundColor);
      settings.fontStyle && this.updateStyle(settings.fontStyle);

      this.fontSettings = {
        ...this.fontSettings,
        ...settings.options,
      };
    }
  }

  private getCsisForStyle() {
    return this.fontSettings.fontStyle.size
      ? `${CSI}${Array.from(this.fontSettings.fontStyle)
          .map((style) => FONT_STYLES_CODE[style])
          .join(';')}${SGRT}`
      : '';
  }

  private getCsisForColor(
    target: 'color' | 'backgroundColor',
    color: BasicColor | RgbColor
  ) {
    return typeof color === 'string'
      ? `${CSI}${
          target === 'color'
            ? BASIC_COLORS_CODE[color]
            : BASIC_BG_COLORS_CODE[color]
        }${SGRT}`
      : `${CSI}${
          target === 'color' ? COLOR_SETTER : BG_COLOR_SETTER
        };${RGB_SETTER};${color.red};${color.green};${color.blue}${SGRT}`;
  }

  set(...settingsList: FontSettings[]) {
    for (const settings of settingsList.flat()) {
      this.setSingly(settings);
    }
    return this;
  }

  apply(originalString: string) {
    return (
      `${
        this.fontSettings.color
          ? this.getCsisForColor('color', this.fontSettings.color)
          : ''
      }` +
      `${
        this.fontSettings.backgroundColor
          ? this.getCsisForColor(
              'backgroundColor',
              this.fontSettings.backgroundColor
            )
          : ''
      }` +
      `${this.getCsisForStyle()}` +
      originalString +
      (this.fontSettings.options.reset === false ? '' : `${CSI}${RESET}${SGRT}`)
    );
  }

  black() {
    return this.set('black');
  }

  red() {
    return this.set('red');
  }

  green() {
    return this.set('green');
  }

  yellow() {
    return this.set('yellow');
  }

  blue() {
    return this.set('blue');
  }

  magenta() {
    return this.set('magenta');
  }

  cyan() {
    return this.set('cyan');
  }

  white() {
    return this.set('white');
  }

  default() {
    return this.set('default');
  }

  bgBlack() {
    return this.set('bg-black');
  }

  bgRed() {
    return this.set('bg-red');
  }

  bgGreen() {
    return this.set('bg-green');
  }

  bgYellow() {
    return this.set('bg-yellow');
  }

  bgBlue() {
    return this.set('bg-blue');
  }

  bgMagenta() {
    return this.set('bg-magenta');
  }

  bgCyan() {
    return this.set('bg-cyan');
  }

  bgWhite() {
    return this.set('bg-white');
  }

  bgDefault() {
    return this.set('bg-default');
  }

  regular() {
    return this.set('regular');
  }

  bold() {
    return this.set('bold');
  }

  faint() {
    return this.set('faint');
  }

  italic() {
    return this.set('italic');
  }

  underline() {
    return this.set('underline');
  }

  blink() {
    return this.set('blink');
  }

  strike() {
    return this.set('strike');
  }
}

const font: FontConstructor = () => new Font();
font.rgb = (red: number, green: number, blue: number) => ({
  red,
  green,
  blue,
});

export { font };
