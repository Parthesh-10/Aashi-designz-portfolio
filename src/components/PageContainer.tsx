import React from 'react';

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export default function PageContainer({
  children,
  className = '',
  as: Component = 'div',
  ...rest
}: PageContainerProps) {
  return (
    <Component
      className={`mx-auto box-border w-full px-6 md:px-12 xl:px-[min(10.4vw,200px)] ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
}
