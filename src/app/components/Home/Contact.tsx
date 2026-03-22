'use client';

import { useState, startTransition, ViewTransition } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import ContactForm from './ContactForm';
import BookingForm from './BookingForm';

import './contact-view-transitions.css';

type SpokenLanguage = {
  flag: string;
  label: string;
  countryCode?: string;
};

function getFlagSrc(countryCode: string, width: 40 | 80 = 40): string {
  return `https://flagcdn.com/w${width}/${countryCode}.png`;
}

export default function Contact() {
  const tContact = useTranslations('contact');
  const tProfile = useTranslations('profile');
  const [activeForm, setActiveForm] = useState<'contact' | 'booking' | null>(
    null
  );

  const handleShowContactForm = () => {
    startTransition(() => {
      setActiveForm('contact');
    });
  };

  const handleShowBookingForm = () => {
    startTransition(() => {
      setActiveForm('booking');
    });
  };

  const handleClose = () => {
    startTransition(() => {
      setActiveForm(null);
    });
  };

  const showForm = activeForm !== null;

  return (
    <div className="w-full mx-auto relative">
      {/* Background layers - outside of view transition to prevent flashing */}
      <div className="absolute inset-0 bg-linear-to-br from-(--gaudi-terracotta)/12 via-(--gaudi-ochre)/10 to-(--gaudi-sea)/14 rounded-[34px] blur-2xl scale-110"></div>
      <div className="absolute inset-0 bg-linear-to-br from-[#fff4df]/45 via-[#f5deb8]/20 to-[#f0d2ae]/35 rounded-[34px] blur-xl scale-105"></div>
      <ViewTransition>
        <div
          className={clsx(
            'contact-card relative w-full overflow-hidden flex flex-col transition-all duration-300 border-(--ds-border-soft) rounded-(--ds-radius-shell)',
            {
              'min-h-175': activeForm === 'booking',
              'min-h-100': activeForm === 'contact',
              'aspect-[1.587/1]': !showForm,
            }
          )}
          style={{
            background:
              'linear-gradient(150deg, rgba(255, 249, 236, 0.9) 0%, rgba(248, 230, 198, 0.7) 50%, rgba(241, 214, 169, 0.65) 100%)',
            backdropFilter: 'url(#glass-filter) saturate(150%)',
            WebkitBackdropFilter: 'blur(8px) saturate(150%)',
            boxShadow:
              '0 10px 34px rgba(66, 39, 12, 0.14), 0 2px 8px rgba(66, 39, 12, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
          }}
        >
          <div className="gaudi-arches opacity-30"></div>
          <div className="rh-logo absolute top-2 sm:top-3 md:top-4 inset-s-4 z-10">
            <div className="text-(--gaudi-terracotta)/70 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider">
              RH
            </div>
          </div>

          {/* Header Section */}
          <div className="contact-header flex justify-end gap-1 sm:gap-1.5 md:gap-2 p-2 sm:p-3 md:p-4 relative z-10">
            {!showForm ? (
              <>
                <ViewTransition name="message-trigger">
                  <button
                    onClick={handleShowContactForm}
                    className="message-button flex items-center gap-1 sm:gap-1.5 text-(--color-muted) text-xs sm:text-xs md:text-xs font-medium px-2 sm:px-2.5 md:px-2.5 py-1.5 sm:py-1.5 rounded-full hover:scale-105 hover:text-(--gaudi-terracotta) hover:shadow-md backdrop-blur-sm border-(--ds-border-pill) cursor-pointer max-h-fit"
                    style={{
                      background: 'var(--gaudi-pill-bg)',
                    }}
                  >
                    <svg
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    {tContact('messageButton').toUpperCase()}
                  </button>
                </ViewTransition>
                <ViewTransition name="booking-trigger">
                  <button
                    onClick={handleShowBookingForm}
                    className="book-button flex items-center gap-1 sm:gap-1.5 text-(--color-muted) text-xs sm:text-xs md:text-xs font-medium px-2 sm:px-2.5 md:px-2.5 py-1.5 sm:py-1.5 rounded-full hover:scale-105 hover:text-(--gaudi-terracotta) hover:shadow-md backdrop-blur-sm border-(--ds-border-pill) cursor-pointer"
                    style={{
                      background: 'var(--gaudi-pill-bg)',
                    }}
                  >
                    <svg
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {tContact('bookButton').toUpperCase()}
                  </button>
                </ViewTransition>
              </>
            ) : (
              <button
                onClick={handleClose}
                className="close-button flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 text-(--color-muted) hover:text-(--gaudi-terracotta) rounded-full hover:bg-white/50 bg-white/35 backdrop-blur-sm cursor-pointer border-(--ds-border-pill) transition-all duration-200 hover:scale-105 shrink-0"
                aria-label={tContact('closeAriaLabel')}
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Dynamic Content Area */}
          <ViewTransition name="main-content">
            <div className="flex-1 flex flex-col">
              {/* Contact Form */}
              {activeForm === 'contact' && (
                <ViewTransition name="message-trigger">
                  <div className="contact-form flex-1 flex flex-col justify-start p-3 lg:p-4">
                    <ContactForm />
                  </div>
                </ViewTransition>
              )}

              {/* Booking Form */}
              {activeForm === 'booking' && (
                <ViewTransition name="booking-trigger">
                  <div className="booking-form flex-1 flex flex-col justify-start p-3 lg:p-4">
                    <BookingForm />
                  </div>
                </ViewTransition>
              )}

              {/* Initial Content */}
              {!showForm && (
                <div className="contact-content flex-1 flex flex-col">
                  {/* Welcome Message - centered */}
                  <div className="flex-1 flex items-center px-3 lg:px-4">
                    <div>
                      <p className="text-(--color-muted) text-xs sm:text-sm md:text-sm leading-relaxed font-normal">
                        {tContact.rich('cardWelcome', {
                          highlight1: (chunks) => (
                            <span className="font-medium text-(--gaudi-terracotta)">{chunks}</span>
                          ),
                          highlight2: (chunks) => (
                            <span className="font-medium text-(--gaudi-sea)">{chunks}</span>
                          ),
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Languages - at bottom */}
                  <div className="px-3 lg:px-4 pb-3 lg:pb-4">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {(tProfile.raw('languages') as SpokenLanguage[]).map(
                        ({ flag, label, countryCode }) => (
                          <span
                            key={label}
                            className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-xs font-medium rounded-full border-(--ds-border-pill) [background:var(--gaudi-pill-bg)] text-[rgb(45_37_26/0.92)] shrink-0"
                          >
                            {countryCode ? (
                              <Image
                                src={getFlagSrc(countryCode)}
                                alt={`${label} flag`}
                                width={16}
                                height={12}
                                className="me-1 h-3 w-4 rounded-xs object-cover"
                              />
                            ) : (
                              <span className="me-1">{flag}</span>
                            )}
                            {label}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ViewTransition>

          {/* Glass reflection overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-white/8 via-transparent to-transparent pointer-events-none"></div>
        </div>
      </ViewTransition>
    </div>
  );
}
