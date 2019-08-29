import React, {FC, useCallback, useState} from 'react';
import {ModalContext} from 'context/ctxModal';
import {ConfirmationModal} from "components/Modal/ConfirmationModal";

export const ModalProvider: FC = ({children}) => {
  const [opened, setOpened] = useState(false);
  const [title, setTitle] = useState('');
  const [handleConfirm, setOnConfirm] = useState({
    handle: () => {
    }
  });

  const initModal = useCallback((title: string, onConfirm: () => void) => {
    setTitle(title);
    setOnConfirm({
      handle: () => {
        onConfirm();
// setOpened(false);
      }
    });
  },[]);

  const openModal = useCallback((opened) => {
    console.log("OPEN MODAL", opened)
    setOpened(opened);
  }, []);

  const handleCancel = useCallback(() => {
    setOpened(false);
  }, []);


  return (
    <ModalContext.Provider value={{initModal, openModal}}>
      {children}
      {opened && <ConfirmationModal isOpened={opened}
                                    title={title}
                                    onConfirm={handleConfirm.handle}
                                    onCancel={handleCancel}/>}
    </ModalContext.Provider>
  );
};