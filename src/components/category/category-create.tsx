"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { ImageEditor } from "../image-editor";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import { Fetcher, fetcher } from "@/lib/fetcher";
import { Category } from "@prisma/client";
import { useToast } from "../ui/use-toast";

export function CreateCategory() {
  const [src, setSrc] = React.useState("/no-image.svg");
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const nameRef = React.useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (name.length < 1) {
      nameRef.current?.focus();
      return;
    }

    const data: Partial<Category> = {
      name: name,
      description: description,
      published: true,
      thumbnail: src,
    };

    setLoading(true);

    await fetcher({
      url: "/categories",
      request: { method: "POST", body: JSON.stringify(data) },
    })
      .then((res: Category) => {
        setLoading(false);
        router.push(`/categories/${res.id}/edit`);
      })
      .catch((err) => {
        setLoading(false);
        toast({
          title: "Unable to create new category",
          description: "Oops, something went wrong, please try again",
          variant: "destructive",
        });
      });
  }

  function handleResetForm(o: boolean) {
    setOpen(o);
    setName("");
    setDescription("");
    setSrc("/no-image.svg");
  }

  return (
    <Dialog open={open} onOpenChange={handleResetForm}>
      <DialogTrigger>
        <Button>
          New Category <Plus className="ml-2" size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create a new Category</DialogTitle>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 px-4 py-2">
            <div className="text-sm grid px-2">
              <div className="flex justify-between px-2 ">
                <Label htmlFor="name" className="text-muted-foreground text-xs">
                  Name
                </Label>
              </div>
              <div className="px-2 py-2">
                <Input
                  id="name"
                  ref={nameRef}
                  autoComplete="off"
                  defaultValue={""}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={(e) => {
                    const newValue = e.target.value.replace(/\s+/g, " ").trim();
                    setName(newValue);
                  }}
                />
              </div>
            </div>

            <div className="text-sm grid px-2">
              <div className="flex justify-between px-2">
                <span className="text-muted-foreground text-xs">Thumbnail</span>
              </div>
              <div className="px-2 py-2 w-full flex justify-center">
                <ImageEditor
                  src={src}
                  alt={"Thumbnail"}
                  onSave={(v) => {
                    setSrc(v);
                  }}
                />
              </div>
            </div>

            <div className="text-sm grid px-2">
              <div className="flex justify-between px-2 ">
                <Label
                  htmlFor="description"
                  className="text-muted-foreground text-xs"
                >
                  Description
                </Label>
              </div>
              <div className="px-2 py-2">
                <Textarea
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end px-2 gap-2">
              <Button type="submit" disabled={loading}>
                {loading && (
                  <>
                    <Loader2 size={18} className="animate-spin mr-2" />
                    <span>Creating...</span>
                  </>
                )}
                {!loading && (
                  <>
                    <span>Create</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
