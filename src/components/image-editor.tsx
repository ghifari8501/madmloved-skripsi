import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";

interface ImageEditorProps {
  src?: string;
  alt: string;
  viewOnly?: boolean;
  onSave?: (src: string) => void;
  className?: string;
}

const DEFALUT_IMAGE = "/no-image.svg";

export function ImageEditor({
  src = DEFALUT_IMAGE,
  alt,
  viewOnly = false,
  onSave = () => {},
  className,
}: ImageEditorProps) {
  const [preview, setPreview] = React.useState(src);
  const [isEditting, setEditting] = React.useState(false);
  const [inputVal, setInputVal] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  useKeyboardShortcut(["enter"], handleUpdate);

  function handleUpdate() {
    if (preview === src) return;

    onSave(preview);
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        setEditting(false);
        setInputVal(src);
        setPreview(src);
      }}
    >
      <DialogTrigger>
        <Image
          loader={() => src || DEFALUT_IMAGE}
          loading="lazy"
          src={src || DEFALUT_IMAGE}
          width={200}
          height={200}
          objectFit="contain"
          alt={alt}
          className={cn("rounded-md border-border border", className)}
        />
      </DialogTrigger>
      <DialogContent forceMount>
        <DialogHeader>{alt}</DialogHeader>
        <div className="flex flex-col gap-4">
          {!isEditting && (
            <Button variant={"outline"} onClick={() => setEditting(true)}>
              Edit
            </Button>
          )}

          {isEditting && (
            <div className="grid gap-2">
              <span className="text-xs text-muted-foreground">
                Enter image url:
              </span>
              <div className="flex gap-2">
                <Input
                  defaultValue={preview}
                  ref={inputRef}
                  autoFocus
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => setInputVal(e.target.value)}
                />
                <Button
                  variant={"outline"}
                  onClick={() => {
                    setInputVal(preview);
                    setEditting(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setPreview(inputVal);
                    setEditting(false);
                  }}
                >
                  Update
                </Button>
              </div>
            </div>
          )}

          <Image
            loader={() => preview}
            src={preview}
            width={200}
            height={200}
            objectFit="contain"
            alt={alt}
            className={cn("rounded-md border-border border w-full h-full")}
          />

          <Button disabled={preview === src} onClick={handleUpdate}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
