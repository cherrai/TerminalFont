# TerminalFont.JS

[TOC]

Terminal font library for Node.JS, providing support for colors, font styles and more in Node.JS console.

## Overview

- :rabbit: Support colors, font weight, font styles and more
- :rabbit: Support 24-bit true colors (by RGB or hex color codes)
- :rabbit: Support font styles combination
- :rabbit: Support CSS-like settings
- :rabbit: Easy to use and extend
- :rabbit: Full typescript support

## Installation

```bash
npm install terminal-font
```

If you are using Yarn, you can use

```bash
yarn add terminal-font
```

## Usage

### Quick Overview

Multiple invocation ways are supported, just depending on what you like:

```javascript
const { font } = require('terminal-font');

console.log(font().green().apply('Green text'));
console.log(font().bold().red().bgCyan().italic().apply('Complex styles!'));
console.log(
  font().set('bold', 'italic', 'magenta').apply('Yet another way to use')
);
console.log(
  font()
    .set({
      color: font.rgb(245, 169, 184),
      backgroundColor: font.hexColor('#47a9fa'),
    })
    .apply('Fallen angel, distant heaven.')
);
```

The result is like:
![Screenshots](./screenshots/demo.png)

### Colors

To set the color or the background color of the text, simply use the format like

```javascript
font().red().apply('Red text');
font().bgBlue().apply('Text with blue background');
```

which uses the pre-defined colors by the terminal (see [pre-defined colors](#pre-defined-colors)) or

```javascript
font()
  .set({
    color: font.rgb(245, 169, 184),
    backgroundColor: font.hexColor('#47a9fa'),
  })
  .apply('Fallen angel, distant heaven.');
```

to use the 24-bit true colors. Specially, `font().default()` or `font().bgDefault()` set the color or background color of the text to the default color defined by the terminal.

**NOTICE**: True color mode is supported by most of the terminal emulators recently, however, not all terminal emulator supports 24-bit true color mode. A classical counterexample is the _Terminal.App_ in MacOS, which may map the color into the closet color in 256-colors table, or pre-defined basic colors.

#### Pre-defined Colors

Recently, Terminal.JS supports the following pre-defined colors:

- black
- red
- green
- yellow
- blue
- magenta
- cyan
- white

If you want to specify a color outside the pre-defined colors, use the RGB or hex color code form instead. Moreover, we are considering to provide more pre-defined colors in the future, just like what CSS acts.

### Styles

To set the styles of the text, use one of the following forms:

```javascript
font().bold().italic().apply('Italic bold text');
font
  .set({
    fontStyle: ['faint', 'underline', 'strike'],
  })
  .apply('Another way');
```

Supported styles include:

- bold
- italic
- faint
- underline
- blink
- strike

Specially, set the font style to `regular` will clear all styles (colors won't be affected).

### Combining Colors and Styles

Chain invocation is supported in TerminalFont.JS, thus you can easily combine the colors and styles with the following form:

```javascript
font()
  .set({
    color: 'red',
  })
  .bgWhite()
  .set({
    fontStyle: ['italic', 'faint'],
  })
  .blink()
  .strike()
  .underline()
  .apply('Very complex styles');
```

## API

~~**TL;DR;**~~

### Function: `font`

#### `font()`

**Syntax**

```typescript
  font(): Font;
```

Creates a new [`Font`](#type-font) object. This is the alias for calling `new Font()`.

#### `font.rgb`

**Syntax**

```typescript
font.rgb(red: number, green: number, blue: number): RgbObject;
```

Returns a `RgbObject` with the given parameters defining the RGB values. Please use this with `Font.prototype.set`.

#### `font.hexColor`

**Syntax**

```typescript
font.hexColor(hexCode: string): RgbObject;
```

Returns a `RgbObject` with the given hex code, similarily to `font.rgb`.

### Class: `Font`

An instance of class `Font` stores and manipulate certian settings of font, and is able to apply these settings to a string.

#### `Font.prototype.set()`

**Syntax**

```javascript
Font.prototype.set(...FontSettings[]);
```

Configure the font settings. The arguments can be passed via various ways:

**Via string**

Samples:

```javascript
font().set('red', 'italic', 'strike');
```

**Via object**

In this way, you need to pass a object with the type `FontSettingsObject`.

Samples:

```javascript
font().set({
  color: 'red', // text color
  backgroundColor: 'cyan', // background color
  fontStyle: ['bold', 'italic'], // font style
  options: {
    // options
  },
});
```

See Options for supported options list.

#### `Font.prototype.apply()`

**Syntax**

```typescript
Font.prototype.apply(originalString: string): string;
```

Apply the font settings to a string and returns the new string with font. This operation doesn't change the original string.

### Options

Additional options can be set with the form

```javascript
font().set({
  options: {
    // ...
  },
});
```

Supported options include:

#### `reset`

_Type: `boolean`_
_Defualt: `true`_

This configures whether to reset the colors at the ending of the string. Set this option to `false` will allow you to use TerminalFont.JS in another way:

```javascript
const fontSetter = () =>
  font().set({
    options: {
      reset: false,
    },
  });
console.log(
  'Is %snested %sstyles %sawesome %sor %snot?',
  fontSetter().red().apply(''),
  fontSetter().bold().apply(''),
  fontSetter().bgCyan().apply(''),
  fontSetter().strike().apply(''),
  fontSetter().underline().apply('')
);
```

**NOTICE**: This is not a recommended way to use Terminal.JS which may lead to an unexpected result. We will provide more elegant ways to use nested styles in the future.

## License

TerminalFont.JS is licensed under GNU Lesser General Public License 2.1.
