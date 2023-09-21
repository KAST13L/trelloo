"use client";
import BoardCard from "@/components/board-card.component";
import { useBoards } from "@/hooks/use-boards";
import { Boards } from "@prisma/client";
import CreateBoard from "@/components/create-board.component";
interface Props {
  initialData: Boards[];
}
export default function BoardsList({ initialData }: Props) {
  const { data: boards } = useBoards({ initialData });
  return (
    <div
      className={
        "grid mx-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      }
    >
      {boards.map((board) => {
        return <BoardCard id={board.id} title={board.title} key={board.id} />;
      })}
      <CreateBoard />
    </div>
  );
}
