// Type definitions for i18n translations

export interface TranslationResource {
  welcome: {
    title: string;
    subtitle: string;
  };
  navigation: {
    home: string;
    about: string;
    contact: string;
  };
  features: {
    title: string;
    item1: string;
    item2: string;
    item3: string;
    item4: string;
  };
  actions: {
    getStarted: string;
    learnMore: string;
    deploy: string;
  };
  footer: {
    copyright: string;
    madeWith: string;
  };
}

// Helper type for translation keys
export type TranslationKey = keyof TranslationResource |
  `${keyof TranslationResource}.${string}`;

// Supported languages
export type SupportedLanguage = 'en' | 'fr';