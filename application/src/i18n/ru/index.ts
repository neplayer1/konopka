import { TIntlDictionary, TIntl } from 'types/i18n';

const dictionary: TIntlDictionary = {
  about: `<p>I am a multidisciplinary designer with a main focus on Digital Design and Branding, located in Thessaloniki,
            Greece.
          </p>
          <p>Throughout my 11 years' experience I have worked in various advertising agencies as a Graphic /
            Digital Designer and Art Director.
          </p>
          <p>For the last 3 years I have been working as a freelancer collaborating with
            agencies and clients. I am also a member of the design team of Point Blank, Design & Drupal Digital agency.
          </p>
          <p>I am always glad to discuss collaborative projects and freelance commissions.</p>`,
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
    dashboard: 'Админка',
    logout: 'Выйти',
  },
  writeMe: {
    left: 'Хотите проект?',
    right: 'Напишите мне'
  },
  validation: {
    required: 'Это обязательное поле'
  },
  ui: {
    buttons: {
      addPreview: 'Добавить превью',
      addImages: 'Добавить изображения',
    },
    submit: {
      add: 'Добавить',
      update: 'Обновить',
    }
  }
}

export const ruIntl: TIntl = {
  langCode: 'ru',
  dictionary
};