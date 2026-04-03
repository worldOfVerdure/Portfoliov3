'use client';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { CSSProperties, MouseEvent, ReactNode, useEffect } from 'react';
import { cn } from '@/lib/cn';
import styles from './Link.module.css';

const PENDING_SCROLL_TARGET_KEY = 'pending-scroll-target';

type LinkVariant = 'text' | 'buttonPrimary' | 'buttonSecondary' | 'buttonGhost';
type LinkSize = 'none' | 'sm' | 'md' | 'lg' | 'compact-lg';

type LinkSlots = {
  root?: string;
  label?: string;
};

type LinkTokenOverrides = {
  '--link-bg'?: string;
  '--link-color'?: string;
  '--link-border'?: string;
  '--link-radius'?: string;
  '--link-px'?: string;
  '--link-py'?: string;
  '--link-font-size'?: string;
  '--link-decoration'?: string;
  '--link-hover-decoration'?: string;
};

type NativeAnchorProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof NextLinkProps | 'href' | 'children'
>;

export type LinkProps = NextLinkProps &
  NativeAnchorProps & {
    children: ReactNode;
    variant?: LinkVariant;
    size?: LinkSize;
    classes?: LinkSlots;
    vars?: LinkTokenOverrides;
    unstyled?: boolean;
  };

export function Link({
  variant = 'text',
  size = 'none',
  classes,
  className,
  vars,
  style,
  children,
  href,
  onClick,
  unstyled = false,
  ...rest
}: LinkProps) {
  const pathname = usePathname();
  const router = useRouter();
  const sizeClass = size === 'none' ? undefined : styles[size];

  const mergedStyle = {
    ...(style ?? {}),
    ...(vars ?? {})
  } as CSSProperties;

  useEffect(() => {
    if (pathname !== '/') {
      return;
    }

    const pendingTarget = window.sessionStorage.getItem(PENDING_SCROLL_TARGET_KEY);
    const hashTarget = pendingTarget ?? decodeURIComponent(window.location.hash.slice(1));

    if (!hashTarget) {
      return;
    }

    let frameId = 0;

    const scrollToTarget = (attempt = 0) => {
      const target = document.getElementById(hashTarget);

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', `/#${hashTarget}`);
        window.sessionStorage.removeItem(PENDING_SCROLL_TARGET_KEY);
        return;
      }

      if (attempt < 10) {
        frameId = window.requestAnimationFrame(() => {
          scrollToTarget(attempt + 1);
        });
      }
    };

    scrollToTarget();

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [pathname]);

  const getTargetId = (value: string) => {
    if (value.startsWith('/#')) {
      return decodeURIComponent(value.slice(2));
    }

    if (value.startsWith('#')) {
      return decodeURIComponent(value.slice(1));
    }

    return '';
  };

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (event.defaultPrevented || typeof href !== 'string') {
      return;
    }

    const targetId = getTargetId(href);

    if (!targetId) {
      return;
    }

    if (href.startsWith('/#') && pathname !== '/') {
      event.preventDefault();
      window.sessionStorage.setItem(PENDING_SCROLL_TARGET_KEY, targetId);
      router.push(`/#${targetId}`);
      event.currentTarget.blur();
      return;
    }

    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    const nextHash = pathname === '/' ? `/#${targetId}` : `#${targetId}`;

    if (window.location.pathname + window.location.hash !== nextHash) {
      window.history.replaceState(null, '', nextHash);
    }

    event.currentTarget.blur();
  };

  if (unstyled) {
    return (
      <NextLink
        className={cn(classes?.root, className)}
        href={href}
        onClick={handleClick}
        style={mergedStyle}
        {...rest}
      >
        <span className={cn(classes?.label)}>{children}</span>
      </NextLink>
    );
  }

  return (
    <NextLink
      className={cn(styles.link, sizeClass, styles[variant], classes?.root, className)}
      href={href}
      onClick={handleClick}
      style={mergedStyle}
      {...rest}
    >
      <span className={cn(styles.label, classes?.label)}>{children}</span>
    </NextLink>
  );
}
