declare module 'country-flag-emoji' {
  export function flag(countryCode: string): string | undefined;
  export function code(flag: string): string | undefined;
  export function name(countryCode: string): string | undefined;
  export function emoji(countryCode: string): string | undefined;
  export const countries: Array<{
    code: string;
    flag: string;
    name: string;
    unicode: string;
  }>;
}
