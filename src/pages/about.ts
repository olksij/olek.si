import { computeTexts, onload } from './entry';
import * as content from '../content/about';
import { PageContent } from '../interfaces';

computeTexts(content as PageContent);

addEventListener('load', () => onload());
