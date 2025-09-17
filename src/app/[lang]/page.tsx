import Image from "next/image";
import Link from "next/link";
import { getTranslation } from "../../i18n/server";
import LanguageSwitcher from "../../components/LanguageSwitcher";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const { t } = await getTranslation(lang);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="self-end">
          <LanguageSwitcher />
        </div>

        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold mb-4">{t("welcome.title")}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t("welcome.subtitle")}
          </p>
        </div>

        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-4">{t("features.title")}</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>{t("features.item1")}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>{t("features.item2")}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>{t("features.item3")}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>{t("features.item4")}</span>
            </li>
          </ul>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            href={`/${lang}/about`}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
          >
            {t("actions.getStarted")}
          </Link>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("actions.learnMore")}
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex flex-col gap-2 items-center justify-center text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {t("footer.copyright")}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500">
          {t("footer.madeWith")}
        </p>
      </footer>
    </div>
  );
}
