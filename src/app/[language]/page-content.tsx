"use client";
import { useTranslation } from "@/app/services/i18n/client";

async function Home() {
  const { t } = useTranslation("home");

  return (
    <>
      <div className="w-3/4 mx-auto">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p>{t("description")}</p>
      </div>
    </>
  );
}

export default Home;
