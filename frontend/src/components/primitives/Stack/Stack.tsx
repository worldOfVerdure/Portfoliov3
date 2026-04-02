import { ComponentPropsWithoutRef, CSSProperties, ElementType } from 'react';
import { cn } from '@/lib/cn';
import styles from './Stack.module.css';

export type StackElement =
  | 'div'
  | 'ol'
  | 'ul'
  | 'menu'
  | 'li'
  | 'a'
  | 'section'
  | 'nav'
  | 'article'
  | 'form';

type StackTokenOverrides = {
  '--stack-direction'?: CSSProperties['flexDirection'];
  '--stack-gap'?: CSSProperties['gap'];
  '--stack-align'?: CSSProperties['alignItems'];
  '--stack-justify'?: CSSProperties['justifyContent'];
  '--stack-wrap'?: CSSProperties['flexWrap'];
};

type StackOwnProps = {
  direction?: CSSProperties['flexDirection'];
  gap?: CSSProperties['gap'];
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  wrap?: CSSProperties['flexWrap'];
  inline?: boolean;
  vars?: StackTokenOverrides;
  className?: string;
  style?: CSSProperties;
};

export type StackProps<T extends StackElement = 'div'> = StackOwnProps & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof StackOwnProps | 'as'>;

export function Stack<T extends StackElement = 'div'>({
  as,
  direction,
  gap,
  align,
  justify,
  wrap,
  inline = false,
  vars,
  className,
  style,
  ...rest
}: StackProps<T>) {
  const Component = (as ?? 'div') as ElementType;

  const mergedStyle = {
    '--stack-direction': direction,
    '--stack-gap': gap,
    '--stack-align': align,
    '--stack-justify': justify,
    '--stack-wrap': wrap,
    ...(style ?? {}),
    ...(vars ?? {})
  } as CSSProperties;

  return (
    <Component
      className={cn(styles.stack, inline && styles.inline, className)}
      style={mergedStyle}
      {...rest}
    />
  );
}
