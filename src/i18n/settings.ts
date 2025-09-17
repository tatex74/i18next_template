/**
 * i18n Configuration Settings
 *
 * This file contains all the configuration for internationalization.
 * To add a new language, simply add it to the `locales` array and create
 * the corresponding translation files.
 */

/** Default language when no language is specified */
export const defaultLocale = 'en';

/** Array of supported language codes */
export const locales = ['en', 'fr'];

/** Default namespace for translations */
export const defaultNS = 'translation';

/**
 * Generate i18next configuration options
 * @param lng - Language code
 * @param ns - Namespace
 * @returns i18next configuration object
 */
export function getOptions(lng = defaultLocale, ns = defaultNS) {
  return {
    supportedLngs: locales,
    fallbackLng: defaultLocale,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}