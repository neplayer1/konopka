import { IntlContext } from 'context/ctxi18n';
import { useContextStrict } from 'hooks/useContextStrict';

export const useIntlDictionary = () => {
  const { intl } = useContextStrict(IntlContext);

  return intl.dictionary;
}