export const cn = (...classNames: Array<string | undefined | null | false>) =>
  classNames.filter(Boolean).join(' ');
