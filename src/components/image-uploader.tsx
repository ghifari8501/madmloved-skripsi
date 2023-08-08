"use client";

import Image from "next/image";
import * as React from "react";

export function ImageUploader({
  maxFile = 2,
  maxSize = 5,
  fileType = "image/*",
}) {
  const [image, setImage] = React.useState("");
  const [imagePreview, setImagePreview] = React.useState<string[] | null>(null);
  const [_files, setFiles] = React.useState<File[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const { files } = e.target;

    if (!files || files.length < 1) {
      return;
    }

    if (files.length > maxFile) {
      setError("Too many files!");
      return;
    }

    const items: File[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.size > maxSize) {
        setError("File size too large!");
        return;
      }

      items.push(file);
    }

    setError(null);
    setFiles(items);
  }

  return (
    <div>
      <input
        type="file"
        className="w-[300px] h-[300px] border border-dashed"
        accept={fileType}
        multiple
        onChange={onUpload}
      />
      {error && error}
      {/* {imagePreview && imagePreview.map((preview) => (<Image 
      src={URL.createObjectURL()}/>))} */}
      {_files &&
        _files.map((file, i) => (
          <Image
            key={i}
            src={URL.createObjectURL(file)}
            alt={file.name}
            objectFit="cover"
            width={320}
            height={218}
            layout="fixed"
          />
        ))}
    </div>
  );
}
