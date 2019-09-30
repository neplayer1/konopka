export type TIntl = {
  langCode: string;
  dictionary: TIntlDictionary;
};

export type TIntlDictionary = {
  changeLangLabel: string;
  slogan: string;
  slogans: string[];
  nav: {
    interiors: string;
    furniture: string;
    about: string;
    dashboard: string;
    logout: string;
  }
  writeMe: {
    left: string;
    right: string;
  }
  about: string;
  validation: {
    required: string;
  }
  ui: {
    buttons: {
      addPreview: string;
      addImages: string;
    },
    submit: {
      add: string;
      update: string;
    };
  }
}
