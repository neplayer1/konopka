import {TIntlDictionary, TIntl} from 'types/i18n';

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