"use client";
import { useTranslation } from "@/services/i18n/client";
import { useRouter } from "next/navigation";
import { UserRecord } from "firebase-admin/auth";
import { signOut } from "@/lib/firebase/auth";

async function Home({ currentUser }: { currentUser?: UserRecord }) {
  const router = useRouter();
  const { t } = useTranslation("home");

  const handleSignOut = async () => {
    const isOk = await signOut();

    if (isOk) router.push("/sign-in");
  };

  return (
    <>
      <div className="w-3/4 mx-auto">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p>{t("description")}</p>
        <button
          className="bg-slate-500 mt-2 px-2 py-1 rounded-md text-slate-50"
          onClick={handleSignOut}
        >
          {t("signOut")}
        </button>
      </div>
    </>
  );
}

export default Home;
