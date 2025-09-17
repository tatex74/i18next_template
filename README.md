# Next.js 15 i18n Starter Template

A clean, production-ready internationalization (i18n) setup for Next.js 15 App Router with server-side rendering and zero hydration issues.

## Requirements

- **Node.js**: 18.17+ or 20.0+
- **Next.js**: 15.5.3+
- **React**: 19.1.0+
- **TypeScript**: 5.0+

## Dependencies

- `i18next`: ^25.5.2
- `react-i18next`: ^15.7.3
- `i18next-browser-languagedetector`: ^8.2.0

## Features

- ✅ Server-side rendering with translations
- ✅ No hydration mismatches
- ✅ URL-based language routing (`/en`, `/fr`)
- ✅ Automatic language detection from browser
- ✅ Clean architecture with minimal client-side code
- ✅ TypeScript support
- ✅ Easy to extend with new languages

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

Visit:
- `http://localhost:3000` - Redirects to browser language
- `http://localhost:3000/en` - English version
- `http://localhost:3000/fr` - French version

## Project Structure

```
src/
├── app/
│   ├── [lang]/                 # Dynamic language routing
│   │   ├── layout.tsx          # Language-specific layout
│   │   └── page.tsx            # Home page
│   └── layout.tsx              # Root layout
├── components/
│   └── LanguageSwitcher.tsx    # Client component for language switching
├── i18n/
│   ├── settings.ts             # i18n configuration
│   ├── server.ts               # Server-side translation logic
│   └── locales/
│       ├── en/
│       │   └── translation.json
│       └── fr/
│           └── translation.json
└── middleware.ts               # Language routing middleware
```

## Adding a New Language

### 1. Update settings

```typescript
// src/i18n/settings.ts
export const locales = ['en', 'fr', 'es']; // Add 'es'
```

### 2. Add translation file

```json
// src/i18n/locales/es/translation.json
{
  "welcome": {
    "title": "Bienvenido",
    "subtitle": "..."
  }
}
```

### 3. Import in server.ts

```typescript
// src/i18n/server.ts
resources: {
  en: { ... },
  fr: { ... },
  es: {
    translation: await import('./locales/es/translation.json').then(m => m.default),
  },
}
```

## Creating New Pages

### Server Component (Recommended)

```typescript
// src/app/[lang]/about/page.tsx
import { getTranslation } from '../../../i18n/server';

export default async function AboutPage({
  params
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;
  const { t } = await getTranslation(lang);

  return (
    <div>
      <h1>{t('about.title')}</h1>
      <p>{t('about.description')}</p>
    </div>
  );
}
```

### With Language Switcher

```typescript
import LanguageSwitcher from '../../../components/LanguageSwitcher';

export default async function PageWithSwitcher({ params }) {
  const { lang } = await params;
  const { t } = await getTranslation(lang);

  return (
    <>
      <LanguageSwitcher />
      <h1>{t('title')}</h1>
    </>
  );
}
```

## Translation File Structure

```json
{
  "section": {
    "key": "Translation text",
    "nested": {
      "key": "Nested translation"
    }
  }
}
```

Access in code: `t('section.key')` or `t('section.nested.key')`

## Middleware Configuration

The middleware automatically:
1. Detects browser language from `Accept-Language` header
2. Redirects `/` to `/[locale]`
3. Preserves all other paths

## Environment Variables

No environment variables required! The setup works out of the box.

## Production Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Deployment Checklist

- [ ] All translation keys are defined in all language files
- [ ] Language switcher works correctly
- [ ] SEO meta tags are translated
- [ ] No console errors or warnings
- [ ] URLs update correctly when switching languages

## Common Issues & Solutions

### Issue: Hydration mismatch
**Solution**: Already handled! All translations are server-rendered.

### Issue: Language not changing
**Solution**: Check that the language code is added to `locales` array in settings.ts

### Issue: Missing translations
**Solution**: Ensure all keys exist in all language JSON files

## License

MIT

## Contributing

1. Fork the repository
2. Add your language/feature
3. Submit a pull request

---

Built with ❤️ using Next.js 15, TypeScript, and i18next