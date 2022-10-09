import { CSSColors, FontStyleConfig, FontType } from "./interfaces";

export class FontStyle implements FontStyleConfig {
  type: FontType;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  color: CSSColors;

  constructor(config: FontStyleConfig) {
    this.type = config.type ?? 'text',
    this.fontSize = config.fontSize,
    this.lineHeight = config.lineHeight,
    this.letterSpacing = config.letterSpacing ?? 0,
    this.color = config.color ?? 'var(--secondary)';
  }
}