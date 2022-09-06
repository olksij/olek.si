import { onload } from './entry';
import { images, vectors, stylesheets } from '../content/index';

addEventListener('load', () => onload({ images, vectors, stylesheets }));
