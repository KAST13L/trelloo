import { NextResponse } from "next/server";
import { prisma } from "@/core/prisma";
import { updateColumnDto } from "@/app/api/columns/dto";

interface ColumnRouteContext {
  params: {
    id: string;
  };
}

export async function PATCH(req: Request, { params }: ColumnRouteContext) {
  const { id } = params;
  const bodyRaw = await req.json();
  const validateBody = updateColumnDto.safeParse(bodyRaw);

  if (!validateBody.success) {
    return NextResponse.json(validateBody.error.issues, { status: 400 });
  }

  const findColumn = await prisma.columns.findUnique({
    where: {
      id,
    },
  });

  if (!findColumn) {
    return NextResponse.json([
      { code: "not_found", message: "Column not found" },
    ]);
  }

  const column = await prisma.columns.update({
    where: {
      id,
    },
    data: validateBody.data,
  });

  return NextResponse.json(column);
}

export async function DELETE(req: Request, { params }: ColumnRouteContext) {
  const { id } = params;

  const findColumn = await prisma.columns.findUnique({
    where: {
      id,
    },
  });

  if (!findColumn) {
    return NextResponse.json([
      { code: "not_found", message: "Column not found" },
    ]);
  }

  await prisma.columns.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({}, { status: 200 });
}
