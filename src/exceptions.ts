import { RgbColor } from './typings';
import { BASIC_COLORS, BASIC_BG_COLORS, FONT_STYLES } from './constants/enums';
class TerminalFontExceptionBase extends Error {
  constructor(name: string, message: string) {
    super(message);
    this.name = name;
  }
}

export class InvalidFontSettingsStringException extends TerminalFontExceptionBase {
  constructor(fontSettingsString: string) {
    super(
      'InvalidFontSettingsStringException',
      `Invalid font settings string: ${fontSettingsString}. ` +
        `All valid settings include: ` +
        [...BASIC_COLORS, ...BASIC_BG_COLORS, ...FONT_STYLES]
          .map((val) => `"${val}"`)
          .join(', ')
    );
  }
}

export class InvalidColorStringException extends TerminalFontExceptionBase {
  constructor(color: string) {
    super(
      'InvalidColorStringException',
      `Invalid color: ${color}. ` +
        `All valid colors include: ` +
        BASIC_COLORS.map((val) => `"${val}"`).join(', ')
    );
  }
}

export class InvalidRgbColorException extends TerminalFontExceptionBase {
  constructor(color: RgbColor) {
    super(
      'InvalidRgbColorException',
      'Invalid RGB Color: ' +
        JSON.stringify(color) +
        '. The property "red", "green" and "blue" should all be integers between 0 and 255.'
    );
  }
}

export class InvalidFontStyleStringException extends TerminalFontExceptionBase {
  constructor(style: string) {
    super(
      'InvalidFontStyleStringException',
      `Invalid style string: ${style}. ` +
        `All valid styles include: ` +
        FONT_STYLES.map((val) => `"${val}"`).join(', ')
    );
  }
}
