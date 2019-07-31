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
  }
  writeMe: {
    left: string;
    right: string;
  };
}
