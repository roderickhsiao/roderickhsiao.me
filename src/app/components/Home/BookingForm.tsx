'use client';

import { useState, useEffect } from 'react';
import { InlineWidget } from 'react-calendly';
import clsx from 'clsx';
import { useLocale } from 'next-intl';
import LoadingIndicator from '../shared/LoadingIndicator';

export default function BookingForm() {
  const [isLoading, setIsLoading] = useState(true);
  const locale = useLocale();
  const calendlyLocale = locale === 'zh-Hant' ? 'zh-TW' : locale;
  const calendlyUrl = `https://calendly.com/roderickhsiao/30-mins?locale=${calendlyLocale}`;

  useEffect(() => {
    const animationPromise = new Promise((resolve) => setTimeout(resolve, 2200));
    const loadPromise = new Promise<void>((resolve) => {
      const handleMessage = (e: MessageEvent) => {
        if (e.data.event && e.data.event === 'calendly.event_type_viewed') {
          window.removeEventListener('message', handleMessage);
          resolve();
        }
      };
      window.addEventListener('message', handleMessage);
    });

    Promise.all([animationPromise, loadPromise]).then(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#fff8eb] border-(--ds-border-soft) rounded-[18px]">
      {isLoading && <LoadingIndicator text="Fetching appointment times..." />}
      <div
        className={clsx('w-full h-full transition-opacity duration-500', {
          'opacity-0': isLoading,
          'opacity-100': !isLoading,
        })}
      >
        <InlineWidget
          url={calendlyUrl}
          pageSettings={{
            backgroundColor: 'ffffff',
            hideEventTypeDetails: true,
            hideLandingPageDetails: true,
            primaryColor: '00a2ff',
            textColor: '4d5055',
          }}
        />
      </div>
    </div>
  );
}
