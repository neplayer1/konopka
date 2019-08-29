import React from 'react';

type TProps = {
  initModal: (title: string, onConfirm: () => void) => void;
  openModal: (opened: boolean) => void;
}

export const ModalContext = React.createContext<null | TProps>(null);
