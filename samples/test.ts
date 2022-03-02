import { font } from '../src/index';

console.log(font().green().apply('2333'));
console.log(font().bold().red().bgCyan().italic().apply('233333'));
console.log(
  font()
    .bold()
    .set({ color: font.rgb(172, 97, 209) }).apply('233333333333333333')
);
