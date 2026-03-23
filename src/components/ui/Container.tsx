/**
 * Container.tsx
 * Wraps content with the site-wide max-width and responsive horizontal padding.
 * Replaces the repeated:
 *   max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 4xl:px-24
 */

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 4xl:px-24 ${className}`}>
      {children}
    </div>
  );
}
