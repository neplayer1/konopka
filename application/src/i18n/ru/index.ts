import { TIntlDictionary, TIntl } from 'types/i18n';

const dictionary: TIntlDictionary = {
  changeLangLabel: 'en',

  slogan: 'Красота в простоте',

  slogans: [
    'Красота\nв простоте',
    'Хороший\nдизайн\nэстетичен',
    'Хороший\nдизайн\nненавязчив',
    'Хороший\nдизайн\nчестен',
    'Хороший\nдизайн\nне устаревает',
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