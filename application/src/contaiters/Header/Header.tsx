import React, {FC, useCallback, useState, useEffect, useRef} from 'react';
import {HeaderNavLink} from 'contaiters/Header/styled/HeaderNavLink';
import {HeaderNavButton} from 'contaiters/Header/styled/HeaderNavButton';
import {Link} from 'react-router-dom';
import {routes} from 'utils/routes';
import {useIntlDictionary} from 'hooks/useDictionary';
import {useHandleChangeLang} from 'hooks/useHandleChangeLang';
import {CSSTransition} from 'react-transition-group';
import {disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks} from 'body-scroll-lock';

export const Header: FC = () => {
  const dictionary = useIntlDictionary();
  const handleChangeLang = useHandleChangeLang();
  const {nav, changeLangLabel} = dictionary;
  const [opened, setOpened] = useState(false);
  const header = useRef<HTMLElement>(null);
  const headerNode = header.current;

  const handleOpenMenu = useCallback(() => {
    setOpened(!opened);
  }, [opened]);

  const handleCloseMenu = useCallback(() => {
    setOpened(false);
  }, []);

  useEffect(() => {
    if (headerNode) {
      if (!opened) {
        enableBodyScroll(headerNode)
      } else {
        disableBodyScroll(headerNode)
      }
    }
    return () => clearAllBodyScrollLocks();
  }, [headerNode, opened]);

  const cls = opened ? 'open' : '';

  return (
    <header className="header" ref={header}>
      <div className="wrapper">
        <Link to={'/'} className="header__logo">Irina <span>Konopka</span></Link>
        <CSSTransition in={opened} classNames="fade-out" timeout={200}>
          <nav className={`header__nav ${cls}`}>
            <HeaderNavLink onClick={handleCloseMenu} url={routes.interiors({})} label={nav.interiors}/>
            <HeaderNavLink onClick={handleCloseMenu} url={routes.furniture({})} label={nav.furniture}/>
            <HeaderNavLink onClick={handleCloseMenu} url={routes.about()} label={nav.about}/>
            <HeaderNavLink onClick={handleCloseMenu} url={routes.contacts()} label={nav.contacts}/>
            <HeaderNavButton onClick={handleChangeLang} label={changeLangLabel}/>
          </nav>
        </CSSTransition>
        <div onClick={handleOpenMenu} className={`header__hamburger ${cls}`}><span/><span/><span/></div>
      </div>
    </header>
  );
}