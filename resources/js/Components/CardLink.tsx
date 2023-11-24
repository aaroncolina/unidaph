import cx from 'classnames';

export interface CardLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

export function CardLink({
  href,
  target = '_blank',
  className,
  children,
  ...props
}: CardLinkProps) {
  return (
    <a
      {...props}
      href={href}
      target={target}
      className={cx(className, [
        'scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl',
        'from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset',
        'dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20',
        'dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all',
        'duration-250 focus:outline focus:outline-2 focus:outline-red-500',
        'animate-fade-in'
      ])}
    >
      {children}
    </a>
  );
}
