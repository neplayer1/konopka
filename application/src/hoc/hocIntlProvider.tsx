import React, { useCallback, useState } from 'react';
import { IntlContext } from 'context/ctxi18n';
import { ruIntl } from 'i18n/ru';
import { enIntl } from 'i18n/en';

export const IntlProvider: React.FC = ({children}) => {
  const storeLang = localStorage.getItem('lang');
  let intl = ruIntl;
  const curLang = storeLang ? storeLang : 'ru';
  if (curLang === 'en') {
    intl = enIntl;
  }

  const [lang, setLang] = useState(intl.langCode);

  const handleChangeLang = useCallback(() => {
    if (lang === 'ru') {
      localStorage.setItem('lang', 'en');
      setLang(enIntl.langCode);
    } else if (lang === 'en') {
      localStorage.setItem('lang', 'ru');
      setLang(ruIntl.langCode);
    }
  }, [lang]);

  const value = {intl, handleChangeLang};

  return (
    <IntlContext.Provider value={value}>
      {children}
    </IntlContext.Provider>
  );
};