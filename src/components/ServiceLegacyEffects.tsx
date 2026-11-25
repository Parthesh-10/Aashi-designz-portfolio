'use client';

import { useEffect } from 'react';

export default function ServiceLegacyEffects() {
  useEffect(() => {
    const readMoreBtn = document.querySelector('.readMoreBtn');
    const handleReadMore = () => {
      const dots = document.getElementById('dots');
      const moreText = document.getElementById('more');
      const btnText = document.getElementById('myBtn');
      if (!dots || !moreText || !btnText) return;

      if (dots.style.display === 'none') {
        dots.style.display = 'inline';
        btnText.innerHTML = 'Read more';
        moreText.style.height = '0';
      } else {
        dots.style.display = 'none';
        btnText.innerHTML = 'Read less';
        moreText.style.height = '100%';
      }
    };

    if (readMoreBtn) {
      readMoreBtn.addEventListener('click', handleReadMore);
    }

    const tabFeature = document.querySelector('.tabFeature');
    const timeouts: Array<ReturnType<typeof setTimeout>> = [];
    let observer: IntersectionObserver | null = null;

    if (tabFeature) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const purpleDivs = document.querySelectorAll('.purpleDiv');
            purpleDivs.forEach((div, index) => {
              const id = setTimeout(() => {
                div.classList.add('onScreen');
              }, 300 * index);
              timeouts.push(id);
            });
          }
        });
      });
      observer.observe(tabFeature);
    }

    return () => {
      if (readMoreBtn) {
        readMoreBtn.removeEventListener('click', handleReadMore);
      }
      if (observer) {
        observer.disconnect();
      }
      timeouts.forEach((id) => clearTimeout(id));
    };
  }, []);

  return null;
}
