import type { Metadata } from "next";
import { getServerTranslation } from "@/app/services/i18n";

import Home from "./page-content";

type Props = {
  params: { language: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslation(params.language, "home");

  return {
    title: t("title"),
  };
}

export default Home;
