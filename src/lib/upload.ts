import fs from "fs";
import path from "path";

interface UploadFileProps {
  dir?: string;
  filename?: string;
}

export async function uploadFile(
  file: File,
  { dir = "images", filename = undefined }: UploadFileProps = {}
) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = file.name.split(".").slice(-1);

  let name = "";

  if (filename) {
  }

  const baseDir = process.cwd();

  const uploadTo = path.join(baseDir);

  return ext;
}
