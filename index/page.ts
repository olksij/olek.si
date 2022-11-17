import { onload } from '../src/general/entry';
import * as content from './content';
import { PageContent } from '../src/interfaces';

export let load = () => onload(content as PageContent);

// @ts-ignore
if (!window['renderListener']) addEventListener('load', load), window['renderListener'] = true;
