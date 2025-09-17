/**
 * Server-side i18n configuration
 *
 * This module handles server-side translation loading and initialization.
 * It creates a new i18next instance for each request to ensure proper
 * server-side rendering without hydration issues.
 */

import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { getOptions } from './settings';

/**
 * Initialize a new i18next instance with translations
 * @param lng - Language code
 * @param ns - Namespace (optional)
 * @returns Configured i18next instance
 */
const initI18next = async (lng: string, ns?: string) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .init({
      ...getOptions(lng, ns),
      lng,
      resources: {
        en: {
          translation: await import('./locales/en/translation.json').then(m => m.default),
        },
        fr: {
          translation: await import('./locales/fr/translation.json').then(m => m.default),
        },
        // Add new languages here:
        // es: {
        //   translation: await import('./locales/es/translation.json').then(m => m.default),
        // },
      },
    });
  return i18nInstance;
};

/**
 * Get translation function for server components
 *
 * Usage in server components:
 * ```tsx
 * const { t } = await getTranslation(lang);
 * return <h1>{t('welcome.title')}</h1>;
 * ```
 *
 * @param lng - Language code
 * @param ns - Namespace (optional)
 * @returns Object with translation function and i18n instance
 */
export async function getTranslation(lng: string, ns?: string) {
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(lng, ns),
    i18n: i18nextInstance,
  };
}