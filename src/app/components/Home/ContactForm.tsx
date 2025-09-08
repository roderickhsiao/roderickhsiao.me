'use client';

import { useActionState } from 'react';
import { submitContactForm } from '../../actions/contact';

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, null);

  return (
    <div className="space-y-4 sm:space-y-5 mt-4">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-gray-700 text-sm sm:text-base font-medium mb-2">
          Get in Touch
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
          I’d be happy to discuss your project needs, explore collaboration opportunities, or answer any questions you might have about web development.
        </p>
      </div>

            <form action={formAction} className="space-y-3 sm:space-y-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            required
            className="w-full px-3 py-2 text-sm border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/40 bg-white/60 backdrop-blur-sm transition-all duration-200 placeholder:text-gray-500"
          />
        </div>
        
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            required
            className="w-full px-3 py-2 text-sm border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/40 bg-white/60 backdrop-blur-sm transition-all duration-200 placeholder:text-gray-500"
          />
        </div>
        
        <div>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            required
            className="w-full px-3 py-2 text-sm border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/40 bg-white/60 backdrop-blur-sm transition-all duration-200 placeholder:text-gray-500"
          />
        </div>
        
        <div>
          <textarea
            name="message"
            placeholder="Tell me about your project or what you’d like to discuss..."
            required
            rows={4}
            className="w-full px-3 py-2 text-sm border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/40 bg-white/60 backdrop-blur-sm transition-all duration-200 resize-none placeholder:text-gray-500"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full text-gray-700 text-sm font-medium px-3 py-2 rounded-full hover:scale-105 hover:text-gray-800 hover:shadow-md backdrop-blur-sm border border-white/30 cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: 'rgba(255, 255, 255, 0.3)',
          }}
        >
          {isPending ? 'Sending...' : 'Send Message'}
        </button>

        {state?.success && (
          <div className="text-emerald-600 text-sm text-center bg-emerald-50/60 backdrop-blur-sm border border-emerald-200/50 rounded-xl px-3 py-2">
            Thank you for your message. I’ll get back to you soon.
          </div>
        )}

        {state?.error && (
          <div className="text-red-600 text-sm text-center bg-red-50/60 backdrop-blur-sm border border-red-200/50 rounded-xl px-3 py-2">
            There was an issue sending your message. {state.error}
          </div>
        )}
      </form>
    </div>
  );
}
