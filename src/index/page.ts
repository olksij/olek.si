import { onload } from '../general/entry';
import * as content from './content';
import { PageContent } from '../interfaces';

export let load = () => onload(content as PageContent);

// @ts-ignore
if (!window['renderListener']) addEventListener('load', load), window['renderListener'] = true;
