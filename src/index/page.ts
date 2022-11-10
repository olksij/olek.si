import { onload } from '../general/entry';
import * as content from './content';
import { PageContent } from '../interfaces';

addEventListener('load', () => onload(content as PageContent));
