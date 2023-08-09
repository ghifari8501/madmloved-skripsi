import { Category } from "@/types";
import * as React from "react";
import { Input } from "../ui/input";
import { ImageEditor } from "../image-editor";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function CateogryProperties({
  data,
  onValuesChange = () => {},
  onDelete = () => {},
}: {
  data: Category;
  onValuesChange?: (data: Partial<Category>) => void;
  onDelete?: () => void;
}) {
  const [name, setName] = React.useState(data.name);
  const [thumbnail, setThumbnail] = React.useState<string>(
    data.thumbnail || "/no-image.svg"
  );
  const [description, setDescription] = React.useState<string>(
    data.description || ""
  );

  return (
    <div className=" h-screen min-w-[240px] overflow-hidden border  bg-background text-sm">
      <div className="px-2 py-4 grid gap-4">
        <div className="text-sm grid px-2">
          <div className="flex justify-between ">
            <span className="text-muted-foreground text-xs">Category Name</span>
          </div>
          <div className="px-2 py-2">
            <Input
              defaultValue={data.name}
              onBlur={(e) => {
                let update = data.name;
                const newValue = e.target.value.replace(/\s+/g, " ").trim();

                update = newValue.length < 1 ? update : newValue;

                onValuesChange({ name: update });
              }}
            />
          </div>
        </div>

        <div className="text-sm grid px-2">
          <div className="flex justify-between ">
            <span className="text-muted-foreground text-xs">Thumbnail</span>
          </div>
          <div className="px-2 py-2">
            <ImageEditor
              src={thumbnail as string}
              alt={data.name}
              onSave={(v) => {
                setThumbnail(v);
                onValuesChange({ thumbnail: v });
              }}
            />
          </div>
        </div>

        <div className="text-sm grid px-2">
          <div className="flex justify-between ">
            <span className="text-muted-foreground text-xs">Description</span>
          </div>
          <div className="px-2 py-2">
            <Textarea
              defaultValue={data.description || ""}
              onBlur={(e) => {
                let update = data.description;
                const newValue = e.target.value;

                update = newValue.length < 1 ? update : newValue;

                onValuesChange({ description: update });
              }}
            ></Textarea>
          </div>
        </div>

        <div className="w-full px-2">
          <AlertDialog>
            <AlertDialogTrigger className="w-full">
              <Button className="w-full" variant={"destructive"}>
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this category and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button variant={"destructive"} onClick={onDelete}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
