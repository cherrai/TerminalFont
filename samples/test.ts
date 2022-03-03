import { font } from '../src/index';

console.log(font().green().apply('Green text'));
console.log(font().bold().red().bgCyan().italic().apply('Complex styles!'));
console.log(font().set('bold', 'italic', 'magenta').apply('Yet another way to use'));
console.log(
  font()
    .set({
      color: font.rgb(245, 169, 184),
      backgroundColor: font.hexColor('#47a9fa'),
    })
    .apply('Fallen angel, distant heaven.')
);

// Another way, not recommended
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
  fontSetter().underline().apply(''),
);
