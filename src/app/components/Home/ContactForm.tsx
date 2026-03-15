'use client';

import { useActionState } from 'react';
import { submitContactForm } from '../../actions/contact';
import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('contact');
  const [state, formAction, isPending] = useActionState(submitContactForm, null);

  const inputClass =
    'w-full px-4 py-3 type-caption bg-surface/60 border border-ink/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 transition-all duration-200 placeholder:text-ink/30 text-ink';

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="type-heading-sm text-ink">{t('heading')}</h3>
        <p className="type-body-sm">
          {t('subheading')}
        </p>
      </div>

      <form action={formAction} className="space-y-3">
        <input type="text" name="name" placeholder={t('namePlaceholder')} required className={inputClass} />
        <input type="email" name="email" placeholder={t('emailPlaceholder')} required className={inputClass} />
        <input type="text" name="subject" placeholder={t('subjectPlaceholder')} required className={inputClass} />
        <textarea
          name="message"
          placeholder={t('messagePlaceholder')}
          required
          rows={4}
          className={`${inputClass} resize-none`}
        />

        <button
          type="submit"
          disabled={isPending}
          className="type-label w-full bg-ink text-ink-inverted py-4 px-6 rounded-full hover:bg-accent transition-colors duration-200 shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? t('submitting') : t('submit')}
        </button>

        {state?.success && (
          <p className="type-caption text-center text-success bg-success/8 border border-success/20 rounded-2xl px-4 py-3">
            {t('success')}
          </p>
        )}
        {state?.error && (
          <p className="type-caption text-center text-error bg-error/8 border border-error/20 rounded-2xl px-4 py-3">
            {t('error', { error: state.error! })}
          </p>
        )}
      </form>
    </div>
  );
}
