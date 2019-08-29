import React, {FC, useEffect, useRef} from 'react';
import {clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';

type TProps = {
  isOpened: boolean;
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmationModal: FC<TProps> = ({children, isOpened, onCancel, onConfirm, title}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef && modalRef.current) {
      if (!isOpened) {
        enableBodyScroll(modalRef.current)
      } else {
        disableBodyScroll(modalRef.current)
      }
    }
    return () => clearAllBodyScrollLocks();
  }, [isOpened]);

  return (
    <div ref={modalRef} className="modal-wrapper">
      <div className="modal">
        <div className="modal__header">
          <div className="modal_header__title">
            {title}
          </div>
        </div>
        <div className="modal__body">
          {children}
        </div>
        <div className="modal__footer">
          <div className="modal_footer__actions">
            <div className="form-control__button modal_footer_action__btn" onClick={onCancel}>Отмена</div>
            <div className="form-control__button modal_footer_action__btn active" onClick={onConfirm}>Подтвердить</div>
          </div>
        </div>
      </div>
    </div>
  );
}