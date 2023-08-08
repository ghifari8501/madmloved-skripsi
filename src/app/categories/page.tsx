"use client";

import { useLanguage } from "@/providers/lang-provider";
import { Category } from "@/types";
import Link from "next/link";

import { CATEGORY_CONTENT } from "@/contents/categories";
import { Fetcher, fetcher, useSwr } from "@/lib/fetcher";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Plus } from "lucide-react";
import { CreateCategory } from "@/components/category/category-create";

interface CategoryCardProps {
  data: Category;
}

function CategoryCard({ data }: CategoryCardProps) {
  return (
    <Link
      href={`categories/${data.id}`}
      className="group transition-all rounded-md border-4 border-background relative bg-foreground max-h-64 hover:border "
    >
      <Image
        alt={data.name}
        loader={() => data.thumbnail || "/no-image.svg"}
        loading="lazy"
        width={200}
        height={200}
        src={data.thumbnail || "/no-image.svg"}
        className="transition-opacity w-full h-full object-cover opacity-60 group-hover:opacity-75 group-hover:rounded-none"
      />
      <p className="transition-transform absolute text-3xl text-background top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  group-hover:text-4xl">
        {data.name}
      </p>
    </Link>
  );
}

function Loading() {
  return (
    <div className="container py-8 flex flex-col gap-4">
      <div>
        <Skeleton className="w-1/4 h-12" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-4 ">
        <Skeleton className="w-full h-64" />
        <Skeleton className="w-full h-64" />
        <Skeleton className="w-full h-64" />
        <Skeleton className="w-full h-64" />
        <Skeleton className="w-full h-64" />
        <Skeleton className="w-full h-64" />
        <Skeleton className="w-full h-64" />
        <Skeleton className="w-full h-64" />
      </div>
    </div>
  );
}

export default function CategoriesPage() {
  const { lang } = useLanguage();

  const get: Fetcher = { url: "/categories", request: { method: "GET" } };
  const { data, isLoading, mutate } = useSwr<Category[]>(get, fetcher);

  if (isLoading || !data) return <Loading />;

  return (
    <div className="container py-8 flex flex-col gap-4">
      <div className="flex items-center justify-between border-b pb-2">
        <h2 className="scroll-m-20  text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          {CATEGORY_CONTENT.title[lang]}
        </h2>
        <CreateCategory />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-4 ">
        {data.map((c) => (
          <CategoryCard key={c.id} data={c} />
        ))}
      </div>
    </div>
  );
}
