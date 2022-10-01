import { computeTexts, onload } from './entry';
import * as content from '../content/index';

computeTexts(content);

addEventListener('load', () => onload(content));
