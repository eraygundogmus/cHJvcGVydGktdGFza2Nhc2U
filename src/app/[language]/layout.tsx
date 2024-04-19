import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { dir } from "i18next";
import "@/services/i18n/config";
import { getServerTranslation } from "@/services/i18n";
import StoreLanguageProvider from "@/services/i18n/store-language-provider";
import { languages } from "@/services/i18n/config";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

type Props = {
  params: { language: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslation(params.language, "common");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export function generateStaticParams() {
  return languages.map((language) => ({ language }));
}

export default function RootLayout({
  children,
  params: { language },
}: Readonly<{
  children: React.ReactNode;
  params: { language: string };
}>) {
  return (
    <html lang={language} dir={dir(language)}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <StoreLanguageProvider>{children}</StoreLanguageProvider>
      </body>
    </html>
  );
}
