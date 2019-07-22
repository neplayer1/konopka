import React from 'react';

import { TIntl } from 'types/i18n';

type TProps = {
  intl: TIntl;
  handleChangeLang: () => void;
}

export const IntlContext = React.createContext<null | TProps>(null);
