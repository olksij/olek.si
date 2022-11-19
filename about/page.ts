import { onload } from '../src/general/entry';
import * as content from './content';
import { PageContent } from '../src/interfaces';

export let load = () => onload(content as PageContent);

addEventListener('load', load);
