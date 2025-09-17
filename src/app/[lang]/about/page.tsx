import { getTranslation } from "../../../i18n/server";
import LanguageSwitcher from "../../../components/LanguageSwitcher";
import Link from "next/link";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const { t } = await getTranslation(lang);

  return (
    <div className="font-sans min-h-screen p-8 pb-20 sm:p-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href={`/${lang}`} className="text-blue-600 hover:underline">
            ← {t("navigation.home")}
          </Link>
          <LanguageSwitcher />
        </div>

        <h1 className="text-4xl font-bold mb-6">{t("navigation.about")}</h1>

        <div className="prose prose-lg dark:prose-invert">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This is an example About page demonstrating how to create new pages
            with i18n support.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            How to use this template
          </h2>

          <ol className="list-decimal pl-6 space-y-2">
            <li>Clone this repository</li>
            <li>Add your translations to the locale files</li>
            <li>Create new pages following the pattern</li>
            <li>Deploy to your favorite platform</li>
          </ol>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Key Features</h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>Server-side rendering</li>
            <li>No hydration issues</li>
            <li>Clean URL structure</li>
            <li>Automatic language detection</li>
            <li>Easy to extend</li>
          </ul>
        </div>

        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-center text-gray-600 dark:text-gray-400">
            Current language:{" "}
            <strong className="text-blue-600">{lang.toUpperCase()}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
