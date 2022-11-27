import { ElementConfig, AnimatingOrder, SourceTextData } from 'interfaces';

import { fontStyles } from '/common/fontStyles';
let font = fontStyles;

const elementConfig: Record<string, ElementConfig> = {
/*
 🏷️ ID     ✨ FontStyle
  _|_    ________|________ */
  tt:  { text: font.h2, }, 
  d1:  { text: font.subtitle, },
  d2:  { text: font.subtitle, },
};

const texts: SourceTextData = {

/*             🏴󠁧󠁢󠁥󠁮󠁧󠁿 English                            🇸🇪 Svenska                         🇺🇦 Ukrajinśka         
/        ___________|____________             ___________|____________             ___________|____________ */
  tt:  { en: "About me",                      sv: "Om mig",                        uk: "Pro mene" },
  d1:  { en: "I’m a Ukrainian he/him living", sv: "Jag är en ukrainare han/honom", uk: "Ja vin/joho ukrajineć, prožyvajučyj" },
  d2:  { en: "in Stockholm, Sweden.",         sv: "som bor i Stockholm, Sverige.", uk: "v Stockhoĺm, Švecija." },
};

import mainStylesheet from './styles.css';
import skeletonStylesheet from './skeleton.css';
import desktopStylesheet from './desktop.skeleton.css';

const stylesheets: string[] = [ mainStylesheet, skeletonStylesheet, desktopStylesheet ];

const restoreLinks: Record<string, Array<string>> = {
  "ps": ["https://t.me/oleksiibesida", "https://matrix.to/#/@human:oleksii.xyz", "https://github.com/oleksiibesida", "https://linkedin.com/in/oleksiibesida/", "mailto:besida@oleksii.xyz"],
}

// order and details of animating each node
const animatingOrder: Record<string, AnimatingOrder> = {
  tt:  { delay: 50 },
  d1:  { delay: 500 },
  d2:  { delay: 0 },
  rg:  { delay: 50, children: true },
  nav: { delay: 100 },
  cr:  { delay: 100 },
  lg:  { delay: 100 },
}

import { onload } from '/common/page';
export let load = () => onload({ animatingOrder, elementConfig, 
  restoreLinks, stylesheets, texts });
