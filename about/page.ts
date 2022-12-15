import { ElementConfig, SourceTextData } from 'interfaces';

import font from '../common/typography';

const elements: Record<string, ElementConfig> = {
/*
 🏷️ ID            ✨ FontStyle
  _|_           ________|________ */
  tt:         { text: font.h2, }, 
  d1:         { text: font.subtitle, },
  d2:         { text: font.subtitle, },
  bio:        { text: font.body, },
};

const texts: SourceTextData = {
  tt:  { en: "About me",                      sv: "Om mig",                        uk: "Pro mene" },
  d1:  { en: "I’m a Ukrainian he/him living", sv: "Jag är en ukrainare han/honom", uk: "Ja vin/joho ukrajineć, prožyvajučyj" },
  d2:  { en: "in Stockholm, Sweden.",         sv: "som bor i Stockholm, Sverige.", uk: "v Stockhoĺm, Švecija." },
  bio: { en: "Hi! My name is Oleksii Besida. I find engineering as a way to express my designer soul.",         sv: "som bor i Stockholm, Sverige.", uk: "v Stockhoĺm, Švecija." },
};

import image from '/assets/images/fullSized.jpg';
const images = { image };

import mainStylesheet from './styles.css';
import skeletonStylesheet from './skeleton.css';
import desktopStylesheet from './desktop.skeleton.css';

const stylesheets: string[] = [ skeletonStylesheet, desktopStylesheet, mainStylesheet ];

import skeleton from './dom';

import { onload } from '/common/page';
export let load = () => onload({ elements, images, stylesheets, texts, skeleton });
