import type { Metadata } from "next";
import { getServerTranslation } from "@/services/i18n";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/firebase/admin";

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

export default async function DashboardPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect("/sign-in");

  return (
    <main className="container">
      <Home currentUser={currentUser.toJSON() as typeof currentUser} />
    </main>
  );
}
