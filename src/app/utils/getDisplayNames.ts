const FALLBACK: Record<string, string> = {
  HK: 'Hong Kong',
  TW: 'Taiwan',
  VA: 'Vatican City',
};

/** Module-level cache — one Intl.DisplayNames instance per locale (same pattern as use-intl internals). */
const cache = new Map<string, Intl.DisplayNames>();

function getDisplayNames(locale: string): Intl.DisplayNames {
  let dn = cache.get(locale);
  if (!dn) {
    dn = new Intl.DisplayNames([locale], { type: 'region' });
    cache.set(locale, dn);
  }
  return dn;
}

/**
 * Returns the localised display name for an ISO 3166-1 alpha-2 region code.
 * Re-uses a cached Intl.DisplayNames instance per locale.
 */
export function getRegionDisplayName(code: string, locale: string): string {
  try {
    return getDisplayNames(locale).of(code) ?? FALLBACK[code] ?? code;
  } catch {
    return FALLBACK[code] ?? code;
  }
}
