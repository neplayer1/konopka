import React, {FC} from 'react';
import sample from 'images/sample.jpg';
import {useIntlDictionary} from "hooks/useDictionary";

export const AboutPage: FC = () => {
  const intl = useIntlDictionary();
  return (
    <div className="about-page">
      <div className="about__card">
        <div className="about_card__inner">
          <div className="about_card__image">
            <img src={sample} alt=""/>
          </div>
          <div className="about_card__text" dangerouslySetInnerHTML={{__html: intl.about}}>
          </div>
        </div>
      </div>
    </div>
  );
}