import React, {FC} from 'react';
import {useIntlDictionary} from 'hooks/useDictionary';

export const Footer: FC = () => {
  const i18n = useIntlDictionary();
  const {writeMe} = i18n;

  return (
    <footer className="footer">
      <div className="wrapper">
        <div className="footer__title">{writeMe.left} <span>{writeMe.right}</span></div>
        <nav className="footer__links">
          <a href="mailto:irina.id@gmail.com" className="footer_links__item">irina.id@gmail.com</a>
          <a href="skype:username?add" className="footer_links__item">Skype irinakonopka</a>
          <a href="https://www.instagram.com/irisha_konopka" target="_blank" rel="noopener noreferrer" className="footer_links__item">Instagram</a>
          <a href="https://www.behance.net/irinakonopka" target="_blank" rel="noopener noreferrer" className="footer_links__item">Behance</a>
        </nav>
      </div>
    </footer>
  );
}