import { languages } from "@/services/i18n/config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/services/i18n/client";

export const LangSwitcher = () => {
  const router = useRouter();
  const { t } = useTranslation("common");

  return (
    <Select
      onValueChange={(value) => {
        router.push(`/${value}`);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={t("language")} />
      </SelectTrigger>
      <SelectContent>
        {languages.map((l, index) => {
          return (
            <SelectItem key={l + index} value={l}>
              {l}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
