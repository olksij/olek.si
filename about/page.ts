import font from '../common/typography';

let bio = `Hi! My name is Oleksii Besida. I find engineering as a way to express my designer soul.`;

const elements: Record<ElementID, StaticElementConfig> = {
/*🏷️ ID            ✍️ Text                                ✨ FontStyle
  __|__         _______|________                        ________|________ */
  tt:         { text: "About me",                       style: font.h2, }, 
  d1:         { text: "I’m a Ukrainian he/him living",  style: font.subtitle, },
  d2:         { text: "in Stockholm, Sweden.",          style: font.subtitle, },
  bio:        { text: bio,                              style: font.body, },
};

import image from '/common/images/fullSized.jpg';
const images = { image };

import mainStylesheet from './styles.css';
import skeletonStylesheet from './skeleton.css';
import desktopStylesheet from './desktop.skeleton.css';

const stylesheets: string[] = [ skeletonStylesheet, desktopStylesheet, mainStylesheet ];

import skeleton from './dom';

import { onload } from '/common/page';
import { ElementID, StaticElementConfig } from '/interfaces';
export let load = () => onload({ id: 'about', elements, images, stylesheets, skeleton });
