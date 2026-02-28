import { ButtonHTMLAttributes, CSSProperties } from 'react';
import { cn } from '@/lib/cn';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonSlots = {
  root?: string;
  label?: string;
};

type ButtonTokenOverrides = {
  '--btn-bg'?: string;
  '--btn-color'?: string;
  '--btn-border'?: string;
  '--btn-radius'?: string;
  '--btn-px'?: string;
  '--btn-py'?: string;
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  classes?: ButtonSlots;
  vars?: ButtonTokenOverrides;
  unstyled?: boolean;
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  classes,
  vars,
  style,
  children,
  unstyled = false,
  ...rest
}: ButtonProps) {
  const mergedStyle = {
    ...(style ?? {}),
    ...(vars ?? {})
  } as CSSProperties;

  if (unstyled) {
    return (
      <button className={cn(classes?.root, className)} style={mergedStyle} {...rest}>
        <span className={cn(classes?.label)}>{children}</span>
      </button>
    );
  }

  return (
    <button
      className={cn(styles.button, styles[variant], styles[size], classes?.root, className)}
      style={mergedStyle}
      {...rest}
    >
      <span className={cn(styles.label, classes?.label)}>{children}</span>
    </button>
  );
}
