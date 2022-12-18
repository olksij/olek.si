import { SkeletonTree } from 'interfaces';
import { menuState } from './scripts/menu';

import aboutDom from "/about/dom";
import indexDom from "/index/dom";

import buildTree from '/skeleton/buildTree';

export type RouteName = 'index' | 'about' | 'projects' | 'work';
export type Page = { load: () => void };

export interface RouteConfig { dom: SkeletonTree, page: () => Promise<Page> };

// define routes of the page
const routes: Record<RouteName, RouteConfig>  = {
/* 
   🏷️ Page    🩻 Skeleton                  🖼️ Assets
  ____|____   ______|______        _____________|_____________ */
  index:    { dom: indexDom, page: () => import('/index/page') },
  about:    { dom: aboutDom, page: () => import('/about/page') },
  projects: { dom: indexDom, page: () => import('/index/page') },
  work:     { dom: indexDom, page: () => import('/index/page') },
}

export default function (route: RouteName) {  
  buildTree(routes[route].dom);
  routes[route].page().then(page => page.load());
  window.history.pushState({}, '', `/${route == 'index' ? '' : route + '/'}`)

  menuState(false);
}