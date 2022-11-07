import { computeTexts, onload } from '../general/entry';
import * as content from './content';
import { PageContent } from '../interfaces';

computeTexts(content as PageContent);

addEventListener('load', () => onload());
