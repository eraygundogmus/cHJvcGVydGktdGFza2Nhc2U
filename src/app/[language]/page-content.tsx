"use client";
import { useTranslation } from "@/services/i18n/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useSessionStorageConversions from "@/services/storage/session";

type FormData = {
  number: number;
};

const useValidationSchema = () => {
  const { t } = useTranslation("home");

  return yup.object().shape({
    number: yup
      .number()
      .required(t("validation.required"))
      .integer(t("validation.integer"))
      .min(1, t("validation.min", { min: 1 }))
      .max(1000, t("validation.max", { max: 1000 })),
  });
};

function Home() {
  const [conversions, setConversions] = useSessionStorageConversions(
    "romanConversions",
    []
  );

  const { t } = useTranslation("home");
  const validationSchema = useValidationSchema();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const addConversion = (num: number, roman: string) => {
    const newConversion = { number: num, converted: roman };
    setConversions([newConversion, ...conversions]);
  };

  const onSubmit = async (data: FormData) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        number: data.number,
      }),
    });
    const json = await res.json();

    if (res.ok) {
      toast(t("conversion.success") + json.result);
      addConversion(data.number, json.result);
    }

    if (res.status === 429) {
      toast(t("conversion.errorToManyRequest"));
    }
    reset(
      {
        number: undefined,
      },
      { keepValues: false }
    );
  };
  return (
    <>
      <div className="container ">
        <h1 className="text-3xl font-bold mt-12">{t("title")}</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:w-1/2 mt-4 flex gap-2"
        >
          <div className="flex flex-col w-full">
            <Controller
              name="number"
              control={control}
              render={({ field }) => (
                <Input {...field} type="number" placeholder="1-1000" />
              )}
            />
            {errors.number?.message && (
              <p className="text-xs mt-2 text-red-500">
                {errors.number?.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {t("convert")}
          </Button>
        </form>

        {conversions.length > 0 && (
          <Table className="mt-12">
            <TableCaption>{t("conversion.tableCaption")}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>{t("conversion.tableHeader.integer")}</TableHead>
                <TableHead>
                  {t("conversion.tableHeader.romanNumeral")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {conversions.map((conversion, index) => (
                <TableRow key={index}>
                  <TableCell>{conversion.number}</TableCell>
                  <TableCell>{conversion.converted}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  );
}

export default Home;
