import { redirect } from "next/navigation";

import { isUserAuthenticated } from "@/lib/firebase/admin";
import SignIn from "./page-content";

export default async function SignInPage() {
  if (await isUserAuthenticated()) redirect("/dashboard");

  return (
    <main className="container">
      <SignIn />
    </main>
  );
}
