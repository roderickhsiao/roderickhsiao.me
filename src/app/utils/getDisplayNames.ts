const FALLBACK: Record<string, string> = {
  HK: 'Hong Kong',
  TW: 'Taiwan',
  VA: 'Vatican City',
};

const LANGUAGE_FALLBACK: Record<string, string> = {
  en: 'English',
  'zh-Hant': 'Traditional Chinese',
};

/** Module-level cache — one Intl.DisplayNames instance per locale/type pair. */
const cache = new Map<string, Intl.DisplayNames>();

function getDisplayNames(locale: string, type: Intl.DisplayNamesOptions['type']): Intl.DisplayNames {
  const key = `${locale}:${type}`;
  let dn = cache.get(key);
  if (!dn) {
    dn = new Intl.DisplayNames([locale], { type });
    cache.set(key, dn);
  }
  return dn;
}

/**
 * Returns a localised display name for language/region/script/currency values.
 */
export function formatDisplayName(
  value: string,
  locale: string,
  type: Intl.DisplayNamesOptions['type'] = 'language',
): string {
  try {
    return getDisplayNames(locale, type).of(value) ??
      (type === 'region' ? FALLBACK[value] : LANGUAGE_FALLBACK[value]) ??
      value;
  } catch {
    return (type === 'region' ? FALLBACK[value] : LANGUAGE_FALLBACK[value]) ?? value;
  }
}

/**
 * Returns the localised display name for an ISO 3166-1 alpha-2 region code.
 * Re-uses a cached Intl.DisplayNames instance per locale.
 */
export function getRegionDisplayName(code: string, locale: string): string {
  return formatDisplayName(code, locale, 'region');
}
