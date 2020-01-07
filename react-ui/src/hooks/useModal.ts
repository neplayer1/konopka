import {useContextStrict} from 'hooks/useContextStrict';
import {ModalContext} from "context/ctxModal";

export const useModal = () => {
  const { initModal, openModal } = useContextStrict(ModalContext);

  return { initModal, openModal};
}