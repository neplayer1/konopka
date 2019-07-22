import { TIntlDictionary, TIntl } from 'types/i18n';

const dictionary: TIntlDictionary = {
  changeLangLabel: 'en',

  slogan: 'Красота в простоте',

  slogans: [
    'Красота в простоте',
    'Хороший дизайн эстетичен',
    'Хороший дизайн ненавязчив',
    'Хороший дизайн честен',
    'Хороший дизайн не устаревает',
  ],

  nav: {
    interiors: 'Интерьеры',
    furniture: 'Мебель',
    about: 'Обо мне',
    contacts: 'Контакты',
  },

  writeMe: {
    left: 'Хотите проект?',
    right: 'Напишите мне'
  }
}

export const ruIntl: TIntl = {
  langCode: 'ru',
  dictionary
};