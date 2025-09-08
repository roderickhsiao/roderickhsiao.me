'use client';

import {
  useState,
  startTransition,
  unstable_ViewTransition as ViewTransition,
} from 'react';
import clsx from 'clsx';
import ContactForm from './ContactForm';
import BookingForm from './BookingForm';
import './contact-view-transitions.css';

export default function Contact() {
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
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/5 via-slate-800/8 to-slate-900/10 rounded-xl blur-2xl scale-110"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/15 via-green-50/10 to-teal-100/15 rounded-xl blur-xl scale-105"></div>
      <ViewTransition>
        <div
          className={clsx(
            'contact-card relative w-full rounded-xl overflow-hidden border border-white/30 flex flex-col transition-all duration-300',
            {
              'min-h-[700px]': activeForm === 'booking',
              'min-h-[400px]': activeForm === 'contact',
              'aspect-[1.587/1]': !showForm,
            }
          )}
          style={{
            background: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'url(#glass-filter) saturate(150%)',
            WebkitBackdropFilter: 'blur(8px) saturate(150%)',
            boxShadow:
              '0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
          }}
        >
          <div className="rh-logo absolute top-2 sm:top-3 md:top-4 start-4 z-10">
            <div className="text-white/70 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider">
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
                    className="message-button flex items-center gap-1 sm:gap-1.5 text-gray-700 text-xs sm:text-xs md:text-xs font-medium px-2 sm:px-2.5 md:px-2.5 py-1.5 sm:py-1.5 rounded-full hover:scale-105 hover:text-gray-800 hover:shadow-md backdrop-blur-sm border border-white/30 cursor-pointer max-h-fit cursor-pointer"
                    style={{
                      background: 'rgba(255, 255, 255, 0.3)',
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
                    MESSAGE
                  </button>
                </ViewTransition>
                <ViewTransition name="booking-trigger">
                  <button
                    onClick={handleShowBookingForm}
                    className="book-button flex items-center gap-1 sm:gap-1.5 text-gray-700 text-xs sm:text-xs md:text-xs font-medium px-2 sm:px-2.5 md:px-2.5 py-1.5 sm:py-1.5 rounded-full hover:scale-105 hover:text-gray-800 hover:shadow-md backdrop-blur-sm border border-white/30 cursor-pointer"
                    style={{
                      background: 'rgba(255, 255, 255, 0.3)',
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
                    BOOK
                  </button>
                </ViewTransition>
              </>
            ) : (
              <button
                onClick={handleClose}
                className="close-button flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 text-gray-600 hover:text-gray-800 rounded-full hover:bg-white/30 bg-white/20 backdrop-blur-sm cursor-pointer border border-white/30 transition-all duration-200 hover:scale-105 shrink-0 cursor-pointer"
                aria-label="Close"
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
                      <p className="text-gray-600 text-xs sm:text-sm md:text-sm leading-relaxed font-normal">
                        Hey there! 👋 Thanks for stopping by! Drop me a message
                        to chat about web ideas, cool projects, or even house
                        music.
                      </p>
                    </div>
                  </div>

                  {/* Languages - at bottom */}
                  <div className="px-3 lg:px-4 pb-3 lg:pb-4">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-xs font-medium text-gray-600 bg-white/40 rounded-full border border-white/30 shrink-0">
                        🇺🇸 English
                      </span>
                      <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-xs font-medium text-gray-600 bg-white/40 rounded-full border border-white/30 shrink-0">
                        🇹🇼 Mandarin
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ViewTransition>

          {/* Glass reflection overlay */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/8 via-transparent to-transparent pointer-events-none"></div>
        </div>
      </ViewTransition>
    </div>
  );
}
