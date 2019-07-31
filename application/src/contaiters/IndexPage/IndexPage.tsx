import React, { FC, useRef, useEffect } from 'react';
import { springText } from './useSpringText.js';
import { useIntlDictionary } from 'hooks/useDictionary';

export const IndexPage: FC = () => {
  const i18n = useIntlDictionary();
  const {slogans} = i18n;
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const storageArray = sessionStorage.getItem('nums');
    let usedNums = storageArray ? storageArray.split(',') : [];

    if (usedNums.length === slogans.length) {
      usedNums = [];
    }
    let rand = Math.floor(Math.random() * slogans.length);
    while (usedNums.includes(`${rand}`)) {
      rand = Math.floor(Math.random() * slogans.length);
    }
    usedNums.push(`${rand}`);
    sessionStorage.setItem('nums', `${usedNums.toString().split(',')}`);

    const {init, cleanCanvas} = springText(canvas, slogans[rand]);
    init();
    return () => cleanCanvas();
  }, [slogans]);

  return (
    <div className="index-page">
      <canvas ref={canvas}/>
    </div>
  )
}