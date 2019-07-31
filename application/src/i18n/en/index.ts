import { TIntlDictionary, TIntl } from 'types/i18n';

const dictionary: TIntlDictionary = {
  changeLangLabel: 'ru',

  slogan: 'Beauty in simplicity',

  slogans: [
    'Beauty\nin simplicity',
    'Good design\nis aesthetic',
    'Good design\nis unobtrusive',
    'Good design\nis honest',
    'Good design\ndoesn\'t get old',
  ],

  nav: {
    interiors: 'Interiors',
    furniture: 'Furniture',
    about: 'About',
  },

  writeMe: {
    left: 'Need project?',
    right: 'Write to me'
  }
}

export const enIntl: TIntl = {
  langCode: 'en',
  dictionary
};