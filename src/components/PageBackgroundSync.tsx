'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PageBackgroundSync() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (pathname === '/about' || pathname.startsWith('/about/')) {
      document.body.style.backgroundColor = '#F3EDFC';
      document.documentElement.style.backgroundColor = '#F3EDFC';
    } else if (pathname === '/service' || pathname.startsWith('/service/')) {
      document.body.style.backgroundColor = '#F7F3FD';
      document.documentElement.style.backgroundColor = '#F7F3FD';
    } else {
      document.body.style.backgroundColor = '';
      document.documentElement.style.backgroundColor = '';
    }
  }, [pathname]);

  return null;
}
