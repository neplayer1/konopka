import React, { FC } from 'react';
import sample from 'images/sample.jpg';

export const AboutPage: FC = () => (
  <div className="about-page">
    <div className="about__card">
      <div className="about_card__inner">
        <div className="about_card__image">
          <img src={sample} alt=""/>
        </div>
        <div className="about_card__text">
          I am a multidisciplinary designer with a main focus on Digital Design and Branding, located in Thessaloniki,
          Greece. Throughout my 11 years' experience I have worked in various advertising agencies as a Graphic /
          Digital Designer and Art Director. For the last 3 years I have been working as a freelancer collaborating with
          agencies and clients. I am also a member of the design team of Point Blank, Design & Drupal Digital agency. I
          am always glad to discuss collaborative projects and freelance commissions.
        </div>
      </div>
    </div>
  </div>
);