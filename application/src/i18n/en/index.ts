import { TIntlDictionary, TIntl } from 'types/i18n';

const dictionary: TIntlDictionary = {
  changeLangLabel: 'ru',

  slogan: 'Beauty in simplicity',

  slogans: [
    'Beauty in simplicity',
    'Good design is aesthetic',
    'Good design is unobtrusive',
    'Good design is honest',
    'Good design does not become obsolete',
  ],

  nav: {
    interiors: 'Interiors',
    furniture: 'Furniture',
    about: 'About',
    contacts: 'Contacts',
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