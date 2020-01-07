import { IntlContext } from 'context/ctxi18n';
import { useContextStrict } from 'hooks/useContextStrict';

export const useCurrentLang = () => {
  const { isRu } = useContextStrict(IntlContext);

  return isRu;
}