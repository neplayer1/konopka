import { IntlContext } from 'context/ctxi18n';
import { useContextStrict } from 'hooks/useContextStrict';

export const useHandleChangeLang = () => {
  const { handleChangeLang } = useContextStrict(IntlContext);

  return handleChangeLang;
}