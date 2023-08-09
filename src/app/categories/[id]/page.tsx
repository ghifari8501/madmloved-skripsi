"use client";
import * as React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { CATEGORY_CONTENT } from "@/contents/categories";
import { Fetcher, fetcher, useSwr } from "@/lib/fetcher";
import { useLanguage } from "@/providers/lang-provider";
import { notFound } from "next/navigation";
import { Category, Criteria } from "@/types";
import { Edit2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

function Loading() {
  return (
    <div>
      <Skeleton className="w-full h-full" />
    </div>
  );
}

export default function CategoryDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  const { lang } = useLanguage();
  // const router = useRouter()

  const [criterias, setCriterias] = React.useState<Criteria[]>([]);

  const get: Fetcher = { url: `/categories/${id}`, request: { method: "GET" } };

  const { data, isLoading, error } = useSwr<Category>(get, fetcher);

  React.useEffect(() => {
    if (data && data.criterias) {
      const _criterias = data.criterias as Criteria[];
      setCriterias(_criterias);
    }
  }, [data]);

  if (error) return notFound();

  if (isLoading || !data) return <Loading />;

  return (
    <div className="container py-8 flex flex-col gap-4">
      <div className="flex justify-between px-4 border-b pb-2">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          {data.name}
        </h2>

        <Link
          href={`${id}/edit`}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <Edit2 className="h-4 w-4 mr-2" /> Edit
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-4 px-2 py-2 border-border border rounded-md">
        <Image
          loader={() => data.thumbnail || "/no-image.svg"}
          loading="lazy"
          src={data.thumbnail || "/no-image.svg"}
          width={200}
          height={200}
          className="object-contain w-full bg-background rounded-md"
          alt={data.name}
        />
        <div className="flex flex-col gap-4 py-8">
          <div className="grid grid-cols-6 py-2">
            <div className="col-span-1 text-bold text-lg  text-muted-foreground">
              {CATEGORY_CONTENT.content.criterias[lang]}
            </div>
          </div>

          {criterias.map((c, i) => (
            <div
              key={i}
              className="grid grid-cols-6 border-b border-border py-2"
            >
              {c.name}
            </div>
          ))}

          <div className="flex flex-col py-4 gap-4">
            <div className="text-xs text-muted-foreground">
              {CATEGORY_CONTENT.content.description[lang]}
            </div>

            <Textarea readOnly className="text-sm border-none min-h-fit">
              {data.description}
            </Textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
