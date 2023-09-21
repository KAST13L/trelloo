"use client";
import { BoardPayload, useBoardQuery } from "@/hooks/use-board-query";
import CreateColumn from "@/components/create-column.component";

interface Props {
  board: BoardPayload;
}
export default function ColumnList({ board }: Props) {
  const { data } = useBoardQuery({ initialData: board });
  return (
    <div
      className={
        "flex flex-1 gap-10 overflow-x-scroll w-full h-content px-10 pb-2"
      }
    >
      {data.columns.map((column) => {
        return (
          <div
            key={column.id}
            style={{ minWidth: column.width, width: column.width }}
            className="block w-full p-4 border rounded-lg shadow bg-gray-800 border-gray-700"
          >
            <div>
              <h5 className="text-lg font-bold tracking-tight text-white">
                {column.title}
              </h5>
              <div>bla bla bla</div>
            </div>
          </div>
        );
      })}
      <CreateColumn boardId={board.id} />
    </div>
  );
}
