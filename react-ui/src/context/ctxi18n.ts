import React from 'react';

import { TIntl } from 'types/i18n';

type TProps = {
  intl: TIntl;
  handleChangeLang: () => void;
  isRu: boolean;
}

export const IntlContext = React.createContext<null | TProps>(null);
