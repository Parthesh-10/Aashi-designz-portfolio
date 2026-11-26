import React from 'react';

interface PageContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  ref?: React.Ref<HTMLElement>;
}

export default function PageContainer({
  children,
  className = '',
  as: Component = 'div',
  ref,
  ...rest
}: PageContainerProps) {
  return (
    <Component
      ref={ref}
      className={`mx-auto box-border w-full px-6 md:px-12 xl:px-[min(10.4vw,200px)] ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
}
