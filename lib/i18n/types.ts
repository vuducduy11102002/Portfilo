export type Locale = "vi" | "en";

export const LOCALES: Locale[] = ["vi", "en"];
export const DEFAULT_LOCALE: Locale = "en";
export const LANG_STORAGE_KEY = "portfolio-lang";

/** Giá trị song ngữ: { vi, en }. */
export type L10n<T = string> = Record<Locale, T>;

/** Lấy giá trị theo locale. */
export function tr<T>(locale: Locale, value: L10n<T>): T {
  return value[locale];
}
