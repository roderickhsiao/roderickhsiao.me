'use client';

import { unstable_ViewTransition as ViewTransition } from 'react';

type Props = {
  children: React.ReactNode;
  name: string;
  className?: string;
};

export default function ViewTransitionWrapper({
  children,
  name,
  className,
}: Props) {
  return (
    <ViewTransition>
      <div style={{ viewTransitionName: name }} className={className}>
        {children}
      </div>
    </ViewTransition>
  );
}
