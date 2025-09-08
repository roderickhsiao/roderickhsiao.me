'use client';

import { useState } from 'react';
import clsx from 'clsx';

interface BookingFormProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export default function BookingForm({ onClose, onSuccess }: BookingFormProps) {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleExternalBooking = () => {
    // Open Calendly in a new tab
    window.open('https://calendly.com/roderickhsiao/30-mins', '_blank', 'noopener,noreferrer');
    
    // Show success state
    setShowSuccess(true);
    onSuccess?.();
    
    // Auto-close after showing confirmation
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="text-center py-8">
        {/* Success Animation */}
        <div className="relative mb-6">
          <div className="animate-pulse">
            <div className="w-16 h-16 mx-auto bg-blue-500 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Calendly Opened!</h3>
        <p className="text-sm text-gray-600">Please check your new tab to schedule our session.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center py-6">
        <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Book a Session</h3>
        <p className="text-sm text-gray-600 mb-6">
          Let’s schedule a 30-minute conversation to discuss your project, ideas, or just connect!
        </p>
        
        <div className="space-y-3 text-left">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>30-minute focused discussion</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Video call or phone</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Flexible scheduling</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-4 py-2 text-sm text-gray-600 bg-gray-100/80 border border-gray-200/50 rounded-lg hover:bg-gray-200/80 transition-all duration-200 backdrop-blur-sm"
        >
          Cancel
        </button>
        
        <button
          onClick={handleExternalBooking}
          className={clsx(
            'flex-1 px-4 py-2 text-sm font-medium text-white rounded-lg transition-all duration-200',
            'bg-blue-600 hover:bg-blue-700',
            'focus:outline-none focus:ring-2 focus:ring-blue-500/20'
          )}
        >
          Open Calendly
        </button>
      </div>
    </div>
  );
}
