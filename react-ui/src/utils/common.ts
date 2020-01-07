// видимость элемента без удаления из DOM
import { ReactElement, cloneElement } from 'react';
import * as React from "react";

export const isVisible = (condition: boolean) => (condition ? {} : { display: 'none' } as React.CSSProperties);

export const isHidden = (condition: boolean) => (condition ? {} : { visibility: 'hidden', pointerEvents: 'none' } as React.CSSProperties);

// добавляет класс по условию
export const setActiveClass = (condition: boolean, className: string) => (condition ? className : '');

// решает проблему динамической сменой направления анимации в transitionGroup
export const childFactoryCreator = (classNames: string) => (child: ReactElement) =>
  cloneElement(child, {
    classNames
  });

// для добавления оффсета на хэш навигации
export const scrollWithOffset = (el: any, offset: number) => {
  const elementPosition = el.offsetTop + offset;
  window.scroll({
    top: elementPosition,
    left: 0
  });
};
