"use client";
import * as React from "react";

import { useLanguage } from "@/providers/lang-provider";
import { useRouter } from "next/navigation";
import { Criteria } from "@/types";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCriteria } from "@/providers/criteria-provider";
import { CriteriaList } from "@/components/category/criteria-list";
import { CriteriaProperties } from "@/components/category/criteria-properties";
import { CriteriaInput } from "./criteria-input";

import CurrencyInput from "react-currency-input-field";
import { CateogryProperties } from "./category-properties";
import { Category } from "@prisma/client";

function formatCurrency(number: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
}

export function CategoryPlayground({
  onSave = () => {},
  data,
  isLoading = false,
  onDelete = () => {},
}: {
  onSave?: (data: Category) => void;
  data: Category;
  isLoading?: boolean;
  onDelete?: () => void;
}) {
  const { lang } = useLanguage();
  const router = useRouter();
  const { criterias, totalWeight, selected } = useCriteria();

  const [scores, setScores] = React.useState<number[]>([]);
  const [madmScore, setMadmScore] = React.useState<number>(0);

  const [madmInput, setMadmInput] = React.useState(0);
  const [madmOutput, setMadmOutput] = React.useState(0);
  const [isDebugging, setisDebugging] = React.useState(false);

  const [_data, setData] = React.useState(data);

  React.useEffect(() => {
    setData(data);
  }, [data]);

  React.useEffect(() => {
    setMadmScore(scores.reduce((a, b) => a + b, 0));
  }, [scores]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between p-2 border-border border-b">
        <div className="flex items-center gap-2 text-lg font-medium">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="rounded-full"
            onClick={() => router.back()}
          >
            <ArrowLeft size={18} />
          </Button>
          {_data.name}
        </div>
        <Button
          onClick={() =>
            onSave({ ..._data, criterias: JSON.stringify(criterias) })
          }
          disabled={isLoading}
        >
          {isLoading && (
            <>
              <Loader2 size={18} className="animate-spin mr-2" />
              <span>Saving...</span>
            </>
          )}
          {!isLoading && (
            <>
              <Save className="mr-2" size={18} />
              <span>Save</span>
            </>
          )}
        </Button>
      </div>
      <div className="flex gap-4">
        <CriteriaList />

        <div className="grow container py-8 flex flex-col gap-4">
          {isDebugging && (
            <div className="flex items-center justify-between text-xs">
              <div>Total Weight: {totalWeight.toFixed(2)}</div>
              <div>Madm Score: {madmScore.toFixed(2)}</div>
            </div>
          )}

          <div className="flex flex-col px-2 py-4 border-border border rounded-md gap-2">
            {criterias.map((c, i) => (
              <CriteriaInput
                key={i}
                debug={isDebugging}
                {...c}
                onValueChange={(v) =>
                  setScores((prev) => [
                    ...prev.slice(0, i),
                    v,
                    ...prev.slice(i + 1),
                  ])
                }
              />
            ))}

            <div className="text-sm grid px-2">
              <div className="flex justify-between ">
                <span className="text-muted-foreground text-xs">
                  Initial Price
                </span>
              </div>
              <div className="px-2 py-2">
                <CurrencyInput
                  id="htmlFor"
                  className={
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  }
                  defaultValue={madmInput}
                  intlConfig={{ currency: "IDR", locale: "id-ID" }}
                  onValueChange={(v) => {
                    const val = Number(v);
                    setMadmInput(Number.isNaN(val) ? 0 : val);
                  }}
                />
              </div>
            </div>

            <div className="text-sm grid px-2">
              <div className="flex justify-between ">
                <span className="text-muted-foreground text-xs">
                  Selling Price
                </span>
                <span className="flex gap-2 text-xs text-foreground ">
                  Recommended Price:
                  <span className="font-bold">
                    {formatCurrency(madmInput * madmScore)}
                  </span>
                </span>
              </div>
              <div className="px-2 py-2">
                <CurrencyInput
                  id="htmlFor"
                  className={
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  }
                  defaultValue={madmOutput}
                  intlConfig={{ currency: "IDR", locale: "id-ID" }}
                  onValueChange={(v) => {
                    const val = Number(v);
                    setMadmOutput(Number.isNaN(val) ? 0 : val);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {selected !== null && <CriteriaProperties />}
        {selected === null && (
          <CateogryProperties
            data={_data}
            onValuesChange={(v) => setData({ ..._data, ...v })}
            onDelete={onDelete}
          />
        )}
      </div>
    </div>
  );
}
