import { FontStyle, FontStyleType } from "../interfaces";

export const fontStyles: Record<FontStyleType, FontStyle> = {
  title: {
    type: 'display',
    fontSize: 128,
    lineHeight: 112,
    letterSpacing: -.04,
    color: 'var(--text)',
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 28,
  },
  menuSelected: {
    type: 'display',
    fontSize: 20,
    letterSpacing: -0.04,
    lineHeight: 24,
    color: 'var(--text)',
  },
  menu: {
    fontSize: 18,
    lineHeight: 24,
  },
  action: {
    fontSize: 16,
    lineHeight: 24,
    type: "display",
    color: 'var(--text)'
  },
  footer: {
    fontSize: 12,
    lineHeight: 16,
  },
};
