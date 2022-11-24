import { FontStyle, FontStyleType } from "../../interfaces";

export const fontStyles: Record<FontStyleType, FontStyle> = {
  title: {
    type: 'display',
    fontSize: 128,
    height: 112,
    letterSpacing: -.04,
    color: 'var(--text)',
  },
  h2: {
    type: 'display',
    fontSize: 96,
    height: 96,
    letterSpacing: -.04,
    color: 'var(--text)',
  },
  subtitle: {
    fontSize: 20,
    height: 28,
    color: 'var(--secondary)',
  },
  menuSelected: {
    type: 'display',
    fontSize: 20,
    letterSpacing: -0.04,
    height: 24,
    color: 'var(--text)',
  },
  menu: {
    fontSize: 18,
    height: 24,
    color: 'var(--secondary)',
  },
  action: {
    fontSize: 16,
    height: 24,
    type: "display",
    color: 'var(--text)'
  },
  footer: {
    fontSize: 12,
    height: 16,
    color: 'var(--secondary)',
  },
};
