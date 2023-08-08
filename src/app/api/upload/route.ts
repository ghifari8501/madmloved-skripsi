import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const files: File[] | null = data.getAll("file") as unknown as File[];

    if (!files || files.length < 1) {
      return NextResponse.json(
        { message: "No files were selected" },
        { status: 400 }
      );
    }

    let feedback: { path: string; nextDir: string }[] = [];

    files.map(async (file) => {
      const [filename, ...other] = file.name.split(".");
      const ext = other.slice(-1).join("");

      const filePath = path.join(
        process.cwd(),
        "public",
        "images",
        `${filename}-${Date.now()}.${ext}`
      );

      feedback.push({
        path: filePath,
        nextDir: `images/${filename}-${Date.now()}.${ext}`,
      });

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      fs.writeFileSync(filePath, buffer);
    });

    return NextResponse.json(
      { message: "Upload image success", feedback },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
