import { prisma } from "@/core/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import ColumnList from "@/components/column-list.component";

interface PageParams {
  id: string;
}
interface PageProps {
  params: PageParams;
}
export default async function BoardPage({ params }: PageProps) {
  const board = await prisma.boards.findUnique({
    where: {
      id: params.id,
    },
    include: {
      columns: {
        orderBy: {
          order: "asc",
        },
        include: {
          cards: true,
        },
      },
    },
  });

  if (!board) {
    return notFound();
  }

  return (
    <>
      <div className={"container mx-auto"}>
        <h1 className={"text-white text-4xl text-center mb-6"}>
          {board.title}
        </h1>
      </div>
      <ColumnList board={board} />
    </>
  );
}
