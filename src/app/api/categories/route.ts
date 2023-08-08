import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const data = await prisma.category.create({
    data: body,
  });

  return NextResponse.json(data, { status: 200 });
}

export async function GET(req: NextRequest) {
  const _all = req.nextUrl.searchParams.get("all");

  if (_all && _all === "true") {
    const data = await prisma.category.findMany();
    return NextResponse.json(data);
  }

  const _page = req.nextUrl.searchParams.get("page");
  const _limit = req.nextUrl.searchParams.get("limit");
  const _fields = req.nextUrl.searchParams.getAll("field");
  const _matches = req.nextUrl.searchParams.get("matches");
  const _orderBy = req.nextUrl.searchParams.get("orderBy");
  const _order = req.nextUrl.searchParams.get("order");

  const page = _page ? parseInt(_page, 10) : 1;
  const limit = _limit ? parseInt(_limit, 10) : 10;
  const skip = (page - 1) * limit;

  let where = {};
  let orderBy = {};

  if (_fields.length > 0 && _matches) {
    const OR: { [x: string]: { contains: string } }[] = [];
    _fields.map((field) => {
      OR.push({ [field]: { contains: _matches } });
    });
    Object.assign(where, { OR: OR });
  }

  if (_order && _orderBy) {
    const order = _order === "asc" || _order === "desc" ? _order : "asc";

    Object.assign(orderBy, { [_orderBy]: order });
  }

  try {
    const data = await prisma.category.findMany({});

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Someting went wrong",
        stack: error?.stack,
      },
      { status: 500 }
    );
  }
}
