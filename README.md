# Next.js 15 i18n + shadcn/ui Starter Template

A clean, production-ready internationalization (i18n) setup for Next.js 15 App Router with server-side rendering, zero hydration issues, and a complete shadcn/ui component library.

## Requirements

- **Node.js**: 18.17+ or 20.0+
- **Next.js**: 15.5.3+
- **React**: 19.1.0+
- **TypeScript**: 5.0+

## Dependencies

### Core i18n
- `i18next`: ^25.5.2
- `react-i18next`: ^15.7.3
- `i18next-browser-languagedetector`: ^8.2.0

### UI Components
- `shadcn/ui`: Complete component library
- `@radix-ui/*`: Primitives for accessible components
- `tailwindcss`: Utility-first CSS framework
- `class-variance-authority`: Class utilities

## Features

### Internationalization
- ✅ Server-side rendering with translations
- ✅ No hydration mismatches
- ✅ URL-based language routing (`/en`, `/fr`)
- ✅ Automatic language detection from browser
- ✅ Clean architecture with minimal client-side code
- ✅ TypeScript support
- ✅ Easy to extend with new languages

### UI Components (shadcn/ui)
- ✅ **47 pre-built components** ready to use
- ✅ Fully accessible with ARIA support
- ✅ Dark/light mode compatible
- ✅ Customizable with CSS variables
- ✅ Copy-paste friendly components
- ✅ Built on Radix UI primitives

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
│   ├── globals.css             # Global styles + shadcn/ui variables
│   └── layout.tsx              # Root layout
├── components/
│   ├── ui/                     # shadcn/ui components (47 components)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ... (44 more)
│   └── LanguageSwitcher.tsx    # Client component for language switching
├── hooks/
│   └── use-mobile.ts           # shadcn/ui mobile hook
├── lib/
│   └── utils.ts                # Utility functions (cn, etc.)
├── i18n/
│   ├── settings.ts             # i18n configuration
│   ├── server.ts               # Server-side translation logic
│   └── locales/
│       ├── en/
│       │   └── translation.json
│       └── fr/
│           └── translation.json
├── middleware.ts               # Language routing middleware
├── components.json             # shadcn/ui configuration
└── tailwind.config.ts          # Tailwind + shadcn/ui config
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

## Available shadcn/ui Components

All 47 components are ready to use:

**Layout & Navigation**
- `Accordion`, `Breadcrumb`, `NavigationMenu`, `Sidebar`, `Tabs`

**Forms & Inputs**
- `Button`, `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, `Switch`, `Slider`, `Calendar`, `Form`

**Data Display**
- `Card`, `Table`, `Badge`, `Avatar`, `Progress`, `Chart`, `Pagination`

**Feedback & Overlays**
- `Alert`, `AlertDialog`, `Dialog`, `Drawer`, `Sheet`, `Tooltip`, `Popover`, `HoverCard`

**Utilities**
- `Separator`, `ScrollArea`, `ResizablePanel`, `Skeleton`, `Toggle`, `Command`

## Creating New Pages

### Server Component with shadcn/ui

```typescript
// src/app/[lang]/about/page.tsx
import { getTranslation } from '../../../i18n/server';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function AboutPage({
  params
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;
  const { t } = await getTranslation(lang);

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('about.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{t('about.description')}</p>
          <Button>{t('about.cta')}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

### With Language Switcher

```typescript
import LanguageSwitcher from '../../../components/LanguageSwitcher';
import { Button } from '@/components/ui/button';

export default async function PageWithSwitcher({ params }) {
  const { lang } = await params;
  const { t } = await getTranslation(lang);

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <LanguageSwitcher />
      </div>
      <Button>{t('common.getStarted')}</Button>
    </div>
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

## Component Usage Examples

```typescript
// Import any component
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// Use in your pages
<Button variant="outline" size="lg">
  {t('common.submit')}
</Button>

<Card className="w-full max-w-md">
  <CardContent className="p-6">
    <Input placeholder={t('form.email')} />
  </CardContent>
</Card>
```

## Styling & Theming

shadcn/ui components use CSS variables for theming. Customize in `src/app/globals.css`:

```css
:root {
  --primary: 222.2 84% 4.9%;
  --primary-foreground: 210 40% 98%;
  /* ... more variables */
}
```

---

Built with ❤️ using Next.js 15, TypeScript, i18next, and shadcn/ui