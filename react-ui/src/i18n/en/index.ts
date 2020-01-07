import { TIntlDictionary, TIntl } from 'types/i18n';

const dictionary: TIntlDictionary = {
  about: `<p>Я многопрофильный дизайнер с основным фокусом на цифровом дизайне и брендинге, нахожусь в Салониках,
            Греция.</p>
          <p>За 11 лет работы в различных рекламных агентствах я поработала графическим / цифровым дизайнером и арт-директором.</p>
          <p>В течение последних 3 лет я работаю фрилансером, сотрудничая с агентствами и клиентами. Я также являюсь членом команды дизайнеров агентства Point Blank, Design & Drupal Digital.
          </p>
          <p>Я всегда рада обсудить совместные проекты и заказы по фрилансу.</p>`,
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
    dashboard: 'Dashboard',
    logout: 'Logout',
  },
  writeMe: {
    left: 'Need project?',
    right: 'Write to me'
  },
  validation: {
    required: 'Required field'
  },
  ui: {
    buttons: {
      addPreview: 'Add preview',
      addImages: 'Add images',
    },
    submit: {
      add: 'Add',
      update: 'Update',
    }
  },
}

export const enIntl: TIntl = {
  langCode: 'en',
  dictionary
};