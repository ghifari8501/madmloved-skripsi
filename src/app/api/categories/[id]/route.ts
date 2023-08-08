import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
                                                // ⬇️ Here is the `params` property
export async function GET(req: NextRequest, { params }: { params: { id: string } } ) {

  try {
    const data = await prisma.category.findUnique({where: {id: params.id}});

    if(!data){
      return NextResponse.json({message: "Category not found"}, {status: 404});
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}


export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await prisma.category.findFirst({ where: { id } });

  if (!data)
    return NextResponse.json(
      { message: "Category does not exist." },
      { status: 404 }
    );

  const body = await request.json();

  const update = await prisma.category.update({
    where: { id },
    data: { ...body },
  });

  return NextResponse.json(update);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await prisma.category.findFirst({ where: { id } });

  if (!data)
    return NextResponse.json(
      { message: "category does not exist." },
      { status: 404 }
    );

  const remove = await prisma.category.delete({
    where: { id },
  });

  return NextResponse.json({
    message: `category "${data.name}" successfuly deleted.`,
  });
}