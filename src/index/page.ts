import { onload } from '../general/entry';
import * as content from './content';
import { PageContent } from '../interfaces';

export let load = () => onload(content as PageContent);

addEventListener('load', load);
