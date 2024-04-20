"use client";
import { useState } from "react";
import { Logo } from "./Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { useTranslation } from "@/services/i18n/client";
import { LangSwitcher } from "./lang-switch";
function LayoutHeader() {
  const { t } = useTranslation("common");

  const router = useRouter();
  const [user, setUser] = useState<{
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
  } | null>(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  const handleSignOut = async () => {
    const isOk = await signOut();

    if (isOk) router.push("/sign-in");
  };

  return (
    <header className="container flex justify-between bg-white border-b-2 py-4">
      <Logo />

      <div className="flex gap-2 items-center">
        <LangSwitcher />

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user?.photoURL || ""}
                    alt={user?.displayName || "User"}
                  />
                  <AvatarFallback>
                    <span>{user?.displayName?.charAt(0)}</span>
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user && user.displayName}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user && user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                data-testid="logout-menu-item"
                onClick={() => handleSignOut()}
              >
                {t("signOut")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}

export default LayoutHeader;
