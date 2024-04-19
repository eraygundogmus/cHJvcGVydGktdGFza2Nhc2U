"use client";
import { useTranslation } from "@/services/i18n/client";
import { UserRecord } from "firebase-admin/auth";

async function Home({ currentUser }: { currentUser?: UserRecord }) {
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
