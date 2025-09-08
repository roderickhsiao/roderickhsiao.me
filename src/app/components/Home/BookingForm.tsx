'use client';

import { useState, useEffect } from 'react';
import { InlineWidget } from 'react-calendly';
import clsx from 'clsx';
import LoadingIndicator from '../shared/LoadingIndicator';

export default function BookingForm() {
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="w-full h-full relative rounded-xl overflow-hidden bg-white">
      {isLoading && <LoadingIndicator text="Fetching appointment times..." />}
      <div
        className={clsx('w-full h-full transition-opacity duration-500', {
          'opacity-0': isLoading,
          'opacity-100': !isLoading,
        })}
      >
        <InlineWidget
          url="https://calendly.com/roderickhsiao/30-mins"
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
