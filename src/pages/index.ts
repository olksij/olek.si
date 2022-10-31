import { computeTexts, onload } from './entry';
import * as content from '../content/index';
import { PageContent } from '../interfaces';

computeTexts(content as PageContent);

addEventListener('load', () => onload());
