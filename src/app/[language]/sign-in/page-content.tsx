"use client";
import { useTranslation } from "@/app/services/i18n/client";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/lib/firebase/auth";

export default function SignIn() {
  const router = useRouter();
  const { t } = useTranslation("sign-in");

  const handleSignIn = async () => {
    const isOk = await signInWithGoogle();

    if (isOk) router.push("/");
  };

  const buttonStyle = "bg-slate-500 mt-2 px-2 py-1 rounded-md text-slate-50";

  return (
    <>
      <h1>{t("title")}</h1>
      <button className={buttonStyle} onClick={handleSignIn}>
        {t("signInWithGoogle")}
      </button>
    </>
  );
}
