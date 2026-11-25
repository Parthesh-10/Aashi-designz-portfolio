'use client';

import { useEffect } from 'react';

export default function ContactPopupTimer() {
  useEffect(() => {
    const popup = document.querySelector('.popup');
    if (!popup) return undefined;

    popup.classList.add('active');
    const id = setTimeout(() => {
      popup.classList.remove('active');
    }, 3000);

    return () => clearTimeout(id);
  }, []);

  return null;
}
