"use client";
import { useTranslation } from "@/services/i18n/client";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { Button } from "@/components/ui/button";
export default function SignIn() {
  const router = useRouter();
  const { t } = useTranslation("sign-in");

  const handleSignIn = async () => {
    const isOk = await signInWithGoogle();

    if (isOk) router.push("/");
  };

  return (
    <div className="mt-10">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
        {t("title")}{" "}
      </h1>
      <h2 className="my-6 w-1/2 text-neutral-700 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
        {t("description")}
      </h2>
      <Button onClick={handleSignIn}>{t("signInWithGoogle")}</Button>
    </div>
  );
}
