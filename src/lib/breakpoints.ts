export const breakpoints = {
    xxs: 0,
    xs: 420,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
    xxl: 1920,
    xxxl: 2500
} as const;

export type Breakpoint = keyof typeof breakpoints;

export const minWidthQuery = (breakpoint: Breakpoint) =>
  `(min-width: ${breakpoints[breakpoint]}px)`;
