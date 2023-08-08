"use client";
import * as React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { Fetcher, fetcher, useSwr } from "@/lib/fetcher";
import { Category } from "@prisma/client";
import { notFound, useRouter } from "next/navigation";
import { Criteria } from "@/types";
import { CriteriaProvider, useCriteria } from "@/providers/criteria-provider";
import { CategoryPlayground } from "@/components/category/criteria-playground";
import { useToast } from "@/components/ui/use-toast";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";

function Loading() {
  return (
    <div>
      <Skeleton className="w-full h-full" />
    </div>
  );
}

export default function CategoryEdit({ params }: { params: { id: string } }) {
  const { id } = params;

  const [criterias, setCriterias] = React.useState<Criteria[]>([]);
  const [loading, setLoading] = React.useState(false);

  const get: Fetcher = { url: `/categories/${id}`, request: { method: "GET" } };

  const { toast } = useToast();
  const router = useRouter();

  const { data, isLoading, error, mutate } = useSwr<Category>(get, fetcher);

  React.useEffect(() => {
    if (data && data.criterias) {
      const _criterias: Criteria[] = JSON.parse(data.criterias);
      setCriterias(_criterias);
    }
  }, [data]);

  async function handleUpdate(data: Category) {
    setLoading(true);
    await fetcher({
      url: `/categories/${id}`,
      request: {
        method: "PUT",
        body: JSON.stringify(data),
      },
    })
      .then(() => {
        setLoading(false);
        toast({ description: "Successfully saved." });
        mutate();
      })
      .catch((err) => {
        setLoading(false);
        toast({
          title: "Unable to save",
          description: "Something went wrong",
          variant: "destructive",
        });
      });
  }

  if (error) return notFound();

  if (isLoading || !data) return <Loading />;

  return (
    <CriteriaProvider data={criterias}>
      <CategoryPlayground
        onSave={handleUpdate}
        data={data}
        isLoading={loading}
        onDelete={async () => {
          await fetcher({
            url: `/categories/${id}`,
            request: {
              method: "DELETE",
            },
          })
            .then(() => {
              router.push("/categories");
            })
            .catch((err) => {
              setLoading(false);
              toast({
                title: "Unable to delete",
                description: "Something went wrong",
              });
            });
        }}
      />
    </CriteriaProvider>
  );
}
