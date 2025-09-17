'use client';

import { useParams, useRouter, usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = params.lang as string;

  const changeLanguage = (lng: string) => {
    const newPath = pathname.replace(`/${currentLang}`, `/${lng}`);
    router.push(newPath);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-4 py-2 rounded-lg transition-colors ${
          currentLang === 'en'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
        }`}
      >
        English
      </button>
      <button
        onClick={() => changeLanguage('fr')}
        className={`px-4 py-2 rounded-lg transition-colors ${
          currentLang === 'fr'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
        }`}
      >
        Français
      </button>
    </div>
  );
}