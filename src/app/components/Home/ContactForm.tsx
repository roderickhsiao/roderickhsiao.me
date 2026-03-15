'use client';

import { useActionState } from 'react';
import { submitContactForm } from '../../actions/contact';

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, null);

  const inputClass =
    'w-full px-4 py-3 type-caption bg-surface/60 border border-ink/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 transition-all duration-200 placeholder:text-ink/30 text-ink';

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="type-heading-sm text-ink">Get in Touch</h3>
        <p className="type-body-sm">
          Happy to chat about web ideas, projects, or collaboration opportunities.
        </p>
      </div>

      <form action={formAction} className="space-y-3">
        <input type="text" name="name" placeholder="Your name" required className={inputClass} />
        <input type="email" name="email" placeholder="Email address" required className={inputClass} />
        <input type="text" name="subject" placeholder="Subject" required className={inputClass} />
        <textarea
          name="message"
          placeholder="Tell me about your project or what you'd like to discuss..."
          required
          rows={4}
          className={`${inputClass} resize-none`}
        />

        <button
          type="submit"
          disabled={isPending}
          className="type-label w-full bg-ink text-ink-inverted py-4 px-6 rounded-full hover:bg-accent transition-colors duration-200 shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Sending…' : 'Send Message'}
        </button>

        {state?.success && (
          <p className="type-caption text-center text-success bg-success/8 border border-success/20 rounded-2xl px-4 py-3">
            Message sent — I'll get back to you soon.
          </p>
        )}
        {state?.error && (
          <p className="type-caption text-center text-error bg-error/8 border border-error/20 rounded-2xl px-4 py-3">
            Something went wrong. {state.error}
          </p>
        )}
      </form>
    </div>
  );
}
