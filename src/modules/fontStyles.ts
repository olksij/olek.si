import { FontStyle } from "../classes";
import { FontStyleType } from "../interfaces";

export const fontStyles: Record<FontStyleType, FontStyle> = {
  title: new FontStyle({
    type: 'display',
    fontSize: 128,
    lineHeight: 112,
    letterSpacing: -.04,
    color: 'var(--text)',
  }),
  subtitle: new FontStyle({
    fontSize: 20,
    lineHeight: 28,
  }),
  menuSelected: new FontStyle({
    type: 'display',
    fontSize: 20,
    letterSpacing: -0.04,
    lineHeight: 24,
    color: 'var(--text)',
  }),
  menu: new FontStyle({
    fontSize: 18,
    lineHeight: 24,
  }),
  action: new FontStyle({
    fontSize: 16,
    lineHeight: 24,
    type: "display",
    color: 'var(--text)'
  }),
  footer: new FontStyle({
    fontSize: 12,
    lineHeight: 16,
  }),
};
